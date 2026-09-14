---
title: "Wiring Dune into Lodestar needs a credit ledger before it needs a query"
date: "2026-09-14"
description: "Night's Watch indexes The Graph with its own tools. Some data is not worth indexing ourselves, so Dune becomes a second source. The interesting part was not the SQL: it was that a metered third-party API needs admission control before it needs a single feed."
tags: ["dune", "lodestar", "kittiwake", "nuthatch", "rust", "architecture"]
---

Night's Watch runs its own indexing. [Nuthatch](https://nuthatch-indexer.com) folds smart contract
events into Postgres, Lodestar's backend reads those nests, and the dashboard reads the backend.
That chain is entirely ours, which is the point of it: when a number on the dashboard looks wrong,
there is exactly one place to go and look.

There is a category of data that chain does not cover and probably never should. Token prices.
Labelled exchange addresses. Bridge flows on a chain we do not index. The decoded history of
contracts somebody else submitted years ago. Indexing all of that ourselves would be a second
full-time system in service of a handful of tiles.

Dune already has it. So Dune becomes a second source alongside the nests, and this post is about
what that integration actually needed. **The surprising part was not the SQL. It was that a metered
third-party API needs admission control before it needs a single feed.**

Nothing has shipped yet. Nothing is deployed or scheduled, and the one registry entry that would
start a feed is still `enabled = false`. What follows is design and measurement, on one account, on
14 September 2026.

## The shape of it

Four small Rust crates, sitting between Dune's API and the backend that Lodestar reads:

- `dune-client` talks to the HTTP API. It reads cached results and never triggers an execution,
  which matters more than it sounds and is covered below.
- `dune-registry` is a TOML catalogue of every query we are willing to run, with its cadence, its
  target table, and a cost estimate. Boot validation rejects a registry that does not add up.
- `dune-ledger` is admission control over a shared Postgres budget. Nothing runs a paid query
  without a committed reservation.
- `dune-poller` fetches the latest results and materialises them into typed tables that the backend
  can serve exactly like anything a nest produced.

The last part is the one that makes it worth doing at all. Once a Dune query lands in Postgres as a
typed table with a publication pointer, the rest of the stack does not care where it came from. A
tile reading GRT price history and a tile reading indexer allocations are the same shape of query
against the same database. Dune is a source, not a special case.

## Why the ledger comes first

The obvious build order is a query, then a fetch, then a table, then a tile. I did it the other way
round, and would again.

Dune bills per execution. The account is a fixed monthly subscription, and its included allowance is
**not a cap**: when the credits run out, extra ones are charged automatically at the plan rate.
Nothing stops. That last detail reframes the whole integration. A bug in a scheduler on a system
billing by the request is not an outage, it is an invoice.

So `dune-ledger` holds a per-period budget, admits work against it, and refuses once the ceiling is
reached. It is deliberately set at 3,600 credits against an allowance of 4,000, so the last ten
percent is never spent by us. Reservations are durable rows: a process that dies after Dune accepted
its request leaves the reservation charged rather than silently forgotten, because an overestimate
is recoverable and an unrecorded execution is not.

There is one thing the ledger cannot do, and it took me longer than it should have to notice.
Admission originally summed only the ledger's own reservations, which made it blind to any execution
started outside it: a query scheduled on Dune's side, or a person in the web UI. It would have
authorised a full allowance while the account sat against its ceiling. Admission now takes the
greater of its own books and **Dune's own reported account usage**, so neither blind spot lets
spending through.

Even that is detection, not prevention. Two paths spend the allowance and cannot be blocked from
inside our stack. The honest mitigation is a spend audit that reports what Dune billed against what
the ledger admitted, and warns loudly on the difference.

## The billing does not work the way the documentation reads

Having built a budget, it seemed worth checking the assumptions in it.

The plan assumed fetching results costs money, since Dune's billing page separates execution from
export. Baseline was 0.439 credits. Twenty reads at `limit=1`. No change. Twenty full 31-row reads.
No change. Across the day, roughly 85 reads and some 7,000 datapoints moved the counter by zero.

An unmoving counter proves nothing on its own; it is equally consistent with a broken gauge. So I
spent one execution to see whether the number could move at all:

```
usage before:            0.439
execution 01M2FE164Q...  cost 0.094852942
usage after (5 seconds): 0.534
```

Five executions over the day summed to 6.6739 credits and took usage from 0.439 to 7.113, which
reconciles to the microcredit. **Account usage is the sum of execution costs, and reads contribute
nothing.** That is why `dune-poller` reads cached results rather than executing: the poller can run
as often as freshness demands and cost nothing at all.

Two smaller things, for anyone automating against this API. Account usage lives at
`POST /api/v1/usage`; a `GET` returns 405 with `allow: POST`. And there is a rate limit unrelated to
credits, returning HTTP 429 with no `Retry-After` and no `X-RateLimit-*` headers, so a client must
back off blind. Recovery took up to 15 seconds.

This is one account, one plan, one billing period. It is not a promise that exports are free forever,
and table writes are separately documented at 3 credits per GB, which I did not measure.

