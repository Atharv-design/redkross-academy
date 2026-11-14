A combined stage for the Tamarind service (each command was execution-tested individually in this module; the combined script is illustrative):

```text
---------------------------------------------------------------- BEGIN CODE
# 1. resolve and install exactly what will ship, with hashes
pip install --require-hashes -r requirements.lock
# 2. SBOM of the resolved environment (not just the manifest)
cyclonedx-py environment -o sbom.cdx.json
# 3. vulnerability gate (non-zero exit fails the stage)
pip-audit -r requirements.lock -f json -o audit.json
# 4. licence inventory for policy check
pip-licenses --format=json --output-file licences.json
# 5. publish sbom.cdx.json, audit.json and licences.json as build artefacts
------------------------------------------------------------------ END CODE
```

**Notes:**

- "cyclonedx-py environment" generates the SBOM from the installed environment, fixing the coverage gap seen in L02. The lab ran the "requirements" mode, so environment mode is documented but was not run in this build.
- Keep audit.json and the SBOM with the release (Module 7 signs them), so you can later answer "were we affected by CVE-X in release 1.4?" without rebuilding.
- Re-scan released SBOMs daily against new advisories. A release that was clean at build time can become vulnerable next week.
