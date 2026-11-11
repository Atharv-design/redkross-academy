import fs from 'fs';
import path from 'path';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';
import { module1Data } from '../src/services/db/course03/modules/module1.js';
import { module3Data } from '../src/services/db/course03/modules/module3.js';
import { module4Data } from '../src/services/db/course03/modules/module4.js';
import { module8Data } from '../src/services/db/course03/modules/module8.js';

// Find CSS files in dist/assets
const files = fs.readdirSync('dist/assets');
const cssFile = files.find(f => f.startsWith('index-') && f.endsWith('.css'));
const katexCss = files.find(f => f.startsWith('vendor-katex-') && f.endsWith('.css'));
console.log('Using compiled CSS bundles:', cssFile, katexCss);

// Lesson 1.4 (Virtual Memory)
const l14 = module1Data.lessons.find(l => l.id.includes('1_4') || l.title.includes('Virtual Memory') || l.title.includes('1.4'));
const l14Html = renderMarkdownToHtml(l14 ? l14.content : module1Data.lessons[3].content);

// Lesson 3.1 (Permissions)
const l31 = module3Data.lessons[0];
const l31Html = renderMarkdownToHtml(l31.content);

// Lesson 4.1 (Exit codes & signal math)
const l41 = module4Data.lessons[0];
const l41Html = renderMarkdownToHtml(l41.content);

// Lesson 8.6 (Hardening Index)
const l86 = module8Data.lessons[5];
const l86Html = renderMarkdownToHtml(l86.content);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mathematical Rendering Verification</title>
  <link rel="stylesheet" href="./assets/${katexCss}">
  <link rel="stylesheet" href="./assets/${cssFile}">
  <style>
    body { background-color: #030407; color: #E2D9CE; padding: 2rem; }
    .section-title { font-family: sans-serif; font-size: 1.25rem; font-weight: bold; color: #FF7A00; margin: 2rem 0 1rem 0; border-bottom: 1px solid rgba(255,122,0,0.3); padding-bottom: 0.5rem; }
  </style>
</head>
<body>
  <h1 style="color: #FFA439; font-family: monospace; font-size: 1.5rem;">[VERIFICATION BENCHMARK] Mathematical Rendering Layout & Typography</h1>
  
  <div class="section-title">TEST 1: Course 03 Lesson 1.4 — Sequential Math Steps & Display Equations</div>
  <div class="bg-[#0B0D14]/95 p-6 sm:p-10 rounded-2xl border border-[#FF7A00]/25 shadow-2xl min-h-[400px] overflow-visible prose prose-invert prose-sm sm:prose-base max-w-none cursor-default prose-table:border-collapse prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent prose-pre:border-none prose-code:before:content-none prose-code:after:content-none prose-img:m-0 prose-figure:m-0 prose-headings:font-lora">
    ${l14Html}
  </div>

  <div class="section-title">TEST 2: Course 03 Lesson 3.1 — POSIX Octal File Permissions & Bitmasks</div>
  <div class="bg-[#0B0D14]/95 p-6 sm:p-10 rounded-2xl border border-[#FF7A00]/25 shadow-2xl min-h-[400px] overflow-visible prose prose-invert prose-sm sm:prose-base max-w-none cursor-default prose-table:border-collapse prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent prose-pre:border-none prose-code:before:content-none prose-code:after:content-none prose-img:m-0 prose-figure:m-0 prose-headings:font-lora">
    ${l31Html}
  </div>

  <div class="section-title">TEST 3: Course 03 Lesson 4.1 — Process Exit Status & Signal Arithmetic</div>
  <div class="bg-[#0B0D14]/95 p-6 sm:p-10 rounded-2xl border border-[#FF7A00]/25 shadow-2xl min-h-[400px] overflow-visible prose prose-invert prose-sm sm:prose-base max-w-none cursor-default prose-table:border-collapse prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent prose-pre:border-none prose-code:before:content-none prose-code:after:content-none prose-img:m-0 prose-figure:m-0 prose-headings:font-lora">
    ${l41Html}
  </div>

  <div class="section-title">TEST 4: Course 03 Lesson 8.6 — Hardening Index Weighted Metric Formula</div>
  <div class="bg-[#0B0D14]/95 p-6 sm:p-10 rounded-2xl border border-[#FF7A00]/25 shadow-2xl min-h-[400px] overflow-visible prose prose-invert prose-sm sm:prose-base max-w-none cursor-default prose-table:border-collapse prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent prose-pre:border-none prose-code:before:content-none prose-code:after:content-none prose-img:m-0 prose-figure:m-0 prose-headings:font-lora">
    ${l86Html}
  </div>
</body>
</html>`;

fs.writeFileSync('dist/test_math_preview.html', html, 'utf8');
console.log('Wrote dist/test_math_preview.html successfully! Size:', html.length);
