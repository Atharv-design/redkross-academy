zt_pdp.py mirrors the PE/PEP split: decide() is the policy engine; enforce() plays the PEP/PA role and writes a decision log. Production systems add:

```text
Policy as code   policies in a declarative language (for example Open
                 Policy Agent's Rego, Cedar, or cloud IAM conditions),
                 version controlled, reviewed and unit tested - like
                 the six lab tests.
Signal freshness device posture and risk scores have timestamps; stale
                 signals are treated as unknown (fail closed for restricted
                 resources).
Session control  short-lived tokens; continuous access evaluation that
                 revokes sessions when signals change.
Availability     redundant PDPs, cached decisions with short TTL,
                 documented fail-open/fail-closed per resource (ADR).
Observability    decision logs to the SIEM; dashboards for deny rates;
                 alert on policy changes.
Governance       policy owners, change approval, periodic review, and
                 linkage to risk and exceptions (Course 17).
```

Limitations of the teaching model: no real authentication, a fixed signal set, no time-based or behavioural analytics, and no session revocation.
