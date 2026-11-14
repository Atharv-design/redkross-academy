> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C12_Lab_Kit.zip](/downloads/labs/RedKross_C12_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C12/...` refer to the extracted `C12` folder. Everything runs locally against systems you own.

​### Objectives

Demonstrate LO1-LO8 by securing the Tamarind shipment service end to end and producing a defensible release decision.

​### Scenario

Tamarind Logistics (fictional) will add a "proof of delivery PDF download" feature to the shipment service and ship release 1.1.0. You are the DevSecOps engineer responsible for its security from requirements to release.

​### Requirements

```text
R1 Security requirements (ASVS-mapped) and abuse cases for the new
   feature; threat model (DFD with trust boundaries, STRIDE, register with
   decisions) (M01-M02).
R2 Implementation with validation, encoding where relevant, and
   object-level authorisation; at least 6 new security unit tests,
   including negative cases (M03).
R3 At least two new Semgrep rules with ruleid/ok tests passing; SAST gate
   with --error (M04).
R4 Hash-locked dependencies; SCA gate; SBOM generated from the release
   environment (not the tooling); licence review (M05).
R5 Secret scanning of working tree and history; configuration startup
   check for production settings; no literal secrets (M06).
R6 Signed artefact and provenance with a verification gate; documented
   least-privilege CI design (workflow file may be illustrative if no CI
   platform is available) (M07).
R7 Pipeline run in a BLOCKED state (introduce a deliberate failure) and an
   APPROVED state, with outputs (M08).
R8 Release security report following the M08 structure, including
   limitations and residual risk.
```

​### Deliverables

Repository or folder with code, tests, rules, lock file, pipeline scripts, outputs of both runs, SBOM, signature bundle and provenance, threat model, and the release report (max. 4 pages) plus a 1-page peer review.

​### Rubric (0-4 per criterion; Competent = 3)

```text
+---------------------------+-----------------+-----------------+-----------------+
| Criterion (weight)        | 1 Developing    | 3 Competent     | 4 Distinguished |
+---------------------------+-----------------+-----------------+-----------------+
| Requirements & threat     | Vague, untraced | ASVS-mapped,    | Abuse cases all |
| model (15%)               |                 | STRIDE register | traced to tests |
| Secure implementation     | Patterns missing| R2 met; tests   | Edge cases and  |
| & tests (20%)             | or untested     | pass            | negative tests  |
| SAST (10%)                | No custom rules | 2 tested rules, | Rules reduce FP |
|                           |                 | gate fails      | with pattern-not|
| Dependencies & SBOM (15%) | Unpinned; SBOM  | Hash-locked;    | Licence policy; |
|                           | of tooling      | accurate SBOM   | re-scan plan    |
| Secrets & config (10%)    | Literal secrets | Scans + startup | Workload        |
|                           |                 | check           | identity design |
| Pipeline integrity (15%)  | No signing      | Sign + verify   | Provenance and  |
|                           |                 | gate; least     | SLSA level      |
|                           |                 | privilege design| analysis        |
| Release report (15%)      | Claims without  | All sections    | Clear residual  |
|                           | evidence        | with evidence   | risk, readable  |
+---------------------------+-----------------+-----------------+-----------------+
Pass: weighted >= 60% and no criterion below Competent.
```

​### Professional skills

Engineering judgment, automation, evidence-based communication, working with developers, honest reporting.
