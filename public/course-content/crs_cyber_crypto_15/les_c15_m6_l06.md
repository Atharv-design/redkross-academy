**Lifecycle stages:**

- Request: CSR with the correct SANs. The key is generated where it will live.
- Validate: for public CAs, domain control validation (DCV).
- Deploy: the full chain.
- Monitor: expiry and CT logs.
- Renew: before expiry.
- Revoke: on compromise or decommissioning.

Public TLS certificate lifetimes are shrinking. CA/Browser Forum ballot SC-081v3 passed on 11 April 2025, with 25 certificate issuers in favour, 0 against and 5 abstaining, and all 4 certificate consumers (browser programmes) in favour. It reduces maximum validity from 398 days to 47 days in stages from March 2026 to March 2029 [R3]. Reporting of the schedule gives:

- 200 days from 15 March 2026 (already in effect at this course's research date);
- 100 days from 15 March 2027;
- 47 days from 15 March 2029.

Domain-validation reuse periods shrink in parallel. The intermediate steps come from consistent secondary reporting, so confirm them against the current Baseline Requirements.

**Consequences:** manual renewal becomes impractical, so automate with ACME clients (certbot, cert-manager, built-in cloud and CDN certificate managers). Inventory every endpoint, including appliances and embedded devices. Alert on failures well before expiry. Short lifetimes also reduce reliance on revocation (Module 5).
