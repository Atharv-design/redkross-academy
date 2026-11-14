Every lateral-movement hop is a DETECTION OPPORTUNITY because it crosses a boundary and touches telemetry:

| Term | Meaning |
|---|---|
| detection | an unusual remote-service logon between workstations; a logon using alternate auth material with no interactive logon; access along a path that normal operations never use. These are read from correlated authentication and network logs. |
| containment | segmentation (block workstation-to-workstation admin; default-deny cross-segment); credential hygiene (unique local admin passwords, least privilege); Protected Users and tiering to limit reusable auth material; and detection on ticket/credential reuse. |

**Detection and containment combine:** narrow the trust so fewer hops are possible, and detect the hops that remain. The lab's attackmap.py, filtered to Lateral Movement, lists exactly these detections and containments for T1021 and T1550.
