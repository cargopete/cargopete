export const portfolio = {
  role: 'Senior Rust engineer',
  headline: 'I write the part that has to stay up.',
  summary: 'I created Matchstick, The Graph’s subgraph testing framework. I build Rust backends, indexers and P2P protocols. Production software since 2019. Rust since 2021.',
  current: 'At Fathom, I build Rust services for an AI data platform. Previously The Graph, Kraken and OVO Energy.',
  contact: 'For Rust backend, distributed systems or developer tooling work, send me the problem, the team and the constraints.',
  selected: [
    {
      id: 'matchstick', name: 'Matchstick', label: 'Testing infrastructure',
      context: 'The Graph · LimeChain · 2021',
      title: 'Test a subgraph before it meets the chain.',
      problem: 'Subgraph mappings need tests for event handlers and the entities they write.',
      contribution: 'Created a testing framework in Rust and WebAssembly at LimeChain, on a Graph Foundation grant.',
      result: 'The Graph documents Matchstick as its subgraph unit testing framework. Developers run it through graph test.',
      tags: ['Rust', 'WebAssembly', 'Developer tooling'],
      links: [
        { label: 'Official Graph documentation', href: 'https://thegraph.com/docs/en/subgraphs/tooling/unit-testing-framework/' },
        { label: 'Source', href: 'https://github.com/LimeChain/matchstick' },
      ],
    },
    {
      id: 'nuthatch', name: 'nuthatch', label: 'Data infrastructure',
      context: 'Independent open source',
      title: 'From chain events to a queryable data service.',
      problem: 'Applications need indexed blockchain data without depending on a hosted indexing provider.',
      contribution: 'Built a Rust indexer that follows the chain, seals data into Parquet and serves queries through SQL and MCP.',
      result: 'A self-hosted indexing system, with its runtime, storage and query interfaces available as public source.',
      tags: ['Rust', 'Parquet', 'SQL', 'MCP'],
      links: [
        { label: 'Project & documentation', href: 'https://nuthatch-indexer.com' },
        { label: 'Source', href: 'https://github.com/nuthatch-org/nuthatch' },
      ],
    },
    {
      id: 'graphcast', name: 'Graphcast', label: 'Distributed systems',
      context: 'The Graph · GraphOps · 2022 - 2025',
      title: 'Let indexers talk to one another.',
      problem: 'Indexers need to exchange information across a decentralised network.',
      contribution: 'Designed and built Graphcast at GraphOps, using Rust, Waku and libp2p. Built Subgraph Radio to exchange subgraph information.',
      result: 'A public SDK for gossip-powered applications, with Subgraph Radio as a concrete implementation.',
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
