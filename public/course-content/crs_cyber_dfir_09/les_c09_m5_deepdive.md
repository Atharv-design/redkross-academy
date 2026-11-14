Commands used in this module's lab (execution-tested, PowerShell 5.1, read-only):

```text
Get-WinEvent -ListLog System,Application,Security |
  Select LogName,RecordCount,MaximumSizeInBytes,LogMode
Get-WinEvent -FilterHashtable @{LogName='System'; Id=6005,6006}
  -MaxEvents 4 | Select @{n='UTC';e={$_.TimeCreated.ToUniversalTime()}},
  Id, ProviderName
Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion' |
  Select ProductName, DisplayVersion, CurrentBuild
```

**Design notes:**

- FilterHashtable filters in the event log service, which is far faster than piping everything into Where-Object.
- TimeCreated is local time in PowerShell output. Convert to UTC explicitly.
- On live systems these queries are a triage step. For forensic analysis, copy the .evtx files and hives (with VSS or a forensic tool, because hives are locked while in use) and parse them offline. Get-WinEvent -Path file.evtx reads exported logs.
- Querying a live system leaves traces, such as PowerShell logs and access to log files. Record the commands and times.

Offline tools commonly used by examiners include Eric Zimmerman's tools (EvtxECmd, RECmd, PECmd, AmcacheParser, LECmd) and RegRipper. They were not execution-tested here; validate versions before casework.
