Event logs are stored as .evtx files in C:\Windows\System32\winevt\Logs. High-value events (availability depends on audit policy):

```text
Security   4624/4625 logon success/failure; 4634/4647 logoff; 4648
           explicit credentials; 4672 special privileges at logon; 4688
           process creation (command line only if that policy is enabled);
           4698 scheduled task created; 4720 account created; 4732 member
           added to a local group; 1102 audit log cleared.
System     7045 service installed; 6005/6006 event log service
           started/stopped (a proxy for boot/shutdown); 104 log cleared.
PowerShell Microsoft-Windows-PowerShell/Operational 4104 script block
           logging, when enabled.
Sysmon     if deployed (Course 08 Module 2): 1 process creation with
           hashes, 3 network connection, 11 file create, and others.
```

Logs are size-limited and usually circular, so old events are overwritten. Execution-tested on the course build machine (PowerShell 5.1, read-only, 2026-11-07):

```text
------------------------------------------------------------- BEGIN OUTPUT
LogName     RecordCount MaximumSizeInBytes  LogMode
System            34283           20971520 Circular
Application       20870           20971520 Circular
Security log read: Attempted to perform an unauthorized operation.
UTC                    Id ProviderName
2026-11-04T19:46:43Z 6005 EventLog
2026-11-01T05:13:29Z 6006 EventLog
--------------------------------------------------------------- END OUTPUT
(execution-tested; Get-WinEvent -ListLog and -FilterHashtable; selected
lines)
```

**Observations:**

- The System and Application logs were capped at 20 MB in circular mode, so on a busy machine, history may cover only days or weeks. Check retention before saying "no event exists". Remember the CERT-In 180-day log requirement (Course 08 Module 7) and forward logs centrally.
- Reading the Security log needed administrator rights. Its absence from the listing reflects permissions, not a missing log. In a forensic image, the .evtx files are read offline, without this restriction.
- The 6005/6006 pairs bracket boot sessions. Times are stored in UTC and were converted explicitly with ToUniversalTime().
