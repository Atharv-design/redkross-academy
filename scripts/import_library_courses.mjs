#!/usr/bin/env node
/**
 * Imports RedKross library courses (COURSE_05 ... COURSE_22 .txt) into the academy.
 *
 *   node scripts/import_library_courses.mjs [libraryDir] [--only=5,6] [--no-labs]
 *
 * Outputs (all generated - do not hand-edit; re-run the importer instead):
 *   src/services/db/library/libraryCourses.generated.js  client catalog (NO answer keys)
 *   public/course-content/<courseId>/<lessonId>.md       lesson bodies, fetched on demand
 *   public/assets/courses/cyber-NN/*.svg                 figures
 *   public/downloads/labs/RedKross_CNN_Lab_Kit.zip       lab kits (see LAB_KIT_EXCLUDES)
 *   api/_data/library/<courseId>.js + index.js           assessment banks - SERVER ONLY
 *
 * The instructor-only section and every answer key stay out of anything under
 * src/ or public/. scripts/check_library_import.mjs verifies that after a run.
 */
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';
import { parseCourse } from './library/parseCourse.mjs';
import { txtToMarkdown, inline } from './library/txt2md.mjs';
import { LIBRARY_COURSE_MAP, LAB_KIT_EXCLUDES, LAB_KIT_NOTES } from './library/courseMap.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const LIB = path.resolve(args.find((a) => !a.startsWith('--')) || path.join(ROOT, '../../RedKross_Academy_Complete_Cybersecurity_Course_Library'));
const ONLY = (args.find((a) => a.startsWith('--only=')) || '').replace('--only=', '').split(',').filter(Boolean).map(Number);
const NO_LABS = args.includes('--no-labs');

const OUT_CATALOG = path.join(ROOT, 'src/services/db/library/libraryCourses.generated.js');
const OUT_CONTENT = path.join(ROOT, 'public/course-content');
const OUT_LABS = path.join(ROOT, 'public/downloads/labs');
const OUT_SERVER = path.join(ROOT, 'api/_data/library');

const MODULE_QUIZ_TOKENS = 100;
const FINAL_TOKENS = 300;
const FINAL_FROM_MODULES = 20; // + all 20 course-level MCQs = 40-question final

const pad2 = (n) => String(n).padStart(2, '0');
const write = (file, data) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, data);
};

function sentences(text, max = 2) {
  const flat = text.replace(/\s+/g, ' ').trim();
  const parts = flat.match(/[^.!?]+[.!?]+(\s|$)/g) || [flat];
  return parts.slice(0, max).join('').trim();
}

function flat(text) {
  return String(text || '').replace(/\s+/g, ' ').trim();
}

function normaliseDifficulty(a3) {
  const s = a3.toLowerCase();
  if (s.startsWith('beginner')) return 'Beginner';
  if (s.startsWith('intermediate')) return 'Intermediate';
  return 'Advanced';
}

function parseHours(a10) {
  const num = (re) => {
    const m = a10.match(re);
    return m ? Number(m[1]) : 0;
  };
  const breakdown = {
    module_study: num(/Modules?\s+(\d+)\s*hours/i),
    practicals_and_challenges: num(/practicals?\s+(\d+)\s*hours/i),
    course_assessment: num(/assessment\s+(\d+)\s*hours/i),
    capstone_report: num(/capstone\s+(\d+)\s*hours/i),
  };
  const total = num(/Total(?: about)?\s+(\d+)\s*hours/i) || Object.values(breakdown).reduce((a, b) => a + b, 0);
  return { total, breakdown };
}

function splitList(text, sep = /;\s*/) {
  return flat(text)
    .split(sep)
    .map((s) => s.trim().replace(/\.$/, ''))
    .filter((s) => s.length > 2);
}

function learningOutcomes(a11) {
  const items = [];
  for (const line of a11.split('\n')) {
    const m = line.match(/^\s*LO(\d+)\s+(.*)$/);
    if (m) items.push({ n: m[1], text: m[2].trim() });
    else if (items.length && line.trim()) items[items.length - 1].text += ` ${line.trim()}`;
  }
  return items;
}

