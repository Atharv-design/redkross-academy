A complete scan programme covers four surfaces, each with the tool from its module:

| Term | Meaning |
|---|---|
| images | Trivy vulnerabilities, secrets and image configuration; SBOMs; the release gate (Module 2) |
| manifests | rk_policy and IaC scanning in CI (Module 6) |
| live state | rk_policy on live objects, drift detection, the evidence collector (Modules 6 and 8) |
| access | rbac_review with the accepted register (Module 4) |

Connect them through the digest: the evidence for a running pod is the scan and SBOM of the digest it runs, the provenance that built it and the signature that admitted it (Module 7). Include platform add-ons in scope: ingress controllers, CNI, storage provisioners and operators are software with their own vulnerabilities and RBAC (CS1).
