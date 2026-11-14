## About this module

RAM holds the live state of a system: running processes and their command lines, loaded code, network connections, open files, decrypted data, and sometimes credentials and keys. Much of this never reaches the disk, and modern attackers deliberately work "filelessly" in memory. Memory forensics captures this state and analyses it with tools that rebuild the operating system's data structures. This module covers acquisition concepts, the artefacts examiners look for, and memory timelines. The lab reads the same kinds of structures from a live Linux system through /proc, which is what memory-analysis frameworks reconstruct from a raw image.

## Why it matters

Disk images miss in-memory implants, injected code and live connections. In the 2024 Ivanti Connect Secure exploitation (case study), CISA reported that the appliance's integrity checker failed to detect compromise. The authoring agencies noted that memory and disk forensics were used in the analysis.

## Where it is used

IR on servers and endpoints suspected of compromise, malware analysis (Course 10), ransomware investigations (where keys may sit in memory), and appliance investigations.

## Learning objectives

1. Explain RAM acquisition methods, their footprints and the risk of smear.
2. Describe the OS structures behind process, module, handle and network artefacts.
3. Identify suspicious process and connection indicators.
4. Describe how Volatility 3 analyses Windows and Linux images.
5. Build and interpret a memory timeline.
6. Collect live-response artefacts safely when no memory tool is available.

## Before you start

**Prerequisites:** C09-M01 to C09-M03; Course 03 (processes and services); Course 02 (sockets, ports).

**Estimated study time:** About 9 hours.