## The cost on a running query is not the bill

`execution_cost_credits` appears on the status response while a query is still executing, and it is
tempting to treat that as the cost. It is an estimate, and it can go **down**:

| Reading | Credits |
|---|---|
| While `QUERY_STATE_EXECUTING` | 13.15574089 |
| Settled, `QUERY_STATE_COMPLETED` | 4.25897059 |

A ledger that settled on the in-flight figure would have charged itself three times over. Ours skips
executions that are still running, which I had justified as tidiness and turns out to be
load-bearing, which is a nicer way of saying I was right by accident.

## The budget was wrong by two orders of magnitude

The plan assumed 10 credits per execution. Dune does not publish a per-query price, because cost
tracks actual compute, so that number came from nowhere in particular.

Measured, across the seven feed queries built so far:

| Query | Credits |
|---|---|
| Daily price OHLC | 0.064 to 0.153 |
| Hourly price, 7 days | 0.108500 |
| Bridge escrow flow, daily | 0.055794 |
| Whale transfers, 24h, labelled | 0.184794 |
| CEX flows, daily, both chains | 0.426853 |
| Holder concentration, full history | 0.278265 |
| Legacy L1 staking remnants | 0.348265 |

At their catalogued cadences, those seven come to **about 43 credits a month** against an allowance
of 4,000. The plan had budgeted roughly 4,000 for that workstream alone. The real constraint on how
often these run is how fresh the data needs to be, not what it costs.

That is not a blank cheque. Identical SQL varied 0.064 to 0.153 across three runs, so one
observation is a lower bound and not a figure. Cost tracks the scan rather than the result: the most
expensive thing I ran all day was an unanchored `information_schema` search at 4.259 credits, which
returned fewer rows than a query costing a twentieth of that.

## Two queries ran successfully and were wrong

Both completed without error. Both would have reached a tile if I had checked the exit status
instead of the numbers.

**The bridge query said the bridge was draining.** It reported a cumulative net flow of −294,162,620
GRT. The escrow actually holds +2,559,552,592. The running sum sat inside a 400-day date filter, so
it started from zero at the window edge and measured something nobody wanted. Computing the
cumulative across all history and limiting only the output fixed it, and made it *cheaper*, because
filtering to two addresses beats filtering by date.

**The whale feed's three largest events were an exchange talking to itself.** 50,000,000 GRT into
`Binance Internal 2`, the same 50,000,000 out to `Binance 14`, and 46,693,699 between two more
Binance wallets. On a feed captioned "large transfers" those read as enormous market movements. They
are one exchange rearranging its own float. Each transfer now carries a classification, so a deposit
and an internal shuffle are different rows rather than the same headline, and the fix immediately
separated out a genuine 50,000,000 GRT deposit that had been hiding among them.

## I answered the same question wrong twice

The question: are The Graph's Horizon contracts decoded on Dune? It matters because anything already
decoded is a table we can query today rather than a contract we need submitted.

**First attempt.** I filtered schema names on `graph%`. That returns `graphprotocol_arbitrum` and
four `graphene_*` schemas, which belong to an unrelated Carbon project, and misses every
`thegraph_*` namespace, where 830 decoded tables actually live. The answer I nearly published was
that nobody had decoded The Graph. People have been maintaining that decoding for years.

**Second attempt.** I searched table names for `horizonstaking` and its siblings. Nothing found, so I
wrote up that no Horizon contract is decoded. Also wrong, for a reason worth remembering: **a decoded
table on Dune is named after whatever the submitter typed, not after the contract.** Somebody
submitted HorizonStaking as `staking`. It is also a proxy upgraded in place, so it kept the legacy
contract's address.

**Third attempt, by address, which worked.** `thegraph_arbitrum.staking_evt_stakedeposited` sits on
`0x00669a4cf01450b64e8a2a20e9b1fcb71e61ef03` with 182,178 events. That is HorizonStaking, decoded all
along, **under the legacy ABI**. All 22 of its event tables are old vocabulary: allocations, rebates,
the pre-Horizon delegation model. There is no `provision` table, no `thawrequest`, no Horizon
slashing anywhere on Dune.

So the contract is present and its current events are not, which is a different problem needing a
different fix: an ABI update on an existing decoded contract rather than a new submission. **Search
decoded tables by address. Names are a hint, not an identifier.**

## What is not built

No tile exists. Lodestar has not been touched, no backend route serves any of this, and the poller
materialises into a table nothing reads yet. The path from here is projection views, endpoints, then
the dashboard work, and none of it has started.

The next phase is more interesting than the feeds, and is the reason the ledger was built to be
shared rather than owned by one binary: pointing Dune at our own indexer as an independent check.
Nuthatch folds the same contracts into the same shapes, and two systems that disagree about a number
have told you something. That only works if both can draw from one budget without racing each other,
which is the shape `dune-ledger` already has.

The thing I would take away, if only one: every fault above was found by reading output, not by
reading code. The bridge query, the whale feed and both wrong Horizon answers all completed
successfully. A green exit status tells you the query ran. It has never once told me it was right.
