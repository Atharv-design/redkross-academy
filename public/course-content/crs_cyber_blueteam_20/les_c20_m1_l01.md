A defence architecture arranges controls so that an attacker must defeat several independent mechanisms, and so that defenders learn from every attempt. It is useful to separate four functions:

| Term | Meaning |
|---|---|
| Prevent | controls that stop an action (application control, MFA, segmentation, patching). |
| Observe | telemetry that records what happened (endpoint, identity, network, cloud and application logs). |
| Detect | logic that turns observations into alerts (rules, analytics, models, hunts). |
| Respond | people, playbooks and automation that contain and recover. |

These functions are linked by feedback loops. A prevented action should still be observed, because a blocked attempt is evidence of intent. Every incident should produce new or improved detections. Every hunt that finds nothing should still produce a statement of what data was examined and what was missing.

Two design principles follow. First, defence in depth applies to detection as well as prevention: an encoded PowerShell launch can be seen by process telemetry, by script-block logging, by the network connection it opens and by the DNS query before that. If one sensor fails or is evaded, another may still see the behaviour. Second, the telemetry pipeline is itself an attack surface. Attackers clear logs, stop agents and flood collectors, which is why ATT&CK 20.1 has a whole tactic, Defense Impairment (TA0112), for breaking security mechanisms and tooling [R1].
