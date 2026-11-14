**Audience:** release approvers, product owners and customers requesting assurance. Structure:

1. Identification. Product, version, artefact digest (SHA-256), source commit and tag, build ID, and date.
2. Decision. Approved or blocked, and by which rule.
3. Gate results. Each gate with its tool version, exit status and summary counts.
4. Open findings and waivers. Each with severity, owner, expiry and compensating controls.
5. Supply chain. SBOM (format and component count, attached), dependency advisories (unique count), licence items needing review, signature and provenance verification instructions.
6. Design assurance. Threat-model status: open high risks, and mitigations verified by tests (Module 2 register).
7. Changes since last release with security relevance.
8. Limitations. What the gates do not cover, such as runtime configuration, DAST and penetration testing status, and third-party services.
9. Sign-off. Names and roles, with dates.

Example limitation statements for the lab release:

- "SAST covered shipments.py with three custom rules only. No taint rules for web frameworks were run."
- "The vulnerability status reflects advisory databases on 2026-11-07. The SBOM will be re-scanned daily."
- "Provenance is self-generated (Build L1-style). Platform-generated provenance is planned."

The report is evidence, so keep it, the SBOM, the audit JSON and the signature bundle with the release for the support lifetime.
