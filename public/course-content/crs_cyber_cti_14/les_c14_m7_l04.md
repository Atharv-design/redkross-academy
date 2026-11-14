For each technique, ask whether the organisation collects the data that the detection strategies' analytics need. attack_map.py does this against data/log_inventory.json, which lists six data components Nilgiri collects centrally (Process Creation, Command Execution, Network Connection Creation, Network Traffic Flow, Application Log Content, File Creation):

| Term | Meaning |
|---|---|
| COVERED | at least one detection strategy whose analytics use only collected components |
| PARTIAL | some referenced components are collected, none fully |
| BLIND | none are collected |

**Result (deep dive):** 1 COVERED (T1566.001), 6 PARTIAL, 2 BLIND. The two blind techniques are resource development (Domains, Digital

**Certificates):** no internal log can see an adversary registering domains elsewhere; external intelligence (Module 3: registrations, certificate transparency) is the "sensor" for them. A gap analysis must distinguish "we should collect this" from "only intelligence can see this".

**Remember what this measures:** data availability for published analytics, not working detections. Coverage requires a rule, tested (Course 20).
