The capstone's evidence is a before-and-after pair from the lab tools, tied to the hardening changes. Execution-tested states (Samba 4.22.11, CPython 3.14, 2026-11-08):

BEFORE hardening (dir_review.py):

```output
AD HYGIENE REVIEW  (user objects: 10, findings: 5)
[HIGH  ] legacy-svc   SPN -> Kerberoastable
[MEDIUM] Guest        password never expires
[MEDIUM] legacy-svc   password never expires
[LOW   ] legacy-svc   enabled but never logged on
[LOW   ] rohan        enabled but never logged on
exit=1
```

Hardening action (Module 5 P2): remove the unused SPN and disable the dormant service account, or move it to a gMSA; confirm with samba-tool.

AFTER hardening (dir_review.py, expected arc): the Kerberoastable HIGH finding is absent and the exit code changes to 0 when no HIGH remains; the MEDIUM never-expire and LOW dormant items for legacy-svc also clear once the account is disabled or re-provisioned securely. The activity review continues to show all-AES authentication (auth_monitor.py), and the access review shows privileged groups small and named.

The report's closure table (the deliverable):

```output
finding            before  action                       after   evidence
legacy-svc SPN     HIGH    remove SPN / move to gMSA     closed  dir_review
legacy-svc dormant LOW     disable account              closed  dir_review
Guest never-expire MED     confirm Guest disabled        closed  dir_review
Tier 0 source      INFO    verify PAW-only (prod)        open    forward plan
```

**Interpretation:**

- The single HIGH drove the priority; its closure flips the exit code - a measurable, auditable improvement (Module 7).
- One item (Tier 0 PAW-only source) is honestly left OPEN as a forward-plan item, because a single container cannot enforce physical PAW separation (L06) - stating this is a strength, not a gap in the work.

Limitations and forward plan (stated in the report): add a second DC to demonstrate replication and FSMO; deploy on Windows to exercise Protected Users behaviour and LAPS on member hosts; implement real PAW separation. These are the bridge from the lab to a production hardening programme.
