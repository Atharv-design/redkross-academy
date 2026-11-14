LAB_ASSETS/C20/hunt.py (execution-tested, CPython 3.14.4) runs two hunts and prints the data-requirement check before the analysis.

```output
== H1: scheduled-task persistence
Data requirement: Windows Security 4698 from every host in scope.
  hosts sending security log: BK-01, DC-01, FS-01, WS-07
  hosts NOT sending (hunt cannot see them): 12 of 16 -> WS-01, WS-02, ...
  4698 events found: 2
  10:47:00 WS-07  by user07    \Microsoft\OneDriveSync    SUSPECT \users\public\,powershell.exe
  11:00:00 BK-01  by it.admin  \Tamarind\NightlyBackup    baseline (change CHG-4471)
  Fallback for blind hosts: process telemetry for schtasks.exe /Create:
   10:47:00 WS-07  schtasks.exe /Create /SC ONLOGON /TN "\Microsoft\OneDriveSync" ...

== H2: rare parent->child pairs across the fleet
Data requirement: Sysmon EventID 1 with ParentImage on all hosts.
  distinct pairs: 10
  pair (seen on exactly one host)          host
  explorer.exe -> powershell.exe           ADM-01
  powershell.exe -> net.exe                WS-07
  powershell.exe -> schtasks.exe           WS-07
  powershell.exe -> tar.exe                WS-07
  powershell.exe -> whoami.exe             WS-07
  winword.exe -> powershell.exe            WS-07
```

**Interpretation:**

- H1 finds one suspicious task and one baseline task explained by a change record. The fallback finds no schtasks.exe use on the twelve blind hosts, which covers only one creation method.
- H2 reduces 61 process events to six rare pairs. Five are on WS-07 and match the Module 2 tree. The sixth (ADM-01) is explained by the IT administrator's inventory scripts and becomes a baseline entry, not a finding.
- Validation: both analyses find the known WS-07 activity, which shows they can see the behaviour. On a real estate you would seed a test event instead, because you would not know the answer in advance.

**Limitations:** one day of data makes "rare" unstable; real stacking uses weeks of data and per-role populations.
