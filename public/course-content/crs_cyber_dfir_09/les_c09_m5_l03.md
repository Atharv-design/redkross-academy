Hives on disk (offline analysis needs these files from an image):

```text
C:\Windows\System32\config\SAM       local accounts
C:\Windows\System32\config\SECURITY  security policy, LSA secrets
C:\Windows\System32\config\SOFTWARE  installed software, OS info, Run keys
C:\Windows\System32\config\SYSTEM    services, devices, time zone
                                     (TimeZoneInformation), USB
                                     history
C:\Users\<user>\NTUSER.DAT           per-user settings, UserAssist,
                                     RecentDocs, Run keys
C:\Users\<user>\AppData\Local\Microsoft\Windows\UsrClass.dat
                                     ShellBags (Windows 7 and later)
C:\Windows\appcompat\Programs\Amcache.hve  application inventory
```

Transaction logs (.LOG1/.LOG2) may hold changes not yet written to the hive. Process them with tools that support them. Each key has a last-write timestamp, which is a useful timeline point, but it says when the key last changed, not which value changed. A registry value is a claim the system makes, not ground truth. Execution-tested on the build machine (read-only query):

```text
------------------------------------------------------------- BEGIN OUTPUT
ProductName    : Windows 10 Home Single Language
DisplayVersion : 25H2
CurrentBuild   : 26200
--------------------------------------------------------------- END OUTPUT
(execution-tested; HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion)
```

The machine runs Windows 11: build 26200 is a Windows 11 build, and the system reports itself as Windows 11 elsewhere. Yet the legacy ProductName value still says "Windows 10". An examiner who reported "Windows 10" from this value alone would be wrong. Corroborate it with the build number and other sources.
