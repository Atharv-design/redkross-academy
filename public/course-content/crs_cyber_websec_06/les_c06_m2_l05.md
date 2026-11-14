A repeatable workflow keeps testing systematic and in scope:

1. Authorise and scope (written authorisation; define the targets).
2. Map (enumerate endpoints, parameters, auth state, sinks).
3. Classify (hypothesise weakness classes per entry point).
4. Verify (prove or dismiss each with the minimum safe check).
5. Score (CVSS) and record evidence.
6. Report (risk-ranked, with remediation).
7. Remediate and retest (confirm closure).

This mirrors the OWASP Web Security Testing Guide's phased approach and the NIST SP 800-115 methodology from Course 05 [R1]. The lab's tools implement the workflow end to end: scope.md (1), map.py (2), the classes in findings.py (3-4), findings.py verification (4-5), report.py (6), retest.py (7).
