import { module3Data } from '../src/services/db/course03/modules/module3.js';

const lesson = module3Data.lessons.find(l => l.id === 'les_c3_m3_l2');
const lines = lesson.content.split('\n');
lines.slice(70, 110).forEach((l, i) => {
  console.log(`${i + 71}: ${l}`);
});
