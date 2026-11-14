LAB_ASSETS/C20/coverage.py (execution-tested, CPython 3.14.4, PyYAML 6.0.3) holds the three inventories as data:

```text
TELEMETRY   log name -> (hosts sending, retention days). This is a
            fictional inventory; in production it comes from your SIEM's
            source-health data.
PRIORITIES  (technique ID, name, required log). The IDs were checked
            against Enterprise ATT&CK 20.1 STIX data.
rules/tests read from detections/rules and detections/tests. A rule
            counts for a technique when it carries the tag
            attack.<technique id>; it counts as tested when a test file
            with cases exists (the unit tests themselves run in Module 4).
```

Output (execution-tested, 2026-11-07, abridged):

```output
Telemetry inventory
  sysmon        16/16 hosts    retention=90d
  security      4/16 hosts     retention=180d
  dns           n/a            retention=30d
  flow          n/a            retention=30d
  edr_registry  0/16 hosts     retention=0d

technique  name                                 telemetry     score rules
T1566.001  Spearphishing Attachment             sysmon        3     rk_office_spawns_powershell
T1053.005  Scheduled Task                       security      3*    rk_schtask_user_writable_path
T1547.001  Registry Run Keys / Startup Folder   edr_registry  0     -
T1110.003  Password Spraying                    security      1*    -
T1041      Exfiltration Over C2 Channel         flow          1     -
T1685.005  Clear Windows Event Logs             security      3*    rk_security_log_cleared

Coverage score 26 / 33 (79%). * = telemetry from only part of the fleet:
a score is an upper bound for hosts that are not forwarding.
Blind (fix telemetry first): T1547.001
Visible but no rule (write detections): T1110.003, T1041
```

**Interpretation:**

- 79% sounds good, but three of the eight "tested" rows depend on the security log, which covers a quarter of the fleet. Fixing Windows Event Forwarding for the twelve silent hosts improves real coverage more than writing any new rule.
- T1547.001 is blind: no registry telemetry is collected at all. A rule cannot fix that. Enabling Sysmon registry events (Event IDs 12-14) with a targeted filter for autostart keys would.
- T1110.003 and T1041 are visible: the data exists, so these are cheap wins for Module 4 (a failed-logon threshold rule and an outbound-volume analytic).

**Limitations:** the calculator does not check that a rule's logic actually fits the technique, and it does not weight techniques by risk. Both are extension exercises.
