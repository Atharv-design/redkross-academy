import fs from 'fs';
import katex from 'katex';

function testCleanLatex(eq) {
  if (!eq) return '';
  let res = eq
    .replace(/\u0009ext/g, '\\text')
    .replace(/\u0009imes/g, '\\times')
    .replace(/\u0009o\b/g, '\\to')
    .replace(/\u0008mathbf/g, '\\mathbf')
    .replace(/\u0008egin/g, '\\begin')
    .replace(/\u000crac/g, '\\frac')
    // Only collapse over-escaped command backslashes at start-of-expression or after whitespace/operators
    .replace(/(?:^|(?<=[\s=+\-*\/({[]))\\\\+([a-zA-Z]+)/g, '\\$1')
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

  // If \to was substituted inside \text{...}, restore English word 'to'
  res = res.replace(/\\text\{([^}]+)\}/g, (m, inner) => {
    return `\\text{${inner.replace(/\\to\b/g, 'to')}}`;
  });

  return res;
}

const tests = [
  { name: 'Overescaped start \\\\text', input: '\\\\text{Virtual Address}', expectedCommand: '\\text{Virtual Address}' },
  { name: 'Overescaped operator = \\\\frac', input: 'VPN = \\\\frac{A}{B}', expectedCommand: 'VPN = \\frac{A}{B}' },
  { name: 'Legitimate line break in aligned', input: '\\begin{aligned} x &= 1 \\\\ y &= 2 \\end{aligned}', validKatex: true },
  { name: 'Legitimate line break with space \\\\ \\text', input: '\\begin{aligned} x &= 1 \\\\ \\text{and } y &= 2 \\end{aligned}', validKatex: true },
  { name: 'Matrix line break', input: '\\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}', validKatex: true },
  { name: 'Mod1 VPN equation', input: 'VPN = \\lfloor \\frac{\\text{Virtual Address}}{4096} \\rfloor = \\text{Virtual Address} \\gg 12', validKatex: true },
  { name: 'Mod3 Bitwise and \\ \\& \\', input: 'P_{\\text{eff}} = P_{\\text{base}} \\ \\& \\ (\\sim \\text{umask})', validKatex: true },
  { name: 'Mod8 Hardening index', input: 'H_{\\text{index}} = \\frac{\\sum_{i=1}^{N} w_i \\cdot C_i}{\\sum_{i=1}^{N} w_i} \\times 100\\%', validKatex: true }
];

let allPassed = true;
tests.forEach(t => {
  const cleaned = testCleanLatex(t.input);
  console.log(`[TEST: ${t.name}]`);
  console.log('  Cleaned:', cleaned);
  if (t.expectedCommand && cleaned !== t.expectedCommand) {
    console.error('  FAILED expectedCommand check!');
    allPassed = false;
  }
  if (t.validKatex) {
    try {
      katex.renderToString(cleaned, { displayMode: true, throwOnError: true });
      console.log('  KaTeX render: OK');
    } catch (e) {
      console.error('  KaTeX render FAILED:', e.message);
      allPassed = false;
    }
  }
});

console.log('All tests passed:', allPassed);
