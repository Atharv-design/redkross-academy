# Visible Content Synchronization & Academic Curriculum Deconstruction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure all curriculum notes across Modules 2, 3, 4, and 5 reflect visibly in the user's browser immediately by implementing automatic `localStorage` cache invalidation/migration in `mockEngine.js`, and deconstruct all dense paragraphs and unformatted text across Modules 2–5 into structured headings, subheadings, multi-level bullet points, and definition cards strictly conforming to GOV.UK, W3C WAI, and Academic Writing standards without touching Module 1.

**Architecture:** 
1. Cache-Busting & Invalidation Pipeline: Update `mockEngine.js` with a new curriculum revision key (`CURRICULUM_VERSION = '2026.11.08.v9_academic_elevation'`) and deep course-synchronizer that replaces stale `db.courses` with fresh data from `INITIAL_COURSES` while completely preserving user accounts, enrolments, quiz attempts, reward tokens, and exam logs. Add a runtime synchronization check and a manual dev sync trigger.
2. Curriculum Deconstruction & Academic Content Design: Systematically inspect and reformat all lessons in Modules 2, 3, 4, and 5 into semantic hierarchy (H2 for modules, H3 with badge chips for pillars/goals/steps/cases, H4 for operational sub-sections), converting run-on paragraphs into front-loaded bold bullet points (`- **Concept:** Detailed explanation`), sub-points, and definition cards.
3. Automated Quality Verification: Execute unit tests verifying cache invalidation with stale `localStorage` mocks, run content audit scripts verifying 0 em-dashes, 0 ASCII boxes, 0 raw file paths, and 0 unbulleted definition runs, and verify full production Vite build.

**Tech Stack:** JavaScript (ES Modules), React, Tailwind CSS, LocalStorage Mock Engine, Vite, Node.js.

**Spec:** User Requirements & Academic Content Design Standards:
- GOV.UK Writing Guidelines (Chunking, scannability, front-loaded bold lead-ins, no walls of text).
- W3C WAI Content Structure (Semantic H2/H3/H4 hierarchy, structured `<dl>` definition lists, no heading line run-ons).
- University of Luxembourg Academic Writing Guide (Empirical rigor, grounded enterprise examples, structured tables and diagrams).
- Constraint: Module 1 (`src/services/db/curriculum/module1.js`) is LOCKED and must NEVER be modified.

---

## Global Constraints

- **Module 1 Immobility:** Under NO circumstances modify `src/services/db/curriculum/module1.js` or `src/services/db/chapter1Images.js`.
- **Cadet Progress Preservation:** Never blindly wipe `localStorage`; existing user enrolments, quiz attempts, token balances, and certification requests must persist without disruption during schema migrations.
- **Git Remote Safety:** NEVER run `git push origin main` or any remote git push commands.
- **Typography & Formatting Floor:** All bullet points must use front-loaded bold concepts (`- **Concept:** ...`). Long continuous paragraphs (>3 sentences) must be deconstructed into bullet lists and sub-points. Em-dashes (`—`) must be replaced with colons, parentheses, or commas. Raw ASCII art boxes must be replaced with Mermaid flowcharts or GFM tables.

---

## Review Focus

1. **Stale Browser LocalStorage:** If a user visits with an existing `redkross_academy_db_v1` in `localStorage`, the engine must automatically detect the outdated `_curriculum_version`, replace `courses` with `INITIAL_COURSES`, and retain all existing `users`, `enrolments`, and `quiz_attempts`.
2. **Missing Bullet Points / Run-on Paragraphs:** In lessons such as 2.8, 3.5, and 4.1 where definitions (e.g. Asset/Threat/Vulnerability or Data/Information/Intelligence) were merged into continuous text, each term must be broken out into an individual front-loaded bullet or definition card.
3. **Unpromoted Headings:** Sections starting with "The First A:...", "Goal X:...", "Case Study X:...", "How to Implement..." must be promoted to `###` or `####` headings so the parser generates glowing badges and section cards.
4. **Duplicate Captions and Raw File Paths:** Ensure no lingering `*(/assets/...)*` raw paths or duplicate figure captions exist in curriculum content.
5. **Syntax Integrity:** Ensure all multi-line string content in JS curriculum files remains properly escaped without causing `SyntaxError` during Node.js evaluation or Vite build.

