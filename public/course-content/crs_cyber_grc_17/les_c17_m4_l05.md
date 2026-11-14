An exception (waiver) is a documented, approved, time-limited deviation from a standard. Elements:

- the standard and requirement affected;
- scope (assets, users);
- business reason, and why compliance is not currently feasible;
- risk assessment, linked to a risk register entry (Module 2);
- compensating controls that reduce risk while the exception exists;
- an approver at the level matching the risk (committee thresholds, Module 1);
- an expiry or review date, with a remediation plan;
- an exception owner.

Execution-tested register check (LAB_ASSETS/C17/grc_toolkit.py exceptions):

```text
------------------------------------------------------------- BEGIN OUTPUT
  EX-01 depot terminal server  -> valid  (STD-AC-02 MFA on all remote
        access; risk R03)
  EX-02 label printers         -> EXPIRED; no compensating control;
        approver 'IT lead' below required level (CISO)  (STD-PT-01 patch
        criticals in 14 days; risk R04)
  EX-03 archive NAS            -> no approver  (STD-CR-01 AES-256 at rest;
        risk R02)
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; wrapped)
```

**Reading it:**

- EX-02 fails three ways: expired, no compensating control, and approved below the required level. It must be renewed properly or the system remediated.
- EX-03 has no approver, so it is not an exception, just non-compliance.
- EX-01 passes the checks, but it is an MFA exception on a terminal server, the same pattern as the British Library case. Procedural validity does not mean the risk was correctly appraised. Exceptions on internet-facing access paths deserve the highest scrutiny and the shortest expiry.

**Rules:** no permanent exceptions; report the register to the committee; treat repeated renewals as a signal to fix the root cause or change the standard.
