# Petko (Pete) Pavlovski

Senior Rust engineer, Sofia, Bulgaria · remote since 2019.

I write the part that has to stay up. Rust, mostly: distributed systems, P2P
protocols, blockchain indexing, and the tooling around them. Most of it is still
running.

**[cargopete.com](https://cargopete.com)** · **[CV (PDF)](https://cargopete.com/pete-pavlovski-cv.pdf)** · pavlovskipetko@gmail.com · [linkedin](https://www.linkedin.com/in/pete-pavlovski-07486a156/)

7 years 7 months shipping in production, Rust for the last five of them. 217 stars
on Matchstick. 36 of 89 public repos in Rust.

## Selected work

- **[graphcast](https://github.com/graphops/graphcast-sdk)** (GraphOps,
  2022-2025) - a P2P messaging protocol for The Graph's indexer network, built on
  Waku and libp2p. Gossip, fault-tolerant delivery, and a radio pattern that lets
  anyone add a message type without touching the core.
- **[matchstick](https://github.com/LimeChain/matchstick)** (The Graph, 2021) -
  unit testing for subgraphs, in Rust and WebAssembly. The ecosystem standardised
  on it. 217 stars, 17 forks, still maintained by others.
- **[nuthatch](https://nuthatch-indexer.com)** - a self-hosted blockchain indexer
  in one binary. Follows the chain, seals segments to Parquet, serves SQL and MCP,
  makes no calls home.
- **[yatr](https://yetanothertaskrunner.com)** - a single-binary task runner whose
  cache is content-addressed and signed, so a shared cache entry can be trusted
  rather than hoped about. Speaks REAPI.
- **Fathom** (current) - Rust services behind an AI data platform. Not public,
  which is why it isn't linked.

## History

| Company | Role | When |
|---|---|---|
| Fathom | Senior Software Engineer | Apr 2025 - present, Remote UAE |
| GraphOps | Senior Rust Engineer | Jul 2022 - Apr 2025, Remote |
| The Graph | Rust Engineer, then Developer Advocate | Mar 2021 - Jul 2024, Remote |
| Kraken | Rust Engineer | Dec 2021 - Jul 2022, Remote |
| OVO Energy | Full Stack Engineer | Jan 2020 - Mar 2021, Remote UK |
| WeiChain | Junior Software Engineer | Jan 2019 - Jan 2020, Sofia |

Accountant before that, which is where the habit of checking the number twice
comes from.

## Scope

**In:** Rust backends, services and CLIs · distributed systems and P2P protocol
work · blockchain indexing and data infrastructure · developer tooling and
testing frameworks · taking something that half works and making it hold ·
remote, EET, overlapping most of a European day.

**Out:** frontend as the main job (I ship React and Flutter when a project needs
it, but it isn't what you want me for) · smart contract auditing (written
contracts, not audited them for a living) · ML research (I build the pipelines,
not the models) · relocation and full US-hours on-call · work where the
architecture is settled and not open to a question.

---

## About this repo

This is also the source for [cargopete.com](https://cargopete.com) - a static
site, one page, no framework at runtime. Built with Astro, deployed on Vercel,
apex `www.cargopete.com`.

### Design

Built to the [cargopete-style](https://github.com/cargopete/cargopete-style)
house skill. That means the palette is mandated rather than chosen:
`src/styles/global.css` carries the skill's `reference/tokens.css` verbatim between
two `MANDATED` markers. **Edit those tokens in the skill and re-copy them here** -
never in this repo - so every site in the house style stays identical.

Texture is flat: no gradients, no shadows, hairline borders and whitespace doing the
structural work. Dark by default with a light theme that is a faithful inversion.

The terminal transcript in the hero is real output, run on 21 August 2026. Both
commands can be pasted into a shell and reproduced. If the numbers drift, rerun them
and update the page rather than rounding.

### Develop

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # -> dist/
npm run check        # Astro types and content
```

Or with yatr: `yatr dev`, `yatr build`, `yatr ci`.

### Assets

Fonts are self-hosted, subset with `fonttools` to the glyphs the page uses. Together
they are 35KB, which is most of the page weight. Do not add a font CDN.

The favicon set is drawn, not imported. `public/favicon.svg` is the source of truth;
`scripts/make-favicon.py` reproduces the same geometry as PNG and ICO with no
dependencies beyond the standard library. Change both together, then run
`yatr favicon`.

### Budget

| | Before (Next.js) | Now |
|---|---|---|
| Transfer | 276 KB | 43 KB |
| Requests | 11 | 3 |
| Hosts | 1 | 1 |
| Runtime JS | React + framer-motion + lucide | 34 lines, inline |

Zero third-party requests is a rule, not a target. No analytics, no tag manager, no
font CDN.

### Deploy

Vercel auto-detects Astro: build `npm run build`, output `dist/`. Pushes to `main`
deploy. `vercel.json` sets the security headers and a one-year immutable cache on
`/fonts/*`.
