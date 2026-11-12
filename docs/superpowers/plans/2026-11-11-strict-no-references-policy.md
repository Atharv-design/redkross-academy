# Course 04 Strict No-References Policy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enforce the strict no-references student notes policy exclusively on **Course 04 (`crs_cyber_python_04` — Python for Cybersecurity)** across all 48 lessons, its Markdown/metadata authoring sources, module compiler, compiled module JS files, and all Course 04 question banks/explanations—while preserving 100% of Course 04 educational content, diagram slots, and pending Batch 1–20 diagram work, and leaving Courses 01, 02, and 03 completely untouched.

**Architecture:** We introduce a small, opt-in `LessonLabResourcesBar.jsx` component rendered inside `LessonContentPanel.jsx` strictly when a lesson defines `lab_resources` (so Courses 01–03 UI and `pdf_resources` remain pixel-identical and zero duplicate downloaders are added). Course 04's Markdown/meta authoring sources and compiler (`compile_c04_module.mjs`) are updated synchronously with image/slot-preservation safeguards, stripping `[C04-MXX-RX]` citation tags, reference sections, external doc links, and internal `public/`/`scratch/`/`LAB_ASSETS/` paths while routing downloadable `.py`/`.log`/`.txt` lab files through verified `/assets/courses/cyber-04/labs/...` `lab_resources` entries. A dedicated automated policy & preservation test (`tests/test_course04_no_references_policy.mjs`) gates Course 04 permanently without false positives on code snippets, synthetic RFC 2606 URLs, Python slicing (`[0]`, `[1]`, `[2]`), or CLI package examples (`bandit -r src/`).

**Tech Stack:** React 19, Vite, Node.js ESM (`>= 22`), Lucide React, existing Markdown/KaTeX renderer (`src/utils/markdownParser.js` — untouched).

**Spec:** Revised user request scoping the Strict No-References Policy exclusively to Course 04 (`crs_cyber_python_04`).

---

## Global Constraints

- **Strict Course 04 Scope Only:** Modify ONLY Course 04 files, Course 04 authoring/compiler artifacts, opt-in `LessonLabResourcesBar` support, Course 04 policy tests, and the required `CURRICULUM_VERSION` cache-migration update. Never touch Courses 01, 02, or 03, their lessons, question banks, assets, metadata, or existing UI.
- **Zero Loss of Educational or Diagram Work:** Preserve all 8 modules, all 48 lessons and their sequence, all explanations, code examples, synthetic URL security demonstrations inside code/backticks, KaTeX math blocks, practical exercises, figure IDs, all 96 `diagram_slots` entries across M1–M8, any existing `images[]` entries, captions, walkthroughs, and all 1,600 Course 04 MCQs (`8 x 200`), options, answers, and explanation substance.
- **No Shared Renderer Changes:** Leave `src/utils/markdownParser.js` and `src/index.css` completely untouched.
- **Backup Before Any Edit:** Snapshot every modified workspace and scratch file into a timestamped backup folder before making edits.
- **Execution Discipline:** Plan only in this document; do NOT start edits until the user approves execution.

## Review Focus

