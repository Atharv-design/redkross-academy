import fs from 'fs';
import path from 'path';
import katex from 'katex';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

import { module1Data } from '../src/services/db/course03/modules/module1.js';
import { module2Data } from '../src/services/db/course03/modules/module2.js';
import { module3Data } from '../src/services/db/course03/modules/module3.js';
import { module4Data } from '../src/services/db/course03/modules/module4.js';
import { module5Data } from '../src/services/db/course03/modules/module5.js';
import { module6Data } from '../src/services/db/course03/modules/module6.js';
import { module7Data } from '../src/services/db/course03/modules/module7.js';
import { module8Data } from '../src/services/db/course03/modules/module8.js';

const modules = [
  module1Data, module2Data, module3Data, module4Data,
  module5Data, module6Data, module7Data, module8Data
];

console.log('===============================================================');
console.log('     COURSE 03 COMPREHENSIVE CONTENT & RENDERING AUDIT');
console.log('===============================================================\n');

let totalLessons = 0;
let totalContentLength = 0;
const lessonInventory = [];
const allParagraphs = [];
const mathAudit = { total: 0, errors: [], warnings: [] };
const trappedBlocks = [];
const imageAudit = { total: 0, missing: [] };
const titleAudit = [];
const boxDrawingOccurrences = [];

