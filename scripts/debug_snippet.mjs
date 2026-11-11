import fs from 'fs';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

const mod4 = fs.readFileSync('src/services/db/course03/modules/module4.js', 'utf8');
const idx = mod4.indexOf('0x7F');
const snippet = mod4.slice(idx - 30, idx + 20);
console.log('Original snippet:', JSON.stringify(snippet));

const res = renderMarkdownToHtml(snippet);
console.log('Result:', res);