---

## Tasks

### Task 1: Curriculum Cache Invalidation & Automatic Database Migration in `mockEngine.js`

**Files:**
- Modify: `src/services/db/mockEngine.js:210-265`
- Test: `tests/test_curriculum_cache_migration.mjs`

**Interfaces:**
- Consumes: `INITIAL_COURSES`, `safeStorage`
- Produces: `mockEngine.getDb()` with automatic course synchronization, `mockEngine.syncCurriculumFromDisk(forceReset = true)`

- [ ] **Step 1: Write the failing migration test**

Create `tests/test_curriculum_cache_migration.mjs` that simulates a user having stale `redkross_academy_db_v1` in `localStorage` with old unformatted courses, and verifies that `mockEngine.getDb()` replaces `courses` with the latest `INITIAL_COURSES` while preserving cadet enrolments and quiz attempts:

```javascript
import assert from 'node:assert';
import mockEngine from '../src/services/db/mockEngine.js';

// Setup stale db in storage
const staleDb = {
  _initialized: true,
  _curriculum_version: '2026.11.07.v8',
  users: [{ id: 'usr_test', name: 'Cadet Test' }],
  enrolments: [{ id: 'enr_1', user_id: 'usr_test', course_id: 'crs_cyber_intro_01', progress: 45 }],
  courses: [{ id: 'crs_cyber_intro_01', title: 'Old Stale Title', modules: [] }],
  quiz_attempts: [{ id: 'qa_1', score: 100 }],
};
globalThis.localStorage.setItem('redkross_academy_db_v1', JSON.stringify(staleDb));
mockEngine._cachedDb = null;

const db = mockEngine.getDb();
assert.strictEqual(db._curriculum_version, '2026.11.08.v9_academic_elevation', 'Curriculum version must be updated');
assert.strictEqual(db.courses[0].modules.length >= 5, true, 'Courses must be refreshed from INITIAL_COURSES');
assert.strictEqual(db.enrolments[0].progress, 45, 'Cadet enrolment progress must be preserved');
assert.strictEqual(db.users[0].name, 'Cadet Test', 'User account must be preserved');
console.log('✓ Cache migration test passed successfully');
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/test_curriculum_cache_migration.mjs`
Expected: FAIL because `mockEngine.js` still has `CURRICULUM_VERSION = '2026.11.07.v8'`.

- [ ] **Step 3: Implement cache invalidation and migration in `src/services/db/mockEngine.js`**

1. Update `CURRICULUM_VERSION` to `'2026.11.08.v9_academic_elevation'`.
2. In `mockEngine.getDb()`, when `parsed._curriculum_version !== CURRICULUM_VERSION`:
   - Replace each course in `parsed.courses` with the fresh version from `INITIAL_COURSES`.
   - Update `parsed._curriculum_version = CURRICULUM_VERSION`.
   - Update `safeStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))`.
3. Add a helper method `syncCurriculumFromDisk()` to `mockEngine` so developers or UI buttons can trigger an immediate re-sync anytime.
4. Also verify `_normalizeCourse()` ensures `modules` always contain fresh lessons.

- [ ] **Step 4: Run migration test to verify it passes**

Run: `node tests/test_curriculum_cache_migration.mjs`
Expected: PASS with "✓ Cache migration test passed successfully".

---

### Task 2: Content Deconstruction & Bullet Formatting in Module 2 (Lessons 2.2 to 2.8)

**Files:**
- Modify: `src/services/db/curriculum/module2.js`
- Test: `scratch/audit_module2_formatting.mjs`

**Interfaces:**
- Consumes: `module2Data`
- Produces: Fully deconstructed lessons with 0 run-on paragraphs, structured `###` headings, front-loaded bold bullet points, and definition cards.

- [ ] **Step 1: Write the failing audit test for Module 2**

