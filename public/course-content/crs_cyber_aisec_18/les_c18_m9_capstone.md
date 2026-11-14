> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C18_Lab_Kit.zip](/downloads/labs/RedKross_C18_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C18/...` refer to the extracted `C18` folder. Everything runs locally against systems you own.

​### Objectives

Demonstrate LO1-LO8 by assessing the BanyanBot bench end to end, extending it with your own probes and controls, and reporting risk with evidence.

​### Scenario

Banyan Telecom (fictional) plans to launch BanyanBot 1.0 to customers. Its AI governance board asks for an independent assessment: what can go wrong, what controls exist and work, what risk remains, and whether to launch. You have the bench, the local model and full authorisation for the bench only.

​### Requirements

```text
R1 Threat model: data flow with trust boundaries and a threat-model table
   mapped to OWASP categories and probes (M01).
R2 Architecture review: retrieval trace and context analysis for all
   probes, with token costs (M02).
R3 Injection: probes P1-P6 plus at least four new benign probes (direct,
   indirect visible and hidden, reworded planted text), 20+ seeds (M03).
R4 Data: extended kb_audit with tests; privacy assessment summary (M04).
R5 Tools and output: at least one new tool-policy rule with unit tests;
   output-handling review with filter tests (M05).
R6 Supply chain: AI-BOM and release gate run (supply_check, kb_audit,
   tests, probes) (M06).
R7 Evaluation: test plan, report.py intervals, regression suite (M07).
R8 Report: evidence pack with hashes, failure-path register (at least
   six paths), mitigations, residual risk and a launch recommendation
   (M08).
```

​### Deliverables

Code changes, probe definitions, evidence pack files with SHA-256 hashes, threat model, AI-BOM, test plan, technical report, one-page board summary and a reflection on the largest residual risk.

​### Rubric (0-4 per criterion; Competent = 3)

```text
+---------------------------+-----------------+-----------------+-----------------+
| Criterion (weight)        | 1 Developing    | 3 Competent     | 4 Distinguished |
+---------------------------+-----------------+-----------------+-----------------+
| Threat model & arch (15%) | Category list   | Rows with       | Rows drive      |
|                           |                 | controls, probes| probe design    |
| Probes & statistics (20%) | Single runs     | 20+ seeds,      | Placement and   |
|                           |                 | intervals,      | wording studies |
|                           |                 | utility         |                 |
| Controls & tests (20%)    | Described only  | New rule with   | Policy coverage |
|                           |                 | unit tests;     | matrix          |
|                           |                 | filter tests    |                 |
| Data & supply chain (15%) | Notes           | Audit tests,    | Gate in CI      |
|                           |                 | AI-BOM, gate run|                 |
| Failure paths (15%)       | Narrative       | 6 paths, hops   | Paths mapped to |
|                           |                 | with evidence   | monitoring      |
| Report (15%)              | "Secure"        | Evidence pack,  | Decision-ready  |
|                           |                 | residual risk   | board summary   |
+---------------------------+-----------------+-----------------+-----------------+
Pass: weighted >= 60% and no criterion below Competent.
```

​### Professional skills

Testing only within authorisation, benign probe design, statistical honesty, separating facts from inferences, and clear risk communication.
