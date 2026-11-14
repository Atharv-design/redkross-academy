> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C14_Lab_Kit.zip](/downloads/labs/RedKross_C14_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C14/...` refer to the extracted `C14` folder. Everything runs locally against systems you own.

## Practical 1: Fix the bad brief

**Objective:** Correct every defect in brief_bad.yaml and pass the checks.

**Difficulty:** Intermediate.

**Required tools:** Python with PyYAML; brief_builder.py; briefs/.

**Prerequisites:** Lessons L02-L05.

**Environment setup:** python make_ti_data.py (if needed).

**Explicit authorised scope:** local files only.

**Step-by-step instructions:**

1. python brief_builder.py briefs/brief_bad.yaml briefs/brief_bad.txt and list the six failures.
2. Copy the file to brief_fixed.yaml and fix each failure with content supported by the lab outputs (not by copying the model brief).
3. Run the checker until it passes; then compare your brief with brief_model.yaml and note one improvement you would make to either.
4. Ask a peer to challenge your key judgment; record the outcome.

**Expected observations (execution-tested):** six failures for the bad brief; PASS for the model brief. Your fixed brief's result depends on your text.

**Troubleshooting:** "unknown source IDs" - cite only report IDs in data/reports.json; "needs a valid PIR" - use PIR-1, PIR-2 or PIR-3.

**Cleanup:** none.

**Learning outcome:** you can produce briefs that pass quality control.

## Practical 2: Write a strategic paragraph

**Objective:** Write a one-page strategic assessment for Nilgiri's board risk committee answering PIR-1.

**Difficulty:** Advanced.

**Required tools:** text editor; outputs of Modules 1-7.

**Prerequisites:** P1.

**Environment setup:** none.

**Explicit authorised scope:** synthetic case and public sources cited in this course.

**Step-by-step instructions:**

1. State the board's decision context (risk appetite, investment, insurance).
2. Write a BLUF and no more than three judgments in plain language, with likelihood and separate confidence.
3. Translate technical gaps (Module 7) into business terms (for example "we would not see the persistence method this campaign uses elsewhere").
4. Ask for one decision with cost and benefit.
5. Lint your judgments with estimative_lint.py (prefix each with "Judgment:").

**Expected observations:** no indicators or technique IDs in the board text; a clear decision request. This practical is learner-written; there is no single tested output.

**Troubleshooting:** if a judgment fails the linter, separate likelihood and confidence into two sentences.

**Cleanup:** none.

**Learning outcome:** you can communicate intelligence to executives.
