1. Requirements: extract testable claims from Modules 2-6 (identity, PDP rules, segmentation, data protection, monitoring, recovery); give each an ID.
2. Threat model: the data-flow view of the shipment portal and payroll export with STRIDE per boundary; each threat links to a requirement.
3. Tests: for each requirement, a test by effect - PDP unit tests, connectivity matrix, design-review and resilience-review gates, monitoring-signal tests with generated telemetry, timed restores.
4. Evidence: outputs saved with date and tool version, hashed, stored in the immutable evidence store (Module 6).
5. Matrix: control_matrix.py builds the status; target 100% VALIDATED for restricted systems before go-live.
6. Actions: R6 - remediate the Module 5 design findings and re-run arch_review.py until 0 findings; R9 - hold the threat-model review, record approval and reference it as evidence.
7. Continuity: re-run the matrix in CI and weekly; alert on any status change; report monthly to the architecture board.
