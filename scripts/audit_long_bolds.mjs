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

console.log('Auditing bold token lengths and sentence bolding across Course 03...');

let longBolds = [];

allModules.forEach((mod, mIdx) => {
  mod.lessons.forEach((l, lIdx) => {
    const text = l.content;
    const bolds = text.match(/\*\*[^*]+\*\*/g) || [];
    bolds.forEach(b => {
      const clean = b.replace(/\*\*/g, '');
      const words = clean.split(/\s+/).length;
      if (words > 8) {
        longBolds.push({ lesson: `Lesson ${mIdx+1}.${lIdx+1}`, words, text: clean });
      }
    });
  });
});

console.log(`Found ${longBolds.length} long bolded phrases (> 8 words):`);
longBolds.slice(0, 15).forEach(b => console.log(`  [${b.lesson}] (${b.words} words): "${b.text.slice(0, 80)}..."`));
