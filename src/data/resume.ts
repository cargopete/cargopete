// Everything the resume says, once. src/pages/resume.astro renders it and
// scripts/resume-pdf/ builds the PDF from it; check.mjs fails CI if the
// committed PDF no longer carries every string below.

export interface Job {
  company: string;
  role: string;
  org?: string;
  from: string;
  to: string;
  where: string;
  href?: string;
  now?: boolean;
  points: string[];
}

export interface Project {
  names: string[];
  text: string;
  meta: string;
}

export const resume = {
  name: 'Petko (Pete) Pavlovski',
  tagline: ['Senior Rust engineer', 'indexers, languages, P2P protocols, and the tooling around them.'],
  intro: 'I write the part that has to stay up.',
  tenure: 'Shipping production software since 2019. Building in Rust since 2021.',
  accountant: 'Accountant before that, which is where the habit of checking the number twice comes from.',
  footing: { figure: '2019', text: 'In production since 2019. Rust since 2021.' },

  contact: {
    email: 'pavlovskipetko@gmail.com',
    site: 'cargopete.com',
    github: 'github.com/cargopete',
    linkedin: 'linkedin.com/in/pete-pavlovski-07486a156',
    linkedinUrl: 'https://www.linkedin.com/in/pete-pavlovski-07486a156/',
    location: 'Sofia, Bulgaria · remote since 2019',
  },

  page: {
    title: 'Resume - Petko (Pete) Pavlovski',
    description:
      "Senior Rust engineer at Fathom. Production software since 2019, Rust since 2021. Previously The Graph, Kraken and OVO Energy.",
    headline: 'Rust engineer. Systems builder.',
  },

  history: {
    kicker: 'Work history',
    heading: 'From developer tools to data platforms.',
    lede: 'Backend services, distributed protocols and the tools around them. Remote since 2019.',
  },

  jobs: [
    {
      company: 'Fathom',
      role: 'Senior Software Engineer',
      from: 'Apr 2025',
      to: 'present',
      where: 'Remote, UAE',
      href: 'https://fathom.io',
      now: true,
      points: [
        'Rust backend systems for an AI-driven data platform.',
        'Multi-workspace monorepo: services, storage, control plane.',
        'Transactional outbox and event relay, keeping database writes and event publication consistent.',
      ],
    },
    {
      company: 'The Graph',
      role: 'Senior Rust Engineer',
      org: 'GraphOps',
      from: 'Jul 2022',
      to: 'Apr 2025',
      where: 'Remote',
      points: [
        'At GraphOps, one of The Graph’s core developer teams.',
        'Designed and built Graphcast, a P2P messaging protocol on Waku and libp2p.',
        'Backend services carrying the traffic, and a yew.rs frontend for the tooling.',
        'Delivered protocol demos and developer workshops.',
      ],
    },
    {
      company: 'Kraken',
      role: 'Rust Engineer',
      from: 'Dec 2021',
      to: 'Jul 2022',
      where: 'Remote',
      points: ['Developer tooling for testing exchange HTTP APIs.'],
    },
    {
      company: 'The Graph',
      role: 'Rust Engineer',
      org: 'LimeChain',
      from: 'Mar 2021',
      to: 'Dec 2021',
      where: 'Remote',
      points: [
        'At LimeChain, a dev shop, on a Graph Foundation grant.',
        'Created Matchstick, the ecosystem’s subgraph testing framework. Rust and WebAssembly.',
      ],
    },
    {
      company: 'OVO Energy',
      role: 'Full Stack Engineer',
      from: 'Jan 2020',
      to: 'Mar 2021',
      where: 'Remote, UK',
      points: [
        'Scheduling product for field engineer appointments. Kotlin and Quarkus microservices.',
        'Built the Flutter app from scratch, and the React web client beside it.',
      ],
    },
    {
      company: 'WeiChain',
      role: 'Junior Software Engineer',
      from: 'Jan 2019',
      to: 'Jan 2020',
      where: 'Remote, Sofia',
      points: [
        'Smart contracts on Ethereum and Aeternity.',
        'Shipped a decentralised exchange to mainnet, plus an atomic swap widget.',
      ],
    },
  ] as Job[],

  openSource: {
    heading: 'Building now, and shipped and still running.',
    building: [
      {
        names: ['nuthatch'],
        text: 'a self-hosted blockchain indexer in Rust. Follows the chain, seals history into Parquet and serves SQL and MCP.',
        meta: 'nuthatch-indexer.com',
      },
      {
        names: ['redstart'],
        text: 'a typed language for subgraphs. Emits schema, manifest and AssemblyScript mappings for the existing Graph toolchain.',
        meta: 'redstart-lang.com',
      },
      {
        names: ['yatr'],
        text: 'a Rust task runner with content-addressed caching, optional native cache signing and REAPI HTTP cache support.',
        meta: 'yetanothertaskrunner.com',
      },
    ] as Project[],
    shipped: [
      {
        names: ['matchstick'],
        text: 'a Rust and WebAssembly subgraph testing framework I created at LimeChain. Documented in The Graph’s official tooling and invoked through graph test.',
        meta: 'LimeChain for The Graph, on a Foundation grant, 2021',
      },
      {
        names: ['graphcast', 'subgraph-radio'],
        text: 'a P2P messaging protocol for The Graph’s indexer network, built on Waku and libp2p. Gossip, fault-tolerant delivery, and a radio pattern that lets anyone add a message type without touching the core.',
        meta: 'GraphOps, a Graph core dev team, 2022-2025',
      },
      {
        names: ['The Night’s Watch'],
        text: 'the unglamorous half of The Graph: indexers, gateways, data services, judges and doctors. Lodestar, Dispatch, Foghorn, horizon-doctor, Graphite, and learn-thegraph.com.',
        meta: 'github.com/nuthatch-org',
      },
    ] as Project[],
  },

  scope: {
    kicker: 'Before you write',
    heading: 'Where I can help.',
    // The page links "LinkedIn" between these two halves.
    lede: [
      'If you want to talk, reach me on',
      'or by email. My focus is Rust backend engineering, distributed systems and developer tooling.',
    ],
    inLabel: 'In scope',
    outLabel: 'Working preferences',
    in: [
      'Rust backends, services and CLIs',
      'Distributed systems and P2P protocol work',
      'Blockchain indexing and data infrastructure',
      'Developer tooling, languages and testing frameworks',
      'Taking something that half works and making it hold',
      'Remote, EET, overlapping most of a European day',
    ],
    out: [
      'Remote from Sofia, Bulgaria',
      'European working hours, with some US overlap',
      'Backend and infrastructure as the main responsibility',
      'Room to question a design and take ownership of the result',
    ],
    note: 'Send me the problem, the team and the constraints. That is a useful starting point.',
  },

  close: {
    kicker: 'Contact',
    heading: 'Mail is the fastest way.',
    lede: 'For Rust backend, distributed systems or developer tooling work, send me the problem, the team and the constraints.',
  },

  pdf: {
    canonical: 'Canonical version: cargopete.com/resume',
    generated: 'Generated',
    drift: 'if the numbers drift, the site is right',
  },
};
