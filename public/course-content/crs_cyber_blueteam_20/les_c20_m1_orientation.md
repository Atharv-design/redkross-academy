## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C20_Lab_Kit.zip](/downloads/labs/RedKross_C20_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C20/...` refer to the extracted `C20` folder. Everything runs locally against systems you own.

Shared lab dataset and tools: LAB_ASSETS/C20/ contains

| Term | Meaning |
|---|---|
| make_telemetry.py | generates tamarind_telemetry.jsonl - 754 synthetic events (Sysmon-style process creation, Windows-style security events, DNS resolver log, flow summaries) for one fictional day at "Tamarind Freight", with a hidden intrusion storyline and realistic benign noise; deterministic (fixed seed) |
| rk_sigma.py | a readable evaluator for a subset of the Sigma format (scan and unit-test modes) |
| detections/ | the detection pack: rules/, tests/, tuned/, the generator gen_rules.py, and sigma-cli outputs |
| coverage.py | Module 1 coverage matrix |
| proctree.py | Module 2 process trees with identity context |
| ids/ + netdetect.py | Module 3 Suricata rules and DNS/flow analytics |
| hunt.py | Module 5 hypothesis-driven hunts |
| soar.py | Module 6 playbook engine with approval gates |
| purple.py | Module 7 telemetry-replay validation |
| build_pack.py | Module 8 release gates for the detection pack |

All Python tools were execution-tested with CPython 3.14.4 and PyYAML 6.0.3 on 2026-11-07; Sigma rules were checked and converted with sigma-cli 4.0.0 (Splunk backend); Suricata 8.0.8 ran in the jasonish/suricata container. Every name, host, domain (.example) and address (RFC 1918 / RFC 5737) is fictional. Field names follow Windows and Sysmon conventions, but no record was exported from a real product.

**Safety statement:** this is a defensive course. No module asks you to run an attack technique. Purple-team validation in Module 7 replays synthetic log records that describe what a technique would leave behind; it never executes the technique. Work only on systems you own or are authorised in writing to monitor.

**Access classification note:** per the blueprint, Course 20 is "PAID premium".

**ATT&CK version note:** MITRE ATT&CK changes twice a year. This course uses Enterprise ATT&CK 20.1 (checked against MITRE's STIX data on 2026-11-07), in which the former Defense Evasion tactic is replaced by Stealth (TA0005) and Defense Impairment (TA0112). Older material, tools and rules still use the earlier names; Module 7 shows how to handle that drift.