- **Prose Documentation URLs vs Legitimate Security Example URLs in Code (Tasks 1, 4):** Course 04 intentionally demonstrates security hazards using synthetic URLs inside fenced code blocks, terminal captures, or inline backticks—including `=HYPERLINK("http://example.com","click")` and `` `=HYPERLINK("http://phish.example","Reset your account")` `` (`les_c4_m3_l3`), `http://{HOST}:{api_port}/api/status` (`les_c4_m5_l3`), `` `urllib.request.urlopen("https://example.com", ...)` `` / `"https://..."` (`les_c4_m5_l4`), `http://update-check.example.net/api` (`les_c4_m6_l5`), and `` `requests.get(f"https://api.example/v1/feed?access_token={tok}")` `` (`les_c4_m8_l4`). Meanwhile, narrative Markdown links like `[CWE-78](https://cwe.mitre.org/data/definitions/78.html)` (`les_c4_m4_l4`) and bibliography URLs in Modules 1–6 must be removed. Pinned in Task 1 (`tests/test_course04_no_references_policy.mjs`) by stripping fenced code blocks and inline backticks before checking prose URLs, and failing any clickable `[label](https?://...)` Markdown link anywhere in Course 04.
- **Python Indexing, Code Comments & CLI Examples vs Citations/Internal Paths (Tasks 1, 4):** Python code/examples contain `[0]` (`les_c4_m1_l2`, `m4_l1`), `split()[2]` (`m1_l3`), `split("user=")[1]` (`m1_l6`), `splitlines()[1]` (`m3_l3`), `getsockname()[1]` (`m5_l2`), `m[2]` (`m6_l3`), `# SAFE: escapes &, <, >, ", and ' into inert HTML character references` (comment inside a fenced block in `les_c4_m7_l5` matching raw `#.*references`), and `` `bandit -r src/` `` (Python `src/` layout CLI example in `les_c4_m8_l5`). None of these are citations or internal academy paths. Pinned in Task 1 by stripping fenced blocks + inline backticks before heading/citation checks and narrowing internal path detection strictly to academy directories (`public/assets/`, `scratch/`, `LAB_ASSETS/`, `src/services/`, `src/pages/`, `src/components/`, `src/utils/`).
- **Compiler Registry & Diagram Preservation Guard (Tasks 0, 3, 4):** Currently `scratch/compile_c04_module.mjs` line 76 sets `images: []`, which would wipe any populated diagrams during future Stage F recompiles. Task 3 updates `compile_c04_module.mjs` so existing non-empty `images[]` from the prior compiled `module{N}.js` or `meta.json` are preserved cleanly, `diagram_slots` are never overwritten, `lab_resources` pass through, and a structural preservation check runs automatically.
- **Lab Integration Non-Duplication & Asset Verification (Tasks 1, 2, 4):** Inspection of `LessonContentPanel.jsx` (`204-224`) and `src/pages/student/lesson-player/index.jsx` (`654-669`) confirms `activeLesson.pdf_resources` is an existing PDF-specific attachment list labeled `"Official Chapter Reference Documents (.pdf):"` backed by `resolvePdfUrl`. Leaving `pdf_resources` completely untouched protects Courses 01–03, while adding a tiny opt-in `LessonLabResourcesBar.jsx` component (rendered ONLY when `activeLesson.lab_resources?.length > 0`) serves Course 04's 12 verified `/assets/courses/cyber-04/labs/...` files cleanly without exposing `public/...` or `scratch/...` in lesson notes. Task 1 checks `fs.existsSync(path.join('public', res.url))` for every attached asset.
- **Question Bank Sampling Consistency (Tasks 5, 6):** Removing `[C04-M04-R1]`/`[C04-M04-R4]`/`[C04-M04-R5]` in `module4QuestionBank.js` and `[C04-M06-R5]`/`[C04-M06-R6]` in `module6QuestionBank.js` must stay synchronized with the 20 embedded sample questions inside `module4.js` and `module6.js`. Task 5 recompiles Modules 4 and 6 immediately after editing the banks and verifies both `moduleXQuestionBank` and `moduleXData.quiz.questions`.

---

## Exact File Inventory

### Files to Modify / Create (Strictly Scoped to Course 04 Policy)

