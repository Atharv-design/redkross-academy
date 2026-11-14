## About this module

Windows records an enormous amount about its own use. Event logs capture logons, process creation, service installation and log clearing. The registry remembers programs run, files opened, folders browsed and USB devices connected. Execution artefacts such as Prefetch and Amcache show what ran and when. No single artefact is conclusive, but together they let an examiner reconstruct user and attacker activity with confidence. This module teaches the key artefacts, what each proves and does not prove, and how to combine them. A short read-only lab on the course build machine shows how artefacts can mislead when taken alone.

## Why it matters

Most corporate investigations involve Windows endpoints. Artefacts such as logon type 10 (remote desktop), service installation and USB history are often the decisive evidence in intrusion and data-theft cases.

## Where it is used

Intrusion investigations, insider data theft, policy violations, malware execution scoping, and litigation.

## Learning objectives

1. Interpret key Security, System and PowerShell event IDs and logon types.
2. Identify registry hives and their forensic locations.
3. Use execution artefacts (Prefetch, Amcache, ShimCache, BAM, UserAssist) and understand their limits.
4. Reconstruct file, folder and USB activity (LNK, Jump Lists, ShellBags, USBSTOR).
5. Correlate artefacts into a user-activity timeline.
6. Recognise artefact pitfalls and anti-forensics.

## Before you start

**Prerequisites:** C09-M01 to C09-M03; Course 03 (Windows administration); Course 08 Modules 2 and 6.

**Estimated study time:** About 10 hours.
