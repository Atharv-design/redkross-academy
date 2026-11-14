When a memory tool cannot be deployed, a minimal live-response collection preserves some volatile state. LAB_ASSETS/C09/rk_c09_live_lab.sh (execution-tested) shows the principles:

- It reads directly from /proc, the kernel's own view, rather than trusting ps or netstat binaries that an attacker could replace. Ideally it is run with statically linked tools from trusted media (RFC 3227 advises against relying on the system's own programs).
- For each process it records PID, parent PID (field 4 of /proc/<pid>/stat), comm, exe link and cmdline. NUL separators are converted with tr '\0' ' '.
- It decodes /proc/net/tcp state 0A (LISTEN), and the same approach applies to state 01 (ESTABLISHED).
- It maps socket inodes to PIDs through /proc/<pid>/fd links.
- It checks for deleted-but-running executables. While the process lives, the binary can be copied for analysis with cp /proc/<pid>/exe recovered.bin. This was not done in the lab; it is a standard technique to try under authorisation.

**Record the footprint:** the script itself creates a shell process and reads files, but does not write to the suspect's disk if its output goes to external storage.

**Limitations:** a kernel rootkit can lie to /proc; live response cannot see exited processes; and output must be hashed and timestamped like any other evidence.
