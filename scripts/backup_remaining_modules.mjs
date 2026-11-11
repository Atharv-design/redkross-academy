import fs from 'fs';
import path from 'path';

const backupDir = path.resolve('src/services/db/course03/modules/backup_visual_enhancement');
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

for (let m = 2; m <= 8; m++) {
  const src = path.resolve(`src/services/db/course03/modules/module${m}.js`);
  const dest = path.join(backupDir, `module${m}.js.bak`);
  fs.copyFileSync(src, dest);
  console.log(`Backed up module${m}.js: ${fs.statSync(dest).size} bytes`);
}
