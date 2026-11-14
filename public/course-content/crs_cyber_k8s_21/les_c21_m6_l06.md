Each check has a natural place, and overlapping places give defence in depth:

| Term | Meaning |
|---|---|
| editor / pre-commit | linting, fast policy checks, secret scanning |
| pull request | IaC scanning, policy tests, plan review, human approval |
| pre-apply | policy on plan JSON (resolved values) |
| admission (clusters) | ValidatingAdmissionPolicy, Pod Security - the last line, catching anything applied by other routes |
| runtime | drift detection, posture scanning, audit-log detections (Module 5) |

Earlier checks are cheaper to fix; later checks catch what bypassed the earlier ones. Keep rules consistent across stages (the same intent in rk_policy for CI and in the admission policy for the cluster), and treat pipeline configuration itself as code under review.
