## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C06_Lab_Kit.zip](/downloads/labs/RedKross_C06_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C06/...` refer to the extracted `C06` folder. Everything runs locally against systems you own.

**Shared lab and tools:** LAB_ASSETS/C06/ contains an AUTHORISED-LAB-ONLY environment. Everything runs against a web application you build and own, bound to 127.0.0.1 (loopback); the tools refuse any other address in code.

| Term | Meaning |
|---|---|
| scope.md | a filled-in Rules of Engagement / authorisation example |
| target/app.py | the authorised lab target, "Sahyadri Reads", a small deliberately-vulnerable web app on 127.0.0.1:8200 |
| target/app_fixed.py | the hardened version (all findings fixed) on 8201 |
| map.py | scoped application mapping (loopback only)    Module 2 |
| findings.py | controlled verification of each weakness      Modules 3-7 |
| cvss.py | CVSS v3.1 base-score calculator (offline)     Module 4/8 |
| report.py | risk-ranked report with remediation           Module 8 |
| retest.py | re-runs the checks on both apps to prove fixes Module 8 |
| codereview.py | a static secure-code-review aid               Module 8 |
| data/ | saved tool output and evidence |

All tools were execution-tested on 2026-11-08 with CPython 3.14.4 on Windows 11, using only the Python standard library. On the vulnerable app all ten weaknesses are present; on the hardened app all ten are absent; the retest shows 10 of 10 closed.

Safety, authorisation and ethics statement (read before anything else): This course teaches you to find and FIX web application weaknesses on an application you build and own. Every lab runs against a target on your own machine, bound to loopback; the tools are written to refuse any other address. You must NEVER point these techniques or tools at a web application you do not own and are not explicitly authorised, in writing, to test. In India, unauthorised access to a computer resource is an offence under the Information Technology Act, 2000 (for example sections 43 and 66); authorisation within an agreed scope is the line between lawful security testing and a crime. The course teaches the professional method - find, prove safely with the minimum necessary, score, report, fix and retest - not weaponised exploits.

**Access classification note:** per the blueprint, Course 06 is "PAID advanced labs; free foundations" - the foundations and secure-coding guidance are free; the hands-on advanced lab modules are the paid component.

**Standards note:** the course aligns weaknesses to the OWASP Top 10:2025, scores them with CVSS v3.1 (FIRST), identifies weakness types with CWE, and grounds the web mechanics in the HTTP specifications (RFC 9110 HTTP Semantics; RFC 6265 cookies). Identifiers and versions were checked at source on 2026-11-08.

**India law note:** Module 1 and the capstone discuss authorisation and the Information Technology Act, 2000 at an introductory level, and the handling of any personal data under the Digital Personal Data Protection Act, 2023. This is not legal advice; obtain qualified counsel for your facts.
