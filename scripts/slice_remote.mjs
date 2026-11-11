import fs from 'fs';

const content = fs.readFileSync('src/services/db/course03/modules/module5.js', 'utf8');
const idx = content.indexOf('Remote Desktop:');
console.log(JSON.stringify(content.slice(idx - 20, idx + 100)));
const idx2 = content.indexOf('RID `500`:');
console.log(JSON.stringify(content.slice(idx2 - 20, idx2 + 100)));
