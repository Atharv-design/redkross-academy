> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C11_Lab_Kit.zip](/downloads/labs/RedKross_C11_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C11/...` refer to the extracted `C11` folder. Everything runs locally against systems you own.

## Practical 1: Run and extend the IAM lab

------------------------------------------------

**Objective:** Observe policy evaluation and fix risky identities in the mock.

**Difficulty:** Advanced.

**Required tools:** Docker; Git Bash or Linux shell; LAB_ASSETS/C11/run_lab.sh and iam_lab.py.

**Prerequisites:** Lessons L02, L04-L06.

**Environment setup:** copy the C11 lab folder; start Docker.

**Explicit authorised scope:** the local moto mock only; dummy credentials "testing"; no requests reach AWS.

**Step-by-step instructions:**

1. Run sh run_lab.sh iam_lab.py and compare with the outputs above.
2. Add a case: an explicit Deny on s3:DeleteObject for tl-reports combined with the office-only Allow; confirm explicit Deny wins.
3. In Part B, change ci-bot's policy to restrict PassRole to one role ARN and teach the reviewer to flag PassRole only when Resource is `"*".`
4. Replace the vendor role's trust policy with a specific account and an sts:ExternalId condition; update the reviewer to accept it.
5. Delete old-integration's access key and re-run.

**Expected observations:** explicit Deny overrides; the review shows no risky findings after remediation.

**Troubleshooting:** the first run downloads python:3.12-slim and packages.

**Cleanup:** none (containers are removed with --rm).

**Learning outcome:** you can evaluate and remediate IAM policies.

## Practical 2: Azure role design

---------------------------------------

**Objective:** Design least-privilege Azure access for three teams.

**Difficulty:** Advanced.

**Required tools:** text editor; Microsoft documentation.

**Prerequisites:** Lesson L03 and L05.

**Environment setup:** none.

**Explicit authorised scope:** design exercise; Azure commands are Not execution-tested.

**Step-by-step instructions:**

1. Teams: platform (manages subscriptions), app team (deploys to one resource group), auditors (read-only across production).
2. Choose built-in or custom roles, scopes and groups for each.
3. Decide which assignments are PIM-eligible with approval.
4. Write two Conditional Access policies for administrators.
5. Describe the quarterly access review.

**Expected observations:** no permanent Owner assignments; auditors Reader at management-group scope.

**Troubleshooting:** separate Entra directory roles from Azure RBAC roles.

**Cleanup:** none.

**Learning outcome:** you can design Azure RBAC with bounded privilege.
