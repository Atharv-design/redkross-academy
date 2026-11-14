> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C14_Lab_Kit.zip](/downloads/labs/RedKross_C14_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C14/...` refer to the extracted `C14` folder. Everything runs locally against systems you own.

## Practical 1: Build and repair a requirements set

**Objective:** Generate the dataset, review Nilgiri's requirements and close their gaps.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+ with PyYAML; LAB_ASSETS/C14.

**Prerequisites:** Lessons L01-L03.

**Environment setup:** python make_ti_data.py (writes data/).

**Explicit authorised scope:** synthetic dataset only.

**Step-by-step instructions:**

1. python requirements_view.py ; record the two gaps.
2. For PIR-3 write two SIRs with EEIs that Legal and the DPO could act on (for example "which incident categories require reporting to CERT-In, and within what time?"; Module 2 gives the facts).
3. For SIR-1.2 "tools named in reports", propose two collection sources and note any cost or legal constraint.
4. Add your SIRs to a copy of requirements.yaml and add matching keywords to requirements_view.py; re-run and explain any remaining gap.
5. Write one sentence per PIR naming the decision it supports and when it should be reviewed.

Expected observations (execution-tested for steps 1 and the unmodified dataset): the output in section 3; after your changes, PIR-3 shows SIRs but no matching reports - a genuine collection gap, not a definition gap.

**Troubleshooting:** "No module named yaml" - pip install pyyaml; a KeyError on a new EEI means the KEYWORDS table needs an entry.

**Cleanup:** none.

**Learning outcome:** you can turn consumer needs into collectable requirements.

## Practical 2: Calibrated judgments

**Objective:** Rewrite weak judgments using the likelihood scale with separate confidence statements and citations.

**Difficulty:** Intermediate.

**Required tools:** Python; estimative_lint.py; briefs/draft_v1.txt.

**Prerequisites:** Lessons L04-L05.

**Environment setup:** none.

**Explicit authorised scope:** local files only.

**Step-by-step instructions:**

1. python estimative_lint.py briefs/draft_v1.txt and read every issue.
2. Write your own draft_v3.txt with the same four topics; for each judgment choose a likelihood term, write a separate confidence sentence and cite the reports that support it.
3. For the attribution topic, run a key assumptions check: list three assumptions behind "a state agency runs MONSOON LANTERN" and what evidence would be needed.
4. Lint your draft until it passes; then ask a colleague to challenge one judgment (devil's advocacy) and record the change.

Expected observations (execution-tested on the supplied drafts): v1 has 4 judgments to fix including the combined-sentence error; v2 passes. Your v3 results depend on your text.

**Troubleshooting:** "almost certainly" is not recognised (documented limitation) - write "almost certain".

**Cleanup:** none.

**Learning outcome:** you can write judgments readers can calibrate.
