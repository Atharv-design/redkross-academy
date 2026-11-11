import fs from 'fs';

const mod4 = fs.readFileSync('src/services/db/course03/modules/module4.js', 'utf8');
const idx = mod4.indexOf('IFS=');
console.log(mod4.slice(idx - 100, idx + 200));
