import fs from 'fs';

const mod4 = fs.readFileSync('src/services/db/course03/modules/module4.js', 'utf8');
const lines = mod4.split('\n');

lines.forEach((line, i) => {
  const dollarMatches = line.match(/(?<!\\)\$/g);
  if (dollarMatches && dollarMatches.length % 2 !== 0) {
    console.log(`Line ${i+1} has odd number of dollars (${dollarMatches.length}): ${line.trim().slice(0, 100)}`);
  }
});
