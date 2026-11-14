**Inputs:**

- business goals and critical processes (BIA - MTD/RTO/RPO; Course 17 M05);
- data inventory and classification (Module 5);
- regulatory obligations (DPDP Act and Rules, CERT-In Directions - including 180-day log retention and 6-hour reporting, sector rules such as RBI and SEBI frameworks; Course 17 M03);
- threat model and risk register (Course 12 M02, Course 17 M02);
- non-functional needs: performance, availability, cost, usability.

Requirements should be architecture-level and testable, e.g.:

```text
AR-01 All access to restricted data is authenticated with
      phishing-resistant MFA and authorised per request (Modules 2-3).
AR-02 Production data stores are reachable only from their application
      tier; no direct user or internet path (Module 4).
AR-03 Restricted data is encrypted with customer-managed keys; key and
      data administration are separated (Module 5).
AR-04 Security-relevant logs from all tiers reach an independent central
      platform and are retained at least 180 days (Module 6).
AR-05 Critical services survive the loss of one availability zone and can
      be rebuilt from code (Module 6).
```

Each requirement links to risks and obligations and is validated in Module 7.
