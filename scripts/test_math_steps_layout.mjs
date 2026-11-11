import fs from 'fs';
import katex from 'katex';

function renderMathStepsBlock(blockText, blockTitle = 'Sequential Technical Calculation') {
  const lines = blockText.trim().split('\n').filter(l => l.trim().length > 0);
  const steps = [];
  let currentStep = null;

  for (const line of lines) {
    const trimmed = line.trim();
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
        eqHtml = katex.renderToString(cleanEq, {
          displayMode: true,
          throwOnError: false,
          output: 'html'
        });
      } catch (e) {
        eqHtml = `<span class="font-mono text-xs text-[#FFA439]">${cleanEq}</span>`;
      }
    }

    return `<div class="p-3.5 sm:p-4 rounded-xl bg-[#070A0F] border border-[#FF7A00]/20 flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 hover:border-[#FF7A00]/40 transition-colors shadow-sm">
      <div class="flex items-start gap-3 flex-1 min-w-0">
        <span class="px-2.5 py-1 rounded-md bg-[#1F1308] border border-[#FF7A00]/40 font-mono text-xs font-bold text-[#FFA439] flex-shrink-0 select-none">${s.number}</span>
        <div class="space-y-1 min-w-0">
          <div class="text-[15px] font-lora text-[#E2D9CE] leading-relaxed">${s.description}</div>
          ${s.result ? `<div class="text-xs font-mono text-[#65F58A] flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-[#65F58A]"></span><span>${s.result}</span></div>` : ''}
        </div>
      </div>
      ${eqHtml ? `<div class="not-prose math-step-formula w-full lg:w-auto lg:max-w-[62%] min-w-0 overflow-x-auto custom-scrollbar py-2 px-3.5 rounded-lg bg-[#0E0C09] border border-[#FF7A00]/20 text-right flex-shrink-0">${eqHtml}</div>` : ''}
    </div>`;
  }).join('\n');

  return `<div class="not-prose my-6 rounded-2xl border border-[#FF7A00]/30 bg-[#0B0D14] overflow-hidden shadow-2xl">
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

const sample = `:::math-steps
Step 01: Extract Virtual Page Number | $$VPN = \\lfloor \\frac{\\text{Virtual Address}}{4096} \\rfloor = \\text{Virtual Address} \\gg 12$$
Result: Indexes the active Page Table Directory structure.
Step 02: Calculate Frame Offset | $$\\text{Offset} = \\text{Virtual Address} \\pmod{4096} = \\text{Virtual Address} \\ \\& \\ 0\\text{xFFF}$$
Result: Exact byte offset within the 4 KB page boundary.
Step 03: Synthesize Physical Address | $$\\text{Address}_{\\text{physical}} = (\\text{PFN} \\times 4096) + \\text{Offset}$$
Result: Hardware bus address dispatched to system RAM.
:::`;

const rendered = renderMathStepsBlock(sample);
console.log('Math steps rendered length:', rendered.length);
console.log('Includes not-prose:', rendered.includes('not-prose'));
console.log('Includes math-step-formula:', rendered.includes('math-step-formula'));
