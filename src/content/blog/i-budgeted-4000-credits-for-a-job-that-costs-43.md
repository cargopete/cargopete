---
title: "I budgeted 4,000 credits for a job that costs 43"
date: "2026-09-14"
description: "A day spent instrumenting Dune's API for a feed layer. The billing does not work the way the docs read, two queries ran successfully and were wrong, and I answered the same question incorrectly twice before finding a method that worked."
tags: ["dune", "sql", "api", "measurement", "post-mortem"]
---

I have been building a feed layer that reads The Graph's on-chain data out of Dune and materialises
it into Postgres. The plan for it was written carefully, in advance, with a credit budget and a
cadence table and an allocation per workstream. **Every load-bearing number in that plan was wrong,
and I only found out by running it.**

Nothing has shipped. No user can see any of this, nothing is deployed or scheduled, and the one
registry entry that would start a feed is still `enabled = false`. What follows is entirely what
measurement told me, on one account, on 14 September 2026.

## The billing does not work the way the documentation reads

The plan assumed, reasonably, that fetching results costs money. Dune's own billing page separates
execution from export, so budgeting for both seemed prudent.

Baseline was 0.439 credits. I made twenty reads at `limit=1`, six datapoints each. No change. Then
twenty full 31-row reads, 186 datapoints each. No change. Across the whole day, roughly 85 reads and
some 7,000 datapoints moved the counter by exactly zero.

An unmoving counter is not evidence of anything, though. It is equally consistent with a broken
gauge, and a gauge you have not proved is a gauge you should not trust. So I spent one execution
deliberately to see whether the number could move at all. It could:

```
usage before:            0.439
execution 01M2FE164Q...  cost 0.094852942
usage after (5 seconds): 0.534
```

Over the day, five executions summing to 6.6739 credits took account usage from 0.439 to 7.113. It
reconciles to the microcredit. **Account usage is the sum of execution costs, and reads contribute
nothing.**

Two smaller things worth knowing if you are automating against this API. Account usage lives at
`POST /api/v1/usage`; a `GET` returns 405 with `allow: POST`, which is a read behind a POST and cost
me twenty minutes to rediscover. And there is a rate limit entirely unrelated to credits: rapid
sequential reads return HTTP 429, with no `Retry-After` and no `X-RateLimit-*` headers at all, so a
client has to back off blind. Recovery took up to 15 seconds.

I should say plainly that this is one account, on one plan, in one billing period. It is not a
promise that exports are free forever, and table *writes* are separately documented at 3 credits per
GB, which I did not measure.

## The cost figure on a running query is not the bill

This one is a trap, and it will quietly corrupt any ledger that settles early.

`execution_cost_credits` appears on the status response while a query is still executing. It is
tempting to treat that as the cost. It is an estimate, and it can go **down**:

| Reading | Credits |
|---|---|
| While `QUERY_STATE_EXECUTING` | 13.15574089 |
| Settled, `QUERY_STATE_COMPLETED` | 4.25897059 |

A ledger that recorded the in-flight figure would have charged itself three times over. The
admission logic I had already written skips executions that are still running, which I had
justified to myself as tidiness. It turns out to be load-bearing, which is a nicer way of saying I
was right by accident.

## The budget was wrong by two orders of magnitude

The plan assumed 10 credits per medium execution. That figure came from nowhere in particular; Dune
does not publish a fixed per-query price, because cost tracks actual compute.

Measured, across the seven queries I built:

| Query | Credits |
|---|---|
| Daily price OHLC | 0.064 to 0.153 |
| Hourly price, 7 days | 0.108500 |
| Bridge escrow flow, daily | 0.055794 |
| Whale transfers, 24h, labelled | 0.184794 |
| CEX flows, daily, both chains | 0.426853 |
| Holder concentration, full history | 0.278265 |
| Legacy L1 staking remnants | 0.348265 |

At their catalogued cadences those seven come to **about 43 credits a month**, against an allowance
of 4,000. The plan had budgeted roughly 4,000 for that workstream alone. Most of the cadence anxiety
in it was about a constraint that does not exist, and the real limit on how often these run is how
fresh the data needs to be.

Three things stop this being a blank cheque. Identical SQL varied 0.064 to 0.153 across three runs,
a 2.4x spread, so a single observation is a lower bound on the range and not a figure. Cost tracks
the scan rather than the result: the most expensive thing I ran all day was an unanchored
`information_schema` wildcard search at 4.259 credits, which returned fewer rows than a query
costing a twentieth of that. And these are today's data volumes, which only grow.

## Two queries ran successfully and were wrong

Both produced output. Both completed without error. Both would have shipped if I had looked at the
exit status rather than the numbers.

