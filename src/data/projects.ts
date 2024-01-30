import {CoverImages} from '../utils/coverImages';

export const PROJECTS = [
  {
    title: 'Interval Timer',
    desc: ['A simple interval timer app for HIIT workouts. Coming soon to the Google Play Store and F-Droid.'],
    img: CoverImages.intervalTimer,
    links: [
      ['github', 'https://github.com/randombits-dev/interval-timer']
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
    title: 'Offering Inspiration',
    desc: ['Built using Astro and web components.'],
    img: CoverImages.offeringInspiration,
    links: [
      ['app', 'https://offeringinspiration.com'],
      ['github', 'https://github.com/randombits-dev/offering-inspiration']
    ]
  },
  {
    title: 'Standard Notes Plugins',
    desc: 'A collection of plugins and themes for Standard Notes',
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
  }
];
