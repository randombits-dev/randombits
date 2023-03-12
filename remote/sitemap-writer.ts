import fs from "fs-extra";
import {readFilesInDir} from "./utils";

export const writeSitemap = () => {
    const filesInDist = readFilesInDir('dist');
    const urls = filesInDist.filter(file => {
        return file.endsWith('index.html') && !file.startsWith('dist/layout');
    }).map(file => {
        const path = file.replace(/^dist/, '');
        return `<url><loc>https://randombits.dev${path.slice(0, -10)}</loc></url>`;
    });
    const content = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
            ${urls.join('\n')}
        </urlset>`;
    fs.outputFileSync('dist/sitemap-0.xml', content);
}