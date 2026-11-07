import { module2Data } from '../src/services/db/curriculum/module2.js';
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

console.log('=== FINAL AUDIT & COMPLIANCE VERIFICATION: MODULE 2 ===\n');

let totalLessons = module2Data.lessons.length;
let totalWordCount = 0;
let totalTables = 0;
let totalFigures = 0;
let totalCallouts = 0;
let totalCodeBlocks = 0;
let totalDl = 0;
let violationsFound = false;

// Expected academic titles
const expectedTitles = [
  "2.1 The CIA Triad Deep Dive",
  "2.2 AAA Framework and Non-Repudiation",
  "2.3 Principle of Least Privilege (PoLP)",
  "2.4 Defense in Depth Architecture",
  "2.5 Zero Trust Architecture (ZTA)",
  "2.6 Fail-Safe Defaults & Complete Mediation",
  "2.7 Separation of Duties & Dual Control",
  "2.8 Applied Case Analyses of Core Principles"
];

module2Data.lessons.forEach((lesson, index) => {
  const html = renderMarkdownToHtml(lesson.content);
  const wordCount = Math.round(lesson.content.length / 5);
  totalWordCount += wordCount;

  console.log(`------------------------------------------------------------`);
  console.log(`LESSON ${index + 1}: [${lesson.id}] "${lesson.title}"`);
  console.log(`  Word count: ~${wordCount} words (${lesson.content.length} chars)`);

  // Check 0: Title Harmonization
  if (lesson.title !== expectedTitles[index]) {
    console.error(`  ❌ VIOLATION: Expected title "${expectedTitles[index]}", but found "${lesson.title}"`);
    violationsFound = true;
  }

  // Check 1: Duplicate Captions
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

  // Check 3: Raw URL Leaks
  const lines = lesson.content.split('\n');
  const leakedUrls = lines.filter(l => l.includes('/assets/courses/') && !l.includes('![') && !l.includes('['));
  if (leakedUrls.length > 0) {
    console.error(`  ❌ VIOLATION: Leaked raw URL syntax found:`, leakedUrls);
    violationsFound = true;
  }

  // Check 4: Tables
  const tableCount = (html.match(/ACADEMIC REFERENCE/g) || []).length;
  totalTables += tableCount;
  console.log(`  Formally Titled Academic Tables: ${tableCount}`);
  if (tableCount === 0) {
    console.error(`  ❌ VIOLATION: Expected at least 1 Academic Table in L${index + 1}`);
    violationsFound = true;
  }

  // Check 5: Callouts
  const calloutCount = (html.match(/<blockquote/g) || []).length;
  totalCallouts += calloutCount;
  console.log(`  Semantic Callouts: ${calloutCount}`);
  if (calloutCount < 2) {
    console.error(`  ❌ VIOLATION: Expected at least 2 Semantic Callouts in L${index + 1}`);
    violationsFound = true;
  }

  // Check 6: Description Lists
  const dlCount = (html.match(/<dl class=/g) || []).length;
  totalDl += dlCount;
  console.log(`  Description Lists (<dl>): ${dlCount}`);

  // Check 7: Code/Terminal Blocks
  const codeCount = (html.match(/<pre class=/g) || []).length;
  totalCodeBlocks += codeCount;
  console.log(`  Code/Terminal blocks: ${codeCount}`);
  if (codeCount === 0) {
    console.error(`  ❌ VIOLATION: Expected Terminal CLI block in L${index + 1}`);
    violationsFound = true;
  }

  // Check 8: Review Questions
  const reviewQuestionsCount = (lesson.content.match(/^\d+\.\s+/gm) || []).length;
  console.log(`  Review Questions preserved: ${reviewQuestionsCount}`);
  if (reviewQuestionsCount < 5) {
    console.error(`  ❌ VIOLATION: Less than 5 review questions found!`);
    violationsFound = true;
  }
});

console.log(`\n============================================================`);
console.log(`OVERALL MODULE 2 SUMMARY:`);
console.log(`- Total Lessons: ${totalLessons}`);
console.log(`- Total Word Count: ~${totalWordCount} words`);
console.log(`- Total Figures Rendered: ${totalFigures}`);
console.log(`- Total Formally Titled Academic Tables: ${totalTables}`);
console.log(`- Total Semantic Multi-Themed Callouts: ${totalCallouts}`);
console.log(`- Total Semantic Description Lists (<dl>): ${totalDl}`);
console.log(`- Total Code / Terminal Blocks: ${totalCodeBlocks}`);
console.log(`- Violations Detected: ${violationsFound ? 'YES (FAIL)' : 'NONE (100% CLEAN)'}`);
console.log(`============================================================\n`);

if (violationsFound) {
  process.exit(1);
} else {
  console.log('🎉 ALL MODULE 2 CHECKS PASSED WITH ZERO VIOLATIONS.');
}
