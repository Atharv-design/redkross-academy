A report for an AI evaluation contains:

1. Summary: system, version, scope, overall risk and decision requested.
2. Method: probes, runs, seeds, model and configuration, limitations.
3. Findings per category: failure counts with intervals, example evidence (canary appearance, ledger entries), affected assets, severity (impact x likelihood with uncertainty).
4. Control evidence: unit tests, audits, provenance checks.
5. Recommendations with owners; retest plan.
6. Residual risk statement in plain language.

Example finding (from the lab): "Naive configuration: another customer's phone number was disclosed in 5/5 runs (95% CI 57-100%). Root cause: retrieval without access control. Hardened configuration: 0/5 (upper bound 43%); the ACL is enforced in code before ranking, so the residual risk depends on ACL correctness, verified by the Module 2 trace."
