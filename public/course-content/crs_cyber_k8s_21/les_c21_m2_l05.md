An SBOM is a machine-readable inventory of the components in a piece of software, with versions and identifiers (package URLs, for example pkg:pypi/urllib3@1.26.4). The two common formats are CycloneDX (version 1.7, released 21 October 2025, standardised by Ecma International as ECMA-424) [R4] and SPDX. Trivy wrote CycloneDX 1.7 documents in the lab.

**Uses:**

- Exposure queries: "do we run zlib1g, and which version?" The lab's sbom_query.py answered for two images in milliseconds without re-scanning them.
- Continuous monitoring: re-match stored SBOMs against new advisories.
- Licence review and procurement (customers and regulators increasingly request SBOMs).
- Pairing with VEX (Vulnerability Exploitability eXchange) statements, in which a supplier states that a listed vulnerability does not affect a product and why.

**Limits:** an SBOM is only as complete as the tool that produced it; it says what is present, not whether it is reachable; and an unsigned SBOM can be altered. Module 7 attaches the SBOM to the image as a signed attestation.
