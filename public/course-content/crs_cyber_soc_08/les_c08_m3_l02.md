Raw logs arrive in many formats: syslog text, JSON, Windows XML, CSV, vendor formats. Parsing extracts fields. Parse failures are silent detection failures - always monitor them. Execution-tested example (LAB_ASSETS/C08/normalise_demo.py) parsing a firewall syslog line:

```text
Raw: Nov  3 12:16:21 fw01 kernel: DROP IN=eth0 SRC=203.0.113.66
     DST=10.40.0.5 PROTO=TCP DPT=3389
```

**Problems the parser solved:** classic syslog has no year (assumed 2026) and no time zone (the device was configured in IST, so the parser applied +05:30 and converted to UTC: 06:46:21Z).
