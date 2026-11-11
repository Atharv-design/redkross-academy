import fs from 'fs';
import path from 'path';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';
import { module1Data } from '../src/services/db/course03/modules/module1.js';
import { module3Data } from '../src/services/db/course03/modules/module3.js';
import { module4Data } from '../src/services/db/course03/modules/module4.js';
import { module5Data } from '../src/services/db/course03/modules/module5.js';

// Find compiled CSS files in dist/assets
const assets = fs.readdirSync('dist/assets');
const cssFiles = assets.filter(f => f.endsWith('.css'));
console.log('CSS files in dist/assets:', cssFiles);

const l1_1 = module1Data.lessons[0];
const l3_2 = module3Data.lessons[1];
const l4_5 = module4Data.lessons[4];
const l5_4 = module5Data.lessons[3];

const html1 = renderMarkdownToHtml(l1_1.content);
const html3 = renderMarkdownToHtml(l3_2.content);
const html4 = renderMarkdownToHtml(l4_5.content);
const html5 = renderMarkdownToHtml(l5_4.content);

const fullHtml = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course 03 Academic Formatting Visual Verification</title>
  ${cssFiles.map(f => `<link rel="stylesheet" href="./assets/${f}">`).join('\n  ')}
  <style>
    body {
      background-color: #030712;
      color: #E2D9CE;
      margin: 0;
      padding: 0;
      font-family: 'Lora', Georgia, serif;
    }
    .preview-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem 1.5rem;
    }
  </style>
</head>
<body class="bg-[#030712] text-[#E2D9CE]">
  <div class="preview-container">
    <header class="mb-10 pb-6 border-b border-white/10 text-center">
      <span class="px-3 py-1 rounded-full bg-[#FF7A00]/20 text-[#FFA439] text-xs font-mono font-bold uppercase tracking-wider">Course 03 Visual Quality Floor Audit</span>
      <h1 class="text-3xl font-bold text-white mt-3 font-lora">Academic Formatting & KaTeX Verification</h1>
      <p class="text-sm text-[#A3907C] mt-2 font-mono">Auditing: Vertical Math Steps, Unified Single-Line Definitions, Neutral Inline Code & Balanced Spacing</p>
    </header>

    <section id="lesson-1-1" class="mb-16">
      <div class="p-3 bg-[#0D111A] border-b border-white/10 mb-6 flex justify-between items-center rounded-lg">
        <span class="font-mono text-xs font-bold text-[#FFA439]">LESSON 1.1: ARCHITECTURAL FOUNDATIONS</span>
        <span class="text-xs font-mono text-slate-400">Math Steps + Definitions</span>
      </div>
      <div class="prose-content">
        ${html1}
      </div>
    </section>

    <section id="lesson-3-2" class="mb-16">
      <div class="p-3 bg-[#0D111A] border-b border-white/10 mb-6 flex justify-between items-center rounded-lg">
        <span class="font-mono text-xs font-bold text-[#FFA439]">LESSON 3.2: PERMISSIONS & UMASK DERIVATION</span>
        <span class="text-xs font-mono text-slate-400">Bitmask Derivations + Telemetry</span>
      </div>
      <div class="prose-content">
        ${html3}
      </div>
    </section>

    <section id="lesson-4-5" class="mb-16">
      <div class="p-3 bg-[#0D111A] border-b border-white/10 mb-6 flex justify-between items-center rounded-lg">
        <span class="font-mono text-xs font-bold text-[#FFA439]">LESSON 4.5: SYSTEMD TIMERS & AUDITING CHECKLIST</span>
        <span class="text-xs font-mono text-slate-400">Scheduling Derivations + Checklists</span>
      </div>
      <div class="prose-content">
        ${html4}
      </div>
    </section>

    <section id="lesson-5-4" class="mb-16">
      <div class="p-3 bg-[#0D111A] border-b border-white/10 mb-6 flex justify-between items-center rounded-lg">
        <span class="font-mono text-xs font-bold text-[#FFA439]">LESSON 5.4: WINDOWS SIDS & RIDS</span>
        <span class="text-xs font-mono text-slate-400">Canonical SID Formula + Well-Known SIDs</span>
      </div>
      <div class="prose-content">
        ${html5}
      </div>
    </section>
  </div>
</body>
</html>
`;

fs.writeFileSync('dist/test_visual_verification.html', fullHtml, 'utf8');
console.log('Successfully generated dist/test_visual_verification.html');
