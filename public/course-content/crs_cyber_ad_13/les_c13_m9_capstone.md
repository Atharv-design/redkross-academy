> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C13_Lab_Kit.zip](/downloads/labs/RedKross_C13_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C13/...` refer to the extracted `C13` folder. Everything runs locally against systems you own.

​### Objectives

Demonstrate LO1-LO8 by building a contained Active Directory lab, hardening its identity controls, and producing an evidence-backed audit report.

​### Scenario

You are the new identity-security engineer at Sahyadri Logistics (fictional). You have a contained lab domain (ad.sahyadri.example) and ninety days to measurably improve its identity security and report to the CISO and an external auditor.

​### Requirements

```text
R1 Build: the DC (Module 1) and the tiered organisation (Module 3),
   documented, with the starting state recorded (domain info + first
   assessment).
R2 Baseline review: a three-part assessment (configuration, activity,
   access) producing a scored findings register with evidence (Module 7).
R3 Hardening: apply the checklist (Module 8 L02) - remove/relocate SPNs,
   gMSA or PSO for service accounts, disable dormant accounts, small named
   privileged groups, Protected Users for admins, AES, auditing on - each
   change tied to a control and a risk.
R4 Evidence: before/after tool output and exit codes for every change.
R5 Re-test: a second assessment proving closure of the HIGH finding and
   the changed exit code.
R6 Monitoring: the three detections defined with thresholds, and an
   investigation note for one alert (Module 6).
R7 Report: a six-part audit report (scope, method, before, actions, after,
   residual/forward plan) with raw evidence in an appendix.
R8 Recovery: a one-page recovery outline (krbtgt double-rotation, DC
   rebuild, trust reset) as a forward-plan item (Module 8 CS1).
```

​### Deliverables

The built lab (scripts and provisioning), the findings register, the hardening change log with evidence, before/after assessment output, the investigation note, the audit report, the recovery outline, and a one-page reflection on the weakest control in your hardened lab and how you would strengthen it in production.

​### Rubric (0-4 per criterion; Competent = 3)

```text
+---------------------------+-----------------+-----------------+-----------------+
| Criterion (weight)        | 1 Developing    | 3 Competent     | 4 Distinguished |
+---------------------------+-----------------+-----------------+-----------------+
| Build & scope (10%)       | Undocumented    | Contained lab,  | Clear scope,    |
|                           | lab             | scope, baseline | second-DC plan  |
| Review & scoring (20%)    | Tool dump       | Scored register,| Context-adjusted|
|                           |                 | evidence        | scoring         |
| Hardening (25%)           | Ad hoc changes  | Checklist, each | gMSA, Protected |
|                           |                 | tied to control | Users, AES done |
| Evidence & re-test (20%)  | Assertions      | Before/after +  | Exit-code trend,|
|                           |                 | closure proven  | metrics         |
| Report (15%)              | Raw output      | Six-part, risk  | Decision-ready  |
|                           |                 | framed          | for CISO+auditor|
| Residual & recovery (10%) | None stated     | Honest residual | Tested recovery |
|                           |                 | + forward plan  | runbook outline |
+---------------------------+-----------------+-----------------+-----------------+
Pass: weighted >= 60% and no criterion below Competent.
```

​### Professional skills

Directory administration, identity hardening, attack-path reasoning (defensive), telemetry and investigation, evidence discipline, risk communication to technical and executive audiences.
