> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C20_Lab_Kit.zip](/downloads/labs/RedKross_C20_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C20/...` refer to the extracted `C20` folder. Everything runs locally against systems you own.

## Practical 1: Build and read the coverage matrix

**Objective:** Run the coverage calculator and write a prioritised engineering backlog from it.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+ with PyYAML; LAB_ASSETS/C20.

**Prerequisites:** Lessons L03-L05.

**Environment setup:** in LAB_ASSETS/C20 run python make_telemetry.py (the dataset is used in later modules) and confirm detections/rules exists.

**Explicit authorised scope:** fictional inventory and lab files only.

**Step-by-step instructions:**

1. Run: python coverage.py
2. Record the coverage score and the rows marked with an asterisk.
3. For each row with a score below 3, write one backlog item: problem, fix, owner role, effort (S/M/L), expected score after the fix.
4. Edit TELEMETRY so that "security" lists all 16 hosts, re-run, and compare. Explain why the numeric score did not change but real coverage did.
5. Rank your backlog and justify the top item in three sentences.

**Expected observations:** score 26/33 (79%); T1547.001 blind; T1110.003 and T1041 visible; three asterisked rows. After step 4 the asterisks disappear but the score is unchanged, because the scoring has no fleet weighting.

**Troubleshooting:** "No module named yaml" - pip install pyyaml.

**Cleanup:** restore coverage.py (or re-extract it) after step 4.

**Learning outcome:** you can turn coverage data into engineering priorities.

## Practical 2: Write a telemetry specification

**Objective:** Specify one telemetry source to the standard of Lesson L03.

**Difficulty:** Advanced.

**Required tools:** text editor.

**Prerequisites:** Lesson L03; reference [R2].

**Environment setup:** none.

**Explicit authorised scope:** design exercise for the fictional Tamarind estate.

**Step-by-step instructions:**

1. Choose Windows Security events from all workstations.
2. Specify: event IDs and the reason for each (at least 4624, 4625, 4698 and 1102); required fields; collection method; buffering; hot and cold retention; time handling; who may clear or alter logs; and how a silent host is detected.
3. Estimate daily volume, assuming 300 events per workstation per day.
4. State one risk the specification accepts and why.

**Expected observations:** a one-page specification with a measurable health check (for example "no events from a host for 30 minutes during working hours raises a ticket").

**Troubleshooting:** if you cannot justify an event ID, remove it.

**Cleanup:** none.

**Learning outcome:** you can specify telemetry as a requirement, not a hope.
