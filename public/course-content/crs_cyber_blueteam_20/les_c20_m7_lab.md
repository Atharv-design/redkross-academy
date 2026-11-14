> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C20_Lab_Kit.zip](/downloads/labs/RedKross_C20_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C20/...` refer to the extracted `C20` folder. Everything runs locally against systems you own.

## Practical 1: Replay, tune and regress

**Objective:** Reproduce the gap analysis and lock the gains in with unit tests.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+ with PyYAML; LAB_ASSETS/C20.

**Prerequisites:** Lessons L03-L05.

**Environment setup:** python make_telemetry.py

**Explicit authorised scope:** synthetic events only; no technique is executed.

**Step-by-step instructions:**

1. python purple.py detections/rules detections/tuned
2. For each MISSED case, state the root cause in one line.
3. Add unit-test cases to a copy of detections/tests for PT-02, PT-03 and PT-06 (expect true), and one negative case: pwsh.exe -File tool.ps1 -env prod (expect false).
4. Run rk_sigma.py test against the tuned rules with your tests.
5. Add a case: powershell.exe -File tool.ps1 -e prod. Record the result and decide whether to accept the false positive or redesign the rule.

**Expected observations:** 5/8 versus 8/8; zero changed hit counts; the "-env" negative passes (" -e " does not appear); the "-e prod" case matches, which is the known false-positive source to document.

**Troubleshooting:** "rule ... not found" - the test file's rule name must match the rule file name without .yml.

**Cleanup:** delete your test copies.

**Learning outcome:** you can tune detections with evidence and without regressions.

## Practical 2: Migrate ATT&CK tags with revoked-by data

**Objective:** Write a script that finds revoked technique tags in a rule set and proposes replacements from MITRE's STIX data.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; internet access to download enterprise-attack.json from the mitre-attack/attack-stix-data repository (about 55 MB).

**Prerequisites:** Lesson L02.

**Environment setup:** download the file to a working folder.

**Explicit authorised scope:** public data and local files.

**Step-by-step instructions:**

1. Load the JSON; index attack-pattern objects by external ID; record revoked ones.
2. Index relationships with relationship_type "revoked-by".
3. Create a test rule tagged attack.t1070.001 and attack.t1562.001.
4. Print each revoked tag with its replacement and the replacement's tactic.

Expected observations (from the 20.1 data, 2026-11-07): T1070.001 -> T1685.005 Clear Windows Event Logs (defense-impairment); T1562.001 -> T1685 Disable or Modify Tools (defense-impairment).

**Troubleshooting:** if nothing is revoked, check that you are reading the current file and including revoked objects.

**Cleanup:** delete the downloaded file if space matters.

**Learning outcome:** you can maintain ATT&CK mappings across versions.
