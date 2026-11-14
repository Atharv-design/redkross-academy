/**
 * Converts the library's hard-wrapped ASCII text (80 columns, two-space indented
 * blocks) into the Markdown dialect understood by src/utils/markdownParser.js.
 *
 * Rules (chosen to be lossless and conservative):
 *  - unindented lines form paragraphs; wrapped lines are joined;
 *    "Label: value" lines (Objective:, Context:, ...) start a new paragraph with a bold label
 *  - an indented run that is a clean list becomes a Markdown list
 *  - an indented run of "term   definition" rows becomes a two-column table
 *  - any other indented run (commands, aligned output, diagrams) becomes a fenced text block
 *  - BEGIN OUTPUT / END OUTPUT become a fenced output block
 */

const LIST_MARKER = /^(\d{1,2}[.)]|-|\*|[a-z][.)])\s+/;
const FIELD_LABEL = /^([A-Z][A-Za-z0-9 /&()'-]{1,48}):(\s+|$)/;

function indentOf(line) {
  const m = line.match(/^ */);
  return m ? m[0].length : 0;
}

function joinWrapped(lines) {
  let out = '';
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (!out) out = line;
    else if (/[A-Za-z0-9]-$/.test(out) && /^[a-z]/.test(line)) out += line; // "data-" + "handling"
    else if (/[A-Za-z0-9]\/$/.test(out)) out += line; // "safety/" + "stop"
    else out += ` ${line}`;
  }
  return out;
}

/** Inline clean-up for prose: protect characters the parser would treat as markup. */
export function inline(text) {
  let s = text;
  // tokens containing * (globs like *.pyc) would toggle emphasis
  s = s.replace(/(^|[\s(])([^\s`()]*\*[^\s`()]*)/g, (m, pre, tok) => `${pre}\`${tok}\``);
  // bare URLs -> links (strip trailing punctuation from the URL)
  s = s.replace(/(^|[\s(])(https?:\/\/[^\s)]+)/g, (m, pre, url) => {
    const trail = url.match(/[.,;:]+$/);
    const clean = trail ? url.slice(0, -trail[0].length) : url;
    return `${pre}[${clean}](${clean})${trail ? trail[0] : ''}`;
  });
  // a paragraph must not start with markdown block syntax
  if (/^(#|>|\d+\.\s|[-*+]\s)/.test(s)) s = `​${s}`;
  return s;
}

function proseToMarkdown(lines, opts) {
  const paras = [];
  let current = [];
  const flush = () => {
    if (current.length) paras.push(current);
    current = [];
  };
  for (const line of lines) {
    const lm = line.trim().match(FIELD_LABEL);
    // mid-paragraph, only short labels ("Context:", "Lessons:") start a new paragraph
    if (lm && current.length && opts.fieldLabels !== false && lm[1].split(' ').length <= 4) flush();
    current.push(line);
  }
  flush();
  return paras.map((p) => {
    const joined = joinWrapped(p);
    const m = opts.fieldLabels !== false ? joined.match(FIELD_LABEL) : null;
    // bold only short labels ("Objective:", "Expected observations:"), not sentences ending in a colon
    if (m && !/^https?$/i.test(m[1]) && m[1].split(' ').length <= 4) {
      const rest = joined.slice(m[0].length);
      return `**${m[1]}:** ${inline(rest)}`.trimEnd();
    }
    return inline(joined);
  });
}

function tryList(run, minIndent) {
  const items = [];
  let ordered = null;
  let contIndent = null;
  for (const line of run) {
    const ind = indentOf(line);
    const body = line.slice(ind);
    const m = ind === minIndent ? body.match(LIST_MARKER) : null;
    if (m) {
      const isOrdered = /^\d/.test(m[1]);
      if (ordered === null) ordered = isOrdered;
      items.push([body.slice(m[0].length)]);
      contIndent = minIndent + m[0].length;
    } else {
      if (!items.length || contIndent === null) return null;
      if (ind < contIndent - 1 || ind > contIndent + 1) return null; // deeper = code-like
      items[items.length - 1].push(body);
    }
  }
  if (!items.length) return null;
  return items
    .map((it, i) => `${ordered ? `${i + 1}.` : '-'} ${inline(joinWrapped(it))}`)
    .join('\n');
}

function tryDefinitionTable(run, minIndent) {
  const first = run[0].slice(minIndent);
  const gap = first.match(/^(\S(?:.*?\S)?)( {2,})(\S.*)$/);
  if (!gap || gap[1].length > 40) return null;
  const defCol = minIndent + gap[1].length + gap[2].length;
  const rows = [];
  for (const line of run) {
    const ind = indentOf(line);
    if (ind === minIndent) {
      const m = line.slice(minIndent).match(/^(\S(?:.*?\S)?)( {2,})(\S.*)$/);
      if (!m || m[1].length > 40) return null;
      rows.push([m[1], [m[3]]]);
    } else if (rows.length && ind >= defCol - 2 && ind <= defCol + 1) {
      rows[rows.length - 1][1].push(line.trim());
    } else {
      return null;
    }
  }
  if (rows.length < 2) return null;
  const cell = (s) => inline(s).replace(/\|/g, '&#124;');
  const out = ['| Term | Meaning |', '|---|---|'];
  for (const [term, def] of rows) out.push(`| ${cell(term)} | ${cell(joinWrapped(def))} |`);
  return out.join('\n');
}

function fence(lines, lang = 'text') {
  const nonEmpty = lines.filter((l) => l.trim());
  const min = nonEmpty.length ? Math.min(...nonEmpty.map(indentOf)) : 0;
  const body = lines.map((l) => l.slice(Math.min(min, indentOf(l)))).join('\n').replace(/```/g, "'''");
  return `\`\`\`${lang}\n${body.replace(/\s+$/, '')}\n\`\`\``;
}

function indentedToMarkdown(run) {
  const nonEmpty = run.filter((l) => l.trim());
  const minIndent = Math.min(...nonEmpty.map(indentOf));
  return tryList(nonEmpty, minIndent) || tryDefinitionTable(nonEmpty, minIndent) || fence(run);
}

/**
 * @param {string} text  raw library text (one section)
 * @param {{fieldLabels?: boolean}} opts
 */
export function txtToMarkdown(text, opts = {}) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let i = 0;
  let textBuf = [];
  const flushText = () => {
    if (textBuf.length) blocks.push({ type: 'text', lines: textBuf });
    textBuf = [];
  };
  while (i < lines.length) {
    const t = lines[i].trim();
    if (t === 'BEGIN OUTPUT') {
      flushText();
      const out = [];
      i++;
      while (i < lines.length && lines[i].trim() !== 'END OUTPUT') out.push(lines[i++]);
      i++;
      blocks.push({ type: 'fence', md: fence(out, 'output') });
      continue;
    }
    if (t === '[BEGIN DIAGRAM]') {
      flushText();
      const out = [];
      i++;
      while (i < lines.length && lines[i].trim() !== '[END DIAGRAM]') out.push(lines[i++]);
      i++;
      blocks.push({ type: 'fence', md: fence(out, 'text') });
      continue;
    }
    if (/^[=~]{4,}$/.test(t)) {
      i++;
      continue;
    }
    textBuf.push(lines[i]);
    i++;
  }
  flushText();

  const md = [];
  for (const block of blocks) {
    if (block.type === 'fence') {
      md.push(block.md);
      continue;
    }
    // split into chunks on blank lines, then into runs of equal "indentedness"
    const chunks = [];
    let cur = [];
    for (const line of block.lines) {
      if (!line.trim()) {
        if (cur.length) chunks.push(cur);
        cur = [];
      } else cur.push(line);
    }
    if (cur.length) chunks.push(cur);

    for (const chunk of chunks) {
      let run = [];
      let runIndented = null;
      const emit = () => {
        if (!run.length) return;
        if (runIndented) md.push(indentedToMarkdown(run));
        else md.push(...proseToMarkdown(run, opts));
        run = [];
      };
      for (const line of chunk) {
        const indented = indentOf(line) >= 2;
        if (runIndented !== null && indented !== runIndented) emit();
        runIndented = indented;
        run.push(line);
      }
      emit();
    }
  }
  return md.join('\n\n');
}
