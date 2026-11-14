## Revision

### Summary

Assurance turns architectural claims into evidence through argument and tests. Architecture threat modelling applies STRIDE to data flows and trust boundaries, links threats to controls and requirements, and maps relevant threats to ATT&CK v20.1 for detection planning. Design reviews have entry criteria, defined reviewers and criteria, recorded decisions with conditions and expiring exceptions, and ADRs; automation handles the repeatable checks. Controls are validated by effect in authorised environments, with benign inputs and recorded results. A traceability matrix links requirements to controls, tests and hashed evidence; the lab matrix showed 7/9 validated, one failed and one without evidence. Continuous assurance repeats validation on change and on a cadence, with evidence-age metrics. Equifax's 2017 breach, as GAO reported, shows the cost of an inspection control silently disabled by an expired certificate and a scan that missed a vulnerable server.

### Important concepts

claim-argument-evidence; validation by effect; evidence age.

### Key technical takeaways

matrix as code; hash evidence; reconcile coverage with inventory.

### Glossary

| Term | Meaning |
|---|---|
| ADR | Architecture decision record. |
| Assurance | Justified confidence that requirements are met. |
| STRIDE | Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege. |
| Traceability matrix | Requirement-control-test-evidence mapping. |
| Validation by effect | Testing the outcome a control promises. |

### Common mistakes

treating configuration as proof; one-off validation; threat models that never link to tests.

### Revision questions

​1. Rank five kinds of evidence. 2. Apply STRIDE to one trust boundary. 3. What triggers re-validation?

### Further reading

GAO-18-559 [R1]; SP 800-53A [R3].

## References

- [R1] US GAO. "Data Protection: Actions Taken by Equifax and Federal Agencies in Response to the 2017 Breach", GAO-18-559, published 30 August 2018, publicly released 7 September 2018. URL: [https://www.gao.gov/products/gao-18-559](https://www.gao.gov/products/gao-18-559) Accessed: 2026-11-08 (report PDF text extracted). Supports: 145.5 million, four factors, out-of-date recipient list, scan missed the vulnerability, certificate expired about 10 months before the breach, no database segmentation, unencrypted credentials.
- [R2] Microsoft. "Threats - Microsoft Threat Modeling Tool". URL: [https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats](https://learn.microsoft.com/en-us/azure/security/develop/threat-modeling-tool-threats) Accessed: 2026-11-08. Supports: STRIDE category descriptions.
- [R3] NIST. SP 800-53A Rev. 5, "Assessing Security and Privacy Controls in Information Systems and Organizations", January 2022. URL: [https://csrc.nist.gov/pubs/sp/800/53/a/r5/final](https://csrc.nist.gov/pubs/sp/800/53/a/r5/final) Accessed: 2026-11-08.
- [R4] MITRE. ATT&CK Enterprise tactics (v20.1). URL: [https://attack.mitre.org/tactics/enterprise/](https://attack.mitre.org/tactics/enterprise/) Accessed: 2026-11-08.
- [R5] Lab evidence. control_matrix.py, requirements.json and control_matrix_output.txt (CPython 3.14.4), 2026-11-08.
