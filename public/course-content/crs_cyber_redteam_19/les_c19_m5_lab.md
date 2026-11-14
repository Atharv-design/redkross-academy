> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C19_Lab_Kit.zip](/downloads/labs/RedKross_C19_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C19/...` refer to the extracted `C19` folder. Everything runs locally against systems you own.

## Practical 1: Map lateral-movement detection opportunities

**Objective:** Produce the detection/containment map for the lateral-movement techniques.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C19 (attackmap.py, data/emulation_plan.json).

**Prerequisites:** Lessons L01-L05.

**Environment setup:** offline; no technique is run.

**Explicit authorised scope:** the provided plan file only.

**Step-by-step instructions:**

1. Run attackmap.py with --tactic "Lateral Movement".
2. For T1021 and T1550, record the data source, detection and containment.
3. Explain why each detection is behavioural and cross-host.
4. State which hops segmentation should make impossible.
5. Explain how containment and detection combine.

**Expected observations (execution-tested):** T1021 and T1550 mapped to authentication/network telemetry, behavioural detections and segmentation/credential containment.

**Troubleshooting:** ensure the tactic name is quoted exactly.

**Cleanup:** none.

**Learning outcome:** you can turn lateral-movement techniques into detection opportunities and containment.

## Practical 2: Validate segmentation (design)

**Objective:** Design a segmentation-validation plan for lateral-movement paths.

**Difficulty:** Advanced.

**Required tools:** this module; Course 07 allowed-flow concept.

**Prerequisites:** Lessons L02-L06.

**Environment setup:** none (design/plan) for your own isolated range.

**Explicit authorised scope:** your own lab range; design only.

**Step-by-step instructions:**

1. List the trust relationships to examine (account, host/service, domain).
2. Define an allowed-flow matrix: which cross-segment/host paths SHOULD be blocked.
3. For each path that should be blocked, state how you would validate it (in the isolated range) and the detection if it is not.
4. State the containment for each over-broad trust (segmentation, unique local admin, tiering).
5. State the authorisation and isolation rules.

**Expected observations:** a segmentation-validation plan with expected-blocked paths, detections and containment.

**Troubleshooting:** if a path would leave the range, re-scope to the lab.

**Cleanup:** none.

**Learning outcome:** you can plan segmentation validation for lateral movement.
