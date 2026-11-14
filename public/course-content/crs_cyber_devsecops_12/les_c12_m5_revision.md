## Revision

### Summary

Applications depend on direct, transitive, tooling and base-image components. SBOMs inventory them. The NTIA minimum elements (July 2021) define the fields, and CycloneDX and SPDX are the main formats. In the lab, a manifest-based SBOM listed only the 3 direct pins, while the environment held 6 packages, so generate SBOMs from resolved environments or artefacts. pip-audit found 32 rows (17 unique advisories) across requests, urllib3 and the transitive idna, and exited 1, making it usable as a gate. CVE-2023-32681 (requests below 2.31.0, CVSS 6.1) illustrates reading advisories. Prioritise by exploitation (KEV/EPSS), reachability, exposure and fix availability, and upgrade through automated pull requests under SLAs. Control sources with lock files, hash checking (mismatches were refused), one approved index and vetted adoption. Licence review found MPL and LGPL in transitive packages. Log4Shell showed the cost of missing inventories.

### Important concepts

complete inventories; deduplicated, prioritised findings; controlled sources.

### Key technical takeaways

cyclonedx-py; pip-audit -f json; --require-hashes; pip-licenses.

### Glossary

| Term | Meaning |
|---|---|
| CycloneDX | OWASP SBOM standard. |
| Dependency confusion | Installing a same-named package from the wrong index. |
| KEV | CISA Known Exploited Vulnerabilities catalogue. |
| Lock file | File pinning exact resolved versions. |
| purl | Package URL identifier. |
| SBOM | Software bill of materials. |
| SCA | Software composition analysis. |
| SPDX | Linux Foundation SBOM standard (ISO/IEC 5962). |

### Common mistakes

manifest-only SBOMs; counting duplicate rows; ignoring transitive licences.

### Revision questions

​1. List the NTIA minimum fields. 2. Why did the lab SBOM miss packages? 3. What does --require-hashes protect against?

### Further reading

NTIA minimum elements [R2]; CISA Log4j guidance [R1].

## References

- [R1] CISA. "Apache Log4j Vulnerability Guidance". URL: [https://www.cisa.gov/news-events/news/apache-log4j-vulnerability-guidance](https://www.cisa.gov/news-events/news/apache-log4j-vulnerability-guidance) Accessed: 2026-11-07. Supports: CVE-2021-44228, affected and fixed versions, ED 22-02, inventory recommendations.
- [R2] NTIA. "The Minimum Elements For a Software Bill of Materials (SBOM)", 12 July 2021. URL: [https://www.ntia.gov/report/2021/minimum-elements-software-bill-materials-sbom](https://www.ntia.gov/report/2021/minimum-elements-software-bill-materials-sbom) Accessed: 2026-11-07. Supports: minimum data fields.
- [R3] Python Software Foundation (psf/requests). Security advisory GHSA-j8r2-6x86-q33q (CVE-2023-32681), 22 May 2023. URL: [https://github.com/psf/requests/security/advisories/GHSA-j8r2-6x86-q33q](https://github.com/psf/requests/security/advisories/GHSA-j8r2-6x86-q33q) Accessed: 2026-11-07. Supports: description, versions, CVSS 6.1.
- [R4] Lab evidence. deps/requirements.txt, deps_output.txt, deps_unique_output.txt, licences_hashes_output.txt (pip-audit 2.10.1, cyclonedx-bom, pip-licenses, pip 25.0.1 in python:3.12-slim), 2026-11-07.
