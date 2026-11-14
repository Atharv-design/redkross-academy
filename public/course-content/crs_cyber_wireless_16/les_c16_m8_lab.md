> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C16_Lab_Kit.zip](/downloads/labs/RedKross_C16_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C16/...` refer to the extracted `C16` folder. Everything runs locally against systems you own.

## Practical 1: Run the consolidated review

**Objective:** Run review.py and interpret the enforcing and detective results.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C16 (review.py and all data).

**Prerequisites:** Modules 1-7.

**Environment setup:** offline; run review.py.

**Explicit authorised scope:** the provided lab configurations, demo app and data.

**Step-by-step instructions:**

1. Run review.py and record the full output.
2. Confirm all three control domains move FAIL -> PASS (3/3).
3. List the detective findings (16 app, 2 rogue AP) and their areas.
4. Explain which results are enforcing evidence and which are findings to fix.
5. Confirm the whole run was offline against your own data.

**Expected observations (execution-tested):** 3/3 control domains PASS after hardening; 16 app findings (9 HIGH); 2 evil-twin APs.

**Troubleshooting:** ensure all data/ files are present; run from LAB_ASSETS/C16.

**Cleanup:** none.

**Learning outcome:** you can run and interpret a consolidated wireless-and-mobile review.

## Practical 2: Capstone - a complete wireless-and-mobile assessment

**Objective:** Produce a complete, authorised assessment deliverable for the lab environment.

**Difficulty:** Advanced (capstone).

**Required tools:** the whole LAB_ASSETS/C16; this course.

**Prerequisites:** Modules 1-8.

**Environment setup:** offline; your own lab data only.

**Explicit authorised scope:** the lab's own configurations, demo app and data; no radio activity against others, no third-party API, no live external systems.

**Step-by-step instructions:**

1. State scope and authorisation (authorised, offline, do-no-harm).
2. Run all reviews (or review.py) and collect the evidence.
3. Write findings by area - Wi-Fi, Bluetooth, mobile app, mobile API, rogue APs - with severities.
4. Present the enforcing FAIL-to-PASS evidence for the three control domains.
5. Map remediation to the secure baseline and state verification (re-run to PASS).
6. Write a clear summary for decision-makers plus the detailed evidence.

**Expected observations:** a complete assessment deliverable - scope, method, findings, enforcing evidence, remediation, verification - all within scope.

**Troubleshooting:** if any step would touch a system you do not own, re-scope to the lab.

**Cleanup:** none (all offline).

**Learning outcome:** you can deliver a complete, authorised wireless-and-mobile assessment - the course goal.
