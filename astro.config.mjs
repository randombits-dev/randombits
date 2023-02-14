import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: 'https://randombits.dev',
  integrations: [mdx(), sitemap()]
});