dir_review.py parses data/directory_export.ldif (a read-only snapshot taken with ldbsearch, Module 2) and reports hygiene findings with severity and fix. Execution-tested output (Samba 4.22.11, CPython 3.14, 2026-11-08):

```output
$ python dir_review.py data/directory_export.ldif ; echo exit=$?
======================================================================
AD HYGIENE REVIEW  (user objects: 10, findings: 5)
======================================================================
[HIGH  ] legacy-svc     user account carries SPN(s)
         HTTP/app1.ad.sahyadri.example -> Kerberoastable; use a gMSA or a
         25+ char random password and AES only
[MEDIUM] Guest          password set to never expire (UAC 0x10000) ...
[MEDIUM] legacy-svc     password set to never expire (UAC 0x10000) ...
[LOW   ] legacy-svc     enabled but never logged on (dormant?)
[LOW   ] rohan          enabled but never logged on (dormant?)
exit=1
```

**Interpretation:**

- legacy-svc is the exemplar: THREE findings on one account - a Kerberoastable SPN (the T1558.003 precondition), a non-expiring password, and no interactive use. In production this is a classic soft target; the fix is a gMSA (Module 3) or a PSO-enforced 25+ char random password with AES, and removal of the SPN if unused.
- The tool deliberately does NOT flag the DC machine account (DC1$) for unconstrained delegation or krbtgt for its built-in SPN: domain controllers are trusted for delegation by design, and krbtgt's SPN is normal. Suppressing expected conditions keeps the real findings visible - a key skill in reading posture tools.
- exit=1 because a HIGH finding is present: the review can gate a change until Kerberoastable accounts are remediated.

The authentication monitor (Module 6) complements this by watching for the techniques in ACTION - failed-logon bursts, weak encryption types, and the sources of Tier 0 logons - so posture (dir_review.py) and telemetry (auth_monitor.py) together cover both the preconditions and the activity.

**Limitations:** the export covers user objects; a full review also examines computer objects, ACLs on the directory (rights such as DCSync), GPO permissions and trust configuration. The lab demonstrates the method on the highest-value, easiest-to-read conditions.
