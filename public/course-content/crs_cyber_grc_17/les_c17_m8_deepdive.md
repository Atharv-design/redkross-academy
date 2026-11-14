Execution-tested outputs (LAB_ASSETS/C17/grc_toolkit_output.txt) mapped to review agenda items:

```text
Risk register (risk)
  "R04 ... ACCEPTANCE EXPIRED". Decision needed: renew with CEO approval,
  or fund replacement of the depot PCs.
Framework coverage (csf)
  "overall: 15/22 categories have at least one mapped control", with gaps
  GV.OC, GV.RR, ID.IM, PR.IR, RS.AN, RS.MI and RC.CO. Feeds the
  improvement plan.
Exceptions (exceptions)
  EX-02 expired, uncompensated and under-approved; EX-03 unapproved;
  EX-01 high-scrutiny MFA exception. Decisions: enforce the exception
  rules, and review EX-01 against the British Library lessons.
Resilience (bia)
  Dispatch RTO not supported by the courier API (12h > 8h). Decision:
  workaround or second provider.
Assurance (audit)
  Sample clean, but the full population found 4 leaver accounts active.
  A high finding with remediation dated 2027-01-31.
Third party (vendor)
  QuickPrint rejected for critical fails (MFA, notification). Decision:
  remediation plan or replacement.
```

Each item becomes a slide or table row with owner, date and decision. The toolkit's value is consistency: the same logic each quarter gives comparable trends. Its limits must be stated: fictional data, simplified scoring, no correlation modelling.
