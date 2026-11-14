Two execution-tested tools (LAB_ASSETS/C22) review Tamarind's design from files only. resilience_review.py reads telemetry_arch.json:

```text
------------------------------------------------------------- BEGIN OUTPUT
review of telemetry_arch.json (Tamarind Logistics (fictional))
  HIGH   coverage       zt-pdp-decisions: not forwarded to central platform
  HIGH   coverage       missing source 'kms' (key management (key use and
                        key policy changes))
  HIGH   failure-mode   shipment-portal-admin: restricted resource set to
                        fail_open; must fail closed
  HIGH   incident-ready IR tooling depends on production IdP (unusable if
                        identity is compromised)
  HIGH   integrity      central log store is not immutable (logs can be
                        altered)
  HIGH   recovery       wms-core: backups neither immutable nor offline
  HIGH   recovery       wms-core: restore never tested
  MEDIUM availability   single log collector (single point of failure)
  MEDIUM availability   no alert when a source stops sending (silent gaps)
  MEDIUM failure-mode   payroll-app: fails closed with no documented
                        break-glass path
  MEDIUM incident-ready no out-of-band communications for responders
  MEDIUM recovery       idp-config: tested restore 9h exceeds RTO 4h
  MEDIUM retention      idp-signins: retention 30d < 180d
  MEDIUM retention      zt-pdp-decisions: retention 14d < 180d
  MEDIUM retention      edr-fleet: retention 90d < 180d
  MEDIUM time           depot-dns: no time synchronisation (timeline risk)
summary: 16 findings (7 HIGH) -> FAIL
--------------------------------------------------------------- END OUTPUT
(long lines wrapped for this page; execution-tested 2026-11-08, CPython
3.14.4; telemetry_arch_fixed.json gives 0 findings -> PASS)
```

decision_monitor.py reads a deterministic synthetic telemetry file made by make_decision_log.py (163 events over two hours):

```text
------------------------------------------------------------- BEGIN OUTPUT
163 events read from decision_log.jsonl
  M1 2026-11-08T10:03:02  source pep silent for 23 min before this event
  M2 2026-11-08T10:12:02  3 decisions taken by fail-closed path
                          (2026-11-08T10:12:02 to 2026-11-08T10:18:30):
                          PDP unavailable
  M4 2026-11-08T10:25:14  vendor-qp: 6 denies in 10 min
  M3 2026-11-08T10:35:11  policy change by ops-admin2 (intranet allow
                          group contractors) has no change ticket
  M5 2026-11-08T10:48:31  session s901 (ravi) still active after device
                          dev-r1 failed posture (disk encryption off)
summary: 5 alerts
--------------------------------------------------------------- END OUTPUT
(long lines wrapped; execution-tested 2026-11-08, CPython 3.14.4)
```

**Reading them:** the PDP's own decisions were not centralised and were kept for 14 days, so the most important zero trust evidence would be gone before most investigations start. The restricted admin portal would fail open. In the telemetry, priya's session was revoked two minutes after her EDR agent stopped, but ravi's session survived a posture failure - continuous verification was configured for one resource and not the other. The policy change without a ticket and the 23-minute gateway gap are exactly the "quiet" conditions that dashboards miss.
