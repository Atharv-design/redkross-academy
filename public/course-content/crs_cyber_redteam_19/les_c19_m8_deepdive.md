Running report.py over the RoE, plan and telemetry (execution-tested, CPython 3.14.4, 2026-11-08; abridged):

```output
ADVERSARY-EMULATION ENGAGEMENT REPORT (isolated range)

EXECUTIVE SUMMARY
  Engagement : RedKross isolated range emulation
  Authorised : RedKross Academy Lab Owner (signed authorisation ref RK-AUTH-2026-019)
  Scope      : 10.70.0.0/24 (isolated lab range; simulation-only)
  Outcome    : emulated 7 ATT&CK techniques; detection stack caught 4/7.
               Detection coverage 57%. 3 gap(s) identified for improvement.
  Top recommendations:
    - Build detection for Account Discovery (T1087) on directory/process logs.
    - Build detection for Use Alternate Authentication Material (T1550) on auth logs.
    - Build detection for Data from Local System (T1005) on file/process logs.

TECHNICAL DETAIL
  Step 1 | T1595 Active Scanning | Reconnaissance/TA0043 | DETECTED
     safety: isolated range only; rate-limited; simulation_only
     detection: IDS: horizontal scan from 10.70.0.50
  ... (per technique) ...
  Step 7 | T1005 Data from Local System | Collection/TA0009 | GAP
     gap: needed 'staging of many files by one process' on file/process logs

RETEST LIST (purple-team follow-up)
  - T1087 Account Discovery: engineer detection, then re-emulate to confirm
  - T1550 Use Alternate Authentication Material: engineer detection, then re-emulate
  - T1005 Data from Local System: engineer detection, then re-emulate

All activity was confined to the authorised isolated range under the RoE; no third-
party or production system was involved.
```

**Reading the report:**

- The EXECUTIVE summary gives decision-makers scope, authorisation, outcome (coverage 4/7 = 57%) and the top three recommendations (the highest-value gaps) - honest and jargon-light.
- The TECHNICAL detail lists each technique with its ATT&CK mapping, safety boundary and DETECTED/GAP status, and ends with the RETEST LIST - the blue team's backlog.
- Every statement traces to the plan and telemetry; the closing line records the isolation and scope.

This is the engagement's value made deliverable: one honest summary for leaders and one actionable, evidence-traced detail for engineers. The report read only the engagement's JSON artifacts; nothing was emulated or executed here.
