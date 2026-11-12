import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const repoRoot = process.cwd();
const args = process.argv.slice(2);
const lessonsOnly = args.includes('--lessons-only');

let baselinePath = null;
for (let i = 0; i < args.length; i++) {
  if ((args[i] === '--baseline' || args[i] === '--check-baseline') && args[i + 1]) {
    baselinePath = args[i + 1];
    i++;
  }
}

const course04IndexUrl = pathToFileURL(path.join(repoRoot, 'src/services/db/course04/index.js')).href;
const course04EngineUrl = pathToFileURL(path.join(repoRoot, 'src/services/db/course04/course04Engine.js')).href;

const { course04Data } = await import(course04IndexUrl);
const { COURSE04_MODULE_BANKS } = await import(course04EngineUrl);

function stripFencesOnly(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/```[\s\S]*?```/g, (m) => {
    const lines = m.split('\n').length;
    return Array(lines).fill('[CODE_FENCE]').join('\n');
  });
}

function stripCodeAndBackticks(text) {
  if (typeof text !== 'string') return '';
  let out = stripFencesOnly(text);
  out = out.replace(/``[^`]+``/g, '[CODE]');
  out = out.replace(/`[^`\n]+`/g, '[CODE]');
  return out;
}

const PROHIBITED_HEADING_RE = /^[ \t]*#{1,6}\s*[^\n]*\b(?:Verified\s+References|Authoritative\s+References|Module\s+References|References|Bibliography|Further\s+Reading|Works\s+Cited|Sources)\b[^\n]*$/gim;
const C04_TAG_RE = /\[C04-M\d+-R\d+\]/g;
const SHORT_REF_TAG_RE = /(?<![A-Za-z0-9_])\[R\d+\]/g;
const NUMERIC_CITATION_RE = /(?<![A-Za-z0-9_)\]])\[\d{1,3}\](?!\()/g;
const PROSE_URL_RE = /https?:\/\/[^\s)>"'`]+/gi;
const NON_IMAGE_LINK_RE = /(?<!\!)\[[^\]]+\]\(([^)]+)\)/g;
const INTERNAL_PATH_RE = /(?:public\/assets\/|scratch\/|LAB_ASSETS\/|src\/(?:services|pages|components|utils)\/|RK course notes)/gi;
const ATTRIBUTION_RE = /\bAccessed:\s*\d{4}-\d{2}-\d{2}|\bAccessed\s+\d{4}-\d{2}-\d{2}|\bRedKross\s+(?:Academy\s+)?Lab\s+Evidence\b/gi;

function scanProseField(fieldValue, fieldName) {
  const issues = [];
  if (typeof fieldValue !== 'string' || !fieldValue) return issues;

  const noFences = stripFencesOnly(fieldValue);
  const noCode = stripCodeAndBackticks(fieldValue);

  const headings = noFences.match(PROHIBITED_HEADING_RE) || [];
  if (headings.length > 0) {
    issues.push(`${fieldName}: prohibited heading (${headings.map((h) => h.trim()).join(' | ')})`);
  }

  const c04Tags = fieldValue.match(C04_TAG_RE) || [];
  if (c04Tags.length > 0) {
    issues.push(`${fieldName}: citation tags (${c04Tags.length}: ${[...new Set(c04Tags)].join(', ')})`);
  }

  const shortTags = fieldValue.match(SHORT_REF_TAG_RE) || [];
  if (shortTags.length > 0) {
    issues.push(`${fieldName}: short citation tags (${shortTags.join(', ')})`);
  }

  const numCitations = noCode.match(NUMERIC_CITATION_RE) || [];
  if (numCitations.length > 0) {
    issues.push(`${fieldName}: numeric citation markers outside code (${numCitations.join(', ')})`);
  }

  const proseUrls = noCode.match(PROSE_URL_RE) || [];
  if (proseUrls.length > 0) {
    issues.push(`${fieldName}: external URLs outside code (${proseUrls.join(', ')})`);
  }

  const mdLinks = [...fieldValue.replace(/!\[[^\]]*\]\([^)]+\)/g, '').matchAll(NON_IMAGE_LINK_RE)]
    .map((m) => `${m[0]}`);
  if (mdLinks.length > 0) {
    issues.push(`${fieldName}: prohibited clickable Markdown links (${mdLinks.join(', ')})`);
  }

  const internalPaths = fieldValue.match(INTERNAL_PATH_RE) || [];
  if (internalPaths.length > 0) {
    issues.push(`${fieldName}: exposed internal paths (${[...new Set(internalPaths)].join(', ')})`);
  }

  const attributions = fieldValue.match(ATTRIBUTION_RE) || [];
  if (attributions.length > 0) {
    issues.push(`${fieldName}: source attribution phrases (${attributions.join(', ')})`);
  }

  return issues;
}

