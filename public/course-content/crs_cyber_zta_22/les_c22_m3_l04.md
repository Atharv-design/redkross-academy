NIST SP 800-207 describes approaches with different emphases:

- enhanced identity governance (identity and attributes drive policy);
- micro-segmentation (gateways/agents isolate resources; Module 4);
- network infrastructure and software-defined perimeters (overlay networks where the controller sets up per-session paths).

**And deployment variations:** device agent/gateway, enclave-based (gateway in front of a group of resources, useful for legacy), resource portal (a gateway without device agents), and device application sandboxing.

**Most enterprises combine them:** identity-aware proxies for web apps, ZTNA agents for private apps, enclave gateways for legacy and OT, and service mesh mTLS for workloads. NIST SP 1800-35 "Implementing a Zero Trust Architecture" (final, June 2025) documents 19 example implementations built with 24 collaborators [R3].
