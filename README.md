# Petko (Pete) Pavlovski

Senior Rust engineer, Sofia, Bulgaria · remote since 2019.

I write the part that has to stay up. Rust, mostly: indexers, languages, P2P
protocols, and the tooling around them. Most of it is still running.

**[cargopete.com](https://cargopete.com)** · **[resume](https://cargopete.com/resume/)** · pavlovskipetko@gmail.com

7 years 8 months shipping in production, Rust for the last five of them. 3,199
commits across all 90 repositories in [The Night's
Watch](https://github.com/nightswatchhq). 217 stars on Matchstick. 40 of 93
public repos in Rust.

## Building now

- **[nuthatch](https://nuthatch-indexer.com)** - be your own indexer. One Rust
  binary, one command, a live indexed API in under two minutes. Follows the
  chain, seals segments to Parquet, serves SQL and MCP, and has no mandatory
  third-party data dependency. A public good rather than a business.
- **[redstart](https://redstart-lang.com)** - a language for authoring subgraphs.
  Schema, manifest and mappings collapse into one typed source that transpiles to
  AssemblyScript the canonical toolchain builds unmodified. The whole family of
  AssemblyScript footguns becomes unrepresentable. If it compiles, it works.
- **[yatr](https://yetanothertaskrunner.com)** - a single-binary task runner whose
  cache is content-addressed and signed, so a shared cache entry can be trusted
  rather than hoped about. Speaks REAPI.

## Shipped, and still running

- **[matchstick](https://github.com/LimeChain/matchstick)** (The Graph, 2021) -
  unit testing for subgraphs, in Rust and WebAssembly. The ecosystem standardised
  on it. 217 stars, 17 forks, still maintained by others.
- **[graphcast](https://github.com/graphops/graphcast-sdk)** and
  **[subgraph-radio](https://github.com/graphops/subgraph-radio)** (GraphOps,
  2022-2025) - a P2P messaging protocol for The Graph's indexer network, built on
  Waku and libp2p. Gossip, fault-tolerant delivery, and a radio pattern that lets
  anyone add a message type without touching the core.
- **[The Night's Watch](https://github.com/nightswatchhq)** - the unglamorous half
  of The Graph: indexers, gateways, data services, judges and doctors. Lodestar,
  Dispatch, Foghorn, horizon-doctor, Graphite, and
  [learn-thegraph.com](https://learn-thegraph.com).
- **On-chain data** - at [Dune](https://dune.com/home) since September 2026.
  Before that, Rust services and dataops workflows behind an AI data platform at
  Fathom.

## History

| Company | Role | When |
|---|---|---|
| Dune | On-chain data wizard | Sep 2026 - present, Remote |
| Fathom | Senior Software Engineer | Apr 2025 - Sep 2026, Remote UAE |
| GraphOps | Senior Rust Engineer | Jul 2022 - Apr 2025, Remote |
| The Graph | Rust Engineer, then Developer Advocate | Mar 2021 - Jul 2024, Remote |
| Kraken | Rust Engineer | Dec 2021 - Jul 2022, Remote |
| OVO Energy | Full Stack Engineer | Jan 2020 - Mar 2021, Remote UK |
| WeiChain | Junior Software Engineer | Jan 2019 - Jan 2020, Sofia |

Accountant before that, which is where the habit of checking the number twice
comes from.

## Scope

Not looking for work. This is here so that if you do write, we both know within a
paragraph whether it is going anywhere.

**In:** Rust backends, services and CLIs · distributed systems and P2P protocol
work · blockchain indexing and data infrastructure · developer tooling, languages
and testing frameworks · taking something that half works and making it hold ·
remote, EET, overlapping most of a European day.

**Out:** frontend as the main job (I ship React and Flutter when a project needs
it, but it isn't what you want me for) · smart contract auditing (written
contracts, not audited them for a living) · ML research (I build the pipelines,
not the models) · relocation and full US-hours on-call · work where the
architecture is settled and not open to a question.

---

## About this repo

This is also the source for [cargopete.com](https://cargopete.com) - a static
site, two pages, no framework at runtime. Built with Astro, deployed on Vercel,
apex `www.cargopete.com`.

`/` is the showcase. `/resume/` carries the work history and the scope panel.
There is no downloadable CV: a PDF drifts from the site the moment it is written,
and the last one still pointed at a GitHub handle that had moved on.

### Design

Built to the [cargopete-style](https://github.com/cargopete/cargopete-style)
house skill. That means the palette is mandated rather than chosen:
`src/styles/global.css` carries the skill's `reference/tokens.css` verbatim between
two `MANDATED` markers. **Edit those tokens in the skill and re-copy them here** -
never in this repo - so every site in the house style stays identical.

Texture is flat: no gradients, no shadows, hairline borders and whitespace doing the
structural work. **Light by default**, with the dark theme a faithful inversion of
it. Light is set as `data-theme="light"` on `<html>` server-side, so the inline
script only has to undo it for a reader who chose dark, and a reader with
JavaScript off gets the intended page rather than the other one.

The index rows on the homepage (`.shelf`) are borrowed from
[learn-thegraph.com](https://learn-thegraph.com), which runs the same house style.
A catalogue reads better as a list of rows with a count on the left than as
another grid of boxes.

Two light-theme contrast fixes are carried over from that site's design notes: the
terminal title bar uses `var(--bg-inset)` rather than a `color-mix` the contrast
validator cannot see, and the window title runs at `--text-muted` rather than
`--text-faint`, which measures 2.49 on that bar in light and fails.

The terminal transcript in the hero is real output, run on 2 September 2026. Both
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
