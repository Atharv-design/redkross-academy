> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C14_Lab_Kit.zip](/downloads/labs/RedKross_C14_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C14/...` refer to the extracted `C14` folder. Everything runs locally against systems you own.

## Practical 1: Grade, corroborate and decide

**Objective:** Grade the six reports, test corroboration and decide which can support judgments.

**Difficulty:** Intermediate.

**Required tools:** Python; LAB_ASSETS/C14 (source_eval.py, data/).

**Prerequisites:** Lesson L04.

**Environment setup:** python make_ti_data.py (if data/ is missing).

**Explicit authorised scope:** synthetic dataset only.

**Step-by-step instructions:**

1. python source_eval.py and record each grade.
2. For each report write one sentence: is it independent of the others? (Consider that an ISAC bulletin often repeats vendor reports.)
3. Choose the two judgments you would be willing to make for PIR-2 and cite their reports with grades.
4. Explain in a paragraph why RPT-003 must not be used, and what new evidence would be needed before attribution could even be discussed (Module 4).

**Expected observations (execution-tested):** the grades and corroboration shown in section 3.

**Troubleshooting:** missing data/ - run make_ti_data.py first.

**Cleanup:** none.

**Learning outcome:** you can weigh sources before writing judgments.

## Practical 2: Collect, minimise and record

**Objective:** Run the minimisation and collection-record steps on a synthetic artefact and prove tamper evidence.

**Difficulty:** Intermediate.

**Required tools:** Python; minimise.py; collect_log.py; collection/forum_post_raw.txt.

**Prerequisites:** Lessons L03, L05.

**Environment setup:** none.

**Explicit authorised scope:** synthetic files only; no live collection.

**Step-by-step instructions:**

1. python minimise.py collection/forum_post_raw.txt collection/forum_post_min.txt ; confirm every personal identifier is replaced.
2. Add three new lines to a copy of the raw file with other formats (for example "098765 43210", "9876-543210", an e-mail with a subdomain) and test; extend the patterns until they pass, and record any you choose not to handle.
3. Log the minimised file and reports.json with collect_log.py, stating requirement IDs and purposes.
4. Verify the log; then edit one field in a copy and verify again.
5. Write a one-page OSINT plan for SIR-1.1 using the Berkeley Protocol preparation headings.

Expected observations (execution-tested for steps 1, 3 and 4): the outputs in section 3. Step 2 results depend on your patterns.

**Troubleshooting:** on Windows, run from the C14 folder so the relative paths resolve.

**Cleanup:** delete your test copies; keep the log.

**Learning outcome:** you can collect in a minimised, recorded, verifiable way.
