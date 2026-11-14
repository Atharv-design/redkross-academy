LAB_ASSETS/C14/attack_map.py reads ATT&CK 20.1, the reports and the log inventory, follows "detects" relationships from detection strategies to techniques, collects the data components referenced by each strategy's analytics, and grades coverage. Output (execution-tested, CPython 3.14.4, 2026-11-07; m07_attack_map_output.txt, abridged):

```output
ATT&CK 20.1; collected data components: 6
T1041 Exfiltration Over C2 Channel  [exfiltration]  evidence: RPT-002
   missing from our inventory: File Access, Network Traffic Content
   coverage: PARTIAL
T1053.005 Scheduled Task  [execution, persistence, privilege-escalation]
   missing from our inventory: Scheduled Job Creation, Scheduled Job
   Modification, Windows Registry Key Modification
   coverage: PARTIAL
T1059.001 PowerShell  [execution]
   missing from our inventory: Module Load, Process Metadata
   coverage: PARTIAL
T1204.002 Malicious File  [execution]
   missing from our inventory: File Metadata         coverage: PARTIAL
T1560.001 Archive via Utility  [collection]
   missing from our inventory: Module Load            coverage: PARTIAL
T1566.001 Spearphishing Attachment  [initial-access]
   missing from our inventory: -                      coverage: COVERED
T1566.002 Spearphishing Link  [initial-access]  evidence: RPT-004, RPT-006
   missing from our inventory: Network Traffic Content coverage: PARTIAL
T1583.001 Domains  [resource-development]
   missing from our inventory: Active DNS, Domain Registration, Passive DNS
   coverage: BLIND
T1588.004 Digital Certificates  [resource-development]
   missing from our inventory: Certificate Registration, Response Content
   coverage: BLIND
Summary: {'PARTIAL': 6, 'COVERED': 1, 'BLIND': 2}
wrote navigator/monsoon_lantern_layer.json
```

**Interpretation:**

- Two data components - Network Traffic Content and Module Load - each appear in the missing list of two or three techniques: they are the most efficient collection investments.
- Scheduled Task, the reported persistence method, lacks three components; this matches the brief's recommendation (Module 8).
- The BLIND rows are external-intelligence work, not logging work.

**Limitations:** the grading treats any referenced component as needed and ignores platform (Windows, Linux) and analytic quality; it measures data availability only.
