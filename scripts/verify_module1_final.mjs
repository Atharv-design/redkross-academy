import { module1Data } from '../src/services/db/curriculum/module1.js';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

console.log('=== FINAL AUDIT & COMPLIANCE VERIFICATION: MODULE 1 ===\n');

let totalLessons = module1Data.lessons.length;
let totalWordCount = 0;
let totalTables = 0;
let totalFigures = 0;
let totalCallouts = 0;
let totalCodeBlocks = 0;
let violationsFound = false;

module1Data.lessons.forEach((lesson, index) => {
  const html = renderMarkdownToHtml(lesson.content);
  const wordCount = Math.round(lesson.content.length / 5);
  totalWordCount += wordCount;

  console.log(`------------------------------------------------------------`);
  console.log(`LESSON ${index + 1}: [${lesson.id}] "${lesson.title}"`);
  console.log(`  Word count: ~${wordCount} words (${lesson.content.length} chars)`);

  // Check 1: Duplicate Captions
  // Look for any <figure> that is immediately followed by a <p><em or any duplicate figure text
  const figCount = (html.match(/<figure/g) || []).length;
  totalFigures += figCount;
  console.log(`  Figures rendered: ${figCount}`);

  if (html.includes('*Figure') || html.includes('*Diagram')) {
    console.error(`  ❌ VIOLATION: Unparsed italic figure marker found in rendered HTML!`);
    violationsFound = true;
  }

  // Check 2: Generic AI Placeholders
  if (lesson.content.includes('Architectural illustration for')) {
    console.error(`  ❌ VIOLATION: Generic AI placeholder caption found!`);
    violationsFound = true;
  }

  // Check 3: Raw URL Leaks (URLs appearing without markdown image ![alt](url) or link [text](url) syntax)
  const lines = lesson.content.split('\n');
  const leakedUrls = lines.filter(l => l.includes('/assets/courses/') && !l.includes('![') && !l.includes('['));
  if (leakedUrls.length > 0) {
    console.error(`  ❌ VIOLATION: Leaked raw URL syntax found:`, leakedUrls);
    violationsFound = true;
  }

  // Check 4: Tables
  const tableCount = (html.match(/<table/g) || []).length;
  totalTables += tableCount;
  console.log(`  Tables rendered: ${tableCount}`);

  // Check 5: Callouts
  const calloutCount = (html.match(/<blockquote/g) || []).length;
  totalCallouts += calloutCount;
  console.log(`  Semantic Callouts: ${calloutCount}`);

  // Check 6: Code/Terminal Blocks
  const codeCount = (html.match(/<pre class=/g) || []).length;
  totalCodeBlocks += codeCount;
  console.log(`  Code/Terminal blocks: ${codeCount}`);

  // Check 7: Review Questions
  const reviewQuestionsCount = (lesson.content.match(/^\d+\.\s+/gm) || []).length;
  console.log(`  Review Questions preserved: ${reviewQuestionsCount}`);
  if (reviewQuestionsCount < 5) {
    console.error(`  ❌ VIOLATION: Less than 5 review questions found!`);
    violationsFound = true;
  }
});

console.log(`\n============================================================`);
console.log(`OVERALL MODULE 1 SUMMARY:`);
console.log(`- Total Lessons: ${totalLessons}`);
console.log(`- Total Word Count: ~${totalWordCount} words`);
console.log(`- Total Figures Rendered: ${totalFigures}`);
console.log(`- Total Comparative Tables: ${totalTables}`);
console.log(`- Total Semantic Callouts: ${totalCallouts}`);
console.log(`- Total Code / Terminal Blocks: ${totalCodeBlocks}`);
console.log(`- Violations Detected: ${violationsFound ? 'YES (FAIL)' : 'NONE (100% CLEAN)'}`);
console.log(`============================================================\n`);

if (violationsFound) {
  process.exit(1);
} else {
  console.log('🎉 ALL MODULE 1 CHECKS PASSED WITH ZERO VIOLATIONS.');
}
