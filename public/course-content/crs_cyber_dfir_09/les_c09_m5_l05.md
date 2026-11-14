```text
LNK (shortcut) files  created automatically when files are opened (Recent
             folder). They hold target path, size, MAC times of the
             target, volume serial number and sometimes the machine name.
             They survive deletion of the target.
Jump Lists   per-application lists of recent files
             (AutomaticDestinations).
ShellBags    folders the user browsed in Explorer, including on removable
             and network drives, even after those are disconnected.
RecentDocs, OpenSaveMRU  recent files per extension and file dialogs.
USB devices  SYSTEM\CurrentControlSet\Enum\USBSTOR (vendor, product,
             serial); SYSTEM\MountedDevices (drive letters); the
             setupapi.dev.log first-install time; and per-user
             MountPoints2. Microsoft-Windows-Partition/Diagnostic and
             related event logs record connections on recent versions.
Browser history  SQLite databases (Chromium History, Firefox
             places.sqlite). Validate parsing with a second tool, as the
             Casey Anthony case showed (Module 3).
Volume Shadow Copies  earlier versions of files and the registry, which
             may hold deleted artefacts.
```

**Anti-forensics to recognise:** cleared logs (1102/104), timestomping (Module 3), use of wiping tools (Prefetch for the tool itself), disabled Prefetch, and deleted shadow copies (vssadmin delete shadows, a frequent ransomware precursor).
