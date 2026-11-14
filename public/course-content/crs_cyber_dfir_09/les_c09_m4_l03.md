For each process, examiners extract the PID, parent PID, name, executable path, command line, start time, user, loaded modules and memory regions. Suspicious indicators (which are clues, not proof):

- Name and path mismatch. A system name in an unusual path, such as svchost.exe outside System32.
- Unusual parent. Office spawning a shell (Course 08), or a service started by a user process.
- Masquerading as kernel threads. On Linux, kernel threads ([kworker], [kthreadd]) have parent PID 2 and no executable file. A user process named "kworker" with an executable is impersonating one.
- Deleted executable still running. Attackers delete their binary after starting it.
- Executable, writable memory regions without a backing file, which can indicate injected code (detected by malfind-style analysis).
- Process hiding. A process present in a scan for process structures but missing from the linked list suggests unlinking by a rootkit.

Execution-tested live response (LAB_ASSETS/C09/rk_c09_live_lab.sh in a python:3.12-slim container). The lab started a listener and copied /bin/sleep to /tmp/kworker:

```text
------------------------------------------------------------- BEGIN OUTPUT
1 0 sh exe=/usr/bin/dash cmd=sh /host/rk_c09_live_lab.sh
7 1 python3 exe=/usr/local/bin/python3.12 cmd=python3 -m http.server 8443
--bind 127.0.0.1
8 1 kworker exe=/tmp/kworker cmd=/tmp/kworker 600
...
== deleted-but-running check
lrwxrwxrwx 1 root root 0 Nov  7 05:52 /proc/8/exe -> /tmp/kworker (deleted)
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; one line wrapped)
```

PID 8 claims to be "kworker", but it has parent PID 1 (not 2), an executable in /tmp, and after the script removed the file, its exe link reads "(deleted)". Three independent indicators point the same way. In a container there are no kernel threads to compare with, which is a limitation of the demonstration.
