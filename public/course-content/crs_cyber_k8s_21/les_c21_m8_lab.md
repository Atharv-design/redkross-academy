> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C21_Lab_Kit.zip](/downloads/labs/RedKross_C21_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C21/...` refer to the extracted `C21` folder. Everything runs locally against systems you own.

## Practical 1: Baseline, harden and verify

**Objective:** Produce before and after evidence for two lab clusters and remediate every failure on the hardened one.

**Difficulty:** Advanced.

**Required tools:** Docker; kubectl; Python; all LAB_ASSETS/C21 folders.

**Prerequisites:** Modules 3-7 practicals (both clusters and the registry exist).

**Environment setup:** kubeconfigs for rk-k3s (16443) and rk-k3s-hard (16444).

**Explicit authorised scope:** your two local lab clusters only.

**Step-by-step instructions:**

1. KUBECONFIG=<default> python capstone/evidence.py --node rk-k3s --api [https://127.0.0.1:16443](https://127.0.0.1:16443) --out before
2. The same for rk-k3s-hard (--out after_round1).
3. For every FAIL, decide: real gap, tool limitation or tool bug. Explain each with evidence.
4. Remediate the real gaps on rk-k3s-hard through files (commit them), not by hand; re-run until all pass or each remaining failure has a documented acceptance.
5. Record the report SHA-256 values and store the JSON files.

**Expected observations (execution-tested):** 2/10 before; 7/10 in the first hardened round in the reference run (your round 1 may differ depending on what you fixed earlier); 10/10 after remediation.

**Troubleshooting:** C07 fails although you fixed RBAC - check that a later "kubectl apply -f rbac-lab.yaml" did not re-create the legacy grant; C04 errors - the namespace from a previous run may still be terminating; wait and re-run.

**Cleanup:** keep the evidence; when the course is complete, remove the lab: docker rm -f rk-k3s rk-k3s-hard rk-registry; docker network rm rk-supply; docker volume rm rk-trivy-cache.

**Learning outcome:** you can harden a cluster and prove it.

## Practical 2: Extend the catalogue and report

**Objective:** Add one control test to evidence.py and write the technical and management reports.

**Difficulty:** Advanced.

**Required tools:** Python; text editor; the outputs of P1.

**Prerequisites:** P1; Lessons L04-L05.

**Environment setup:** none.

**Explicit authorised scope:** local files and your lab clusters.

**Step-by-step instructions:**

1. Add control C11 of your choice with an observable test - for example "pod-mounted service account tokens expire within 60 minutes" (create a short-lived pod, read its token claims with jwt_claims.py, delete the pod) or "no pod mounts a service account token unless its service account is listed in an allowlist".
2. Run it on both clusters and record the results.
3. Write the technical report (controls, evidence lines, changes, remaining risks, reproduction steps).
4. Write a one-page management summary with before/after scores, three risks reduced, three residual risks and one decision request.

**Expected observations:** for the token example, about 60 minutes on rk-k3s-hard and about one year on rk-k3s (Module 4 results). Other controls are learner-designed and not part of the tested reference set.

**Troubleshooting:** tests that create objects must clean up even when they fail; use try/finally in Python.

**Cleanup:** delete any probe objects.

**Learning outcome:** you can extend evidence tooling and communicate results.