const lessonViolations = [];
const labResourceErrors = [];

for (const mod of course04Data.modules) {
  for (const les of mod.lessons) {
    const issues = [
      ...scanProseField(les.content, 'content'),
      ...scanProseField(les.summary, 'summary'),
      ...(Array.isArray(les.learning_objectives)
        ? les.learning_objectives.flatMap((obj, idx) => scanProseField(obj, `learning_objectives[${idx}]`))
        : [])
    ];

    if (issues.length > 0) {
      lessonViolations.push({ moduleId: mod.id, lessonId: les.id, issues });
    }

    if (les.lab_resources !== undefined) {
      if (!Array.isArray(les.lab_resources)) {
        labResourceErrors.push(`${les.id}: lab_resources must be an array`);
      } else {
        for (const item of les.lab_resources) {
          if (!item || typeof item.name !== 'string' || !item.name.trim()) {
            labResourceErrors.push(`${les.id}: lab_resources item missing name`);
          }
          if (!item || typeof item.url !== 'string' || !item.url.startsWith('/assets/courses/cyber-04/labs/')) {
            labResourceErrors.push(`${les.id}: invalid lab_resources url "${item?.url}"`);
          } else {
            const diskPath = path.join(repoRoot, 'public', item.url.slice(1));
            if (!fs.existsSync(diskPath)) {
              labResourceErrors.push(`${les.id}: missing physical lab file "${diskPath}"`);
            }
          }
        }
      }
    }
  }
}

const quizViolations = [];

function scanQuestion(q, sourceLabel) {
  const fields = [
    ['q', q.q],
    ['text', q.text],
    ['explanation', q.explanation],
    ...(Array.isArray(q.options) ? q.options.map((o, idx) => [`options[${idx}]`, o]) : [])
  ];

  const found = [];
  for (const [fname, fval] of fields) {
    if (typeof fval !== 'string' || !fval) continue;
    const noCode = stripCodeAndBackticks(fval);
    const c04 = fval.match(C04_TAG_RE) || [];
    const sr = fval.match(SHORT_REF_TAG_RE) || [];
    const refPhrase = fval.match(/\b(?:Verified\s+References|Authoritative\s+References)\b/gi) || [];
    const attr = fval.match(ATTRIBUTION_RE) || [];
    const intp = fval.match(INTERNAL_PATH_RE) || [];
    const url = noCode.match(PROSE_URL_RE) || [];

    if (c04.length || sr.length || refPhrase.length || attr.length || intp.length || url.length) {
      found.push(`${fname}: ${[...c04, ...sr, ...refPhrase, ...attr, ...intp, ...url].join(', ')}`);
    }
  }
  if (found.length > 0) {
    quizViolations.push({ source: sourceLabel, id: q.id, issues: found });
  }
}

if (!lessonsOnly) {
  for (let m = 1; m <= 8; m++) {
    const bank = COURSE04_MODULE_BANKS[String(m)];
    if (!Array.isArray(bank)) {
      quizViolations.push({ source: `bank_m${m}`, id: 'MISSING', issues: ['Bank missing'] });
      continue;
    }
    for (const q of bank) {
      scanQuestion(q, `COURSE04_MODULE_BANKS[${m}]`);
    }
  }

  for (const mod of course04Data.modules) {
    for (const q of mod.quiz?.questions || []) {
      scanQuestion(q, `${mod.id}.quiz.questions`);
    }
  }
}

