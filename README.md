# Petko (Pete) Pavlovski

Senior Rust engineer · AI dev tooling · Sofia, Bulgaria · remote since 2019.

**making ai agents accessible to humans ❤️**

I write the part that has to stay up. I build kitbag, a Rust CLI that carries AI agent setups between coding tools, and nuthatch, an open-source Rust EVM indexer. I created Matchstick, The Graph’s subgraph testing framework. Production software since 2019. Rust since 2021.

[Portfolio](https://www.cargopete.com/) · [CV](https://www.cargopete.com/resume/) · [Download PDF](https://www.cargopete.com/resume/petko-pavlovski-resume.pdf) · [LinkedIn](https://www.linkedin.com/in/pete-pavlovski-07486a156/) · [pavlovskipetko@gmail.com](mailto:pavlovskipetko@gmail.com)

## Now

At Fathom, I build Rust services for an AI data platform.

## Selected work

### kitbag | AI dev tooling

Built a Rust CLI that captures an agent setup into a small, git-friendly profile and applies it to Claude Code, Cursor, Codex, Gemini CLI and Claude Desktop, in each tool’s native format. Secrets are redacted to environment variable references on capture. Every apply shows its plan, backs up each file it touches and can be reverted with kitbag undo. A single static binary for macOS, Linux and Windows, MIT licensed, in early release.

```sh
curl -fsSL https://raw.githubusercontent.com/cargopete/kitbag/main/install.sh | sh
```

[Source & documentation](https://github.com/cargopete/kitbag)

### nuthatch | Data infrastructure

Built a Rust indexer that follows the chain, seals data into Parquet and serves queries through SQL and MCP. A self-hosted indexing system, with its runtime, storage and query interfaces available as public source. It is the data source behind lodestar-dashboard.com.

[Project & documentation](https://nuthatch-indexer.com) · [Source](https://github.com/nuthatch-org/nuthatch)

### Matchstick | Testing infrastructure

Created a testing framework in Rust and WebAssembly at LimeChain, on a Graph Foundation grant. The Graph documents Matchstick as its subgraph unit testing framework. Developers run it through graph test. The matchstick-as package had 85,536 npm downloads in the 30 days to 19 November 2026, and LimeChain/matchstick has 217 GitHub stars.

[Official Graph documentation](https://thegraph.com/docs/en/subgraphs/tooling/unit-testing-framework/) · [Source](https://github.com/LimeChain/matchstick)

### Graphcast | Distributed systems

Designed and built Graphcast at GraphOps, using Rust, Waku and libp2p. Built Subgraph Radio to exchange subgraph information. A public SDK for gossip-powered applications, with Subgraph Radio as a concrete implementation. The subgraph-radio crate has 13,047 downloads across 30 releases, as of November 2026.

[Graphcast SDK](https://github.com/graphops/graphcast-sdk) · [Subgraph Radio](https://github.com/graphops/subgraph-radio)

## Also building

- [Lodestar](https://lodestar-dashboard.com): A dashboard for The Graph indexers. Turns protocol data into an interface an operator can use. [Source](https://github.com/nuthatch-org/lodestar).
- [redstart](https://redstart-lang.com): A typed language for subgraphs. Schema, manifest and mappings in one source, compiled to AssemblyScript for the existing Graph toolchain. [Source](https://github.com/nuthatch-org/redstart).
- [yatr](https://yetanothertaskrunner.com): A task runner in one Rust binary, with content-addressed caching, optional signing for its native cache protocol and REAPI HTTP cache support. [Source](https://github.com/cargopete/yatr).

More operator tools in [The Night’s Watch](https://github.com/nuthatch-org), and protocol explainers at [Learn The Graph](https://learn-thegraph.com).

## Experience

| Company | Role | When |
| --- | --- | --- |
| Fathom | Senior Software Engineer | Apr 2025 - present |
| The Graph / GraphOps | Senior Rust Engineer | Jul 2022 - Apr 2025 |
| Kraken | Rust Engineer | Dec 2021 - Jul 2022 |
| The Graph / LimeChain | Rust Engineer | Mar 2021 - Dec 2021 |
| OVO Energy | Full Stack Engineer | Jan 2020 - Mar 2021 |
| WeiChain | Junior Software Engineer | Jan 2019 - Jan 2020 |

Accountant before that, which is where the habit of checking the number twice comes from.

## Get in touch

For AI dev tooling, Rust backend or distributed systems work, send me the problem, the team and the constraints. Remote from Sofia, with European working hours and some US overlap.

[pavlovskipetko@gmail.com](mailto:pavlovskipetko@gmail.com) · [Full experience & CV](https://www.cargopete.com/resume/)

---

This repository also builds [cargopete.com](https://www.cargopete.com/) with Astro. [Development, publishing and content guide](docs/DEVELOPMENT.md).
