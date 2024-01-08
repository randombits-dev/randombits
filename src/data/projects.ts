import {CoverImages} from '../utils/coverImages';

export const PROJECTS = [
  {
    title: 'Offering Inspiration',
    desc: ['Built using Astro and web components.'],
    img: CoverImages.offeringInspiration,
    links: [
      ['app', 'https://offeringinspiration.com'],
      ['github', 'https://github.com/randombits-dev/offering-inspiration']
    ]
  },
  {
    title: 'fontable',
    desc: 'Find the perfect Google font by embedding a font picker on your website',
    img: CoverImages.fontable,
    links: [
      ['github', 'https://github.com/randombits-dev/fontable'],
      ['npm', 'https://www.npmjs.com/package/fontable']
    ]
  },
  {
    title: 'Micro Storage',
    desc: ['Entered into the Chainlink Constellation hackathon. A cloud storage platform that is powered by NFT subscriptions.',
      'Built using Astro, React, Chainlink, and Cloudflare Workers.'],
    img: CoverImages.microStorage,
    links: [
      ['github', 'https://github.com/randombits-dev/micro-storage'],
      ['devpost', 'https://devpost.com/software/micro-storage']
    ]
  },
  {
    title: 'hērōicus',
    desc: ['Winner of the Fantom Hackathon 2023 Q2', 'Cloud computing using NFT Rentals. Powered by the Fantom Network and AWS.'],
    img: CoverImages.heroicus,
    links: [
      ['github', 'https://github.com/randombits-dev/heroicus'],
      ['devpost', 'https://devpost.com/software/heroicus'],
    ]
  },
  {
    title: 'Standard Notes Extensions',
    desc: 'A collection of extensions and themes for Standard Notes',
    img: CoverImages.snExtensions,
    links: [
      ['view list', '/standard-notes/extensions-list']
    ]
  },
  {
    title: 'Snowrunner Save Editor',
    desc: ['Save editor for the Saverunner game. Edit task and mission progress. Reveal or obtain upgrades.'],
    img: CoverImages.snowrunner,
    links: [
      ['app', '/tools/snowrunner'],
      ['github', 'https://github.com/randombits-dev/snowrunner-save-editor'],
    ]
  },
  {
    title: 'Printable Daily Schedule',
    desc: 'Some people still like a paper schedule. This app generates a daily planner for appointments. One page a day and easily printable.',
    img: CoverImages.schedule,
    links: [['app', 'https://schedule.randombits.dev'],
      ['github', 'https://github.com/nienow/daily-schedule']]
  }
];
