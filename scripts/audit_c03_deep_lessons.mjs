import { module1Data } from '../src/services/db/course03/modules/module1.js';
import { module2Data } from '../src/services/db/course03/modules/module2.js';
import { module3Data } from '../src/services/db/course03/modules/module3.js';
import { module4Data } from '../src/services/db/course03/modules/module4.js';
import { module5Data } from '../src/services/db/course03/modules/module5.js';
import { module6Data } from '../src/services/db/course03/modules/module6.js';
import { module7Data } from '../src/services/db/course03/modules/module7.js';
import { module8Data } from '../src/services/db/course03/modules/module8.js';

const allModules = [
  module1Data, module2Data, module3Data, module4Data,
  module5Data, module6Data, module7Data, module8Data
];

allModules.forEach((mod, mIdx) => {
  console.log(`\n=================== MODULE ${mIdx+1}: ${mod.title} ===================`);
  mod.lessons.forEach((l, lIdx) => {
    const text = l.content;
    const h1 = (text.match(/^#\s+/gm) || []).length;
    const h2 = (text.match(/^##\s+/gm) || []).length;
    const h3 = (text.match(/^###\s+/gm) || []).length;
    const h4 = (text.match(/^####\s+/gm) || []).length;
    const h5 = (text.match(/^#####\s+/gm) || []).length;

    const termColon = (text.match(/[-*]\s+\*\*[^*]+:\*\*\s+/g) || []).length;
    const plainTermColon = (text.match(/^[A-Z][A-Za-z0-9\s_-]+:\s+[A-Z]/gm) || []).length;
    const emDash = (text.match(/[-*]\s+\*\*[^*]+\*\*\s*—\s+/g) || []).length;
    const marks = (text.match(/<mark|==/g) || []).length;
    const mathSteps = (text.match(/:::math-steps/g) || []).length;
    const dispMath = (text.match(/\$\$[\s\S]*?\$\$/g) || []).length;
    const inlineCodes = (text.match(/`[^`\n]+`/g) || []).length;

    console.log(`Lesson ${mIdx+1}.${lIdx+1} (${l.id}): H1=${h1} H2=${h2} H3=${h3} H4=${h4} H5=${h5} | Defs=${termColon} PlainDefs=${plainTermColon} EmDash=${emDash} | Marks=${marks} MathSteps=${mathSteps} DispMath=${dispMath} InlineCodes=${inlineCodes}`);
  });
});
