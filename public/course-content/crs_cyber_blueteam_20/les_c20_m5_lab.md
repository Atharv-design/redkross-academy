> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C20_Lab_Kit.zip](/downloads/labs/RedKross_C20_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C20/...` refer to the extracted `C20` folder. Everything runs locally against systems you own.

## Practical 1: Run, validate and report two hunts

**Objective:** Run the H1 and H2 hunts, validate them and write a hunt report.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; LAB_ASSETS/C20.

**Prerequisites:** Lessons L02-L05.

**Environment setup:** python make_telemetry.py

**Explicit authorised scope:** synthetic dataset only.

**Step-by-step instructions:**

1. Run: python hunt.py
2. For H1 and H2, write the hypothesis in the form of Lesson L02.
3. Record each hunt's data requirement and the gaps found.
4. Grade every candidate (confirmed malicious, suspicious, benign explained, unresolved) and give the evidence.
5. Validation: run python hunt_seed.py tamarind_telemetry.jsonl seeded.jsonl, which appends one synthetic 4698 event for BK-01 with TaskCommand "wscript.exe C:\Users\Public\x.vbs". Re-run H1 on the copy (python hunt.py seeded.jsonl) and confirm it is flagged.
6. Write a one-page hunt report: hypotheses, scope, data, method, findings, gaps, recommendations (one detection, one telemetry fix, one baseline entry).

**Expected observations:** one suspicious task (WS-07), one baseline task (BK-01), twelve blind hosts; six rare pairs, five on WS-07; the seeded event is flagged (execution-tested: "4698 events found: 3" and "15:00:00 BK-01 by it.admin \Seed\Test SUSPECT \users\public\,wscript.exe").

**Troubleshooting:** if the seeded event is not found, check the JSON field names ("log": "security", "EventID": 4698) and that the line is valid JSON.

**Cleanup:** delete the dataset copy.

**Learning outcome:** you can run and honestly report a validated hunt.

## Practical 2: Design a baseline hunt

**Objective:** Design (and optionally implement) a baseline hunt for logons to FS-01.

**Difficulty:** Advanced.

**Required tools:** text editor; optional Python.

**Prerequisites:** Lessons L03-L04.

**Environment setup:** none.

**Explicit authorised scope:** design for the fictional estate; optional implementation on the synthetic dataset.

**Step-by-step instructions:**

1. Define "normal" for FS-01 logons: which accounts, from which sources, with which logon types and at what hours.
2. State the data requirements and how many days of data a stable baseline needs.
3. Define what a deviation is and how you would rank deviations.
4. Optional: write a script that lists accounts and sources logging on to FS-01 in the dataset, and identify which pair is new or unusual.

**Expected observations:** it.admin from 10.20.9.9 (ADM-01) is the administrative pattern; svc-print from 10.20.1.17 is the deviation (a service account from a workstation).

**Troubleshooting:** one day of data cannot establish "new"; state that limitation.

**Cleanup:** none.

**Learning outcome:** you can design a baseline hunt with explicit assumptions.
