| Term | Meaning |
|---|---|
| Theme 1 | Secure SDLC (M01): NIST SSDF v1.1 (PO, PS, PW, RV); OWASP ASVS 5.0.0 requirements; gates that block new findings, waivers with expiry; the CrowdStrike Channel File 291 lesson on validation and staged rollout. |
| Theme 2 | Threat modelling (M02): four questions; DFDs and trust boundaries, including build-time; STRIDE; abuse cases ending in tests; register scoring and the impact-5 rule; PyTorch nightly dependency. |
| Theme 3 | Secure coding (M03): allowlist validation (fullmatch), parameterised SQL, argument-list subprocess, html.escape, scrypt + compare_digest, object-level authorisation; 8 tests pass; MOVEit SQL injection. |
| Theme 4 | Code analysis (M04): taint concepts; Semgrep rules; 3 findings; exit 0 vs --error exit 1; nosemgrep with rule ID; goto fail. |
| Theme 5 | Dependencies (M05): NTIA minimum elements; manifest SBOM missed transitives; 32 rows = 17 unique advisories; require-hashes; licences MPL/LGPL; Log4Shell. |
| Theme 6 | Secrets and configuration (M06): secrets managers, workload identity; gitleaks clean tree vs history finding; revoke first; startup config checks; Uber 2016. |
| Theme 7 | Pipelines (M07): least-privilege tokens, OIDC, SHA pins; cosign verify vs tamper; SLSA v1.2 Build L0-L3; Codecov. |
| Theme 8 | Capstone (M08): gated release APPROVED/BLOCKED; SBOM tool contamination (42 -> 7); reproducibility and mtimes; release report; xz tarballs. |

**Key verified facts:** SP 800-218 February 2022; ASVS 5.0.0 30 May 2025; NTIA minimum elements 12 July 2021; AA23-158A 7 June 2023 (CVE-2023-34362); CVE-2023-32681 fixed in requests 2.31.0 (CVSS 6.1); Log4j affected 2.0-beta9 to 2.14.1; FTC Uber settlement 12 April 2018; Codecov change from 31 January to 1 April 2021; PyTorch-nightly 25-30 December 2022; SLSA specification v1.2 current.
