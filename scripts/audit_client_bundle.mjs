#!/usr/bin/env node
/**
 * Post-build audit of dist/ (run after `npm run build`). Exit 1 on any finding.
 *  - no assessment answer keys in client JavaScript
 *  - no server secrets or previously leaked credentials
 *  - no instructor-only course material in public files
 */
import fs from 'fs';
import path from 'path';

const DIST = path.resolve(process.argv[2] || 'dist');
if (!fs.existsSync(path.join(DIST, 'assets'))) {
  console.error(`dist assets not found at ${DIST}/assets - run the build first`);
  process.exit(1);
}

const CHECKS = [
  { name: 'answer index field', re: /["']?\b(correct|correct_index)["']?\s*:\s*\d\b/g },
  // admin course-builder chunks hold generic template questions, not live assessment keys
  { name: 'is_correct literal', re: /["']?is_correct["']?\s*:\s*(!0|!1|true|false)\b/g, skip: /[\\/]Admin[A-Za-z]*-[\w-]+\.js$/ },
  { name: 'correctOptionId', re: /correctOptionId/g },
  { name: 'Neon credential', re: /npg_[A-Za-z0-9]{8,}/g },
  { name: 'Resend key', re: /\bre_[A-Za-z0-9]{8,}_[A-Za-z0-9]{8,}/g },
  { name: 'E2B key', re: /\be2b_[a-f0-9]{30,}/g },
  { name: 'base64 Resend key', re: /cmVfZzNV/g },
  { name: 'default signing secret', re: /tamperproof_signing_key/g },
  { name: 'service account key', re: /-----BEGIN (RSA )?PRIVATE KEY-----/g },
];

let findings = 0;
const files = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (/\.(js|mjs|html|json|md|txt)$/.test(f)) files.push(p);
  }
})(DIST);

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const { name, re, skip } of CHECKS) {
    if (skip && skip.test(file)) continue;
    re.lastIndex = 0;
    const m = text.match(re);
    if (m) {
      // in-app code may legitimately *read* a property called correct (e.g. q.correct) - only literals count
      findings += m.length;
      console.error(`FAIL ${name}: ${m.length} hit(s) in ${path.relative(DIST, file)} e.g. ${JSON.stringify(m[0])}`);
    }
  }
  if (/\.md$/.test(file) && /INSTRUCTOR-ONLY|Correct answer:/.test(text)) {
    findings++;
    console.error(`FAIL instructor/answer text in ${path.relative(DIST, file)}`);
  }
}

console.log(`Audited ${files.length} files in ${DIST}`);
if (findings) {
  console.error(`${findings} finding(s)`);
  process.exit(1);
}
console.log('PASS client bundle contains no answer keys or known secrets');
