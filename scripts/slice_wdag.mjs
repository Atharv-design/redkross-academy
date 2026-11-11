import fs from 'fs';

const content = fs.readFileSync('src/services/db/course03/modules/module5.js', 'utf8');
const idx = content.indexOf('WDAGUtilityAccount');
console.log(JSON.stringify(content.slice(idx - 20, idx + 100)));
