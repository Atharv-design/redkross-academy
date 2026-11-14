## Revision

### Summary

Acquisition may be physical, logical, targeted, live or dead. Encryption and availability shape the choice. Raw images are universal; E01 and AFF4 add metadata and checksums. Write blockers pass reads and block writes, and attaching or even read-only mounting a journalled file system can change it. CFTT tests write blockers and imagers against published specifications. SHA-256 is the default integrity hash, while MD5 and SHA-1 are for legacy compatibility only. In the tested lab, the source, stream and image hashes matched, and a single changed byte produced a completely different digest. noerror,sync with large blocks can zero large areas on failing media. Custody covers seals, transfers, verification on arrival, a sealed master and verified working copies. VMs, cloud volumes, SaaS exports and containers need provider-specific acquisition, with the audit logs forming part of custody.

### Important concepts

verify every copy; never analyse the master; document method and footprint.

### Key technical takeaways

dd | tee | sha256sum; cmp; block size and error handling.

### Glossary

| Term | Meaning |
|---|---|
| AFF4 | Advanced Forensic Format 4. |
| CFTT | NIST Computer Forensics Tool Testing. |
| E01 | Expert Witness Format image. |
| Golden master | Sealed verified copy never used for analysis. |
| Live acquisition | Collection from a running system. |
| Write blocker | Device or software preventing writes to evidence. |

### Common mistakes

wrong device; mounting evidence; MD5-only integrity.

### Revision questions

​1. Compare raw and E01. 2. Explain the one-pass pipeline. 3. Why verify on arrival after a transfer?

### Further reading

NIST CFTT [R1]; RFC 3227 [R2].

## References

- [R1] NIST. "Computer Forensics Tool Testing Program (CFTT)". URL: [https://www.nist.gov/itl/ssd/software-quality-group/computer-forensics-tool-testing-program-cftt](https://www.nist.gov/itl/ssd/software-quality-group/computer-forensics-tool-testing-program-cftt) Accessed: 2026-11-07. Supports: CFTT purpose, categories, DHS S&T partnership.
- [R2] Brezinski, D., Killalea, T. RFC 3227, February 2002. URL: [https://www.rfc-editor.org/rfc/rfc3227](https://www.rfc-editor.org/rfc/rfc3227) Accessed: 2026-11-07. Supports: collection guidance.
- [R3] Lab evidence. rk_c09_acquire_lab.sh and rk_c09_acquire_lab_output.txt (debian:stable-slim, GNU coreutils), run 2026-11-07.
- [R4] NIST. "NIST Retires SHA-1 Cryptographic Algorithm", 15 December 2022 (updated 8 April 2026). URL: [https://www.nist.gov/news-events/news/2022/12/nist-retires-sha-1-cryptographic-algorithm](https://www.nist.gov/news-events/news/2022/12/nist-retires-sha-1-cryptographic-algorithm) Accessed: 2026-11-07. Supports: SHA-1 phase-out by 31 Dec 2030; migrate to SHA-2/SHA-3; collision attacks.
