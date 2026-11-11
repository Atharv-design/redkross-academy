import fs from 'fs';

const c3Files = [
  'src/services/db/course03/modules/module1.js',
  'src/services/db/course03/modules/module2.js',
  'src/services/db/course03/modules/module3.js',
  'src/services/db/course03/modules/module4.js',
  'src/services/db/course03/modules/module5.js',
  'src/services/db/course03/modules/module6.js',
  'src/services/db/course03/modules/module7.js',
  'src/services/db/course03/modules/module8.js'
];

c3Files.forEach((f, idx) => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n=================== MODULE ${idx+1} ===================`);
  
  // 1. Definition patterns
  const termColonCount = (content.match(/[-*]\s+\*\*[^*]+:\*\*\s+/g) || []).length;
  const emDashCount = (content.match(/[-*]\s+\*\*[^*]+\*\*\s*—\s+/g) || []).length;
  const headingDefCount = (content.match(/^###\s+[A-Za-z0-9_-]+:\s+/gm) || []).length;
  
  // 2. Bold / highlighting counts
  const boldCount = (content.match(/\*\*[^*]+\*\*/g) || []).length;
  const inlineCodeCount = (content.match(/`[^`\n]+`/g) || []).length;
  const markCount = (content.match(/<mark|==/g) || []).length;

  // 3. Headings breakdown
  const h1 = (content.match(/^#\s+/gm) || []).length;
  const h2 = (content.match(/^##\s+/gm) || []).length;
  const h3 = (content.match(/^###\s+/gm) || []).length;
  const h4 = (content.match(/^####\s+/gm) || []).length;
  const h5 = (content.match(/^#####\s+/gm) || []).length;

  // 4. Consecutive blank lines
  const tripleBlank = (content.match(/\n\s*\n\s*\n/g) || []).length;

  console.log(`Definitions: "- **Term:**" = ${termColonCount}, "- **Term** —" = ${emDashCount}, "### Term:" = ${headingDefCount}`);
  console.log(`Typography: Bold tokens = ${boldCount}, Inline code tokens = ${inlineCodeCount}, Mark/Highlight tags = ${markCount}`);
  console.log(`Headings: H1=${h1}, H2=${h2}, H3=${h3}, H4=${h4}, H5=${h5}`);
  console.log(`Spacing: Triple blank lines = ${tripleBlank}`);
});
