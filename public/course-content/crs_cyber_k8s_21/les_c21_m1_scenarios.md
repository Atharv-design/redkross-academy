Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A developer's compose file runs a log shipper with privileged: true "so it can read container logs".

**Task:** Propose a safer design and the evidence you would ask for.

> [!TIP] Model answer
> Container logs are files on the host; the shipper needs read access to those paths, not privileged mode. Mount only the log directories read-only, run as a dedicated non-root user with the group that can read them, drop all capabilities, keep seccomp, and set limits. Alternatively use the runtime's logging driver or the platform's node-level agent with a documented, reviewed configuration. Ask for: the exact paths read, a test showing it works with the reduced profile, and the vendor's documented minimum privileges.
>
> **Lesson:** replace "privileged" with the specific access the job needs.

## Scenario 2

A vulnerability bulletin announces a runc flaw. Your organisation runs Docker hosts, two Kubernetes distributions and a CI service.

**Task:** Describe how you determine exposure and prioritise remediation.

> [!TIP] Model answer
> Inventory runc (and other OCI runtime) versions on every Docker host, Kubernetes node (per distribution and node image) and CI runner; managed services publish their own bulletins. Determine whether the vulnerable paths apply (for example malicious images or exec use), who can supply images or run exec, and whether untrusted code runs (CI for forks is highest risk). Patch the highest-exposure environments first, apply documented workarounds where patches lag, restrict image sources, and verify with version evidence afterwards.
>
> **Lesson:** runtimes are inventory items with owners and patch SLAs.

## Scenario 3

A team argues that containers "are isolated, so the app can run as root".

**Task:** Respond with evidence you could produce in ten minutes.

> [!TIP] Model answer
> Run m01_runtime.py on the service image: show UID 0, 14 capabilities, NoNewPrivs 0, a writable root filesystem and uid_map "0 0 4294967295" (root to the kernel). Then show the same service working with --user, --cap-drop ALL, no-new-privileges and --read-only (as in P2). Explain that isolation is the sum of these settings plus a shared kernel, and that a runtime or kernel flaw is far more dangerous from root with capabilities.
>
> **Lesson:** measure privileges and show the hardened alternative working.
