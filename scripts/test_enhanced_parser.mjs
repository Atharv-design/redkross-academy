import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';
import { module3Data } from '../src/services/db/course02/modules/module3.js';
import { module2Data } from '../src/services/db/course02/modules/module2.js';
import { module1Data } from '../src/services/db/course02/modules/module1.js';

console.log('--- TESTING MODULE 3 LESSON 1 ---');
const l3_1 = module3Data.lessons.find(x => x.id === 'les_c2_m3_l1');
const html3_1 = renderMarkdownToHtml(l3_1.content);
console.log('html3_1 contains extResult?', html3_1.includes('extResult'));
console.log('html3_1 contains raw quad?', html3_1.includes('quad '));
console.log('html3_1 contains Result:?', html3_1.includes('Result:'));
console.log('html3_1 contains katex?', html3_1.includes('class="katex"'));

console.log('\n--- TESTING MODULE 2 LESSON 3 ---');
const l2_3 = module2Data.lessons.find(x => x.id === 'les_c2_m2_l3');
const html2_3 = renderMarkdownToHtml(l2_3.content);
console.log('html2_3 contains <table?', html2_3.includes('<table'));
console.log('html2_3 contains RFC 1122 table?', html2_3.includes('RFC 1122 TCP/IP 4-Layer Suite'));
console.log('html2_3 contains SOURCE CODE?', html2_3.includes('SOURCE CODE'));

console.log('\n--- TESTING MODULE 2 LESSON 4 ---');
const l2_4 = module2Data.lessons.find(x => x.id === 'les_c2_m2_l4');
const html2_4 = renderMarkdownToHtml(l2_4.content);
console.log('html2_4 contains Protocol Data Unit?', html2_4.includes('Protocol Data Unit (PDU) Hierarchy'));
console.log('html2_4 contains Hop-by-Hop?', html2_4.includes('Hop-by-Hop Header Mutation Matrix'));

console.log('\n--- TESTING MODULE 1 LESSON 5 ---');
const l1_5 = module1Data.lessons.find(x => x.id === 'les_c2_m1_l5');
const html1_5 = renderMarkdownToHtml(l1_5.content);
console.log('html1_5 leaked attributes?', html1_5.includes('class="w-full h-auto block rounded-t-2xl') && html1_5.includes('">n1'));
console.log('html1_5 figcaption contains katex?', html1_5.includes('class="katex"'));
