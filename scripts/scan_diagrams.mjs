import fs from 'fs';
import path from 'path';

const modDir = 'src/services/db/course02/modules';
const files = fs.readdirSync(modDir).filter(f => f.endsWith('.js'));

console.log('--- SCANNING COURSE 02 MODULES FOR ASCII DIAGRAMS, MERMAID & MISSING GRAPHICS ---');
const findings = [];

files.sort().forEach(file => {
  const content = fs.readFileSync(path.join(modDir, file), 'utf8');
  const modNum = file.match(/\d+/)[0];
  
  const lines = content.split('\n');
  let currentLessonId = '';
  let currentLessonTitle = 'Module Overview';
  let inCodeBlock = false;
  let codeBlockType = '';
  let blockContent = [];
  let blockStartLine = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const idMatch = line.match(/id:\s*['"](les_c2_[^'"]+)['"]/);
    if (idMatch) currentLessonId = idMatch[1];

    const titleMatch = line.match(/title:\s*['"]([0-9]+\.[0-9]+[^'"]+)['"]/);
    if (titleMatch) currentLessonTitle = titleMatch[1];

    if (line.includes('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        blockStartLine = i + 1;
        codeBlockType = line.split('```')[1]?.trim() || 'text';
        blockContent = [];
      } else {
        inCodeBlock = false;
        const joined = blockContent.join('\n');
        const hasAsciiArt = /[+\-]{3,}|\|.*\||-->|===>|\[.*\]\s*->|\+---\+/.test(joined);
        const isMermaid = codeBlockType === 'mermaid';
        const isTerminalOrText = codeBlockType === 'text' || codeBlockType === '' || codeBlockType === 'bash' || codeBlockType === 'sh';

        if (isMermaid || hasAsciiArt) {
          findings.push({
            module: modNum,
            lessonId: currentLessonId,
            lessonTitle: currentLessonTitle,
            line: blockStartLine,
            type: codeBlockType,
            preview: blockContent.slice(0, 4).join(' | '),
            fullBlock: joined
          });
        }
      }
    } else if (inCodeBlock) {
      blockContent.push(line);
    }
  }
});

console.log(`Found ${findings.length} ASCII/diagram/terminal structures across Course 02:\n`);
findings.forEach((f, idx) => {
  console.log(`[Item ${idx + 1}] Module ${f.module} -> ${f.lessonTitle}`);
  console.log(`   Type: ${f.type} (Line ~${f.line})`);
  console.log(`   Snippet: ${f.preview.substring(0, 90)}...`);
  console.log('--------------------------------------------------------------');
});

fs.writeFileSync('scripts/diagram_findings.json', JSON.stringify(findings, null, 2), 'utf8');
console.log('Saved detailed findings to scripts/diagram_findings.json');
