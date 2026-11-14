## Logon session correlation

![A tree rooted at a 4624 logon event with branches to 4672, process creation, persistence events and 4634, all linked by the same logon ID.](/assets/courses/cyber-09/C09-M05-F1.svg)
*Figure C09-M05-F1. The logon ID ties privilege, process and logoff events to one session.*

## Artefact strength for "program X ran"

![A ranked list from stronger evidence (process creation logs, Prefetch, BAM, UserAssist) to weaker (Amcache, ShimCache), advising combining sources.](/assets/courses/cyber-09/C09-M05-F2.svg)
*Figure C09-M05-F2. Relative strength of execution evidence (from documentation; behaviour varies by Windows version).*

## USB activity reconstruction

![Device identifiers from USBSTOR and MountedDevices connect through first-install logs and ShellBags to LNK files whose volume serial matches the USB device.](/assets/courses/cyber-09/C09-M05-F3.svg)
*Figure C09-M05-F3. Linking a USB device to files opened from it through serial numbers and drive letters.*
