import fs from 'fs';

const filePath = 'src/services/db/course03/modules/module5.js';
let content = fs.readFileSync(filePath, 'utf8');

const t1 = '- **RID 504:** WDAGUtilityAccount\\n  RID 1000+        accounts created later\\n- **S-1-5-32-544:** BUILTIN\\\\Administrators group';
const r1 = '- **RID 504:** WDAGUtilityAccount\\n- **RID 1000+:** Accounts created later for custom users and groups.\\n- **S-1-5-32-544:** BUILTIN\\\\Administrators group';

const t2 = '- **Remote Desktop:** may sign in through RDP.\\n  Users\\n- **Backup Operators:** may back up and restore';
const r2 = '- **Remote Desktop Users:** May sign in through RDP.\\n- **Backup Operators:** May back up and restore';

const t3 = '- RID `500`: Built-in local Administrator account.\\n  - RID `501`: Built-in Guest account.\\n  - RID `512`: Active Directory Domain Admins group.\\n  - RID `>= 1000`: Custom user accounts and security groups created by administrators.';
const r3 = '- **RID 500:** Built-in local Administrator account.\\n  - **RID 501:** Built-in Guest account.\\n  - **RID 512:** Active Directory Domain Admins group.\\n  - **RID >= 1000:** Custom user accounts and security groups created by administrators.';

console.log('t1 found:', content.includes(t1));
console.log('t2 found:', content.includes(t2));
console.log('t3 found:', content.includes(t3));

if (content.includes(t1) && content.includes(t2) && content.includes(t3)) {
  content = content.replace(t1, r1).replace(t2, r2).replace(t3, r3);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated module5.js!');
} else {
  console.error('Did not find all targets!');
}