| Layer | Exact File Path | Action |
| :--- | :--- | :--- |
| Authoring Markdown (Scratch) | `C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\c04_m1_lessons.md` .. `c04_m8_lessons.md` | Remove `[C04-MXX-RX]`, reference headings/lists, prose URLs, and internal `public/`/`scratch/`/`LAB_ASSETS/` paths across all 8 modules |
| Authoring Metadata (Scratch) | `C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\c04_m1_meta.json` .. `c04_m8_meta.json` | Add structured `lab_resources` arrays on lab lessons (`/assets/courses/cyber-04/labs/...`), keeping `diagram_slots` unchanged |
| Course 04 Compiler (Scratch) | `C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\compile_c04_module.mjs` | Preserve existing `images[]` & `diagram_slots`, forward `lab_resources`, enforce inline zero-references check |
| Compiled Course 04 Modules | `src/services/db/course04/modules/module1.js` .. `module8.js` | Recompiled from sanitized Markdown + metadata via guarded compiler |
| Course 04 Question Banks | `src/services/db/course04/quizzes/module4QuestionBank.js`, `src/services/db/course04/quizzes/module6QuestionBank.js` | Strip `[C04-M04-R1]`, `[C04-M04-R4]`, `[C04-M04-R5]`, `[C04-M06-R5]`, `[C04-M06-R6]` from 5 explanations |
| Opt-In Lab Download UI | `src/pages/student/lesson-player/LessonLabResourcesBar.jsx` *(New, ~45 lines)* | Small modular component rendering downloadable `lab_resources` pills |
| Lesson Player Mount Point | `src/pages/student/lesson-player/LessonContentPanel.jsx` | Add import + 1-line `<LessonLabResourcesBar labResources={activeLesson.lab_resources} />` below existing `pdf_resources` (no edits to `pdf_resources`) |
| Cache Version & Migration Test | `src/services/db/mockEngine.js`, `tests/test_curriculum_cache_migration.mjs` | Bump `CURRICULUM_VERSION` to `'2026.11.11.v26_c04_strict_no_references'` and assert migrated C04 data |
| Automated Policy Test | `tests/test_course04_no_references_policy.mjs` *(New)* | Course 04 no-references, asset-resolution, and preservation regression test |

### Exact Files That Must Remain Completely Untouched

- **Course 01, 02, 03 Curriculum & Quizzes:** `src/services/db/curriculum/*`, `src/services/db/course02/**`, `src/services/db/course03/**`, `src/services/db/module1BlockNotes.js`, `src/services/db/psychologyCourses.js`.
- **Course 04 Engine & Top-Level Catalog Entry (already clean):** `src/services/db/course04/index.js`, `src/services/db/course04/course04Engine.js`, and unaffected question banks `module1QuestionBank.js`, `module2QuestionBank.js`, `module3QuestionBank.js`, `module5QuestionBank.js`, `module7QuestionBank.js`, `module8QuestionBank.js`.
- **Shared Renderers & Styles:** `src/utils/markdownParser.js`, `src/index.css`.
- **Existing Lesson Player Handlers & PDF Bar:** `src/pages/student/lesson-player/index.jsx`, `LessonTacticalInspector.jsx`, `LessonOutlineSidebar.jsx`, and the `activeLesson.pdf_resources` block inside `LessonContentPanel.jsx`.
- **Existing Assets & Docs:** All files under `public/assets/courses/cyber-01/`, `cyber-02/`, `cyber-03/`, `public/assets/courses/cyber-04/labs/*`, `cyberCourses.js`, `api/courses.js`, and `AGENTS.md`.

---

## Lab-Resource Integration Design

- **Existing Architecture Audited:**
  - `src/pages/student/lesson-player/LessonContentPanel.jsx` (`204-224`) currently renders only `activeLesson.pdf_resources` (`Official Chapter Reference Documents (.pdf):`) wired to `handleDownloadAdminPdf` (`src/pages/student/lesson-player/index.jsx` `654-669`) and `resolvePdfUrl` (`src/services/db/assetStorage.js`). No other resource downloader exists in `src/components/student/` or `src/pages/student/lesson-player/`.
  - `public/assets/courses/cyber-04/labs/` already contains all 12 static Course 04 lab files (`m01_foundations.py`, `rkutils.py`, `m02_reusable.py`, `m03_files_data.py`, `m03_output.txt`, `m04_os_automation.py`, `m05_networking.py`, `m06_security_data.py`, `m07_defensive.py`, `rkloga/rkloga.py`, `rkloga/test_rkloga.py`, `rkloga/sample_auth.log`).
