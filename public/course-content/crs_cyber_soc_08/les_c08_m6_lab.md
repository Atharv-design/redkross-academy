> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C08_Lab_Kit.zip](/downloads/labs/RedKross_C08_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C08/...` refer to the extracted `C08` folder. Everything runs locally against systems you own.

## Practical 1: Write, test and convert a Sigma rule

----------------------------------------------------------

**Objective:** Create a Sigma rule for local account creation and convert it.

**Difficulty:** Intermediate.

**Required tools:** Python 3.10+ virtual environment with sigma-cli and pysigma-backend-splunk; LAB_ASSETS/C08.

**Prerequisites:** Lessons L03-L04.

**Environment setup:** python -m venv sigvenv; activate it; pip install sigma-cli pysigma-backend-splunk.

**Explicit authorised scope:** rule files on your machine; no target systems.

**Step-by-step instructions:**

1. Copy rk_security_log_cleared.yml to rk_local_account_created.yml.
2. Change title, id (new UUID), description, EventID to 4720, tags to attack.persistence and attack.t1136.001, false positives to "IT provisioning".
3. Run sigma check and fix any issue.
4. Convert to Splunk with and without a pipeline (if one applies to your data) and compare outputs.
5. Add a matching test to test_rules.py for R3 (event 4720 matches, 4624 does not) and run python -m unittest test_rules -v.

**Expected observations:** check reports no issues; conversion shows EventID=4720; 8 tests pass.

**Troubleshooting:** YAML indentation errors - use spaces, not tabs.

**Cleanup:** deactivate the venv; delete it if no longer needed.

**Learning outcome:** you can deliver a tested, portable detection.

## Practical 2: ATT&CK coverage review

--------------------------------------------

**Objective:** Assess Banyan coverage.

**Difficulty:** Intermediate.

**Required tools:** the mapping table in L05; optional ATT&CK Navigator (web).

**Prerequisites:** Lesson L05.

**Environment setup:** none.

**Explicit authorised scope:** documentation exercise.

**Step-by-step instructions:**

1. For each technique in the table, record: data source collected? rule exists? tested?
2. Identify the technique with data but no tested rule, and the one with no data.
3. Propose two new detections and their data requirements.

**Expected observations:** initial access by phishing has proxy data but no dedicated rule (R1 catches the next step); file hashes are not collected.

**Troubleshooting:** if Navigator is unavailable, use a spreadsheet.

**Cleanup:** none.

**Learning outcome:** you can find and prioritise detection gaps.
