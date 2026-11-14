A detection repository typically holds rules/, tests/, pipelines/ and the CI configuration. Workflow:

1. Branch per change (for example tune/encoded-command).
2. Commit with a message that states why.
3. A local pre-commit hook runs the unit tests and blocks failures.
4. A pull request runs the same tests in CI, plus sigma check (lint) and conversion for each backend.
5. A reviewer checks logic, tests, false-positive analysis, ATT&CK tags and performance (for example a leading wildcard on a huge index).
6. A merge triggers deployment to a staging SIEM, then production.

A local hook is a convenience, not a control. Developers can skip it, and the lab hook tests the working tree rather than the staged snapshot. CI on the server side is the real gate. Peer review catches what tests cannot: a rule that is correct but pointless, or one that a minor variant can evade.
