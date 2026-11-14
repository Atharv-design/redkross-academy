The base image (the FROM line) usually contributes most of an image's packages. Common families:

```text
full distribution  (python:3.12, debian)  compilers, shells, many tools
slim               (python:3.12-slim)      fewer packages, still a shell
                                           and package manager
Alpine             (alpine)                small, musl libc instead of
                                           glibc - occasional
                                           compatibility issues
distroless         (gcr.io/distroless/...) only the runtime and its
                                           libraries; no shell, no
                                           package manager
scratch            (empty)                 for static binaries only
```

Fewer packages means fewer vulnerabilities to triage, fewer tools for an intruder, and smaller images to move. The lab measured it. The weak image on python:3.12-slim contained 94 SBOM components (87 Debian packages, 6 Python packages and the OS record). The hardened image on distroless Python for Debian 13 contained 39 (38 Debian packages and the OS record), with no bash and no urllib3 (sbom_query_output.txt). "docker images" reported 194 MB and 90.6 MB.

**Trade-offs:** distroless and scratch images have no shell, so you debug them with ephemeral debug containers or from the node, not by "exec sh" (the lab showed 'exec: "sh": executable file not found'). That is a security benefit and an operational change that teams must plan for. Choose a base your organisation can rebuild quickly when fixes land; an obscure base that nobody maintains is worse than a larger, well-maintained one.
