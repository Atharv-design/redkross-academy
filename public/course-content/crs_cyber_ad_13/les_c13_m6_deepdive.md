auth_monitor.py reads data/auth_audit.jsonl (JSON authentication events captured from the lab DC) and reports the three detections of L04. Execution-tested (Samba 4.22.11, CPython 3.14, 2026-11-08):

```output
$ python auth_monitor.py data/auth_audit.jsonl
==================================================================
AUTHENTICATION TELEMETRY SUMMARY  (events: 51)
==================================================================
account              ok   fail  top source
--------------------------------------------------
administrator         2      0  172.17.0.2
asha                  2      4  172.17.0.2
dc1$                 30      0  172.17.0.2
rohan                 0      2  -
t0-admin              1      0  172.17.0.2
[ FINDINGS ]
. all observed Kerberos auth used AES (no RC4/DES) - good
i Tier 0 logons observed from: 172.17.0.2
  (confirm these originate only from privileged access workstations)
. no threshold findings in this window
```

At the default threshold (5) asha's 4 failures do not fire. Tuning the threshold to 4 - the defender's decision from L06 - makes the burst visible:

```output
$ python auth_monitor.py data/auth_audit.jsonl --fail-threshold 4
[ FINDINGS ]
! 4 failed logons for 'asha' (>= threshold 4): possible guessing; check
  lockout policy
. all observed Kerberos auth used AES (no RC4/DES) - good
i Tier 0 logons observed from: 172.17.0.2
```

**Interpretation:**

- The weak-crypto detection reports the HEALTHY case here (all AES256, Module 2); the same code would flag RC4 if present - it verifies rather than assumes.
- The Tier 0 line is the tier model made observable (Module 4): it names the source of every privileged logon so a defender can confirm it was a clean source.
- The threshold change shows tuning in action: the data did not change, the detection sensitivity did, and the burst for asha became a finding.

**Limitations:** the lab stream is authentication (4624-style) events; a full Windows deployment adds 4769 (service-ticket) events that make Kerberoasting detection sharper, and 4740 lockouts to correlate with bursts. The method - parse structured identity events, compute control-aligned detections, tune by threshold - is identical.
