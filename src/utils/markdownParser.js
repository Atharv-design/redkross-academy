/**
 * High-Craft Markdown Parser for RedKross Academy
 * Transforms raw markdown into semantic, styled HTML matching Obsidian Dark theme.
 */
export function renderMarkdownToHtml(markdown = '') {
  if (!markdown || typeof markdown !== 'string') return '';

  let html = markdown;

  // 1. Normalize line endings
  html = html.replace(/\r\n/g, '\n');

  // 2. Fenced Code Blocks (```lang ... ``` or ``` ... ```)
  html = html.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const languageClass = lang ? `language-${lang}` : '';
    const cleanCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<div class="my-4 rounded-xl overflow-hidden border border-[#263440] bg-[#071018] shadow-lg">
      <div class="px-4 py-1.5 bg-[#101923] border-b border-[#263440] flex items-center justify-between text-[10px] font-mono text-[#94A3B8]">
        <span>${lang ? lang.toUpperCase() : 'TERMINAL'}</span>
        <span class="text-[#65F58A]">EXECUTE LAB</span>
      </div>
      <pre class="p-4 overflow-x-auto font-mono text-xs text-[#65F58A] leading-relaxed"><code class="${languageClass}">${cleanCode}</code></pre>
    </div>`;
  });

  // 3. Blockquotes (> text)
  html = html.replace(/^> (.*)$/gim, '<blockquote class="border-l-4 border-[#65F58A] pl-4 py-2 text-slate-300 bg-[#101923] rounded-r-lg text-xs my-3 italic font-lora">$1</blockquote>');

  // 4. Headings
  html = html.replace(/^#### (.*)$/gim, '<h4 class="text-sm font-bold text-[#35E6B5] mt-4 mb-2 font-lora">$1</h4>');
  html = html.replace(/^### (.*)$/gim, '<h3 class="text-base sm:text-lg font-bold text-white mt-5 mb-2 font-lora">$1</h3>');
  html = html.replace(/^## (.*)$/gim, '<h2 class="text-lg sm:text-xl font-bold text-[#65F58A] mt-6 mb-3 font-lora flex items-center gap-2 border-b border-[#263440]/60 pb-1.5">$1</h2>');
  html = html.replace(/^# (.*)$/gim, '<h1 class="text-xl sm:text-2xl font-extrabold text-white mt-2 mb-4 font-lora tracking-tight border-b border-[#263440] pb-2">$1</h1>');

  // 5. Bold & Italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-slate-200">$1</em>');

  // 6. Inline Code (`code`)
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[#071018] border border-[#263440] text-[#65F58A] font-mono text-[11px]">$1</code>');

  // 7. Bullet Lists (- item or * item)
  html = html.replace(/(?:^[-*]\s+.+(?:\n|$))+/gm, (listBlock) => {
    const items = listBlock
      .trim()
      .split('\n')
      .map((item) => `  <li class="flex items-start gap-2 text-slate-300"><span class="text-[#65F58A] mt-1">•</span><span>${item.replace(/^[-*]\s+/, '')}</span></li>`)
      .join('\n');
    return `<ul class="my-3 space-y-1.5 pl-1">${items}</ul>`;
  });

  // 8. Numbered Lists (1. item)
  html = html.replace(/(?:^\d+\.\s+.+(?:\n|$))+/gm, (listBlock) => {
    let num = 1;
    const items = listBlock
      .trim()
      .split('\n')
      .map((item) => `  <li class="flex items-start gap-2 text-slate-300"><span class="font-mono text-[#65F58A] text-xs font-bold">${num++}.</span><span>${item.replace(/^\d+\.\s+/, '')}</span></li>`)
      .join('\n');
    return `<ol class="my-3 space-y-1.5 pl-1">${items}</ol>`;
  });

  // 9. Paragraphs (lines separated by double newlines that aren't already html tags)
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
        trimmed.startsWith('<pre') ||
        trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<ul') ||
        trimmed.startsWith('<ol')
      ) {
        return trimmed;
      }
      return `<p class="my-2.5 leading-relaxed text-slate-300 font-lora text-xs sm:text-sm">${trimmed}</p>`;
    })
    .join('\n\n');

  return html;
}
