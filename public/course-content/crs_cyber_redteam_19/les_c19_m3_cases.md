## Scope discipline and evidence in professional testing Context: professional testing standards (NIST SP 800-115; penetration-testing methodologies) emphasise that the discovery and validation phases must stay within authorised scope and that findings must be evidenced - recorded, attributed and reproducible - so the organisation can trust and remediate them. Out-of-scope activity and poorly evidenced findings are the two failures that most undermine an engagement's credibility and legality [C19-M03-R1][C19-M03-R2]. Why it matters for this module: it establishes scope enforcement and evidence management as core professional controls, exactly what the lab's scopecheck.py and evidence.py model. Lessons: stay strictly in scope; evidence every finding with attribution and integrity; make findings reproducible.



## (FICTIONAL TEACHING SCENARIO): The out-of-scope near miss and the challenged finding

**Context:** during a fictional engagement for Konkan Logistics, a tester nearly runs a check against an external DNS resolver (8.8.8.8) copied from notes, and later a client disputes a finding.

**What happened:** the scope check (scopecheck.py) classified 8.8.8.8 as OUT-OF-SCOPE and refused, preventing an unauthorised action against a third party. Separately, when the client questioned a finding, the evidence log's chain of custody (evidence.py verify) showed the record was intact, attributed and time-stamped - so the finding stood.

**Response:** the team confirmed the near-miss target was never contacted, and relied on the verified evidence chain to uphold the disputed finding. Both controls did their job: one kept the work in bounds, the other made it defensible.

**Lessons:** fail-safe scope enforcement prevents out-of-scope actions; a tamper-evident evidence chain makes findings defensible.
