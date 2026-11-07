/**
 * High-Craft Markdown Parser for RedKross Academy
 * Transforms raw markdown into semantic, styled HTML matching Obsidian Dark theme.
 * Enhanced to support:
 * - Centered H1 and H2 headers
 * - Native Mermaid diagrams (.mermaid class container)
 * - Full-width responsive images with figcaptions
 * - Markdown tables with cyber grid styling
 * - High-contrast bullet and numbered lists
 */
import { CHAPTER_1_IMAGES } from '../services/db/chapter1Images.js';

export function renderMarkdownToHtml(markdown = '') {
  if (!markdown || typeof markdown !== 'string') return '';

  let html = markdown;

  html = html.replace(/\r\n/g, '\n');

  // 1. Mermaid Diagram Blocks
  html = html.replace(/```mermaid\n([\s\S]*?)```/g, (match, code) => {
    return `<div class="mermaid-diagram my-8 flex flex-col items-center justify-center p-5 rounded-2xl bg-[#071018]/90 border border-[#263440] shadow-[0_0_25px_rgba(101,245,138,0.08)] overflow-x-auto text-center">
      <div class="mermaid text-center w-full flex justify-center">${code.trim()}</div>
    </div>`;
  });

  // 2. Regular Code Blocks
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const languageClass = lang ? `language-${lang}` : '';
    const cleanCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<div class="my-5 rounded-xl overflow-hidden border border-[#263440] bg-[#071018] shadow-lg">
      <div class="px-4 py-2 bg-[#101923] border-b border-[#263440] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
        <span>${lang ? lang.toUpperCase() : 'CODE / TERMINAL'}</span>
        <span class="text-[#65F58A]">REDKROSS CLI</span>
      </div>
      <pre class="p-4 overflow-x-auto font-mono text-xs text-[#65F58A] leading-relaxed"><code class="${languageClass}">${cleanCode}</code></pre>
    </div>`;
  });

  // 3. Markdown Images: ![caption](url) -> Embedded Static & Offline-Resilient Asset
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, src) => {
    const cleanSrc = src.trim();
    const resolvedSrc = CHAPTER_1_IMAGES && CHAPTER_1_IMAGES[cleanSrc] ? CHAPTER_1_IMAGES[cleanSrc] : cleanSrc;
    return `<div class="my-8 w-full overflow-hidden rounded-2xl border border-[#FF7A00]/35 shadow-[0_8px_30px_rgba(0,0,0,0.6)] bg-black/40">
      <img
        src="${resolvedSrc}"
        alt="${alt}"
        class="w-full h-auto block rounded-2xl cursor-pointer hover:scale-[1.003] transition-transform duration-300"
        loading="lazy"
        decoding="async"
      />
      ${alt ? `<div class="py-2.5 px-4 text-center text-xs font-mono text-[#A3907C] border-t border-[#FF7A00]/20 bg-[#0B0907] flex items-center justify-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00]/80"></span><span>${alt}</span></div>` : ''}
    </div>`;
  });

  // 4. Horizontal Rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-t border-[#FF7A00]/25" />');

  // 5. Blockquotes / Callout Cards
  html = html.replace(/^> (.*)$/gim, '<blockquote class="border-l-4 border-[#FF7A00] pl-4 py-3 text-[#E2D9CE] bg-[#1A1208]/90 rounded-r-xl text-xs sm:text-sm my-4 font-lora shadow-sm">$1</blockquote>');

  // 6. Headings - Centered H1 and H2
  html = html.replace(/^#### (.*)$/gim, '<h4 class="text-xs sm:text-sm font-bold text-[#FFA439] mt-5 mb-2 font-mono uppercase tracking-wider">$1</h4>');
  html = html.replace(/^### (.*)$/gim, '<h3 class="text-sm sm:text-base font-bold text-white mt-6 mb-2.5 font-lora">$1</h3>');
  html = html.replace(/^## (.*)$/gim, '<h2 class="text-base sm:text-xl font-bold text-[#FFA439] mt-8 mb-4 font-lora text-center flex items-center justify-center gap-2 border-b border-[#FF7A00]/30 pb-2">$1</h2>');
  html = html.replace(/^# (.*)$/gim, '<h1 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mt-2 mb-4 font-lora tracking-tight text-center pb-2 border-b border-[#FF7A00]/40">$1</h1>');

  // 7. Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-slate-200">$1</em>');

  // 8. Inline Code
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[#161009] border border-[#FF7A00]/30 text-[#FFA439] font-mono text-[11px]">$1</code>');

  // 9. Markdown Tables
  html = html.replace(/(?:^\|.+\|(?:\n|$))+/gm, (tableBlock) => {
    const lines = tableBlock.trim().split('\n');
    if (lines.length < 2) return tableBlock;

    const headerLine = lines[0];
    const isSeparator = lines[1].includes('---');
    const dataLines = isSeparator ? lines.slice(2) : lines.slice(1);

    const parseRow = (line) => line.split('|').slice(1, -1).map(c => c.trim());

    const headers = parseRow(headerLine);
    const thead = `<thead><tr class="bg-[#1A1208] border-b border-[#FF7A00]/30">${headers.map(h => `<th class="px-4 py-3 text-left text-xs font-mono font-bold text-[#FFA439] uppercase tracking-wider">${h}</th>`).join('')}</tr></thead>`;

    const tbody = `<tbody>${dataLines.map((line, rIdx) => {
      const cells = parseRow(line);
      const bg = rIdx % 2 === 0 ? 'bg-[#0B0907]/80' : 'bg-[#120E09]/80';
      return `<tr class="${bg} border-b border-[#FF7A00]/15 hover:bg-[#1A1208]/90 transition-colors">${cells.map(c => `<td class="px-4 py-3 text-xs text-[#E2D9CE] font-lora">${c}</td>`).join('')}</tr>`;
    }).join('')}</tbody>`;

    return `<div class="my-6 overflow-x-auto rounded-xl border border-[#FF7A00]/30 shadow-lg"><table class="w-full text-left border-collapse">${thead}${tbody}</table></div>`;
  });

  // 10. Lists (Unordered & Ordered)
  html = html.replace(/(?:^[-*]\s+.+(?:\n|$))+/gm, (listBlock) => {
    const items = listBlock
      .trim()
      .split('\n')
      .map((item) => `  <li class="flex items-start gap-2 text-[#E2D9CE] leading-relaxed"><span class="text-[#FF7A00] font-bold mt-0.5">•</span><span>${item.replace(/^[-*]\s+/, '')}</span></li>`)
      .join('\n');
    return `<ul class="my-4 space-y-2 pl-2">${items}</ul>`;
  });

  html = html.replace(/(?:^\d+\.\s+.+(?:\n|$))+/gm, (listBlock) => {
    let num = 1;
    const items = listBlock
      .trim()
      .split('\n')
      .map((item) => `  <li class="flex items-start gap-2.5 text-[#E2D9CE] leading-relaxed"><span class="font-mono text-[#FFA439] text-xs font-bold px-1.5 py-0.5 rounded bg-[#1A1208] border border-[#FF7A00]/30 flex-shrink-0">${num++}.</span><span>${item.replace(/^\d+\.\s+/, '')}</span></li>`)
      .join('\n');
    return `<ol class="my-4 space-y-2 pl-2">${items}</ol>`;
  });

  // 11. Paragraph wrapping
  const blocks = html.split(/\n\s*\n/);
  html = blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (
        trimmed.startsWith('<h1') ||
        trimmed.startsWith('<h2') ||
        trimmed.startsWith('<h3') ||
        trimmed.startsWith('<h4') ||
        trimmed.startsWith('<div') ||
        trimmed.startsWith('<figure') ||
        trimmed.startsWith('<pre') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<hr') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<ol')
      ) {
        return trimmed;
      }
      return `<p class="my-3 leading-relaxed text-slate-300 font-lora text-xs sm:text-sm">${trimmed}</p>`;
    })
    .join('\n\n');

  return html;
}
