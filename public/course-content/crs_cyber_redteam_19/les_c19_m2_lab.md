> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C19_Lab_Kit.zip](/downloads/labs/RedKross_C19_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C19/...` refer to the extracted `C19` folder. Everything runs locally against systems you own.

## Practical 1: Validate an emulation plan

**Objective:** Validate the emulation plan and read it as a detection checklist.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C19 (emulation_plan.py, data/emulation_plan.json, data/authorized_scope.json).

**Prerequisites:** Lessons L01-L05.

**Environment setup:** offline; no technique is run.

**Explicit authorised scope:** the provided plan and scope files only.

**Step-by-step instructions:**

1. Run emulation_plan.py and confirm all 7 steps validate (PASS).
2. List each step's ATT&CK tactic and technique ID.
3. For each step, state the safety boundary and the detection it tests.
4. Confirm every target is inside the authorised range.
5. Explain why the plan is also a detection checklist.

**Expected observations (execution-tested):** 7 steps, all in scope, safety-bounded and detection-mapped, PASS.

**Troubleshooting:** ensure both JSON files are present.

**Cleanup:** none.

**Learning outcome:** you can validate and read a threat-informed emulation plan.

## Practical 2: Build a threat-informed plan

**Objective:** Design an emulation plan for a chosen threat profile.

**Difficulty:** Advanced.

**Required tools:** ATT&CK (reference); the lab plan as a template; emulation_plan.py.

**Prerequisites:** Lessons L01-L06.

**Environment setup:** offline; author a plan JSON for your lab range.

**Explicit authorised scope:** your own lab range only.

**Step-by-step instructions:**

1. Choose a threat profile and list the ATT&CK techniques it uses.
2. Write a plan JSON: for each technique record tactic, technique ID, an in-scope target, a safety control, a data source and a detection.
3. Run emulation_plan.py and resolve findings to reach PASS.
4. Explain how each simulation boundary keeps the step safe.
5. Note which detections you expect to be gaps.

**Expected observations:** a passing, in-scope, safety-bounded, detection-mapped plan.

**Troubleshooting:** if a target fails scope, correct it to an authorised host/network.

**Cleanup:** none.

**Learning outcome:** you can build a safe, threat-informed emulation plan.
