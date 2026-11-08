# Direct Engineering Mode

- Inspect only the files relevant to the requested task.
- Understand existing architecture before modifying code.
- Do not over-explain, repeatedly ask unnecessary questions, or generate lengthy plans.
- For small tasks, implement directly.
- For large tasks, create a concise checklist and execute it immediately.
- Avoid unnecessary dependencies, abstractions, files, and refactoring.
- Reuse existing components, utilities, and APIs.
- Write minimal, production-quality code.
- Do not modify unrelated files.
- Run relevant tests and build checks after implementation.
- Fix errors before reporting completion.
- Never claim success without verification.
- Report only: changes made, files affected, tests passed, and remaining issues.

**Objective:** Minimum unnecessary tool calls, minimum code changes, maximum correctness and execution speed.

---

# Lightweight Architecture & Project Optimization Guardrails

### 1. File Size Ceiling & Modularization
- **Strict Limit:** Never create monolithic files exceeding 200–300 lines.
- **Decomposition:** Split large features into logical sub-components, dedicated hooks, step wizards, and pure helper utilities (e.g. `index.jsx`, `components/`, `hooks/`, `utils/`).
- **Single Responsibility:** Each file must handle exactly one concern (presentation, business state, modal interaction, or API communication).

### 2. Dead Code & File Hygiene
- **Zero Orphaned Files:** Never leave unused files, dead React components, orphan hooks, or unreferenced assets in the codebase.
- **Proactive Cleanup:** Periodically identify and purge unused files, obsolete routes, dead styles, and unused npm dependencies.
- **Clean Rewiring:** When decomposing monoliths, keep top-level wrappers clean and minimal (e.g., re-exporting from modular subdirectories) to maintain 100% backward compatibility.

### 3. Aggressive Lazy-Loading & Code-Splitting
- **Route Splitting:** All top-level page routes in `App.jsx` must be lazy-loaded using `React.lazy()` and wrapped in `Suspense`.
- **Heavy Feature Isolation:** Heavy subsystems (Cyber Labs, interactive terminals, PDF generators, 3D canvases, rich-text block editors) must be loaded dynamically on demand.
- **Conditional & Modal Imports:** Import heavy third-party libraries (e.g., `canvas-confetti`, `jspdf`, `chart.js`) only when the relevant action is triggered.

### 4. Asset & Media Optimization
- **Zero Heavy Media in Bundle:** Never store unoptimized raw videos or heavy video files directly in repo storage or static bundles.
- **Image Optimization:** Use modern lightweight formats (WebP, optimized SVGs) and serve responsive image resolutions.
- **On-Demand Data Loading:** Load heavy curriculum resources, chapter notes, and diagram assets on demand rather than loading all modules upfront.

---

# Curriculum Content Design & Academic Writing Standards (GOV.UK & W3C WAI Floor)

When authoring, reviewing, updating, or formatting curriculum chapters, lessons, or educational notes:

### 1. Section-by-Section Inspection Mandate
- Inspect and audit every single section of the chapter individually from start to finish.
- Verify that no section contains unformatted plain-text runs, unbulleted examples, unpromoted goals, or run-on step sentences.
- Check and format every heading, subheading, paragraph, main point, subpoint, bullet list, and definition card across all chapter blocks.
- **Strict Scope Boundary:** Focus strictly on the content format, readability, and typography itself. Never modify classroom toolbars, laboratory sidebars, or unrelated panels unless explicitly requested.

### 2. Semantic Heading Hierarchy (W3C WAI Standards)
- **# Level 1:** Document / Course title only (single occurrence per document).
- **## Level 2:** Major chapter modules and thematic chapters. Rendered centered with illuminated accent borders.
- **### Level 3:** Core foundational pillars, categories, architectural models, and procedural steps (`### Goal X: ...`, `### Group X: ...`, `### Step X: Title`, `### Pillar X: Title`). Rendered with prominent amber left-border bars and automatic badge chips (`[GOAL 1]`, `[GROUP 2]`).
- **#### Level 4:** Operational contexts, real-world examples, threat scenarios, and failure impact analyses (`#### Real-World Operational Examples:`, `#### Impact of Authentication Failure:`). Rendered with illuminated amber dot bullet indicators.
- **##### Level 5:** Tactical technical specifications, CLI flags, RFC standards, and monospace metadata.
- **Heading Line Separation Invariant:** Never attach explanatory body sentences to a heading line (`### Step 1: Inventory access. You cannot reduce...` is strictly prohibited). The heading must stand entirely alone on its line, with descriptive text placed on subsequent lines.

### 3. Paragraph Chunking & Scannability (GOV.UK Content Guidelines)
- **Paragraph Ceiling:** Maximum 3–4 sentences (60–80 words) per paragraph block. Never leave unbroken walls of text.
- **Front-Loaded Bold Lead-Ins:** Every bullet point, example, or sub-point must begin with a strong, front-loaded bold concept name:
  `- **Concept Name:** Operational explanation with precise technical terminology.`
