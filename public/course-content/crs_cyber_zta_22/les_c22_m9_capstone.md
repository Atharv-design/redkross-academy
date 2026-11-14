> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C22_Lab_Kit.zip](/downloads/labs/RedKross_C22_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C22/...` refer to the extracted `C22` folder. Everything runs locally against systems you own.

​### Objectives

Demonstrate LO1-LO8 by producing a zero trust reference architecture for Tamarind Logistics, evidence of its key controls from the course labs, and a checked, phased implementation roadmap, presented to technical and executive audiences.

​### Scenario

Tamarind Logistics (fictional) runs a shipment portal, warehouse systems, payroll exports and a partner SFTP service across a head office, depots and one cloud provider. After a near miss involving a contractor account, the board has asked for a zero trust programme with a target architecture and a two-year roadmap whose progress can be measured. You start from the course lab files and your Module 1-7 outputs.

​### Requirements

```text
R1 Foundations: requirements, trust zones and architecture views for the
   in-scope systems (M01).
R2 Identity: identity, device and privileged-access design with
   standards for each sensitivity level (M02).
R3 Policy: a PDP policy for at least five resources with unit tests
   covering ALLOW, STEP_UP and DENY (M03; extend zt_pdp.py).
R4 Network: a segmentation design with a tested connectivity matrix
   (M04; segmentation_lab.sh pattern).
R5 Data: classification, encryption layers and key custody, with
   arch_review.py at 0 findings (M05).
R6 Monitoring and resilience: logging architecture, failure modes and
   recovery design with resilience_review.py PASS, and tested monitoring
   signals (M06).
R7 Assurance: a threat model for one critical flow and a traceability
   matrix of at least 12 requirements, 100% VALIDATED or with documented
   actions (M07).
R8 Roadmap and presentation: maturity assessment for the eight ZTMM
   areas, a roadmap passing roadmap_check.py, the reference architecture
   document and a one-page executive summary (M08).
```

​### Deliverables

Reference architecture document (sections L01 1-7 of Module 8), diagrams, ADRs, policy code with tests, JSON design files, tool outputs with SHA-256 hashes, threat model, traceability matrix output, roadmap JSON and checker output, executive summary and a one-page reflection on the largest residual risk.

​### Rubric (0-4 per criterion; Competent = 3)

```text
+---------------------------+-----------------+-----------------+-----------------+
| Criterion (weight)        | 1 Developing    | 3 Competent     | 4 Distinguished |
+---------------------------+-----------------+-----------------+-----------------+
| Foundations & views (10%) | Single diagram  | Required views, | Views reconcile |
|                           |                 | zones, ADRs     | with inventory  |
| Identity & policy (20%)   | Rules listed    | Tested policy,  | Risk-adaptive   |
|                           |                 | PAM design      | rules, tested   |
| Network & data (15%)      | Diagram only    | Tested matrix;  | Custody tests   |
|                           |                 | 0 design finds  | by effect       |
| Monitoring (15%)          | Source list     | PASS review;    | Signal runbooks |
|                           |                 | signals tested  | and FP analysis |
| Assurance (20%)           | Checklist       | Threat model +  | Evidence-age    |
|                           |                 | hashed matrix   | metrics in CI   |
| Roadmap & summary (20%)   | Product list    | Checked roadmap;| Decision-ready  |
|                           |                 | one-page summary| with residuals  |
+---------------------------+-----------------+-----------------+-----------------+
Pass: weighted >= 60% and no criterion below Competent.
```

​### Professional skills

Structured architectural reasoning, evidence-based assurance, honest maturity assessment, prioritisation under constraints, communication to technical and executive audiences, and documentation that others can maintain.
