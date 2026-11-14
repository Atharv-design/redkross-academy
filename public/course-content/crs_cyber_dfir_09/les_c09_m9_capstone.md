> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C09_Lab_Kit.zip](/downloads/labs/RedKross_C09_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C09/...` refer to the extracted `C09` folder. Everything runs locally against systems you own.

​### Objectives

Demonstrate LO1-LO8 by acquiring, analysing and reporting on a prepared multi-source case.

​### Scenario

Tamarind Logistics (fictional) suspects that its customer list left web01. You are the forensic examiner. You receive (or generate with the course labs): a disk image of a stand-in volume (rk_c09_fs_lab.sh variant), a live-response output (rk_c09_live_lab.sh), a packet capture (rk_c09_net_lab.sh), host logs, and a short brief from legal counsel with three questions: Was the customer list transferred? How and when? What accounts and systems were involved?

​### Requirements

```text
R1 Collection plan and authority statement (Module 1).
R2 Acquisition and verification of all items with hashes and a custody
   log; demonstrate re-verification at report time (Modules 2, 8).
R3 File-system analysis: recover any deleted relevant file, explain
   timestamps and time-zone handling (Module 3).
R4 Volatile-data analysis: interpret processes and sockets; identify any
   masquerading or deleted-but-running process (Module 4).
R5 Network analysis: carve transferred files, verify hashes, check object
   types (Module 6).
R6 A UTC super-timeline with sources for each entry (Modules 6, 8).
R7 An IR recommendation section: containment, eradication (with baseline
   validation) and recovery (Module 7).
R8 A defensible report following the Module 8 structure, with certainty
   scale, limitations, alternative explanations and appendices.
```

​### Deliverables

Report (PDF or text), evidence appendix with hashes, custody log, scripts and commands used, timeline file, and a one-page peer-review record from a classmate.

​### Rubric (0-4 per criterion; Competent = 3)

```text
+---------------------------+-----------------+-----------------+-----------------+
| Criterion (weight)        | 1 Developing    | 3 Competent     | 4 Distinguished |
+---------------------------+-----------------+-----------------+-----------------+
| Integrity & custody (15%) | Hashes missing  | All items hashed| Re-verification |
|                           | or unverified   | and verified    | and tool        |
|                           |                 |                 | validation shown|
| Technical analysis (30%)  | Artefacts       | R3-R5 correct   | Edge cases (time|
|                           | misread         | with evidence   | zones, object   |
|                           |                 |                 | types) handled  |
| Timeline (15%)            | Unsourced or    | UTC, sourced,   | Offsets and     |
|                           | mixed zones     | consistent      | precision noted |
| Findings & certainty (20%)| Overstated;     | Calibrated;     | Alternatives    |
|                           | account=person  | traceable       | assessed fairly |
| IR recommendations (10%)  | Generic         | Specific to     | Prioritised with|
|                           |                 | findings        | validation plan |
| Report quality (10%)      | Disorganised    | Module 8        | Readable by each|
|                           |                 | structure       | audience        |
+---------------------------+-----------------+-----------------+-----------------+
Pass: weighted >= 60% and no criterion below Competent.
```

​### Professional skills

Evidence handling, analytical rigour, time-zone discipline, clear writing, candour about limits, peer review.
