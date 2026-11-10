import fs from 'fs';
import path from 'path';
import { C03_DIAGRAM_PROMPTS } from './generate_c03_diagram_prompts.mjs';

console.log('--- EXPORTING COURSE 03 WHITE DIAGRAM PROMPTS CATALOG ---');

let markdown = `# RedKross Academy — Course 03: Linux and Windows System Administration
## Production Vector Diagram Prompts Catalog (White Background Edition)

> [!IMPORTANT]
> **Design & Style Invariants:**
> - **Background:** Pure Stark White (\`#FFFFFF\`) — zero dark mode constraints, optimized for high-contrast presentation and technical documentation clarity.
> - **Aesthetic:** Modern technical vector, clean architectural flowcharts, precise block diagrams, high contrast dark typography (\`#0F172A\`, \`#1E293B\`).
> - **Accents:** Professional cybersecurity palette — Warm Amber (\`#D97706\`), Deep Navy (\`#1E3A8A\`), Emerald (\`#16A34A\`), and Alert Crimson (\`#DC2626\`).
> - **Coverage:** Exactly **96 diagrams** across **48 lessons** (2 diagrams per lesson across all 8 modules). All 24 source figures from \`FIGURES/C03\` are seamlessly integrated and elevated.

---

`;

const MODULE_NAMES = [
  "Module 1: Operating System Foundations",
  "Module 2: Linux Environment & File Hierarchy",
  "Module 3: Linux Administration & Permissions",
  "Module 4: Linux Automation & Shell Scripting",
  "Module 5: Windows Foundations & Architecture",
  "Module 6: PowerShell Administration",
  "Module 7: Enterprise Administration & Active Directory",
  "Module 8: System Hardening & Auditing"
];

for (let m = 1; m <= 8; m++) {
  markdown += `\n## ${MODULE_NAMES[m - 1]}\n\n`;
  const modDiagrams = C03_DIAGRAM_PROMPTS.filter(d => d.modNum === m);
  
  for (let l = 1; l <= 6; l++) {
    const lesDiagrams = modDiagrams.filter(d => d.lesNum === l);
    markdown += `### Lesson ${m}.${l}\n\n`;
    
    lesDiagrams.forEach((diag, idx) => {
      markdown += `#### ${diag.figId}: ${diag.title}\n`;
      markdown += `- **Asset Slug:** \`/assets/courses/cyber-03/${diag.slug}.png\`\n`;
      if (diag.sourceFile) {
        markdown += `- **Source Figure Reference:** \`FIGURES/C03/${diag.sourceFile}\`\n`;
      }
      markdown += `- **Caption:** *${diag.caption}*\n`;
      markdown += `- **Alt Text:** ${diag.alt}\n`;
      markdown += `- **White Background Generation Prompt:**\n\n`;
      markdown += `\`\`\`text\n${diag.prompt}\n\`\`\`\n\n`;
    });
  }
}

const outPath1 = path.resolve('scripts/course03_white_diagram_prompts.md');
fs.writeFileSync(outPath1, markdown, 'utf8');
console.log('Saved to:', outPath1);

const brainPath = 'C:/Users/athar/.gemini/antigravity/brain/98418f1c-549f-4008-8d03-5bc6d6ed02ef/course03_white_diagram_prompts.md';
if (fs.existsSync(path.dirname(brainPath))) {
  fs.writeFileSync(brainPath, markdown, 'utf8');
  console.log('Saved to brain artifact:', brainPath);
}

console.log('Catalog export complete! Total diagrams cataloged:', C03_DIAGRAM_PROMPTS.length);
