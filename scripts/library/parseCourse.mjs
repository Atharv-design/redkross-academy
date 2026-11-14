/**
 * Parser for RedKross Academy library course files (COURSE_NN_*.txt).
 * Produces a structured object; throws on any structural surprise so a malformed
 * file can never be half-imported.
 */

const DASH = /^-{20,}$/;
const HASH = /^#{20,}$/;

function assert(cond, msg) {
  if (!cond) throw new Error(`[parseCourse] ${msg}`);
}

function sliceBetween(lines, startIdx, endIdx) {
  return lines.slice(startIdx, endIdx).join('\n').replace(/^\n+|\n+$/g, '');
}

/** Splits text into blocks starting at lines matching `re`; returns [{match, body}] */
function splitBlocks(text, re) {
  const lines = text.split('\n');
  const blocks = [];
  let cur = null;
  for (const line of lines) {
    const m = line.match(re);
    if (m) {
      if (cur) blocks.push(cur);
      cur = { match: m, lines: [] };
    } else if (cur) cur.lines.push(line);
  }
  if (cur) blocks.push(cur);
  return blocks.map((b) => ({ match: b.match, body: b.lines.join('\n').replace(/^\n+|\n+$/g, '') }));
}

function parseSections(moduleLines) {
  // a section heading is "N. TITLE" sandwiched between two dashed lines
  const sections = {};
  const heads = [];
  for (let i = 1; i < moduleLines.length - 1; i++) {
    if (!DASH.test(moduleLines[i - 1])) continue;
    const m = moduleLines[i].match(/^(\d)\. (.+)$/);
    if (!m) continue;
    // the heading may wrap onto up to two further lines before the closing dashes
    let close = -1;
    for (let k = i + 1; k <= i + 3 && k < moduleLines.length; k++) {
      if (DASH.test(moduleLines[k])) {
        close = k;
        break;
      }
    }
    if (close < 0) continue;
    const title = [m[2], ...moduleLines.slice(i + 1, close)].join(' ').trim();
    heads.push({ n: Number(m[1]), title, at: i, bodyStart: close + 1 });
  }
  heads.forEach((h, idx) => {
    const end = idx + 1 < heads.length ? heads[idx + 1].at - 1 : moduleLines.length;
    sections[h.n] = { title: h.title, text: sliceBetween(moduleLines, h.bodyStart, end) };
  });
  const header = sliceBetween(moduleLines, 0, heads.length ? heads[0].at - 1 : moduleLines.length);
  return { header, sections };
}

/** Parses "MCQ X" blocks: question text then A-D options (options may wrap). */
export function parseMcqBlock(idRaw, firstLineRest, body) {
  const lines = [firstLineRest || '', ...body.split('\n')];
  const q = [];
  const options = [];
  for (const line of lines) {
    const om = line.match(/^\s+([A-D])\.\s+(.*)$/);
    if (om) {
      options.push(om[2].trim());
    } else if (options.length && line.trim()) {
      options[options.length - 1] += ` ${line.trim()}`;
    } else if (!options.length && line.trim()) {
      q.push(line.trim());
    }
  }
  return { id: idRaw, q: q.join(' ').trim(), options };
}

function parseModuleAssessment(text, tag) {
  const aIdx = text.indexOf('7.A ');
  const bIdx = text.indexOf('7.B ');
  const cIdx = text.indexOf('7.C ');
  assert(aIdx >= 0 && bIdx > aIdx && cIdx > bIdx, `${tag}: assessment subsections missing`);
  const mcqText = text.slice(aIdx, bIdx);
  const scenText = text.slice(bIdx, cIdx);
  const keyText = text.slice(cIdx);

  const mcqs = splitBlocks(mcqText, /^MCQ (C\d\d-M\d\d-Q\d\d)\s*(.*)$/).map((b) =>
    parseMcqBlock(b.match[1], b.match[2], b.body)
  );
  const scenarios = splitBlocks(scenText, /^SCENARIO (C\d\d-M\d\d-S\d)\s*$/).map((b) => ({
    id: b.match[1],
    text: b.body,
  }));

  const keyBlocks = splitBlocks(keyText, /^(C\d\d-M\d\d-(?:Q\d\d|S\d))\s+(Correct answer: ([A-D])|Expected answer:)\s*(.*)$/);
  const answers = {};
  const expected = {};
  for (const b of keyBlocks) {
    const id = b.match[1];
    if (b.match[3]) {
      const expl = b.body.replace(/^Explanation:\s*/, '').replace(/\s*\n\s*/g, ' ').trim();
      answers[id] = { letter: b.match[3], explanation: expl };
    } else {
      expected[id] = [b.match[4], b.body].filter(Boolean).join('\n');
    }
  }
  for (const m of mcqs) {
    assert(m.options.length === 4, `${m.id}: expected 4 options, got ${m.options.length}`);
    assert(m.q, `${m.id}: empty question`);
    assert(answers[m.id], `${m.id}: no answer key`);
    m.correct = 'ABCD'.indexOf(answers[m.id].letter);
    m.explanation = answers[m.id].explanation || '';
  }
  for (const s of scenarios) s.expected = expected[s.id] || '';
  return { mcqs, scenarios };
}

