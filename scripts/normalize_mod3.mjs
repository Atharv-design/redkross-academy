import fs from 'fs';

const filePath = 'src/services/db/course03/modules/module3.js';
let content = fs.readFileSync(filePath, 'utf8');

const t1 = '- **UID 0:** root (all-powerful)\\n- **UID 1-999:** system/service accounts\\n  UID 1000+       human users';
const r1 = '- **UID 0:** Root superuser account (all-powerful).\\n- **UID 1-999:** System and daemon service accounts.\\n- **UID 1000+:** Standard human user accounts.';

const t2 = '- **passwd asha:** set or change a password (interactive)\\n  usermod -aG grp user add to a group (-a appends; without it -G REPLACES\\n                       all supplementary groups - a classic mistake)\\n- **usermod -L user:** lock the password (prefix \\"!\\" in shadow)';
const r2 = '- **passwd asha:** Set or change a password interactively.\\n- **usermod -aG grp user:** Add user to a group (-a appends; omitting it replaces all supplementary groups).\\n- **usermod -L user:** Lock the password (prefix \\"!\\" in shadow).';

const t3 = '  chmod u+x file      add execute for owner\\n- **chmod o-r file:** remove read for others\\n  chmod g=rw file     set group exactly to rw\\n- **chmod a-w file:** remove write for all';
const r3 = '- **chmod u+x file:** Add execute permission for owner.\\n- **chmod o-r file:** Remove read permission for others.\\n- **chmod g=rw file:** Set group permissions exactly to read and write.\\n- **chmod a-w file:** Remove write permission for all users.';

const t4 = '- **chown asha file:** change owner\\n  chown asha:finance file  change owner and group\\n- **chgrp finance file:** change group';
const r4 = '- **chown asha file:** Change file owner.\\n- **chown asha:finance file:** Change file owner and primary group simultaneously.\\n- **chgrp finance file:** Change primary group.';

console.log('t1 found:', content.includes(t1));
console.log('t2 found:', content.includes(t2));
console.log('t3 found:', content.includes(t3));
console.log('t4 found:', content.includes(t4));

if (content.includes(t1) && content.includes(t2) && content.includes(t3) && content.includes(t4)) {
  content = content.replace(t1, r1).replace(t2, r2).replace(t3, r3).replace(t4, r4);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated module3.js!');
} else {
  console.error('Failed to match all targets in module3.js!');
}
