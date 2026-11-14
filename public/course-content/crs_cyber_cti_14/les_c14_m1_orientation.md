## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C14_Lab_Kit.zip](/downloads/labs/RedKross_C14_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C14/...` refer to the extracted `C14` folder. Everything runs locally against systems you own.

Shared lab dataset and tools: LAB_ASSETS/C14/ contains

```text
make_ti_data.py      generates data/: intelligence requirements, a source
                     register, six reports, passive DNS, certificate and
                     registration records, three IOC feeds and one day of
                     proxy logs for the fictional insurer "Nilgiri
                     Mutual" and the fictional campaign "MONSOON
                     LANTERN" (deterministic)
requirements_view.py, estimative_lint.py           Module 1
source_eval.py, minimise.py, collect_log.py        Module 2
infra_pivot.py, live_context.py                    Module 3
actor_overlap.py                                   Module 4
ioc_pipeline.py                                    Module 5
stix_build.py, taxii/ (local TAXII 2.1 server)     Module 6
attack_map.py, navigator/                          Module 7
brief_builder.py, briefs/                          Module 8
data/enterprise-attack.json  MITRE ATT&CK Enterprise 20.1 (STIX), as
                     published by MITRE
```

All tools were execution-tested on 2026-11-07 with CPython 3.14.4 and PyYAML (Windows 11). Module 6 uses a virtual environment with stix2 3.0.2, stix2-patterns 2.1.2, medallion 3.0.0 and taxii2-client 2.3.0. Saved outputs sit beside each script.

**Data and safety statement:** every organisation, person, domain (.example) and address (RFC 5737 documentation ranges) in the dataset is fictional. Two well-known public services (a public DNS resolver and a software update host) appear only as examples of indicators that must NOT be blocked. The only live lookup in the course (Module 3) queries example.com, a domain IANA reserves for documentation. This course teaches collection and analysis for defence. It does not teach covert online personas, accessing restricted areas, social engineering, or profiling private individuals. Every collection activity must serve a documented requirement, respect platform terms and the law, and minimise personal data (Module 2).

**Access classification note:** per the blueprint, Course 14 is "PAID advanced".

**ATT&CK version note:** this course uses Enterprise ATT&CK 20.1, checked against MITRE's STIX data on 2026-11-07. Reports written earlier map to earlier versions (for example CISA's AA23-144A states ATT&CK version 13); Module 7 shows how to handle the difference.

**India law note:** Module 2 discusses the Information Technology Act, 2000, the CERT-In Directions of 28 April 2022 and the Digital Personal Data Protection Act, 2023 at an introductory level. This is not legal advice; organisations must obtain advice from qualified counsel for their facts.
