> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C19_Lab_Kit.zip](/downloads/labs/RedKross_C19_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C19/...` refer to the extracted `C19` folder. Everything runs locally against systems you own.

## Practical 1: Enforce scope

**Objective:** Use the scope check to classify targets and enforce the boundary.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C19 (scopecheck.py, data/authorized_scope.json).

**Prerequisites:** Lessons L01-L02.

**Environment setup:** offline; no target is contacted.

**Explicit authorised scope:** the provided scope file; classification only.

**Step-by-step instructions:**

1. Run scopecheck.py with a mix of in-scope (10.70.0.10, rk-range-web) and out-of-scope (e.g. 8.8.8.8) targets.
2. Confirm the out-of-scope target is REFUSED.
3. Explain the fail-safe rule (not provably in scope -> out of scope).
4. Add an in-scope host and confirm it classifies IN-SCOPE.
5. Explain why scope is checked before every action.

**Expected observations (execution-tested):** in-scope listed/within-network; 8.8.8.8 OUT-OF-SCOPE; tool refuses.

**Troubleshooting:** ensure the scope file lists the networks/hosts you expect.

**Cleanup:** none (no target contacted).

**Learning outcome:** you can enforce scope fail-safe.

## Practical 2: Maintain a chain of custody

**Objective:** Record evidence and verify its integrity, including tamper detection.

**Difficulty:** Advanced.

**Required tools:** Python 3; LAB_ASSETS/C19 (evidence.py).

**Prerequisites:** Lessons L04-L05.

**Environment setup:** offline; a local evidence log.

**Explicit authorised scope:** the lab's own evidence log file.

**Step-by-step instructions:**

1. Add two evidence entries (step, description, operator) with evidence.py add.
2. List and verify the log; confirm "integrity OK".
3. Edit one character of one entry in the file, then verify again; confirm the entry is reported BROKEN.
4. Rebuild a clean log and verify OK.
5. Explain how the hash chain makes the log tamper-evident.

**Expected observations (execution-tested):** intact chain verifies OK; a one-character edit is detected as BROKEN.

**Troubleshooting:** if verify errors, ensure the log lines are valid JSON.

**Cleanup:** delete the practice log if desired.

**Learning outcome:** you can keep and verify a tamper-evident chain of custody.
