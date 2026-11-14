LAB_ASSETS/C21/images holds the fictional kestrel-api service (app/app.py, standard library only) and three Dockerfiles: Dockerfile.bad (python:3.12-slim, root, COPY of the whole app folder including .env, requests==2.25.0 and urllib3==1.26.4, ENV DB_PASSWORD); Dockerfile.good (distroless Python, Debian 12, pinned digest, USER 65532, only app.py); and Dockerfile.good13 (the same on the current Debian 13 distroless digest). The images were saved with "docker save" and scanned with Trivy 0.76.2 in a container; trivy_summary.py counts unique findings. Output (execution-tested, 2026-11-07; Python package lines abridged):

```output
== trivy_bad.json
   OS: debian 13.6
   Unique vulnerabilities: 376  (OS packages 353, language packages 23)
     CRITICAL    3   with a fixed version available: 3
     HIGH      112   with a fixed version available: 65
     MEDIUM    161   with a fixed version available: 87
     LOW        97   with a fixed version available: 35
     UNKNOWN     3   with a fixed version available: 3
   Python package findings (fix = upgrade the pin):
     urllib3   1.26.4   CVE-2021-33503  HIGH     fixed in 1.26.5
     urllib3   1.26.4   CVE-2023-43804  HIGH     fixed in 2.0.6, 1.26.17
     requests  2.25.0   CVE-2023-32681  MEDIUM   fixed in 2.31.0
     ... (23 in total, in urllib3, requests, idna and pip)
   Secrets detected: 0

== trivy_good.json      (distroless, Debian 12 digest)
   Unique vulnerabilities: 325  (OS packages 325, language packages 0)
     CRITICAL    2   with a fixed version available: 0
     HIGH       67   with a fixed version available: 45

== trivy_good13.json    (distroless, Debian 13 digest)
   OS: debian 13.7
   Unique vulnerabilities: 203  (OS packages 203, language packages 0)
     HIGH       35   with a fixed version available: 2
     MEDIUM    114   with a fixed version available: 1
     LOW        54   with a fixed version available: 0
   Secrets detected: 0
```

The linter and the gate (dockerfile_lint_output.txt; image_gate_output.txt, gate results condensed to one line per run):

```output
Dockerfile.bad: 4 finding(s)
  line  2  MEDIUM RK-D01  base image not pinned by digest: python:3.12-slim
  line  4  MEDIUM RK-D05  copies a whole directory and no .dockerignore exists
  line  6  HIGH   RK-D02  secret-like name in ENV is stored in image metadata
  line  8  HIGH   RK-D06  final USER is root (or not set)
Dockerfile.good: 0 finding(s)
Dockerfile.good13: 0 finding(s)

image_gate.py trivy_bad.json                 blocking 68  -> BLOCK
image_gate.py trivy_good.json                blocking 45  -> BLOCK
image_gate.py trivy_good13.json              blocking 2   -> BLOCK
... + gate_exceptions.txt --today 2026-11-07 waived 2     -> PASS
... + gate_exceptions.txt --today 2026-11-30 (expired)    -> BLOCK
```

**Interpretation:**

- The weak image's 23 Python findings disappear entirely in the hardened images because the service never needed requests or urllib3. Removing a dependency beats patching it.
- Hardening the Dockerfile alone (good) reduced findings by only 51; the stale base kept 2 CRITICAL. Refreshing the base (good13) removed them.
- The two remaining fixable HIGH findings are in zlib1g; a distroless image has no package manager, so the fix arrives with the next base image. The exceptions file waives exactly those IDs, with an owner and a 14-day expiry; on 2026-11-30 the gate blocks again.
- Trivy found no secrets in the weak image, yet the image contains a password in ENV and a key in /srv/.env. The linter and Trivy's Dockerfile check caught the ENV; nothing automated caught .env.

**Limitations:** CVE identifiers and counts come from the scanner database on 2026-11-07 and will differ when you run the lab; compare the pattern, not the exact numbers. Sizes reported by "docker images" depend on the image store in use.
