Validation by effect means testing the outcome the control promises, in an authorised environment, rather than reading its configuration:

| Term | Meaning |
|---|---|
| Segmentation | a connectivity matrix: allowed paths succeed, denied paths fail (Module 4 lab). |
| Policy decisions | unit tests of the PDP for each rule, including default deny and step-up (Module 3 lab). |
| Inspection | a benign test pattern sent through the inspection point is seen and logged; certificate expiry on the inspection device is itself monitored. |
| Detection | generated, benign telemetry triggers the expected alert (Module 6 lab; Course 20). |
| Recovery | a timed restore from backup against the RTO. |
| Coverage | asset inventory reconciled with scanner and agent coverage, so "scanned" means every in-scope asset. |

**Rules:** obtain written authorisation for any test in production; use benign test inputs; record date, tester, method and result; re-test after change. Breach and attack simulation or purple-team exercises (Courses 19-20) are forms of validation run under explicit rules of engagement.
