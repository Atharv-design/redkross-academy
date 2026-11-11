import fs from 'fs';
import katex from 'katex';

import { module1Data } from '../src/services/db/course03/modules/module1.js';
import { module2Data } from '../src/services/db/course03/modules/module2.js';
import { module3Data } from '../src/services/db/course03/modules/module3.js';
import { module4Data } from '../src/services/db/course03/modules/module4.js';
import { module5Data } from '../src/services/db/course03/modules/module5.js';
import { module6Data } from '../src/services/db/course03/modules/module6.js';
import { module7Data } from '../src/services/db/course03/modules/module7.js';
import { module8Data } from '../src/services/db/course03/modules/module8.js';

const allModules = [
  module1Data, module2Data, module3Data, module4Data,
  module5Data, module6Data, module7Data, module8Data
];

function isLikelyMath(eq) {
  if (!eq || typeof eq !== 'string') return false;
  if (eq.includes('@@@CODEBLOCK_') || eq.includes('@@@INLINECODE_')) return false;
  if (/["><]|(=~)|(\$\()|(\$\{)/.test(eq)) return false;
  if (!/(\\[a-zA-Z]+|[=^_+\-×÷≠≤≥≈±]|\\pmod|\\lfloor|\\rfloor)/.test(eq)) return false;
  return true;
}

let realMathCount = 0;
let shellIgnoredCount = 0;

allModules.forEach((mod, mIdx) => {
  mod.lessons.forEach((l, lIdx) => {
    const inlineDollar = /(?<![0-9a-zA-Z\\\$])\$([^\s\$][^\$\r\n]*?[^\s\$]|[^\s\$])\$(?![0-9a-zA-Z\$])/g;
    let m;
    while ((m = inlineDollar.exec(l.content)) !== null) {
      const eq = m[1];
      if (isLikelyMath(eq)) {
        try {
          katex.renderToString(eq, { displayMode: false, throwOnError: true });
          realMathCount++;
          console.log(`[M${mIdx+1} L${lIdx+1} MATH]:`, eq);
        } catch (e) {
          console.error(`[M${mIdx+1} L${lIdx+1} MATH ERROR]:`, eq, e.message);
        }
      } else {
        shellIgnoredCount++;
      }
    }
  });
});

console.log(`Summary: Real valid inline math = ${realMathCount}, Safely ignored shell syntax = ${shellIgnoredCount}`);
