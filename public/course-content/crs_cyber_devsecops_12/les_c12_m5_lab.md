> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C12_Lab_Kit.zip](/downloads/labs/RedKross_C12_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C12/...` refer to the extracted `C12` folder. Everything runs locally against systems you own.

## Practical 1: Audit, upgrade and verify

-----------------------------------------------

**Objective:** Remove known vulnerabilities from the lab requirements.

**Difficulty:** Advanced.

**Required tools:** Docker; LAB_ASSETS/C12/deps.

**Prerequisites:** Lessons L03-L04.

**Environment setup:** from LAB_ASSETS/C12:

```text
MSYS_NO_PATHCONV=1 docker run --rm -it -v "$(pwd):/lab" -w /lab/deps \
  python:3.12-slim bash
then: pip install -q pip-audit cyclonedx-bom pip-licenses
```

**Explicit authorised scope:** the lab requirements file.

**Step-by-step instructions:**

1. Run pip-audit -r requirements.txt and record the counts. Then use -f json and count unique IDs per package.
2. Choose upgraded versions that clear all advisories, and edit the file.
3. Re-run pip-audit until it reports no known vulnerabilities and exits 0.
4. Install the requirements in a fresh virtual environment, and generate an SBOM with "cyclonedx-py environment". Compare the component count with the requirements mode.
5. Run pip-licenses and list any non-permissive licences.

**Expected observations:** zero advisories after the upgrades (on the day you run it); the environment SBOM includes the transitive packages.

**Troubleshooting:** if a fix version conflicts with another pin, upgrade the parent or use pip install --dry-run to inspect resolution.

**Cleanup:** exit the container.

**Learning outcome:** you can manage vulnerable dependencies end to end.

## Practical 2: Enforce hashes and a single index

-------------------------------------------------------

**Objective:** Make installs reproducible and tamper-evident.

**Difficulty:** Advanced.

**Required tools:** as P1; pip-tools (pip install pip-tools).

**Prerequisites:** Lesson L05.

**Environment setup:** as P1.

**Explicit authorised scope:** your lab files.

**Step-by-step instructions:**

1. Create requirements.in with the upgraded direct dependencies.
2. Run pip-compile --generate-hashes -o requirements.lock requirements.in.
3. Install with pip install --require-hashes -r requirements.lock.
4. Edit one hash and confirm the install fails with the "DO NOT MATCH" error.
5. Add an index-url setting for a single approved index in pip.conf, and document why extra-index-url is avoided.

**Expected observations:** hash mismatch errors as in Lesson L05.

**Troubleshooting:** hashes are per file, so platform-specific wheels have several hashes, which pip-compile lists.

**Cleanup:** none.

**Learning outcome:** you can lock down dependency sources.
