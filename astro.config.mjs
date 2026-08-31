import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';
import robots from "astro-robots";
import createAstroFontPickerIntegration from "astro-font-picker";
import tailwindcss from "@tailwindcss/vite";

const siteMapExcludes = [
  '/existing-license',
  '/font-studio/buy',
  '/jrpteachescanva'
];

// https://astro.build/config
export default defineConfig({
  base: '/',
  site: 'https://randombits.dev/',
  markdown: {
    syntaxHighlight: 'prism',
  },
  devToolbar: {
    enabled: true
  },
  integrations: [mdx(), solid(), sitemap({
    filter: (page) => !siteMapExcludes.find(ex => page.endsWith(ex)),
  }), robots({}), createAstroFontPickerIntegration()],
  build: {
    assets: '_astro',
    format: 'file'
  },
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()]
  }
});
