> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C13_Lab_Kit.zip](/downloads/labs/RedKross_C13_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C13/...` refer to the extracted `C13` folder. Everything runs locally against systems you own.

## Practical 1: Run a full assessment of the lab domain

**Objective:** Produce a findings register from a configuration review, an activity review and an access review.

**Difficulty:** Advanced.

**Required tools:** the running rk-dc container; dir_review.py; auth_monitor.py.

**Prerequisites:** Lessons L01-L04; Modules 5-6.

**Environment setup:** ensure setup_domain.sh has run and telemetry is captured.

**Explicit authorised scope:** your own lab container only.

**Step-by-step instructions:**

1. Export the directory and run dir_review.py; record every finding with severity (configuration/hygiene).
2. Run auth_monitor.py (and at --fail-threshold 4); record the activity findings.
3. Enumerate Domain Admins, Server-Admins and Helpdesk; record the access findings and note which need a human decision.
4. Combine all findings into one register with columns: id, finding, severity, evidence.

**Expected observations (execution-tested):** five hygiene findings (one HIGH), all-AES activity, the asha burst at threshold 4, and the group memberships in section 3.

**Troubleshooting:** "Could not find a DC"/empty data mean DNS or that setup_domain.sh has not run (Modules 1, 3).

**Cleanup:** keep the register for P2 and the capstone.

**Learning outcome:** you can run a three-part assessment and build a findings register with evidence.

## Practical 2: Write and verify a remediation plan

**Objective:** Turn the register into a prioritised plan and prove one closure.

**Difficulty:** Advanced.

**Required tools:** the register from P1; the running rk-dc container.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none beyond P1.

**Explicit authorised scope:** your own lab container only.

**Step-by-step instructions:**

1. Score and order the findings; justify why the legacy-svc SPN is first.
2. For each finding, write the fix, an owner, a due date and a verification step.
3. Apply the top fix (remove the SPN or move to a gMSA, Module 5 P2), re-export and re-run dir_review.py, and confirm the HIGH finding is gone and the exit code changed.
4. Record the before/after as evidence of closure.

**Expected observations:** after the fix, the Kerberoastable HIGH finding is absent and the exit code may be 0; the register shows the item closed with evidence.

**Troubleshooting:** if the finding persists, confirm the SPN removal and the re-export (Module 5 P2 troubleshooting).

**Cleanup:** optionally restore the SPN for other learners (setup_domain.sh).

**Learning outcome:** you can write a remediation plan and verify a closure with before/after evidence.