**The bridge tile said the bridge was draining.** It reported a cumulative net flow of −294,162,620
GRT. The actual escrow holds +2,559,552,592. The running sum was computed inside a 400-day date
filter, so it started from zero at the window edge and measured the wrong thing entirely. Anyone
reading that tile would have drawn precisely the wrong conclusion about the protocol.

The fix was to compute the cumulative across all history and limit only the output window. It now
ends at 2,559,552,592, which matches an independent check I had done earlier from the other
direction: escrow on L1 against tokens minted on L2, agreeing to within 0.067%. It is also *cheaper*
than the broken version, 0.056 against 0.073, because filtering to two addresses beats filtering by
date.

**The whale feed's three biggest events were an exchange talking to itself.** 50,000,000 GRT into
`Binance Internal 2`, the same 50,000,000 out to `Binance 14`, and 46,693,699 from `Binance 14` to
`Binance 8`. On a feed captioned "large transfers" those read as enormous market movements. They are
one exchange rearranging its own float.

I fixed that by classifying rather than excluding, because "GRT moved onto an exchange" and "an
exchange moved its own money" are different stories and a feed should tell them apart. Each transfer
now carries a kind: `internal_shuffle`, `deposit_to_cex`, `withdrawal_from_cex`, and so on, matching
on a label prefix so `Binance 14` and `Binance Internal 2` resolve to one entity. The immediate
payoff was that it separated out a genuine 50,000,000 GRT deposit which had been sitting
indistinguishable among the shuffles.

## I answered the same question wrong twice

The question was simple: are The Graph's Horizon contracts decoded on Dune?

**First attempt.** I searched `information_schema.schemata` for schema names matching `graph%`. That
returned `graphprotocol_arbitrum` and four `graphene_*` schemas, and I concluded the coverage was
thin. `graphene_*` turns out to be a Carbon/Bancor project with no relationship to The Graph
whatsoever, and the filter had missed every `thegraph_*` namespace, which is where 830 decoded
tables actually live. The answer I nearly published was that nobody had decoded The Graph. People
have been maintaining that decoding for years.

**Second attempt.** Chastened, I searched `information_schema.tables` for table names containing
`horizonstaking`, `subgraphservice`, and the rest. Nothing. I wrote it up confidently: no Horizon
contract is decoded.

That was also wrong, and the reason is a nice one. **A decoded table on Dune is named after whatever
the submitter typed, not after the contract.** Somebody submitted HorizonStaking as `staking`. On
top of that, HorizonStaking is a proxy that was upgraded in place, so it kept the address the legacy
staking contract already had. Searching for the name could not have found it.

**Third attempt, and the one that worked.** Query the address:

```sql
SELECT cast(contract_address AS varchar), count(*)
FROM thegraph_arbitrum.staking_evt_stakedeposited
GROUP BY 1
```

`0x00669a4cf01450b64e8a2a20e9b1fcb71e61ef03`, 182,178 events. That is HorizonStaking. The address
has been decoded all along.

The true answer is more interesting than either wrong one: the address is decoded **under the legacy
ABI**. All 22 of its event tables are old vocabulary, allocations and rebates and the pre-Horizon
delegation model. A search of every Graph namespace for Horizon-era terms returns nine tables, all
of them legacy. There is no `provision`, no `thawrequest`, no Horizon slashing table anywhere. So
the contract is present and its current events are not, which is a different problem from the one I
thought I had, and needs a different fix: an ABI update on an existing decoded contract rather than
a new submission.

**Search decoded tables by address. Names are a hint, not an identifier.**

## While I am confessing

I also told a colleague, in writing, that the HTTP client did not handle 429 at all. It did. What it
actually got wrong was subtler and I had not read carefully enough to see it: it honoured
`Retry-After`, which Dune never sends, and otherwise backed off 250ms then 500ms. A total retry
budget of roughly three quarters of a second against a rate limit I had just measured taking up to
15 seconds to clear. It retried, and gave up an order of magnitude too early.

That is a worse class of bug than not handling the case, because the code looks like it handles it.

## What this does not show

It does not show that Dune's API is cheap in general. It shows that seven specific queries against
one protocol's data are cheap, on volumes as they stood on 14 September 2026. A query that scans
more will cost more, and I have one 4.259-credit data point saying how quickly that happens.

It does not show that reads are free as a matter of policy. It shows that on this plan, in this
billing period, 85 of them moved the counter by nothing.

And it emphatically does not show that anything works end to end. Nothing is deployed, nothing is
scheduled, and no user can see a single thing I built. The whole day's work cost 9.097 credits of
4,000, which is 0.23% of the month, and produced a lot of certainty about numbers and none at all
about whether the thing is useful.

The part I would keep, if I could keep only one: every fault above was found by reading output, not
by reading code. The bridge query, the whale feed and both wrong Horizon answers all completed
successfully. A green exit status tells you the query ran. It has never once told me the query was
right.
