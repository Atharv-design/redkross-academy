> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C08_Lab_Kit.zip](/downloads/labs/RedKross_C08_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C08/...` refer to the extracted `C08` folder. Everything runs locally against systems you own.

​### Objectives

Demonstrate LO1-LO8 by investigating a full SOC dataset from first alert to shift handover, producing professional detection content and documentation.

​### Scenario

You are the Tier 2 analyst on the day shift at Banyan Microfinance (a fictional Indian microfinance company). The SOC uses minisiem. During your shift the rule queue begins to fill. Your instructor provides either the standard dataset (make_dataset.py) or a variant dataset with a modified storyline.

​### Requirements

```text
R1 Ingest the dataset; confirm per-source counts and time range; record
   any parsing or time-zone assumptions.
R2 Triage all rule hits with enrichment, validation queries and
   dispositions; group into cases.
R3 Use the provided intelligence feed (ioc_match.py) and assess every
   match for confidence, expiry and TLP.
R4 Write two new detections - one SQL rule in minisiem and one Sigma rule -
   each with at least two unit tests or a validated conversion, and an
   ATT&CK v20.1 mapping.
R5 Produce a six-part escalation, a containment plan with trade-offs and
   approvals, and the CERT-In timeline from an assumed "noticed" time.
R6 Export and hash evidence; maintain a custody log; demonstrate
   verification.
R7 Run at least three hypothesis-driven hunts (one not using IOCs) and
   record outcomes, including any gaps.
R8 Deliver a full case record (M08 L05 structure) and a shift report
   (under 300 words).
```

​### Deliverables

Case record; shift report; detection files and tests; hunt records; evidence folder (export, SHA256SUMS, custody.jsonl); a short reflection (one page) on what telemetry or process would have detected the intrusion earlier.

​### Rubric (0-4 per criterion; Competent = 3)

```text
+---------------------------+-----------------+-----------------+-----------------+
| Criterion (weight)        | 1 Developing    | 3 Competent     | 4 Distinguished |
+---------------------------+-----------------+-----------------+-----------------+
| Triage & analysis (25%)   | Alerts handled  | All hits triaged| Hypotheses with |
|                           | in isolation    | and grouped with| confidence;     |
|                           |                 | evidence        | alternatives    |
|                           |                 |                 | ruled out       |
| Detections (15%)          | Untested or     | Two tested,     | Boundary tests; |
|                           | wrong logic     | mapped rules    | FP analysis     |
| Intelligence use (10%)    | IOCs used       | Confidence,     | Feedback and    |
|                           | uncritically    | expiry, TLP     | sharing plan    |
|                           |                 | assessed        |                 |
| Incident handling (20%)   | Unclear or late | Structured      | Business-aware, |
|                           | escalation      | escalation;     | legal timeline  |
|                           |                 | sound           | precise         |
|                           |                 | containment     |                 |
| Evidence (10%)            | No hashes       | Manifest and    | Reproducible    |
|                           |                 | custody correct | export shown    |
| Hunting (10%)             | No hypotheses   | Three recorded  | New detection   |
|                           |                 | hunts incl.     | from a hunt     |
|                           |                 | non-IOC         |                 |
| Documentation (10%)       | Narrative only  | Case + shift    | Readable by any |
|                           |                 | report complete | analyst in 2 min|
+---------------------------+-----------------+-----------------+-----------------+
Pass: weighted >= 60% and no criterion below Competent.
```

​### Professional skills

Analytical reasoning under uncertainty, structured communication, detection engineering, evidence handling, teamwork at handover.
