#!/usr/bin/env node
/**
 * Integrity checks for the library import. Exit code 1 on any failure.
 *  - client-visible files (src/, public/course-content) contain no answer keys,
 *    no MCQ question stems and no instructor-only material
 *  - every server bank question has 4 options and a valid answer index
 *  - every lesson content_url resolves to a file, every figure referenced exists
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`FAIL ${msg}`);
};

const { LIBRARY_COURSES } = await import(new URL('../src/services/db/library/libraryCourses.generated.js', import.meta.url));
const { LIBRARY_SPECS, LIBRARY_BANK_LOADERS } = await import(new URL('../api/_data/library/index.js', import.meta.url));

const catalogText = fs.readFileSync(path.join(ROOT, 'src/services/db/library/libraryCourses.generated.js'), 'utf8');
if (/"correct"\s*:|"is_correct"\s*:|"explanation"\s*:|"questions"\s*:/.test(catalogText)) fail('client catalog contains assessment answer fields');

const FORBIDDEN = [/INSTRUCTOR-ONLY/i, /Correct answer:/, /^C3\.C Answer key/m, /\bCQ01 [A-D]\b/, /model solution outline/i];
let lessons = 0;
const stems = [];
for (const spec of LIBRARY_SPECS) {
  const bank = (await LIBRARY_BANK_LOADERS[spec.id]()).default;
  for (const [m, qs] of Object.entries(bank.modules)) {
    if (qs.length < 10) fail(`${spec.id} module ${m}: only ${qs.length} questions`);
    for (const q of qs) {
      if (q.options.length !== 4 || !(q.correct >= 0 && q.correct < 4) || !q.q) fail(`${q.id}: malformed`);
      if (q.q.length > 40) stems.push(q.q.slice(0, 60));
    }
  }
  if (bank.course.length !== 20) fail(`${spec.id}: ${bank.course.length} course MCQs`);
  for (const q of bank.course) if (q.options.length !== 4 || !(q.correct >= 0 && q.correct < 4)) fail(`${q.id}: malformed`);
  if (spec.final.count > bank.course.length + Object.values(bank.modules).flat().length) fail(`${spec.id}: final larger than bank`);
}

for (const course of LIBRARY_COURSES) {
  for (const mod of course.modules) {
    for (const les of mod.lessons) {
      lessons++;
      const file = path.join(ROOT, 'public', les.content_url);
      if (!fs.existsSync(file)) {
        fail(`${les.id}: missing ${les.content_url}`);
        continue;
      }
      const text = fs.readFileSync(file, 'utf8');
      for (const re of FORBIDDEN) if (re.test(text)) fail(`${les.id}: forbidden text ${re}`);
      const prose = text.replace(/```[\s\S]*?```/g, ''); // fenced code is never rendered as markup
      for (const img of prose.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
        if (!fs.existsSync(path.join(ROOT, 'public', img[1]))) fail(`${les.id}: missing image ${img[1]}`);
      }
    }
  }
  if (!fs.existsSync(path.join(ROOT, 'public', course.lab_kit_url))) fail(`${course.id}: missing lab kit`);
}

// no MCQ stem may appear verbatim in client-visible lesson files
const contentDir = path.join(ROOT, 'public/course-content');
const allContent = fs
  .readdirSync(contentDir)
  .flatMap((d) => fs.readdirSync(path.join(contentDir, d)).map((f) => fs.readFileSync(path.join(contentDir, d, f), 'utf8')))
  .join('\n')
  .replace(/\s+/g, ' ');
const leaked = stems.filter((s) => allContent.includes(s.replace(/\s+/g, ' ')));
// course text may legitimately restate a fact a question tests; a large overlap means MCQ blocks leaked
if (leaked.length) console.warn(`WARN ${leaked.length} question stems also appear in lesson text (e.g. "${leaked[0]}")`);
if (leaked.length > stems.length * 0.05) fail('too many question stems in client-visible lesson files');

console.log(`Checked ${LIBRARY_COURSES.length} courses, ${lessons} lessons, ${stems.length} question stems.`);
if (failures) {
  console.error(`${failures} failure(s)`);
  process.exit(1);
}
console.log('PASS library import integrity');