function parseModule(code, num, title, moduleText) {
  const lines = moduleText.split('\n');
  const { header, sections } = parseSections(lines);
  const tag = `${code}-M${String(num).padStart(2, '0')}`;
  for (const n of [1, 2, 3, 4, 5, 6, 7, 8, 9]) assert(sections[n], `${tag}: section ${n} missing`);

  const intro = {};
  for (const b of splitBlocks(sections[1].text, /^1\.(\d) (.+)$/)) {
    intro[Number(b.match[1])] = { title: b.match[2].trim(), body: b.body };
  }

  const lessons = splitBlocks(sections[2].text, /^LESSON (C\d\d-M\d\d-L\d\d): (.+)$/).map((b) => ({
    code: b.match[1],
    title: b.match[2].trim(),
    body: b.body.replace(/^[=]{4,}\n/, ''),
  }));
  assert(lessons.length >= 4, `${tag}: only ${lessons.length} lessons`);

  const deepTitle = sections[3].title.replace(/^TECHNICAL DEEP DIVE\s*[:\-]?\s*/i, '').trim();

  const cases = splitBlocks(sections[4].text, /^CASE STUDY (C\d\d-M\d\d-CS\d)(.*)$/).map((b) => {
    // the title can wrap onto following lines until the first blank line
    const bodyLines = b.body.split('\n');
    let titleTail = b.match[2];
    let k = 0;
    while (k < bodyLines.length && bodyLines[k].trim()) {
      titleTail += ` ${bodyLines[k].trim()}`;
      k++;
    }
    const cleanTitle = titleTail.replace(/^[\s:]+/, '').trim();
    return { code: b.match[1], title: cleanTitle, body: bodyLines.slice(k).join('\n').trim() };
  });

  const practicals = splitBlocks(sections[5].text, /^PRACTICAL (C\d\d-M\d\d-P\d)[^:]*: (.+)$/).map((b) => ({
    code: b.match[1],
    title: b.match[2].trim(),
    body: b.body,
  }));

  const figures = splitBlocks(sections[6].text, /^FIGURE (C\d\d-M\d\d-F\d): (.+)$/).map((b) => {
    const capIdx = b.body.search(/^Caption:/m);
    const accIdx = b.body.search(/^Accessibility description:/m);
    const diagram = b.body.slice(0, capIdx >= 0 ? capIdx : b.body.length);
    const caption =
      capIdx >= 0
        ? b.body.slice(capIdx, accIdx >= 0 ? accIdx : undefined).replace(/^Caption:\s*/, '').replace(/\s*\n\s*/g, ' ').trim()
        : '';
    const alt = accIdx >= 0 ? b.body.slice(accIdx).replace(/^Accessibility description:\s*/, '').replace(/\s*\n\s*/g, ' ').trim() : '';
    return { code: b.match[1], title: b.match[2].trim(), diagram, caption, alt };
  });

  const assessment = parseModuleAssessment(sections[7].text, tag);

  return {
    num,
    code: tag,
    title,
    header,
    intro,
    lessons,
    deepDive: { title: deepTitle, body: sections[3].text },
    cases,
    practicals,
    figures,
    mcqs: assessment.mcqs,
    scenarios: assessment.scenarios,
    revision: sections[8].text,
    references: sections[9].text,
  };
}

