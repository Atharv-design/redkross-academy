## Revision

### Summary

Base images contribute most packages; minimal bases (slim, distroless, scratch) reduce findings and tools for intruders but change debugging.

**Dockerfile hygiene:** digest pins, no secrets in ENV/ARG or the build context, numeric non-root USER, verified downloads, multi-stage builds. Scanners inventory packages and match advisories; backports cause false positives, metadata-less binaries and unknown secret formats cause false negatives; results change daily. In the lab, 376 findings fell to 325 by hardening the Dockerfile and to 203 (no CRITICAL) by refreshing the base; removing unneeded Python packages removed 23 findings. Gates block fixable CRITICAL/HIGH and secrets and accept expiring exceptions. SBOMs (CycloneDX 1.7, ECMA-424; SPDX) enable exposure queries; provenance records how the image was built. CVE-2019-5021 showed base-image defects propagate to every derived image.

### Important concepts

attack surface; fixable versus unfixable; exception expiry; SBOM; provenance.

### Key technical takeaways

docker history reveals ENV; layers keep deleted files; record scanner version and date; rebuild on base updates.

### Glossary

| Term | Meaning |
|---|---|
| Distroless | Image with a language runtime but no shell or package manager. |
| purl | Package URL, a standard package identifier. |
| SBOM | Software bill of materials. |
| VEX | Vulnerability Exploitability eXchange statement. |

### Common mistakes

chasing counts; waivers without expiry; trusting secret scanners; copying the whole build context.

### Revision questions

​1. Explain three false-negative sources. 2. Design an exception record. 3. Contrast SBOM and provenance.

### Further reading

[R2]; [R5].

## References

- [R1] Souppaya, M., Morello, J., Scarfone, K. NIST SP 800-190 "Application Container Security Guide", September 2017. URL: [https://csrc.nist.gov/pubs/sp/800/190/final](https://csrc.nist.gov/pubs/sp/800/190/final) Accessed: 2026-11-07. Supports: image and registry risk areas.
- [R2] Aqua Security. Trivy documentation. URL: [https://trivy.dev/latest/docs/](https://trivy.dev/latest/docs/) Accessed: 2026-11-07. Supports: scanners, image-config checks, SBOM output (behaviour confirmed by lab runs of Trivy 0.76.2).
- [R3] MITRE / CVE Program. CVE-2019-5021 record, published 8 May 2019. URL: [https://www.cve.org/CVERecord?id=CVE-2019-5021](https://www.cve.org/CVERecord?id=CVE-2019-5021) Accessed: 2026-11-07 (via the CVE Services API). Supports: CS1 text and CVSS 9.8.
- [R4] OWASP CycloneDX. "Specification Overview". URL: [https://cyclonedx.org/specification/overview/](https://cyclonedx.org/specification/overview/) Accessed: 2026-11-07. Supports: CycloneDX 1.7 (2025-10-21), ECMA-424.
- [R5] Docker. "Best practices" for building images, Docker Docs. URL: [https://docs.docker.com/build/building/best-practices/](https://docs.docker.com/build/building/best-practices/) Accessed: 2026-11-07. Supports: multi-stage builds, pinning, USER, .dockerignore guidance (L02).
- [R6] Lab evidence. images/ (Dockerfiles, dockerfile_lint.py, trivy_summary.py, image_gate.py, sbom_query.py and their outputs; Trivy 0.76.2), 2026-11-07.
