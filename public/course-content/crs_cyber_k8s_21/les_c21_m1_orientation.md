## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C21_Lab_Kit.zip](/downloads/labs/RedKross_C21_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C21/...` refer to the extracted `C21` folder. Everything runs locally against systems you own.

Shared lab environment and tools: LAB_ASSETS/C21/ contains

| Term | Meaning |
|---|---|
| m01_runtime.py | Module 1: default versus hardened container, read from inside the container (capabilities, user, seccomp, no_new_privs, namespaces, root mount) |
| images/ | Module 2: the fictional "kestrel-api" service, a weak and two hardened Dockerfiles, dockerfile_lint.py, trivy_summary.py, image_gate.py, sbom_query.py and the saved Trivy reports and SBOMs |
| k8s/ | Modules 3-5: workload manifests, m03_explore.sh, RBAC lab and rbac_review.py, token tools, admission policies, Pod Security tests, NetworkPolicies, netpol_test.sh, m05_activity.sh and audit_detect.py |
| hardened/ | the hardened cluster: audit policy, admission configuration, registry mirror and start script |
| iac/ | Module 6: Terraform examples, rk_policy.py with unit tests, tf_iam_wildcard.py and drift.py |
| supply/ | Module 7: local registry signing, tampering, attestation, provenance and digest admission |
| capstone/ | Module 8: evidence.py and the before/after evidence |

Every lab ran on 2026-11-07 on Windows 11 with Docker Desktop (Docker Engine 29.4.2), two single-node k3s clusters (rancher/k3s:v1.34.1-k3s1, Kubernetes v1.34.1) bound to 127.0.0.1, kubectl v1.34.1, Trivy 0.76.2, cosign v3.1.4, the registry:3 image and CPython 3.14.4 with PyYAML. Saved outputs sit beside each script. All names ("Kestrel Pay", kestrel-api), keys and secret values are fictional lab values; AWS account 111122223333 is the documentation example account and the Terraform is never applied.

**Safety statement:** this is a defensive course. You build, inspect, test and audit clusters that YOU run on your own machine. Where a module needs suspicious activity to detect (Module 5), the lab administrator generates labelled API events against lab objects; no module gives a procedure for escaping a container or compromising a cluster. Never point any tool in this course at a cluster, registry or cloud account that you do not own or have written authorisation to assess.

**Access classification note:** per the blueprint, Course 21 is "PAID premium".

**Version note:** Kubernetes releases about three minor versions a year and security defaults change between them. Every behaviour quoted here was observed on v1.34.1 (k3s distribution). Managed services (EKS, AKS, GKE) and other distributions set different defaults; Module 3 shows how to check yours instead of assuming.
