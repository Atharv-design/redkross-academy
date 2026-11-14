## Revision

### Summary

Windows event logs (Security, System, PowerShell and Sysmon) record logons, processes, services, tasks, account changes and log clearing. They are circular and size-limited (20 MB in the tested machine) and need privileges to read live. Logon types follow Microsoft's table (2 interactive, 3 network, 10 RDP), and the logon ID correlates a session's events. The registry hives (SAM, SECURITY, SOFTWARE, SYSTEM, NTUSER.DAT, UsrClass.dat and Amcache) hold user, execution and device artefacts, but values can mislead: ProductName said Windows 10 on Windows 11 build 26200. Execution artefacts differ in strength, from Prefetch, BAM and UserAssist (ROT13, decoded in the lab) to ShimCache, which shows presence only on Windows 10 and later. LNK files, Jump Lists, ShellBags, USB keys and browser history reconstruct file and device activity. Findings layer sessions, execution, files, devices and persistence, always stating what the artefacts do not show. The BTK case shows metadata as a corroborated lead.

### Important concepts

corroborate artefacts; account is not the person; check retention.

### Key technical takeaways

Get-WinEvent -FilterHashtable; logon ID correlation; ROT13 decoding.

### Glossary

| Term | Meaning |
|---|---|
| Amcache | Application inventory hive. |
| BAM | Background Activity Moderator (execution times). |
| Jump List | Per-application recent items. |
| LNK | Shortcut file with target metadata. |
| Prefetch | Execution trace files on client Windows. |
| ShellBags | Registry records of folders viewed. |
| SRUM | System Resource Usage Monitor database. |
| UserAssist | ROT13-encoded record of GUI launches. |

### Common mistakes

treating ShimCache as execution proof; ignoring time zones; reporting "no events" without checking retention.

### Revision questions

​1. List eight logon types. 2. Which artefacts show USB use? 3. Why did ProductName mislead?

### Further reading

Microsoft event 4624 documentation [R1].

## References

- [R1] Microsoft Learn. "4624(S) An account was successfully logged on". URL: [https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4624](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4624) Accessed: 2026-11-07. Supports: logon types table; fields; version 2 additions; Kerberos/NTLM field population note.
- [R2] NBC News. "Computer disk may have cracked BTK case", 2005. URL: [https://www.nbcnews.com/id/wbna6988048](https://www.nbcnews.com/id/wbna6988048) Accessed: 2026-11-07 (web-search cross-check). Supports: disk sent to TV station; electronic trace to the church.
- [R3] Microsoft Learn. "4688(S) A new process has been created". URL: [https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4688](https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/auditing/event-4688) Accessed: 2026-11-07. Supports: process creation event and command-line auditing.
- [R4] Lab evidence. PowerShell 5.1 read-only queries on the build machine (Windows 11 build 26200) and userassist_rot13.py (CPython 3.14.4), 2026-11-07.
