## Revision

### Summary

Endpoint telemetry (Security logs, Sysmon, PowerShell, EDR, auditd) shows processes, parents, command lines and changes; network telemetry (firewall, proxy, DNS, flow, IDS, packets) shows communications and metadata even when encrypted; identity and cloud telemetry (IdP, MFA, VPN, cloud audit) is vital because attackers use valid accounts. Key fields and identifiers enable correlation; field meanings vary by source. Timestamps must be UTC with offsets (IST is +05:30; naive and aware times cannot be compared); clocks need NTP. Pipelines collect, transport securely, normalise, store and retain (180 days for CERT-In covered entities) with health monitoring - Equifax's expired certificate showed the cost of blind spots. The dataset timeline for divya/WS-104 begins to reveal the intrusion.

### Important concepts

visibility; UTC; source health; field semantics.

### Key technical takeaways

SQL GROUP BY for outliers; per-entity timelines; datetime.astimezone(timezone.utc).

### Glossary

| Term | Meaning |
|---|---|
| ECS/OCSF | Normalised event schemas. |
| Flow record | Summary of a network conversation. |
| Telemetry | Data systems emit about activity. |
| UTC | Coordinated Universal Time. |
| WEF | Windows Event Forwarding. |

### Common mistakes

dropping identity logs; local times; ignoring silent sources.

### Revision questions

​1. Which source shows parent processes? 2. Design a pipeline health check. 3. Convert 14:05 IST to UTC.

### Further reading

Sysmon documentation [R1]; GAO-18-559 [R2].

## References

- [R1] Microsoft Learn. "Sysmon" (Sysinternals). URL: [https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon) Accessed: 2026-11-07. Supports: Sysmon event types.
- [R2] US GAO. "Data Protection: Actions Taken by Equifax and Federal Agencies in Response to the 2017 Breach", GAO-18-559, August 2018. URL: [https://www.gao.gov/assets/gao-18-559.pdf](https://www.gao.gov/assets/gao-18-559.pdf) Accessed: 2026-11-07 (full text inspected for Course 01). Supports: expired certificate, ~10 months, detection after restart.
- [R3] CERT-In. "Directions under section 70B(6)", 28 April 2022. URL: [https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf](https://www.cert-in.org.in/PDF/CERT-In_Directions_70B_28.04.2022.pdf) Accessed: 2026-11-07. Supports: 180-day logs, NTP synchronisation.
- [R4] Lab evidence. minisiem.py queries and Python datetime tests, CPython 3.14.4, 2026-11-07.
