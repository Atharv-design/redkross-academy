import fs from 'fs';
import { module1Data } from '../src/services/db/course03/modules/module1.js';
import { module2Data } from '../src/services/db/course03/modules/module2.js';
import { module3Data } from '../src/services/db/course03/modules/module3.js';
import { module4Data } from '../src/services/db/course03/modules/module4.js';
import { module5Data } from '../src/services/db/course03/modules/module5.js';
import { module6Data } from '../src/services/db/course03/modules/module6.js';
import { module7Data } from '../src/services/db/course03/modules/module7.js';
import { module8Data } from '../src/services/db/course03/modules/module8.js';

const modules = [
  module1Data, module2Data, module3Data, module4Data,
  module5Data, module6Data, module7Data, module8Data
];

const allParagraphs = [];
for (let m = 0; m < modules.length; m++) {
  const mod = modules[m];
  for (const les of mod.lessons) {
    const paras = les.content
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(p => p.length > 50 && !p.startsWith('```') && !p.startsWith('|') && !p.startsWith('#') && !p.startsWith('!['));

    for (const p of paras) {
      allParagraphs.push({
        modIdx: m + 1,
        lesId: les.id,
        lesTitle: les.title,
        text: p
      });
    }
  }
}

const map = new Map();
for (const p of allParagraphs) {
  const norm = p.text.replace(/\s+/g, ' ').trim();
  if (!map.has(norm)) map.set(norm, []);
  map.get(norm).push(p);
}

let c = 0;
for (const [norm, occs] of map.entries()) {
  if (occs.length > 1) {
    c++;
    const mods = [...new Set(occs.map(o => `M${o.modIdx}`))].join(', ');
    console.log(`Cluster #${c}: (${occs.length} occurrences in ${mods})`);
    console.log(`  Snippet: "${norm.substring(0, 110)}..."`);
    console.log(`  First: ${occs[0].lesId} | Last: ${occs[occs.length - 1].lesId}\n`);
  }
}
