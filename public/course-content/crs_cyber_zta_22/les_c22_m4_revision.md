## Revision

### Summary

Network architecture contains and enforces: macro-segmentation separates environments and the management plane; micro-segmentation restricts workload flows, ideally by identity labels; default-deny flow matrices are verified by automated tests. In the tested Docker lab, intended flows worked, web could not reach the database by name or IP, and the internal-only data network had no route to the internet. Gateways (reverse proxy, API gateway, identity-aware proxy/ZTNA, bastion, enclave gateway) provide controlled entry; ZTNA grants per-application, per-session access. Encrypt everything (TLS/mTLS, private links) with automated certificates. Control egress and DNS. Treat edge appliances as targets: minimise exposure, patch fast, log centrally and segment what they reach - the lesson of the 2024 Ivanti advisory.

### Important concepts

verified segmentation; per-app access; egress control.

### Key technical takeaways

flow matrix; --internal networks; name-and-IP probes.

### Glossary

| Term | Meaning |
|---|---|
| East-west traffic | Traffic between internal systems. |
| Egress control | Restricting outbound connections. |
| Enclave gateway | Gateway protecting a group of legacy resources. |
| Flow matrix | Documented allowed network flows. |
| Micro-segmentation | Fine-grained workload isolation. |

### Common mistakes

trusting the VPN subnet; untested rules; open egress.

### Revision questions

​1. Write a flow matrix for three tiers. 2. Why did the lab test IPs? 3. Compare VPN and ZTNA.

### Further reading

CISA AA24-060B [R1]; NIST SP 800-207 [R2].

## References

- [R1] CISA, FBI, MS-ISAC et al. "Threat Actors Exploit Multiple Vulnerabilities in Ivanti Connect Secure and Policy Secure Gateways", AA24-060B, 29 February 2024. URL: [https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-060b](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-060b) Accessed: 2026-11-07 (verified for Course 09). Supports: CVEs, ICT failure, persistence through resets, collection limits.
- [R2] NIST SP 800-207, "Zero Trust Architecture", August 2020. URL: [https://csrc.nist.gov/pubs/sp/800/207/final](https://csrc.nist.gov/pubs/sp/800/207/final) Accessed: 2026-11-07. Supports: micro-segmentation and gateway deployment models.
- [R3] British Library. "Learning lessons from the cyber-attack", 8 March 2024. URL: [https://www.bl.uk/home/british-library-cyber-incident-review-8-march-2024.pdf](https://www.bl.uk/home/british-library-cyber-incident-review-8-march-2024.pdf) Accessed: 2026-11-07. Supports: network design and lateral reach.
- [R4] Lab evidence. segmentation_lab.sh and segmentation_lab_output.txt (Docker 29.4.2, alpine:3.20), 2026-11-07.
