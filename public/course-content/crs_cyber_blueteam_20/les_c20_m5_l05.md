**Validation answers two questions:**

1. Did the hunt work? Prove the analysis can see the behaviour. Run it against a known-positive sample (a test event, a purple-team replay from Module 7, or a past incident) and confirm it is found. A hunt query that cannot find a planted example proves nothing when it returns no results.
2. Are the findings real? For each candidate, gather corroborating evidence from a second source, check with the asset owner, and grade confidence (confirmed malicious, suspicious, benign explained, unresolved).

**Report null results honestly:** "No evidence of the hypothesised behaviour on 4/16 hosts (Security log) and 16/16 hosts (schtasks.exe process fallback) for 2026-11-03; tasks created through non-schtasks interfaces not visible on 12 hosts."
