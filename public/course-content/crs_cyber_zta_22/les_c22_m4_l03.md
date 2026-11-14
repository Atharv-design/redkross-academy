| Term | Meaning |
|---|---|
| Reverse proxy / WAF | terminates TLS, filters requests, hides origin servers. |
| API gateway | authenticates tokens, enforces rate limits and schemas for APIs. |
| Identity-aware proxy / ZTNA | per-application access after IdP authentication and device posture checks - the PEP of Module 3; users reach applications, not networks. |
| Bastion / jump host | brokered administrative access with MFA and session recording (Module 2 PAM). |
| Enclave gateway | front legacy or OT systems that cannot be changed. |

Compared with network-level VPNs that place devices "on the network", ZTNA grants access per application and per session, reducing lateral movement. Gateways are themselves high-value targets: harden, patch quickly, minimise exposed management interfaces, and monitor them centrally.
