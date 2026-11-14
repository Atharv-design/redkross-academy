## Revision

### Summary

A container is a process with namespaces, cgroups, an image-based root filesystem and reduced privileges, all on one shared kernel. Images are content-addressed: digests are immutable, tags are movable pointers, and image configuration (including ENV) is readable by anyone who can pull. The runtime stack runs from dockerd or kubelet through containerd to runc, which creates containers from OCI bundles. Docker keeps 14 capabilities by default, applies a seccomp filter, and does not remap user IDs, so container root is kernel root. Hardening (--cap-drop ALL, non-root user, no-new-privileges, read-only root, pids and memory limits) was measured in the lab. Privileged mode, host namespaces, runtime sockets, writable host paths and added capabilities break isolation. NIST SP 800-190 provides the five risk areas for threat modelling; CVE-2024-21626 showed the boundary is software to be patched.

### Important concepts

shared kernel; digest versus tag; capabilities; no_new_privs; isolation-breaking options.

### Key technical takeaways

measure CapEff and uid_map; drop ALL; never mount docker.sock into workloads; set pids and memory limits.

### Glossary

| Term | Meaning |
|---|---|
| cgroup | Control group: kernel resource limiting and accounting. |
| Capability | A unit of root privilege (for example CAP_NET_RAW). |
| Digest | SHA-256 identifier of image content. |
| OCI | Open Container Initiative (image, runtime, distribution specifications). |
| runc | The reference OCI runtime. |
| seccomp | Kernel system-call filtering. |

### Common mistakes

trusting tags; "it is in a container, so root is fine"; privileged mode as a troubleshooting shortcut; no resource limits.

### Revision questions

​1. Name the eight namespaces. 2. Explain why --privileged defeats most other controls. 3. Give two reasons to deploy by digest.

### Further reading

[R1]; [R3].

## References

- [R1] Souppaya, M., Morello, J., Scarfone, K. NIST SP 800-190 "Application Container Security Guide", September 2017. URL: [https://csrc.nist.gov/pubs/sp/800/190/final](https://csrc.nist.gov/pubs/sp/800/190/final) Accessed: 2026-11-07. Supports: five risk areas used in L06.
- [R2] Docker. "Running containers" (runtime privilege and Linux capabilities), Docker Docs. URL: [https://docs.docker.com/engine/containers/run/](https://docs.docker.com/engine/containers/run/) Accessed: 2026-11-07. Supports: 14 default capabilities, --privileged behaviour.
- [R3] Open Container Initiative. Runtime and image specifications. URL: [https://opencontainers.org/](https://opencontainers.org/) Accessed: 2026-11-07. Supports: OCI specification roles (L02, L03).
- [R4] runc maintainers. GHSA-xr7r-f8xq-vfvv "runc container breakout through process.cwd trickery and leaked fds" (CVE-2024-21626), 31 January 2024. URL: [https://github.com/opencontainers/runc/security/advisories/GHSA-xr7r-f8xq-vfvv](https://github.com/opencontainers/runc/security/advisories/GHSA-xr7r-f8xq-vfvv) Accessed: 2026-11-07. Supports: CS1 versions, CVSS, root cause, fixes.
- [R5] Linux man-pages. namespaces(7) and capabilities(7). URL: [https://man7.org/linux/man-pages/man7/namespaces.7.html](https://man7.org/linux/man-pages/man7/namespaces.7.html) Accessed: 2026-11-07. Supports: namespace types and capability model.
- [R6] Lab evidence. m01_runtime.py, m01_runtime_output.txt, m01_host_ns_check.txt, m01_p2_output.txt (Docker Engine 29.4.2, CPython 3.14.4), 2026-11-07.
