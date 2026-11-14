> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C11_Lab_Kit.zip](/downloads/labs/RedKross_C11_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C11/...` refer to the extracted `C11` folder. Everything runs locally against systems you own.

## Practical 1: Scan, fix and verify Terraform

----------------------------------------------------

**Objective:** Bring the weak IaC to zero critical findings and verify.

**Difficulty:** Advanced.

**Required tools:** Docker or Python with checkov 3.x; LAB_ASSETS/C11/iac and iac_fixed.

**Prerequisites:** Lessons L03-L06.

**Environment setup:** install checkov in a virtual environment (pip install checkov) or use its container image.

**Explicit authorised scope:** the provided Terraform files only; nothing is deployed.

**Step-by-step instructions:**

1. Run checkov -d iac --framework terraform; record passed/failed counts.
2. Classify every failure as critical, data protection or operational.
3. Without looking at iac_fixed, fix the critical findings; re-scan.
4. Compare with iac_fixed; explain any differences.
5. Add a deliberate known-bad item (for example an S3 bucket policy with Principal `"*"`) and confirm the scanner catches it.

**Expected observations:** 21 passed / 32 failed on the original with checkov 3.4.3 (counts may differ with other versions).

**Troubleshooting:** checkov versions add checks over time; record yours.

**Cleanup:** delete your working copy.

**Learning outcome:** you can run, triage and verify IaC scanning.

## Practical 2: Guardrail design

--------------------------------------

**Objective:** Translate five findings into preventive guardrails.

**Difficulty:** Advanced.

**Required tools:** text editor; provider documentation.

**Prerequisites:** Lesson L05.

**Environment setup:** none.

**Explicit authorised scope:** design exercise; policy JSON is Not execution-tested against real accounts.

**Step-by-step instructions:**

1. Choose: public S3, admin ports open, unencrypted RDS, Azure storage TLS 1.0, missing CloudTrail.
2. For each, write the preventive control (SCP, Azure Policy, account default or CI gate) and the detective control.
3. Describe how you would test each guardrail safely in a sandbox account you own.
4. Write the exception process.

**Expected observations:** every critical pattern has both a preventive and a detective control.

**Troubleshooting:** SCPs cannot inspect every resource property; combine with Config rules where needed.

**Cleanup:** none.

**Learning outcome:** you can design configuration guardrails.
