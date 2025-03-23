import {CoverImages} from '../utils/coverImages';

export const PROJECTS = [
  {
    title: 'FontStudio',
    desc: ['A canva app that that allows creating advanced text effects.'],
    img: CoverImages.fontStudio,
    links: [
      ['more details', '/canva/font-studio'],
      ['canva', 'https://www.canva.com/apps/AAGLHfr5ZM0/fontstudio']
    ]
  },
  {
    title: 'FontFrame',
    desc: ['A canva app that allows you to create text with any image background.'],
    img: CoverImages.fontFrame,
    links: [
      ['more details', '/canva/font-frame'],
      ['canva', 'https://www.canva.com/apps/AAF5vGyV5TY/fontframe']
    ]
  },
  {
    title: 'Interval Timer',
    desc: ['A simple interval timer app for HIIT workouts. Deployed to Google Play Store and F-Droid.'],
    img: CoverImages.intervalTimer,
    links: [
      ['fdroid', 'https://f-droid.org/en/packages/dev.randombits.intervaltimer/'],
      ['play store', 'https://play.google.com/store/apps/details?id=dev.randombits.intervaltimer'],
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
