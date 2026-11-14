Running attackmap.py filtered to the Command and Control tactic (execution-tested, CPython 3.14.4, 2026-11-08):

```output
ATT&CK detection/containment map - tactic: Command and Control
==========================================================================
T1071   Application Layer Protocol            [Command and Control / TA0011]
   data source : network flow / proxy logs
   detection   : regular beacon to a single external-looking destination
   containment : egress filtering; proxy inspection; block the indicator
--------------------------------------------------------------------------
1 technique(s) mapped to defensive telemetry and containment
```

**Reading the map:**

- DETECTION is behavioural: a regular BEACON (near-constant interval) to a single destination, found by interval analysis over network flow and proxy telemetry - the same beacon-detection logic as Course 07's flow analysis. Because C2 uses normal application-layer protocols (T1071), you cannot just "block the protocol"; you detect the pattern.
- CONTAINMENT cuts the channel: egress filtering (deny arbitrary outbound), proxy inspection (block unknown/low-reputation destinations), and blocking the known indicator - then hunting for other hosts using it.
- In the lab, the emulated beacon goes to a SINK on the range (no real egress); the plan's safety control states "C2 to a lab sink on the range only; no real egress".

So C2, for the defender, is a periodic network signal with a clear containment: see the beacon, cut the egress. The map read only the plan file; the only C2 "traffic" in the lab is a benign beacon to a loopback/lab sink, never a real external server.
