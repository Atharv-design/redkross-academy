> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C06_Lab_Kit.zip](/downloads/labs/RedKross_C06_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C06/...` refer to the extracted `C06` folder. Everything runs locally against systems you own.

## Practical 1: Run the full workflow and prove closure

**Objective:** Execute the end-to-end OWASP-aligned workflow on your owned lab and produce the report and retest.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C06 (all tools).

**Prerequisites:** Modules 1-7.

**Environment setup:** run both apps (8200, 8201) in separate terminals; loopback only.

**Explicit authorised scope:** 127.0.0.1 only; your own apps.

**Step-by-step instructions:**

1. Review scope.md (authorisation) and confirm the loopback-only scope.
2. Run map.py, then findings.py --port 8200 --save to verify and record the ten findings.
3. Run report.py to produce the risk-ranked report; read the executive summary and the ten findings.
4. Run codereview.py target/app.py and target/app_fixed.py and compare hit counts; confirm each remaining hit in the hardened app is a safe pattern.
5. Run retest.py and confirm 10 of 10 closed.

**Expected observations (execution-tested):** report ranks 9.8 down to 3.1; retest shows 10/10 present on 8200 and 0/10 on 8201 (10/10 closed); codereview flags more lines on the vulnerable app.

**Troubleshooting:** if a finding shows absent unexpectedly, confirm the right app is on the right port.

**Cleanup:** stop both servers; throwaway data only.

**Learning outcome:** you can run and evidence a complete web security assessment.

## Practical 2: Write two report findings by hand

**Objective:** Practise professional finding write-ups.

**Difficulty:** Intermediate.

**Required tools:** the report output; this module.

**Prerequisites:** Lessons L03, L05.

**Environment setup:** none.

**Explicit authorised scope:** writing only.

**Step-by-step instructions:**

1. Choose two findings (one High, one Medium) and write each as: title, OWASP/CWE, CVSS vector/score/severity, evidence, business impact, remediation.
2. Write a two-sentence executive summary for the whole assessment.
3. For one finding, note how business context might adjust its priority.
4. State the retest that would confirm each finding closed.

**Expected observations:** findings are evidenced, ranked and actionable, each with a concrete fix and a retest.

**Troubleshooting:** if a finding lacks evidence or a fix, add them - both are required.

**Cleanup:** none.

**Learning outcome:** you can write clear, actionable security findings.
