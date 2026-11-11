import fs from 'fs';

const parserCode = fs.readFileSync('src/utils/markdownParser.js', 'utf8');

// Let's create an instrumented version of renderMarkdownToHtml that logs after every step
let snippet = 'via $\\text{Status} \\ \\& \\ 0x7F$, allowing defe';

console.log('0. Start:', snippet);

// Check if any replace touched it:
// Let's check mermaid
// Let's check codeblock
// Let's check image
// Let's check display math
// Let's check inline math \(
// Let's check inline math $
const inlineDollar = /(?<![0-9a-zA-Z\\])\$([^\$\n\r]+?)\$(?![0-9a-zA-Z])/g;
snippet.replace(inlineDollar, (match, eq) => {
  console.log('Inline dollar matched:', JSON.stringify(match));
  console.log('eq is:', JSON.stringify(eq));
});
