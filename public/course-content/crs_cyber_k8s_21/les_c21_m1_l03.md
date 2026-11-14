**On a Docker host:**

```text
docker CLI -> dockerd (Docker Engine API) -> containerd -> runc -> kernel
```

**On a Kubernetes node:**

```text
kubelet -> CRI (Container Runtime Interface) -> containerd or CRI-O
        -> runc (or another OCI runtime) -> kernel
```

The layers have distinct jobs:

- The high-level runtime (containerd, CRI-O) pulls and stores images, prepares snapshots of the root filesystem and supervises containers.
- The low-level OCI runtime (runc is the reference implementation) reads an OCI runtime bundle - a root filesystem plus a config.json that lists namespaces, cgroups, capabilities, seccomp profile, mounts and the user - and makes the system calls that create the container, then executes the container's first process.

The Open Container Initiative publishes the image, runtime and distribution specifications, so images built by one tool run under another. In the lab, the k3s node reports its runtime as "containerd://2.1.4-k3s2" (Module 3 output), and the Kestrel image built with Docker ran unchanged inside k3s after a plain "ctr images import".

**Security relevance:** runc runs with full privileges to set up the container, so a bug there is a boundary bug (case study CS1). The Docker daemon socket (/var/run/docker.sock) is an API that can start privileged containers; access to it is equivalent to root on the host. On Kubernetes nodes the kubelet and the CRI socket deserve the same protection.
