Lateral movement is the set of techniques by which an adversary moves through an environment - from the host or account they first control to others - in pursuit of their objective. It is a TACTIC in ATT&CK (Lateral Movement, TA0008). Conceptually:

| Term | Meaning |
|---|---|
| why | the initial foothold (a phished workstation, an exposed service) is seldom the target; the adversary must reach servers, data or identity systems. |
| how | by abusing legitimate access - valid credentials, remote-management services, and alternate authentication material - so movement blends with normal administration. |
| where | across trust boundaries (host to host, tier to tier, segment to segment). |

Because lateral movement abuses legitimate mechanisms, defence rests on limiting the trust it exploits (segmentation, tiering) and detecting the anomalous hops. This module treats it as a defensive subject: what to validate and what to detect, not a how-to for moving through someone's network.
