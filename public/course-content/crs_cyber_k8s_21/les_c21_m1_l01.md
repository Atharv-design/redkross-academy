Start a container and look at it from the host, and you will find a normal process with a normal process ID. What makes it a "container" is the set of kernel features applied to it when it started:

- namespaces, which give it a private view of certain resources (process IDs, network interfaces, mount table, hostname and others);
- control groups (cgroups), which limit and account for CPU, memory, process count and I/O;
- a root filesystem assembled from the image's layers, so the process sees the image's /bin and /etc rather than the host's;
- reduced privileges: a subset of Linux capabilities, a seccomp system call filter and, optionally, a non-root user, a read-only root filesystem and the no_new_privs flag.

A virtual machine runs its own kernel on emulated or virtualised hardware. A container shares the host kernel with every other container on the host. That single fact drives the threat model: a kernel vulnerability reachable from inside a container is a vulnerability in the boundary itself, and anything that weakens the restrictions above weakens the boundary.

Two consequences follow. First, isolation is a configuration, not a property of "being in a container"; two containers from the same image can have very different privileges (the deep dive measures exactly that). Second, defences stack: a non-root user without capabilities, under a seccomp filter, with a read-only filesystem, gives an attacker who gains code execution in the application far less to work with than a root process with the defaults.

Stronger isolation exists when the threat requires it: sandboxed runtimes that interpose a user-space kernel, and lightweight virtual machines per container or per pod. They cost performance and compatibility and are selected per workload; the controls in this course apply in either case.
