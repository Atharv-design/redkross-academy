> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C13_Lab_Kit.zip](/downloads/labs/RedKross_C13_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C13/...` refer to the extracted `C13` folder. Everything runs locally against systems you own.

## Practical 1: Generate and detect an authentication burst

**Objective:** Produce authentication telemetry and detect a failed-logon burst.

**Difficulty:** Advanced.

**Required tools:** the running rk-dc container; auth_monitor.py; Python 3.

**Prerequisites:** Lessons L02-L04.

**Environment setup:** ensure rk-dc is running and setup_domain.sh has run.

**Explicit authorised scope:** your own lab container only. Generate failed logons only against your own lab accounts.

**Step-by-step instructions:**

1. Generate a few successful logons and a short burst of failures for one lab account (wrong password for asha, several times), as the lab setup does; then snapshot docker logs rk-dc to data/auth_audit.jsonl (one JSON object per line).
2. python auth_monitor.py data/auth_audit.jsonl ; read the summary table and findings.
3. Re-run with --fail-threshold 4 and observe the burst finding appear.
4. Record the status breakdown (how many NT_STATUS_OK versus NT_STATUS_WRONG_PASSWORD) and which encryption type every event used.

**Expected observations (execution-tested):** the summary and findings in section 3; AES256 everywhere; the burst for asha fires at threshold 4, not 5.

**Troubleshooting:** if no events appear, confirm the DC runs in the foreground (so JSON goes to docker logs) and that auditing is enabled.

**Cleanup:** none; keep the dataset for Module 7.

**Learning outcome:** you can produce identity telemetry and tune a detection to catch a burst.

## Practical 2: Investigate and write up an alert

**Objective:** Run a disciplined investigation of one alert and document it.

**Difficulty:** Advanced.

**Required tools:** data/auth_audit.jsonl; auth_monitor.py.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none.

**Explicit authorised scope:** lab data only.

**Step-by-step instructions:**

1. Take the asha burst as your alert. Scope it: account, source, window, count.
2. Baseline it: from the data, is asha's normal pattern consistent with this (same source, AES)?
3. Corroborate: was there a success after the failures, from which source, with which encryption type? Any Tier 0 involvement?
4. Decide benign/suspicious/confirmed and justify it; state what would have changed your decision (for example a success from a NEW source).
5. Write a five-line investigation note (scope, baseline, corroboration, decision, action).

**Expected observations:** a defensible benign conclusion with the explicit escalation trigger (new-source success), mirroring CS2.

**Troubleshooting:** if you cannot tell the source, remember some failed events omit a source; note that as a data gap.

**Cleanup:** none.

**Learning outcome:** you can investigate an identity alert and record a supported conclusion.