// Helper for latex cleanup testing
function cleanLatex(eq = '') {
  if (!eq) return '';
  let res = eq
    .replace(/\u0009ext/g, '\\text')
    .replace(/\u0009imes/g, '\\times')
    .replace(/\u0009o\b/g, '\\to')
    .replace(/\u0008mathbf/g, '\\mathbf')
    .replace(/\u0008egin/g, '\\begin')
    .replace(/\u000crac/g, '\\frac')
    .replace(/\\\\+([a-zA-Z]+)/g, '\\$1')
    .replace(/(?<!\\)\bext\{/g, '\\text{')
    .replace(/(?<!\\)\brac\{/g, '\\frac{')
    .replace(/(?<!\\)\begin\{/g, '\\begin{')
    .replace(/(?<!\\)\mathbf\{/g, '\\mathbf{')
    .replace(/(?<!\\)\bquad\b/g, '\\quad')
    .replace(/(?<!\\)\b(times|cdot|approx|geq|leq|neq|to|implies|mid|mathbf)\b/g, '\\$1')
    .replace(/\\mathbf\s*\{/g, '\\mathbf{')
    .replace(/(?<!\\)\bBig\(/g, '\\Big(')
    .replace(/(?<!\\)\bBig\)/g, '\\Big)')
    .replace(/\bextResult\b/g, '\\text{Result}')
    .trim();

  res = res.replace(/\\text\{([^}]+)\}/g, (m, inner) => {
    return `\\text{${inner.replace(/\\to\b/g, 'to')}}`;
  });

  return res;
}

for (let m = 0; m < modules.length; m++) {
  const mod = modules[m];
  console.log(`Auditing Module ${m + 1}: ${mod.title} (${mod.lessons.length} lessons)...`);

  for (let lIdx = 0; lIdx < mod.lessons.length; lIdx++) {
    totalLessons++;
    const les = mod.lessons[lIdx];
    const content = les.content || '';
    totalContentLength += content.length;

    lessonInventory.push({
      modIdx: m + 1,
      lesIdx: lIdx + 1,
      id: les.id,
      title: les.title,
      chars: content.length
    });

    // 1. Audit Title & Numbering
    const expectedPrefix = `${m + 1}.${lIdx + 1}`;
    if (!les.title.startsWith(expectedPrefix)) {
      titleAudit.push({
        id: les.id,
        currentTitle: les.title,
        expectedPrefix
      });
    }

    // 2. Audit Images
    const imgRegex = /!\[(.*?)\]\((.*?)\)/g;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(content))) {
      imageAudit.total++;
      const [full, alt, src] = imgMatch;
      const cleanSrc = src.trim();
      let diskPath = cleanSrc.startsWith('/')
        ? path.join(process.cwd(), 'public', cleanSrc.slice(1))
        : path.join(process.cwd(), 'public', cleanSrc);

      if (!fs.existsSync(diskPath)) {
        imageAudit.missing.push({
          lesId: les.id,
          src: cleanSrc,
          diskPath
        });
      }
    }

    // 3. Audit Math Formulas
    const displayRegex = /(?:\$\$([\s\S]*?)\$\$|\\\[([\s\S]*?)\\\])/g;
    let dMatch;
    while ((dMatch = displayRegex.exec(content))) {
      mathAudit.total++;
      const raw = dMatch[1] || dMatch[2];
      const cleaned = cleanLatex(raw);
      try {
        katex.renderToString(cleaned, {
          displayMode: true,
          throwOnError: true,
          strict: (code, msg) => {
            mathAudit.warnings.push({ lesId: les.id, type: 'DISPLAY', msg, raw });
          }
        });
      } catch (e) {
        mathAudit.errors.push({ lesId: les.id, type: 'DISPLAY', msg: e.message, raw });
      }
    }

    const inlineRegex = /(?<![0-9a-zA-Z\\])\$([^\$\n\r]+?)\$(?![0-9a-zA-Z])/g;
    let iMatch;
    while ((iMatch = inlineRegex.exec(content))) {
      mathAudit.total++;
      const raw = iMatch[1];
      const cleaned = cleanLatex(raw);
      try {
        katex.renderToString(cleaned, {
          displayMode: false,
          throwOnError: true,
          strict: (code, msg) => {
            mathAudit.warnings.push({ lesId: les.id, type: 'INLINE', msg, raw });
          }
        });
      } catch (e) {
        mathAudit.errors.push({ lesId: les.id, type: 'INLINE', msg: e.message, raw });
      }
    }

    // 4. Audit Trapped Markdown in Code Blocks
    const codeRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;
    let cMatch;
    let blockNum = 0;
    while ((cMatch = codeRegex.exec(content))) {
      blockNum++;
      const [full, lang, code] = cMatch;
      const hasHeading = /^\s*(###|####|##)\s+/m.test(code);
      const hasTable = /^\s*\|.+\|\s*\n\s*\|[\s-:]+\|/m.test(code);
      if (hasHeading || hasTable) {
        trappedBlocks.push({
          lesId: les.id,
          blockNum,
          lang,
          hasHeading,
          hasTable,
          snippet: code.substring(0, 150).replace(/\n/g, ' ')
        });
      }
    }

    // 5. Audit Box-drawing characters
    if (/[┌│├┼└─┬┴┤┘]/.test(content)) {
      boxDrawingOccurrences.push({ lesId: les.id });
    }

    // 6. Gather paragraphs for duplication analysis
    const paras = content
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(p => p.length > 80 && !p.startsWith('```') && !p.startsWith('|') && !p.startsWith('#'));

    for (const p of paras) {
      allParagraphs.push({
        modIdx: m + 1,
        lesId: les.id,
        lesTitle: les.title,
        text: p
      });
    }
  }
}

// Duplication Analysis
console.log('\n--- ANALYZING PARAGRAPH DUPLICATION ---');
const textToOccurrences = new Map();
for (const item of allParagraphs) {
  // Normalize whitespace and punctuation for comparison
  const normalized = item.text.replace(/\s+/g, ' ').trim();
  if (!textToOccurrences.has(normalized)) {
    textToOccurrences.set(normalized, []);
  }
  textToOccurrences.get(normalized).push(item);
}

const duplicates = [];
for (const [normText, occurrences] of textToOccurrences.entries()) {
  if (occurrences.length > 1) {
    // Check if they are in different lessons or same lesson
    const distinctLessons = new Set(occurrences.map(o => o.lesId));
    duplicates.push({
      textSample: normText.substring(0, 120) + '...',
      count: occurrences.length,
      distinctLessons: distinctLessons.size,
      locations: occurrences.map(o => `M${o.modIdx} ${o.lesId} ("${o.lesTitle}")`)
    });
  }
}

// Summary Report
console.log('\n===============================================================');
console.log('                     COURSE 03 AUDIT REPORT');
console.log('===============================================================');
console.log(`Total Lessons:                  ${totalLessons} / 48`);
console.log(`Total Raw Characters:           ${totalContentLength.toLocaleString()}`);
console.log(`Total Technical Diagrams:       ${imageAudit.total} (Missing: ${imageAudit.missing.length})`);
console.log(`Total Math Formulas:            ${mathAudit.total} (Errors: ${mathAudit.errors.length}, Warnings: ${mathAudit.warnings.length})`);
console.log(`Trapped Code Blocks:            ${trappedBlocks.length}`);
console.log(`Lessons with Title Prefix Gaps: ${titleAudit.length}`);
console.log(`Lessons with Box Drawing Chars: ${boxDrawingOccurrences.length}`);
console.log(`Duplicate Paragraph Instances:  ${duplicates.length}`);
console.log('===============================================================\n');

if (imageAudit.missing.length > 0) {
  console.log('MISSING IMAGES:');
  imageAudit.missing.forEach(m => console.log(`  - [${m.lesId}]: ${m.src}`));
}

if (titleAudit.length > 0) {
  console.log('\nTITLE PREFIX ISSUES:');
  titleAudit.forEach(t => console.log(`  - [${t.id}] Expected "${t.expectedPrefix}..." but got "${t.currentTitle}"`));
}

if (mathAudit.errors.length > 0 || mathAudit.warnings.length > 0) {
  console.log('\nMATH FORMULA ISSUES:');
  mathAudit.errors.forEach(e => console.log(`  - [ERROR ${e.lesId}]: ${e.msg} | raw: ${JSON.stringify(e.raw)}`));
  mathAudit.warnings.forEach(w => console.log(`  - [WARN ${w.lesId}]: ${w.msg} | raw: ${JSON.stringify(w.raw)}`));
}

if (trappedBlocks.length > 0) {
  console.log('\nTRAPPED BLOCKS:');
  trappedBlocks.forEach(b => console.log(`  - [${b.lesId} Block #${b.blockNum} (${b.lang})]: Heading=${b.hasHeading}, Table=${b.hasTable} | snippet: ${b.snippet}`));
}

if (duplicates.length > 0) {
  console.log('\nDUPLICATE PARAGRAPHS:');
  duplicates.forEach(d => {
    console.log(`  - Count: ${d.count} across ${d.distinctLessons} lessons:`);
    console.log(`    Sample: "${d.textSample}"`);
    console.log(`    Locations: ${d.locations.join('; ')}`);
  });
}
