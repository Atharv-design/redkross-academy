Command and control (C2) is the communication an adversary uses to direct compromised systems - sending commands and receiving results. It is an ATT&CK tactic (Command and Control, TA0011). Conceptually:

| Term | Meaning |
|---|---|
| purpose | after gaining access (and often moving laterally), the adversary needs a channel to control the foothold and stage further actions, including exfiltration. |
| shape | a compromised host (the "implant" or "beacon") reaches OUT to an adversary-controlled server, usually over common protocols, so the traffic blends with normal outbound activity. |
| weakness | C2 must traverse the network boundary repeatedly, which is exactly where defenders can observe and cut it. |

C2 is the adversary's lifeline and, for defenders, a reliable place to detect and contain. This module explains what C2 looks like on the wire and how to stop it - not how to build one.
