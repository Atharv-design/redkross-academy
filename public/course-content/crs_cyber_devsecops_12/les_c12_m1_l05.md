A security gate is an automated or manual checkpoint that blocks progression when defined criteria are not met. Design principles:

- Clear criteria. For example: "no new SAST findings of severity ERROR", "no dependency with a known vulnerability of CVSS >= 7.0 that has an available fix", "no secrets detected", "all security unit tests pass".
- Fail on new issues first. Blocking on the whole existing backlog stalls delivery. Track the legacy backlog separately with deadlines.
- Fast feedback. Gates in pull requests are better than gates at release.
- Exceptions with governance. A documented waiver needs an owner, a reason, compensating controls and an expiry, the same discipline as detection suppressions in Course 08 Module 4.
- Exit codes. Tools must return non-zero on failure so the pipeline stops. In this course's lab, Semgrep exited 0 with findings by default and 1 only with --error (Module 4). Always test that a gate actually fails.
- Ownership. Each gate has an owner who tunes it and answers questions.

Gates are part of release safety more broadly: staged (canary) rollouts, automatic rollback, and validation of configuration and content updates, not only code (see the case study).
