import fs from 'fs';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

const mod4 = fs.readFileSync('src/services/db/course03/modules/module4.js', 'utf8');
const idx = mod4.indexOf('0x7F');
// Let's get the entire paragraph containing 0x7F
const pStart = mod4.lastIndexOf('\n\n', idx);
const pEnd = mod4.indexOf('\n\n', idx);
const para = mod4.slice(pStart, pEnd);

console.log('Paragraph:', JSON.stringify(para));
const out = renderMarkdownToHtml(para);
console.log('Out:', out);
