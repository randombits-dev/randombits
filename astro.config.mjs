import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import solid from '@astrojs/solid-js';

export default defineConfig({
    base: '/',
    site: 'https://randombits.dev/',
    markdown: {
        syntaxHighlight: 'prism'
    },
    integrations: [mdx(), solid()],
    build: {
        assets: '_astro'
    }
});