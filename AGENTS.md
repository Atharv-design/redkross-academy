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
