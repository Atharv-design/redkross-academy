Controls drift. Assurance must be repeated when things change:

| Term | Meaning |
|---|---|
| Triggers | design change, new data class, new integration or vendor, major platform upgrade, incident or near miss, expiry of an exception, certificate or key renewal on a security device. |
| Cadence | automated checks on every change (CI) and daily or weekly in production; manual reviews at least annually for each critical system. |
| Metrics | share of requirements VALIDATED; age of the oldest evidence; number of exceptions past expiry; time to re-validate after change. |
| Reporting | to the architecture board and risk owners (Course 17), with FAILED and NO-EVIDENCE items as tracked actions. |

Continuous assurance is what would have caught an inspection certificate that silently expired: a daily validation that inspected traffic is still visible fails on the first day, not ten months later.
