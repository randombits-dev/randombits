import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import remarkCodeTitles from 'remark-code-titles';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  base: '/',
  site: 'https://randombits.dev/',
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkCodeTitles]
  },
  integrations: [mdx(), solid(), tailwind()],
  build: {
    assets: '_astro'
  },
  experimental: {
    assets: true
  }
});