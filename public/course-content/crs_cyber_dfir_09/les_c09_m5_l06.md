Build the story in layers, with a source for every line:

1. Sessions. 4624 and 4634 events, with logon types and source IPs.
2. Execution. Prefetch, BAM and UserAssist, plus 4688 or Sysmon 1 if available.
3. Files and folders. LNK, Jump Lists, ShellBags, RecentDocs, and file-system timeline entries (MACB).
4. Devices and network. USB artefacts, SRUM network usage and browser history.
5. Persistence and system changes. Services (7045), tasks (4698), Run keys, and accounts (4720/4732).

Use the time-zone value in the SYSTEM hive to interpret local-time artefacts. Note conflicts and explain them; for example, a LNK target time that differs from file-system times may indicate a copy. Example finding (fictional Tamarind case): "Between 2026-11-06 16:02 and 16:20 UTC, during an interactive session of account priya (logon type 2), a USB device with serial 0401... was first connected (setupapi.dev.log). The folder E:\Designs was browsed (ShellBags), and LNK files for three .dwg files with volume serial 5C3A-11F0 were created. That serial matches the USB volume." This is consistent with copying, but does not alone prove who was at the keyboard.
