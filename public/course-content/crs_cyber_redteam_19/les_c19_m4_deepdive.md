Running attackmap.py over the plan and reading the endpoint/identity techniques (execution-tested, CPython 3.14.4, 2026-11-08; relevant extract):

```output
T1078   Valid Accounts                       [Credential Access / TA0006]
   data source : authentication logs
   detection   : anomalous logon (new source, odd hour) for a lab account
   containment : MFA, tiered admin, logon restrictions
T1087   Account Discovery                    [Discovery / TA0007]
   data source : directory / process logs
   detection   : bulk directory queries from a workstation
   containment : least privilege; monitor directory reads
T1550   Use Alternate Authentication Material [Lateral Movement / TA0008]
   data source : authentication logs
   detection   : logon using non-interactive auth material; no matching
                 interactive logon
   containment : credential hygiene; Protected Users; detection on ticket reuse
```

**Reading the map:**

- Each identity technique is "living off the land": it abuses legitimate mechanisms, so the DETECTION is behavioural (anomalous logon, bulk enumeration, orphan non-interactive auth), read from authentication and directory/process telemetry - not a signature.
- Each has a CONTAINMENT (MFA/tiered admin, least privilege, credential hygiene/Protected Users) paired with the detection.
- The engagement's task for each is to confirm whether the telemetry and detection actually exist (tested in Module 7's purple-team analysis).

This is the defender's view of endpoint/identity testing: every technique emulated becomes a telemetry requirement and a detection to verify. The map read only the plan file; nothing was executed.
