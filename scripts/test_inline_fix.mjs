import fs from 'fs';
import katex from 'katex';

const mod4 = fs.readFileSync('src/services/db/course03/modules/module4.js', 'utf8');

// Test the inline math with throwOnError: true
function safeRenderInlineMath(eq) {
  if (eq.includes('@@@CODEBLOCK_') || eq.includes('@@@INLINECODE_')) return null;
  // If opening was followed by space or closing preceded by space, skip
  if (/^\s|\s$/.test(eq)) return null;
  // If it looks like a shell variable like ? or 1 or VAR without any math operator
  if (/^(\?|\d+|[A-Za-z_][A-Za-z0-9_]*|\{[^}]+\})$/.test(eq)) return null;

  try {
    return katex.renderToString(eq, {
      displayMode: false,
      throwOnError: true,
      output: 'html'
    });
  } catch (e) {
    return null;
  }
}

// Let's test on the actual module 4 content
let raw = mod4;
let matchesFound = 0;
let validMathRendered = 0;
let falsePositivesSkipped = 0;

const regex = /(?<![0-9a-zA-Z\\])\$([^\$\n\r]+?)\$(?![0-9a-zA-Z])/g;
let m;
while ((m = regex.exec(raw)) !== null) {
  matchesFound++;
  const res = safeRenderInlineMath(m[1]);
  if (res) {
    validMathRendered++;
    console.log('Valid math rendered:', m[1]);
  } else {
    falsePositivesSkipped++;
    console.log('Non-math / shell skipped cleanly:', m[1].slice(0, 50));
  }
}

console.log(`Total: ${matchesFound}, Valid math: ${validMathRendered}, Skipped non-math: ${falsePositivesSkipped}`);
