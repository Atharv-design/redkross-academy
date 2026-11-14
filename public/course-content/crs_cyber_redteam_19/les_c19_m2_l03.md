MITRE ATT&CK is a curated knowledge base of adversary behaviour, organised as TACTICS (the adversary's goals - why) and TECHNIQUES (how they achieve them). It is the shared language of emulation and detection [R1].

| Term | Meaning |
|---|---|
| tactics | the objectives across an intrusion - for example Reconnaissance (TA0043), Credential Access (TA0006), Discovery (TA0007), Lateral Movement (TA0008), Command and Control (TA0011), Collection (TA0009). (ATT&CK Enterprise is v20.1, verified at source 2026-11-08.) |
| techniques | specific behaviours, each with an ID and detection/mitigation guidance - for example T1595 Active Scanning, T1078 Valid Accounts, T1021 Remote Services, T1550 Use Alternate Authentication Material, T1071 Application Layer Protocol. |
| use | plan an emulation as a path through tactics using chosen techniques; map each technique to the data sources and detections that should catch it. |

ATT&CK turns "what might an attacker do" into a concrete, referenceable plan and a detection checklist. The lab's plan cites current ATT&CK technique IDs.
