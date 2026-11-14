**Sources:** Windows Security/System logs (Course 03 Module 7), PowerShell logs (4103/4104), Sysmon (process creation event 1 with command line and parent, network connection 3, file creation 11, registry 12-14 and others [R1]), Linux auth logs/journal and auditd, EDR agent events, and anti-malware detections.

**What it reveals:** which process ran, by whom, from which parent, with which command line; file and registry changes; logons and privilege use. Example from the dataset (Sysmon-style event 1): WINWORD.EXE as parent of powershell.exe on WS-104 - the key early clue in the storyline.