- **Design Decision:**
  - Do NOT modify `activeLesson.pdf_resources` or create a competing PDF downloader.
  - Add an optional `lab_resources?: Array<{ name: string; url: string; description?: string }>` field on Course 04 lessons whose URLs use clean static web paths (`/assets/courses/cyber-04/labs/...`, never `public/...`).
  - Render them via `<LessonLabResourcesBar labResources={activeLesson.lab_resources} />`, which returns `null` when empty/absent (zero effect on Courses 01–03 or Course 04 concept lessons without standalone scripts) and renders clean `<a href={res.url} download={res.name}>` download buttons matching the panel's existing styling (`bg-[#0E0C09] border-[#FF7A00]/30`).
  - **Planned Course 04 `lab_resources` Mapping (12 verified files):**
    - M1 (`l1`, `l6`): `m01_foundations.py`
    - M2 (`l1`, `l3`, `l4`, `l6`): `rkutils.py`, `m02_reusable.py`
    - M3 (`l1`, `l2`, `l6`): `m03_files_data.py` (`+ m03_output.txt` on `l6`)
    - M4 (`l1`, `l2`, `l3`, `l6`): `m04_os_automation.py`
    - M5 (`l1`, `l2`, `l3`, `l5`, `l6`): `m05_networking.py`
    - M6 (`l1`, `l2`, `l3`, `l4`, `l5`, `l6`): `m06_security_data.py`
    - M7 (`l1`, `l2`, `l4`, `l5`): `m07_defensive.py`
    - M8 (`l2`, `l3`, `l4`, `l6`): `rkloga.py`, `test_rkloga.py`, `sample_auth.log`

---

## Automated Test & Preservation Design (`tests/test_course04_no_references_policy.mjs`)

- **Imports:** `course04Data` (`src/services/db/course04/index.js`) and `COURSE04_MODULE_BANKS` (`src/services/db/course04/course04Engine.js`), plus optional `--snapshot <file>` / `--check-baseline <file>` baseline preservation mode.
- **Masking Pipeline (prevents false positives before scanning prose):**
  1. Replace fenced code blocks (```` ```[\s\S]*?``` ````) and inline backtick code spans (`` `[^`\n]+` ``) with inert placeholders before scanning prose rules.
  2. Ignore image tags (`!\[[^\]]*\]\([^)]+\)`) when checking prohibited Markdown links.
- **Checks Enforced on All 48 Course 04 Lessons (`content`, `summary`, `learning_objectives`):**
  1. **Prohibited Headings:** `/^#{1,6}\s*[^\n]*\b(?:Verified\s+References|Authoritative\s+References|Module\s+References|References|Bibliography|Further\s+Reading|Works\s+Cited|Sources)\b[^\n]*$/gim` (run on fence-stripped Markdown so Python `# ... references` comments are ignored).
  2. **Citation IDs:** `/\[C04-M\d+-R\d+\]/g` and `/\[R\d+\]/g` (raw Markdown — banned everywhere, including backticks/code).
  3. **Numbered Academic Citations Outside Code:** `/(?<![A-Za-z0-9_)\]])\[\d{1,3}\](?!\()/g` on code+backtick-stripped text, ignoring known hardware registers like `PCR[0]`.
  4. **Prose External URLs & Clickable Links:** On code+backtick-stripped text, fail `/https?:\/\/[^\s)>"'`]+/gi`. On raw Markdown, fail any non-image Markdown link `/(?<!\!)\[[^\]]+\]\(([^)]+)\)/g` (including `https?://...`, `public/...`, `.pdf`, or `/labs/`).
  5. **Exposed Internal Paths:** On raw Markdown, fail `/(?:public\/assets\/|scratch\/|LAB_ASSETS\/|src\/(?:services|pages|components|utils)\/|RK course notes)/gi` while preserving legitimate Python teaching commands such as `` `bandit -r src/` ``.
  6. **Trailing Source Attribution Phrases:** `/\bAccessed:\s*\d{4}-\d{2}-\d{2}|\bAccessed\s+\d{4}-\d{2}-\d{2}|\bRedKross\s+(?:Academy\s+)?Lab\s+Evidence\b/gi`.
  7. **`lab_resources` Physical Resolution:** For every lesson with `lab_resources`, verify `Array.isArray(les.lab_resources)`, every item has `name` and `url` starting with `/assets/courses/cyber-04/labs/`, and `fs.existsSync(path.join('public', item.url.slice(1)))` is `true`.
