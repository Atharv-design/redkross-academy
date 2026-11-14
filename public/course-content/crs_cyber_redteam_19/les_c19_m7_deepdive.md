Running purple.py over the emulation plan and the blue-team telemetry (execution-tested, CPython 3.14.4, 2026-11-08; abridged):

```output
Purple-team detection-gap analysis
======================================================================
  [DETECTED] step 1 T1595  Active Scanning
             alert: IDS: horizontal scan from 10.70.0.50
  [DETECTED] step 2 T1078  Valid Accounts
             alert: SIEM: anomalous logon for range\svc-lab
  [GAP]      step 3 T1087  Account Discovery
             needed: bulk directory queries from a workstation (directory/process)
  [DETECTED] step 4 T1021  Remote Services
             alert: SIEM: unusual remote service logon wks->wks
  [GAP]      step 5 T1550  Use Alternate Authentication Material
             needed: logon using non-interactive auth material; no interactive logon
  [DETECTED] step 6 T1071  Application Layer Protocol
             alert: Proxy: periodic beacon to lab sink
  [GAP]      step 7 T1005  Data from Local System
             needed: staging of many files by one process (file/process logs)
coverage: 4/7 techniques detected; 3 gap(s) to engineer and retest
RETEST LIST:
  - step 3 T1087: build 'bulk directory queries' detection, then re-emulate
  - step 5 T1550: build 'orphan non-interactive logon' detection, then re-emulate
  - step 7 T1005: build 'mass file staging' detection, then re-emulate
```

**Reading the analysis:**

- COVERAGE is 4/7: Active Scanning, Valid Accounts, Remote Services and the C2 beacon were detected; Account Discovery, Use Alternate Authentication Material and Data from Local System were MISSED.
- Each GAP names the detection and telemetry needed - so the fix is concrete (collect directory/process and file/process telemetry; build the rules).
- The RETEST LIST turns the gaps into an improvement backlog: build each detection, then re-emulate the same technique to confirm it fires.

This is the course's core payoff: emulation measured against detection yields a specific, prioritised, verifiable plan to improve the blue team's coverage. The analysis read only the plan and telemetry files; nothing was emulated here.
