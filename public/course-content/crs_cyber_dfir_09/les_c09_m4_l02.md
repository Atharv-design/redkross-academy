| Term | Meaning |
|---|---|
| Software tools | a kernel driver or module reads physical memory into a file. Examples include WinPmem and DumpIt for Windows, and LiME and AVML for Linux (none execution-tested here). The tool itself occupies memory and changes state, so record its name, version, hash and output location. |
| Hypervisor | for VMs, suspend or snapshot. The hypervisor's memory file (for example a .vmem) captures RAM with little guest footprint. |
| Cloud | some providers and EDR tools support memory capture. Otherwise, use in-guest tools via remote management under change control. |
| Crash/hibernation | forcing a crash dump or hibernation, as a fallback. It changes the system and may not capture everything. |

**Smear:** acquisition of a running system takes time, and memory changes while it is read. Structures can be inconsistent, for example a process list pointing to freed memory. Analysts must tolerate some inconsistency. Write the image to external media or a network share, never to the suspect's own disk, where it would overwrite unallocated space. Hash it immediately. Acquire memory before disk and before containment steps that reboot, a rule emphasised by RFC 3227's order of volatility (Module 1). Some protected systems, such as appliances, encrypted firmware and vendor-managed devices, restrict access. CISA's Ivanti advisory noted that artefact collection on such devices may be limited [R1].