- **Checks Enforced on All 8 Course 04 Question Banks (`1,600` questions) & Module Embedded Quizzes (`160` sampled MCQs):**
  - Scan `q` / `text`, `options`, and `explanation` for `[C04-M\d+-R\d+]`, `Verified References`, `Accessed:`, `public/assets/`, `scratch/`, `LAB_ASSETS/`.
- **Preservation Verification (`--check-baseline`):**
  - Compare live `course04Data` against pre-edit JSON snapshot (`moduleIds`, `moduleOrders`, `lessonIds`, `lessonTitles`, `lessonOrder`, `diagram_slots` deep-equal, `images` deep-equal, `quiz` question counts and `COURSE04_MODULE_BANKS` question IDs + `correct` answer indices).

---

## Safe Implementation Sequence

### Task 0: Pre-Edit Timestamped Backups & Preservation Baseline

**Files:**
- Backup directory: `src/backups/c04_no_refs_<timestamp>/`
- Preservation baseline snapshot: `C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\c04_preservation_baseline.json`

- [ ] **Step 1: Back up every scheduled workspace and scratch file**

```powershell
$ts = Get-Date -Format "yyyyMMdd_HHmmss"
$bk = "src/backups/c04_no_refs_$ts"
New-Item -ItemType Directory -Force -Path "$bk/modules","$bk/quizzes","$bk/ui","$bk/tests","$bk/scratch_c04" | Out-Null
1..8 | ForEach-Object { Copy-Item "src/services/db/course04/modules/module$_.js" "$bk/modules/" }
Copy-Item "src/services/db/course04/quizzes/module4QuestionBank.js","src/services/db/course04/quizzes/module6QuestionBank.js" "$bk/quizzes/"
Copy-Item "src/pages/student/lesson-player/LessonContentPanel.jsx" "$bk/ui/"
Copy-Item "src/services/db/mockEngine.js" "$bk/"
Copy-Item "tests/test_curriculum_cache_migration.mjs" "$bk/tests/"
Copy-Item "C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\c04_m*_lessons.md","C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\c04_m*_meta.json","C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\compile_c04_module.mjs" "$bk/scratch_c04/"
```

- [ ] **Step 2: Capture structural preservation baseline JSON before any Course 04 edits**

Record for all 8 modules and 48 lessons: module IDs/orders, lesson IDs/titles/order, `diagram_slots` (`96` slots), `images`, KaTeX `:::math-steps` / `$$` counts, code fence counts, and all 1,600 MCQ IDs + `correct` answer indices into `scratch/c04_preservation_baseline.json`.

---

### Task 1: Create Course 04 Automated Reference-Policy & Preservation Test [TDD Red]

**Files:**
- Create: `tests/test_course04_no_references_policy.mjs`

- [ ] **Step 1: Write `tests/test_course04_no_references_policy.mjs`**

Implement the Course 04 scanner, synthetic-URL/Python-index/CLI safe-list masking, `lab_resources` disk existence check, question-bank scan, and optional `--baseline <path>` structural preservation assertion described under **Automated Test & Preservation Design**.

- [ ] **Step 2: Run the test against unmodified Course 04 to verify Red baseline**

