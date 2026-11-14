Part 1 - scope enforcement (scopecheck.py, execution-tested, 2026-11-08):

```output
Scope enforcement check (authorised range only)
  10.70.0.10         IN-SCOPE      listed host ip
  rk-range-web       IN-SCOPE      listed host id
  10.70.0.20         IN-SCOPE      listed host ip
  8.8.8.8            OUT-OF-SCOPE  not in any authorised network or host
REFUSE: one or more targets are OUT-OF-SCOPE - do not proceed against them
```

The three range targets are in scope (listed hosts or within 10.70.0.0/24); the public address 8.8.8.8 is out of scope, so the tool REFUSES - fail-safe. Nothing is contacted; the check is a pure in/out classification against the authorised inventory.

Part 2 - the evidence chain (evidence.py, execution-tested, 2026-11-08):

```output
added entry step=2 hash=2e144cc43ce2b9a3...
added entry step=4 hash=2eba6e628c19760a...
  step 2   enumerated range DC (lab)       op=analyst1  2026-11-08T...Z
  step 4   remote service logon wks (lab)  op=analyst1  2026-11-08T...Z
integrity OK: evidence chain intact
-- after editing one entry's text --
[BROKEN] entry 1 (step 2) fails integrity check
integrity FAILED: evidence chain broken
```

Each entry records the action, the in-scope asset, the operator and the time, and chains to the previous entry by hash. 'verify' confirms the chain is intact; after a single character of one entry is altered, 'verify' reports the entry BROKEN - the tamper is detected. This is chain of custody made enforceable: evidence cannot be changed after the fact without detection. Both tools read/write only local files; no system is touched.
