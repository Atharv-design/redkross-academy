**Typical SOC toolset:** SIEM (log search, correlation), EDR (endpoint detection and response), NDR/IDS (network detection), SOAR (automation), case management/ticketing, threat intelligence platform, sandbox.

**Course dataset (Part A):** banyan_events.jsonl - 340 events; per-source counts from minisiem.py (execution-tested): proxy 284, sysmon 33, windows 13, vpn 10. Somewhere in that day is an intrusion; Modules 2-8 uncover it.