Create `scratch/audit_module2_formatting.mjs` to check:
1. Lesson 2.2: AAA model (Authentication, Authorization, Accounting) must have `### The First A: Authentication`, `### The Second A: Authorization`, `### The Third A: Accounting`, and `#### The Three Types of Evidence:` with bullet points for Something you know, Something you have, Something you are.
2. Lesson 2.3: Least Privilege must have `### The Two Legitimate Architectural Exceptions`, `### How to Implement Least Privilege: A Four-Step Operational Framework` with `### Step 1: Inventory Access`, `### Step 2: Justify Access`, `### Step 3: Reduce to Minimum`, `### Step 4: Enforce Role-Based Access Control`.
3. Lesson 2.8: Case Studies must have `### Case Study 1: The Target Corporation Breach (2013)` with deconstructed bullet points under `#### Incident Overview & Attack Vector:`, `#### Violated Defensive Principles:`, and `#### Mandatory Technical & Governance Countermeasures:` (no continuous run-on sentences).
4. Zero em-dashes (`—`) in any lesson.
5. All definitions formatted as `- **Term:** Definition`.

- [ ] **Step 2: Run test to verify current state**

Run: `node scratch/audit_module2_formatting.mjs`
Expected: Identifies any lingering unbulleted sections or plain-text headers in Module 2.

- [ ] **Step 3: Refactor Module 2 Lessons 2.2 through 2.8**

Apply precise deconstruction:
- Break walls of text into punchy 2-3 sentence concept statements followed by structured bullet points (`- **Lead-In:** Detailed point`).
- Split dense lists into nested sub-bullets.
- Format procedural workflows into `### Step X: Title` headers.
- Reconstruct Case Studies into structured audit dossiers.

- [ ] **Step 4: Run audit test to verify it passes**

Run: `node scratch/audit_module2_formatting.mjs`
Expected: PASS with 0 formatting defects.

---

### Task 3: Content Deconstruction & Bullet Formatting in Module 3 (Lessons 3.1 to 3.8)

**Files:**
- Modify: `src/services/db/curriculum/module3.js`
- Test: `scratch/audit_module3_formatting.mjs`

**Interfaces:**
- Consumes: `module3Data`
- Produces: Deconstructed lessons with 0 ASCII boxes, 0 raw path strings, 0 duplicate captions, structured Mermaid flowcharts, and multi-tier bullets.

- [ ] **Step 1: Write the failing audit test for Module 3**

Create `scratch/audit_module3_formatting.mjs` checking:
1. Lesson 3.1: Threat Actors: Structured tiers (Script Kiddies, Hacktivists, Organized Cybercrime, Nation-State APTs) with structured comparison tables and bullet points.
2. Lesson 3.2: Malware Families: Viruses, Worms, Trojans, Ransomware, Rootkits, Spyware cleanly separated with `### Group X: ...` and definition cards.
3. Lesson 3.5: Cyber Threat Intelligence:
   - Data vs. Information vs. Intelligence deconstructed into definition cards (`- **Data:** ...`, `- **Information:** ...`, `- **Intelligence:** ...`).
   - Four levels of CTI formatted as Mermaid flowchart and GFM table (0 ASCII diagrams).
   - Duplicate figure captions removed.
   - Core Competencies formatted with front-loaded bold bullets.
4. Lesson 3.6 & 3.7: MITRE ATT&CK & Cyber Kill Chain deconstructed into step-by-step phases.

- [ ] **Step 2: Run test to verify current state**

Run: `node scratch/audit_module3_formatting.mjs`
Expected: Identifies unbulleted lines (like raw `Data: ...`, `Information: ...` in Lesson 3.5) and duplicate captions.

- [ ] **Step 3: Refactor Module 3 Lessons 3.1 through 3.8**

Update `src/services/db/curriculum/module3.js`:
- Deconstruct all dense paragraphs into front-loaded bold bullet points.
- Ensure all Mermaid diagrams and GFM tables are cleanly formatted.
- Purge any duplicate figure captions or unpromoted lines.

- [ ] **Step 4: Run audit test to verify it passes**

Run: `node scratch/audit_module3_formatting.mjs`
Expected: PASS with 0 formatting defects.

---

### Task 4: Content Deconstruction & Bullet Formatting in Module 4 (Lessons 4.1 to 4.5)

**Files:**
- Modify: `src/services/db/curriculum/module4.js`
- Test: `scratch/audit_module4_formatting.mjs`

**Interfaces:**
- Consumes: `module4Data`
- Produces: Deconstructed lessons with 0 unformatted definition runs, 0 em-dashes, and structured network security bullet points.

