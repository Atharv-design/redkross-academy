A unified control set (UCS) is the organisation's own list of controls, each with an ID, owner, frequency, evidence and test procedure, mapped to every framework that applies. Benefits: one control, one owner, one test, many requirements satisfied. Execution-tested mapping (LAB_ASSETS/C17/grc_toolkit.py csf; 12 Tamarind controls mapped to the 22 CSF 2.0 categories):

```text
------------------------------------------------------------- BEGIN OUTPUT
  GV: 4/6 categories covered; gaps: GV.OC, GV.RR
  ID: 2/3 categories covered; gaps: ID.IM
  PR: 4/5 categories covered; gaps: PR.IR
  DE: 2/2 categories covered; gaps: none
  RS: 2/4 categories covered; gaps: RS.AN, RS.MI
  RC: 1/2 categories covered; gaps: RC.CO
overall: 15/22 categories have at least one mapped control
note: mapping coverage is not effectiveness - each control still needs
testing (Module 6)
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07)
```

**Reading it:**

- Gaps point to missing or undocumented controls. GV.RR, roles and authorities, needs a documented RACI and committee charter (Module 1). RS.AN, incident analysis, needs forensic and analysis capability (Course 09). RC.CO, recovery communication, needs a communication plan (Module 5).
- A category with one mapped control may still be weakly covered. Coverage is a count, not a quality measure.
- Mapping is many-to-many. TL-08 (patching) supports PR.PS and ID.RA. TL-11 (immutable backups) supports PR.DS and RC.RP.

**Mapping practice:**

- map at subcategory or requirement level for audits;
- record the rationale for each mapping;
- use official crosswalks where they exist (NIST informative references);
- review mappings when frameworks change (as CSF 2.0 did in 2024).