Run: `node tests/test_course04_no_references_policy.mjs`
Expected: Exits `1` reporting the exact baseline violations (`46` lessons in Course 04 + `5` question bank entries `q_c4_m4_019`, `q_c4_m4_051`, `q_c4_m6_067`, `q_c4_m6_074`, `q_c4_m6_175`), and **0 false positives** on synthetic code URLs (`example.com`, `phish.example`, `update-check.example.net`, `api.example`), Python indexing (`[0]`, `[1]`, `[2]`), `# SAFE: ... character references` comment, or `bandit -r src/`.

---

### Task 2: Implement Modular Opt-In Lab Resource Bar (`LessonLabResourcesBar.jsx`)

**Files:**
- Create: `src/pages/student/lesson-player/LessonLabResourcesBar.jsx`
- Modify: `src/pages/student/lesson-player/LessonContentPanel.jsx` (lines ~14 and ~224 only; zero edits to `pdf_resources`)

- [ ] **Step 1: Create `src/pages/student/lesson-player/LessonLabResourcesBar.jsx`**

```jsx
import React from 'react';
import { Terminal, Download } from 'lucide-react';

export default function LessonLabResourcesBar({ labResources }) {
  if (!Array.isArray(labResources) || labResources.length === 0) return null;

  return (
    <div className="p-4 rounded-xl bg-[#0E0C09] border border-[#FF7A00]/30 space-y-2">
      <span className="text-xs font-mono font-bold text-[#FF7A00] block">
        Laboratory Scripts &amp; Practice Artifacts:
      </span>
      <div className="flex flex-wrap gap-2">
        {labResources.map((res, idx) => (
          <a
            key={res.url || idx}
            href={res.url}
            download={res.name}
            title={res.description || `Download ${res.name}`}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#1E1308] border border-[#FF7A00]/30 text-xs font-mono text-[#E2D9CE] hover:text-white hover:border-[#FF7A00]/60 transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>{res.name}</span>
            <Download className="w-3 h-3 text-[#FFA439]/80" />
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Mount `<LessonLabResourcesBar />` in `LessonContentPanel.jsx`**

Add `import LessonLabResourcesBar from './LessonLabResourcesBar';` near the top imports and place `<LessonLabResourcesBar labResources={activeLesson.lab_resources} />` directly after the closing `)}` of the `activeLesson.pdf_resources` block (line ~223). Leave `activeLesson.pdf_resources` untouched so Courses 01–03 UI is completely unchanged.

- [ ] **Step 3: Verify TypeScript check**

Run: `npm run typecheck`
Expected: Exits `0`.

---

### Task 3: Harden Course 04 Compiler (`scratch/compile_c04_module.mjs`)

**Files:**
- Modify: `C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\compile_c04_module.mjs`

- [ ] **Step 1: Add diagram/metadata preservation & inline no-reference gate to `compile_c04_module.mjs`**

1. Before writing `module{N}.js`, read the existing compiled `module{N}.js` (if present) and construct a map of existing `images` per `les.id` and expected lesson IDs in order.
2. When assembling each lesson object:
   ```js
   const existingImages = existingImagesById.get(les.id) || [];
   const preservedImages = (Array.isArray(les.images) && les.images.length > 0) ? les.images : existingImages;
   return { ...les, images: preservedImages, content };
   ```
   This guarantees neither `images` nor `diagram_slots` nor `lab_resources` can ever be dropped on recompile.
3. Assert lesson order and IDs match `existingLessonIds` if `module{N}.js` existed.
4. Add inline checks inside the per-lesson compiler loop matching Task 1's rules (`[C04-M*-R*]`, prohibited headings outside code fences, external URLs outside code/backticks, non-image Markdown links, `public/assets/`, `scratch/`, `LAB_ASSETS/`). Fail compilation immediately on any violation.

---

### Task 4: Sanitize Course 04 Markdown Sources, Metadata JSON, and Recompile Modules 1–8

**Files:**
- Modify: `scratch/c04_m1_lessons.md` .. `scratch/c04_m8_lessons.md`
- Modify: `scratch/c04_m1_meta.json` .. `scratch/c04_m8_meta.json`
- Regenerate: `src/services/db/course04/modules/module1.js` .. `module8.js`

- [ ] **Step 1: Clean all 8 Markdown files (`c04_m1_lessons.md` .. `c04_m8_lessons.md`)**

Preserve 100% of prose, walkthroughs, KaTeX, code blocks, synthetic code URLs, tables, and practicals while applying these exact cleanups:
1. Strip all `165` `[C04-MXX-RX]` markers cleanly—fixing backticked tags (`` `[C04-M08-R1]` ``, `` `[C04-M08-R2]` ``, `` `[C04-M08-R3]` ``) and parenthetical forms (`(`[C04-M06-R6]`)`) with zero stray whitespace or dangling punctuation.
2. Clean headings and remove reference sections while keeping revision/takeaway/checkpoint content intact:
   - `M1` (`les_c4_m1_l6`): `## 8. Module 1 Revision, Common Pitfalls & References` -> `## 8. Module 1 Revision & Common Pitfalls`; remove `### Verified References` and its `- **[C04-M01-R1..R5]**` list.
   - `M2` (`les_c4_m2_l6`): `## 7. Module 2 Consolidated Revision & References` -> `## 7. Module 2 Consolidated Revision`; remove `### Authoritative References` and `- **[C04-M02-R1..R8]**`.
   - `M3` (`les_c4_m3_l6`): `## 7. Module 3 Consolidated Revision & References` -> `## 7. Module 3 Consolidated Revision`; remove `### Authoritative References` and `- **[C04-M03-R1..R9]**`.
   - `M4` (`les_c4_m4_l6`): `## 6. Module 4 Consolidated Revision & References` -> `## 6. Module 4 Consolidated Revision`; remove `### Authoritative References` and `- **[C04-M04-R1..R6]**`.
   - `M5` (`les_c4_m5_l6`): remove `## 6. Module References` and `- **[C04-M05-R1..R6]**`.
   - `M6` (`les_c4_m6_l6`): remove `## 6. Module References` and `- **[C04-M06-R1..R7]**`.