/** [C05-M03-R4] -> [R4] inside module 3, [M03-R4] elsewhere */
function shortenRefs(text, code, moduleNum) {
  return text.replace(/\[(C\d\d)-M(\d\d)-R(\d+)\]/g, (m, c, mod, r) => {
    if (c !== code) return m;
    return Number(mod) === moduleNum ? `[R${r}]` : `[M${mod}-R${r}]`;
  });
}

function minutes(n) {
  return `${Math.max(5, Math.round(n / 5) * 5)} mins`;
}

function callout(kind, title, body) {
  const lines = [`[!${kind}] ${title}`.trim(), ...body.split('\n')];
  return lines.map((l) => (l ? `> ${l}` : '>')).join('\n');
}

// ---------------------------------------------------------------------------

function buildCourse(num, raw) {
  const meta = LIBRARY_COURSE_MAP[num];
  const c = parseCourse(raw);
  const code = c.code; // C05
  const lc = code.toLowerCase(); // c05
  const courseId = meta.id;
  const tag = code;
  const figDir = `/assets/courses/cyber-${pad2(num)}`;
  const labKitUrl = `/downloads/labs/RedKross_${code}_Lab_Kit.zip`;
  const passing = Number((c.partA[14].match(/(\d+)%/) || [])[1] || 70);
  const finalPassing = Number((c.partA[14].match(/(\d+)%/g) || [])[1]?.replace('%', '') || passing);
  const hours = parseHours(c.partA[10]);
  const los = learningOutcomes(c.partA[11]);
  const skills = splitList(c.partA[12] || '', /,\s*/).map((s) => s.charAt(0).toUpperCase() + s.slice(1));
  const md = (text, modNum) => txtToMarkdown(shortenRefs(text, code, modNum));

  const lessonFiles = [];
  const modules = [];
  const serverBank = { modules: {}, course: [] };

  const labCallout = callout(
    'NOTE',
    'Lab kit',
    `Download the course lab kit: [RedKross_${code}_Lab_Kit.zip](${labKitUrl}). Extract it anywhere; paths written as \`LAB_ASSETS/${code}/...\` refer to the extracted \`${code}\` folder. Everything runs locally against systems you own.`
  );

  for (const mod of c.modules) {
    const m = mod.num;
    const modId = `mod_${lc}_${m}`;
    const studyHours = Number((mod.intro[7]?.body.match(/(\d+(?:\.\d+)?)/) || [])[1] || 7);
    const budget = studyHours * 60;
    const lessons = [];
    const add = (key, title, body, share, extra = {}) => {
      const id = `les_${lc}_m${m}_${key}`;
      const content = `${body.trim()}\n`;
      lessonFiles.push({ id, content });
      lessons.push({
        id,
        title,
        duration: typeof share === 'string' ? share : minutes(budget * share),
        is_mandatory: true,
        summary: extra.summary || '',
        learning_objectives: extra.objectives || [],
        content_url: `/course-content/${courseId}/${id}.md`,
      });
    };

    const objectives = splitList((mod.intro[5]?.body || '').replace(/^\s*\d+\.\s*/gm, ';'), /;\s*/);

    if (m === 1 && c.preface) {
      add(
        'orientation',
        'Course orientation: labs, safety and standards',
        `## Before you begin\n\n${labCallout}\n\n${md(c.preface, 1)}`,
        '15 mins',
        { summary: 'How the course labs work, the safety and authorisation rules, and the standards the course follows.' }
      );
    }

    const intro = mod.intro;
    add(
      'overview',
      `${m}.0 Module overview`,
      [
        `## About this module\n\n${md(intro[2]?.body || '', m)}`,
        intro[3] ? `## Why it matters\n\n${md(intro[3].body, m)}` : '',
        intro[4] ? `## Where it is used\n\n${md(intro[4].body, m)}` : '',
        intro[5] ? `## Learning objectives\n\n${md(intro[5].body, m)}` : '',
        `## Before you start\n\n**Prerequisites:** ${inline(flat(intro[6]?.body || 'None.'))}\n\n**Estimated study time:** ${inline(flat(intro[7]?.body || ''))}`,
      ]
        .filter(Boolean)
        .join('\n\n'),
      0.03,
      { summary: sentences(intro[2]?.body || '', 1), objectives }
    );

    mod.lessons.forEach((les, i) => {
      add(`l${pad2(i + 1)}`, `${m}.${i + 1} ${les.title}`, md(les.body, m), 0.55 / mod.lessons.length, {
        summary: sentences(les.body, 1).slice(0, 240),
      });
    });

    add('deepdive', `Technical deep dive: ${titleCase(mod.deepDive.title)}`, md(mod.deepDive.body, m), 0.1, {
      summary: 'A worked, end-to-end technical walkthrough using the course lab.',
    });

    add(
      'cases',
      'Real-world case studies',
      mod.cases.map((cs) => `## ${inline(cs.title)}\n\n${md(cs.body, m)}`).join('\n\n'),
      0.07,
      { summary: mod.cases.map((cs) => cs.title).join('; ').slice(0, 240) }
    );

    add(
      'lab',
      'Hands-on practicals',
      [labCallout, ...mod.practicals.map((p, i) => `## Practical ${i + 1}: ${inline(p.title)}\n\n${md(p.body, m)}`)].join('\n\n'),
      0.15,
      { summary: mod.practicals.map((p) => p.title).join('; ').slice(0, 240) }
    );

    add(
      'visuals',
      'Visual guide',
      mod.figures
        .map((f) => {
          const svg = path.join(LIB, 'FIGURES', code, `${f.code}.svg`);
          const caption = shortenRefs(f.caption, code, m);
          if (fs.existsSync(svg)) {
            return `## ${inline(f.title)}\n\n![${(f.alt || f.title).replace(/[[\]]/g, '')}](${figDir}/${f.code}.svg)\n*${caption.replace(/\*/g, '')}*`;
          }
          return `## ${inline(f.title)}\n\n${txtToMarkdown(`[BEGIN DIAGRAM]\n${f.diagram}\n[END DIAGRAM]`)}\n\n*${caption.replace(/\*/g, '')}*`;
        })
        .join('\n\n'),
      '10 mins',
      { summary: mod.figures.map((f) => f.title).join('; ').slice(0, 240) }
    );

    add(
      'scenarios',
      'Scenario practice',
      [
        'Work through each scenario on your own first, then compare your reasoning with the model answer.',
        ...mod.scenarios.map(
          (s, i) =>
            `## Scenario ${i + 1}\n\n${md(s.text, m)}\n\n${callout('TIP', 'Model answer', txtToMarkdown(shortenRefs(s.expected, code, m)))}`
        ),
      ].join('\n\n'),
      0.05,
      { summary: 'Applied scenarios with model answers.' }
    );

    // "8.1 Summary", "8.2 Important concepts: a; b" ... -> ### headings built here, outside the converter
    const revision = mod.revision
      .split(/^(?=8\.\d )/m)
      .map((part) => {
        const hm = part.match(/^8\.\d ([A-Z][A-Za-z ]+?)(?::\s*|\s*\n|$)([\s\S]*)$/);
        if (!hm) return md(part, m);
        return `### ${hm[1].trim()}\n\n${md(hm[2], m)}`;
      })
      .join('\n\n');
    const refs = mod.references
      .split(/\n(?=\[C\d\d-M\d\d-R\d+\])/)
      .map((r) => `- ${inline(flat(shortenRefs(r, code, m)))}`)
      .join('\n');
    add('revision', 'Revision and references', `## Revision\n\n${revision}\n\n## References\n\n${refs}`, 0.05, {
      summary: 'Summary, key concepts, glossary, common mistakes and the module references.',
    });

    const quizId = `quiz_${lc}_m${m}`;
    serverBank.modules[m] = mod.mcqs.map((q) => ({
      id: q.id,
      q: q.q,
      options: q.options,
      correct: q.correct,
      explanation: shortenRefs(q.explanation, code, m),
      topic: `${code}-M${pad2(m)}: ${mod.title}`,
      difficulty: 'medium',
    }));

    modules.push({
      id: modId,
      title: `Module ${m}: ${mod.title}`,
      description: sentences(intro[2]?.body || mod.title, 2),
      order: m,
      quiz: {
        id: quizId,
        title: `Module ${m}: ${mod.title} - Assessment`,
        pass_threshold: passing,
        passing_score: passing,
        duration_minutes: 15,
        total_questions: mod.mcqs.length,
        token_bounty: MODULE_QUIZ_TOKENS,
      },
      lessons,
    });
  }

  // Part C -> a final, quiz-free "course completion" module
  {
    const m = 9;
    const lessons = [];
    const add = (key, title, body, duration, summary) => {
      const id = `les_${lc}_m${m}_${key}`;
      lessonFiles.push({ id, content: `${body.trim()}\n` });
      lessons.push({ id, title, duration, is_mandatory: true, summary, learning_objectives: [], content_url: `/course-content/${courseId}/${id}.md` });
    };
    const pc = c.partC.sections;
    if (pc[1]) add('revision_guide', 'Course revision guide', md(pc[1].text, 0), '30 mins', 'The whole course in one revision pass.');
    if (pc[2]) add('glossary', 'Course glossary', md(pc[2].text, 0), '15 mins', 'Key terms used across the course.');
    add(
      'course_tasks',
      'Course practical tasks',
      `${labCallout}\n\n${md(c.partC.tasks.replace(/^COURSE TASK (C\d\d-CT\d)\s*$/gm, '## Task $1'), 0)}`,
      '3 hours',
      'Two integrative practical tasks across the course labs.'
    );
    if (pc[4]) {
      const capTitle = pc[4].title.replace(/^CAPSTONE PROJECT:\s*/i, '');
      const body = pc[4].text.replace(/^C4\.(\d) (.+)$/gm, '\n### $2\n');
      add('capstone', `Capstone: ${titleCase(capTitle)}`, `${labCallout}\n\n${md(body, 0)}`, `${hours.breakdown.capstone_report || 16} hours`, 'The capstone project brief, deliverables and rubric.');
    }
    if (pc[5]) add('checklist', 'Course completion checklist', md(pc[5].text, 0), '10 mins', 'Everything you need to have done before the final assessment.');
    modules.push({
      id: `mod_${lc}_9`,
      title: 'Course completion: revision, tasks and capstone',
      description: 'Consolidate the course, complete the practical tasks and capstone, then sit the final assessment.',
      order: 9,
      lessons,
    });
  }

  serverBank.course = c.partC.mcqs.map((q) => ({
    id: q.id,
    q: q.q,
    options: q.options,
    correct: q.correct,
    explanation: '',
    topic: `${code}: course assessment`,
    difficulty: 'difficult',
  }));

  const finalTotal = serverBank.course.length + FINAL_FROM_MODULES;
  const course = {
    id: courseId,
    source: 'library',
    division: 'cybersecurity',
    slug: meta.slug,
    title: c.title,
    course_number: `Course ${pad2(num)} of 22`,
    course_code: code,
    version: '1.0',
    category: meta.category,
    difficulty: normaliseDifficulty(c.partA[3]),
    level_detail: flat(c.partA[3]),
    price: 0,
    cert_price: 0,
    estimated_duration: `${Math.ceil(hours.total / 10)} Weeks`,
    estimated_weeks: Math.ceil(hours.total / 10),
    total_hours: hours.total,
    hours_breakdown: hours.breakdown,
    effort: '8-10 Hours per Week',
    access: flat(c.partA[4]),
    rating: null,
    enrolled_count: 0,
    card_variant: 'random',
    short_desc: sentences(c.partA[5], 2),
    lead_author: {
      name: 'RedKross Academy Faculty',
      title: meta.category,
      role: 'RedKross Research Foundation',
      avatar: '/assets/crest-clean-circle.png',
    },
    overview: flat(c.partA[5]),
    why_it_matters: [flat(c.partA[6])],
    intended_audience: [flat(c.partA[7])],
    prerequisites: splitList(c.partA[8]),
    required_software_hardware: [flat(c.partA[9])],
    what_you_will_learn: los.map((l) => flat(l.text)),
    learning_objectives: los.map((l) => `LO${l.n}: ${flat(l.text)}`),
    skills: skills.slice(0, 12),
    nice_framework_alignment: [flat(c.partA[13] || '')].filter(Boolean),
    completion_requirements: splitList(c.partA[14]),
    total_tokens_reward: modules.filter((x) => x.quiz).length * MODULE_QUIZ_TOKENS + FINAL_TOKENS,
    milestone_cert: `RedKross Certificate of Completion - ${c.title}`,
    lab_kit_url: labKitUrl,
    final_assessment: {
      id: `exam_${lc}_final`,
      title: `${c.title} - Final Assessment`,
      credential_title: `Certificate of Completion: ${c.title}`,
      time_limit_minutes: 60,
      passing_score: finalPassing,
      total_questions: finalTotal,
      proctored: true,
      token_bounty: FINAL_TOKENS,
      skills_validated: skills.slice(0, 6),
    },
    modules,
  };

  return { course, lessonFiles, serverBank, code, figuresDir: path.join(LIB, 'FIGURES', code), figDir };
}

