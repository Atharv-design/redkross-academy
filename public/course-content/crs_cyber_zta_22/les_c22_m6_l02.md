NIST SP 800-207 lists data sources that feed the policy engine, including continuous diagnostics and mitigation (device state), threat intelligence, activity logs and SIEM (Module 3). The same signals, and the decisions they produce, must flow back into monitoring. Minimum telemetry set:

```text
idp                 sign-ins, MFA method, token issuance and refresh
pdp                 every decision (ALLOW, STEP_UP, DENY) with reasons and
                    policy version
pep                 enforcement and session events at gateways/proxies
edr                 device posture and endpoint detections
dns                 resolver queries (Course 07)
cloud control plane management API audit logs (Course 11)
kms                 key use and key-policy changes (Module 5)
```

Continuous verification means a granted session is re-evaluated when its inputs change. Monitoring checks that this actually happens:

- posture drops during a session -> the session is revoked or stepped up;
- a source goes silent -> decisions that depend on it are flagged;
- the PDP falls back to its fail-safe path -> operations and security both know;
- a policy changes -> the change is linked to an approved ticket;
- many denies for one subject -> investigate (misconfiguration, abuse of an account or a new integration that was never entitled).

These are monitoring signals for defenders. Each one needs an owner, a runbook and a test (Module 7).
