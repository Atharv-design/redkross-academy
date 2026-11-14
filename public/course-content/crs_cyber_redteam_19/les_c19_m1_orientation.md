## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C19_Lab_Kit.zip](/downloads/labs/RedKross_C19_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C19/...` refer to the extracted `C19` folder. Everything runs locally against systems you own.

**Shared lab and tools:** LAB_ASSETS/C19/ contains an AUTHORISED, ENTIRELY OFFLINE lab that teaches red team operations as an ENGAGEMENT-GOVERNANCE, ADVERSARY- EMULATION-PLANNING and DETECTION discipline. There is NO exploit code, NO payload and NO attack command anywhere in the lab. Every tool reads a file you own and produces a governance, planning, detection or reporting artifact; nothing scans, connects to, exploits or collects data from any system. Adversary emulation is bounded to an ISOLATED, OWNED range using lab accounts and synthetic data.

```text
roe.py           validate a Rules of Engagement before any activity   Module 1
emulation_plan.py validate a threat-informed emulation plan is safe    Module 2
scopecheck.py    decide in-scope / out-of-scope; refuse out-of-scope   Module 3
evidence.py      tamper-evident evidence log (chain of custody)        Module 3
attackmap.py     map emulated techniques to detection + containment    Modules 4-6
purple.py        detection-gap analysis (emulated vs detected)         Module 7
report.py        assemble the executive + technical engagement report  Module 8
data/            RoE files, authorised scope, emulation plan, synthetic
                 telemetry, evidence log and saved tool output
```

All tools were execution-tested on 2026-11-08 with CPython 3.14.4 on Windows 11, using only the Python standard library. No tool uses the network. Read scope.md before anything else.

Safety, authorisation and ethics statement (read before anything else): This is a DEFENDER-ALIGNED, GOVERNANCE-FIRST course. Red teaming and penetration testing are legitimate only when AUTHORISED, SCOPED and SAFE. This course teaches the discipline that makes them so: engagement engineering (authorisation, rules of engagement, safety controls), threat-informed adversary emulation bounded to an isolated range, controlled validation with proper evidence management, and - above all - turning every emulated technique into a DETECTION and a defensive improvement through purple teaming. It does NOT provide exploits, payloads or instructions for attacking systems, and it never directs any activity at a system you do not own or lack written authorisation and isolation to test. You must only ever operate within an explicit authorisation, inside an isolated environment, on accounts and data provided for the test. In India, unauthorised access to, interception of, or interference with a computer resource is an offence under the Information Technology Act, 2000 (for example sections 43, 43A, 66, 66C, 66D and 66F); authorisation, scope and isolation are what keep this work lawful.

**Access classification note:** per the blueprint, Course 19 is "PAID premium" - it is a specialisation course and the lab and modules are the paid component.

**Standards and references note:** the course is grounded in the MITRE ATT&CK framework (Enterprise v20.1, verified at source 2026-11-08 - used for threat-informed emulation planning and for mapping techniques to detections; e.g. T1595 Active Scanning, T1078 Valid Accounts, T1021 Remote Services, T1550 Use Alternate Authentication Material, T1071 Application Layer Protocol), NIST SP 800-115 (Technical Guide to Information Security Testing and Assessment), and MITRE's adversary-emulation / threat-informed-defense guidance. All ATT&CK identifiers and titles were checked at source on 2026-11-08. All addresses in the lab are RFC 1918 private and exist only inside the owned range.

**India law note:** Module 1 and the capstone discuss authorisation, rules of engagement and the Information Technology Act, 2000 at a practical level. This is not legal advice; obtain qualified counsel for your facts.
