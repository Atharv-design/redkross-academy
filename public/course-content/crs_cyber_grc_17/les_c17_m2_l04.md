Qualitative analysis uses ordinal scales, for example 1-5, with written definitions:

| Term | Meaning |
|---|---|
| Likelihood | 1 rare (less than once in 10 years) ... 5 almost certain (several times a year). |
| Impact | 1 negligible ... 5 severe. Defined per dimension: financial (INR thresholds), operational (outage hours), legal and regulatory (notifiable breach, penalties), customer and reputation, and safety. |
| Score | likelihood x impact (1-25), banded low (1-5), medium (6-11), high (12-25). Define the bands in policy. |

Inherent risk is risk before controls. Residual risk is risk after existing controls, judged on evidence that the controls work (Module 6). Execution-tested register (LAB_ASSETS/C17/grc_toolkit.py risk):

```text
------------------------------------------------------------- BEGIN OUTPUT
id   inherent residual  treatment  owner     scenario
R01        15        6  mitigate   CTO       ransomware encrypts DB and backups
R02        12        4  mitigate   CFO       export emailed unencrypted to wrong
                                             recipient
R03        16        6  mitigate   CISO      credential stuffing on partner logins
R04         9        9  accept     Ops head  unsupported OS exploited
                                             ACCEPTANCE EXPIRED
R05         8        6  transfer   COO       provider outage halts dispatch
R06         6        2  mitigate   IT lead   guest network reaches internal hosts
residual heat map (rows = impact 5..1, cols = likelihood 1..5)
  I3 | .           | R01,R03,R05 | R04         | .           | .
  I2 | R06         | R02         | .           | .           | .
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; empty rows and long lines trimmed)
```

**Reading it:**

- R03 (credential stuffing) has the highest inherent score, 16. With MFA and rate limiting it falls to 6, but only if those controls are confirmed effective.
- R04 has no control effect (residual equals inherent, 9) and its acceptance expired on 31 October 2026. It must go back to the accountable owner for a new decision.
- R05's treatment is "transfer" (insurance or contract). Transfer moves financial consequences, not the operational outage. Residual impact stays significant.

Quantitative analysis estimates loss in money: annualised loss expectancy, or distributions with FAIR-style models (loss event frequency x loss magnitude). It supports investment decisions where data allows. Present ranges, not false precision.
