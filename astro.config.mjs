import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import remarkCodeTitles from 'remark-code-titles';
import UnoCSS from 'unocss/astro'

// https://astro.build/config
export default defineConfig({
  base: '/',
  site: 'https://randombits.dev/',
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkCodeTitles]
  },
  integrations: [mdx(), solid(), UnoCSS(),],
  build: {
    assets: '_astro'
  },
  experimental: {
    assets: true
  }
});