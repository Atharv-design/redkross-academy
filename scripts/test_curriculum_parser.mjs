import { course02Data } from '../src/services/db/course02/index.js';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

console.log('Testing markdownParser on all Course 2 lessons via exported course02Data...\n');

let totalLessons = 0;
let totalKatex = 0;
let totalMermaid = 0;
let totalTables = 0;
let totalFigures = 0;

course02Data.modules.forEach((mod, mIdx) => {
  console.log(`=== Module ${mIdx + 1}: ${mod.title} (${mod.lessons.length} lessons) ===`);
  mod.lessons.forEach((les, lIdx) => {
    totalLessons++;
    const rendered = renderMarkdownToHtml(les.content || '');
    const hasKatex = rendered.includes('class="katex"');
    const hasMermaid = rendered.includes('class="mermaid');
    const hasTable = rendered.includes('<table');
    const hasFigure = rendered.includes('<figure');

    if (hasKatex) totalKatex++;
    if (hasMermaid) totalMermaid++;
    if (hasTable) totalTables++;
    if (hasFigure) totalFigures++;

    console.log(`  Lesson ${mIdx + 1}.${lIdx + 1} (${les.title}): Length ${rendered.length} | KaTeX: ${hasKatex} | Mermaid: ${hasMermaid} | Tables: ${hasTable} | Figures: ${hasFigure}`);
  });
});

console.log(`\n--- SUMMARY ---`);
console.log(`Total Lessons Audited: ${totalLessons}`);
console.log(`Lessons with KaTeX math: ${totalKatex}`);
console.log(`Lessons with Mermaid diagrams: ${totalMermaid}`);
console.log(`Lessons with Tables: ${totalTables}`);
console.log(`Lessons with Figures: ${totalFigures}`);