function titleCase(s) {
  const small = new Set(['and', 'or', 'the', 'a', 'an', 'of', 'for', 'to', 'in', 'on', 'with', 'by', 'from', 'as', 'at']);
  const upper = s === s.toUpperCase();
  if (!upper) return s;
  return s
    .toLowerCase()
    .split(' ')
    .map((w, i) => (i > 0 && small.has(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')
    .replace(/\b(Aws|Iam|Vpc|Kms|Soc|Siem|Dfir|Ad|Ai|Api|Ci|Cd|Owasp|Nist|Pki|Tls|Rbac|Mfa|Csf|Ot|Iot|Llm|Zt|Zta|K8s|Ir)\b/g, (w) => w.toUpperCase());
}

function zipDir(srcDir, zipPath, note) {
  const files = [];
  (function walk(dir) {
    for (const f of fs.readdirSync(dir)) {
      const p = path.join(dir, f);
      const rel = path.relative(path.dirname(srcDir), p).split(path.sep).join('/');
      if (LAB_KIT_EXCLUDES.some((re) => re.test(rel))) continue;
      if (fs.statSync(p).isDirectory()) walk(p);
      else files.push([p, rel]);
    }
  })(srcDir);
  const manifest = path.join(path.dirname(zipPath), `.${path.basename(zipPath)}.json`);
  fs.mkdirSync(path.dirname(zipPath), { recursive: true });
  fs.writeFileSync(manifest, JSON.stringify({ files, note: note || '', root: path.basename(srcDir) }));
  // Python's zipfile gives deterministic, dependency-free archives on every OS
  const py = [
    'import json,sys,zipfile',
    'm=json.load(open(sys.argv[1]))',
    "z=zipfile.ZipFile(sys.argv[2],'w',zipfile.ZIP_DEFLATED)",
    'for src,rel in m["files"]:',
    '    i=zipfile.ZipInfo(rel,(2026,11,13,0,0,0)); i.compress_type=zipfile.ZIP_DEFLATED; i.external_attr=0o644<<16',
    "    z.writestr(i,open(src,'rb').read())",
    "if m['note']:",
    "    i=zipfile.ZipInfo(m['root']+'/READ_ME_FIRST_DOWNLOAD_NOTES.txt',(2026,11,13,0,0,0)); z.writestr(i,m['note'])",
    'z.close()',
  ].join('\n');
  execFileSync(process.platform === 'win32' ? 'python' : 'python3', ['-I', '-c', py, manifest, zipPath], { stdio: 'inherit' });
  fs.unlinkSync(manifest);
  return files.length;
}

// ---------------------------------------------------------------------------

function main() {
  const files = fs.readdirSync(LIB).filter((f) => /^COURSE_\d\d_.*\.txt$/.test(f));
  const nums = Object.keys(LIBRARY_COURSE_MAP).map(Number).filter((n) => !ONLY.length || ONLY.includes(n));
  const catalog = [];
  const specs = [];

  for (const num of nums) {
    const file = files.find((f) => f.startsWith(`COURSE_${pad2(num)}_`));
    if (!file) throw new Error(`library file for course ${num} not found in ${LIB}`);
    const built = buildCourse(num, fs.readFileSync(path.join(LIB, file), 'utf8'));
    const { course, lessonFiles, serverBank, code, figuresDir, figDir } = built;

    const contentDir = path.join(OUT_CONTENT, course.id);
    fs.rmSync(contentDir, { recursive: true, force: true });
    for (const lf of lessonFiles) write(path.join(contentDir, `${lf.id}.md`), lf.content);

    const figOut = path.join(ROOT, 'public', figDir);
    fs.mkdirSync(figOut, { recursive: true });
    let figCount = 0;
    if (fs.existsSync(figuresDir)) {
      for (const f of fs.readdirSync(figuresDir).filter((x) => x.endsWith('.svg'))) {
        fs.copyFileSync(path.join(figuresDir, f), path.join(figOut, f));
        figCount++;
      }
    }

    let labCount = 0;
    if (!NO_LABS) {
      const labSrc = path.join(LIB, 'LAB_ASSETS', code);
      if (fs.existsSync(labSrc)) labCount = zipDir(labSrc, path.join(ROOT, 'public', course.lab_kit_url), LAB_KIT_NOTES[num]);
    }

    write(
      path.join(OUT_SERVER, `${course.id}.js`),
      `// GENERATED by scripts/import_library_courses.mjs from ${file}. SERVER ONLY - contains answer keys.\n` +
        `export default ${JSON.stringify(serverBank, null, 1)};\n`
    );

    specs.push({
      id: course.id,
      code,
      title: course.title,
      modules: course.modules.filter((x) => x.quiz).map((x) => ({
        number: x.order,
        quizId: x.quiz.id,
        title: x.quiz.title,
        passingScore: x.quiz.passing_score,
        count: x.quiz.total_questions,
        timeLimitMinutes: x.quiz.duration_minutes,
        tokenBounty: x.quiz.token_bounty,
      })),
      final: {
        id: course.final_assessment.id,
        title: course.final_assessment.title,
        passingScore: course.final_assessment.passing_score,
        count: course.final_assessment.total_questions,
        fromModules: FINAL_FROM_MODULES,
        timeLimitMinutes: course.final_assessment.time_limit_minutes,
        tokenBounty: course.final_assessment.token_bounty,
        credentialTitle: course.final_assessment.credential_title,
        skills: course.final_assessment.skills_validated,
      },
    });
    catalog.push(course);
    const lessonCount = course.modules.reduce((a, x) => a + x.lessons.length, 0);
    console.log(`${code} ${course.id}: ${course.modules.length} modules, ${lessonCount} lessons, ${figCount} figures, ${labCount} lab files`);
  }

  if (!ONLY.length) {
    write(
      OUT_CATALOG,
      `// GENERATED by scripts/import_library_courses.mjs - do not edit by hand.\n` +
        `// Lesson bodies are fetched on demand from each lesson's content_url.\n` +
        `// Assessment questions and answers are NOT here: they live server-side in api/_data/library.\n` +
        `export const LIBRARY_COURSES = ${JSON.stringify(catalog, null, 1)};\n`
    );
    const loaders = specs.map((s) => `  ${JSON.stringify(s.id)}: () => import('./${s.id}.js'),`).join('\n');
    write(
      path.join(OUT_SERVER, 'index.js'),
      `// GENERATED by scripts/import_library_courses.mjs. SERVER ONLY.\n` +
        `export const LIBRARY_SPECS = ${JSON.stringify(specs, null, 1)};\n\n` +
        `// static import specifiers so serverless bundlers can trace every bank\n` +
        `export const LIBRARY_BANK_LOADERS = {\n${loaders}\n};\n`
    );
  }
  console.log(`Imported ${catalog.length} courses.`);
}

main();
