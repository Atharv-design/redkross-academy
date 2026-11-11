import fs from 'fs';

const mod4 = fs.readFileSync('src/services/db/course03/modules/module4.js', 'utf8');
const idx = mod4.indexOf('0x7F');
console.log('Raw characters in module4 around 0x7F:');
console.log(JSON.stringify(mod4.slice(idx - 35, idx + 15)));
