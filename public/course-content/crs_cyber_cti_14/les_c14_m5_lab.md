> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C14_Lab_Kit.zip](/downloads/labs/RedKross_C14_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C14/...` refer to the extracted `C14` folder. Everything runs locally against systems you own.

## Practical 1: Run and explain the pipeline

**Objective:** Compare naive and managed IOC handling and explain every difference.

**Difficulty:** Intermediate.

**Required tools:** Python; ioc_pipeline.py; data/.

**Prerequisites:** Lessons L02-L03.

**Environment setup:** python make_ti_data.py (if needed).

**Explicit authorised scope:** synthetic data only.

**Step-by-step instructions:**

1. python ioc_pipeline.py --naive and python ioc_pipeline.py
2. For each naive match not present in the managed run, state the reason and the stage that removed it.
3. For each of the 10 active indicators, recommend a control (proxy block, DNS block, EDR hash block, watchlist only) and an expiry.
4. Run with --asof 2026-11-15 and --asof 2026-12-15 and explain the changes.
5. Write the incident lead for the SOC: who, what, when, and which evidence.

**Expected observations (execution-tested):** 81 versus 8 events; 4 dropped rows; 10 active indicators; 2 active on 2026-12-15.

**Troubleshooting:** if counts differ, regenerate data/ (SEED 1414) - edited feeds change results.

**Cleanup:** none.

**Learning outcome:** you can operate an IOC pipeline and justify its decisions.

## Practical 2: Improve the pipeline

**Objective:** Add a quality rule and per-source context, with tests.

**Difficulty:** Advanced.

**Required tools:** Python; a copy of ioc_pipeline.py.

**Prerequisites:** P1; Lessons L04-L06.

**Environment setup:** work on a copy (ioc_pipeline_mine.py).

**Explicit authorised scope:** local files.

**Step-by-step instructions:**

1. Keep per-source descriptions and last_seen values instead of merging them, and print them for 198.51.100.77.
2. Add a rule that flags (not drops) indicators whose last_seen is after the as-of date, and one that flags address indicators whose earliest report predates the campaign window by more than 90 days.
3. Add a simple test file with five rows that exercises each rule and assert the expected outcomes.
4. Re-run on the lab feeds and report what changed.

**Expected observations:** 198.51.100.77 shows the March "old scanner" context separately; portal-nilgiri-claims is flagged for a future last_seen. This practical is learner-built; the instructor guide gives a reference.

**Troubleshooting:** keep the original script for comparison.

**Cleanup:** none.

**Learning outcome:** you can improve IOC quality controls safely.
