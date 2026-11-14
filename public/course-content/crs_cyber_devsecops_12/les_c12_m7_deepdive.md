Illustrative GitHub Actions workflow for the shipment service. This is Not execution-tested (no CI platform in the build environment). Commit SHAs are shown as <full-commit-sha> and must be replaced with real pinned values.

```text
---------------------------------------------------------------- BEGIN CODE
name: release
on:
  push:
    tags: ["v*"]
permissions:
  contents: read                      # default for every job
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write                 # OIDC for keyless signing/cloud role
    steps:
      - uses: actions/checkout@<full-commit-sha>
      - uses: actions/setup-python@<full-commit-sha>
        with: {python-version: "3.12"}
      - run: pip install --require-hashes -r requirements.lock
      - run: python -m unittest discover -v
      - run: pip-audit -r requirements.lock
      - run: tar -czf shipments-${GITHUB_REF_NAME}.tgz app/
      - run: cosign sign-blob --yes --bundle shipments.bundle shipments-*.tgz
      - uses: actions/upload-artifact@<full-commit-sha>
        with: {name: release, path: "shipments-*"}
  deploy:
    needs: build
    environment: production           # requires approval; scoped cloud role
    permissions:
      contents: read
      id-token: write
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@<full-commit-sha>
        with: {name: release}
      - run: cosign verify-blob --bundle shipments.bundle
               --certificate-identity-regexp "^https://github.com/example-tamarind-logistics/shipments/"
               --certificate-oidc-issuer https://token.actions.githubusercontent.com
               shipments-*.tgz
      - run: ./deploy.sh shipments-*.tgz    # runs only if verify succeeded
------------------------------------------------------------------ END CODE
```

**Controls in this design:**

- Read-only token by default. Only the jobs that need OIDC get id-token: write.
- Actions are pinned by SHA, and dependencies are installed with hashes (Module 5).
- Tests and audit gates run before packaging.
- Keyless signing ties the signature to the workflow identity. The deploy job verifies identity and issuer before deploying.
- The production environment requires approval and maps to a scoped cloud role via OIDC. No stored cloud keys.
- ${GITHUB_REF_NAME} is used in a run step only because tag names are restricted to the `"v*"` pattern pushed by maintainers. Untrusted inputs should be passed through env variables (Lesson L03).
