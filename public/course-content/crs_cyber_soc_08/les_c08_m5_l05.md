1. Requirement: what do we need? (for example "infrastructure targeting finance users").
2. Ingest feeds into a threat-intel platform; de-duplicate; normalise.
3. Score and age: drop or downgrade expired and low-confidence indicators.
4. Match against telemetry - retrospectively (last 90 days) and in real time - and attach matches to alerts as enrichment.
5. Analyst review: does the match make sense in context?
6. Act proportionately: alert, hunt, block (with change control).
7. Feed back: report false matches to the source; share your own findings under appropriate TLP.

Execution-tested example (LAB_ASSETS/C08/ioc_match.py, fictional feed, as-of date 2026-11-03):

```text
------------------------------------------------------------- BEGIN OUTPUT
MATCH    domain cdn-telemetry-sync.example     conf= 85 hits= 18
         first=2026-11-03T06:17:00Z src=ISAC-A TLP:AMBER
MATCH    domain banyan-payroll-update.example  conf= 70 hits=  1
         first=2026-11-03T06:12:00Z src=internal TLP:GREEN
MATCH    ipv4   203.0.113.66                   conf= 60 hits=  9
         first=2026-11-03T06:42:00Z src=ISAC-A TLP:GREEN
EXPIRED  ipv4   198.51.100.104                 conf= 40 hits=  1
         first=2026-11-03T13:33:00Z src=open feed TLP:CLEAR
         expired indicator still matches: review before acting
no match sha256 9f2c...e1a0                    conf= 90 hits=  0
--------------------------------------------------------------- END OUTPUT
(execution-tested with CPython 3.14.4; lines wrapped for width)
```

**Interpretation:**

- The beacon domain (18 hits) and look-alike domain (1 hit) corroborate the WS-104 case from Module 4 with independent intelligence.
- 203.0.113.66 matches 9 events: 8 failed and 1 successful VPN login (Module 3). ISAC context "password spraying against VPNs" strengthens the R2 alert.
- The expired open-feed address matches gopal's ordinary VPN session at 13:33 UTC. Acting on it (for example disabling gopal) would be wrong; the indicator is old, low-confidence and describes shared hosting.
- The hash did not match because the dataset contains no file hashes. "No match" here means "no data", not "clean" - a telemetry gap (Module 2).
