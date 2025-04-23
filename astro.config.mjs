import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import remarkCodeTitles from 'remark-code-titles';
import sitemap from '@astrojs/sitemap';
import robots from "astro-robots";
import createAstroFontPickerIntegration from "astro-font-picker";
import tailwindcss from "@tailwindcss/vite";

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
  integrations: [mdx(), solid(), sitemap(), robots({}), createAstroFontPickerIntegration()],
  build: {
    assets: '_astro',
    format: 'file'
  },
  trailingSlash: 'never',
  legacy: {
    collections: true,
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
