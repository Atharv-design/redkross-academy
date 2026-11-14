LAB_ASSETS/C07/segmentation.py validates observed/intended connections against the zero-trust allowed-flow matrix (data/rk_segmentation.json). Execution-tested (CPython 3.14.4, 2026-11-08):

```output
Segmentation check (zero-trust default-deny)
policy: 6 allowed flows; connections: 7
  [OK       ] internet -> dmz    :443    public web
  [OK       ] dmz    -> app    :8080   web to app
  [OK       ] app    -> db     :5432   app to db
  [VIOLATION] user   -> db     :5432   user direct to db - should be denied
  [VIOLATION] internet -> db   :5432   internet to db - must never happen
  [VIOLATION] user   -> mgmt   :22     user to mgmt SSH - should be denied
  [OK       ] mgmt   -> db     :22     admin SSH to db
3 of 7 connections violate the segmentation policy.
```

**Reading the result:**

```text
- Three connections are OK because they appear in the allowed-flow matrix
  (internet->dmz:443, dmz->app:8080, app->db:5432, mgmt->db:22 are all
  listed).
- Three are VIOLATIONS because they are NOT in the matrix and therefore
  denied by default (zero trust):
    user->db:5432    a workstation reaching the database directly - a prime
                     lateral-movement path; the database must be reachable
                     only from the app tier.
    internet->db:5432 an external host reaching the database - a catastrophic
                     exposure that must never exist.
    user->mgmt:22    a user reaching the management plane - the keys to the
                     kingdom from an untrusted zone.
```

Each violation is a boundary the architecture forbids and an attack path an intruder would exploit. The validation does not itself block anything - it REVEALS the gap between intended policy and observed reality, so the enforcing controls can be fixed. Combined with the hardened firewall policy (Module 2), which explicitly denies user->db and default-denies internet->db, the design and enforcement are brought into agreement. This closed loop - design the matrix, enforce it, validate it - is how segmentation is actually assured.