const baselineErrors = [];
if (baselinePath) {
  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf8'));

  if (course04Data.id !== baseline.courseId) {
    baselineErrors.push(`Course ID mismatch: ${course04Data.id} !== ${baseline.courseId}`);
  }
  if (course04Data.modules.length !== baseline.moduleCount) {
    baselineErrors.push(`Module count mismatch: ${course04Data.modules.length} !== ${baseline.moduleCount}`);
  }

  let liveSlots = 0;
  let liveLessons = 0;
  for (let mIdx = 0; mIdx < baseline.modules.length; mIdx++) {
    const bMod = baseline.modules[mIdx];
    const lMod = course04Data.modules[mIdx];
    if (!lMod) continue;

    if (lMod.id !== bMod.id || lMod.title !== bMod.title) {
      baselineErrors.push(`Module ${mIdx + 1} id/title changed: ${lMod.id}/${lMod.title} vs ${bMod.id}/${bMod.title}`);
    }
    if (lMod.lessons.length !== bMod.lessonCount) {
      baselineErrors.push(`Module ${lMod.id} lesson count changed: ${lMod.lessons.length} vs ${bMod.lessonCount}`);
    }

    if (!lessonsOnly) {
      const lQuiz = (lMod.quiz?.questions || []).map((q) => ({ id: q.id, correct: q.correct }));
      if (JSON.stringify(lQuiz) !== JSON.stringify(bMod.quizQuestionIds)) {
        baselineErrors.push(`Module ${lMod.id} embedded quiz IDs or correct answers changed`);
      }
    }

    for (let lIdx = 0; lIdx < bMod.lessons.length; lIdx++) {
      const bLes = bMod.lessons[lIdx];
      const lLes = lMod.lessons[lIdx];
      if (!lLes) continue;
      liveLessons++;
      const lSlots = Array.isArray(lLes.diagram_slots) ? lLes.diagram_slots : [];
      const lImgs = Array.isArray(lLes.images) ? lLes.images : [];
      liveSlots += lSlots.length;

      if (lLes.id !== bLes.id || lLes.title !== bLes.title || (lLes.order ?? null) !== bLes.order) {
        baselineErrors.push(`Lesson ${bLes.id} order/id/title changed -> ${lLes.id}/${lLes.title}`);
      }
      if (JSON.stringify(lSlots) !== JSON.stringify(bLes.diagram_slots)) {
        baselineErrors.push(`Lesson ${lLes.id} diagram_slots mutated`);
      }
      if (JSON.stringify(lImgs) !== JSON.stringify(bLes.images)) {
        baselineErrors.push(`Lesson ${lLes.id} images[] mutated`);
      }

      const lContent = lLes.content || '';
      const lMathSteps = (lContent.match(/:::math-steps/g) || []).length;
      const lDisplayMath = (lContent.match(/\$\$/g) || []).length;
      const lFences = (lContent.match(/```/g) || []).length;

      if (lMathSteps !== bLes.katexMathStepsCount) {
        baselineErrors.push(`Lesson ${lLes.id} :::math-steps count changed: ${lMathSteps} vs ${bLes.katexMathStepsCount}`);
      }
      if (lDisplayMath !== bLes.katexDisplayBlockCount) {
        baselineErrors.push(`Lesson ${lLes.id} $$ block delimiter count changed: ${lDisplayMath} vs ${bLes.katexDisplayBlockCount}`);
      }
      if (lFences !== bLes.codeFenceCount) {
        baselineErrors.push(`Lesson ${lLes.id} code fence count changed: ${lFences} vs ${bLes.codeFenceCount}`);
      }
    }
  }

  if (liveLessons !== baseline.totalLessons) {
    baselineErrors.push(`Total lessons mismatch: ${liveLessons} vs ${baseline.totalLessons}`);
  }
  if (liveSlots !== baseline.totalDiagramSlots) {
    baselineErrors.push(`Total diagram_slots mismatch: ${liveSlots} vs ${baseline.totalDiagramSlots}`);
  }

  if (!lessonsOnly) {
    for (const [modNum, bBank] of Object.entries(baseline.questionBanks)) {
      const lBank = COURSE04_MODULE_BANKS[modNum] || [];
      const lSnap = lBank.map((q) => ({
        id: q.id,
        difficulty: q.difficulty,
        correct: q.correct,
        optionsLength: Array.isArray(q.options) ? q.options.length : 0
      }));
      if (JSON.stringify(lSnap) !== JSON.stringify(bBank)) {
        baselineErrors.push(`Question bank M${modNum} structure/correct indices changed`);
      }
    }
  }
}

console.log(`Course 04 Policy Check (${lessonsOnly ? 'lessons-only' : 'full'})`);
console.log(`- Flagged lessons: ${lessonViolations.length}`);
for (const v of lessonViolations) {
  console.log(`  [LESSON VIOLATION] ${v.moduleId}/${v.lessonId}: ${v.issues.join(' ;; ')}`);
}
console.log(`- Lab resource errors: ${labResourceErrors.length}`);
for (const e of labResourceErrors) {
  console.log(`  [LAB RESOURCE ERROR] ${e}`);
}
if (!lessonsOnly) {
  console.log(`- Flagged quiz questions: ${quizViolations.length}`);
  for (const qv of quizViolations) {
    console.log(`  [QUIZ VIOLATION] ${qv.source} ${qv.id}: ${qv.issues.join(' ;; ')}`);
  }
}
if (baselinePath) {
  console.log(`- Baseline preservation errors: ${baselineErrors.length}`);
  for (const be of baselineErrors) {
    console.log(`  [BASELINE ERROR] ${be}`);
  }
}

const totalFailures = lessonViolations.length + labResourceErrors.length + quizViolations.length + baselineErrors.length;
if (totalFailures > 0) {
  process.exit(1);
}
console.log('ALL COURSE 04 NO-REFERENCES POLICY & PRESERVATION CHECKS PASSED.');
