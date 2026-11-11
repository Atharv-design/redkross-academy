import fs from 'fs';
import katex from 'katex';

const raw = '\\text{Status} \\ \\& \\ 0x7F';
console.log('raw:', raw);
try {
  const rendered = katex.renderToString(raw, { displayMode: false, throwOnError: true, output: 'html' });
  console.log('Direct katex:', rendered.slice(0, 100));
} catch (e) {
  console.log('Direct katex error:', e.message);
}
