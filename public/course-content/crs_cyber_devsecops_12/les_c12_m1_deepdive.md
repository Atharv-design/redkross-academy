A pipeline's gates can be expressed as a versioned policy file that the pipeline reads. Example (illustrative YAML, consumed by a small script or CI conditions; Not execution-tested as a whole, though each tool's exit behaviour is tested in Modules 4-7):

```text
---------------------------------------------------------------- BEGIN CODE
# security-gates.yml - Tamarind shipment service
version: 3
gates:
  unit_security_tests:  {stage: pull_request, block: true,
                         command: "python -m unittest test_shipments"}
  sast:                 {stage: pull_request, block: true,
                         command: "semgrep scan --config rules.yml --error"}
  secrets:              {stage: pull_request, block: true,
                         command: "gitleaks detect --source ."}
  dependencies:         {stage: build, block_if: "fix_available and cvss>=7.0",
                         command: "pip-audit -r requirements.txt"}
  artefact_signature:   {stage: deploy, block: true,
                         command: "cosign verify-blob --key cosign.pub ..."}
waivers:
  - id: W-2026-014
    gate: dependencies
    finding: "urllib3 advisory, internal-only service"
    owner: platform-lead
    compensating: "egress restricted to partner API"
    expires: 2026-12-31
------------------------------------------------------------------ END CODE
```

**Design notes:**

- The policy lives in the repository, so changes are reviewed like code.
- Each gate names its stage, so fast checks run on every pull request and slower or production-facing checks run later.
- Thresholds are explicit ("fix_available and cvss>=7.0"), so developers know what will block them.
- Waivers are data with an owner and an expiry. A scheduled job can fail the build when a waiver expires.
