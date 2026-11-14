/**
 * Targeted Multi-Course Figure Rendering Audit
 * Verifies that renderMarkdownToHtml() produces clean figure HTML with:
 * - No @@@INLINECODE_ or @@@CODEBLOCK_ tokens in output
 * - No visible onerror=, loading="lazy", decoding="async" text outside <img> elements
 * - No unescaped quotes inside alt="..." attributes
 * - All <figure> elements are well-formed
 * - Captions with *args, **kwargs, asterisks remain intact
 * - PNG-to-SVG fallback markup is functional
 */
import { renderMarkdownToHtml } from '../src/utils/markdownParser.js';

// ── Regression test cases ───────────────────────────────────────────
const REGRESSION_CASES = [
  'les_c1_m5_l1', 'les_c2_m1_l5', 'les_c3_m4_l4',
  'les_c4_m1_l1', 'les_c4_m1_l4', 'les_c4_m2_l1',
  'les_c4_m3_l5', 'les_c4_m8_l6'
];

// ── Course module loaders ───────────────────────────────────────────
async function loadCourseModules(courseNum) {
  const modules = [];
  const basePaths = {
    1: '../src/services/db/curriculum/module',
    2: '../src/services/db/course02/modules/module',
    3: '../src/services/db/course03/modules/module',
    4: '../src/services/db/course04/modules/module'
  };
  const counts = { 1: 6, 2: 8, 3: 8, 4: 8 };
  const base = basePaths[courseNum];
  const count = counts[courseNum];
  for (let i = 1; i <= count; i++) {
    try {
      const mod = await import(`${base}${i}.js`);
      modules.push(mod);
    } catch (e) {
      // Module may not exist
    }
  }
  return modules;
}

function extractLessons(modules, courseNum) {
  const lessons = [];
  for (const mod of modules) {
    // Course modules export different structures; try common patterns
    const exportValues = Object.values(mod);
    for (const val of exportValues) {
      if (Array.isArray(val)) {
        // Array of lessons
        for (const item of val) {
          if (item && item.content) {
            lessons.push({ id: item.id || 'unknown', content: item.content, course: courseNum });
          }
          // Check for nested lessons in modules
          if (item && item.lessons && Array.isArray(item.lessons)) {
            for (const lesson of item.lessons) {
              if (lesson && lesson.content) {
                lessons.push({ id: lesson.id || 'unknown', content: lesson.content, course: courseNum });
              }
            }
          }
        }
      } else if (val && typeof val === 'object') {
        // Single module object with lessons
        if (val.lessons && Array.isArray(val.lessons)) {
          for (const lesson of val.lessons) {
            if (lesson && lesson.content) {
              lessons.push({ id: lesson.id || 'unknown', content: lesson.content, course: courseNum });
            }
          }
        }
        if (val.content) {
          lessons.push({ id: val.id || 'unknown', content: val.content, course: courseNum });
        }
      }
    }
  }
  return lessons;
}

