> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C19_Lab_Kit.zip](/downloads/labs/RedKross_C19_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C19/...` refer to the extracted `C19` folder. Everything runs locally against systems you own.

## Practical 1: Gate an engagement on the RoE

**Objective:** Run the RoE validator on an incomplete and a complete RoE and interpret the gate.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C19 (roe.py, data/roe_incomplete.json, data/roe_complete.json).

**Prerequisites:** Lessons L01-L05.

**Environment setup:** offline; no system is touched.

**Explicit authorised scope:** the provided RoE files only.

**Step-by-step instructions:**

1. Run roe.py on roe_incomplete.json; record the findings (expect 10, 6 HIGH, FAIL).
2. For each HIGH finding, explain the risk of starting without that control.
3. Run roe.py on roe_complete.json; confirm PASS.
4. Identify which controls are legal (authorisation) and which are safety.
5. Explain why the engagement must not begin on a FAIL.

**Expected observations (execution-tested):** incomplete 10 findings/6 HIGH/FAIL; complete 0/PASS.

**Troubleshooting:** ensure the JSON path is correct.

**Cleanup:** none (no system touched; no changes made).

**Learning outcome:** you can engineer and gate an engagement on a complete RoE.

## Practical 2: Draft a Rules of Engagement

**Objective:** Draft a complete RoE for an isolated-range emulation.

**Difficulty:** Advanced.

**Required tools:** scope.md (the template); roe.py to check your draft.

**Prerequisites:** Lessons L01-L06.

**Environment setup:** offline; author a JSON RoE.

**Explicit authorised scope:** your own lab range only (RFC 1918).

**Step-by-step instructions:**

1. Using scope.md, write an RoE JSON with every required field for an isolated emulation of your lab range.
2. State the objectives and the threat the exercise will emulate.
3. Define stop conditions, deconfliction (operator tags) and contacts.
4. Run roe.py on your file and resolve any findings to reach PASS.
5. Explain how each safety control keeps the exercise non-destructive.

**Expected observations:** your RoE reaches PASS; you can justify each control.

**Troubleshooting:** if a control fails, re-read L02-L04 and complete the field.

**Cleanup:** none.

**Learning outcome:** you can author a complete, passing RoE.
