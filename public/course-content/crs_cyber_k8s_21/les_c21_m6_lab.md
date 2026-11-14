> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C21_Lab_Kit.zip](/downloads/labs/RedKross_C21_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C21/...` refer to the extracted `C21` folder. Everything runs locally against systems you own.

## Practical 1: Scan and remediate Terraform

**Objective:** Scan the weak and remediated Terraform, close the scanner's blind spot with a custom check, and decide what to do with the remaining findings.

**Difficulty:** Advanced.

**Required tools:** Docker (aquasec/trivy); Python; LAB_ASSETS/C21/iac.

**Prerequisites:** Lessons L01-L03.

**Environment setup:** none beyond the Trivy image. Do not run terraform init or apply; this practical is static analysis only.

**Explicit authorised scope:** local files only; no cloud account is used.

**Step-by-step instructions:**

1. In iac/terraform: docker run --rm -v rk-trivy-cache:/root/.cache -v "$(pwd -W):/work" aquasec/trivy:latest config --quiet --format json -o /work/trivy_config_bad.json /work/bad  (and the same for good).
2. Summarise failures by severity and resource.
3. For each CRITICAL and HIGH finding, name the line in bad/main.tf that causes it and the change in good/main.tf that fixes it.
4. Explain why the IAM wildcard is the highest risk although no scanner check fired; run python ../tf_iam_wildcard.py bad good.
5. Decide on the two remaining AWS-0038 findings: fix (add the log types) or suppress with a justification; implement your choice and rescan.

**Expected observations (execution-tested):** 20 failed checks on bad, 2 on good; the custom check reports bad/main.tf line 43 and exits 1.

**Troubleshooting:** an empty report usually means the volume path is wrong (Windows paths need pwd -W in Git Bash); Trivy may download its check bundle on first use.

**Cleanup:** none.

**Learning outcome:** you can use and extend IaC scanning critically.

## Practical 2: Policy tests and drift

**Objective:** Extend the policy engine with a tested rule and detect, classify and reconcile drift on the lab cluster.

**Difficulty:** Advanced.

**Required tools:** Python with PyYAML; kubectl; iac/rk_policy.py, policy_tests/, drift.py; the hardened cluster from Module 5.

**Prerequisites:** Lessons L04-L05.

**Environment setup:** KUBECONFIG pointing at the hardened lab cluster with the Kestrel workload.

**Explicit authorised scope:** local files and your own lab cluster.

**Step-by-step instructions:**

1. python rk_policy.py test policy_tests (expect 7 cases, 0 failed).
2. Add rule P10 "readOnlyRootFilesystem must be true" with three test files (compliant, violating, init container edge case). Run the tests until all pass, then check `../k8s/*.yaml.`
3. Run drift.py for namespace kestrel against ../k8s/kestrel-app.yaml, ../k8s/rbac-lab.yaml and the four netpol files; record the result.
4. Make the three "hotfix" changes from section 3 (scale, patch, delete policy) and re-run.
5. Classify each item as reconcile, adopt or remove; act; re-run until drift items: 0.

**Expected observations (execution-tested):** the section 3 outputs. Your P10 results depend on your rule; the instructor guide lists the expected findings in the lab manifests.

**Troubleshooting:** if the tests fail on Windows paths, run from the iac folder; drift.py needs kubectl on PATH and the namespace to exist.

**Cleanup:** ensure drift items: 0 at the end; the cluster is used in Modules 7 and 8.

**Learning outcome:** you can engineer tested policy and manage drift.
