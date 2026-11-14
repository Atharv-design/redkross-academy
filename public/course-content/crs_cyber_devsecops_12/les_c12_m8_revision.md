## Revision

### Summary

The capstone pipeline runs tests, SAST, dependency audit, secret scanning, SBOM and licence inventory, and signing, in pinned containers. Every gate records its result and the report computes the decision. In the tested runs, the upgraded release passed every gate (0 advisories, SBOM of 7 components, only certifi's MPL licence flagged) and was approved. The outdated pins were blocked by the audit gate with 17 unique advisories. Two real defects in the pipeline itself were found and fixed: tooling contaminating the SBOM (42 components) and a container permission error blocking signing. Findings move through detection, deduplication, triage, remediation, verification and learning. The release security report identifies the artefact by digest, gives decisions, gate results, waivers, supply-chain evidence, design assurance and limitations, with sign-off. Releases are verified by signature, provenance and source correspondence, the lesson of the xz tarballs.

### Important concepts

complete, automatic decisions; accurate SBOM scope; honest limitations.

### Key technical takeaways

rc-file gate pattern; tool/product separation; report computed from evidence.

### Glossary

| Term | Meaning |
|---|---|
| Findings lifecycle | Detect-to-close process for security findings. |
| Release security report | Evidence-based release assurance document. |
| Reproducible build | Build producing identical output from identical inputs. |
| Residual risk | Risk remaining after controls and waivers. |
| Sign-off | Accountable approval of a release. |

### Common mistakes

reports without digests; SBOMs of the CI image; treating "approved" as "secure".

### Revision questions

​1. List the nine report sections. 2. Why separate tooling from product? 3. How do you verify a release?

### Further reading

xz report [R1]; SLSA [M07-R3].

## References

- [R1] Freund, A. "backdoor in upstream xz/liblzma leading to ssh server compromise", oss-security, 29 March 2024. URL: [https://www.openwall.com/lists/oss-security/2024/03/29/4](https://www.openwall.com/lists/oss-security/2024/03/29/4) Accessed: 2026-11-07. Supports: tarballs 5.6.0/5.6.1; test files in repository.
- [R2] CISA. "Reported Supply Chain Compromise Affecting XZ Utils Data Compression Library, CVE-2024-3094", 29 March 2024. URL: [https://www.cisa.gov/news-events/alerts/2024/03/29/reported-supply-chain-compromise-affecting-xz-utils-data-compression-library-cve-2024-3094](https://www.cisa.gov/news-events/alerts/2024/03/29/reported-supply-chain-compromise-affecting-xz-utils-data-compression-library-cve-2024-3094) Accessed: 2026-11-07. Supports: CVE, downgrade advice.
- [R3] NTIA. "The Minimum Elements For a Software Bill of Materials", 12 July 2021. URL: [https://www.ntia.gov/report/2021/minimum-elements-software-bill-materials-sbom](https://www.ntia.gov/report/2021/minimum-elements-software-bill-materials-sbom) Accessed: 2026-11-07. Supports: SBOM content expectations.
- [R4] Lab evidence. release/run_release.sh, pipeline_in_container.sh, release_report.py, release_report_output.txt, release_blocked_output.txt (semgrep 1.184.0, pip-audit 2.10.1, gitleaks v8.30.1, cosign v3.1.4), 2026-11-07.
