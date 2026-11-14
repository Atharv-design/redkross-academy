For Tamarind's dispatch process (MTD 24h, RTO 8h, RPO 1h):

```text
Dependencies and recovery order:
  1. Network core and DNS (target 1h).
  2. Identity (SSO), with achievable RTO 4h and break-glass accounts in a
     safe.
  3. Shipment database: restore from 15-minute log shipping to a clean
     standby (achievable RTO 6h, RPO about 15 minutes).
  4. Courier API: third-party, achievable RTO 12h, which is the gap from
     L03. Workaround: manual dispatch using printed run sheets and phone
     confirmation, plus contractual escalation.
  5. Dispatch application, redeployed from the pipeline (Course 12)
     within 1h of the database.
Runbook entries per step:
  - owner and deputy;
  - prerequisites;
  - commands or console steps;
  - validation, for example "test order TL-00000001 visible";
  - expected duration;
  - escalation contacts;
  - evidence to record (timestamps for the RTO measurement).
Decision points:
  - invoke DR, which needs the incident lead's and business owner's
    approval;
  - switch to manual operations, with a trigger of 2h without the
    courier API;
  - return to normal, after integrity checks and a data reconciliation
    plan for manual entries.
The runbook is tested quarterly for components and annually end to end,
and results update the BIA's achievable figures.
```
