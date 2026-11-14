Eradication removes the attacker's access completely:

- Remove persistence found in scoping (services, tasks, Run keys, cron, systemd units, authorized_keys, web shells, new accounts).
- Rebuild rather than clean compromised hosts when feasible. Cleaning misses what you did not find.
- Reset credentials: the compromised accounts, service accounts, and keys and tokens the attacker could reach (API keys, cloud access keys, SSH keys). In Active Directory compromises, privileged and domain-wide credentials may need resetting (Course 13 covers krbtgt and tier-0 recovery).
- Fix the entry point: patch the vulnerability, close the exposed service, enforce MFA on the abused path.
- Validate. Re-sweep with all indicators, and compare restored systems with known-good baselines.

Execution-tested baseline comparison (LAB_ASSETS/C09/baseline_diff.py demo, fictional web root):

```text
------------------------------------------------------------- BEGIN OUTPUT
baseline: 3 files
ADDED    uploads/shell.php
REMOVED  robots.txt
CHANGED  js/app.js
summary: 1 added, 1 removed, 1 changed
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07, CPython 3.14.4)
```

The script hashed every file (SHA-256) in a known-good state, then compared it with the state after simulated attacker changes. It found a planted file, a deleted file and a modified script. The same comparison run after a restore confirms that the restored web root matches the baseline. A baseline only helps if it was taken before the compromise and stored where the attacker could not change it. Recovery restores service in stages: restore from known-good backups (check that they pre-date the compromise and do not contain the persistence); bring systems back in priority order; monitor intensively for re-entry (Course 08 detections tuned to this incident's indicators); and confirm business validation with system owners. Define recovery success criteria in advance.
