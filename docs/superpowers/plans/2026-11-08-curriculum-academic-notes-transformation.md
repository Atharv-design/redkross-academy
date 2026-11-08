# Master Academic Notes Formatting & Global Dash De-slopping Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute a comprehensive academic notes formatting overhaul and global AI dash de-slopping across the entire RedKross Academy curriculum (from Module 2 through Module 5, plus Psychology courses) while upgrading `markdownParser.js` to match the exact compact typographic tokens.

**Architecture:** A multi-stage transformation pipeline: (1) Upgrade `src/utils/markdownParser.js` to enforce strict RedKross baseline typographic styles (Lora 17px/1.6, H2-H4 exact margins/sizes, 5px list gaps, anti-margin-stacking, clean dash normalization); (2) Comprehensive natural de-slopping of ~200 unnecessary AI em/en dashes across all curriculum modules into grammatically appropriate commas, periods, or conjunctions while preserving all technical hyphens; (3) Removal of generic AI heading templates in favor of natural subject-specific academic headers; (4) Complete academic transformation of Module 5 (Lessons 5.1–5.6); (5) Rigorous automated verification and production build checks.

**Tech Stack:** React 19, Tailwind CSS, Vite, Node.js (ESM), Lora / Cinzel typography, W3C WAI semantic accessibility standards.

**Spec:** RedKross Academy Master Academic Notes Formatting & Presentation Standard (User Prompt Specification).

## Global Constraints

- **Scope Floor:** Starting from Module 2 through Module 5, plus Psychology courses.
- **Strict Content Preservation:** 100% preservation of every original sentence, word, technical term, number, fact, example, question, table cell, diagram, and code example. Zero summarization, zero truncation.
- **No Random Bolding:** In body text, bolding is strictly restrained to front-loaded concept terms at the start of structured lists (`- **Term:** Definition`). No arbitrary in-sentence bolding.
- **Punctuation Rigor:** Eliminate decorative/interruption em dashes (`—`) and en dashes (`–`) naturally using commas, full stops, or conjunctions. Strictly preserve legitimate technical hyphens (`man-in-the-middle`, `end-to-end`, `role-based`, `zero-day`, `real-time`, `step-by-step`, etc.), ranges, URLs, and code.
- **Scope Boundary:** Focus strictly on educational notes formatting and markdown parser rendering. Do NOT modify classroom navigation, admin panels, dashboards, or external application chrome.
- **No Remote Git Push:** Do NOT execute `git push origin main`. All changes must remain verified locally.

## Review Focus

1. **Typographic Rhythm:** Verify that headings have immediate descriptive text without awkward multi-line gaps, and paragraph bottom margins are compact (8–10px) without margin stacking.
2. **Technical Hyphen Inviolability:** Ensure that terms like `zero-day`, `role-based access control`, and `man-in-the-middle` are never mangled when stripping AI em dashes.
3. **Continuous Numbering:** Ensure ordered lists do not restart or reset to `01` unexpectedly.
4. **Heading Semantic Separation:** Ensure no explanatory body sentences remain attached to `### Step X: Title` or other heading lines.
5. **Production Build Integrity:** Ensure Vite build succeeds cleanly with code 0 and all test suites pass with 100% success.

---

### Task 1: Baseline Typography & Spacing Engine Calibration in Markdown Parser

**Files:**
- Modify: `src/utils/markdownParser.js`
- Test: `node tests/test_markdown_parser.mjs`

- [ ] **Step 1.1:** Update body paragraph styling in `markdownParser.js` to exact baseline tokens: Lora font, 17px, line-height 1.6, text color `#E2D9CE`, margin-bottom 8–10px (`mb-2 sm:mb-2.5`).
- [ ] **Step 1.2:** Update H2 styling to Lora Bold, 23–25px (`text-[23px] sm:text-[25px]`), top margin 26px (`mt-[26px]`), bottom margin 9px (`mb-[9px]`), accent `#FFA439`.
- [ ] **Step 1.3:** Update H3 styling to Lora Semibold, 19–21px (`text-[19px] sm:text-[21px]`), top margin 20px (`mt-[20px]`), bottom margin 7px (`mb-[7px]`).
- [ ] **Step 1.4:** Update H4 styling to Lora Medium, 16–17px (`text-[16px] sm:text-[17px]`), top margin 15px (`mt-[15px]`), bottom margin 6px (`mb-[6px]`).
- [ ] **Step 1.5:** Calibrate list spacing: ordered and unordered list item gaps to 5px (`space-y-[5px]`), nested lists to 4px (`space-y-[4px]`), with zero extra blank paragraph wrappers.
- [ ] **Step 1.6:** Run a targeted parser verification script to confirm HTML output matches the exact CSS class specs.

---

### Task 2: Global Dash De-slopping & Heading De-Templating across Module 2

**Files:**
- Modify: `src/services/db/curriculum/module2.js`
- Test: `node "C:\Users\athar\.gemini\config\plugins\content-design-standards\skills\content-design\scripts\audit_chapter.mjs" "src/services/db/curriculum/module2.js"`

