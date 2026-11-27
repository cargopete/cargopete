export const portfolio = {
  role: 'Senior Rust engineer',
  focus: 'AI dev tooling',
  tagline: 'making ai agents accessible to humans ❤️',
  headline: 'I write the part that has to stay up.',
  summary: 'I build kitbag, a Rust CLI that carries AI agent setups between coding tools, and nuthatch, an open-source Rust EVM indexer. I created Matchstick, The Graph’s subgraph testing framework. Production software since 2019.',
  current: 'At Fathom, I build Rust services for an AI data platform.',
  // The hero's stat panel. Each case study's result carries a different figure, so none repeats.
  figures: [
    { name: 'Matchstick', figure: '684,284', text: 'npm downloads of matchstick-as in the year to 19 Nov 2026' },
    { name: 'nuthatch', figure: '137', text: 'releases, from v0.0.1 on 14 Jul 2026 to v5.24.1 on 26 Nov 2026' },
    { name: 'Graphcast', figure: '53,119', text: 'crates.io downloads of graphcast-sdk, as of Nov 2026' },
  ],
  contact: 'For AI dev tooling, Rust backend or distributed systems work, send me the problem, the team and the constraints.',
  selected: [
    {
      id: 'kitbag', name: 'kitbag', label: 'AI dev tooling',
      context: 'Independent open source · 2026',
      title: 'One agent setup, every coding tool.',
      problem: 'Every AI coding tool starts empty. MCP servers, rules and skills get re-added by hand in each one, in its own format, with API keys pasted into yet another config file.',
      contribution: 'Built a Rust CLI that captures an agent setup into a small, git-friendly profile and applies it to Claude Code, Cursor, Codex, Gemini CLI and Claude Desktop, in each tool’s native format.',
      result: 'Secrets are redacted to environment variable references on capture. Every apply shows its plan, backs up each file it touches and can be reverted with kitbag undo. A single static binary for macOS, Linux and Windows, MIT licensed, in early release.',
      install: 'curl -fsSL https://raw.githubusercontent.com/cargopete/kitbag/main/install.sh | sh',
      tags: ['Rust', 'CLI', 'MCP', 'AI agents'],
      links: [
        { label: 'Source & documentation', href: 'https://github.com/cargopete/kitbag' },
      ],
    },
    {
      id: 'nuthatch', name: 'nuthatch', label: 'Data infrastructure',
      context: 'Independent open source',
      title: 'From chain events to a queryable data service.',
      problem: 'Applications need indexed blockchain data without depending on a hosted indexing provider.',
      contribution: 'Built a Rust indexer that follows the chain, seals data into Parquet and serves queries through SQL and MCP.',
      result: 'A self-hosted indexing system, with its runtime, storage and query interfaces available as public source. It is the data source behind lodestar-dashboard.com.',
      tags: ['Rust', 'Parquet', 'SQL', 'MCP'],
      links: [
        { label: 'Project & documentation', href: 'https://nuthatch-indexer.com' },
        { label: 'Source', href: 'https://github.com/nuthatch-org/nuthatch' },
      ],
    },
    {
      id: 'matchstick', name: 'Matchstick', label: 'Testing infrastructure',
      context: 'The Graph · LimeChain · 2021',
      title: 'Test a subgraph before it meets the chain.',
      problem: 'Subgraph mappings need tests for event handlers and the entities they write.',
      contribution: 'Created a testing framework in Rust and WebAssembly at LimeChain, on a Graph Foundation grant.',
      result: 'The Graph documents Matchstick as its subgraph unit testing framework. Developers run it through graph test. The matchstick-as package had 85,536 npm downloads in the 30 days to 19 November 2026, and LimeChain/matchstick has 217 GitHub stars.',
      tags: ['Rust', 'WebAssembly', 'Developer tooling'],
      links: [
        { label: 'Official Graph documentation', href: 'https://thegraph.com/docs/en/subgraphs/tooling/unit-testing-framework/' },
        { label: 'Source', href: 'https://github.com/LimeChain/matchstick' },
      ],
    },
    {
      id: 'graphcast', name: 'Graphcast', label: 'Distributed systems',
      context: 'The Graph · GraphOps · 2022 - 2025',
      title: 'Let indexers talk to one another.',
      problem: 'Indexers need to exchange information across a decentralised network.',
      contribution: 'Designed and built Graphcast at GraphOps, using Rust, Waku and libp2p. Built Subgraph Radio to exchange subgraph information.',
      result: 'A public SDK for gossip-powered applications, with Subgraph Radio as a concrete implementation. The subgraph-radio crate has 13,047 downloads across 30 releases, as of November 2026.',
      tags: ['Rust', 'P2P', 'Waku', 'libp2p'],
      links: [
        { label: 'Graphcast SDK', href: 'https://github.com/graphops/graphcast-sdk' },
        { label: 'Subgraph Radio', href: 'https://github.com/graphops/subgraph-radio' },
      ],
    },
  ],
  building: [
    {
      name: 'Lodestar', kind: 'Indexer operations',
      text: 'A dashboard for The Graph indexers. Turns protocol data into an interface an operator can use.',
      tags: 'TypeScript · data products', href: 'https://lodestar-dashboard.com',
      source: 'https://github.com/nuthatch-org/lodestar',
    },
    {
      name: 'redstart', kind: 'Language tooling',
      text: 'A typed language for subgraphs. Schema, manifest and mappings in one source, compiled to AssemblyScript for the existing Graph toolchain.',
      tags: 'Rust · compilers', href: 'https://redstart-lang.com',
      source: 'https://github.com/nuthatch-org/redstart',
    },
    {
      name: 'yatr', kind: 'Build tooling',
      text: 'A task runner in one Rust binary, with content-addressed caching, optional signing for its native cache protocol and REAPI HTTP cache support.',
      tags: 'Rust · build systems', href: 'https://yetanothertaskrunner.com',
      source: 'https://github.com/cargopete/yatr',
    },
  ],
};
