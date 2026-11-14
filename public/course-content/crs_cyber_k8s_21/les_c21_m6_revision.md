## Revision

### Summary

IaC makes configuration reviewable and testable; its artefacts include configuration, plan JSON, sensitive state and third-party providers and modules. Typical high-risk Terraform defects are public storage, open management ports, public control-plane endpoints, missing encryption and logging, and wildcard IAM. Scanners help but have blind spots: Trivy 0.76.2 reported 20 failures on the weak lab Terraform yet nothing for Action `"*"` on Resource `"*",` which a custom check found. Policy as code needs tests, including edge cases such as registry ports, digest pins, container overrides and nested templates. Drift (CHANGED, MISSING, UNMANAGED) is detected by comparing declared fields with live objects, then reconciled, adopted or removed, with the cause fixed. Place checks at pre-commit, pull request, pre-apply, admission and runtime. The OCC's action against Capital One framed configuration control as governance.

### Important concepts

plan versus configuration; scanner blind spots; tested policy; drift classes.

### Key technical takeaways

protect state; evaluate plan JSON; test custom checks; compare declared fields only.

### Glossary

| Term | Meaning |
|---|---|
| Drift | Difference between declared and actual configuration. |
| GitOps | Operating model where a controller applies Git continuously. |
| Plan | Terraform's proposed set of changes. |
| State | Terraform's record of managed resources. |

### Common mistakes

trusting a clean scan; committing state; suppressing by severity; fixing drift without fixing its cause.

### Revision questions

​1. Name four IaC artefacts. 2. Write three test cases for a new rule. 3. Explain reconcile versus adopt.

### Further reading

[R2]; [R3].

## References

- [R1] Office of the Comptroller of the Currency. News Release 2020-101 "OCC Assesses $80 Million Civil Money Penalty Against Capital One", 6 August 2020. URL: [https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-101.html](https://www.occ.gov/news-issuances/news-releases/2020/nr-occ-2020-101.html) Accessed: 2026-11-07. Supports: CS1.
- [R2] Aqua Security. Trivy documentation, misconfiguration scanning. URL: [https://trivy.dev/latest/docs/scanner/misconfiguration/](https://trivy.dev/latest/docs/scanner/misconfiguration/) Accessed: 2026-11-07. Supports: config scanning (behaviour confirmed by lab runs of Trivy 0.76.2).
- [R3] HashiCorp. Terraform documentation: state and sensitive data. URL: [https://developer.hashicorp.com/terraform/language/state/sensitive-data](https://developer.hashicorp.com/terraform/language/state/sensitive-data) Accessed: 2026-11-07. Supports: state may contain sensitive values; remote backends (L01).
- [R4] Kubernetes. "kubectl diff" reference. URL: [https://kubernetes.io/docs/reference/kubectl/generated/kubectl_diff/](https://kubernetes.io/docs/reference/kubectl/generated/kubectl_diff/) Accessed: 2026-11-07. Supports: server-side diff for drift (L05).
- [R5] Lab evidence. iac/ (terraform/, trivy_config_summary.txt, tf_iam_wildcard.py, rk_policy.py, policy_tests/, drift.py and their outputs, including drift_output_first_version_bug.txt), 2026-11-07.
