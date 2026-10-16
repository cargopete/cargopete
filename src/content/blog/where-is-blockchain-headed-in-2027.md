---
title: "Where is blockchain technology headed in 2027?"
date: "2026-10-16"
description: "The market is down, the money has gone to fewer and larger players, and the people building are fewer too. AI is changing what one developer can ship, and agents are becoming users. What the numbers say about 2027, and why I am building for the people the industry is leaving behind."
tags: ["blockchain", "ai", "web3", "industry", "nuthatch", "essay"]
---

*I am writing this in the middle of October 2026, with bitcoin about $30,000 below where it was a
year ago. Price predictions are cheap, and I will not add to them. What follows is what the data
already says about where this industry is going, what AI is doing to the way it gets built, and why
I think the most useful thing a developer can do right now is serve the people the rest of the
industry is quietly walking away from.*

---

## The market is brutal, and selectively so

On the morning of 15 October one bitcoin was worth
[$80,915](https://fortune.com/article/price-of-bitcoin-10-15-2026), about $29,900 less than a year
earlier. A hotter than expected US inflation print that week took the whole crypto market down to
roughly [$2.71 trillion](https://www.thecoinrepublic.com/2026/10/15/crypto-market-crash-heres-why-btc-eth-xrp-sol-others-retreat-today/),
with close to a billion dollars of leveraged positions liquidated and most large altcoins down 5 to
10% on the week.

Washington has not helped. The CLARITY Act, the market-structure bill that was supposed to settle
which regulator owns what, [failed a Senate cloture vote 49 to 50](https://www.dlapiper.com/en/insights/publications/2026/09/senate-fails-to-advance-the-clarity-act)
on 15 September. With the midterms on 3 November and a new Congress sworn in in January, comprehensive
market-structure law is now
[unlikely before 2027](https://www.orrick.com/en/Insights/2026/10/The-CLARITY-Act-Stalls-in-the-Senate-Whats-Next-for-Digital-Asset-Regulation),
and the SEC and CFTC are improvising an interim regime under the authority they already have.

But the brutality is selective, and that is the more interesting fact. Stablecoins hold about
[$303 billion](https://stablecoinbeat.com/tracker/) in supply this week, a few percent off their May
peak and nowhere near a crash. Money that moves is doing fine. It is the tokens, and the people who
built around them, that are having the bad year.

## Capital has concentrated, and so has everything else

CoinGecko's count of crypto venture funding for the first half of 2026 comes to
[$13.3 billion across 435 deals](https://www.coingecko.com/learn/crypto-vc-funding-h1-2026). In 2022
the same industry did 1,978 deals. The money did not leave; it went to fewer, bigger places. The
average deal grew from $11.7 million to $47.4 million, and seed rounds fell from 35.3% of all deals in
2022 to 18.7%. Galaxy's figure for the second quarter puts
[78.3% of capital into later-stage companies](https://www.tradingview.com/news/cointelegraph:4f31d7c30094b:0-crypto-funding-rises-50-as-venture-capital-shifts-to-fewer-larger-deals/).

The rest of the market rhymes with it:

- **Two issuers hold 83% of all stablecoins.** Tether's USDT is about $184 billion and Circle's USDC
  about $73 billion.
- **The banks are arriving as banks.** A consortium of
  [21 large banks](https://finance.yahoo.com/markets/crypto/articles/21-major-banks-building-stablecoin-162754667.html),
  among them Citi, Goldman Sachs, Bank of America and Wells Fargo, has committed to issue a dollar
  stablecoin under the GENIUS Act, and JPMorgan is building its own deposit token rather than join
  them.
- **Tokenisation means asset managers.** Tokenised real-world assets are worth around
  [$30 billion](https://news.bitcoin.com/tokenized-real-world-assets-31-billion-circle-usyc-blackrock/),
  most of it Treasury funds from firms like BlackRock, Franklin Templeton and Circle.
- **Mergers buy licences, not ideas.** The acquirers this year have mostly been buying
  [regulatory licences and payment rails](https://license.aiying.cc/en/global-compliance/crypto-ma-h1-2026-9-4-billion-license-consolidation/),
  because that is faster than applying for them.

None of this is a conspiracy, and much of it is sensible business. Regulated money wants regulated
counterparties, and a dollar stablecoin issued by a bank is a perfectly good product. But it is worth
saying plainly what the shape is. **An industry founded on removing intermediaries is busily
reassembling them**, and the new ones are the old ones with a blockchain inside.

## The community is thinning

The builders have moved too. Artemis counted weekly crypto commits falling from about 850,000 to
210,000 between early 2025 and March 2026, and
[active developers down 56% to around 4,600](https://www.coindesk.com/tech/2026/03/12/crypto-developer-activity-sinks-to-multi-year-low-as-ai-absorbs-github-s-talent-boom).
Electric Capital's monthly figure peaked at roughly 31,000 developers in 2022. Some of the drop is
methodology and some is efficiency, but much of it looks like people taking their time to AI
instead.

Those who stayed are older hands. Developers with more than two years in the ecosystem grew by about
a quarter and now write roughly 70% of the commits. That is a healthier core and a much thinner edge.
Fewer newcomers arrive, fewer weekend projects survive to Monday, and fewer people in the room have
ever shipped something without a budget behind it.

The tooling follows the money, as it always does. Data infrastructure in particular has drifted
toward enterprise plans, pre-indexed networks you can only reach through someone else's API, and
pricing pages that end in "contact sales". The free paths narrow. Subgraph Studio's development
endpoint allows 3,000 queries a day, and on 8 October Studio stopped serving BNB Chain and Polygon
subgraphs, moving that traffic to The Graph Network. A subgraph that no indexer picks up there simply
stops answering. Each of those decisions is defensible on its own. Together they leave the indie
developer, the hackathon team and the three-person protocol with fewer options every quarter.

## AI-augmented development is the real change

If 2026 had one change that will still matter in 2030, it is not a chain or a token. It is that most
software is now written with an AI agent in the loop. JetBrains' 2026 developer survey puts weekly
use of coding agents among professional developers at
[90%](https://blog.jetbrains.com/research/2026/08/ai-coding-agent-adoption-2026/). Sonar's
[State of Code report](https://www.sonarsource.com/state-of-code-developer-survey-report.pdf) makes
the more useful observation: the gain has not shown up as a flood of finished work, because the
bottleneck moved from writing code to verifying it.

That matters more on a blockchain than almost anywhere else, because a deployed contract cannot be
patched and a wrong number is somebody's money. Both edges are already sharp:

- **Attack is cheap.** In Anthropic's study, frontier models produced working exploits for
  [207 of 405 contracts](https://cointelegraph.com/news/ai-models-autonomously-generate-4-6m-in-real-world-smart-contract-exploits)
  that had been exploited between 2020 and 2025, a simulated $550.1 million. They also found
  $4.6 million of exploits in contracts deployed after their training data was gathered.
- **Vibe coding has a body count.** The Moonwell incident came from generated oracle code that used
  the cbETH/ETH exchange ratio as if it were a dollar price, and valued cbETH at about
  [$1.12 instead of $2,200](https://www.nadcab.com/blog/ai-powered-hackers-attacking-old-smart-contracts).
- **Defence is catching up.** A purpose-built AI auditor flagged vulnerabilities in
  [92% of 90 exploited DeFi contracts](https://bex.co/blog/2026/03/09/ai-smart-contract-audit-arms-race)
  in a February benchmark. The working model in 2027 will be machines finding candidates and people
  deciding which are real.

There is a hopeful side, and I am living in it. Nuthatch's first commit was on 14 July 2026. Three
months later the repository has 3,072 commits, 1,191 merged pull requests and 106 tagged releases,
and one person maintains it. I could not have done that alone in 2023, and I would not have tried.
**AI does not only help the big teams. It is the first thing in years that lets one developer build
infrastructure that used to need a company.**

The discipline that makes that safe is boring and old: determinism, tests with exact expected output,
measurements checked in CI, and a clear line about where a model is allowed to act. In nuthatch the
line is simple. Models write code and tests, which are reviewed like any other code. **Model output
never sits in the data path**, so nothing a model guesses can end up as a stored balance. I expect
the projects that come out of 2027 intact to have drawn the same line somewhere.

## Agents are becoming users

The second AI story is that software agents are starting to transact. x402, the HTTP-402 payment
standard Coinbase started and now governed at the Linux Foundation, has carried more than
[138 million transactions](https://www.coindesk.com/business/2026/10/14/ai-agents-make-138-million-crypto-payments-as-u-s-dominates-spending-on-ai-models)
on Base, according to Chainalysis. The money is still small: about 75 million payments worth
roughly $24 million in July, more than 87% of them under ten cents. The plumbing is real and the
economy is not here yet, which is exactly the stage at which plumbing is worth building.

An agent that pays for data also needs to read chain data, and it needs to read the real schema
rather than a guess at it. That is why nuthatch compiles an MCP server into the binary. I expect
"can an agent query it directly" to become a standard question about any data tool in 2027.

Meanwhile the most-used consumer product to come out of the crypto years is a betting venue.
Kalshi and Polymarket together traded
[$53 billion in July](https://predictionnews.com/story/kalshi-and-polymarket-combined-volume-more-than-doubled-to-53-billion-from-may-t),
mostly on sport, and the larger of the two is a CFTC-regulated exchange that is not on a chain at all.
Draw your own conclusions.

## What else to watch in 2027

- **Quantum.** BIP-360, a new output type that could carry post-quantum signatures later,
  [entered the BIPs repository in February](https://www.moonpay.com/learn/cryptocurrency/can-quantum-computers-break-bitcoin-bip-360)
  and is not activated. The hard argument is not the cryptography. It is whether coins whose owners
  never migrate should eventually be frozen, which is a question about property, not mathematics.
- **Stablecoin rules in force.** The GENIUS Act regime is
  [due to take effect early in 2027](https://www.americanbanker.com/news/stablecoins-will-be-a-key-element-of-banking-infrastructure-in-2026),
  and bank-issued dollar tokens will launch into it.
- **Market structure, again.** The CLARITY Act, or something like it, returns to a new Congress.
- **Tokenised funds.** Expect the asset managers to keep filing, and the total to keep rising
  whatever token prices do.

## Somebody still has to serve the small teams

A concentrating market has a predictable blind spot. A three-person team or a student at a hackathon
is a small account, so they become an unprofitable one, and then nobody's priority. The industry is
not hostile to them. It simply has larger customers to look after.

That is the gap [Nuthatch](https://github.com/nuthatch-org/nuthatch) exists for, and it is aimed
squarely the other way. It is one static binary that you run on your own machine. Point it at a
contract and it fetches the ABI, generates a table for every event, backfills over ordinary JSON-RPC
and follows the chain. You query it with SQL over HTTP, from the command line, or through the MCP
server. There is no account, no API key, no telemetry and no meter, and it stays under 2 GB of RAM
per chain. It is MIT or Apache-2.0, it is EVM only, and nobody, me included, holds a key you do not.

It is also a public good rather than a company: no investor, no grant, no sponsor. In a year when
the money has gone to whoever is already largest, that is not a weakness to apologise for. It is the
only arrangement under which a tool stays pointed at the people who cannot pay for one. I wrote more
about where it came from in [Why I built Nuthatch](https://nuthatch-indexer.com/blog/why-i-built-nuthatch/).

## Six predictions I am prepared to be wrong about

1. **Fewer and larger.** Crypto venture deals keep falling in number while the average round keeps
   growing, and seed's share of deals goes on shrinking.
2. **Stablecoins and tokenised funds grow whatever tokens do.** Bank-issued dollar tokens are live by
   the end of 2027.
3. **AI-written contract code causes a headline exploit,** and AI-assisted audit becomes the
   expected minimum rather than a selling point.
4. **Fewer crypto developers are counted, and more is shipped per developer.** Both numbers will be
   quoted, usually in separate articles.
5. **Agent payments grow far faster in count than in value.**
6. **The tooling gap for small teams widens, and self-hosting comes back** as the way to close it.

If you are one of those small teams, the quickest way to find out whether nuthatch is any use to
you is to run it:

```sh
curl -fsSL https://nuthatch-indexer.com/install.sh | sh
export PATH="$HOME/.local/bin:$PATH"
nuthatch init 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 --alias weth
nuthatch dev --backfill 300
nuthatch sql "SELECT count(*) FROM weth__transfer"
```

If it breaks on your contract, that is the most useful thing you can tell me.
