CISA's guidance gives a process that starts with finding the behaviour (not indicators) and researching it, then identifying the tactic and the technique and sub-technique [R2]. Practical rules:

- Map behaviour, not artefacts: "an ISO archive with a shortcut file that starts PowerShell" maps to T1566.001, T1204.002 and T1059.001; an IP address maps to nothing.
- Map only what the evidence supports, at the level it supports: if a report says "persistence via scheduled tasks", T1053.005 is right; if it says only "persistence", stop at the tactic.
- Keep the evidence and source with every mapping (report ID and grade).
- Watch for biases the guidance warns about: leaping to a familiar technique, mapping from a headline rather than the detail, or over-mapping vague text.
- Have a second analyst review mappings; disagreements reveal ambiguity in the source.