- [ ] **Step 1: Write the failing audit test for Module 4**

Create `scratch/audit_module4_formatting.mjs` checking:
1. Lesson 4.1: Network Fundamentals:
   - The five core risk definitions (Asset, Threat, Vulnerability, Impact, Likelihood) must NOT be in one continuous paragraph; each must be a separate `- **Term:** Definition` item.
   - OSI Model layers (Layer 1 to Layer 7) formatted as `### Layer X: Name` with structured bullets for PDU, protocols, and vulnerabilities.
2. Lesson 4.2: TCP/IP & Packet Analysis: Three-way handshake deconstructed into sequential steps.
3. Lesson 4.3 to 4.5: Firewalls, IDS/IPS, and Zero Trust Segmentation with structured tables and bullets.

- [ ] **Step 2: Run test to verify current state**

Run: `node scratch/audit_module4_formatting.mjs`
Expected: Identifies any lingering run-on definitions in Module 4.

- [ ] **Step 3: Refactor Module 4 Lessons 4.1 through 4.5**

Deconstruct dense paragraphs into front-loaded bullet points, format OSI layers cleanly, and convert risk equations into prominent callouts.

- [ ] **Step 4: Run audit test to verify it passes**

Run: `node scratch/audit_module4_formatting.mjs`
Expected: PASS with 0 formatting defects.

---

### Task 5: Content Deconstruction & Bullet Formatting in Module 5 (Lessons 5.1 to 5.5)

**Files:**
- Modify: `src/services/db/curriculum/module5.js`
- Test: `scratch/audit_module5_formatting.mjs`

**Interfaces:**
- Consumes: `module5Data`
- Produces: Deconstructed incident response and SOC lessons with structured playbooks, triage matrices, and 0 em-dashes.

- [ ] **Step 1: Write the failing audit test for Module 5**

Create `scratch/audit_module5_formatting.mjs` checking:
1. Lesson 5.1 to 5.5: SOC operations, SIEM correlation, triage playbooks, incident response steps (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned).
2. All phases formatted as `### Step X: Phase Name` or `### Phase X: Name` with structured multi-level bullets.
3. Zero em-dashes.

- [ ] **Step 2: Run test to verify current state**

Run: `node scratch/audit_module5_formatting.mjs`

- [ ] **Step 3: Refactor Module 5 Lessons 5.1 through 5.5**

Format all procedural playbooks into step badges, definition cards, and structured bullet lists.

- [ ] **Step 4: Run audit test to verify it passes**

Run: `node scratch/audit_module5_formatting.mjs`
Expected: PASS with 0 formatting defects.

---

### Task 6: System Integration, Comprehensive Audit & Production Build

**Files:**
- Modify: All affected files
- Test: `scratch/audit_all_modules.mjs`, `tests/unit_test_question_banks.mjs`, `tests/test_module_unlock_and_celebration.mjs`, `tests/challenger_m5_stress_test.mjs`

- [ ] **Step 1: Run comprehensive curriculum audit script**

Execute: `node scratch/audit_all_modules.mjs`
Expected: 0 em-dashes, 0 laboratory exercises, 0 raw image paths, 0 unbulleted definition blocks, 0 syntax errors across all 34 lessons.

- [ ] **Step 2: Run all curriculum and question bank test suites**

Execute:
- `node tests/unit_test_question_banks.mjs` (33 question bank verification tests)
- `node tests/test_module_unlock_and_celebration.mjs` (11 module unlock and celebration tests)
- `node tests/challenger_m5_stress_test.mjs` (25 challenger quiz stress tests)
- `node tests/test_curriculum_cache_migration.mjs` (Cache migration test)
Expected: All 70+ test cases PASS cleanly.

- [ ] **Step 3: Verify production build**

Execute: `npm run build`
Expected: Build succeeds with 0 errors.

---

## Execution Handoff

Please review this implementation plan. Does it capture what you want? Which execution approach would you prefer?

- **Subagent-driven** - A fresh subagent implements each task and a fresh reviewer checks it before the next one starts, then a whole-branch review at the end.
- **Native** - I implement every task directly in this session step-by-step, running verification commands after each step, then verify the entire system.
