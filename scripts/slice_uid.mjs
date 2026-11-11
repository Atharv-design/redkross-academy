import fs from 'fs';

const content = fs.readFileSync('src/services/db/course03/modules/module3.js', 'utf8');
const idx = content.indexOf('UID 0:');
console.log(JSON.stringify(content.slice(idx - 30, idx + 120)));
