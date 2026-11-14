> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C12_Lab_Kit.zip](/downloads/labs/RedKross_C12_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C12/...` refer to the extracted `C12` folder. Everything runs locally against systems you own.

## Practical 1: Find a secret in history and respond

----------------------------------------------------------

**Objective:** Reproduce the history finding and carry out the response steps in order.

**Difficulty:** Advanced.

**Required tools:** Docker; git; Git bash or Linux shell; LAB_ASSETS/C12.

**Prerequisites:** Lessons L04-L05.

**Environment setup:** from LAB_ASSETS/C12 run: sh secrets_lab.sh

**Explicit authorised scope:** the throwaway secrets_repo created by the script. The key is fictional and was never issued.

**Step-by-step instructions:**

1. Run the lab and confirm "no leaks found" for the working tree and one finding in history.
2. Write the response plan for a real key in this situation: revoke, investigate logs, fix the cause, then optionally clean history, with owners and timings.
3. Install git-filter-repo (pip install git-filter-repo) and remove the secret from history in the throwaway repository. Re-run the gitleaks history scan.
4. Explain why step 3 alone would not have been sufficient.

**Expected observations:** after the rewrite, gitleaks reports no leaks. The explanation stresses that exposure had already happened, so revocation is essential.

**Troubleshooting:** run filter-repo in a fresh clone if it refuses to run in the original repository.

**Cleanup:** delete secrets_repo.

**Learning outcome:** you can detect leaked secrets and respond in the right order.

## Practical 2: Enforce configuration at startup

------------------------------------------------------

**Objective:** Extend config_check.py and wire it into a deployment step.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; LAB_ASSETS/C12/config_check.py.

**Prerequisites:** Lesson L06.

**Environment setup:** copy the script and the two .env files.

**Explicit authorised scope:** your copies.

**Step-by-step instructions:**

1. Run the checker on prod_bad.env and prod_good.env and record the exit codes.
2. Add rules for CORS_ORIGINS (no `"*"` in production) and SESSION_TIMEOUT_MIN (at most 60).
3. Write unit tests for each rule, positive and negative.
4. Show how a deployment script would stop when the exit code is 1.

**Expected observations:** exit 1 for the bad file and 0 for the good one, and the new rules are covered by tests.

**Troubleshooting:** keep secret values masked in all output.

**Cleanup:** none.

**Learning outcome:** you can turn hardening guidance into enforced checks.
