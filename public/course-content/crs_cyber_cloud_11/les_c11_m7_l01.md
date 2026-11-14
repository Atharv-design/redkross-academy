- Minimal bases (slim, distroless) reduce packages and vulnerabilities.
- Pin base images by digest; rebuild regularly to pick up fixes.
- Run as a non-root USER; drop capabilities; read-only root filesystem where possible (Course 21).
- No secrets in Dockerfiles, build arguments, ENV or copied files - image layers keep them even if deleted later.
- Scan images in CI and in the registry (Amazon ECR scanning, Microsoft Defender for Containers) and gate deployment on fixable critical findings.
- Sign images and deploy by digest (Course 21 Module 7).

Execution-tested trivy 0.76.2 configuration scan of the lab Dockerfile:

```text
------------------------------------------------------------- BEGIN OUTPUT
Dockerfile (dockerfile)
Tests: 27 (SUCCESSES: 24, FAILURES: 3)
Failures: 3 (UNKNOWN: 0, LOW: 1, MEDIUM: 0, HIGH: 1, CRITICAL: 1)
DS-0002 (HIGH): Specify at least 1 USER command in Dockerfile with
                non-root user as argument
DS-0026 (LOW): Add HEALTHCHECK instruction in your Dockerfile
DS-0031 (CRITICAL): Possible exposure of secret env "DB_PASSWORD" in ENV
 Dockerfile:4
   4 [ ENV DB_PASSWORD=ChangeMe123!
--------------------------------------------------------------- END OUTPUT
(descriptions shortened)
```

And of the base image python:3.12-slim (Debian 13.6) on 2026-11-07: HIGH 104, CRITICAL 3, of which 58 had fixes available. Base-image findings change daily; the lesson is to measure and gate on fixable findings, not to quote a fixed number.