- **Transforming Examples:** When presenting examples or failure modes, never write run-on paragraphs. Always deconstruct them into bulleted items with front-loaded lead-ins under an informative `####` sub-heading.
- **Action-Oriented Writing:** Cut conversational throat-clearing, filler phrases, and rhetorical questions. Write in active, direct, and authoritative prose.

### 4. Structured Lexicons & Definition Lists (W3C WAI `<dl>` Integration)
- Every term definition must follow the structured `- **Term:** Detailed operational definition.` syntax.
- Raw plain em-dashes (`Term — definition`) on plain text lines without bullet markers are strictly prohibited.
- The parser automatically promotes structured lists into high-contrast obsidian cards (`<dl>`, `<dt>`, `<dd>`) with amber term titles and indented definitions.
- Conflated or confused concepts must be structured into a comparative markdown table (`| Confused Pair | Concept A | Concept B | Core Distinguishing Criterion | Real-World Scenario |`).

### 5. Empirical & Academic Rigor (University of Luxembourg Standards)
- Replace colloquial examples with grounded enterprise and cyber-physical systems (e.g., SCADA infrastructure, hospital EHRs, PCI DSS payment pipelines, Stuxnet centrifuges, SAML/OIDC federations).
- Ground security principles in quantitative operational metrics: latency thresholds, "Five Nines" (99.999%) uptime, MTBF, RTO/RPO, intrusion dwell time.
- All learning objectives under `## Core Competencies and Learning Objectives` must be structured into actionable bullet items with front-loaded concept tags.

---

# Course Engineering & Operational Blueprint (Authoritative Standards)

### 1. Visual Models & Diagrams Placement Invariant
- **Contextual Inline Placement Only:** All diagrams, flowcharts, and architecture blueprints must be embedded directly inside the relevant theoretical section (`![Caption](/assets/courses/<slug>/<file>.png)`), right where the concept is taught.
- **Strict Anti-Pattern (No End-of-Lesson Galleries):** Never dump image galleries or stage photos at the bottom/ending of a lesson. Visuals must be encountered during the reading flow.
- **Dual-Format Asset Storage:** Optimize and store high-resolution diagrams in `public/assets/courses/<course-slug>/` with both `.png` and `.jpg` formats.

### 2. Assessment Architecture & Question Bank Standards
- **Volume:** Exactly 200 questions per module, maintained in isolated files (`moduleXQuestions.js`).
- **Difficulty Distribution:** Exactly 100 Medium (conceptual application, scenario analysis) and 100 Difficult (edge cases, multi-factor evaluation, calculations). Exactly 0 Easy / trivia questions.
- **Strict Question Schema:** Every question must have `id`, `text`, `options` (array of 4 strings), `correct_answer_index` (0–3), `explanation`, and `difficulty` ('Medium' | 'Difficult').
- **Module Knowledge Checks:** Sample exactly 20 questions (balanced 10 Medium + 10 Difficult) with non-deterministic option shuffling that preserves the correct answer string. Passing score: 80% (16/20).
- **Final Certification Exam:** Exactly 60 MCQs sampled evenly across all modules (10 questions per module), timed at 60 minutes with proctoring / blur protection.

### 3. Strict Linear Curriculum Progression Invariant
- **Linear Daisy-Chain:** Module 1 lessons unlocked by default. Module 1 Knowledge Check unlocks only after 100% of Module 1 lessons are completed. Module 2 unlocks only after passing Module 1 Knowledge Check ($\ge 80\%$).
- **Final Exam Unlock Gate:** Final exam unlocks only when all lessons across all modules are read AND all module knowledge checks are passed ($\ge 80\%$).
- **Zero Production Bypass:** Purge all development bypass flags (`rk_dev_gateway_unlock_all`) from production code.

### 4. Classroom Viewport Ergonomics & Scroll Reset
- **Instant Scroll-to-Top on Unit Progression:** When cadets click "Complete & Next", "Next Unit", or switch lessons via the sidebar, the center stage `<main>` scroll container must immediately execute `scrollTo({ top: 0, left: 0, behavior: 'instant' })`. Cadets must never land at the bottom of a new unit.

### 5. Course Presentation & Card Standards
- **Direct Authoritative Titles:** Never prefix titles with "Course 01:" or "Course 02:". State the clean course title directly (e.g., `Introduction to Cybersecurity`).
- **Zero Truncation (`...`):** Never apply `line-clamp-3` or truncate course descriptions with ellipses. Show complete, high-impact institutional briefs.
- **Tight Card Geometry:** Use natural content wrapping with `gap-4` instead of arbitrary `min-h-[510px]` and `justify-between` to eliminate empty vertical gaps.
- **Obsolete Simulator Cleanup:** Remove callouts or buttons for sandboxes/simulators that are not integrated into that specific course.

### 6. Cache Invalidation & Schema Versioning Lifecycle
- Whenever modifying static database fixtures (`cyberCourses.js`, modules, or question banks):
  1. Bump `CURRICULUM_VERSION` in `src/services/db/mockEngine.js`.
  2. Update the asserted version in `tests/test_curriculum_cache_migration.mjs`.
  3. Run `node tests/test_curriculum_cache_migration.mjs` to verify safe migration without wiping cadet accounts, progress metrics, quiz history, or token balances.


