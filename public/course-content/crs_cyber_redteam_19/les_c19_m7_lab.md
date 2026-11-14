> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C19_Lab_Kit.zip](/downloads/labs/RedKross_C19_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C19/...` refer to the extracted `C19` folder. Everything runs locally against systems you own.

## Practical 1: Run the detection-gap analysis

**Objective:** Produce the coverage figure, gaps and retest list.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C19 (purple.py, data/emulation_plan.json, data/telemetry.json).

**Prerequisites:** Lessons L01-L05.

**Environment setup:** offline; no technique is run.

**Explicit authorised scope:** the provided plan and telemetry files only.

**Step-by-step instructions:**

1. Run purple.py and record the coverage (expect 4/7) and the three gaps.
2. For each gap, state the telemetry and detection needed.
3. Classify each gap (no telemetry / no rule / tuning).
4. Write the retest step for each gap.
5. Explain why a gap is not closed until re-emulation detects it.

**Expected observations (execution-tested):** 4/7 detected; gaps T1087, T1550, T1005; a retest list.

**Troubleshooting:** ensure both JSON files are present.

**Cleanup:** none.

**Learning outcome:** you can perform detection-gap analysis and build a retest list.

## Practical 2: Close a gap and retest (design)

**Objective:** Design the engineering and retest for one gap.

**Difficulty:** Advanced.

**Required tools:** this module; the purple.py output.

**Prerequisites:** Lessons L04-L06.

**Environment setup:** none (design/plan) for the isolated range.

**Explicit authorised scope:** the lab artifacts; design only.

**Step-by-step instructions:**

1. Pick one gap (e.g. T1087 Account Discovery).
2. Specify the telemetry to collect and the detection rule to build.
3. Describe the re-emulation (same technique, isolated range, simulation boundary).
4. State the pass criterion (the detection fires on re-emulation).
5. Explain how you would add this to continuous validation.

**Expected observations:** a concrete engineer-and-retest plan for one gap.

**Troubleshooting:** if the retest would leave the range, re-scope to the lab.

**Cleanup:** none.

**Learning outcome:** you can close a detection gap and verify it by retesting.
