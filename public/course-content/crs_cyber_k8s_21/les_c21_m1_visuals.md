## A container is a restricted process on a shared kernel

![Two boxes labelled container A and container B each list root filesystem, namespaces, cgroups and privilege restrictions; both sit on a single bar labelled one shared Linux kernel.](/assets/courses/cyber-21/C21-M01-F1.svg)
*Figure C21-M01-F1. Isolation is a set of kernel restrictions applied to a process; every container shares the host kernel.*

## From command to kernel

![Two horizontal chains show the Docker and Kubernetes paths from client to kernel through containerd and runc, with notes on each layer's job; below, an image is shown as index, manifest, config and layers, with a tag pointing to a digest.](/assets/courses/cyber-21/C21-M01-F2.svg)
*Figure C21-M01-F2. The runtime stack and the content-addressed image model.*

## Isolation-breaking options

![A vertical chain from code execution in a container to control of the node, with five branches naming privileged mode, host namespaces, the Docker socket, writable host paths and added capabilities or disabled seccomp.](/assets/courses/cyber-21/C21-M01-F3.svg)
*Figure C21-M01-F3. The short paths from a compromised container to the host - each is a configuration choice that can be refused.*
