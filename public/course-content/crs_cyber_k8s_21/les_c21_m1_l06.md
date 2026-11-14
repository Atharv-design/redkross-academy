NIST SP 800-190, the Application Container Security Guide (September 2017) [R1], groups risks into five areas. Use them as the skeleton for any container threat model:

1. Image risks: vulnerabilities in packages, configuration defects (running as root), embedded secrets, malware, untrusted sources.
2. Registry risks: insecure connections, stale images, weak authentication and authorisation for push and pull.
3. Orchestrator risks: unbounded administrative access, unauthorised access, poorly separated network traffic, mixing workloads of different sensitivity, orchestrator node trust.
4. Container risks: runtime vulnerabilities, unbounded network access, insecure runtime configuration, application vulnerabilities, rogue containers.
5. Host OS risks: large attack surface, shared kernel, improper user access rights, host filesystem tampering.

Map each risk to a control and to the module that teaches it: image scanning, SBOM and gates (M02); orchestrator access (M03-M04); runtime configuration and network policy (M05); configuration as code (M06); registry and provenance controls (M07).

Isolation-breaking options to look for in every review, because each one converts "code execution in a container" into "control of the host":

- --privileged / securityContext.privileged: true;
- host namespaces: --pid=host, --network=host, --ipc=host (hostPID, hostNetwork, hostIPC in Kubernetes);
- mounting the runtime socket (docker.sock, containerd.sock);
- writable host paths, especially "/" or /etc (hostPath volumes);
- added capabilities such as SYS_ADMIN, SYS_PTRACE or NET_ADMIN;
- disabling seccomp or AppArmor/SELinux (unconfined profiles).

Attackers who reach a workload test for exactly these conditions; a defender who removes them closes the shortest paths.