function parsePartC(text, code) {
  const out = {};
  const lines = text.split('\n');
  const heads = [];
  for (let i = 0; i < lines.length - 1; i++) {
    const m = lines[i].match(/^C(\d)\. (.+)$/);
    if (!m) continue;
    // underline may follow a wrapped title line
    const close = /^-{5,}$/.test(lines[i + 1]) ? i + 1 : /^-{5,}$/.test(lines[i + 2] || '') ? i + 2 : -1;
    if (close < 0) continue;
    const title = [m[2], ...lines.slice(i + 1, close)].join(' ').trim();
    heads.push({ n: Number(m[1]), title, at: i, bodyStart: close + 1 });
  }
  heads.forEach((h, idx) => {
    const end = idx + 1 < heads.length ? heads[idx + 1].at : lines.length;
    out[h.n] = { title: h.title, text: sliceBetween(lines, h.bodyStart, end) };
  });
  assert(out[3], `${code}: C3 course assessment missing`);

  const c3 = out[3].text;
  // some files label C3.A / C3.B, others go straight from the MCQs to "COURSE TASK" blocks
  const cIdx = c3.search(/^C3\.C /m);
  const bLabel = c3.search(/^C3\.B /m);
  const bIdx = bLabel >= 0 ? bLabel : c3.search(/^COURSE TASK /m);
  assert(bIdx > 0 && cIdx > bIdx, `${code}: C3 subsections missing`);
  const mcqs = splitBlocks(c3.slice(0, bIdx), /^COURSE MCQ (C\d\d-CQ\d\d)\s*(.*)$/).map((b) =>
    parseMcqBlock(b.match[1], b.match[2], b.body)
  );
  const tasks = c3.slice(bIdx, cIdx).replace(/^C3\.B[^\n]*\n/, '').trim();
  const keyText = c3.slice(cIdx);
  const key = {};
  for (const m of keyText.matchAll(/\bCQ(\d\d)\s+([A-D])\b/g)) key[`${code}-CQ${m[1]}`] = m[2];
  for (const m of mcqs) {
    assert(m.options.length === 4, `${m.id}: expected 4 options, got ${m.options.length}`);
    assert(key[m.id], `${m.id}: no answer key`);
    m.correct = 'ABCD'.indexOf(key[m.id]);
    m.explanation = '';
  }
  return { sections: out, mcqs, tasks };
}

export function parseCourse(raw) {
  const text = raw.replace(/\r\n/g, '\n');
  const lines = text.split('\n');
  const titleLine = lines.find((l) => /^COURSE \d\d: /.test(l));
  assert(titleLine, 'course title line missing');
  const num = Number(titleLine.match(/^COURSE (\d\d)/)[1]);
  const code = `C${String(num).padStart(2, '0')}`;

  const idxA = lines.indexOf('PART A - COURSE INFORMATION');
  const idxB = lines.indexOf('PART B - MODULES');
  const idxC = lines.findIndex((l) => l.startsWith('PART C - COURSE COMPLETION'));
  const idxI = lines.findIndex((l) => l.startsWith('INSTRUCTOR-ONLY SECTION'));
  assert(idxA > 0 && idxB > idxA && idxC > idxB && idxI > idxC, `${code}: part markers missing`);

  // Course header (before Part A): keep the learner-facing notes, drop file metadata
  const headerLines = lines.slice(4, idxA - 1);
  // everything after the "How to read this file" paragraph is learner-facing (labs, safety, standards)
  const howTo = headerLines.findIndex((l) => l.startsWith('How to read this file'));
  let firstNote = -1;
  if (howTo >= 0) {
    let k = howTo + 2;
    while (k < headerLines.length && headerLines[k].trim()) k++;
    firstNote = k + 1;
  }
  const preface = firstNote >= 0 ? headerLines.slice(firstNote).join('\n').replace(/\n=+\s*$/, '').trim() : '';

  const partA = {};
  for (const b of splitBlocks(sliceBetween(lines, idxA + 2, idxB - 1), /^A(\d+)\. (.+)$/)) {
    partA[Number(b.match[1])] = b.body;
  }
  for (const n of [1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14]) assert(partA[n] !== undefined, `${code}: A${n} missing`);

  // Modules
  const modules = [];
  const partB = lines.slice(idxB + 2, idxC - 1);
  const starts = [];
  partB.forEach((l, i) => {
    const m = l.match(/^MODULE (C\d\d)-M(\d\d): (.+)$/);
    if (m && HASH.test(partB[i - 1] || '')) starts.push({ i, num: Number(m[2]), title: m[3].trim() });
  });
  assert(starts.length === 8, `${code}: expected 8 modules, found ${starts.length}`);
  starts.forEach((s, k) => {
    const end = k + 1 < starts.length ? starts[k + 1].i - 1 : partB.length;
    const body = partB.slice(s.i + 2, end).join('\n');
    modules.push(parseModule(code, s.num, s.title, body));
  });

  const partC = parsePartC(sliceBetween(lines, idxC + 2, idxI - 1), code);

  return {
    num,
    code,
    title: partA[1].trim(),
    preface,
    partA,
    modules,
    partC,
  };
}
