**Policy elements:** subject (user, workload), resource and sensitivity, action, conditions (authentication strength, device posture, location/risk, time, session age), and obligations (log, alert, step-up, limit). Design rules:

- default deny; explicit allow per resource;
- entitlement (who may) separate from conditions (under what circumstances);
- risk-adaptive: more risk raises requirements or denies;
- per-session decisions with re-evaluation on signal change (device falls out of compliance, user risk rises) - continuous verification;
- every decision logged with reasons for audit and tuning.

Execution-tested policy model (LAB_ASSETS/C22/zt_pdp.py):

```text
------------------------------------------------------------- BEGIN OUTPUT
ravi       payroll-app            push_number_match  managed=True
           risk=medium -> STEP_UP auth strength 2 < required 3
asha       payroll-app            otp                managed=True
           risk=low    -> DENY    subject not entitled to resource
vendor-qp  label-printer-mgmt     password           managed=False
           risk=low    -> DENY    unknown resource (default deny)
gopal      intranet               otp                managed=True
           risk=high   -> DENY    high-risk context (e.g. impossible travel)
decision log record example: {"user": "priya", "resource":
 "shipment-portal-admin", "decision": "STEP_UP", "reasons": ["auth
 strength 2 < required 3"]}
Ran 6 tests in 0.000s
OK
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07, CPython 3.14.4; wrapped)
```

**Observations:** medium risk raised the requirement (risk-adaptive); a compliant device and strong MFA do not override missing entitlement; an unregistered resource is denied by default; high risk denies even low-sensitivity resources. Each decision carries a reason - essential for users (why was I blocked?), operations and audit.
