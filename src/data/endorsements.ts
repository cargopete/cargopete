// Public endorsements for the homepage. Quote text is verbatim; trim only with an ellipsis.

export type Endorsement = {
  quote: string;
  author: string;
  role?: string;
  /** Set when the line praises the project, not the person. */
  about?: string;
  date: string;
  datetime: string;
  href: string;
};

export const featured: Endorsement[] = [
  {
    quote: 'Pete is outstanding, I\'ve loved working with him in the past. Learns fast and has some great grit and determination when things get difficult. He\'s a great person to be around and a bright addition to any team, definitely the "glue" that sticks teams together. Pete is also a great professional and has a mindset of learning new things and applying them to real world issues.',
    author: 'Donovan Dall',
    role: 'LinkedIn recommendation',
    date: 'March 2021',
    datetime: '2021-03-25',
    href: 'https://www.linkedin.com/in/pete-pavlovski-07486a156/details/recommendations/',
  },
  {
    quote: 'In Developer Highlights #6 I had the pleasure of speaking with Petko Pavlovski @AxiomaticAardvark from Limechain. […] Many of you already know Petko from the Discord community, as he frequently helps other members. Petko has been working on Matchstick - a unit testing framework for The Graph. This is a gamechanger for subgraph development! You can now test changes to your code in mere milliseconds.',
    author: '@Slimchance',
    role: 'host of Developer Highlights',
    date: 'September 2021',
    datetime: '2021-09-03',
    href: 'https://forum.thegraph.com/t/developer-highlights-6-matchstick-unit-testing-for-subgraphs/2499',
  },
  {
    quote: 'As you will hear, Petko has been contributing to The Graph in various roles for a long time.',
    author: 'Nick Hansen',
    role: 'GRTiQ Podcast',
    date: 'June 2023',
    datetime: '2023-06-16',
    href: 'https://castro.fm/episode/o7QzL4',
  },
  {
    quote: 'Hi Petko! I watched the Loom video and really like what I saw. The interface is exactly as I imagined in terms of setting up the store, running handlers, and asserting the results. Great job!',
    author: 'Brendan Asselstine (@Brendan)',
    date: 'July 2021',
    datetime: '2021-07-05',
    href: 'https://forum.thegraph.com/t/unit-testing-in-assembly-script/845/26',
  },
  {
    quote: "Thanks Petko, glad it's keeping up. 200ms blocks make Base history grow fast, which is exactly what we built for. Super excited for what you're building with Nuthatch.",
    author: '@graphopsxyz',
    role: 'GraphOps',
    date: 'November 2026',
    datetime: '2026-11-18',
    href: 'https://x.com/graphopsxyz/status/2123030911910359119',
  },
  {
    quote: 'Love to see the careful review! Keep up the great work @axiomatic-aardvark @hopeyen!',
    author: '@chriswessels',
    role: 'Chris Wessels, GraphOps',
    date: 'March 2023',
    datetime: '2023-03-13',
    href: 'https://github.com/graphops/graphcast-sdk/pull/125#issuecomment-1466207689',
  },
  {
    quote: 'Hey guys! Great work so far on the framework. Took it for a test spin (even though I know its not ready yet) and ran into a snag. […] Otherwise this is a fantastic development and way more smooth than our old testing implementation',
    author: '@garrett-masterfile',
    date: 'July 2021',
    datetime: '2021-07-21',
    href: 'https://forum.thegraph.com/t/unit-testing-in-assembly-script/845/33',
  },
  {
    quote: 'Graphcast will enable a simpler, more robust Graph Protocol.',
    author: 'Zac Burns (@That3Percent)',
    about: 'About Graphcast',
    date: 'August 2022',
    datetime: '2022-08-31',
    href: 'https://forum.thegraph.com/t/grc-001-graphcast-a-gossip-network-for-indexers/3544/3',
  },
];

export const matchstickUsers: Endorsement[] = [
  {
    quote: 'hey, really love this library. Have been using it extensively and had some feedback to share.',
    author: '@bsamuels453',
    date: 'September 2022',
    datetime: '2022-09-24',
    href: 'https://github.com/LimeChain/matchstick/issues/278#issuecomment-1257053224',
  },
  {
    quote: "I've just started using matchstick and it's a great tool.",
    author: '@KholdStare',
    date: 'July 2022',
    datetime: '2022-07-14',
    href: 'https://github.com/LimeChain/matchstick/issues/278#issuecomment-1184522535',
  },
  {
    quote: 'Hi folks, great work on this framework.',
    author: '@davidfragalaureano',
    date: 'July 2022',
    datetime: '2022-07-07',
    href: 'https://github.com/LimeChain/matchstick/issues/278#issuecomment-1176821001',
  },
  {
    quote: 'Once again, thanks for the great work thus far! Let me know how I can be of assistance.',
    author: '@ghardin1314',
    date: 'October 2021',
    datetime: '2021-10-28',
    href: 'https://github.com/LimeChain/matchstick/issues/211',
  },
];

export type Credit = {
  source: string;
  detail: string;
  date: string;
  datetime: string;
  href: string;
};

// Institutional credits. These name the work; they are not personal testimonials.
export const credits: Credit[] = [
  {
    source: 'The Graph Foundation',
    detail: 'Annual Grants Report 2022, on Matchstick and LimeChain',
    date: '2022',
    datetime: '2022',
    href: 'https://storage.thegraph.com/2022-grants-report.pdf',
  },
  {
    source: 'The Graph Foundation',
    detail: 'On Graphcast',
    date: 'June 2023',
    datetime: '2023-06-07',
    href: 'https://thegraph.com/blog/progress-decentralized-data-sunrise/',
  },
  {
    source: 'The Graph Council',
    detail: 'Meeting #11 notes, on LimeChain unit testing',
    date: 'August 2021',
    datetime: '2021-08-13',
    href: 'https://forum.thegraph.com/t/the-graph-council-meeting-11-notes/2401/3',
  },
];
