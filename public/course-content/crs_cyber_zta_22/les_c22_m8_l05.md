The execution-tested roadmap_check.py (LAB_ASSETS/C22) reads roadmap.json and the Module 7 requirements.json. On the first draft:

```text
------------------------------------------------------------- BEGIN OUTPUT
phase 1: I1, I2
phase 2: I3, I4
phase 3: I5, I6, I7
  FINDING Data: target Optimal skips more than two stages from
          Traditional
  FINDING Data: target above current but no initiative planned
  FINDING Automation and Orchestration: target above current but no
          initiative planned
  FINDING I3 (phase 2) depends on I5 scheduled later (phase 3)
  FINDING I5: no owner
  FINDING I7: validating requirement 'R12' not in matrix
summary: 7 initiatives, 6 findings -> FAIL
--------------------------------------------------------------- END OUTPUT
(maturity table omitted and long lines wrapped; execution-tested
2026-11-08, CPython 3.14.4; exit code 1)
```

**Reading it:** the draft promised Optimal data protection from a Traditional start with no data initiative at all; it scheduled posture-based policy (I3) before the device inventory it depends on (I5); the inventory had no owner; and the governance gate pointed at a requirement that does not exist. roadmap_fixed.json - target Data Advanced, I5 moved to phase 1 with an owner, new initiatives I8 (classification, CMK custody, field-level encryption) and I9 (automated revocation and quarantine), and I7 linked to R6 - gives 9 initiatives, 0 findings -> PASS.
