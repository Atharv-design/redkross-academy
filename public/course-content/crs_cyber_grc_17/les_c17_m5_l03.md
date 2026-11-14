A BIA becomes useful when objectives are compared with real capability. A process's RTO can only be met if every dependency can be recovered within it. Its RPO can only be met if data is backed up or replicated at least that often. Execution-tested (LAB_ASSETS/C17/grc_toolkit.py bia):

```text
------------------------------------------------------------- BEGIN OUTPUT
  dispatch & tracking  MTD  24h RTO  8h RPO  1h -> courier API RTO 12h >
                       process RTO 8h
  customer portal      MTD  48h RTO 24h RPO  4h -> web cluster backup
                       interval 24h > RPO 4h
  payroll              MTD 120h RTO 72h RPO 24h -> OK
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; wrapped)
```

**Reading it:**

- Dispatch has an RTO of 8 hours, but the courier API, a third-party dependency, has an achievable RTO of 12 hours. Options: a contractual SLA with a second provider (Module 7), a manual dispatch workaround, or a business decision to accept a longer RTO.
- The customer portal's web cluster is backed up daily, against a 4-hour RPO. First ask whether the web tier holds data at all. If it is stateless and rebuilt from code (Course 12), backup frequency is not the right control, and the check should be redefined. Tools flag candidates, and people interpret them.
- Payroll is consistent: its SaaS RTO of 48 hours is within 72 hours, and its daily backup is within the 24-hour RPO.

Identity (SSO) appears in every process's dependency list. A single dependency shared by all processes deserves the strongest recovery design and its own tested recovery plan.
