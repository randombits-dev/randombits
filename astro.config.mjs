import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
    site: 'https://randombits.dev/',
    markdown: {
        syntaxHighlight: 'prism'
    },
    integrations: [mdx()],
    build: {
        assets: '_astro'
    }
});