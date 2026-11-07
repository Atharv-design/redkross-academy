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

function renderVisualFlowchart(code = '') {
  const cleanCode = code.trim();
  const lines = cleanCode.split('\n').map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return '';

  const header = lines[0].toUpperCase();
  const isLR = header.includes('LR');

  const nodes = [];
  const nodeMap = new Map();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('flowchart') || line.startsWith('graph') || line.startsWith('subgraph') || line === 'end') continue;

    const nodeRegex = /([a-zA-Z0-9_]+)(?:\[\"([^\"]+)\"\]|\(\(\"?([^\")]+)\"?\)\))/g;
    let match;
    while ((match = nodeRegex.exec(line)) !== null) {
      const id = match[1];
      const rawText = match[2] || match[3] || id;
      if (!nodeMap.has(id)) {
        const parts = rawText.split(/<br\s*\/?>/i);
        const title = parts[0].trim();
        const subtitle = parts.slice(1).join(' ').trim();
        const nodeObj = { id, title, subtitle };
        nodeMap.set(id, nodeObj);
        nodes.push(nodeObj);
      }
    }
  }

  if (nodes.length === 0) {
    return `<div class="my-6 p-4 rounded-xl bg-[#071018] border border-[#FF7A00]/30 font-mono text-xs text-[#FFA439] whitespace-pre-wrap">${cleanCode}</div>`;
  }

  if (isLR) {
    const stepsHtml = nodes
      .map((n, idx) => {
        const isLast = idx === nodes.length - 1;
        return `<div class="flex items-center flex-shrink-0"><div class="px-3.5 py-2.5 rounded-xl bg-[#090E17] border border-[#FF7A00]/30 shadow-md hover:border-[#FF7A00]/60 transition-all flex flex-col justify-center min-w-[140px] max-w-[210px]"><span class="text-xs font-bold text-white font-lora">${n.title}</span>${n.subtitle ? `<span class="text-[10px] font-mono text-[#A3907C] mt-0.5 leading-tight">${n.subtitle}</span>` : ''}</div>${!isLast ? '<div class="px-2 text-[#FF7A00] font-mono text-sm font-bold flex-shrink-0 select-none">→</div>' : ''}</div>`;
      })
      .join('');

    return `<div class="my-8 w-full p-4 sm:p-5 rounded-2xl bg-[#070B11]/95 border border-[#FF7A00]/30 shadow-2xl overflow-x-auto custom-scrollbar"><div class="text-[10px] font-mono uppercase tracking-widest text-[#FF7A00] mb-3 flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00] animate-pulse"></span><span>Tactical Progression & Incident Path</span></div><div class="flex items-center gap-1 min-w-max py-1">${stepsHtml}</div></div>`;
  }

  const gridHtml = nodes
    .map((n, idx) => {
      const isTopLevel = idx === 0 && nodes.length > 3;
      return `<div class="p-3 sm:p-3.5 rounded-xl ${isTopLevel ? 'col-span-full bg-[#1A1208] border border-[#FF7A00]/60 text-center shadow-[0_0_15px_rgba(255,122,0,0.15)]' : 'bg-[#090E17] border border-[#FF7A00]/25 hover:border-[#FF7A00]/60 transition-all shadow-md'}"><span class="text-xs font-bold ${isTopLevel ? 'text-[#FF7A00]' : 'text-white'} font-lora block">${n.title}</span>${n.subtitle ? `<span class="text-[10px] font-mono text-[#A3907C] mt-1 block leading-tight">${n.subtitle}</span>` : ''}</div>`;
    })
    .join('');

  return `<div class="my-8 w-full p-4 sm:p-5 rounded-2xl bg-[#070B11]/95 border border-[#FF7A00]/30 shadow-2xl"><div class="text-[10px] font-mono uppercase tracking-widest text-[#FFA439] mb-3.5 flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#FFA439]"></span><span>Architectural Hierarchy & Security Matrix</span></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">${gridHtml}</div></div>`;
}

export function renderMarkdownToHtml(markdown = '') {
  if (!markdown || typeof markdown !== 'string') return '';

  let html = markdown;

  html = html.replace(/\r\n/g, '\n');

  // 1. Mermaid Diagram Blocks -> High-Craft Responsive Themed Cards
  html = html.replace(/```mermaid\n([\s\S]*?)```/g, (match, code) => {
    return renderVisualFlowchart(code);
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
      .map((item) => `  <li class="flex items-start gap-2.5 text-[#E2D9CE] leading-relaxed text-xs sm:text-sm"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0"></span><span>${item.replace(/^[-*]\s+/, '')}</span></li>`)
      .join('\n');
    return `<ul class="my-5 space-y-3 pl-1">${items}</ul>`;
  });

  html = html.replace(/(?:^\d+\.\s+.+(?:\n|$))+/gm, (listBlock) => {
    let num = 1;
    const items = listBlock
      .trim()
      .split('\n')
      .map((item) => `  <li class="flex items-start gap-3 text-[#E2D9CE] leading-relaxed text-xs sm:text-sm"><span class="font-mono text-[#FFA439] text-xs font-bold px-2 py-0.5 rounded-md bg-[#1A1208] border border-[#FF7A00]/35 flex-shrink-0 shadow-sm">${String(num++).padStart(2, '0')}</span><span>${item.replace(/^\d+\.\s+/, '')}</span></li>`)
      .join('\n');
    return `<ol class="my-5 space-y-3.5 pl-1">${items}</ol>`;
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
