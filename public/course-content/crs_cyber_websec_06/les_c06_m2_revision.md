## Revision

### Summary

Application mapping enumerates the attack surface - every point where input enters (URLs, parameters, headers, cookies, bodies, uploads, API endpoints) - and marks the trust boundaries where untrusted input crosses into trusted code. For each entry point you record method, parameters, authentication state and the sink the input reaches, then classify the weakness class it could enable: input to SQL (injection), input to HTML (XSS), client-supplied id (IDOR), privileged function (broken access control), state-changing POST (CSRF), file path (traversal), outbound request (SSRF), session handling (auth flaws). This classification is a hypothesis list that later modules verify safely - never a conclusion. Discovery uses the application's own disclosures (links, forms, robots.txt, source) and stays strictly within the authorised, loopback-only scope; the lab tools refuse non-loopback hosts in code. The seven-step workflow - authorise, map, classify, verify, score, report, remediate/retest - makes testing systematic and in scope. robots.txt is a classic information leak: listing a sensitive path advertises it.

### Important concepts

attack surface; trust boundary; entry points and sinks; classification by weakness class; testing workflow; scope enforcement.

### Key technical takeaways

map before testing; treat every input as attacker-controlled; classify by sink; keep everything in authorised scope; build scope enforcement into tooling.

### Glossary

| Term | Meaning |
|---|---|
| attack surface | all points where input enters or behaviour is triggered. |
| trust boundary | the line input crosses from untrusted to trusted. |
| entry point | any place the application accepts input. |
| sink | where input ends up (SQL, HTML, file system, outbound request). |
| scope | the authorised set of targets and actions. |

### Common mistakes

testing without mapping; missing non-form inputs (headers/cookies); treating hypotheses as findings; relying on robots.txt or obscurity; straying out of scope.

### Revision questions

​1. What is the difference between attack surface and trust boundary? 2. Classify /download?file= and /fetch?url= by weakness class. 3. List the seven workflow steps.

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] OWASP. "Web Security Testing Guide (WSTG)" (testing framework and workflow). URL: [https://owasp.org/www-project-web-security-testing-guide/](https://owasp.org/www-project-web-security-testing-guide/) Accessed: 2026-11-08. Supports: the phased testing workflow.
- [R2] OWASP. "Web Security Testing Guide - Review Webserver Metafiles (robots.txt) for Information Leakage". URL: [https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/01-Information_Gathering/) Accessed: 2026-11-08. Supports: CS1, robots.txt information leakage.
- [R3] MITRE. "CWE-200: Exposure of Sensitive Information to an Unauthorized Actor". URL: [https://cwe.mitre.org/data/definitions/200.html](https://cwe.mitre.org/data/definitions/200.html) Accessed: 2026-11-08. Supports: information disclosure, banner and path leaks.
- [R4] NIST. "SP 800-115: Technical Guide to Information Security Testing and Assessment" (planning, discovery). URL: [https://csrc.nist.gov/pubs/sp/800/115/final](https://csrc.nist.gov/pubs/sp/800/115/final) Accessed: 2026-11-08. Supports: the discovery phase and scoped testing method.
- [R5] Lab evidence. map.py output and attack-surface table (CPython 3.14.4), LAB_ASSETS/C06/data/map_output.txt, 2026-11-08. Supports: the deep-dive map and classification.
