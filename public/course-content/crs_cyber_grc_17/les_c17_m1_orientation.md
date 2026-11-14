## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C17_Lab_Kit.zip](/downloads/labs/RedKross_C17_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C17/...` refer to the extracted `C17` folder. Everything runs locally against systems you own.

Lab assets ---------- LAB_ASSETS/C17/grc_toolkit.py is a small, transparent Python toolkit with five commands, applied to the fictional company Tamarind Logistics:

| Term | Meaning |
|---|---|
| risk | risk register with inherent and residual scores, treatment, acceptance-expiry checks and a heat map |
| csf | mapping of internal controls to the 22 NIST CSF 2.0 categories, with coverage gaps |
| bia | business impact analysis consistency checks (MTD, RTO, RPO, dependencies) |
| audit | a reproducible audit sample, compared with full-population testing |
| vendor | third-party questionnaire scoring with critical-fail items |

The saved output is grc_toolkit_output.txt (execution-tested 2026-11-07, CPython 3.14.4). Tools such as GRC platforms do the same at scale. The toolkit makes the logic visible.

**Legal and regulatory note:** this course summarises Indian and international frameworks for professional orientation, not legal advice. Several items were verified from secondary sources and are flagged for review by a legal or compliance subject-matter expert: SEBI CSCRF details, RBI directions and ISO/IEC 27001:2022 control counts (the standard itself is copyrighted and was not reproduced). Course 01 Module 7 covers the IT Act, CERT-In Directions and DPDP framework in more depth.

**Access classification note:** per the blueprint, Course 17 is PAID.
