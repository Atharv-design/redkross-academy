## Revision

### Summary

Linux evidence includes auth.log or secure, the systemd journal, wtmp, btmp and lastlog, application logs and auditd. Syslog lacks year and zone, so record timedatectl output. User artefacts include shell history (weak), SSH keys and staging directories; persistence hides in cron, systemd units, start-up files, authorized_keys, accounts, sudoers and ld.so.preload, and dpkg -V or rpm -Va detects replaced files. Packet captures give the fullest network evidence: in the tested lab, tshark showed the GET, user agents and responses, export-objects carved customers.csv with a hash matching the server copy, and "missing.zip" proved to be a 404 page. Flows show volume and timing only; TLS hides content but not metadata. A UTC super-timeline merged synthetic host logs with real capture times into a staging-and-download story, with care for precision and time zones. The xz backdoor was discovered from half a second of SSH latency.

### Important concepts

hash carved files; verify object types; normalise time.

### Key technical takeaways

tshark -T fields and --export-objects; journalctl --utc; timeline merging in Python.

### Glossary

| Term | Meaning |
|---|---|
| auditd | Linux audit daemon. |
| btmp/wtmp | Failed and successful login records. |
| Export objects | Reconstructing files from captured protocols. |
| Flow record | Summary of a network conversation. |
| SNI | Server Name Indication in the TLS handshake. |
| Super-timeline | Merged timeline across sources. |

### Common mistakes

trusting user agents; reporting exported objects unchecked; mixing time zones.

### Revision questions

​1. List six Linux persistence locations. 2. How do you prove a carved file matches? 3. What does TLS leave visible?

### Further reading

Freund's oss-security post [R1]; Wireshark documentation [R3].

## References

- [R1] Freund, A. "backdoor in upstream xz/liblzma leading to ssh server compromise", oss-security mailing list, 29 March 2024. URL: [https://www.openwall.com/lists/oss-security/2024/03/29/4](https://www.openwall.com/lists/oss-security/2024/03/29/4) Accessed: 2026-11-07. Supports: symptoms (CPU, valgrind, ~0.3 s to ~0.8 s login), affected tarballs 5.6.0 and 5.6.1.
- [R2] CISA. "Reported Supply Chain Compromise Affecting XZ Utils Data Compression Library, CVE-2024-3094", 29 March 2024. URL: [https://www.cisa.gov/news-events/alerts/2024/03/29/reported-supply-chain-compromise-affecting-xz-utils-data-compression-library-cve-2024-3094](https://www.cisa.gov/news-events/alerts/2024/03/29/reported-supply-chain-compromise-affecting-xz-utils-data-compression-library-cve-2024-3094) Accessed: 2026-11-07. Supports: CVE, versions, downgrade advice.
- [R3] Wireshark Foundation. "tshark - Dump and analyze network traffic" (manual page). URL: [https://www.wireshark.org/docs/man-pages/tshark.html](https://www.wireshark.org/docs/man-pages/tshark.html) Accessed: 2026-11-07. Supports: -T fields, --export-objects, -z options.
- [R4] Lab evidence. rk_c09_net_lab.sh, rk_c09_net_lab_output.txt, rk_c09_lab.pcap (tshark 4.2.5, tcpdump in alpine:3.20), timeline.py and timeline_output.txt (CPython 3.14.4), 2026-11-07.
