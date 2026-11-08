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

