## Revision

### Summary

Sigma (rules specification 2.1.0, 2 August 2025) describes detections in YAML with mandatory title, logsource and detection. Modifiers (contains, endswith, all, re, ...) and conditions (and, or, not, 1 of, all of) express the logic. Values are case-insensitive, but regexes are case-sensitive.

**Backslash escaping needs care:** four backslashes match two. Conversion via pySigma and sigma-cli uses pipelines to map fields. Every rule needs positive, negative and edge tests. The Tamarind pack has 7 rules and 18 cases, all passing, and every rule fires only on WS-07 activity on the reference day. Version control, hooks, CI and peer review form the workflow. The hook caught a one-word change that broke a rule. CrowdStrike's Channel File 291 incident (19 July 2024; about 8.5 million devices) shows why content needs real-interpreter testing and staged deployment.

### Important concepts

rules are code; the repository is the source of truth; tests encode false positives.

### Key technical takeaways

sigma check and convert; read the converted query; negative tests for near-misses.

### Glossary

| Term | Meaning |
|---|---|
| CI | Continuous integration. |
| pySigma | Python library behind sigma-cli. |
| Pipeline | pySigma field and log-source mapping. |
| Sigma | Vendor-neutral detection rule format. |
| UUID | Universally unique identifier. |

### Common mistakes

no negative tests; console-only edits; bulk imports without measuring volume.

### Revision questions

​1. Name three modifiers. 2. Explain the escaping rule for backslashes. 3. List five review checks.

### Further reading

[R1]; SigmaHQ rule repository [R4].

## References

- [R1] SigmaHQ. "Sigma Rules Specification", version 2.1.0, release date 2025-08-02. URL: [https://github.com/SigmaHQ/sigma-specification/blob/main/specification/sigma-rules-specification.md](https://github.com/SigmaHQ/sigma-specification/blob/main/specification/sigma-rules-specification.md) Accessed: 2026-11-07. Supports: mandatory sections, case rules, escaping, condition patterns.
- [R2] CrowdStrike. "External Technical Root Cause Analysis - Channel File 291", 6 August 2024. URL: [https://www.crowdstrike.com/wp-content/uploads/2024/08/Channel-File-291-Incident-Root-Cause-Analysis-08.06.2024.pdf](https://www.crowdstrike.com/wp-content/uploads/2024/08/Channel-File-291-Incident-Root-Cause-Analysis-08.06.2024.pdf) Accessed: 2026-11-07. Supports: 21 versus 20 inputs, Content Validator, mitigations.
- [R3] Microsoft. "Helping our customers through the CrowdStrike outage", 20 July 2024. URL: [https://blogs.microsoft.com/blog/2024/07/20/helping-our-customers-through-the-crowdstrike-outage/](https://blogs.microsoft.com/blog/2024/07/20/helping-our-customers-through-the-crowdstrike-outage/) Accessed: 2026-11-07. Supports: 8.5 million devices.
- [R4] SigmaHQ. Sigma specification repository (rules, correlation, filters, modifiers, tags and taxonomy appendices); modifiers appendix at specification/sigma-appendix-modifiers.md. URL: [https://github.com/SigmaHQ/sigma-specification](https://github.com/SigmaHQ/sigma-specification) Accessed: 2026-11-07. Supports: specification documents list; modifier names (windash, cidr, base64offset and others).
- [R5] Lab evidence. rk_sigma_output.txt, sigma_cli_output.txt (sigma-cli 4.0.0), git_hook_output.txt, 2026-11-07.
