## About this module

A container is not a small virtual machine. It is an ordinary Linux process that the kernel has been asked to show a restricted view of the system: its own process list, network stack, hostname and filesystem, with limits on memory and processes and a reduced set of privileges. The image supplies the filesystem; the runtime asks the kernel for the restrictions. Security therefore depends on exactly which restrictions were requested and on the one kernel that every container on the host shares. This module builds that mental model, shows you how to measure a container's real privileges from the inside, and turns the measurements into a threat model for the rest of the course.

## Why it matters

Most container security failures come from options that remove isolation (privileged mode, host namespaces, mounting the Docker socket) or from bugs in the small amount of code that sets isolation up. In January 2024 the runc maintainers disclosed CVE-2024-21626, a runtime flaw that could give a container process a working directory on the host filesystem [R4]. You cannot reason about either kind of risk without knowing what a container actually is.

## Where it is used

Platform engineering (base runtime configuration), CI/CD build agents, security review of Dockerfiles and compose files, incident response on container hosts, and the security baselines that Kubernetes later enforces (Module 5).

## Learning objectives

1. Explain a container as a process with namespaces, cgroups, a root filesystem from an image, and reduced privileges on a shared kernel.
2. Distinguish images, layers, manifests, tags and digests, and explain why a digest is the only immutable image reference.
3. Describe the runtime stack from CLI to kernel (dockerd or kubelet, containerd, runc) and the role of the OCI specifications.
4. Measure a container's capabilities, seccomp mode, no_new_privs flag, user and root-filesystem mode, and reduce them.
5. Identify options that break isolation and explain why.
6. Build a container threat model using the NIST SP 800-190 risk areas.

## Before you start

**Prerequisites:** Course 03 Modules 1-3 (processes, users, permissions); basic Docker use (run, build, images, ps).

**Estimated study time:** About 8 hours.
