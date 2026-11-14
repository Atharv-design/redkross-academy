Running attackmap.py filtered to the Lateral Movement tactic (execution-tested, CPython 3.14.4, 2026-11-08):

```output
ATT&CK detection/containment map - tactic: Lateral Movement
==========================================================================
T1021   Remote Services                       [Lateral Movement / TA0008]
   data source : authentication / network logs
   detection   : remote service logon between workstations (unusual path)
   containment : segmentation; block workstation-to-workstation admin
--------------------------------------------------------------------------
T1550   Use Alternate Authentication Material  [Lateral Movement / TA0008]
   data source : authentication logs
   detection   : logon using non-interactive auth material; no matching
                 interactive logon
   containment : credential hygiene; Protected Users; detection on ticket reuse
--------------------------------------------------------------------------
2 technique(s) mapped to defensive telemetry and containment
```

**Reading the map:**

- Both techniques abuse legitimate authentication, so each DETECTION is behavioural and cross-host: an unusual remote-service logon PATH (workstation-to-workstation admin is rarely legitimate), or a logon with alternate auth material that has no matching interactive logon (the credential was not typed here).
- Each CONTAINMENT narrows trust: segmentation blocks the hop structurally; credential hygiene, Protected Users and tiering reduce the reusable material that makes T1550 possible.
- Segmentation validation (Course 07's allowed-flow idea) decides which hops SHOULD be impossible; the detections cover the rest.

This is lateral movement as the defender sees it: a set of boundary crossings, each a chance to detect and a place to contain - no intrusion procedure required. The map read only the plan file.
