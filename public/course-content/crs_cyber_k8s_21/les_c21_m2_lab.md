> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C21_Lab_Kit.zip](/downloads/labs/RedKross_C21_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C21/...` refer to the extracted `C21` folder. Everything runs locally against systems you own.

## Practical 1: Build, lint, scan and compare

**Objective:** Build the three kestrel-api images, lint the Dockerfiles, scan the images and explain the differences.

**Difficulty:** Advanced.

**Required tools:** Docker; Python 3.10+; aquasec/trivy image; LAB_ASSETS/C21/images.

**Prerequisites:** Lessons L01-L03.

**Environment setup:** "docker pull aquasec/trivy:latest"; the first scan downloads the vulnerability database into a named volume.

**Explicit authorised scope:** images you build locally; Trivy reads saved image archives on your machine.

**Step-by-step instructions:**

1. In images/: docker build -f Dockerfile.bad -t kestrel-api:bad . (and the same for good and good13).
2. python dockerfile_lint.py Dockerfile.bad Dockerfile.good Dockerfile.good13
3. docker save kestrel-api:bad -o bad.tar (and good, good13).
4. docker volume create rk-trivy-cache, then for each archive: docker run --rm -v rk-trivy-cache:/root/.cache -v "$PWD:/work" aquasec/trivy:latest image --quiet --input /work/bad.tar --scanners vuln,secret --format json -o /work/trivy_bad.json
5. python trivy_summary.py trivy_bad.json trivy_good.json trivy_good13.json
6. Run the image-configuration scan on bad.tar with --image-config-scanners misconfig,secret and compare with the linter.
7. Recover the two secrets from the weak image using only docker history and docker run ... cat, and propose the fix for each.

**Expected observations:** the pattern in section 3 - most Python findings vanish with the hardened Dockerfile; the base refresh removes the CRITICAL findings; Trivy flags the ENV secret in the image configuration but finds no secret in the files.

**Troubleshooting:** on Windows use "$(pwd -W)" instead of "$PWD" in the volume path; if the database download fails, check proxy settings and retry; counts differ from the text because the database changes daily.

**Cleanup:** rm `*.tar;` optionally docker image rm kestrel-api:bad.

**Learning outcome:** you can produce and interpret image security evidence.

## Practical 2: Operate a release gate with exceptions

**Objective:** Apply image_gate.py to the three reports, write a justified exception, and show it expiring.

**Difficulty:** Advanced.

**Required tools:** Python; the reports from P1; image_gate.py.

**Prerequisites:** P1; Lesson L04.

**Environment setup:** none.

**Explicit authorised scope:** local files only.

**Step-by-step instructions:**

1. Run the gate on each report and record blocking counts.
2. For trivy_good13.json list the blocking findings and decide, for each, whether to fix, change base, or waive.
3. Write gate_exceptions.txt entries for any waiver (ID, expiry within 30 days, owner, reason) and re-run with --today set to today.
4. Re-run with --today after the expiry and confirm the gate blocks.
5. Use sbom_query.py on the CycloneDX SBOMs (generate them with Trivy --format cyclonedx) to answer: which images contain zlib1g, urllib3 and bash, and at what versions?
6. Write a five-line release note for the gate decision.

**Expected observations (execution-tested):** BLOCK, BLOCK, BLOCK with 68, 45 and 2 blocking findings; PASS with two waivers on 2026-11-07; BLOCK on 2026-11-30 with "exception ... expired on 2026-11-21 - ignored"; SBOM stats 94 versus 39 components; urllib3 and bash only in the weak image; zlib1g in both.

**Troubleshooting:** an exception has no effect if its ID does not match the report exactly; the gate counts each (vulnerability, package) pair once.

**Cleanup:** none.

**Learning outcome:** you can make and document an evidence-based release decision.
