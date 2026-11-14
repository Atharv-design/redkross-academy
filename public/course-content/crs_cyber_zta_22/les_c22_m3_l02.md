NIST SP 800-207 (Rose, Borchert, Mitchell, Connelly; August 2020) sets out tenets of zero trust, restated in CISA's Zero Trust Maturity Model v2.0 (April 2023) as [R1] [R2]:

1. All data sources and computing services are considered resources.
2. All communication is secured regardless of network location.
3. Access to individual enterprise resources is granted on a per-session basis.
4. Access to resources is determined by dynamic policy.
5. The enterprise monitors and measures the integrity and security posture of all owned and associated assets.
6. All resource authentication and authorization are dynamic and strictly enforced before access is allowed.
7. The enterprise collects as much information as possible about the current state of assets, network infrastructure, and communications and uses it to improve its security posture.

(Wording as quoted in the CISA ZTMM, extracted from the publication text.)

**Practical reading:** tenet 2 means internal traffic gets TLS/mTLS too (Course 15); tenet 3 means short sessions and re-evaluation; tenet 4 means policy uses signals (identity, device, behaviour, threat intelligence); tenets 5 and 7 make monitoring and telemetry (Module 6, Course 08) part of the architecture.
