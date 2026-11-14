Not every threat deserves equal effort. A simple, transparent scheme is risk = likelihood x impact on 1-5 scales, with definitions agreed in advance. For example, impact 5 means a large personal-data breach or safety risk, and likelihood 5 means expected to be attempted routinely against internet-facing services. Then decide per threat:

- mitigate (default for high risks);
- accept, with an owner and an expiry, as with gate waivers;
- transfer (insurance, contract);
- avoid (remove the feature).

Track threats in a register stored with the code. Execution-tested register (LAB_ASSETS/C12/threat_register.py):

```text
------------------------------------------------------------- BEGIN OUTPUT
risk  S  element          status   threat
  16  S  login API        planned  credential stuffing with reused
                                   passwords
  16  I  shipment API     done     user reads another user's shipment
                                   (IDOR)
  12  I  logs             open     tokens written to application logs
  10  T  build pipeline   open     dependency resolved from wrong package
                                   index
   9  R  admin console    done     admin changes not attributable
   9  D  tracking search  planned  expensive unbounded queries
   8  E  support role     open     support staff can change delivery
                                   addresses
open or planned with risk >= 12: 2 -> login API; logs
--------------------------------------------------------------- END OUTPUT
(execution-tested, CPython 3.14.4; lines wrapped)
```

**Interpretation:** the two highest open risks are the login API and token leakage into logs, so the team schedules those first. Note the weakness of pure multiplication. The build-pipeline threat has impact 5 but likelihood 2, so it scores 10 and falls below the threshold, even though a supply-chain compromise could affect every customer. Many teams add a rule that any impact-5 threat must have an explicit decision, whatever its score. The PyTorch case study shows why.
