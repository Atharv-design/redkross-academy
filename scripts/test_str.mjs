import katex from 'katex';

const str = '\\text{Status} \\ \\& \\ 0x7F';
console.log('Testing string:', JSON.stringify(str));
try {
  const res = katex.renderToString(str, { displayMode: false, throwOnError: true });
  console.log('SUCCESS! Output length:', res.length);
} catch (e) {
  console.log('ERROR:', e.message);
}
