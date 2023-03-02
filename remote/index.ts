import fs from 'fs-extra';
import injectHTML from "node-inject-html";
// import crypto from 'crypto';
import {writeSitemap} from "./sitemap-writer";
import {readFilesInDir} from "./utils";


// function writeCommonCss(name: string) {
//     const content = fs.readFileSync(`remote/styles/${name}`, {encoding: 'utf8'});
//     const hash = crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
//     fs.outputFileSync(`dist/_layout/${hash}.${name}`, content);
//     return `<link rel="stylesheet" href="/_layout/${hash}.${name}" />`;
// }
//
// const styleLinks = fs.readdirSync('remote/styles').map(name => writeCommonCss(name));


const fileList = readFilesInDir('remote/content');

const header = fs.readFileSync('dist/layout/header/index.html', {encoding: 'utf8'});
const footer = fs.readFileSync('dist/layout/footer/index.html', {encoding: 'utf8'});

function renderHTML(file: string, newFile: string) {
    let html = fs.readFileSync(file, {encoding: 'utf8'});
    html = injectHTML(html, {
        bodyStart: header,
        bodyEnd: footer,
        // headEnd: styleLinks.join('')
    });
    fs.outputFileSync(newFile, html);
}

fileList.forEach(file => {
    const newPath = file.replace(/^remote\/content/, 'dist');
    if (file.endsWith('index.html')) {
        renderHTML(file, newPath);
    } else {
        fs.copySync(file, newPath);
    }
});

writeSitemap();