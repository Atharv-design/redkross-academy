From NIST SP 800-207 [R1]:

| Term | Meaning |
|---|---|
| Policy engine (PE) | "responsible for the ultimate decision to grant access to a resource for a given subject", using enterprise policy and external inputs (for example CDM systems and threat intelligence) in a trust algorithm. |
| Policy administrator (PA) | "responsible for establishing and/or shutting down the communication path between a subject and a resource (via commands to relevant PEPs)", generating session-specific credentials. |
| Policy enforcement point (PEP) | "responsible for enabling, monitoring, and eventually terminating connections between a subject and an enterprise resource". |

PE and PA together form the policy decision point (PDP). Inputs (policy information points) include identity management, device posture/CDM, threat intelligence, activity logs, data access policies, PKI and SIEM.

**Design implications:** PEPs must sit in every access path (gateways, proxies, service-mesh sidecars, application middleware); the PDP must be highly available (a PDP outage is an access outage) and itself well protected (tier 0).
