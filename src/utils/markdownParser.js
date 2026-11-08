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

function cleanMathNotation(eq = '') {
  let res = eq.trim();
  res = res.replace(/\\text\{([^}]+)\}/g, '$1');
  res = res.replace(/\\text\b/g, '');
  res = res.replace(/\\implies/g, '⟹');
  res = res.replace(/\\parallel/g, '∥');
  res = res.replace(/\\times/g, '×');
  res = res.replace(/\\pmod\{([^}]+)\}/g, '(mod $1)');
  res = res.replace(/\\pmod\s+([0-9a-zA-Z^]+)/g, '(mod $1)');
  res = res.replace(/\\left\\lfloor/g, '⌊');
  res = res.replace(/\\right\\rfloor/g, '⌋');
  res = res.replace(/\\lfloor/g, '⌊');
  res = res.replace(/\\rfloor/g, '⌋');
  res = res.replace(/\\left\(/g, '(');
  res = res.replace(/\\right\)/g, ')');
  res = res.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)');
  res = res.replace(/\\neq/g, '≠');
  res = res.replace(/\\ge/g, '≥');
  res = res.replace(/\\le/g, '≤');
  res = res.replace(/\\quad/g, '  ');
  res = res.replace(/\\\{/g, '{');
  res = res.replace(/\\\}/g, '}');
  res = res.replace(/\\log_2/g, 'log₂');
  res = res.replace(/\\/g, '');
  return res.trim();
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

  // 2b. Display Mathematical Formulas ($$...$$) -> Academic Obsidian Formula Cards
  html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, eq) => {
    const cleanFormula = cleanMathNotation(eq);
    return `<div class="my-5 p-4 rounded-xl bg-[#071018] border border-[#FF7A00]/30 shadow-md">
      <div class="text-[10px] font-mono uppercase tracking-widest text-[#FFA439] mb-2 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-[#65F58A]"></span>
          <span>Mathematical Formulation & Formal Proof</span>
        </div>
        <span class="text-[10px] font-mono text-[#A3907C]">RFC FORMAL SPEC</span>
      </div>
      <div class="font-mono text-xs sm:text-sm text-[#65F58A] leading-relaxed overflow-x-auto custom-scrollbar py-1">${cleanFormula}</div>
    </div>`;
  });

  // 3. Markdown Images with Trailing Caption Deduplication & Fusion:
  // Fuses ![alt](url) and immediately following *Figure/Diagram...* into ONE unified <figure>
  html = html.replace(/!\[(.*?)\]\((.*?)\)(?:\s*\n+\*([^*]+)\*)?/g, (match, alt, src, trailingCaption) => {
    const cleanSrc = src.trim();
    const resolvedSrc = CHAPTER_1_IMAGES && CHAPTER_1_IMAGES[cleanSrc] ? CHAPTER_1_IMAGES[cleanSrc] : cleanSrc;
    // Prefer trailing detailed caption if present, otherwise alt
    const captionText = (trailingCaption && trailingCaption.trim()) || (alt && alt.trim()) || '';
    return `<figure class="my-8 w-full overflow-hidden rounded-2xl border border-[#FF7A00]/35 shadow-[0_8px_30px_rgba(0,0,0,0.6)] bg-black/40">
      <img
        src="${resolvedSrc}"
        alt="${captionText || 'Technical Diagram'}"
        class="w-full h-auto block rounded-t-2xl cursor-pointer hover:scale-[1.003] transition-transform duration-300"
        loading="lazy"
        decoding="async"
      />
      ${captionText ? `<figcaption class="py-2.5 px-4 text-center text-xs font-mono text-[#A3907C] border-t border-[#FF7A00]/20 bg-[#0B0907] flex items-center justify-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00]/80"></span><span>${captionText}</span></figcaption>` : ''}
    </figure>`;
  });

  // 3a. Malformed Image Syntax Fallback: handles !!(url), !(url), or ![raw-path] gracefully
  html = html.replace(/(?:!\[\]\(|!!\(|!\()([^)]+\.(?:jpg|jpeg|png|webp|svg|gif))\)/gi, (match, src) => {
    const cleanSrc = src.trim();
    const resolvedSrc = CHAPTER_1_IMAGES && CHAPTER_1_IMAGES[cleanSrc] ? CHAPTER_1_IMAGES[cleanSrc] : cleanSrc;
    return `<figure class="my-8 w-full overflow-hidden rounded-2xl border border-[#FF7A00]/35 shadow-[0_8px_30px_rgba(0,0,0,0.6)] bg-black/40">
      <img
        src="${resolvedSrc}"
        alt="Technical Reference Diagram"
        class="w-full h-auto block rounded-2xl cursor-pointer hover:scale-[1.003] transition-transform duration-300"
        loading="lazy"
        decoding="async"
      />
    </figure>`;
  });

  // 3b. Standard Markdown Links: [text](url) -> Secure styled anchor
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => {
    const cleanHref = href.trim();
    return `<a href="${cleanHref}" target="_blank" rel="noopener noreferrer" class="text-[#FFA439] underline decoration-[#FF7A00]/40 hover:decoration-[#FF7A00] transition-colors">${text}</a>`;
  });

  // 4. Horizontal Rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-t border-[#FF7A00]/25" />');

  // 5. Semantic Multi-Themed Blockquotes / Callout Cards
  html = html.replace(/(?:^>\s*.+(?:\n|$))+/gm, (bqBlock) => {
    const rawContent = bqBlock
      .split('\n')
      .map(line => line.replace(/^>\s?/, ''))
      .join('\n')
      .trim();

    if (!rawContent) return '';

    // Theme 1: Academic Definition
    if (/\*\*(?:Formal )?Definition:?\*\*/i.test(rawContent)) {
      return `<blockquote class="border-l-4 border-[#FF7A00] pl-4 sm:pl-5 py-4 text-[#E2D9CE] bg-[#1A1208]/90 rounded-r-xl text-[16px] sm:text-[17px] leading-[1.75] my-6 font-lora shadow-lg border-y border-r border-[#FF7A00]/20">
        <div class="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#FFA439] tracking-wider uppercase">
          <span class="w-2 h-2 rounded-full bg-[#FF7A00]"></span>
          <span>Core Academic Definition</span>
        </div>
        ${rawContent}
      </blockquote>`;
    }
    // Theme 2: Defensive Warning & Common Trap
    if (/\*\*(?:Warning|Caution|Common Trap|Danger):?\*\*/i.test(rawContent)) {
      return `<blockquote class="border-l-4 border-[#F43F5E] pl-4 sm:pl-5 py-4 text-[#FFE4E6] bg-[#1F0A0E]/90 rounded-r-xl text-[16px] sm:text-[17px] leading-[1.75] my-6 font-lora shadow-lg border-y border-r border-[#F43F5E]/20">
        <div class="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#FB7185] tracking-wider uppercase">
          <span class="w-2 h-2 rounded-full bg-[#F43F5E]"></span>
          <span>Defensive Warning & Trap</span>
        </div>
        ${rawContent}
      </blockquote>`;
    }
    // Theme 3: Historical Case Evidence
    if (/\*\*(?:Case Study|Real-World Incident|Incident Dossier):?\*\*/i.test(rawContent)) {
      return `<blockquote class="border-l-4 border-[#06B6D4] pl-4 sm:pl-5 py-4 text-[#CFFAFE] bg-[#08151E]/90 rounded-r-xl text-[16px] sm:text-[17px] leading-[1.75] my-6 font-lora shadow-lg border-y border-r border-[#06B6D4]/20">
        <div class="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#22D3EE] tracking-wider uppercase">
          <span class="w-2 h-2 rounded-full bg-[#06B6D4]"></span>
          <span>Historical Case Evidence</span>
        </div>
        ${rawContent}
      </blockquote>`;
    }
    // Theme 4: Key Takeaway / Protector's Rule
    if (/\*\*(?:Key Takeaway|Protector's Rule|Core Principle|Foundational Axiom):?\*\*/i.test(rawContent)) {
      return `<blockquote class="border-l-4 border-[#10B981] pl-4 sm:pl-5 py-4 text-[#D1FAE5] bg-[#071811]/90 rounded-r-xl text-[16px] sm:text-[17px] leading-[1.75] my-6 font-lora shadow-lg border-y border-r border-[#10B981]/20">
        <div class="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#34D399] tracking-wider uppercase">
          <span class="w-2 h-2 rounded-full bg-[#10B981]"></span>
          <span>Protector's Key Takeaway</span>
        </div>
        ${rawContent}
      </blockquote>`;
    }

    // Default Amber Blockquote
    return `<blockquote class="border-l-4 border-[#FF7A00] pl-4 sm:pl-5 py-3.5 text-[#E2D9CE] bg-[#1A1208]/90 rounded-r-xl text-[16px] sm:text-[17px] leading-[1.75] my-6 font-lora shadow-md border-y border-r border-[#FF7A00]/15">${rawContent}</blockquote>`;
  });

  // 5b. Smart Content Normalizers: Auto-promote unformatted Goals, Groups, and Scenarios (W3C WAI Hierarchy)
  // Promotes unformatted AAA headings: "- **The First A:** Authentication - Who Are You?" -> "### Pillar 1: Authentication — Identity Verification"
  html = html.replace(/^(?:[-*]\s+)?\*\*The\s+(First|Second|Third|Fourth)\s+A:?\*\*\s*:?\s*(.+)$/gim, (match, order, rest) => {
    const num = order.toLowerCase() === 'first' ? '1' : order.toLowerCase() === 'second' ? '2' : order.toLowerCase() === 'third' ? '3' : '4';
    return `### Pillar ${num}: ${rest.replace(/^[—–-]\s*/, '')}`;
  });
  html = html.replace(/^(The\s+(?:First|Second|Third|Fourth)\s+A:\s*.+)$/gim, '### $1');

  // Promotes: "Layer 1: Perimeter Defence" -> "### Layer 1: Perimeter Defence"
  html = html.replace(/^(Layer\s+\d+:\s*.+)$/gim, '### $1');

  // Promotes: "The Two Legitimate Exceptions" -> "### The Two Legitimate Architectural Exceptions"
  html = html.replace(/^The Two Legitimate Exceptions:?\s*$/gim, '### The Two Legitimate Architectural Exceptions');

  // Promotes: "How to Implement Least Privilege" or "How to Implement [Framework]" -> "### How to Implement $1"
  html = html.replace(/^(How to Implement\s+[^:\n]+):?\s*$/gim, '### $1');

  // Promotes: "Goal 1: Confidentiality — Keep It Secret" -> "### Goal 1: Confidentiality — Keep It Secret"
  html = html.replace(/^(?:(?:Goal|Pillar|Principle)\s+(\d+):\s*(.+))$/gim, '### Goal $1: $2');
  html = html.replace(/^(?:(?:Group|Category|Domain)\s+(\d+):\s*(.+))$/gim, '### Group $1: $2');
  html = html.replace(/^(?:(?:Type)\s+(\d+):\s*(.+))$/gim, '### Type $1: $2');

  // Promotes: "Real examples:", "What availability protects:", "What happens when X fails:" -> "#### Real Examples"
  html = html.replace(/^(Real examples|Real-world examples|Real-World Operational Examples):?\s*$/gim, '#### Real-World Operational Examples:');
  html = html.replace(/^(What\s+[a-zA-Z0-9\s-]+\s+protects):?\s*$/gim, '#### $1:');
  html = html.replace(/^(What happens when\s+[a-zA-Z0-9\s-]+\s+fails):?\s*$/gim, '#### $1:');
  html = html.replace(/^(Case\s+Example\s+\d+:|Example\s+\d+:)\s*(.+)$/gim, '#### $1 $2');
  html = html.replace(/^What it includes:?\s*$/gim, '#### Defensive Controls (What It Includes):');
  html = html.replace(/^What (?:the [^:\n]+|detection) does not do:?\s*$/gim, '#### Architectural Blind Spots:');
  html = html.replace(/^How (authentication|authorization|accounting) works\.?:?\s*$/gim, (match, term) => {
    const capitalized = term.charAt(0).toUpperCase() + term.slice(1);
    return `#### How ${capitalized} Works:`;
  });
  html = html.replace(/^The three types of evidence\.?:?\s*$/gim, '#### The Three Types of Evidence:');
  html = html.replace(/^The models of authorization\.?:?\s*$/gim, '#### The Four Models of Authorization:');
  html = html.replace(/^The rules? for both\.?:?\s*$/gim, '#### Mandatory Governance Rules for Exceptions:');

  // Auto-split run-on headings where the explanatory body was attached to the heading line:
  // e.g. "### Step 1: Inventory the access. You cannot reduce..." -> "### Step 1: Inventory the access\n\nYou cannot reduce..."
  html = html.replace(/^###\s+((?:Step|Pillar|Goal|Group|Layer|Principle|Type)\s+\d+:\s*[^.\n]{3,65})\.\s+([A-Z].+)$/gm, '### $1\n\n$2');

  // Promotes standalone "Term — definition" lines into structured list items: "- **Term:** definition"
  html = html.replace(/^([A-Z][a-zA-Z0-9\s/()_-]{1,35})\s*[—–]\s*([a-z].+)$/gm, (match, term, def) => {
    return `- **${term.trim()}:** ${def.trim()}`;
  });

  // 6. Headings - Calibrated Academic Lora Hierarchy (Standard: H2 23-25px, H3 19-21px, H4 16-17px)
  html = html.replace(/^##### (.*)$/gim, '<h5 class="text-xs sm:text-sm font-mono font-bold text-[#65F58A] mt-3.5 mb-1.5 uppercase tracking-widest flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#65F58A]"></span><span>$1</span></h5>');
  html = html.replace(/^#### (.*)$/gim, (match, title) => {
    return `<h4 class="font-lora font-medium text-[16px] sm:text-[17px] text-[#FFA439] mt-[15px] mb-[6px] tracking-wide flex items-center gap-2">
      <span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00] flex-shrink-0"></span>
      <span>${title.trim()}</span>
    </h4>`;
  });
  html = html.replace(/^### (.*)$/gim, (match, title) => {
    const cleanTitle = title.trim();
    const badgeMatch = cleanTitle.match(/^(Goal \d+|Group \d+|Pillar \d+|Principle \d+|Step \d+|Layer \d+|Type \d+):\s*(.*)$/i);
    if (badgeMatch) {
      const badge = badgeMatch[1].toUpperCase();
      let rest = badgeMatch[2];
      let trailingBody = '';
      const dotIndex = rest.indexOf('. ');
      if (dotIndex !== -1 && dotIndex < 60) {
        trailingBody = rest.slice(dotIndex + 2);
        rest = rest.slice(0, dotIndex);
      }
      const headingHtml = `<h3 class="font-lora font-semibold text-[19px] sm:text-[21px] text-white mt-[20px] mb-[7px] flex items-center flex-wrap gap-2 border-l-4 border-[#FF7A00] pl-3 py-0.5 bg-[#120E09]/60 rounded-r-lg">
        <span class="px-1.5 py-0.5 rounded bg-[#FF7A00]/20 border border-[#FF7A00]/40 text-[#FFA439] text-xs font-mono font-bold tracking-wider">${badge}</span>
        <span>${rest}</span>
      </h3>`;
      return trailingBody ? `${headingHtml}\n\n${trailingBody}` : headingHtml;
    }
    return `<h3 class="font-lora font-semibold text-[19px] sm:text-[21px] text-white mt-[20px] mb-[7px] flex items-center gap-2 border-l-4 border-[#FF7A00] pl-3 py-0.5">
      <span>${cleanTitle}</span>
    </h3>`;
  });
  html = html.replace(/^## (.*)$/gim, (match, title) => {
    return `<h2 class="font-lora font-bold text-[23px] sm:text-[25px] text-[#FFA439] mt-[26px] mb-[9px] text-center flex items-center justify-center gap-2.5 border-b border-[#FF7A00]/30 pb-2.5 tracking-tight shadow-sm">
      <span class="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse flex-shrink-0"></span>
      <span>${title.trim()}</span>
    </h2>`;
  });
  html = html.replace(/^# (.*)$/gim, '<h1 class="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-5 font-lora tracking-tight text-center pb-2.5 border-b border-[#FF7A00]/40">$1</h1>');

  // 7. Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-slate-200">$1</em>');

  // 8. Inline Code
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[#161009] border border-[#FF7A00]/30 text-[#FFA439] font-mono text-[11px]">$1</code>');

  // 8b. Inline Mathematical Notation ($variable$)
  html = html.replace(/\$([a-zA-Z0-9_\\{}()+\-*/=^, \t≠≥≤⟹∥×]+?)\$/g, (match, inner) => {
    const cleanVar = cleanMathNotation(inner);
    return `<code class="px-1.5 py-0.5 rounded bg-[#121A15] border border-[#65F58A]/30 text-[#65F58A] font-mono text-xs font-semibold">${cleanVar}</code>`;
  });

  // 9. Markdown Tables with Optional Academic Banners (Uni.lu & W3C WAI standard)
  html = html.replace(/(?:(?:\n|^)(?:[*_#]{0,3})(Table\s+\d+:?[^\n*#]+)(?:[*_#]{0,3})\s*\n+)?((?:^\|.+\|(?:\n|$))+)/gm, (match, tableCaption, tableBlock) => {
    const lines = tableBlock.trim().split('\n');
    if (lines.length < 2) return match;

    const headerLine = lines[0];
    const isSeparator = lines[1].includes('---');
    const dataLines = isSeparator ? lines.slice(2) : lines.slice(1);

    const parseRow = (line) => line.split('|').slice(1, -1).map(c => c.trim());

    const headers = parseRow(headerLine);
    const thead = `<thead><tr class="bg-[#1A1208] border-b border-[#FF7A00]/30">${headers.map(h => `<th class="px-4 py-2.5 text-left text-xs font-mono font-bold text-[#FFA439] uppercase tracking-wider font-lora">${h}</th>`).join('')}</tr></thead>`;

    const tbody = `<tbody>${dataLines.map((line, rIdx) => {
      const cells = parseRow(line);
      const bg = rIdx % 2 === 0 ? 'bg-[#0B0907]/80' : 'bg-[#120E09]/80';
      return `<tr class="${bg} border-b border-[#FF7A00]/15 hover:bg-[#1A1208]/90 transition-colors">${cells.map(c => `<td class="px-4 py-2.5 text-xs text-[#E2D9CE] font-lora leading-relaxed">${c}</td>`).join('')}</tr>`;
    }).join('')}</tbody>`;

    const banner = tableCaption ? `<div class="px-4 py-2 bg-[#140E08] border-b border-[#FF7A00]/30 flex items-center justify-between text-xs font-mono font-bold text-[#FFA439] uppercase tracking-wider">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[#FF7A00]"></span>
        <span>${tableCaption.trim()}</span>
      </div>
      <span class="text-[#65F58A] text-[10px] px-2 py-0.5 rounded bg-[#071018] border border-[#65F58A]/30">ACADEMIC REFERENCE</span>
    </div>` : '';

    return `<div class="my-5 overflow-x-auto rounded-xl border border-[#FF7A00]/30 shadow-lg">${banner}<table class="w-full text-left border-collapse">${thead}${tbody}</table></div>`;
  });

  // 10. Lists (Unordered & Ordered) + Semantic Description Lists for Glossaries (W3C WAI)
  html = html.replace(/(?:^[-*]\s+.+(?:\n|$))+/gm, (listBlock) => {
    const rawItems = listBlock.trim().split('\n');

    // Check if this list is a term-definition list (Glossaries, Lexicons, Definitional Banks)
    const defItemCount = rawItems.filter(item => {
      const clean = item.replace(/^[-*]\s+/, '').trim();
      return /^<strong class="font-bold text-white">[^<]+:?<\/strong>:?\s+/.test(clean);
    }).length;

    const isTermDefList = defItemCount >= 2 && defItemCount >= Math.floor(rawItems.length * 0.5);

    if (isTermDefList) {
      const dlItems = rawItems.map(item => {
        const clean = item.replace(/^[-*]\s+/, '').trim();
        const match = clean.match(/^<strong class="font-bold text-white">([^<]+?):?<\/strong>:?\s*(.*)$/s);
        if (match) {
          const term = match[1].trim();
          const def = match[2].trim();
          return `<div class="p-3 sm:p-3.5 rounded-lg bg-[#0D0A07] border border-[#FF7A00]/25 shadow-sm transition-all hover:border-[#FF7A00]/50 hover:bg-[#120E09]/90">
            <dt class="font-bold text-[#FFA439] font-lora text-[16px] sm:text-[17px] flex items-center gap-2 mb-1">
              <span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00] flex-shrink-0"></span>
              <span>${term}</span>
            </dt>
            <dd class="text-[#E2D9CE] font-lora text-[15px] sm:text-[16px] leading-[1.6] pl-3 border-l-2 border-[#FF7A00]/30">${def}</dd>
          </div>`;
        }
        return `<div class="p-2.5 text-[#E2D9CE] font-lora leading-relaxed">${clean}</div>`;
      }).join('\n');

      return `<dl class="my-4 space-y-2.5">${dlItems}</dl>`;
    }

    const items = rawItems
      .map((item) => `  <li class="flex items-start gap-2.5 text-[#E2D9CE] leading-[1.6] text-[17px] font-lora"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0 shadow-[0_0_5px_rgba(255,122,0,0.5)]"></span><span>${item.replace(/^[-*]\s+/, '')}</span></li>`)
      .join('\n');
    return `<ul class="my-3 sm:my-3.5 space-y-[5px] pl-1 sm:pl-2">${items}</ul>`;
  });

  html = html.replace(/(?:^\d+\.\s+.+(?:\n|$))+/gm, (listBlock) => {
    let num = 1;
    const items = listBlock
      .trim()
      .split('\n')
      .map((item) => {
        const match = item.match(/^(\d+)\.\s+(.*)/s);
        const itemNum = match ? match[1].padStart(2, '0') : String(num++).padStart(2, '0');
        const itemText = match ? match[2] : item.replace(/^\d+\.\s+/, '');
        return `  <li class="flex items-start gap-2.5 text-[#E2D9CE] leading-[1.6] text-[17px] font-lora"><span class="font-mono text-[#FFA439] text-xs font-bold px-1.5 py-0.5 rounded bg-[#1A1208] border border-[#FF7A00]/35 flex-shrink-0 shadow-sm">${itemNum}</span><span>${itemText}</span></li>`;
      })
      .join('\n');
    return `<ol class="my-3 sm:my-3.5 space-y-[5px] pl-1 sm:pl-2">${items}</ol>`;
  });

  // Merge adjacent lists that had blank lines between items
  html = html.replace(/<\/ul>\s*<ul class="my-3 sm:my-3\.5 space-y-\[5px\] pl-1 sm:pl-2">/g, '');
  html = html.replace(/<\/ol>\s*<ol class="my-3 sm:my-3\.5 space-y-\[5px\] pl-1 sm:pl-2">/g, '');
  html = html.replace(/<\/dl>\s*<dl class="my-4 space-y-2\.5">/g, '');

  // 11. Paragraph wrapping with exact 8-10px bottom margin (Lora 17px, line-height 1.6, #E2D9CE)
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
        trimmed.startsWith('<h5') ||
        trimmed.startsWith('<div') ||
        trimmed.startsWith('<figure') ||
        trimmed.startsWith('<pre') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<hr') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<ol') ||
        trimmed.startsWith('<dl')
      ) {
        return trimmed;
      }
      return `<p class="font-lora text-[17px] leading-[1.6] text-[#E2D9CE] mb-2 sm:mb-2.5">${trimmed}</p>`;
    })
    .join('\n\n');

  return html;
}
