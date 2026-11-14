## Revision

### Summary

Endpoint telemetry comes from Windows Security events (4688 with command lines only if a separate policy is enabled), Sysmon (Event ID 1 with ProcessGuid, 3, 11, 12-14, 22, 255; UTC; no analysis, no hiding) and EDR agents. Process trees rebuilt from GUIDs reveal behaviour such as Office -> shell -> discovery -> persistence -> archive on WS-07. Identity telemetry (4624 logon types, 4625 failures, 4698 task creation) shows svc-print guessed and reused from WS-07 against FS-01. Joining both by host, address, user and time produces the incident narrative. Response controls range from triage collection to reimaging and must preserve evidence and contain identities. Sensor health monitoring and central collection defeat log clearing (T1685.005). Volt Typhoon (AA24-038A) shows why lineage and baselines matter against living-off-the-land activity.

### Important concepts

lineage; logon types; evidence-first containment; silence as a signal.

### Key technical takeaways

join on ProcessGuid; keep sensor configuration in version control; monitor 1102, 4719 and Sysmon 4/255.

### Glossary

| Term | Meaning |
|---|---|
| EDR | Endpoint detection and response. |
| LOTL | Living off the land: abusing built-in tools. |
| ProcessGuid | Sysmon's unique process identifier. |
| Sysmon | Sysinternals System Monitor. |

### Common mistakes

trusting a single event; broad excludes; reimaging before scoping.

### Revision questions

​1. List four logon types. 2. Explain why 4688 command lines are sensitive. 3. Order five response controls by disruption.

### Further reading

[R3]; [R5].

## References

- [R1] CISA, NSA, FBI et al. AA24-038A "PRC State-Sponsored Actors Compromise and Maintain Persistent Access to U.S. Critical Infrastructure", 7 February 2024. URL: [https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a](https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-038a) Accessed: 2026-11-07. Supports: LOTL tools, central logging, 1102.
- [R2] Microsoft. "Command line process auditing", Microsoft Learn (updated 2025). URL: [https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/component-updates/command-line-process-auditing](https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/component-updates/command-line-process-auditing) Accessed: 2026-11-07. Supports: 4688, policy names, defaults, sensitivity warning.
- [R3] Microsoft Sysinternals. "Sysmon" (published 10 September 2026). URL: [https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon) Accessed: 2026-11-07. Supports: event IDs, ProcessGuid, UTC, filtering, no analysis or hiding.
- [R4] Microsoft. "4624(S) An account was successfully logged on". URL: [https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4624](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4624) Accessed: 2026-11-07. Supports: logon types, missing-field note.
- [R5] CISA, NSA, FBI et al. "Identifying and Mitigating Living Off the Land Techniques", 7 February 2024. URL: [https://www.cisa.gov/resources-tools/resources/identifying-and-mitigating-living-land-techniques](https://www.cisa.gov/resources-tools/resources/identifying-and-mitigating-living-land-techniques) Accessed: 2026-11-07. Supports: detection capability gap.
- [R6] Lab evidence. proctree.py, proctree_output.txt (CPython 3.14.4), 2026-11-07.
