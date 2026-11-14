A reference architecture is the agreed target that individual designs must conform to. Sections:

1. Purpose, scope and drivers (business requirements, regulation, incidents; Module 1).
2. Principles - for zero trust, the NIST SP 800-207 tenets restated for the organisation: every resource access is authenticated, authorised and evaluated per session; no implicit trust from network location; least privilege; continuous monitoring (Module 3) [R3].
3. Logical components: identity provider, device management and posture, policy engine and administrator (PDP), enforcement points (gateways, service mesh, application), segmentation, KMS/HSM, telemetry pipeline and SIEM, automation (Modules 2-6).
4. Patterns: user-to-application access through a PEP; service-to-service with workload identity and mTLS; administrator access with FIDO2, JIT and session recording; data protection by classification.
5. Standards: concrete minimums (TLS 1.2+, phishing-resistant MFA for restricted, 180-day minimum log retention, fail closed for restricted).
6. Views: context, data-flow, deployment and trust-boundary views (Module 1).
7. Governance: who owns it, how exceptions work, how it changes (ADRs, Module 7).

NIST's NCCoE SP 1800-35 (final, June 2025) shows example implementations built from commercial components and is a useful check that the logical components are complete [R4].