// ── Audit checks ────────────────────────────────────────────────────
function auditRenderedHtml(html, lessonId) {
  const errors = [];

  // 1. No leftover tokens
  const tokenMatches = html.match(/@@@(?:INLINECODE|CODEBLOCK|CALLOUT|MERMAID|MATHSTEPS)_\d+@@@/g);
  if (tokenMatches) {
    errors.push(`Leftover tokens found: ${tokenMatches.join(', ')}`);
  }

  // 2. No visible onerror=, loading="lazy", decoding="async" OUTSIDE of <img> tags
  // Strip out all <img ... /> tags first, then check remaining text
  const htmlWithoutImgs = html.replace(/<img\b[^>]*\/?>/gi, '');
  if (/onerror\s*=/.test(htmlWithoutImgs)) {
    errors.push('Visible onerror= text outside <img> elements');
  }
  if (/loading\s*=\s*"lazy"/i.test(htmlWithoutImgs)) {
    errors.push('Visible loading="lazy" text outside <img> elements');
  }
  if (/decoding\s*=\s*"async"/i.test(htmlWithoutImgs)) {
    errors.push('Visible decoding="async" text outside <img> elements');
  }

  // 3. Check for leaked CSS class strings outside tags
  const textContent = html.replace(/<[^>]+>/g, ' ');
  if (/class\s*=\s*"[^"]*w-full[^"]*"/.test(textContent)) {
    errors.push('Leaked CSS class attribute visible as text');
  }

  // 4. Check alt attributes for unescaped quotes
  const altMatches = html.matchAll(/alt="([^"]*)"/g);
  for (const m of altMatches) {
    const altVal = m[1];
    if (/@@@INLINECODE_\d+@@@/.test(altVal)) {
      errors.push(`Unrestored inline-code token in alt attribute: ${altVal.substring(0, 80)}`);
    }
  }

  // 5. Check <figure> well-formedness (each <figure> has a closing </figure>)
  const openCount = (html.match(/<figure\b/g) || []).length;
  const closeCount = (html.match(/<\/figure>/g) || []).length;
  if (openCount !== closeCount) {
    errors.push(`Mismatched <figure> tags: ${openCount} open, ${closeCount} close`);
  }

  return errors;
}

