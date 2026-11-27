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
    quote: 'In Developer Highlights #6 I had the pleasure of speaking with Petko Pavlovski @AxiomaticAardvark from Limechain. […] Many of you already know Petko from the Discord community, as he frequently helps other members. Petko has been working on Matchstick - a unit testing framework for The Graph. This is a gamechanger for subgraph development! You can now test changes to your code in mere milliseconds.',
    author: '@Slimchance',
    role: 'host of Developer Highlights',
    date: 'September 2021',
    datetime: '2021-09-03',
    href: 'https://forum.thegraph.com/t/developer-highlights-6-matchstick-unit-testing-for-subgraphs/2499',
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
    quote: 'Hey! Awesome library!',
    author: '@vseehausen',
    date: 'February 2023',
    datetime: '2023-02-20',
    href: 'https://github.com/LimeChain/matchstick/issues/278#issuecomment-1437168717',
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
