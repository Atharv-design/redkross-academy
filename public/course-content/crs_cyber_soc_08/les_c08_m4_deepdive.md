LAB_ASSETS/C08/triage.py (execution-tested) imports DB and RULES from minisiem, so the rules exist in one place only. For each rule:

- it runs the saved SQL with sqlite3.Row, so each hit can be read as a dictionary by column name;
- it checks suppressions. Each one matches a single rule, field and exact value, never a pattern;
- it derives user and host, falling back to PRIMARY_HOST when the event has no host;
- it computes priority from RULE_META (severity, confidence) and ASSETS (criticality, default 2 for unknown assets). Unknown assets are not scored as zero, because unknown is a risk in itself;
- ip_context() uses the ipaddress module to classify addresses as internal (10.0.0.0/8) or external.

The output is sorted highest-priority first, forming a work queue.

**Limitations:** tables are hard-coded, there is no time decay, and it does no grouping. Practical P2 asks you to add grouping.
