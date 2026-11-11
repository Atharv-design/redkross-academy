import fs from 'fs';

const content = fs.readFileSync('src/services/db/course03/modules/module3.js', 'utf8');
const idx = content.indexOf('2.1.1 Accounts are numbers');
console.log(content.slice(idx, idx + 1800));
