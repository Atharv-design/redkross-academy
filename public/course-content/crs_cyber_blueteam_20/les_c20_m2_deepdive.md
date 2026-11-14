LAB_ASSETS/C20/proctree.py (execution-tested, CPython 3.14.4) indexes Sysmon-style EventID 1 records for one host by ProcessGuid, attaches children to parents, and treats processes whose parent is not in the data as roots. It flags edges with a small policy (Office -> shell, shell -> discovery, shell -> persistence, shell -> archive tool). It then prints the Security events linked to the same user, host or source address. Output (execution-tested, 2026-11-07, abridged):

```output
Process tree for WS-07 (9 process events)
08:02:20 explorer.exe  [user07] explorer.exe
10:42:10   WINWORD.EXE  [user07] "WINWORD.EXE" /n "C:\Users\user07\Downloads\Invoice_Nov.d...
10:42:31     powershell.exe  [user07] powershell.exe -NoP -W Hidden -EncodedCommand ...   <== OFFICE->SHELL
10:43:05       whoami.exe  [user07] whoami.exe /groups   <== SHELL->DISCOVERY
10:43:20       net.exe  [user07] net.exe group "Domain Admins" /domain   <== SHELL->DISCOVERY
10:47:00       schtasks.exe  [user07] schtasks.exe /Create /SC ONLOGON /TN ...   <== SHELL->PERSISTENCE
12:14:00       tar.exe  [user07] tar.exe -czf C:\Users\Public\q4.tgz \\FS-01\Finance\Q4   <== SHELL->ARCHIVE
12:07:00   WINWORD.EXE  [user07] "C:\Program Files\Microsoft Office\root\Office16\WINWORD....

Identity context (security log) for users ['user07'] or source WS-07:
  08:02:00 DC-01  4624  user07     type=2 src=10.20.1.17
  10:47:00 WS-07  4698  user07     \Microsoft\OneDriveSync
  12:10:00 DC-01  4625  svc-print  type=3 src=10.20.1.17
  ... (six 4625 failures, 12:10:00 to 12:10:25)
  12:11:00 FS-01  4624  svc-print  type=3 src=10.20.1.17
  12:40:00 WS-07  1102  user07     security log cleared
```

(Long lines are shortened here; the full output is in proctree_output.txt.)

**Interpretation:**

- One branch from a downloaded macro-enabled document (.docm) carries every flagged edge; the other Word sessions are clean.
- The task name "\Microsoft\OneDriveSync" imitates a vendor name, but it runs PowerShell from C:\Users\Public - a user-writable path.
- svc-print is a print service account, yet it authenticated over the network from a finance workstation to the file server after six failures. That is an identity finding no process event shows.

**Limitations:** the policy is deliberately small and would flag administrators on ADM-01 if they ran discovery from a shell; Module 4 shows how to filter that safely.
