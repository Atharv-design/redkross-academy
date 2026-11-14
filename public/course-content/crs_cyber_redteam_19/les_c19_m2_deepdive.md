Running emulation_plan.py over the plan and the authorised scope (execution-tested, CPython 3.14.4, 2026-11-08; abridged):

```output
Adversary-emulation plan validation (isolated range)
  step 1  Reconnaissance      T1595  Active Scanning
          target=10.70.0.0/24  safety=isolated range only; rate-limited; simulation_only
          detect=burst of connections to many hosts/ports from one source
  step 2  Credential Access   T1078  Valid Accounts
          target=10.70.0.10  safety=lab accounts only; no real user data
          detect=anomalous logon (new source, odd hour) for a lab account
  step 4  Lateral Movement    T1021  Remote Services
          target=10.70.0.50  safety=range hosts only; no destructive actions
          detect=remote service logon between workstations (unusual path)
  step 6  Command and Control T1071  Application Layer Protocol
          target=10.70.0.50  safety=C2 to a lab sink on the range only; no real egress
          detect=regular beacon to a single external-looking destination
  ...
  7 step(s) validated: all in scope, all safety-bounded, all mapped to a
  detection -> PASS
```

**Reading the validation:**

- Every step names an ATT&CK tactic and a current technique ID (T1595/T1078/T1021/T1550/T1071 and the Discovery/Collection steps), so the plan speaks the shared language the blue team detects in.
- Every target is inside the authorised range (10.70.0.0/24) - the plan cannot direct activity out of scope.
- Every step carries a safety boundary (isolation, lab accounts, no real egress, synthetic data) and a detection it is meant to test.

Because all seven steps satisfy these, the plan PASSES and is safe to run inside the range. The validation read only JSON files - nothing was emulated or executed here. The plan is simultaneously an emulation script (behaviour to produce) and a detection checklist (what should be caught) - the bridge to purple teaming.
