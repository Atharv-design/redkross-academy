import fs from 'fs';

const parserFile = fs.readFileSync('src/utils/markdownParser.js', 'utf8');
const lines = parserFile.split('\n');

lines.forEach((l, i) => {
  if (l.includes('&') || l.includes('cleanLatex')) {
    console.log((i+1) + ': ' + l.trim());
  }
});