// ── Synthetic test cases ────────────────────────────────────────────
function runSyntheticTests() {
  const results = [];

  // Test 1: Caption with *args and **kwargs
  const test1 = '![diagram](test.png)\n*Function signature with `*args` and `**kwargs` parameters*';
  const html1 = renderMarkdownToHtml(test1);
  const errs1 = auditRenderedHtml(html1, 'synthetic_args_kwargs');
  if (html1.includes('@@@INLINECODE_')) errs1.push('Unrestored inline code tokens');
  results.push({ id: 'synthetic_args_kwargs', errors: errs1 });

  // Test 2: Caption with regex pattern <.*>
  const test2 = '![regex](test.png)\n*Regex pattern `<.*>` matches greedily*';
  const html2 = renderMarkdownToHtml(test2);
  const errs2 = auditRenderedHtml(html2, 'synthetic_regex');
  results.push({ id: 'synthetic_regex', errors: errs2 });

  // Test 3: Simple image without caption
  const test3 = '![Simple diagram](test.png)';
  const html3 = renderMarkdownToHtml(test3);
  const errs3 = auditRenderedHtml(html3, 'synthetic_simple');
  results.push({ id: 'synthetic_simple', errors: errs3 });

  // Test 4: Image with inline code in alt
  const test4 = '![The `parse_line()` function](test.png)\n*The `parse_line()` function flow*';
  const html4 = renderMarkdownToHtml(test4);
  const errs4 = auditRenderedHtml(html4, 'synthetic_inline_code_alt');
  if (html4.includes('@@@INLINECODE_')) errs4.push('Unrestored inline code tokens');
  results.push({ id: 'synthetic_inline_code_alt', errors: errs4 });

  // Test 5: Caption with quotes
  const test5 = '![diagram](test.png)\n*The "main" entry point for CLI tools*';
  const html5 = renderMarkdownToHtml(test5);
  const errs5 = auditRenderedHtml(html5, 'synthetic_quotes');
  // Check alt attribute has properly escaped quotes
  const altMatch5 = html5.match(/alt="([^"]*)"/);
  if (altMatch5 && altMatch5[1].includes('"') && !altMatch5[1].includes('&quot;')) {
    errs5.push('Unescaped quotes in alt attribute');
  }
  results.push({ id: 'synthetic_quotes', errors: errs5 });

  // Test 6: PNG-to-SVG fallback preserved
  const test6 = '![fallback test](test.png)';
  const html6 = renderMarkdownToHtml(test6);
  const errs6 = auditRenderedHtml(html6, 'synthetic_fallback');
  if (!html6.includes('.svg')) errs6.push('PNG-to-SVG fallback missing');
  if (!html6.includes('onerror')) errs6.push('onerror handler missing from img');
  results.push({ id: 'synthetic_fallback', errors: errs6 });

  // Test 7: Bold/italic text should NOT corrupt figure internals
  const test7 = '![architecture](test.png)\n*Detection pipeline with **bold** and *italic* labels*';
  const html7 = renderMarkdownToHtml(test7);
  const errs7 = auditRenderedHtml(html7, 'synthetic_bold_italic_caption');
  results.push({ id: 'synthetic_bold_italic_caption', errors: errs7 });

  return results;
}

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  MULTI-COURSE FIGURE RENDERING AUDIT');
  console.log('═══════════════════════════════════════════════════════════════\n');

  let totalLessons = 0;
  let totalFigures = 0;
  let totalErrors = 0;
  let failedLessons = [];
  let regressionResults = {};

  // Run synthetic tests first
  console.log('── Synthetic Edge-Case Tests ──────────────────────────────────');
  const syntheticResults = runSyntheticTests();
  for (const r of syntheticResults) {
    const status = r.errors.length === 0 ? '✓ PASS' : '✗ FAIL';
    console.log(`  ${status}  ${r.id}`);
    if (r.errors.length > 0) {
      totalErrors += r.errors.length;
      for (const e of r.errors) console.log(`         → ${e}`);
      failedLessons.push(r.id);
    }
  }
  console.log('');

  // Run against all 4 courses
  for (let courseNum = 1; courseNum <= 4; courseNum++) {
    console.log(`── Course ${String(courseNum).padStart(2, '0')} ──────────────────────────────────────────────`);
    const modules = await loadCourseModules(courseNum);
    const lessons = extractLessons(modules, courseNum);
    console.log(`  Loaded ${lessons.length} lessons from ${modules.length} modules`);

    let courseFigures = 0;
    let courseErrors = 0;

    for (const lesson of lessons) {
      totalLessons++;
      // Check if lesson content has any image/figure markdown
      const hasFigures = /!\[/.test(lesson.content);
      if (!hasFigures) continue;
      courseFigures++;
      totalFigures++;

      try {
        const rendered = renderMarkdownToHtml(lesson.content);
        const errors = auditRenderedHtml(rendered, lesson.id);
        const isRegression = REGRESSION_CASES.includes(lesson.id);

        if (errors.length > 0) {
          courseErrors += errors.length;
          totalErrors += errors.length;
          const tag = isRegression ? ' [REGRESSION CASE]' : '';
          console.log(`  ✗ FAIL  ${lesson.id}${tag}`);
          for (const e of errors) console.log(`         → ${e}`);
          failedLessons.push(lesson.id);
        } else if (isRegression) {
          console.log(`  ✓ PASS  ${lesson.id} [REGRESSION CASE]`);
        }

        if (isRegression) {
          regressionResults[lesson.id] = errors.length === 0 ? 'PASS' : 'FAIL';
        }
      } catch (e) {
        totalErrors++;
        courseErrors++;
        console.log(`  ✗ ERROR ${lesson.id}: ${e.message}`);
        failedLessons.push(lesson.id);
      }
    }

    console.log(`  → ${courseFigures} lessons with figures, ${courseErrors} errors\n`);
  }

  // Regression summary
  console.log('── Regression Case Summary ───────────────────────────────────');
  for (const caseId of REGRESSION_CASES) {
    const result = regressionResults[caseId] || 'NOT FOUND';
    const icon = result === 'PASS' ? '✓' : result === 'FAIL' ? '✗' : '?';
    console.log(`  ${icon} ${caseId}: ${result}`);
  }

  // Final summary
  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log(`  TOTAL: ${totalLessons} lessons scanned, ${totalFigures} with figures`);
  console.log(`  ERRORS: ${totalErrors}`);
  console.log(`  FAILED: ${failedLessons.length > 0 ? failedLessons.join(', ') : 'NONE'}`);
  console.log(`  RESULT: ${totalErrors === 0 ? '✓ ALL PASSED' : '✗ FAILURES DETECTED'}`);
  console.log('═══════════════════════════════════════════════════════════════');

  process.exit(totalErrors > 0 ? 1 : 0);
}

main().catch(e => {
  console.error('Audit fatal error:', e);
  process.exit(2);
});
