The lab's flow telemetry (186 synthetic NetFlow/IPFIX-style records) contains normal traffic plus two embedded attack patterns, so we can reason about detection concretely. flowcheck.py (detailed in Module 7) applies behavioural thresholds. Execution-tested (CPython 3.14.4, 2026-11-08) detection summary:

```output
Port scans (>= 20 ports to one host within 120s):
  SCAN 203.0.113.50 -> 10.1.0.10 : 60 ports in 59s
Beaconing (>= 8 contacts at near-constant interval):
  BEACON 10.4.0.21 -> 203.0.113.50 : 15 contacts, ~60.0s interval
```

Why these fire and normal traffic does not (the tuning point):

- The SCAN threshold requires at least 20 DISTINCT destination ports to one host within 120 seconds. The scan hits 60 ports in 59s - clearly over the threshold. Normal web browsing hits ONE port (443) repeatedly, so it never approaches 20 distinct ports and is not flagged. The threshold separates reconnaissance from normal use.
- The BEACON threshold requires at least 8 contacts whose inter-arrival times are all within a small jitter of the average. The beacon's 15 contacts are spaced exactly 60s apart - near-zero variance - so it fires. Normal internal and web traffic is bursty and irregular (the lab jitters it), so its intervals vary beyond the tolerance and it is NOT flagged.

This is alert tuning in miniature: the thresholds are set so that genuine patterns trigger and ordinary traffic stays quiet. Set them too loose and every host "scans"; too tight and a slow scan or a jittered beacon slips through - the false-positive/false-negative trade-off made concrete. A real IDS/IPS adds signatures for known threats on top of behavioural detection like this, and feeds tuned alerts to the SOC (Course 08).
