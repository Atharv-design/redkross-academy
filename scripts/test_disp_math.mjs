import katex from 'katex';
import fs from 'fs';

const parserFile = fs.readFileSync('src/utils/markdownParser.js', 'utf8');
const start = parserFile.indexOf('function cleanLatex');
const end = parserFile.indexOf('function renderMathStepsBlock');
const fnCode = parserFile.slice(start, end);
const cleanLatex = new Function(fnCode + '; return cleanLatex;')();

const eq = '\\text{Exit Code} = (\\text{Status} \\gg 8) \\ \\& \\ 0\\text{xFF}';
console.log('cleanLatex:', cleanLatex(eq));
const rendered = katex.renderToString(cleanLatex(eq), {
  displayMode: true,
  throwOnError: false,
  output: 'html'
});
console.log('Includes error:', rendered.includes('katex-error'));
console.log('Rendered snippet:', rendered.slice(0, 150));
