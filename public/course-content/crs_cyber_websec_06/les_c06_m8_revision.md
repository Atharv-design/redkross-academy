## Revision

### Summary

The final module runs the course as one authorised workflow: authorise and scope, map, verify each weakness with the minimum safe check, score with CVSS, report with remediation, remediate, and retest to prove closure - aligned to the OWASP Web Security Testing Guide and NIST SP 800-115. Secure code review connects each finding to the code pattern that caused it (concatenated SQL, unencoded output, client-trusted ids, missing CSRF tokens, user-controlled paths/URLs, unsafe deserialization) and the fix that prevents it; a static aid produces leads a human confirms. The security report makes findings actionable: title, OWASP/CWE, CVSS vector and severity, evidence, business impact and remediation, ordered by risk, with an executive summary. Remediation applies the fix; retesting proves it - a finding is closed only when a retest confirms it, and the root cause must be fixed at every instance. Prioritisation uses CVSS plus context (exposure, data sensitivity, exploitability, KEV/EPSS). The lab proves the model end to end: report ranks ten findings 9.8 to 3.1, and retest.py shows 10 of 10 present on the vulnerable app, 0 of 10 on the hardened app, 10 of 10 closed. The capstone is a complete, evidenced, authorised assessment of the learner's own loopback lab.

### Important concepts

end-to-end workflow; secure code review; the security report; remediation and retest; CVSS-plus-context prioritisation; closure.

### Key technical takeaways

run the full workflow with evidence; review code for the course's patterns; write validated, ranked, actionable findings; prove closure by retest; fix the root cause everywhere.

### Glossary

| Term | Meaning |
|---|---|
| retest | repeating a safe verification against fixed code to confirm closure. |
| secure code review | reading code to find weaknesses by following data flow. |
| executive summary | the decision-maker view of a report (count, severity, headline risk). |
| closure | a finding confirmed fixed by a retest. |
| remediation | the concrete fix for a finding. |

### Common mistakes

marking a finding closed without retest; fixing one instance of a pattern but not all; delivering unvalidated scanner volume; reports with no evidence or remediation; ignoring business context in prioritisation.

### Revision questions

​1. When is a finding closed? 2. What does a good report finding contain? 3. Why fix the root cause at every instance?

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] OWASP. "Web Security Testing Guide (WSTG)" and NIST "SP 800-115" (testing workflow, reporting, verification/retest phases). URL: [https://owasp.org/www-project-web-security-testing-guide/](https://owasp.org/www-project-web-security-testing-guide/) Accessed: 2026-11-08. Supports: the end-to-end workflow and the retest phase.
- [R2] OWASP. "Code Review Guide" (secure code review method and patterns). URL: [https://owasp.org/www-project-code-review-guide/](https://owasp.org/www-project-code-review-guide/) Accessed: 2026-11-08. Supports: secure code review.
- [R3] FIRST. "CVSS v3.1 Specification Document" (scoring and severity) and FIRST/CISA "EPSS" and "KEV" for exploitation context. URL: [https://www.first.org/cvss/v3.1/specification-document](https://www.first.org/cvss/v3.1/specification-document) Accessed: 2026-11-08. Supports: CVSS scoring and context-based prioritisation.
- [R4] OWASP. "OWASP Top 10:2025" (category reference for the report mappings). URL: [https://top10.owasp.org/2025/](https://top10.owasp.org/2025/) Accessed: 2026-11-08. Supports: OWASP categories in the report.
- [R5] Lab evidence. report.py and retest.py output (10 findings ranked; 10/10 closed) and codereview.py comparison (CPython 3.14.4), LAB_ASSETS/C06/data/, 2026-11-08. Supports: the deep-dive report, retest and review results.