3. Clean inline external documentation link in `M4` (`les_c4_m4_l4`): `([CWE-78](https://cwe.mitre.org/data/definitions/78.html))` -> `(MITRE CWE-78)`.
4. Clean internal repository, authoring, and scratch paths:
   - Replace every `[filename](public/assets/courses/cyber-04/labs/...)` link across Modules 1–8 with clean inline filenames (e.g., `` `m01_foundations.py` ``, available via **Laboratory Scripts & Practice Artifacts** below the lesson notes).
   - Remove `public/assets/courses/cyber-04/labs/` from command blocks (`python public/assets/courses/cyber-04/labs/m05_networking.py` -> `python m05_networking.py`) and intro text (`M1 L1` line 5).
   - Remove `(`scratch/c04_lab_outputs.txt`)` in `M2` (`les_c4_m2_l3`), `M3` (`les_c4_m3_l6`), and `M4` (`les_c4_m4_l1`).
   - Replace `LAB_ASSETS/C02/rk_c02_lab.pcap` (`M5` `les_c4_m5_l6`) -> `Course 02 packet capture bytes` (`raw` frame); replace `LAB_ASSETS/C04/` (`M8` `les_c4_m8_l5`) -> `the Course 04 lab scripts`.
   - Leave `` `bandit -r src/` `` (`M8` `les_c4_m8_l5`) and all synthetic URLs in code/backticks untouched.

- [ ] **Step 2: Populate `lab_resources` in `c04_m1_meta.json` .. `c04_m8_meta.json`**

Add verified `/assets/courses/cyber-04/labs/...` entries matching the Lab-Resource Integration Design table without modifying `id`, `title`, `order`, `diagram_slots`, `summary`, or `learning_objectives`.

- [ ] **Step 3: Recompile Modules 1–8 and verify lesson-layer compliance + baseline preservation**

