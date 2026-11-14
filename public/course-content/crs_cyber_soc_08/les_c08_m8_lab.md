> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C08_Lab_Kit.zip](/downloads/labs/RedKross_C08_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C08/...` refer to the extracted `C08` folder. Everything runs locally against systems you own.

## Practical 1: Run and document three hunts

--------------------------------------------------

**Objective:** Execute hunt.py, extend it with one hypothesis, and write hunt records.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; LAB_ASSETS/C08.

**Prerequisites:** Lessons L02-L04.

**Environment setup:** python make_dataset.py; python minisiem.py load.

**Explicit authorised scope:** synthetic dataset.

**Step-by-step instructions:**

1. Run python hunt.py.
2. Change H1 thresholds (n >= 5; CV < 0.5) and record what new candidates appear and why they are or are not suspicious.
3. Add H4: "accounts created on any host outside IT working hours (03:00-12:30Z)" using events 4720/4732.
4. Write a hunt record (L04 structure) for each hunt, including H3's data limitation.

**Expected observations:** with looser thresholds, benign series such as maps.example.net (CV 0.345) appear; H4 finds svc_update at 07:02Z - inside working hours, so the hypothesis as written misses it - a lesson in hypothesis design.

**Troubleshooting:** if timestamps fail to parse on older Python, keep the "Z" replacement.

**Cleanup:** none.

**Learning outcome:** you can run, extend and record hunts.

## Practical 2: Write the case record and shift report

------------------------------------------------------------

**Objective:** Produce CASE-0001 documentation and a shift report.

**Difficulty:** Intermediate.

**Required tools:** text editor; outputs from Modules 3-8.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none.

**Explicit authorised scope:** synthetic case.

**Step-by-step instructions:**

1. Write the case record using the L05 structure, with the full UTC timeline from 06:12Z to 08:17Z.
2. Mark each statement as fact or hypothesis.
3. Write your own shift report (do not copy the example) in under 300 words.
4. Exchange with a peer and ask them to list any question your documents leave unanswered.

**Expected observations:** a complete timeline has at least nine entries (download, PowerShell, beacon start/end, spray, VPN success, 4720, 4732, upload, log clear).

**Troubleshooting:** if timeline entries conflict, re-query minisiem and check time zones.

**Cleanup:** none.

**Learning outcome:** you can document work for others.
