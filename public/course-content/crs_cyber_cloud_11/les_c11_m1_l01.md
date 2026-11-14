NIST SP 800-145 (September 2011, Mell and Grance) defines cloud computing by five essential characteristics, three service models and four deployment models [R1]:

| Term | Meaning |
|---|---|
| Characteristics | on-demand self-service; broad network access; resource pooling; rapid elasticity; measured service. |
| Service models | IaaS (infrastructure: virtual machines, networks, storage), PaaS (platforms: managed databases, app runtimes), SaaS (complete applications). |
| Deployment | private, community, public and hybrid cloud. |

Security consequences of each characteristic:

- Self-service: anyone with permissions can create resources in seconds, so guardrails must be automatic (Module 6).
- Broad network access: management interfaces are reachable over the internet, protected by identity (Module 2).
- Resource pooling: tenants share hardware; isolation is the provider's duty and a rare but serious failure mode (L06).
- Elasticity: inventories change constantly; asset lists must be generated from APIs, not spreadsheets.
- Measured service: billing data is also a security signal (unexpected spend can indicate misuse).

Serverless and containers (Module 7) sit between IaaS and PaaS; the useful question is always "which layers do I configure and operate?"
