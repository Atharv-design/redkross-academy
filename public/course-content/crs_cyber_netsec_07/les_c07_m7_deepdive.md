LAB_ASSETS/C07/flowcheck.py analyses the synthetic flow telemetry (data/flows.jsonl, 186 NetFlow/IPFIX-style records) entirely offline. Execution-tested (CPython 3.14.4, 2026-11-08):

```output
Flow telemetry analysis: 186 records
Top talkers (by bytes):
  203.0.113.10      60 flows    277580 bytes  (internet)
  10.1.0.10         25 flows     47626 bytes  (dmz)
  10.2.0.10         25 flows     43136 bytes  (app)
  10.4.0.21         15 flows      7680 bytes  (user)
  203.0.113.50      60 flows      2400 bytes  (internet)
Port scans (>= 20 ports to one host within 120s):
  SCAN 203.0.113.50 -> 10.1.0.10 : 60 ports in 59s
Beaconing (>= 8 contacts at near-constant interval):
  BEACON 10.4.0.21 -> 203.0.113.50 : 15 contacts, ~60.0s interval
Segmentation violations in telemetry (aggregated per host-pair):
  VIOLATION 10.4.0.20(user) -> 10.3.0.10(db) : 5432
  VIOLATION 10.4.0.21(user) -> 203.0.113.50(internet) : 443
  VIOLATION 203.0.113.50(internet) -> 10.1.0.10(dmz) : 60 ports incl 20,21..
5 defensive signal(s) to triage (1 scan, 1 beacon, 3 segmentation).
```

**Triage and containment reasoning:**

- The SCAN from external 203.0.113.50 hitting 60 ports on the DMZ host in 59 seconds is reconnaissance. Containment: this is external, so the perimeter firewall should rate-limit/deny the scanning source; investigate whether any probed port responded.
- The BEACON from internal user host 10.4.0.21 to external 203.0.113.50 at a precise 60-second interval is a classic command-and-control pattern - a likely compromised workstation calling home. Containment: isolate 10.4.0.21 (quarantine segment / block its port), block the outbound flow to 203.0.113.50, and investigate the host.
- Correlation: the scanning source and the beacon's destination are the SAME external host (203.0.113.50). A defender would investigate them together - the external host is both scanning the DMZ and receiving beacons from an internal host, a coherent picture of an intrusion.
- The SEGMENTATION VIOLATIONS confirm forbidden flows are occurring (user->db, user->internet beacon, internet->dmz scan ports); each points to a control to fix or a host to contain.

This is the whole module in one view: telemetry collected, patterns detected and made actionable (the scan aggregated to one signal), signals correlated, and containment chosen. Note the analysis is entirely offline on provided telemetry - no capture of live traffic and no action against any system.
