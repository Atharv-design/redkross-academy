> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C08_Lab_Kit.zip](/downloads/labs/RedKross_C08_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C08/...` refer to the extracted `C08` folder. Everything runs locally against systems you own.

## Practical 1: Write searches and a correlation rule

-----------------------------------------------------------

**Objective:** Use minisiem to answer questions and correlate events.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; LAB_ASSETS/C08 (loaded DB).

**Prerequisites:** Lessons L04-L05.

**Environment setup:** python minisiem.py load.

**Explicit authorised scope:** synthetic dataset.

**Step-by-step instructions:**

1. Find all events for 203.0.113.66 across sources.
2. Count proxy bytes_out per host; find the largest single upload.
3. Write a correlation query joining the Sysmon event R1 to proxy events on the same host within 10 minutes before it (use julianday() or string comparison of ISO timestamps).
4. Add your query as a new rule R7 in minisiem.py and run python minisiem.py rules.

**Expected observations:** step 3 links the invoice.docm download (06:12) to PowerShell under WINWORD (06:14).

**Troubleshooting:** ISO timestamps compare correctly as strings only if they use the same format and zone.

**Cleanup:** none.

**Learning outcome:** you can correlate across sources.

## Practical 2: Normalise a new source

--------------------------------------------

**Objective:** Extend normalise_demo.py with a third format.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+; LAB_ASSETS/C08/normalise_demo.py.

**Prerequisites:** Lessons L02-L03.

**Environment setup:** copy the demo.

**Explicit authorised scope:** synthetic log lines.

**Step-by-step instructions:**

1. Write a parser for a CSV line "2026-11-03 12:20:05,WS-104,divya,DNS,QUERY,cdn-telemetry-sync.example" where the time is IST.
2. Output ECS-style fields (@timestamp UTC, host.name, user.name, dns.question.name).
3. Count and report lines that fail to parse.

**Expected observations:** 06:50:05Z after conversion.

**Troubleshooting:** use strptime with "%Y-%m-%d %H:%M:%S".

**Cleanup:** none.

**Learning outcome:** you can onboard a log source.
