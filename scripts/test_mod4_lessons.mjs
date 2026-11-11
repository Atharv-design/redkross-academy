import fs from 'fs';
import katex from 'katex';
import { module4Data } from '../src/services/db/course03/modules/module4.js';

// Let's test all lessons in module 4
const lessons = module4Data.lessons;

lessons.forEach((l, idx) => {
  let content = l.content;
  
  // Test regex on content
  const inlineDollar = /(?<![0-9a-zA-Z\\\$])\$([^\s\$][^\$\r\n]*?[^\s\$]|[^\s\$])\$(?![0-9a-zA-Z\$])/g;
  
  let matches = [];
  content.replace(inlineDollar, (m, eq) => {
    // Check if it's shell var
    if (/^(\?|\d+|[A-Za-z_][A-Za-z0-9_]*|\{[^}]+\}|'[^']*'|\([^)]+\))$/.test(eq)) {
      return m;
    }
    try {
      const rendered = katex.renderToString(eq, { displayMode: false, throwOnError: true });
      matches.push({ eq, valid: true });
    } catch (e) {
      matches.push({ eq, valid: false, err: e.message });
    }
  });
  
  console.log(`Lesson 4.${idx+1} (${l.title.slice(0, 30)}): ${matches.length} math matches`);
  matches.forEach(m => {
    if (m.valid) {
      console.log('  [VALID MATH]:', m.eq);
    } else {
      console.log('  [INVALID MATH (safely ignored)]:', m.eq, '-->', m.err.slice(0, 60));
    }
  });
});
