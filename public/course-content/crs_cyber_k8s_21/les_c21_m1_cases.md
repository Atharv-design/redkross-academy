## runc "Leaky Vessels", CVE-2024-21626, 2024 Context: on 31 January 2024 the runc maintainers published advisory GHSA-xr7r-f8xq-vfvv for CVE-2024-21626, affecting runc 1.0.0-rc93 to 1.1.11 and fixed in 1.1.12, rated CVSS 3.1 8.6 (High) [C21-M01-R4]. What happened: several file descriptors, including a handle to the host's /sys/fs/cgroup, were inadvertently leaked into "runc init", and runc did not check that the working directory it set for the container process was still inside the container. The advisory describes variants in which a malicious image (through its working directory) or a process inside a container (through the working directory passed to "runc exec") could end up with access to the host filesystem, and further variants that could overwrite host binaries. Response: the fix checks that the working directory is inside the container, closes internal descriptors before executing the container process and marks non-standard descriptors close-on-exec. Workarounds were limited: allow only "/" as the working directory, and run only trusted images. Lessons: the boundary is software and must be patched like any other software - runc version belongs in your host inventory and vulnerability management. "Only run trusted images" was a genuine mitigation, linking runtime security to the image provenance controls in Modules 2 and 7. Defence in depth (non-root, no capabilities, seccomp, restricted host access) limits what any boundary flaw yields.



## (FICTIONAL TEACHING SCENARIO): The build agent that owned its host

**Context:** "Kestrel Pay" (fictional) ran CI jobs in containers on three shared build hosts. To let jobs build images, an engineer mounted /var/run/docker.sock into the job container. A pull request from a contributor's fork ran the project's test script unchanged except for one added line that started a new container through the mounted socket, with --privileged and the host's root filesystem mounted.

**What happened:** the job could do anything the Docker daemon could do. It read the deploy keys cached on the host for other projects. Detection came from the registry, which recorded an unexpected push from a build host.

**Response:** build hosts were rebuilt; all keys reachable from the hosts were rotated; forked pull requests lost access to privileged runners; image builds moved to a rootless builder that does not need the daemon socket.

**Lessons:** docker.sock is root. CI jobs from untrusted sources need isolated, disposable runners without privileged access. Inventory every mount of a runtime socket.
