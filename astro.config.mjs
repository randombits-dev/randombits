import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import remarkCodeTitles from 'remark-code-titles';
import UnoCSS from 'unocss/astro';
import sitemap from '@astrojs/sitemap';

import robots from "astro-robots";
import createAstroFontPickerIntegration from "astro-font-picker";

// https://astro.build/config
export default defineConfig({
  base: '/',
  site: 'https://randombits.dev/',
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkCodeTitles]
  },
  devToolbar: {
    enabled: true
  },
  integrations: [mdx(), solid(), UnoCSS(), sitemap(), robots({}), createAstroFontPickerIntegration()],
  build: {
    assets: '_astro',
    format: 'file'
  },
  trailingSlash: 'never'
});
