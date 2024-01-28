import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import remarkCodeTitles from 'remark-code-titles';
import UnoCSS from 'unocss/astro';
import sitemap from '@astrojs/sitemap';

import robots from "astro-robots";

// https://astro.build/config
export default defineConfig({
  base: '/',
  site: 'https://randombits.dev/',
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkCodeTitles]
  },
  devToolbar: {
    enabled: false
  },
  integrations: [mdx(), solid(), UnoCSS(), sitemap(), robots({})],
  build: {
    assets: '_astro',
    format: 'file'
  },
  trailingSlash: 'never'
});
