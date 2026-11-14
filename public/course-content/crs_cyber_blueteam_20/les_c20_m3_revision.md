## Revision

### Summary

Network telemetry comes in three layers: DNS (cheap, reveals intent), flow (who-whom-bytes, no payload) and packets (content and detail, costly). DNS analytics combine volume, record type, NXDOMAIN ratio, label structure and distinct-name counts. In Tamarind's data, 10.20.1.17 made 82 random TXT queries under cdn-sync.example. Flow regularity (CV of gaps) marked the same host's 297-second check-ins (CV 0.083), but regularity is only a lead. Suricata rules are action + header + options, with sticky buffers, flow direction, unique sids and honest msgs. They are tested with -T and replay (4 alerts on the lab capture), and EVE JSON protocol records support investigation. SUNBURST shows DNS as early evidence and the value of retention. Capture lawfully and proportionately.

### Important concepts

metadata first; leads versus verdicts; tune by understanding benign behaviour.

### Key technical takeaways

CV for regularity; sticky buffers; --entrypoint sh for the Suricata image; sort multi-threaded output.

### Glossary

| Term | Meaning |
|---|---|
| CV | Coefficient of variation. |
| EVE JSON | Suricata's JSON event output. |
| IPFIX | IP Flow Information Export, a flow record standard. |
| NXDOMAIN | DNS response code: name does not exist. |
| sid | Suricata/Snort rule identifier. |

### Common mistakes

payload rules on encrypted traffic; "top N" without context; raising thresholds instead of allowlisting.

### Revision questions

​1. Name four DNS features. 2. Define CV. 3. List four Suricata good practices.

### Further reading

Suricata rules documentation [R2].

## References

- [R1] CISA. AA24-326A "Enhancing Cyber Resilience: Insights from CISA Red Team Assessment of a US Critical Infrastructure Sector Organization", 21 November 2024. URL: [https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-326a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-326a) Accessed: 2026-11-07. Supports: EDR over-reliance; IDS/IPS not properly implemented.
- [R2] OISF. Suricata documentation, "Rules Format" (latest). URL: [https://docs.suricata.io/en/latest/rules/intro.html](https://docs.suricata.io/en/latest/rules/intro.html) Accessed: 2026-11-07. Supports: action, header, options; actions list.
- [R3] Mandiant (FireEye). "Highly Evasive Attacker Leverages SolarWinds Supply Chain to Compromise Multiple Global Victims With SUNBURST Backdoor", 13 December 2020 (updated May 2022). URL: [https://cloud.google.com/blog/topics/threat-intelligence/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor](https://cloud.google.com/blog/topics/threat-intelligence/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor) Accessed: 2026-11-07. Supports: DNS subdomain generation, CNAME, dormancy, attribution update.
- [R4] Lab evidence. netdetect.py, netdetect_output.txt (CPython 3.14.4); ids/local.rules, ids_output.txt (Suricata 8.0.8), 2026-11-07.
- [R5] IETF. RFC 1035 "Domain Names - Implementation and Specification", November 1987. URL: [https://www.rfc-editor.org/rfc/rfc1035](https://www.rfc-editor.org/rfc/rfc1035) Accessed: 2026-11-07. Supports: 63-octet label limit.
