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
  intro: 'I write the part that has to stay up. Most of it is still running.',
  tenure: 'Seven years and eight months shipping in production, Rust for the last five.',
  accountant: 'Accountant before that, which is where the habit of checking the number twice comes from.',
  footing: { figure: '7y 8m', text: 'Seven years and eight months in production, Rust for the last five.' },

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
      "Seven years and eight months shipping in production, Rust for the last five. Fathom, The Graph, Kraken, OVO Energy. What I take on, and what I don't.",
    headline: 'Where the seven years went.',
  },

  history: {
    kicker: 'Work history',
    heading: 'Six roles, one thread.',
    lede: 'Blockchain data infrastructure the whole way through, once the first two years had got the web work out of my system.',
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
        'Dataops workflows, and refactoring for performance and for the next person to read.',
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
        'Ran the demos and workshops, which is how you find out what the protocol is missing.',
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
        text: 'be your own indexer. One Rust binary, one command, a live indexed API in under two minutes. Follows the chain, seals segments to Parquet, serves SQL and MCP, and has no mandatory third-party data dependency. A public good rather than a business.',
        meta: 'nuthatch-indexer.com',
      },
      {
        names: ['redstart'],
        text: 'a language for authoring subgraphs. Schema, manifest and mappings collapse into one typed source that transpiles to AssemblyScript the canonical toolchain builds unmodified. The whole family of AssemblyScript footguns becomes unrepresentable. If it compiles, it works.',
        meta: 'redstart-lang.com',
      },
      {
        names: ['yatr'],
        text: 'a single-binary task runner whose cache is content-addressed and signed, so a shared cache entry can be trusted rather than hoped about. Speaks REAPI.',
        meta: 'yetanothertaskrunner.com',
      },
    ] as Project[],
    shipped: [
      {
        names: ['matchstick'],
        text: 'unit testing for subgraphs, in Rust and WebAssembly. The ecosystem standardised on it. 218 stars, 17 forks, still maintained by others.',
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
        meta: 'github.com/nightswatchhq',
      },
    ] as Project[],
  },

  scope: {
    kicker: 'Before you write',
    heading: "What I do, and what I don't.",
    // The page links "LinkedIn" between these two halves.
    lede: [
      'If you want to talk, reach me on',
      'or by email. This is here so that if you do write, we both know within a paragraph whether it is going anywhere. The second column is the useful one.',
    ],
    inLabel: 'In scope',
    outLabel: 'Out of scope',
    in: [
      'Rust backends, services and CLIs',
      'Distributed systems and P2P protocol work',
      'Blockchain indexing and data infrastructure',
      'Developer tooling, languages and testing frameworks',
      'Taking something that half works and making it hold',
      'Remote, EET, overlapping most of a European day',
    ],
    out: [
      'Frontend as the main job. I ship React and Flutter when a project needs it, but it is not what you want me for',
      'Smart contract auditing. I have written contracts, not audited them for a living',
      'ML research. I build the pipelines, not the models',
      'Relocation. Overlapping some US hours is fine',
      'Work where the architecture is settled and not open to a question',
    ],
    note: 'If the thing you are building has to stay up while somebody else operates it, that is the part I am good at. If it has to look beautiful in a demo next Thursday, there are people better suited than me.',
  },

  close: {
    kicker: 'Contact',
    heading: 'Mail is the fastest way.',
    lede: 'I read everything. I reply to anything that is not a template.',
  },

  pdf: {
    canonical: 'Canonical version: cargopete.com/resume',
    drift: 'if the numbers drift, the site is right',
  },
};