- [ ] **Step 2.1:** Audit all ~96 em dashes in `module2.js` across Lessons 2.2 to 2.8.
- [ ] **Step 2.2:** Replace decorative and interruption em dashes with grammatically appropriate commas, full stops, or natural conjunctions according to sentence context.
- [ ] **Step 2.3:** Preserve all technical hyphens (`role-based`, `break-glass`, `zero-trust`, `pass-the-hash`, etc.).
- [ ] **Step 2.4:** Audit and normalize all section headers, removing generic template labels.
- [ ] **Step 2.5:** Run `audit_chapter.mjs` to verify Module 2 achieves 0 errors.

---

### Task 3: Global Dash De-slopping & Heading De-Templating across Module 3

**Files:**
- Modify: `src/services/db/curriculum/module3.js`
- Test: `node "C:\Users\athar\.gemini\config\plugins\content-design-standards\skills\content-design\scripts\audit_chapter.mjs" "src/services/db/curriculum/module3.js"`

- [ ] **Step 3.1:** Audit all ~47 em dashes in `module3.js` across Lessons 3.1 to 3.7.
- [ ] **Step 3.2:** Replace decorative em dashes with natural punctuation (commas, periods, colons).
- [ ] **Step 3.3:** Ensure AI heading patterns like `Part 1 — Hook` are completely eliminated in favor of subject-specific titles.
- [ ] **Step 3.4:** Preserve technical hyphens (`man-in-the-middle`, `living-off-the-land`, `zero-day`, `command-and-control`).
- [ ] **Step 3.5:** Run `audit_chapter.mjs` to verify Module 3 remains completely clean.

---

### Task 4: Global Dash De-slopping & Heading De-Templating across Module 4

**Files:**
- Modify: `src/services/db/curriculum/module4.js`
- Test: `node "C:\Users\athar\.gemini\config\plugins\content-design-standards\skills\content-design\scripts\audit_chapter.mjs" "src/services/db/curriculum/module4.js"`

- [ ] **Step 4.1:** Audit all ~23 em dashes in `module4.js` across Lessons 4.1 to 4.6.
- [ ] **Step 4.2:** Replace decorative em dashes with natural punctuation.
- [ ] **Step 4.3:** Ensure risk equations, formulas (ALE = SLE × ARO), and CVSS vector strings remain pristine.
- [ ] **Step 4.4:** Run `audit_chapter.mjs` to verify Module 4 remains completely clean.

---

### Task 5: Complete Academic Transformation & De-slopping of Module 5

**Files:**
- Modify: `src/services/db/curriculum/module5.js`
- Test: `node "C:\Users\athar\.gemini\config\plugins\content-design-standards\skills\content-design\scripts\audit_chapter.mjs" "src/services/db/curriculum/module5.js"`

- [ ] **Step 5.1:** Audit all 6 lessons of Module 5 (`5.1 Identification, Authentication & Authorization`, `5.2 MFA Mechanics`, `5.3 RBAC & ABAC`, `5.4 Password Security & Hashing`, `5.5 Privileged Access Management`, `5.6 Synthesis & Review`).
- [ ] **Step 5.2:** Remove all ~31 unnecessary em dashes while preserving technical terms (`passwordless`, `multi-factor`, `pass-the-hash`, `golden-ticket`).
- [ ] **Step 5.3:** Remove tools and unneeded lab boilerplate from notes while preserving all educational principles, comparative matrices, and case studies.
- [ ] **Step 5.4:** Deconstruct long monolithic paragraphs into GOV.UK-compliant 2–4 sentence blocks and front-loaded bullet points.
- [ ] **Step 5.5:** Promote all core conceptual pillars to `###` and operational sub-sections to `####`.
- [ ] **Step 5.6:** Run `audit_chapter.mjs` to verify Module 5 achieves 0 errors.

---

### Task 6: Dash De-slopping & Typography Audit for Psychology Courses

**Files:**
- Modify: `src/services/db/psychologyCourses.js`
- Test: `node -e "import('./src/services/db/psychologyCourses.js').then(...)"`

- [ ] **Step 6.1:** Inspect all 6 psychology courses and their `content_markdown` fields.
- [ ] **Step 6.2:** Replace unnecessary em dashes with natural academic punctuation.
- [ ] **Step 6.3:** Verify semantic heading structure and paragraph flow.

---

### Task 7: Full System Verification, Regression Tests & Production Build

**Files:**
- Verify: Entire repository
- Tests:
  - `node tests/unit_test_question_banks.mjs`
  - `node tests/test_module_unlock_and_celebration.mjs`
  - `node tests/challenger_m5_stress_test.mjs`
  - `npm run build`

- [ ] **Step 7.1:** Run curriculum auditor on Modules 2, 3, 4, 5.
- [ ] **Step 7.2:** Run comprehensive question bank and sampling engine test suite.
- [ ] **Step 7.3:** Run module unlock and gateway progression test suite.
- [ ] **Step 7.4:** Run challenger stress test suite.
- [ ] **Step 7.5:** Run Vite production build and verify exit code 0.
- [ ] **Step 7.6:** Generate final audit report and output `<!-- GOAL_COMPLETE -->`.
