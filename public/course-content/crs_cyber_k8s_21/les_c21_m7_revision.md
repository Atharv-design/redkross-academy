## Revision

### Summary

The supply chain runs from source through dependencies, build, artefact and registry to deployment, and each stage needs its own control. SLSA Build levels range from L0 to L3 (hardened builds); local BuildKit provenance in the lab had an empty builder id, incomplete dependencies and no signature - about L1. Signatures bind identities to digests; cosign checks the signature, the claims and, for keyless signing, the certificate identity; transparency logs make signing auditable. The lab proved that moving a tag breaks verification by tag while the signed digest still verifies, so deployments must use digests and verification must happen at admission. Attestations sign typed statements (SBOM, provenance) about a digest. Deployment controls combine registry allowlists, digest-only policies and signature-verifying webhooks. The xz backdoor showed that release artefacts can differ from reviewed source.

### Important concepts

chain dependency; provenance; digest binding; attestation; admission-time verification.

### Key technical takeaways

sign digests; verify at admission; protect keys in KMS or use keyless; test policies with real changes.

### Glossary

| Term | Meaning |
|---|---|
| Attestation | A signed statement about an artefact (in-toto). |
| cosign | Sigstore's tool for signing and verifying artefacts. |
| Provenance | Metadata describing how an artefact was built. |
| Rekor | Sigstore's transparency log. |
| SLSA | Supply-chain Levels for Software Artifacts. |

### Common mistakes

verifying tags; signing keys readable by all jobs; verification only after deployment; assuming one attestation.

### Revision questions

​1. Name the four SLSA build levels. 2. Explain the tag-moved experiment. 3. List three admission-layer controls.

### Further reading

[R2]; [R4].

## References

- [R1] CISA. "Reported Supply Chain Compromise Affecting XZ Utils Data Compression Library, CVE-2024-3094", 29 March 2024. URL: [https://www.cisa.gov/news-events/alerts/2024/03/29/reported-supply-chain-compromise-affecting-xz-utils-data-compression-library-cve-2024-3094](https://www.cisa.gov/news-events/alerts/2024/03/29/reported-supply-chain-compromise-affecting-xz-utils-data-compression-library-cve-2024-3094) Accessed: 2026-11-07. Supports: affected versions, downgrade advice.
- [R2] OpenSSF. SLSA v1.1 "Security levels". URL: [https://slsa.dev/spec/v1.1/levels](https://slsa.dev/spec/v1.1/levels) Accessed: 2026-11-07. Supports: Build L0-L3 definitions (page marked retired; v1.2 current).
- [R3] OpenSSF. SLSA specification v1.2. URL: [https://slsa.dev/spec/v1.2/](https://slsa.dev/spec/v1.2/) Accessed: 2026-11-07. Supports: current version with Build and Source tracks.
- [R4] Sigstore. "Verifying signatures" (cosign). URL: [https://docs.sigstore.dev/cosign/verifying/verify/](https://docs.sigstore.dev/cosign/verifying/verify/) Accessed: 2026-11-07. Supports: what verification checks.
- [R5] MITRE / CVE Program. CVE-2024-3094 record. URL: [https://www.cve.org/CVERecord?id=CVE-2024-3094](https://www.cve.org/CVERecord?id=CVE-2024-3094) Accessed: 2026-11-07 (via the CVE Services API). Supports: tarball and build-process description, CVSS 10.0.
- [R6] Lab evidence. supply/ (supply_chain.sh and output, provenance_summary.txt, digest-policy.yaml, digest_policy_output.txt), hardened/registries.yaml (cosign v3.1.4, registry:3, BuildKit v0.29.0), 2026-11-07.
