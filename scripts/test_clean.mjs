import fs from 'fs';

const parserFile = fs.readFileSync('src/utils/markdownParser.js', 'utf8');
const snippet = 'via $\\text{Status} \\ \\& \\ 0x7F$, allowing defe';

const match = snippet.match(/(?<![0-9a-zA-Z\\])\$([^\$\n\r]+?)\$(?![0-9a-zA-Z])/);
console.log('Match[1]:', JSON.stringify(match[1]));

const start = parserFile.indexOf('function cleanLatex');
const end = parserFile.indexOf('function renderMathStepsBlock');
const fnCode = parserFile.slice(start, end);
const cleanLatex = new Function(fnCode + '; return cleanLatex;')();

const cleaned = cleanLatex(match[1]);
console.log('cleanLatex result:', JSON.stringify(cleaned));
