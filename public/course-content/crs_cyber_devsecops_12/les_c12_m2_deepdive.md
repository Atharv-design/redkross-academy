**Elements:**

| Term | Meaning |
|---|---|
| E1 Customer (browser or mobile app) | external entity |
| E2 Partner courier API | external entity |
| P1 Shipment web/API service | process |
| P2 Notification worker | process |
| D1 Shipments database (personal data) | data store |
| D2 Application logs | data store |
| P3 CI/CD pipeline | process (build-time) |
| E3 Package index (dependencies) | external entity (build-time) |

**Trust boundaries:** B1 internet | P1; B2 P1 | D1 (network and database credentials); B3 P2 | E2; B4 P3 | E3 (supply chain). Selected threats with mitigations (design level):

```text
B1 flow E1->P1, S:  weak authentication. Mitigation: MFA option, rate
                    limiting, breached-password screening.
B1 flow E1->P1, E/I: missing object-level authorisation. Mitigation:
                    owner check (AC-01).
P1, I:              verbose errors reveal internals. Mitigation: generic
                    errors to clients and detailed errors in logs.
D2, I:              secrets or tokens in logs. Mitigation: redaction and
                    a unit test.
D1, I/T:            database reachable broadly. Mitigation: private
                    network, least-privilege database user,
                    encryption at rest (Course 11 concepts).
B3 P2->E2, S/T:     partner endpoint impersonation. Mitigation: TLS with
                    certificate validation and signed webhooks.
B4 P3->E3, T:       untrusted dependency source. Mitigation: AC-03, SBOM,
                    provenance (Modules 5, 7).
P3, E:              anyone with repository write access changes the
                    pipeline. Mitigation: protected branches,
                    CODEOWNERS for pipeline files, and least-privilege
                    CI tokens (Module 7).
```

**Validation (question 4):** each mitigation links to a requirement and a test or a gate. The model is reviewed when a new external integration is added.
