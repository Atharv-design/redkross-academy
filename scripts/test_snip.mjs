import fs from 'fs';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

const snippet = 'via $\\text{Status} \\ \\& \\ 0x7F$, allowing defe';
const out = renderMarkdownToHtml(snippet);
console.log('Out:', out);
