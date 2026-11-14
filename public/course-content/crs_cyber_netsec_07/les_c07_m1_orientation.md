## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C07_Lab_Kit.zip](/downloads/labs/RedKross_C07_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C07/...` refer to the extracted `C07` folder. Everything runs locally against systems you own.

**Shared lab and tools:** LAB_ASSETS/C07/ contains an AUTHORISED, ENTIRELY OFFLINE defensive lab for the fictional "Himalaya Retail" network. Every tool reads local design documents or provided telemetry that you own; NONE makes a network connection, scans a host, or sends a packet.

| Term | Meaning |
|---|---|
| firewall.py | evaluate a flow against a ruleset; lint the policy   Module 2 |
| segmentation.py | validate connections against a zero-trust matrix     Module 4 |
| make_flows.py | generate the deterministic synthetic flow telemetry  Module 7 |
| flowcheck.py | detect scans, beaconing and segmentation breaches    Module 7 |
| tlscheck.py | offline review of a TLS/certificate configuration     Module 5 |
| review.py | one-page control-validation summary (capstone aid)   Module 8 |
| data/ | policies, configs, telemetry and saved tool output |

All tools were execution-tested on 2026-11-08 with CPython 3.14.4 on Windows 11, using only the Python standard library. Saved outputs sit in data/. The pre-hardening firewall, segmentation and TLS artefacts FAIL their controls; the hardened versions PASS (0 HIGH findings); the telemetry contains a port scan, a beaconing host and segmentation breaches for the detector to find.

Safety, authorisation and ethics statement (read before anything else): This is a DEFENDER'S course. It teaches you to design, configure, validate and monitor network defences - firewalls, segmentation, IDS/IPS, secure connectivity, wireless and monitoring - using offline analysis of documents and telemetry you own. It deliberately requires NO scanning, probing or attacking of any system. You must NEVER scan, probe, exploit, disrupt or collect data from a network you do not own and are not explicitly authorised, in writing, to test. In India, unauthorised access to or interference with a computer resource is an offence under the Information Technology Act, 2000 (for example sections 43, 66 and 66F); this lab keeps you lawful by keeping you offline, on your own design documents.

**Access classification note:** per the blueprint, Course 07 is "PAID advanced labs; free foundations" - the architecture and defensive foundations are free; the hands-on advanced lab modules are the paid component.

**Standards note:** the course is grounded in NIST SP 800-41r1 (firewalls), NIST SP 800-207 (zero trust), NIST SP 800-94 (IDS/IPS), NIST SP 800-52r2 with RFC 8996 and RFC 8446 (TLS), NIST SP 800-153 (wireless LANs), and RFC 7011 (IPFIX/flow). Identifiers and titles were checked at source on 2026-11-08.

**India law note:** Module 1 and the capstone discuss authorisation and the Information Technology Act, 2000 at an introductory level, and the handling of any personal or traffic data under the Digital Personal Data Protection Act, 2023. This is not legal advice; obtain qualified counsel for your facts.
