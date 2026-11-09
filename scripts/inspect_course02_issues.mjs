import fs from 'fs';

for (let i = 1; i <= 8; i++) {
  const file = `src/services/db/course02/modules/module${i}.js`;
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');

  console.log(`\n================ MODULE ${i} ================`);
  // Check box drawing characters
  const boxMatches = [...content.matchAll(/([^\n]*[┌│├┼└][^\n]*\n(?:[^\n]*[┌│├┼└─┬┴┤┘][^\n]*\n?)+)/g)];
  if (boxMatches.length > 0) {
    console.log(`  Found ${boxMatches.length} box-drawing blocks:`);
    boxMatches.forEach((m, idx) => {
      console.log(`    Box ${idx + 1} (len ${m[0].length}):\n${m[0].split('\n').slice(0, 5).join('\n')}\n    ...`);
    });
  }

  // Check LaTeX escapes (\text, \quad, \times, \mathbf, \frac, etc.)
  // When parsed in JS string, if single backslash was used:
  // \text -> \x09ext, \times -> \x09imes, \mathbf -> \x08mathbf, \begin -> \x08egin, \frac -> \x0crac
  const tabExt = (content.match(/\text/g) || []).length;
  const tabImes = (content.match(/\times/g) || []).length;
  const backExt = (content.match(/\\text/g) || []).length;
  const rawQuad = (content.match(/([^\\]|^)quad\b/g) || []).length;
  const extResult = (content.match(/extResult/g) || []).length;
  console.log(`  LaTeX stats: \\text=${backExt}, unescaped quad=${rawQuad}, extResult=${extResult}`);

  // Check markdown image tags
  const imgMatches = [...content.matchAll(/!\[(.*?)\]\((.*?)\)/g)];
  const imgWithMath = imgMatches.filter(m => m[1].includes('$') || m[1].includes('\\(') || m[1].includes('"') || m[1].includes('<'));
  if (imgWithMath.length > 0) {
    console.log(`  Found ${imgWithMath.length} images with math or quotes in alt/caption:`);
    imgWithMath.forEach(m => console.log(`    ${m[0].slice(0, 100)}`));
  }
}
