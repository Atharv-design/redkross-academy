# Course 03 Duplicate Content Audit & Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Audit, document, and surgically remove the 46 redundant copies of the "Platform Architectural Comparison: Linux vs. Windows NT" table and "Operational Defense Invariant" warning block across Course 03, strictly retaining canonical instances in Lesson 1.1 and Lesson 8.6.

**Architecture:** A verified, non-destructive exact string replacement pipeline executing in Node.js with SHA-256 pre- and post-hashing, exact-match boundary validation, and curriculum test verification.

**Tech Stack:** Node.js (ESM), PowerShell, KaTeX, JavaScript.

**Spec:** User request dated 2026-11-10: Course 03 duplicate content audit and cleanup.

---

## Global Constraints

- Scope: Course 03 ONLY (`src/services/db/course03/modules/module1.js` through `module8.js`).
- Never delete or modify unrelated educational content, formulas, diagrams, code blocks, or references.
- Retain the complete comparison table and warning callout in Lesson 1.1 (`les_c3_m1_l1`) and Lesson 8.6 (`les_c3_m8_l6`).
- Remove the exact redundant footer block from the remaining 46 lessons (`les_c3_m1_l2` to `les_c3_m1_l6`, `les_c3_m2_l1` to `les_c3_m2_l6`, `les_c3_m3_l1` to `les_c3_m3_l6`, `les_c3_m4_l1` to `les_c3_m4_l6`, `les_c3_m5_l1` to `les_c3_m5_l6`, `les_c3_m6_l1` to `les_c3_m6_l6`, `les_c3_m7_l1` to `les_c3_m7_l6`, and `les_c3_m8_l1` to `les_c3_m8_l5`).
- Ensure all 48 lessons parse cleanly with zero KaTeX errors, zero missing images, and all test suites pass.

## Review Focus

1. Partial trailing whitespace differences in the footer block: Ensure exact matching string accounts for `\n` boundaries.
2. Inadvertent clipping of preceding content: Validate that text immediately preceding the footer (e.g. `*Figure C03-M0X-DYY...*`) is completely preserved.
3. Lesson 1.1 and Lesson 8.6 retention verification: Explicitly assert that Lesson 1.1 and 8.6 still contain the full table and warning callout.
4. Total occurrence counts: Ensure pre-cleanup count is exactly 48 for both blocks, and post-cleanup count is exactly 2.
5. Production build and unit test validity: Ensure `npm test` and `npm run typecheck` run clean with zero errors.

---

### Task 1: Pre-Execution Hashing, Backup & Baseline Audit

**Files:**
- Backup Directory: `src/services/db/course03/modules/backup_audit/`
- Target Files: `src/services/db/course03/modules/module{1..8}.js`
- Test Script: `scripts/audit_c03_duplicate_details.mjs`

- [ ] **Step 1: Record baseline SHA-256 hashes of all 8 module files.**
- [ ] **Step 2: Verify backup directory integrity.**
- [ ] **Step 3: Run baseline occurrence count across all 48 lessons (Expected: exactly 48 occurrences of table and warning).**

---

### Task 2: Surgical Pruning of Redundant Footers (46 Lessons)

**Files:**
- Modify: `src/services/db/course03/modules/module1.js` (lessons l2-l6)
- Modify: `src/services/db/course03/modules/module2.js` (lessons l1-l6)
- Modify: `src/services/db/course03/modules/module3.js` (lessons l1-l6)
- Modify: `src/services/db/course03/modules/module4.js` (lessons l1-l6)
- Modify: `src/services/db/course03/modules/module5.js` (lessons l1-l6)
- Modify: `src/services/db/course03/modules/module6.js` (lessons l1-l6)
- Modify: `src/services/db/course03/modules/module7.js` (lessons l1-l6)
- Modify: `src/services/db/course03/modules/module8.js` (lessons l1-l5)
- Implementation Script: `scripts/execute_c03_duplicate_pruning.mjs`

- [ ] **Step 1: Write `scripts/execute_c03_duplicate_pruning.mjs` targeting the exact 1,705-character footer block.**
- [ ] **Step 2: Execute pruning across Modules 1 to 8 while skipping `les_c3_m1_l1` and `les_c3_m8_l6`.**
- [ ] **Step 3: Verify post-cleanup occurrence counts (Expected: exactly 2 occurrences of table and warning).**

---

### Task 3: Comprehensive Verification & Integrity Testing

**Files:**
- Target Files: `src/services/db/course03/modules/module{1..8}.js`
- Verification Scripts: `scripts/audit_c03_clean_verification.mjs`, `scripts/verify_katex_deep.mjs`

- [ ] **Step 1: Verify all 48 lessons parse cleanly with `renderMarkdownToHtml` (0 KaTeX errors, 0 missing tokens).**
- [ ] **Step 2: Confirm canonical copies in `les_c3_m1_l1` and `les_c3_m8_l6` retain full formatting.**
- [ ] **Step 3: Run `npm test` unit tests and verify 17/17 pass.**
- [ ] **Step 4: Run `npm run typecheck` (`tsc --noEmit`) and verify 0 type errors.**
- [ ] **Step 5: Record and report post-cleanup SHA-256 hashes and character reductions.**
