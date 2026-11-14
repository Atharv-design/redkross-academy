> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C17_Lab_Kit.zip](/downloads/labs/RedKross_C17_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C17/...` refer to the extracted `C17` folder. Everything runs locally against systems you own.

## Practical 1: Draft policy, standard and procedure

----------------------------------------------------------

**Objective:** Write three linked documents on backup and recovery.

**Difficulty:** Professional.

**Required tools:** text editor.

**Prerequisites:** Lessons L01-L03.

**Environment setup:** none.

**Explicit authorised scope:** fictional company.

**Step-by-step instructions:**

1. Write a 1-page Backup and Recovery Policy (L01 structure).
2. Write a standard with at least five testable requirements: frequency, immutability or offline copy, encryption, restore testing, retention.
3. Write a procedure for the quarterly restore test, including the records produced.
4. Trace one requirement through to evidence, as in the deep dive.

**Expected observations:** the standard references RPO and RTO from the BIA (Module 5); restore-test records become audit evidence.

**Troubleshooting:** remove any "where possible" phrases, or define them.

**Cleanup:** none.

**Learning outcome:** you can produce usable governance documents.

## Practical 2: Run the exception register

------------------------------------------------

**Objective:** Use and extend the toolkit's exception checks.

**Difficulty:** Professional.

**Required tools:** Python 3.10+; LAB_ASSETS/C17/grc_toolkit.py.

**Prerequisites:** Lesson L05.

**Environment setup:** none.

**Explicit authorised scope:** fictional data.

**Step-by-step instructions:**

1. Run python grc_toolkit.py exceptions and record the results.
2. Fix EX-02 and EX-03 data so they become valid, and justify your choices.
3. Add a rule: exceptions to remote-access MFA standards must have an expiry no more than 90 days away and CEO approval. Rerun, and note the effect on EX-01.
4. Write a short note to the committee on EX-01, using the British Library lessons.

**Expected observations:** EX-01 now flagged under the stricter rule.

**Troubleshooting:** compare dates with date.fromisoformat.

**Cleanup:** none.

**Learning outcome:** you can govern exceptions.
