ATT&CK Enterprise organises behaviour into tactics (the adversary's goal), techniques and sub-techniques (how), with procedure examples, groups, software, campaigns and mitigations. Version 20.1 (MITRE's STIX data, collection modified 5 November 2026) has 15 tactics and, in this course's lab copy, 706 detection strategies, 1,773 analytics and 106 data components [R1]. The detection model links them:

```text
technique  <-- detects --  detection strategy
detection strategy  --> analytics (platform-specific)
analytic  --> log source references --> data components
              (for example "Process Creation", "Scheduled Job Creation")
```

ATT&CK changes twice a year. In recent versions the former Defense Evasion tactic was retired and replaced by Stealth (TA0005) and Defense Impairment (TA0112), and some techniques were revoked and replaced (for example T1070.001 "Clear Windows Event Logs" now redirects to T1685.005). Reports carry the version of their time: AA23-144A states ATT&CK version 13. When you reuse older mappings, resolve revoked identifiers through "revoked-by" relationships (the lab's actor_overlap.py does this) and record the version you mapped to.
