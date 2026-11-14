> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C19_Lab_Kit.zip](/downloads/labs/RedKross_C19_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C19/...` refer to the extracted `C19` folder. Everything runs locally against systems you own.

## Practical 1: Assemble the engagement report

**Objective:** Produce the executive and technical reports from the engagement artifacts.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C19 (report.py, data/roe_complete.json, data/emulation_plan.json, data/telemetry.json).

**Prerequisites:** Modules 1-7.

**Environment setup:** offline; run report.py.

**Explicit authorised scope:** the provided engagement artifacts only.

**Step-by-step instructions:**

1. Run report.py and read the executive summary and technical detail.
2. State the coverage figure and the top three recommendations.
3. Identify each technique's DETECTED/GAP status and the retest list.
4. Confirm every statement traces to the plan or telemetry.
5. Confirm the report records the isolation and scope.

**Expected observations (execution-tested):** executive coverage 4/7 (57%); three recommendations; per-technique detail; retest list.

**Troubleshooting:** ensure all three JSON files are present.

**Cleanup:** none.

**Learning outcome:** you can assemble a two-audience, evidence-traced engagement report.

## Practical 2: Run a fully isolated emulation exercise and deliver the reports

**Objective:** Produce the complete capstone deliverable for the isolated range.

**Difficulty:** Advanced (capstone).

**Required tools:** the whole LAB_ASSETS/C19; this course.

**Prerequisites:** Modules 1-8.

**Environment setup:** offline; the lab's isolated-range artifacts only.

**Explicit authorised scope:** the lab's own RoE, scope, plan, telemetry and evidence; no third-party or production system.

**Step-by-step instructions:**

1. Gate the engagement: run roe.py to PASS (Module 1).
2. Validate the emulation plan in scope: emulation_plan.py (Modules 2-3); enforce scope with scopecheck.py.
3. Record evidence with chain of custody: evidence.py (Module 3).
4. Map techniques to telemetry/containment: attackmap.py (Modules 4-6).
5. Run the purple-team gap analysis: purple.py (Module 7).
6. Assemble the reports: report.py; write the executive and technical reports with a retest list, every statement evidence-traced.
7. Confirm isolation, scope and honesty throughout.

**Expected observations:** a complete, isolated engagement with passing RoE, validated in-scope plan, evidence chain, telemetry mapping, 4/7 coverage with three gaps, and the two reports with a retest list.

**Troubleshooting:** if any step would touch a system you do not own, re-scope to the lab.

**Cleanup:** none (all offline).

**Learning outcome:** you can run a fully isolated emulation exercise and deliver executive and technical reports - the course goal.
