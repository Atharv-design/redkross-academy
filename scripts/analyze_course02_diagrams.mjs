import fs from 'fs';
import path from 'path';

async function main() {
  console.log('=== DEEP ANALYSIS OF COURSE 02 LESSON CONTENTS & ASCII DIAGRAMS ===');

  const modules = [];
  for (let m = 1; m <= 8; m++) {
    const modPath = `../src/services/db/course02/modules/module${m}.js`;
    const mod = await import(modPath);
    const data = mod[`module${m}Data`];
    modules.push(data);
  }

  const sourceText = fs.readFileSync('RK course notes/RedKross Academy Complete Cybersecurity Course Library/COURSE_02_Computer_Networking_for_Cybersecurity.txt', 'utf8');
  console.log(`Source authority file size: ${sourceText.length} characters`);

  const report = [];

  modules.forEach((mod, modIdx) => {
    const modNum = modIdx + 1;

    (mod.lessons || []).forEach((les, lesIdx) => {
      const lesNum = `${modNum}.${lesIdx + 1}`;
      const content = les.content || '';
      
      const codeBlocks = [];
      const codeRegex = /```([a-zA-Z0-9_\-]*)\n([\s\S]*?)```/g;
      let match;
      while ((match = codeRegex.exec(content)) !== null) {
        codeBlocks.push({
          lang: match[1] || 'text',
          body: match[2]
        });
      }

      const asciiBlocks = [];
      codeBlocks.forEach(cb => {
        const text = cb.body;
        const isMermaid = cb.lang === 'mermaid' || /flowchart|sequenceDiagram|graph TD|graph LR/.test(text);
        const hasBoxes = /\+[-=]{3,}\+|\|.*\|/.test(text);
        const hasArrows = /-->|==>|<-+|-\|->|--->/.test(text);
        const hasCli = /\$ |# |C:\\>|Router#|Switch#|ip link|tcpdump|tshark|wireshark|traceroute|ping|netstat/.test(text);

        if (hasBoxes || hasArrows || isMermaid || hasCli) {
          asciiBlocks.push({
            lang: cb.lang,
            isMermaid,
            hasBoxes,
            hasArrows,
            hasCli,
            snippet: text.split('\n').slice(0, 8).join('\n')
          });
        }
      });

      const existingImages = [];
      const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      let imgMatch;
      while ((imgMatch = imgRegex.exec(content)) !== null) {
        existingImages.push({
          alt: imgMatch[1],
          src: imgMatch[2]
        });
      }

      report.push({
        moduleNumber: modNum,
        moduleTitle: mod.title,
        lessonNumber: lesNum,
        lessonId: les.id,
        lessonTitle: les.title,
        contentLength: content.length,
        existingImages,
        asciiBlocks
      });
    });
  });

  fs.writeFileSync('scripts/course02_detailed_diagram_analysis.json', JSON.stringify(report, null, 2), 'utf8');

  console.log('\n--- DETAILED SUMMARY ---');
  let totalAscii = 0;
  let totalImages = 0;
  report.forEach(r => {
    totalAscii += r.asciiBlocks.length;
    totalImages += r.existingImages.length;
    console.log(`[Mod ${r.moduleNumber}] Lesson ${r.lessonNumber} "${r.lessonTitle}": ${r.asciiBlocks.length} ASCII/Mermaid/CLI blocks | ${r.existingImages.length} images`);
  });

  console.log(`\nTotal lessons: ${report.length}`);
  console.log(`Total existing images: ${totalImages}`);
  console.log(`Total ASCII/Mermaid/CLI candidates: ${totalAscii}`);
}

main().catch(console.error);
