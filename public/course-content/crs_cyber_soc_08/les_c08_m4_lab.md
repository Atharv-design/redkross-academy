> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C08_Lab_Kit.zip](/downloads/labs/RedKross_C08_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C08/...` refer to the extracted `C08` folder. Everything runs locally against systems you own.

## Practical 1: Triage the Banyan queue

---------------------------------------------

**Objective:** Triage the seven rule hits and decide dispositions.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; LAB_ASSETS/C08 (minisiem.py, triage.py).

**Prerequisites:** Lessons L02-L05.

**Environment setup:** python make_dataset.py; python minisiem.py load.

**Explicit authorised scope:** the synthetic dataset only.

**Step-by-step instructions:**

1. Run python triage.py and record the queue.
2. For each hit, write the entities, the enrichment and one query that validates or refutes it (use minisiem.py search).
3. Assign a disposition and confidence.
4. Group the hits into cases and justify the grouping.
5. Write a one-paragraph escalation note for the main case.

**Expected observations:** one main case on WS-104/divya containing R1, R6, R3, R4 and R5; R2 as a linked or separate case with an open hypothesis.

**Troubleshooting:** if triage.py fails with "no such table", run minisiem.py load in the same folder first.

**Cleanup:** delete minisiem.db if desired.

**Learning outcome:** you can triage a realistic queue.

## Practical 2: Add grouping and a suppression review

-----------------------------------------------------------

**Objective:** Extend triage.py.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; triage.py.

**Prerequisites:** Lesson L06.

**Environment setup:** copy triage.py to your work folder.

**Explicit authorised scope:** synthetic data.

**Step-by-step instructions:**

1. Group queue entries by host and print one line per case with the maximum priority and list of rules.
2. Make the suppression check ignore entries whose expiry date has passed, and print a warning listing them.
3. Add a test that an expired suppression no longer suppresses.

**Expected observations:** WS-104 case with five rules; WS-107 case with R2.

**Troubleshooting:** compare dates as datetime.date objects, not strings, if formats vary.

**Cleanup:** none.

**Learning outcome:** you can improve triage tooling safely.
