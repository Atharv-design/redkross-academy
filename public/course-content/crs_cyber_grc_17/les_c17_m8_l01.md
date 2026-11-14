Inputs, and how each feeds the register:

- Asset inventory and BIA (Modules 2, 5): which assets and processes matter, and their impact criteria.
- Threat and incident information (Courses 08, 14): likelihood.
- Control set and test results (Modules 3, 6): residual risk based on evidence. Failed tests raise residual risk.
- Exceptions (Module 4): each links to a risk, and expired ones are flagged.
- Audit findings (Module 6): high findings usually map to high residual risks.
- Vendor assessments (Module 7): third-party risks, and concentration.

The lab toolkit's six risks illustrate this. R03 (credential stuffing) depends on TL-04 (MFA) evidence. R04 has an expired acceptance and an expired exception (EX-02). The audit finding of four active leaver accounts should raise R03's residual likelihood until remediated. Integration is the value: each artefact updates the others.
