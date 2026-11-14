Linux namespaces and what each isolates:

| Term | Meaning |
|---|---|
| mnt | the mount table - the container's own root filesystem view |
| pid | process IDs - the container's first process is PID 1 inside |
| net | interfaces, routes, ports, firewall rules |
| uts | hostname and domain name |
| ipc | System V IPC and POSIX message queues |
| user | user and group ID mappings (root inside can map to an unprivileged ID outside) |
| cgroup | the view of the cgroup hierarchy |
| time | boot and monotonic clocks (Linux 5.6 and later) |

The lab (m01_host_ns_check.txt) compared the namespace identifiers of a default container with those of the host's PID 1 inside the Docker Desktop virtual machine. The container had its own mnt, pid, net, uts, ipc and cgroup namespaces, but its user namespace (user:[4026531837]) and time namespace were the host's. Its uid_map read "0 0 4294967295": user ID 0 in the container is user ID 0 to the kernel. Docker does not enable user namespace remapping by default, so "root in the container" is real root, restrained only by capabilities, seccomp and the other namespaces. Rootless modes and user namespaces (including Kubernetes pods with hostUsers: false, where the cluster supports it) change that mapping and are worth evaluating for multi-tenant hosts.

Control groups (v2 on the lab host: "cgroup v2" in docker info) limit resources. Two limits matter for security:

- memory: without a limit, one container can starve the host;
- pids: without a limit, a fork loop in one container exhausts the host's process table. The hardened profile in the lab set --pids-limit 64 and --memory 128m.

Resource exhaustion is an availability attack on every neighbour, so limits are a security control, not just capacity planning.
