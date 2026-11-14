> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C08_Lab_Kit.zip](/downloads/labs/RedKross_C08_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C08/...` refer to the extracted `C08` folder. Everything runs locally against systems you own.

## Practical 1: Build a multi-source timeline

---------------------------------------------------

**Objective:** Produce a timeline for WS-104 and divya from all sources.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; LAB_ASSETS/C08 (loaded minisiem.db).

**Prerequisites:** Module 1 practical.

**Environment setup:** python minisiem.py load (if not done).

**Explicit authorised scope:** synthetic dataset.

**Step-by-step instructions:**

1. Run the two queries in section 3.
2. Add proxy events for WS-104 but exclude the six routine sites (use NOT IN with the intranet, mail, crm, news, maps and cdn domains).
3. Convert every timestamp to IST for a management copy (Python or by hand) while keeping the UTC column.
4. Write a 10-15 line timeline with source, UTC time, IST time, event and your interpretation.

**Expected observations:** a look-alike domain download, a regular "telemetry" domain and a large upload stand out after filtering.

**Troubleshooting:** SQLite string comparison is case-sensitive; use lower().

**Cleanup:** none.

**Learning outcome:** you can correlate events across sources by time and entity.

## Practical 2: Telemetry coverage map

--------------------------------------------

**Objective:** Assess which sources would detect which stages of an attack.

**Difficulty:** Intermediate.

**Required tools:** spreadsheet.

**Prerequisites:** Lessons L01-L03, L06.

**Environment setup:** none.

**Explicit authorised scope:** fictional organisation (Banyan Microfinance).

**Step-by-step instructions:**

1. List Banyan's telemetry sources (the four in the dataset plus DNS, EDR, cloud audit if they existed).
2. For each ATT&CK tactic (Course 01 Module 3 table), mark which sources could provide evidence.
3. Identify the three biggest gaps and propose sources to close them.

**Expected observations:** no DNS or EDR telemetry; no cloud audit logs.

**Troubleshooting:** use ATT&CK data source pages for ideas.

**Cleanup:** none.

**Learning outcome:** you can reason about visibility.
