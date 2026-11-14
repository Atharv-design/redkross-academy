> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C22_Lab_Kit.zip](/downloads/labs/RedKross_C22_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C22/...` refer to the extracted `C22` folder. Everything runs locally against systems you own.

## Practical 1: Build and close a traceability matrix

-----------------------------------------------------------

**Objective:** Use control_matrix.py to reach 9/9 VALIDATED honestly.

**Difficulty:** Specialization.

**Required tools:** Python 3.10+; LAB_ASSETS/C22 (control_matrix.py, requirements.json, saved outputs, arch_review.py).

**Prerequisites:** Lessons L01, L04, L05; Module 5 practical P1.

**Environment setup:** copy the C22 lab folder.

**Explicit authorised scope:** lab files only.

**Step-by-step instructions:**

1. Run python control_matrix.py; confirm 7/9 validated, R6 FAILED, R9 NO-EVIDENCE, exit code 1.
2. For R6: remediate the arch_review.py catalogue (Module 5 P1), save the new output over a copy of arch_review_output.txt, and re-run.
3. For R9: write threat_model_review.txt recording the date, reviewers, scope and the word "approved" - only after you have actually completed practical P2.
4. Re-run until 9/9; record the new hashes.
5. Add two requirements of your own with evidence and expected patterns.

**Expected observations:** status changes only when evidence changes.

**Troubleshooting:** Windows line endings can break "^...$" patterns; match text without anchors or allow \r.

**Cleanup:** restore the original files if the folder is shared.

**Learning outcome:** you can produce evidence-based assurance status.

## Practical 2: Threat-model the payroll export

-----------------------------------------------------

**Objective:** Produce an architecture threat model linked to requirements.

**Difficulty:** Specialization.

**Required tools:** diagramming tool or text; spreadsheet.

**Prerequisites:** Lesson L02; Module 5 deep dive.

**Environment setup:** none.

**Explicit authorised scope:** the fictional Tamarind design only.

**Step-by-step instructions:**

1. Draw the payroll-export data-flow view with trust boundaries and classifications.
2. For each boundary crossing apply STRIDE; list the control for each threat or record a risk.
3. Map two threats to ATT&CK v20.1 techniques and name the detection (Module 6 telemetry) that would show them.
4. Link each threat to a requirement ID in requirements.json, adding requirements where needed.
5. Hold a mock review with a peer and record an ADR for one decision.

**Expected observations:** every threat has a control, a test or a recorded risk decision.

**Troubleshooting:** keep to architecture level; do not drift into code review.

**Cleanup:** none.

**Learning outcome:** you can make threat models drive assurance.
