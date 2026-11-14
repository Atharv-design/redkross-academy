| Term | Meaning |
|---|---|
| Endpoints | disks (file systems, deleted data, unallocated space), memory, OS artefacts (event logs, registry, shell history), application data (browsers, email clients, chat). |
| Servers | web and application logs, databases, authentication logs. |
| Network | packet captures, flow records (NetFlow/IPFIX), proxy, DNS, firewall and VPN logs (Course 08 Module 2). |
| Cloud/SaaS | audit logs (identity provider, M365/Google Workspace, AWS CloudTrail, Azure activity logs), storage access logs, snapshots (Course 11). |
| Mobile | device extractions, cloud backups, MDM logs (Course 16). |
| Security | EDR telemetry, SIEM data, email gateway logs, backup catalogues. |
| People | interviews, tickets, change records, CCTV and badge logs (handled by appropriate teams). |

Volatility guides priority. RFC 3227 (February 2002) gives an order of volatility from most to least volatile [R2]: registers and cache; routing table, ARP cache, process table, kernel statistics and memory; temporary file systems; disk; remote logging and monitoring data; physical configuration and network topology; archival media. Remote logs are often the most reliable source in IR because the attacker may not reach them. This is why log forwarding to a SIEM (Course 08) matters for forensics.
