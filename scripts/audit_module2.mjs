import { module2Data } from '../src/services/db/curriculum/module2.js';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

console.log('=== MODULE 2 DEEP CONTENT DESIGN AUDIT ===\n');

module2Data.lessons.forEach((lesson, index) => {
  const content = lesson.content || '';
  const html = renderMarkdownToHtml(content);

  console.log(`============================================================`);
  console.log(`LESSON ${index + 1}: [${lesson.id}] "${lesson.title}"`);
  console.log(`============================================================`);

  // 1. Figures & Captions
  const lines = content.split('\n');
  const imgLines = [];
  lines.forEach((line, lineNo) => {
    if (line.includes('![') || line.includes('*Figure ') || line.includes('Architectural illustration') || line.includes('/assets/courses/')) {
      imgLines.push(`  L${lineNo + 1}: ${line.trim()}`);
    }
  });
  console.log(`Image / Caption lines found (${imgLines.length}):`);
  imgLines.forEach(l => console.log(l));

  // 2. Headings
  const headings = content.match(/^#{1,4} .*/gm) || [];
  console.log(`Headings count: ${headings.length}`);
  console.log(`  Sample headings:`, headings.slice(0, 4));

  // 3. Tables
  const tableRows = (content.match(/^\|/gm) || []).length;
  const academicTables = (html.match(/ACADEMIC REFERENCE/g) || []).length;
  console.log(`Table rows in MD: ${tableRows}, Formally Titled Academic Tables: ${academicTables}`);

  // 4. Semantic Callouts
  const callouts = (content.match(/^> /gm) || []).length;
  console.log(`Callouts count: ${callouts}`);

  // 5. Glossaries & Description Lists
  const dlCount = (html.match(/<dl class=/g) || []).length;
  console.log(`Description Lists (<dl>) rendered: ${dlCount}`);

  // 6. Code Blocks / Terminal CLI
  const codeBlocks = (content.match(/```/gm) || []).length / 2;
  console.log(`Code / Terminal blocks: ${codeBlocks}`);

  // 7. Review Questions
  const questions = (content.match(/^\d+\.\s+/gm) || []).length;
  console.log(`Review Questions: ${questions}`);

  // 8. Word Count & Length
  console.log(`Length: ${content.length} chars (~${Math.round(content.length / 5)} words)`);
});
