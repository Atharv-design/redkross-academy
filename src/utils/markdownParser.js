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
    // Collapse double backslashes before LaTeX command words to prevent newLineInDisplayMode
    .replace(/\\\\+([a-zA-Z]+)/g, '\\$1')
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

  // If \to was substituted inside \text{...}, restore English word 'to'
  res = res.replace(/\\text\{([^}]+)\}/g, (m, inner) => {
    return `\\text{${inner.replace(/\\to\b/g, 'to')}}`;
  });

  return res;
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
          output: 'html'
        });
      } catch (e) {
        eqHtml = `<span class="font-mono text-xs text-[#FFA439]">${cleanEq}</span>`;
      }
    }

    return `<div class="p-3.5 sm:p-4 rounded-xl bg-[#070A0F] border border-[#FF7A00]/20 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-[#FF7A00]/40 transition-colors shadow-sm">
      <div class="flex items-start gap-3 flex-1 min-w-0">
        <span class="px-2.5 py-1 rounded-md bg-[#1F1308] border border-[#FF7A00]/40 font-mono text-xs font-bold text-[#FFA439] flex-shrink-0 select-none">${s.number}</span>
        <div class="space-y-1 min-w-0">
          <div class="text-[15px] font-lora text-[#E2D9CE] leading-relaxed">${s.description}</div>
          ${s.result ? `<div class="text-xs font-mono text-[#65F58A] flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-[#65F58A]"></span><span>${s.result}</span></div>` : ''}
        </div>
      </div>
      ${eqHtml ? `<div class="text-right overflow-x-auto custom-scrollbar py-2 px-3.5 rounded-lg bg-[#0E0C09] border border-[#FF7A00]/15 flex items-center justify-end text-white text-sm max-w-full md:max-w-[48%] flex-shrink-0">${eqHtml}</div>` : ''}
    </div>`;
  }).join('\n');

  return `<div class="my-6 rounded-2xl border border-[#FF7A00]/30 bg-[#0B0D14] overflow-hidden shadow-2xl">
    <div class="px-4 py-2.5 bg-[#140D07] border-b border-[#FF7A00]/25 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse"></span>
        <span class="font-mono text-xs font-bold text-[#FFA439] uppercase tracking-wider">${blockTitle || 'Sequential Technical Calculation'}</span>
      </div>
      <span class="text-[10px] font-mono text-[#8C7A6B] uppercase tracking-wider">KaTeX Verified</span>
    </div>
    <div class="p-4 sm:p-5 space-y-3 bg-[#0B0D14]/90">
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

export function renderMarkdownToHtml(markdown = '') {
  if (!markdown) return '';

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

  // 1-pre. Structured Math Steps Blocks (:::math-steps ... :::)
  html = html.replace(/:::math-steps\s*(.*?)\n([\s\S]*?):::/gi, (match, title, body) => {
    const rendered = renderMathStepsBlock(body, title.trim());
    const token = `@@@MATHSTEPS_${codeBlocks.length}@@@`;
    codeBlocks.push(rendered);
    return token;
  });

  // 1a. Mermaid Diagram Blocks -> Native Mermaid Container
  html = html.replace(/```mermaid\n([\s\S]*?)```/g, (match, code) => {
    const cleanCode = code.trim();
    const token = `@@@MERMAID_${codeBlocks.length}@@@`;
    codeBlocks.push(`<div class="my-6 w-full overflow-x-auto custom-scrollbar flex justify-center">
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

    const cleanCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

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

  // 1c. Inline Code Spans (`code`)
  html = html.replace(/`([^`\n]+)`/g, (match, code) => {
    const clean = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const token = `@@@INLINECODE_${inlineCodes.length}@@@`;
    inlineCodes.push(`<code class="px-1.5 py-0.5 rounded bg-[#18120B] border border-[#FF7A00]/30 font-mono text-xs sm:text-[13px] text-[#FFA439] font-medium">${clean}</code>`);
    return token;
  });

  // =========================================================================
  // STEP 2: MARKDOWN IMAGES & FIGURES (PROCESSED BEFORE KATEX)
  // Ensures alt attributes are clean text and cannot leak raw HTML or quotes
  // =========================================================================
  html = html.replace(/!\[(.*?)\]\((.*?)\)(?:\s*\n+\*([^*]+)\*)?/g, (match, alt, src, trailingCaption) => {
    const cleanSrc = src.trim();
    const resolvedSrc = CHAPTER_1_IMAGES && CHAPTER_1_IMAGES[cleanSrc] ? CHAPTER_1_IMAGES[cleanSrc] : cleanSrc;
    const rawCaption = (trailingCaption && trailingCaption.trim()) || (alt && alt.trim()) || '';

    // Sanitize alt attribute: remove all HTML tags, raw math delimiters, and encode double quotes
    const plainAlt = rawCaption
      .replace(/<[^>]+>/g, '')
      .replace(/\$([^$]+)\$/g, '$1')
      .replace(/\\\(|\\\)/g, '')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\times/g, 'x')
      .replace(/\\to/g, '->')
      .replace(/\\quad/g, ' ')
      .replace(/"/g, '&quot;')
      .trim() || 'Technical Diagram';

    return `<figure class="my-8 w-full overflow-hidden rounded-2xl border border-[#FF7A00]/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] bg-black/40">
      <img
        src="${resolvedSrc}"
        alt="${plainAlt}"
        class="w-full h-auto block rounded-t-2xl cursor-pointer hover:scale-[1.003] transition-transform duration-300"
        loading="lazy"
        decoding="async"
        onerror="if(this.src.endsWith('.png')){this.src=this.src.replace(/\\.png$/,'.svg');}else{this.onerror=null;this.style.display='none';if(this.nextElementSibling){this.nextElementSibling.style.display='block';}}"
      />
      <div style="display:none;" class="p-6 sm:p-8 bg-[#0B0D14] border-b border-[#FF7A00]/20 rounded-t-2xl text-center space-y-2.5">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7A00]/15 border border-[#FF7A00]/40 text-[#FFA439] text-xs font-mono font-bold uppercase">
          <span>TECHNICAL BLUEPRINT // ${plainAlt}</span>
        </div>
        <p class="text-xs sm:text-sm text-slate-300 font-sans max-w-xl mx-auto leading-relaxed">${rawCaption || 'Defensive architecture reference diagram.'}</p>
      </div>
      ${rawCaption ? `<figcaption class="py-2.5 px-4 text-center text-xs font-mono text-[#A3907C] border-t border-[#FF7A00]/20 bg-[#0B0907] flex items-center justify-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00]/80"></span><span>${rawCaption}</span></figcaption>` : ''}
    </figure>`;
  });

  // 2b. Malformed Image Syntax Fallback: handles !(url) or ![path]
  html = html.replace(/(?:!\[\]\(|!!\(|!\()([^)]+\.(?:jpg|jpeg|png|webp|svg|gif))\)/gi, (match, src) => {
    const cleanSrc = src.trim();
    const resolvedSrc = CHAPTER_1_IMAGES && CHAPTER_1_IMAGES[cleanSrc] ? CHAPTER_1_IMAGES[cleanSrc] : cleanSrc;
    return `<figure class="my-8 w-full overflow-hidden rounded-2xl border border-[#FF7A00]/30 shadow-[0_8px_30px_rgba(0,0,0,0.6)] bg-black/40">
      <img
        src="${resolvedSrc}"
        alt="Technical Reference Diagram"
        class="w-full h-auto block rounded-2xl cursor-pointer hover:scale-[1.003] transition-transform duration-300"
        loading="lazy"
        decoding="async"
        onerror="if(this.src.endsWith('.png')){this.src=this.src.replace(/\\.png$/,'.svg');}else{this.onerror=null;this.style.display='none';}"
      />
    </figure>`;
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
        throwOnError: false,
        output: 'html'
      });
      return `<div class="my-5 py-3 px-4 rounded-xl bg-[#0B0D14] border border-[#FF7A00]/25 shadow-lg overflow-x-auto custom-scrollbar flex justify-center text-center text-white">${rendered}</div>`;
    } catch (e) {
      return `<div class="my-5 p-3 rounded-lg bg-[#140D08] border border-red-500/30 font-mono text-xs text-red-300">${eq}</div>`;
    }
  });

  // 3b. Inline Equations: \(...\)
  html = html.replace(/\\\(([\s\S]*?)\\\)/g, (match, eq) => {
    const clean = cleanLatex(eq);
    if (!clean) return '';
    try {
      const rendered = katex.renderToString(clean, {
        displayMode: false,
        throwOnError: false,
        output: 'html'
      });
      return `<span class="inline-math inline-flex items-center align-middle whitespace-nowrap mx-0.5">${rendered}</span>`;
    } catch (e) {
      return match;
    }
  });

  // 3c. Inline Equations: $...$ (strict math tokens, excluding currency or shell vars)
  html = html.replace(/(?<![0-9a-zA-Z\\])\$([^\$\n\r]+?)\$(?![0-9a-zA-Z])/g, (match, eq) => {
    const clean = cleanLatex(eq);
    if (!clean) return match;
    try {
      const rendered = katex.renderToString(clean, {
        displayMode: false,
        throwOnError: false,
        output: 'html'
      });
      return `<span class="inline-math inline-flex items-center align-middle whitespace-nowrap mx-0.5">${rendered}</span>`;
    } catch (e) {
      return match;
    }
  });

  // =========================================================================
  // STEP 4: STANDARD MARKDOWN LINKS
  // =========================================================================
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => {
    const cleanHref = href.trim();
    return `<a href="${cleanHref}" target="_blank" rel="noopener noreferrer" class="text-[#FFA439] underline decoration-[#FF7A00]/40 hover:decoration-[#FF7A00] transition-colors">${text}</a>`;
  });

  // =========================================================================
  // STEP 5: HEADINGS (H1-H5) & MAJOR SECTION DIVIDERS
  // Major sections (##) are divided with a light, thin amber line (border-t border-[#FF7A00]/20)
  // Sub-sections (###, ####, #####) remain in continuous reading flow without dividers
  // =========================================================================
  // Clean up leading horizontal rules or rules immediately preceding major sections (##)
  html = html.replace(/^\s*---\s*\n+/g, '');
  html = html.replace(/(?:^---\s*\n+)+(?=##\s+)/gm, '');

  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-2xl sm:text-3xl font-bold font-lora text-white mt-8 mb-3 text-center border-b border-[#FF7A00]/25 pb-3">$1</h1>');

  let isFirstH2 = true;
  html = html.replace(/^##\s+(.+)$/gm, (match, heading) => {
    if (isFirstH2) {
      isFirstH2 = false;
      return `<h2 class="text-xl sm:text-2xl font-bold font-lora text-white mt-6 mb-3 text-center">${heading}</h2>`;
    }
    return `<hr class="my-8 border-t border-[#FF7A00]/20" />\n<h2 class="text-xl sm:text-2xl font-bold font-lora text-white mt-6 mb-3 text-center">${heading}</h2>`;
  });

  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-lg sm:text-xl font-bold font-lora text-[#FFA439] mt-6 mb-2 border-l-2 border-[#FF7A00] pl-3">$1</h3>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-base sm:text-lg font-bold font-lora text-white mt-4 mb-1.5 flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00]/70 flex-shrink-0"></span><span>$1</span></h4>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="text-sm sm:text-base font-semibold font-mono text-[#FFA439] mt-3 mb-1">$1</h5>');

  // =========================================================================
  // STEP 6: INLINE TYPOGRAPHY (BOLD, ITALIC, STRIKETHROUGH)
  // =========================================================================
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em class="italic text-[#E2D9CE]/90">$1</em>');
  html = html.replace(/~~(.+?)~~/g, '<del class="line-through text-[#8C7A6B]">$1</del>');

  // =========================================================================
  // STEP 7: HORIZONTAL RULES & BLOCKQUOTES
  // =========================================================================
  html = html.replace(/^---$/gm, '<hr class="my-8 border-t border-[#FF7A00]/20" />');

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

  // 9a. Unordered lists
  html = html.replace(/(?:^[-*]\s+.+(?:\n|$))+/gm, (listBlock) => {
    const rawItems = listBlock.trim().split('\n');

    // Check if this list is a term-definition list (e.g. - **Term:** Definition)
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
          return `<div class="py-1 border-l-2 border-[#FF7A00]/30 pl-3.5 my-1">
            <dt class="font-bold text-[#FFA439] font-lora text-[17px]">${term}</dt>
            <dd class="text-[#E2D9CE] font-lora text-[16px] leading-[1.6] mt-0.5">${def}</dd>
          </div>`;
        }
        return `<div class="py-1 text-[#E2D9CE] font-lora leading-relaxed">${clean}</div>`;
      }).join('\n');

      return `<dl class="my-3 space-y-1.5">${dlItems}</dl>`;
    }

    const items = rawItems
      .map((item) => `  <li class="flex items-start gap-2.5 text-[#E2D9CE] leading-[1.6] text-[17px] font-lora"><span class="w-1.5 h-1.5 rounded-full bg-[#FF7A00] mt-2 flex-shrink-0"></span><span class="flex-1">${item.replace(/^[-*]\s+/, '')}</span></li>`)
      .join('\n');
    return `<ul class="my-3 space-y-1.5 pl-1 sm:pl-2">${items}</ul>`;
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
      return `  <li class="flex items-start gap-2.5 text-[#E2D9CE] leading-[1.6] text-[17px] font-lora"><span class="font-mono text-[#FFA439] text-[15px] font-semibold flex-shrink-0 select-none">${itemNum}.</span><div class="flex-1 space-y-1">${itemBody}</div></li>`;
    }).join('\n');

    return `<ol class="my-3 space-y-2 pl-1 sm:pl-2">${items}</ol>`;
  });

  // Merge adjacent lists that had blank lines between items
  html = html.replace(/<\/ul>\s*<ul class="my-3 space-y-1\.5 pl-1 sm:pl-2">/g, '');
  html = html.replace(/<\/ol>\s*<ol class="my-3 space-y-2 pl-1 sm:pl-2">/g, '');
  html = html.replace(/<\/dl>\s*<dl class="my-3 space-y-1\.5">/g, '');

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
        trimmed.startsWith('@@@CODEBLOCK_') ||
        trimmed.startsWith('@@@MERMAID_') ||
        trimmed.startsWith('@@@MATHSTEPS_')
      ) {
        return trimmed;
      }
      return `<p class="font-lora text-[17px] leading-[1.6] text-[#E2D9CE] mb-3">${trimmed}</p>`;
    })
    .join('\n\n');

  // =========================================================================
  // STEP 11: RESTORE SHIELDED CODE BLOCKS & INLINE CODES
  // =========================================================================
  codeBlocks.forEach((block, idx) => {
    html = html.replace(`@@@CODEBLOCK_${idx}@@@`, block);
    html = html.replace(`@@@MERMAID_${idx}@@@`, block);
    html = html.replace(`@@@MATHSTEPS_${idx}@@@`, block);
  });

  inlineCodes.forEach((code, idx) => {
    html = html.replace(`@@@INLINECODE_${idx}@@@`, code);
  });

  return html;
}
