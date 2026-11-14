/**
 * High-Craft Academic Markdown Parser for RedKross Academy
 * Transforms raw curriculum notes into semantic, textbook-grade HTML.
 * Features:
 * - Native KaTeX integration for inline ($...$, \(...\)) and display ($$...$$, \[...\]) math formulas (HTML output mode)
 * - Native Mermaid diagram rendering (.mermaid containers) for sequence diagrams, flowcharts, state diagrams
 * - Strict separation between programming code blocks, terminal sessions, and educational diagrams
 * - Automatic conversion of ASCII / Unicode box-drawing tables into responsive academic HTML tables
 * - Multi-line numbered procedures (01., 02., 03.) with coherent aligned explanations
 * - Leakage-proof image parsing with sanitised alt attributes and rich figcaptions
 * - Academic typography: Lora 17px body, line-height 1.6, #E2D9CE text color
 * - Compact heading proximity and responsive overflow management
 */
import katex from 'katex';
import { CHAPTER_1_IMAGES } from '../services/db/chapter1Images.js';

/**
 * Pre-processes LaTeX equations to resolve JS string escape sequence collisions.
 * e.g., \text -> \u0009ext (tab), \times -> \u0009imes, \mathbf -> \u0008mathbf (backspace), \begin -> \u0008egin, \frac -> \u000crac (form feed)
 */
