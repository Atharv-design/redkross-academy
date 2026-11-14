## Revision

### Summary

Pipelines are high-value targets and must be modelled. Use least-privilege CI tokens with read-only defaults, OIDC federation instead of stored keys, and separate scoped roles per stage and environment. Protect definitions with branch protection and CODEOWNERS. Treat fork contributions as untrusted, pass untrusted input via environment variables, and use ephemeral runners. Pin third-party actions by commit SHA and verify downloaded tools. Sign artefacts with cosign: in the lab the original verified and a one-byte-modified copy failed; cosign v3 needed new flags. Provenance (an in-toto Statement with a SLSA predicate) records how artefacts were built. The lab's self-generated example is L1-style, while SLSA Build L2/L3 need platform-signed provenance and hardened builds. Deploy gates verify signature, digest, builder and source. Codecov's altered uploader was caught by a checksum comparison.

### Important concepts

least privilege for automation; verify before running and deploying; provenance levels.

### Key technical takeaways

permissions and id-token; SHA pins; cosign sign-blob/verify-blob; provenance subject check.

### Glossary

| Term | Meaning |
|---|---|
| Artefact | Build output (package, image, binary). |
| CODEOWNERS | File assigning required reviewers to paths. |
| Ephemeral runner | Fresh build machine per job. |
| in-toto Statement | Standard envelope for software attestations. |
| Provenance | Signed record of how an artefact was built. |
| SLSA | Supply-chain Levels for Software Artifacts. |
| Transparency log | Public append-only log of signatures (Sigstore Rekor). |

### Common mistakes

tag-pinned actions; secrets in fork workflows; deploying without verification.

### Revision questions

​1. List five pipeline hardening controls. 2. Explain SLSA L1-L3. 3. What does a deploy gate verify?

### Further reading

GitHub Actions hardening [R1]; SLSA [R3]; Sigstore [R2].

## References

- [R1] GitHub Docs. "Security hardening for GitHub Actions". URL: [https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions) Accessed: 2026-11-07. Supports: SHA pinning, GITHUB_TOKEN least privilege, OIDC, pull_request_target and script-injection guidance.
- [R2] Sigstore. "Cosign documentation". URL: [https://docs.sigstore.dev/cosign/signing/overview/](https://docs.sigstore.dev/cosign/signing/overview/) Accessed: 2026-11-07. Supports: key-based and keyless signing, bundles, transparency log.
- [R3] SLSA. "Build track basics", SLSA specification v1.2. URL: [https://slsa.dev/spec/v1.2/build-track-basics](https://slsa.dev/spec/v1.2/build-track-basics) Accessed: 2026-11-07. Supports: Build L0-L3 definitions; Source track in 1.2.
- [R4] NIST. SP 800-218 SSDF v1.1, February 2022. URL: [https://csrc.nist.gov/pubs/sp/800/218/final](https://csrc.nist.gov/pubs/sp/800/218/final) Accessed: 2026-11-07. Supports: PS practice group.
- [R5] Codecov. "Bash Uploader Security Update". URL: [https://about.codecov.io/security-update/](https://about.codecov.io/security-update/) Accessed: 2026-11-07. Supports: dates, change made, root cause, checksum detection, recommendations.
- [R6] Lab evidence. signing_lab.sh, signing_lab_output.txt, provenance_lab.sh, check_provenance.py, provenance_lab_output.txt (cosign v3.1.4, CPython 3.14.4), 2026-11-07.
