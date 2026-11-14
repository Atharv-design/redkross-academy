Before running a query, list the data the hunt needs, and check that it exists across the scope and the window. For the persistence hunt:

| Term | Meaning |
|---|---|
| required | Windows Security 4698 (task created) from all hosts in scope, or process creation for schtasks.exe with command lines; |
| window | 30 days of retention; |
| fields | TaskName, TaskCommand, SubjectUserName, host. |

On Tamarind, only 4 of 16 hosts send Security events, so twelve hosts are invisible to the primary data source. Process telemetry from Sysmon covers all 16 hosts and gives a fallback for tasks created with schtasks.exe. It would miss tasks created through other interfaces (for example COM or PowerShell cmdlets that do not start schtasks.exe), and the hunt report must say so. Data requirements turn "we found nothing" into "we found nothing on these hosts, in this window, with these sources".
