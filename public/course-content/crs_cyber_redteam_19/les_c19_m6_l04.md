The plan's C2 technique is T1071 Application Layer Protocol (verified current at source 2026-11-08): C2 communication over common application-layer protocols so it blends with normal traffic. Detection:

| Term | Meaning |
|---|---|
| behavioural | a regular beacon to a single external-looking destination, found by interval analysis over network/proxy telemetry (the same beacon logic used in Course 07's flowcheck). |
| context | correlate with host telemetry (which process is beaconing) and destination reputation. |

Because C2 deliberately uses normal protocols, detection is behavioural (periodicity, destination, anomaly), not simply "block protocol X". T1071's defensive value is high because every beacon is a chance to detect and every connection a chance to contain. The lab's map provides the detection and containment for T1071.