function cleanLatex(eq = '') {
  if (!eq) return '';
  let res = eq
    .replace(/\u0009ext/g, '\\text')
    .replace(/\u0009imes/g, '\\times')
    .replace(/\u0009o\b/g, '\\to')
    .replace(/\u0008mathbf/g, '\\mathbf')
    .replace(/\u0008egin/g, '\\begin')
    .replace(/\u000crac/g, '\\frac')
    // Only collapse over-escaped command backslashes at start-of-expression or after whitespace/operators/delimiters
    // Preserves legitimate LaTeX line breaks (\\) in aligned environments and matrices
    .replace(/(?:^|(?<=[\s=+\-*\/({[]))\\\\+([a-zA-Z]+)/g, '\\$1')
    .replace(/(?<!\\)\bext\{/g, '\\text{')
    .replace(/(?<!\\)\brac\{/g, '\\frac{')
    .replace(/(?<!\\)\begin\{/g, '\\begin{')
    .replace(/(?<!\\)\mathbf\{/g, '\\mathbf{')
    .replace(/(?<!\\)\bquad\b/g, '\\quad')
    .replace(/(?<!\\)\b(times|cdot|approx|geq|leq|neq|to|implies|mid|mathbf)\b/g, '\\$1')
    .replace(/\\mathbf\s*\{/g, '\\mathbf{')
    .replace(/(?<!\\)\bBig\(/g, '\\Big(')
    .replace(/(?<!\\)\bBig\)/g, '\\Big)')
    .replace(/\bextResult\b/g, '\\text{Result}')
    .trim();

  // If \to was substituted inside \text{...}, restore English word 'to' and escape TeX macro parameter '#'
  res = res.replace(/\\text\{([^}]+)\}/g, (m, inner) => {
    return `\\text{${inner.replace(/\\to\b/g, 'to').replace(/(?<!\\)#/g, '\\#')}}`;
  });

  return res;
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function katexStrictHandler(errorCode) {
  return errorCode === 'unknownSymbol' || errorCode === 'symbolNotInFont' ? 'ignore' : 'warn';
}

const CALLOUT_META = {
  note: {
    label: 'NOTE',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'
  },
  tip: {
    label: 'TIP',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>'
  },
  important: {
    label: 'IMPORTANT',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M12 7v4"/><path d="M12 14h.01"/></svg>'
  },
  warning: {
    label: 'WARNING',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>'
  },
  caution: {
    label: 'CAUTION',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>'
  }
};

function sanitizeCalloutMarkdown(rawBody = '') {
  const shielded = [];
  let safe = rawBody.replace(/```[\s\S]*?```|`[^`\n]+`/g, (m) => {
    const idx = shielded.length;
    shielded.push(m);
    return `\u0000RKCODE_${idx}\u0000`;
  });
  safe = safe.replace(/<!--[\s\S]*?-->|<\/?[a-zA-Z][a-zA-Z0-9-]*(?:\s+[^<>$\n]*?)?\/?>/g, (tag) => escapeHtml(tag));
  shielded.forEach((snippet, idx) => {
    safe = safe.replace(`\u0000RKCODE_${idx}\u0000`, snippet);
  });
  return safe;
}

function renderCalloutBlock(bqBlock) {
  const rawLines = bqBlock.replace(/\n$/, '').split('\n').map(line => line.replace(/^>[ \t]?/, ''));
  const firstMatch = (rawLines[0] || '').trim().match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\](?:\s+(.*))?$/i);
  if (!firstMatch) return null;

  const variant = firstMatch[1].toLowerCase();
  const meta = CALLOUT_META[variant] || CALLOUT_META.note;
  const trailingFirst = (firstMatch[2] || '').trim();
  const bodyLines = trailingFirst ? [trailingFirst, ...rawLines.slice(1)] : rawLines.slice(1);

  const normalizedLines = [];
  for (let i = 0; i < bodyLines.length; i++) {
    const line = bodyLines[i];
    const prev = normalizedLines[normalizedLines.length - 1];
    const isListItem = /^\s*(?:[-*]|\d+\.)\s+/.test(line);
    const prevIsListItem = prev !== undefined && /^\s*(?:[-*]|\d+\.)\s+/.test(prev);
    if (isListItem && prev !== undefined && prev.trim() !== '' && !prevIsListItem) {
      normalizedLines.push('');
    }
    normalizedLines.push(line);
  }

  const safeBody = sanitizeCalloutMarkdown(normalizedLines.join('\n').trim());
  const innerHtml = safeBody ? renderMarkdownToHtml(safeBody, { insideCallout: true }) : '';

  return `<aside class="not-prose rk-callout rk-callout-${variant}" data-callout="${variant}" role="note" aria-label="${meta.label} advisory">
  <div class="rk-callout-header">
    <span class="rk-callout-icon" aria-hidden="true">${meta.icon}</span>
    <span class="rk-callout-badge">${meta.label}</span>
  </div>
  <div class="rk-callout-body">
    ${innerHtml}
  </div>
</aside>`;
}

/**
 * Builds a structured, responsive Math Steps Container for sequential calculations.
 * Binds Step Number, Technical Explanation, KaTeX Formula, and Verified Outcome together.
 */
function renderMathStepsBlock(blockText, blockTitle = 'Sequential Technical Calculation') {
  const lines = blockText.trim().split('\n').filter(l => l.trim().length > 0);
  const steps = [];
  let currentStep = null;

  for (const line of lines) {
    const trimmed = line.trim();
    // Check if line starts a new step: "Step 01: Verbal Title", "1. Title", or "- **Step 01"
    const stepMatch = trimmed.match(/^(?:[-*]\s+)?(?:\*\*)?(?:Step\s*(\d+)|\b(\d+)\.)[:\s]*(.*?)(?:\*\*)?(?:\s*\|\s*(.*))?$/i);
    if (stepMatch) {
      if (currentStep) steps.push(currentStep);
      const stepNum = (stepMatch[1] || stepMatch[2] || (steps.length + 1)).toString().padStart(2, '0');
      const rest = stepMatch[3] || '';
      const pipePart = stepMatch[4] || '';
      currentStep = {
        number: `Step ${stepNum}`,
        description: rest,
        equation: pipePart,
        result: ''
      };
    } else if (currentStep) {
      if (trimmed.startsWith('$$') || trimmed.startsWith('\\[')) {
        currentStep.equation = (currentStep.equation ? currentStep.equation + ' ' : '') + trimmed;
      } else if (trimmed.startsWith('*Result:') || trimmed.startsWith('Result:')) {
        currentStep.result = trimmed.replace(/^\*?Result:\s*/i, '').replace(/\*$/, '');
      } else {
        currentStep.description = (currentStep.description ? currentStep.description + ' ' : '') + trimmed;
      }
    } else {
      currentStep = {
        number: `Step 01`,
        description: trimmed,
        equation: '',
        result: ''
      };
    }
  }
  if (currentStep) steps.push(currentStep);

  const stepHtmls = steps.map((s) => {
    let eqHtml = '';
    if (s.equation) {
      const cleanEq = s.equation.replace(/^\$\$|\$\$$|^\\\[|\\\]$/g, '').trim();
      try {
        eqHtml = katex.renderToString(cleanLatex(cleanEq), {
          displayMode: true,
          throwOnError: false,
          strict: katexStrictHandler,
          output: 'html'
        });
      } catch (e) {
        eqHtml = `<span class="font-mono text-xs text-[#FFA439]">${cleanEq}</span>`;
      }
    }

    return `<div class="p-3 sm:p-3.5 rounded-xl bg-[#090D15] border border-white/10 space-y-2.5 shadow-sm">
      <div class="flex items-start sm:items-center gap-2.5">
        <span class="px-2 py-0.5 rounded bg-[#FF7A00]/15 border border-[#FF7A00]/30 font-mono text-xs font-bold text-[#FFA439] select-none flex-shrink-0">${s.number}</span>
        <div class="text-[15px] font-lora text-[#E2D9CE] leading-relaxed font-medium">${s.description}</div>
      </div>
      ${eqHtml ? `<div class="not-prose math-step-formula w-full overflow-x-auto custom-scrollbar py-2.5 px-3 rounded-lg bg-[#05080E] border border-white/5 text-center">${eqHtml}</div>` : ''}
      ${s.result ? `<div class="text-xs font-mono text-[#65F58A] flex items-center gap-1.5 pl-0.5"><span class="w-1.5 h-1.5 rounded-full bg-[#65F58A] flex-shrink-0"></span><span>${s.result}</span></div>` : ''}
    </div>`;
  }).join('\n');

  return `<div class="not-prose my-4 rounded-2xl border border-white/10 bg-[#070A0F] overflow-hidden shadow-xl">
    <div class="px-4 py-2 bg-[#10141D] border-b border-white/10 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[#FF7A00]"></span>
        <span class="font-mono text-xs font-bold text-[#FFA439] uppercase tracking-wider">${blockTitle || 'Sequential Technical Calculation'}</span>
      </div>
      <span class="text-[10px] font-mono text-[#8C7A6B] uppercase tracking-wider">Academic Derivation</span>
    </div>
    <div class="p-3.5 sm:p-4 space-y-2.5 bg-[#070A0F]">
      ${stepHtmls}
    </div>
  </div>`;
}

/**
 * Converts Unicode / ASCII box-drawing tables into responsive academic HTML tables.
 */
function convertBoxTableToHtml(text) {
  const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
  let title = '';
  const rows = [];

  for (const line of lines) {
    // Check if line is a title above the box table
    if (!line.includes('│') && !line.includes('┌') && !line.includes('├') && !line.includes('└') && !line.includes('|')) {
      if (!title) title = line.trim();
      continue;
    }
    // Skip border horizontal lines
    if (line.includes('┌') || line.includes('├') || line.includes('└') || /^[─┬┼┴\s\-_+]+$/.test(line)) {
      continue;
    }
    // Extract cells from pipe or box vertical bars
    if (line.includes('│') || (line.startsWith('|') && line.endsWith('|'))) {
      const sep = line.includes('│') ? '│' : '|';
      const cells = line.split(sep).slice(1, -1).map(c => c.trim());
      if (cells.length > 0 && cells.some(c => c.length > 0)) {
        rows.push(cells);
      }
    }
  }

  if (rows.length < 2) return null;

  const header = rows[0];
  const body = rows.slice(1);

  const thead = `<thead class="bg-[#120E09] border-b border-[#FF7A00]/30">
    <tr>${header.map(col => `<th class="py-2.5 px-3.5 text-xs font-mono font-bold text-[#FFA439] uppercase tracking-wider">${col}</th>`).join('')}</tr>
  </thead>`;

  const tbody = `<tbody>${body.map((row, rIdx) => {
    const isAlt = rIdx % 2 === 1;
    return `<tr class="border-b border-[#FF7A00]/10 ${isAlt ? 'bg-[#0E0B07]' : 'bg-[#070A0F]'} hover:bg-[#1A1208]/70 transition-colors">
      ${row.map(c => `<td class="py-2.5 px-3.5 text-sm font-lora text-[#E2D9CE] leading-relaxed">${c}</td>`).join('')}
    </tr>`;
  }).join('\n')}</tbody>`;

  const captionHtml = title ? `<div class="px-3.5 py-1.5 bg-[#120E09] border-b border-[#FF7A00]/25 text-xs font-mono font-bold text-[#FFA439] flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00]"></span><span>${title}</span></div>` : '';

  return `<div class="my-5 overflow-x-auto rounded-xl border border-[#FF7A00]/25 shadow-md">${captionHtml}<table class="w-full text-left border-collapse">${thead}${tbody}</table></div>`;
}

export function renderMarkdownToHtml(markdown = '', options = {}) {
  if (!markdown) return '';
  const { insideCallout = false } = options;

  let html = markdown.replace(/\r\n/g, '\n');

  // Pre-normalize common escaped LaTeX characters in markdown strings
  html = html
    .replace(/\u0009ext/g, '\\text')
    .replace(/\u0009imes/g, '\\times')
    .replace(/\u0009o\b/g, '\\to')
    .replace(/\u0008mathbf/g, '\\mathbf')
    .replace(/\u0008egin/g, '\\begin')
    .replace(/\u000crac/g, '\\frac');

  // =========================================================================
  // STEP 1: SHIELD CODE BLOCKS & CONVERT EMBEDDED BOX TABLES & MATH STEPS
  // =========================================================================
  const codeBlocks = [];
  const inlineCodes = [];
  const inlineCodeTexts = [];
  const figureBlocks = [];

  // 1-pre. Structured Math Steps Blocks (:::math-steps ... :::)
  html = html.replace(/:::math-steps[^\S\r\n]*(.*?)\r?\n([\s\S]*?):::/gi, (match, title, body) => {
    const rendered = renderMathStepsBlock(body, title.trim());
    const token = `@@@MATHSTEPS_${codeBlocks.length}@@@`;
    codeBlocks.push(rendered);
    return token;
  });

  // 1a. Mermaid Diagram Blocks -> Native Mermaid Container (escape XML/HTML delimiters so browser DOM preserves labels for Mermaid.run)
  html = html.replace(/```mermaid\n([\s\S]*?)```/g, (match, code) => {
    const cleanCode = escapeHtml(code.trim());
    const token = `@@@MERMAID_${codeBlocks.length}@@@`;
    codeBlocks.push(`<div class="not-prose my-6 w-full overflow-x-auto custom-scrollbar flex justify-center">
      <div class="mermaid text-center" style="min-width: 280px; max-width: 100%;">${cleanCode}</div>
    </div>`);
    return token;
  });

  // 1b. Standard Fenced Code Blocks: Check for ASCII Box Tables, Accidentally Trapped Tables, or CLI Sessions
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    // If the code block is an ASCII/Unicode box-drawing table:
    if (code.includes('┌') || code.includes('│') || code.includes('├') || code.includes('┼') || code.includes('└')) {
      const convertedTable = convertBoxTableToHtml(code);
      if (convertedTable) {
        const token = `@@@CODEBLOCK_${codeBlocks.length}@@@`;
        codeBlocks.push(convertedTable);
        return token;
      }
    }

    // If the code block accidentally wraps a Markdown table:
    if (/^\s*\|.+\|\s*\n\s*\|[\s-:]+\|/m.test(code)) {
      return `\n\n${code.trim()}\n\n`;
    }

    // If the code block accidentally wraps a Markdown figure or heading:
    if (/^\s*(!\[|###|##|#)/m.test(code) && !/^(bash|sh|powershell|python|json|yaml)/i.test(lang)) {
      return `\n\n${code.trim()}\n\n`;
    }

    const cleanCode = escapeHtml(code);

    // Classify block as Operational CLI vs Source Code vs Telemetry Output
    const isExplicitCli = /^(bash|sh|powershell|cmd|terminal|console)$/i.test(lang) || /^(PS\s+[A-Z]:\\|\$|#\s)/m.test(code);
    const isTelemetry = !lang || /^(output|text|telemetry)$/i.test(lang) || /^(Name\s+Status|Interface\s+Status|DestinationPrefix|0x[0-9a-fA-F]+)/m.test(code);

    let languageLabel = (lang || (isExplicitCli ? 'CLI' : isTelemetry ? 'CLI OUTPUT' : 'CODE')).toUpperCase();
    let categoryLabel = isExplicitCli ? 'OPERATIONAL CLI' : isTelemetry ? 'OPERATIONAL TELEMETRY' : 'SOURCE CODE';
    let dotColor = isExplicitCli ? 'bg-[#65F58A]' : isTelemetry ? 'bg-[#38BDF8]' : 'bg-[#FF7A00]';

    const token = `@@@CODEBLOCK_${codeBlocks.length}@@@`;
    codeBlocks.push(`<div class="my-5 rounded-xl border border-[#FF7A00]/25 overflow-hidden bg-[#070A0F] shadow-lg">
      <div class="px-3.5 py-1.5 bg-[#120E09] border-b border-[#FF7A00]/20 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full ${dotColor}"></span>
          <span class="font-mono text-[11px] font-bold text-[#FFA439] tracking-wider">${languageLabel}</span>
        </div>
        <span class="text-[10px] font-mono text-[#8C7A6B]">${categoryLabel}</span>
      </div>
      <pre class="p-4 font-mono text-xs sm:text-sm text-[#E2D9CE] overflow-x-auto leading-relaxed custom-scrollbar m-0"><code>${cleanCode}</code></pre>
    </div>`);
    return token;
  });

  // 1b-callout. GitHub-Flavored Markdown Alerts ([!NOTE], [!TIP], [!IMPORTANT], [!WARNING], [!CAUTION])
  if (!insideCallout) {
    html = html.replace(/(?:^>[ \t]?.*(?:\n|$))+/gm, (bqBlock) => {
      const rendered = renderCalloutBlock(bqBlock);
      if (!rendered) return bqBlock;
      const token = `@@@CALLOUT_${codeBlocks.length}@@@`;
      codeBlocks.push(rendered);
      return `\n\n${token}\n\n`;
    });
  }

  // 1c. Inline Code Spans (`code`)
  html = html.replace(/`([^`\n]+)`/g, (match, code) => {
    const clean = escapeHtml(code);
    const token = `@@@INLINECODE_${inlineCodes.length}@@@`;
    inlineCodeTexts.push(code);
    inlineCodes.push(`<code class="px-1.5 py-0.5 rounded bg-[#11141D] border border-white/10 font-mono text-xs sm:text-[13px] text-[#E2D9CE] font-normal break-words">${clean}</code>`);
    return token;
  });

  // 1d. Neutralise raw HTML in prose. Lesson text is injected with innerHTML, so a
  // literal tag in course text (e.g. an XSS example in a web-security lesson, or a
  // placeholder such as /proc/<pid>/maps) must render as text, not as markup.
  // Only a few attribute-free formatting tags are passed through.
  html = html.replace(/<(?=[A-Za-z\/!?])/g, (lt, offset, full) => {
    const rest = full.slice(offset, offset + 12);
    if (/^<\/?(br|sub|sup|kbd|mark|u|em|strong|b|i|small)\s*\/?>/i.test(rest)) return lt;
    return '&lt;';
  });

  // =========================================================================
  // STEP 2: MARKDOWN IMAGES & FIGURES (PROCESSED BEFORE KATEX)
  // Ensures alt attributes are clean text and cannot leak raw HTML or quotes
  // =========================================================================
  html = html.replace(/!\[(.*?)\]\((.*?)\)(?:\s*\n+[*_]+(?!\s)([^\r\n]+?)(?<!\s)[*_]+(?=[ \t]*(?:\r?\n|$)))?/g, (match, alt, src, trailingCaption) => {
    const cleanSrc = src.trim();
    const resolvedSrc = CHAPTER_1_IMAGES && CHAPTER_1_IMAGES[cleanSrc] ? CHAPTER_1_IMAGES[cleanSrc] : cleanSrc;
    const rawCaption = (trailingCaption && trailingCaption.trim()) || (alt && alt.trim()) || '';

    // Sanitize alt attribute: remove HTML tags & raw math, restore inline-code tokens as plain text, escape attributes
    let plainAlt = rawCaption
      .replace(/<[^>]+>/g, '')
      .replace(/\$([^$]+)\$/g, '$1')
      .replace(/\\\(|\\\)/g, '')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\times/g, 'x')
      .replace(/\\to/g, '->')
      .replace(/\\quad/g, ' ')
      .replace(/@@@INLINECODE_(\d+)@@@/g, (m, idx) => {
        const i = parseInt(idx, 10);
        return inlineCodeTexts[i] !== undefined ? inlineCodeTexts[i] : '';
      })
      .replace(/@@@[A-Z]+_\d+@@@/g, '')
      .replace(/[*_~`]/g, '')
      .trim() || 'Technical Diagram';

    const safeAlt = escapeAttr(plainAlt);

    // Format visible caption: preserve inline typography (**bold**, *italic*, ~~strike~~)
    const formattedCaption = rawCaption
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')
      .replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em class="italic text-[#E2D9CE]/90">$1</em>')
      .replace(/~~(.+?)~~/g, '<del class="line-through text-[#8C7A6B]">$1</del>');

    const token = `@@@FIGURE_${figureBlocks.length}@@@`;
    figureBlocks.push(`<figure class="my-5 w-full overflow-hidden rounded-2xl border border-[#FF7A00]/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] bg-black/40">
      <img
        src="${resolvedSrc}"
        alt="${safeAlt}"
        class="w-full h-auto block rounded-t-2xl cursor-pointer hover:scale-[1.003] transition-transform duration-300"
        loading="lazy"
        decoding="async"
        onerror="if(this.src.endsWith('.png')){this.src=this.src.replace(/\\.png$/,'.svg');}else{this.onerror=null;this.style.display='none';if(this.nextElementSibling){this.nextElementSibling.style.display='block';}}"
      />
      <div style="display:none;" class="p-6 sm:p-8 bg-[#0B0D14] border-b border-[#FF7A00]/20 rounded-t-2xl text-center space-y-2.5">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-[#FFA439] text-xs font-mono font-bold uppercase">
          <span>TECHNICAL BLUEPRINT // ${escapeHtml(plainAlt)}</span>
        </div>
        <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-xl mx-auto leading-relaxed">${formattedCaption || 'Defensive architecture reference diagram.'}</p>
      </div>
      ${rawCaption ? `<figcaption class="py-2.5 px-4 text-center text-xs font-mono text-[#A3907C] border-t border-[#FF7A00]/20 bg-[#0B0907] flex items-center justify-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00]/80"></span><span>${formattedCaption}</span></figcaption>` : ''}
    </figure>`);

    return `\n\n${token}\n\n`;
  });

  // 2b. Malformed Image Syntax Fallback: handles !(url) or ![path]
  html = html.replace(/(?:!\[\]\(|!!\(|!\()([^)]+\.(?:jpg|jpeg|png|webp|svg|gif))\)/gi, (match, src) => {
    const cleanSrc = src.trim();
    const resolvedSrc = CHAPTER_1_IMAGES && CHAPTER_1_IMAGES[cleanSrc] ? CHAPTER_1_IMAGES[cleanSrc] : cleanSrc;
    const token = `@@@FIGURE_${figureBlocks.length}@@@`;
    figureBlocks.push(`<figure class="my-5 w-full overflow-hidden rounded-2xl border border-[#FF7A00]/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] bg-black/40">
      <img
        src="${resolvedSrc}"
        alt="Technical Reference Diagram"
        class="w-full h-auto block rounded-2xl cursor-pointer hover:scale-[1.003] transition-transform duration-300"
        loading="lazy"
        decoding="async"
        onerror="if(this.src.endsWith('.png')){this.src=this.src.replace(/\\.png$/,'.svg');}else{this.onerror=null;this.style.display='none';}"
      />
    </figure>`);
    return `\n\n${token}\n\n`;
  });

  // =========================================================================
  // STEP 3: NATIVE KATEX MATHEMATICAL FORMULA RENDERING (HTML MODE ONLY)
  // Output mode 'html' eliminates MathML duplication and subscript stacking
  // =========================================================================

  // 3a. Block Equations: $$...$$ and \[...\]
  html = html.replace(/(?:\$\$([\s\S]*?)\$\$|\\\[([\s\S]*?)\\\])/g, (match, eq1, eq2) => {
    const eq = cleanLatex(eq1 || eq2 || '');
    if (!eq) return '';
    try {
      const rendered = katex.renderToString(eq, {
        displayMode: true,
        throwOnError: true,
        strict: katexStrictHandler,
        output: 'html'
      });
      return `<div class="not-prose my-3.5 py-2.5 px-4 rounded-xl bg-[#0B0D14] border border-white/10 shadow-lg overflow-x-auto custom-scrollbar text-center text-white">${rendered}</div>`;
    } catch (e) {
      return `<div class="not-prose my-3.5 p-3 rounded-lg bg-[#140D08] border border-red-500/30 font-mono text-xs text-red-300">${eq}</div>`;
    }
  });

  // 3b. Inline Equations: \(...\)
  html = html.replace(/\\\(([\s\S]*?)\\\)/g, (match, eq) => {
    const clean = cleanLatex(eq);
    if (!clean) return '';
    try {
      const rendered = katex.renderToString(clean, {
        displayMode: false,
        throwOnError: true,
        strict: katexStrictHandler,
        output: 'html'
      });
      return `<span class="not-prose inline-math inline-flex items-center align-middle whitespace-nowrap mx-0.5">${rendered}</span>`;
    } catch (e) {
      return match;
    }
  });

  // 3c. Inline Equations: $...$ (strict math tokens, excluding currency or shell vars)
  html = html.replace(/(?<![0-9a-zA-Z\\\$])\$([^\s\$][^\$\r\n]*?[^\s\$]|[^\s\$])\$(?![0-9a-zA-Z\$])/g, (match, eq) => {
    // Exclude shielded code blocks, figures, or inline code spans
    if (eq.includes('@@@CODEBLOCK_') || eq.includes('@@@INLINECODE_') || eq.includes('@@@FIGURE_')) return match;
    // Exclude shell syntax, regex matches (=~), command/param expansions, redirections, or raw HTML tags
    if (/(=~|\$\(|\$\{|<<|>>|>&|<&|<\(|>\(|\/dev\/|<\s*\/?[a-zA-Z][a-zA-Z0-9-]*(?:\s+[^>]*)?>|<!--)/.test(eq)) return match;
    // Allow quotes strictly inside LaTeX text/font commands (e.g. \text{"admin"}), rejecting bare shell quotes
    const outsideTextCommands = eq.replace(/\\(?:text|texttt|textrm|mathrm|mathbf|mathit|mathsf|operatorname)\{[^{}]*\}/g, '');
    if (outsideTextCommands.includes('"')) return match;
    // Require positive mathematical indicators (LaTeX commands, mathematical operators, relations, comparisons, or sub/superscripts)
    if (!/(\\[a-zA-Z]+|[=^_+\-×÷≠≤≥≈±]|\\pmod|\\lfloor|\\rfloor|\S\s*[<>]\s*\S)/.test(eq)) return match;

    const clean = cleanLatex(eq);
    if (!clean) return match;
    try {
      const rendered = katex.renderToString(clean, {
        displayMode: false,
        throwOnError: true,
        strict: katexStrictHandler,
        output: 'html'
      });
      return `<span class="not-prose inline-math inline-flex items-center align-middle whitespace-nowrap mx-0.5">${rendered}</span>`;
    } catch (e) {
      return match;
    }
  });

  // =========================================================================
  // STEP 4: STANDARD MARKDOWN LINKS
  // =========================================================================
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => {
    const cleanHref = href.trim();
    const normalizedScheme = cleanHref.replace(/[\s\u0000-\u001F]+/g, '');
    if (/^(?:javascript|vbscript|data):/i.test(normalizedScheme)) {
      return `<span class="text-[#E2D9CE]/80">${escapeHtml(text)}</span>`;
    }
    const safeHref = cleanHref.replace(/"/g, '&quot;');
    return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer" class="text-[#FFA439] underline decoration-[#FF7A00]/40 hover:decoration-[#FF7A00] transition-colors">${text}</a>`;
  });

  // =========================================================================
  // STEP 5: HEADINGS (H1-H5) & MAJOR SECTION DIVIDERS
  // Major sections (##) are divided with a light, thin amber line (border-t border-[#FF7A00]/20)
  // Sub-sections (###, ####, #####) remain in continuous reading flow without dividers
  // =========================================================================
  // Clean up leading horizontal rules or rules immediately preceding major sections (##)
  html = html.replace(/^\s*---\s*\n+/g, '');
  html = html.replace(/(?:^---\s*\n+)+(?=##\s+)/gm, '');

  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-2xl sm:text-3xl font-bold font-lora text-white mt-6 mb-2.5 text-center border-b border-[#FF7A00]/25 pb-3">$1</h1>');

  let isFirstH2 = true;
  html = html.replace(/^##\s+(.+)$/gm, (match, heading) => {
    if (isFirstH2) {
      isFirstH2 = false;
      return `<h2 class="text-xl sm:text-2xl font-bold font-lora text-white mt-6 mb-2 text-center">${heading}</h2>`;
    }
    return `<hr class="my-5 border-t border-[#FF7A00]/20" />\n<h2 class="text-xl sm:text-2xl font-bold font-lora text-white mt-6 mb-2 text-center">${heading}</h2>`;
  });

  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-lg sm:text-xl font-bold font-lora text-[#F5EFE6] mt-4.5 mb-1.5">$1</h3>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-base sm:text-lg font-bold font-lora text-[#EAE3D8] mt-3.5 mb-1 flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00]/60 flex-shrink-0"></span><span>$1</span></h4>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="text-sm sm:text-base font-semibold font-mono text-[#D6CEBE] mt-3 mb-1">$1</h5>');

  // =========================================================================
  // STEP 6: INLINE TYPOGRAPHY (BOLD, ITALIC, STRIKETHROUGH)
  // =========================================================================
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em class="italic text-[#E2D9CE]/90">$1</em>');
  html = html.replace(/~~(.+?)~~/g, '<del class="line-through text-[#8C7A6B]">$1</del>');

  // =========================================================================
  // STEP 7: HORIZONTAL RULES & BLOCKQUOTES
  // =========================================================================
  html = html.replace(/^---$/gm, '<hr class="my-5 border-t border-[#FF7A00]/20" />');

  // Clean textbook blockquotes
  html = html.replace(/(?:^>\s*.+(?:\n|$))+/gm, (bqBlock) => {
    const rawContent = bqBlock
      .split('\n')
      .map(line => line.replace(/^>\s?/, ''))
      .join('\n')
      .trim();

    if (!rawContent) return '';
    return `<blockquote class="my-4 border-l-2 border-[#FF7A00]/50 pl-4 py-1 text-[#E2D9CE]/90 font-lora italic text-[16px] leading-[1.6]">
      ${rawContent}
    </blockquote>`;
  });

  // =========================================================================
  // STEP 8: ACADEMIC TABLES
  // =========================================================================
  html = html.replace(/(?:^\|.+\|\r?\n?)+/gm, (tableBlock) => {
    const lines = tableBlock.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return tableBlock;

    let tableCaption = '';
    const filteredLines = [];
    for (const line of lines) {
      const capMatch = line.match(/^\|\s*(?:Table|Caption)[:\s]+([^|]+)\s*\|/i);
      if (capMatch) {
        tableCaption = capMatch[1].trim();
      } else {
        filteredLines.push(line);
      }
    }

    if (filteredLines.length < 2) return tableBlock;

    const parseRow = (line) => line.split('|').slice(1, -1).map(c => c.trim());
    const headerCols = parseRow(filteredLines[0]);
    
    // Check delimiter row
    let dataStartIdx = 1;
    if (filteredLines[1] && /^\|[\s-:]+\|/.test(filteredLines[1])) {
      dataStartIdx = 2;
    }

    const thead = `<thead class="bg-[#120E09] border-b border-[#FF7A00]/30">
      <tr>${headerCols.map(col => `<th class="py-2.5 px-3.5 text-xs font-mono font-bold text-[#FFA439] uppercase tracking-wider">${col}</th>`).join('')}</tr>
    </thead>`;

    const bodyRows = filteredLines.slice(dataStartIdx).map((line, rIdx) => {
      const cols = parseRow(line);
      const isAlt = rIdx % 2 === 1;
      return `<tr class="border-b border-[#FF7A00]/10 ${isAlt ? 'bg-[#0E0B07]' : 'bg-[#070A0F]'} hover:bg-[#1A1208]/70 transition-colors">
        ${cols.map(c => `<td class="py-2.5 px-3.5 text-sm font-lora text-[#E2D9CE] leading-relaxed">${c}</td>`).join('')}
      </tr>`;
    }).join('\n');

    const tbody = `<tbody>${bodyRows}</tbody>`;
    const captionHtml = tableCaption ? `<div class="px-3.5 py-1.5 bg-[#120E09] border-b border-[#FF7A00]/25 text-xs font-mono font-bold text-[#FFA439]">${tableCaption}</div>` : '';

    return `<div class="my-5 overflow-x-auto rounded-xl border border-[#FF7A00]/25 shadow-md">${captionHtml}<table class="w-full text-left border-collapse">${thead}${tbody}</table></div>`;
  });

  // =========================================================================
  // STEP 9: LISTS (UNORDERED, DEFINITION, AND COHERENT NUMBERED PROCEDURES)
  // =========================================================================

  // 9a. Unordered & Definition lists
  html = html.replace(/(?:^[-*]\s+.+(?:\n|$))+/gm, (listBlock) => {
    const rawItems = listBlock.trim().split('\n');

    const items = rawItems.map((item) => {
      const clean = item.replace(/^[-*]\s+/, '').trim();

      // Check if item is a definition: **Term:** Def or **Term**: Def
      const termMatch = clean.match(/^<strong class="font-bold text-white">([^<]+?):?<\/strong>:?\s*(.*)$/s);
      if (termMatch) {
        const rawTerm = termMatch[1].trim();
        const cleanTerm = rawTerm.replace(/:+$/, '').trim();
        const def = termMatch[2].trim();
        return `  <li class="flex items-start gap-2.5 text-[#E2D9CE] leading-[1.65] text-[16.5px] font-lora"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0"></span><span class="flex-1"><strong class="font-bold text-[#FFA439]">${cleanTerm}:</strong> ${def}</span></li>`;
      }

      return `  <li class="flex items-start gap-2.5 text-[#E2D9CE] leading-[1.65] text-[16.5px] font-lora"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0"></span><span class="flex-1">${clean}</span></li>`;
    }).join('\n');

    return `<ul class="my-2 space-y-1 pl-1 sm:pl-2">${items}</ul>`;
  });

  // 9b. Coherent Ordered Numbered Procedures (01., 02., 03.) with Multi-line continuation support
  html = html.replace(/(?:^\d+\.\s+[\s\S]*?(?=\n\d+\.|\n\n\S|\n\n#|$))+/gm, (listBlock) => {
    // Split into individual numbered items:
    const itemChunks = listBlock.split(/(?=^\d+\.\s+)/m).filter(c => c.trim().length > 0);
    let num = 1;

    const items = itemChunks.map((chunk) => {
      const match = chunk.match(/^(\d+)\.\s+([\s\S]*)/);
      const itemNum = match ? match[1].padStart(2, '0') : String(num++).padStart(2, '0');
      const itemBody = match ? match[2].trim() : chunk.trim();
      return `  <li class="flex items-start gap-2.5 text-[#E2D9CE] leading-[1.65] text-[16.5px] font-lora"><span class="font-mono text-[#FFA439] text-[15px] font-semibold flex-shrink-0 select-none">${itemNum}.</span><div class="flex-1 space-y-1">${itemBody}</div></li>`;
    }).join('\n');

    return `<ol class="my-2 space-y-1.5 pl-1 sm:pl-2">${items}</ol>`;
  });

  // Merge adjacent lists that had blank lines between items
  html = html.replace(/<\/ul>\s*<ul class="my-2 space-y-1 pl-1 sm:pl-2">/g, '');
  html = html.replace(/<\/ol>\s*<ol class="my-2 space-y-1\.5 pl-1 sm:pl-2">/g, '');
  html = html.replace(/<\/dl>\s*<dl class="my-2 space-y-1">/g, '');

  // =========================================================================
  // STEP 10: PARAGRAPHS & FLOWING TEXTBOOK PROSE
  // =========================================================================
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
        trimmed.startsWith('<dl') ||
        trimmed.startsWith('<aside') ||
        trimmed.startsWith('@@@CODEBLOCK_') ||
        trimmed.startsWith('@@@CALLOUT_') ||
        trimmed.startsWith('@@@MERMAID_') ||
        trimmed.startsWith('@@@MATHSTEPS_') ||
        trimmed.startsWith('@@@FIGURE_')
      ) {
        return trimmed;
      }
      return `<p class="font-lora text-[16.5px] leading-[1.7] text-[#E2D9CE] my-2.5">${trimmed}</p>`;
    })
    .join('\n\n');

  // =========================================================================
  // STEP 11: RESTORE SHIELDED FIGURES, CODE BLOCKS & INLINE CODES
  // =========================================================================
  figureBlocks.forEach((fig, idx) => {
    html = html.replace(new RegExp(`@@@FIGURE_${idx}@@@`, 'g'), () => fig);
  });

  codeBlocks.forEach((block, idx) => {
    html = html.replace(new RegExp(`@@@CODEBLOCK_${idx}@@@`, 'g'), () => block);
    html = html.replace(new RegExp(`@@@CALLOUT_${idx}@@@`, 'g'), () => block);
    html = html.replace(new RegExp(`@@@MERMAID_${idx}@@@`, 'g'), () => block);
    html = html.replace(new RegExp(`@@@MATHSTEPS_${idx}@@@`, 'g'), () => block);
  });

  inlineCodes.forEach((code, idx) => {
    html = html.replace(new RegExp(`@@@INLINECODE_${idx}@@@`, 'g'), () => code);
  });

  return html;
}