Run:
```powershell
1..8 | ForEach-Object { node "C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\compile_c04_module.mjs" $_ }
node tests/test_course04_no_references_policy.mjs --lessons-only --baseline "C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\c04_preservation_baseline.json"
```
Expected: All 8 modules compile with `0` errors; `--lessons-only` + baseline preservation check passes (`48` lessons, `96` `diagram_slots`, all `lab_resources` verified on disk).

---

### Task 5: Clean Course 04 Question Banks & Resync Modules 4 & 6

**Files:**
- Modify: `src/services/db/course04/quizzes/module4QuestionBank.js` (`q_c4_m4_019`, `q_c4_m4_051`)
- Modify: `src/services/db/course04/quizzes/module6QuestionBank.js` (`q_c4_m6_067`, `q_c4_m6_074`, `q_c4_m6_175`)
- Recompile: `src/services/db/course04/modules/module4.js`, `module6.js`

- [ ] **Step 1: Remove citation IDs from the 5 flagged explanations**

Strip ` [C04-M04-R1][C04-M04-R4]` (`q_c4_m4_019`), ` [C04-M04-R5]` (`q_c4_m4_051`), ` [C04-M06-R5]` (`q_c4_m6_067`, `q_c4_m6_175`), and ` [C04-M06-R6]` (`q_c4_m6_074`) while keeping every explanation sentence, question text, 4 options, `difficulty`, and `correct` index completely intact.

- [ ] **Step 2: Recompile Modules 4 & 6 and verify Question Bank & Full Policy Tests**

Run:
```powershell
node "C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\compile_c04_module.mjs" 4
node "C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\compile_c04_module.mjs" 6
node tests/test_course04_no_references_policy.mjs --baseline "C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\c04_preservation_baseline.json"
node tests/unit_test_question_banks.mjs
```
Expected: Both scripts exit `0` with `0` policy violations across all 48 lessons, all 1,600 C04 bank items, and all 160 sampled module MCQs.

---

### Task 6: Cache Version Bump & Final Verification Gates

**Files:**
- Modify: `src/services/db/mockEngine.js` (update `CURRICULUM_VERSION` from `'2026.11.11.v25_c04_python_cybersecurity'` to `'2026.11.11.v26_c04_strict_no_references'` across lines ~166, 191, 213, 247)
- Modify: `tests/test_curriculum_cache_migration.mjs` (update version assertion to `'2026.11.11.v26_c04_strict_no_references'` and verify migrated Course 04 lesson content contains zero `[C04-M01-R1]` citations and retains `48` lessons + `lab_resources`)

- [ ] **Step 1: Bump `CURRICULUM_VERSION` and update cache migration assertions**

Apply identical `'2026.11.11.v26_c04_strict_no_references'` version strings across `mockEngine.js` and `tests/test_curriculum_cache_migration.mjs`.

- [ ] **Step 2: Verify Scope Isolation via `git status` / `git diff --name-only`**

Inspect changed files to verify zero unintended changes occurred to:
- `src/services/db/curriculum/*` (Course 01)
- `src/services/db/course02/**` (Course 02)
- `src/services/db/course03/**` (Course 03)
- `src/services/db/psychologyCourses.js`, `src/services/db/module1BlockNotes.js`
- `src/utils/markdownParser.js`, `src/index.css`
- `AGENTS.md`

- [ ] **Step 3: Execute Mandatory Final Verification Suite**

Run sequentially (must all exit `0`):
1. `node tests/test_course04_no_references_policy.mjs --baseline "C:\Users\athar\.gemini\antigravity\brain\98418f1c-549f-4008-8d03-5bc6d6ed02ef\scratch\c04_preservation_baseline.json"`
2. `node tests/unit_test_question_banks.mjs`
3. `node tests/test_curriculum_cache_migration.mjs`
4. `node tests/test_all_courses_math.mjs`
5. `npm run typecheck`
6. `npm test`
7. `npm run build`
