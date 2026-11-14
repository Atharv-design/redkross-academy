> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C11_Lab_Kit.zip](/downloads/labs/RedKross_C11_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C11/...` refer to the extracted `C11` folder. Everything runs locally against systems you own.

## Practical 1: Scan and fix the workload

-----------------------------------------------

**Objective:** Reduce trivy findings to zero critical.

**Difficulty:** Advanced.

**Required tools:** Docker (aquasec/trivy image) or trivy installed; LAB_ASSETS/C11/workload_repo and workload_repo2.

**Prerequisites:** Lessons L01, L03, L05.

**Environment setup:** copy the folders.

**Explicit authorised scope:** the provided fictional files and public base images only.

**Step-by-step instructions:**

1. Run trivy config workload_repo and trivy fs --scanners secret workload_repo2; compare with L01 and L05.
2. Fix the Dockerfile as in the deep dive and re-scan to zero failures (HEALTHCHECK may be accepted with a reason).
3. Remove secrets from both config files; replace with code that reads from an environment-provided secret reference.
4. Write a custom trivy secret rule for the pattern DB_PASSWORD = "..." and confirm it fires on app_config.py.
5. Scan python:3.12-slim and a distroless or slimmer alternative; compare fixable CRITICAL/HIGH counts.

**Expected observations:** Dockerfile failures 3 -> 0; secret findings 2 -> 0; custom rule catches the generic password.

**Troubleshooting:** trivy downloads its database on first run.

**Cleanup:** remove downloaded images if space is short.

**Learning outcome:** you can scan and harden workloads.

## Practical 2: Design OIDC federation for a pipeline

-----------------------------------------------------------

**Objective:** Replace stored cloud keys in CI with federation.

**Difficulty:** Advanced.

**Required tools:** text editor; provider and CI documentation.

**Prerequisites:** Lesson L04.

**Environment setup:** none.

**Explicit authorised scope:** design exercise; trust policies are Not execution-tested.

**Step-by-step instructions:**

1. Draw the token flow from the CI platform to AWS STS and to Entra.
2. Write the AWS role trust policy conditions (audience, subject naming repository and branch).
3. Define the role's permissions for deploying one service.
4. Describe how to detect misuse (CloudTrail AssumeRoleWithWebIdentity from unexpected subjects).
5. List the stored secrets that can then be deleted.

**Expected observations:** no long-lived cloud keys remain in CI.

**Troubleshooting:** avoid wildcard subjects.

**Cleanup:** none.

**Learning outcome:** you can remove CI secrets with federation.
