## Revision

### Summary

RAM holds processes, code, connections, handles, caches and secrets, so memory images are sensitive. Acquisition uses software tools, hypervisor snapshots or fallbacks, written externally, hashed and documented for footprint and smear, and done before disk acquisition and disruptive containment. Process indicators include path and parent anomalies, kernel thread masquerading, deleted-but-running binaries, injected memory and hidden processes. The tested live lab showed a "kworker" with parent PID 1, an executable in /tmp and a deleted binary. It also decoded 0100007F:20FB to 127.0.0.1:8443 and linked that socket to PID 7 via inode 321697. Volatility 3 rebuilds these structures from images using symbol tables; compare pslist with psscan. Memory timelines join disk and log timelines. AA24-060B showed integrity tools being deceived, with memory and disk forensics used in the analysis.

### Important concepts

capture before reboot; corroborate indicators; record footprint.

### Key technical takeaways

/proc parsing; little-endian IP decoding; pslist vs psscan.

### Glossary

```text
EPROCESS      Windows kernel process structure.
LSASS         Windows process holding credential material.
Live response Collection of volatile data from a running system.
Malfind       Plugin finding suspicious memory regions.
Smear         Inconsistency from memory changing during capture.
Symbol table  Description of OS structures for analysis.
```

### Common mistakes

rebooting first; writing images to the suspect disk; trusting on-host binaries.

### Revision questions

​1. List five process indicators. 2. Decode 0100007F:1F90. 3. Why compare pslist and psscan?

### Further reading

Volatility 3 [R2]; CISA AA24-060B [R1].

## References

- [R1] CISA, FBI, MS-ISAC et al. "Threat Actors Exploit Multiple Vulnerabilities in Ivanti Connect Secure and Policy Secure Gateways", AA24-060B, 29 February 2024. URL: [https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-060b](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-060b) Accessed: 2026-11-07. Supports: CVEs; ICT failure; cleanup techniques; persistence through resets; memory and disk forensics used; collection recommendations.
- [R2] Volatility Foundation. "Volatility 3" (GitHub). URL: [https://github.com/volatilityfoundation/volatility3](https://github.com/volatilityfoundation/volatility3) Accessed: 2026-11-07. Checked via README, plugin source tree and releases API. Supports: symbol tables; plugin names; v2.28.2 release date; VSL v1.0 licence.
- [R3] Brezinski, D., Killalea, T. RFC 3227, February 2002. URL: [https://www.rfc-editor.org/rfc/rfc3227](https://www.rfc-editor.org/rfc/rfc3227) Accessed: 2026-11-07. Supports: volatility order; not trusting system programs.
- [R4] Lab evidence. rk_c09_live_lab.sh and rk_c09_live_lab_output.txt (python:3.12-slim container), run 2026-11-07.
