## Revision

### Summary

The capstone delivers a gated detection pack, coverage, validation, hunts, a playbook and an executive summary for Tamarind Freight. build_pack.py enforces G1 unit tests, G2 ATT&CK tags, G3 no purple-team regression against the previous pack and G4 a false-positive budget with documented exceptions. The tuned pack passed (8/8 cases, previously 5/8) and was released with a SHA-256 manifest. Removing the DNS exception blocked the release. Reports separate a technical hunt report (hypotheses, coverage, method, validation, graded findings, gaps) from a one-page executive summary (impact, confidence, decisions, metrics). After release, monitor telemetry, rules and the monitoring infrastructure. Equifax's expired inspection certificate (GAO-18-559: about 10 months expired; attack of about 76 days) shows the cost of silent monitoring failure.

### Important concepts

gates people trust; exceptions with expiry; evidence-traced reporting.

### Key technical takeaways

compare with the previous pack; exit codes for CI; hash manifests.

### Glossary

| Term | Meaning |
|---|---|
| FP budget | Maximum acceptable false-positive volume for a rule. |
| Manifest | A list of released files with hashes and metadata. |
| Release gate | An automated check that can block a release. |

### Common mistakes

gates on lab data only; permanent exceptions; executive pages full of technique IDs.

### Revision questions

​1. List the four gates. 2. What must an exception include? 3. Name four health checks for monitoring infrastructure.

### Further reading

[R1]; Part C capstone brief.

## References

- [R1] US Government Accountability Office. GAO-18-559 "Data Protection: Actions Taken by Equifax and Federal Agencies in Response to the 2017 Breach", August 2018 (released 7 September 2018). URL: [https://www.gao.gov/products/gao-18-559](https://www.gao.gov/products/gao-18-559) Accessed: 2026-11-07. Supports: 13 May and 29 July 2017 dates, about 76 days, 145.5 million individuals, certificate expired about 10 months, detection after renewal.
- [R2] MITRE. Enterprise ATT&CK 20.1 STIX data. URL: [https://github.com/mitre-attack/attack-stix-data](https://github.com/mitre-attack/attack-stix-data) Accessed: 2026-11-07. Supports: technique tags in the manifest.
- [R3] SigmaHQ. "Sigma Rules Specification" 2.1.0 (2025-08-02). URL: [https://github.com/SigmaHQ/sigma-specification](https://github.com/SigmaHQ/sigma-specification) Accessed: 2026-11-07. Supports: rule status and metadata.
- [R4] Lab evidence. build_pack.py, build_pack_output.txt, pack/ (CPython 3.14.4), 2026-11-07.
