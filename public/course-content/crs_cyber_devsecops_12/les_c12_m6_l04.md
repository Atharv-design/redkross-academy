Secret scanners detect credentials using:

- provider-specific patterns (key prefixes and formats);
- generic patterns (keywords such as "secret", "password" or "token" near high-entropy strings);
- entropy measurements;
- optionally, verification against the provider.

Run them in three places:

1. Pre-commit hooks on developer machines, which stop the leak before it happens.
2. Pull-request and CI gates (Module 1).
3. Scheduled scans of all repositories and their full history, including forks and archived repositories.

Many code hosts also offer server-side push protection. Execution-tested (LAB_ASSETS/C12/secrets_lab.sh, gitleaks v8.30.1). A throwaway repository received a fictional key in commit 2, which was replaced by an environment lookup in commit 3:

```text
------------------------------------------------------------- BEGIN OUTPUT
== git log
e935d02 move credentials to environment
6e1981d add storage client config
7ee7864 initial
== working tree contains key?
0
== gitleaks: working directory only (--no-git)
INF no leaks found
== gitleaks: full git history
Finding:     AWS_SECRET_ACCESS_KEY = "REDACTED"
RuleID:      generic-api-key
File:        settings.py
Commit:      6e1981d1aaeab8acaf16c0849570c2d7d5402e7a
WRN leaks found: 1
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; timestamps and colours removed)
```

**Reading it:**

- The current files were clean, and grep and the working-tree scan both found nothing. The history scan found the secret in commit 6e1981d. Anyone who can clone the repository can retrieve it from history.
- --redact kept the secret out of the scan output. Scanners must not leak what they find into CI logs.
- Detection limits: gitleaks reported one finding (the secret, via its generic-api-key rule) for the two credential lines. Course 11's lab showed trivy ignoring AWS's documented example key, and neither checkov nor trivy flagged a plain password literal. No scanner is complete. Combine scanners, pre-commit hooks and design (workload identity) that removes static secrets.
