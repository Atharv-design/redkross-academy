> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C13_Lab_Kit.zip](/downloads/labs/RedKross_C13_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C13/...` refer to the extracted `C13` folder. Everything runs locally against systems you own.

## Practical 1: Harden the lab domain with evidence

**Objective:** Apply the hardening checklist and capture before/after evidence.

**Difficulty:** Advanced.

**Required tools:** the running rk-dc container; dir_review.py; auth_monitor.py.

**Prerequisites:** Lessons L01-L04; Modules 3-7.

**Environment setup:** ensure setup_domain.sh has run and telemetry is captured.

**Explicit authorised scope:** your own contained lab only.

**Step-by-step instructions:**

1. Capture the BEFORE state: save dir_review.py output and exit code, and auth_monitor.py output.
2. Apply at least three hardening changes from L02 (for example: remove the legacy-svc SPN or move it to a gMSA; disable the dormant account; confirm Guest is disabled), each with the command run.
3. Capture the AFTER state: re-export, re-run both tools, save output and the new exit code.
4. Build a closure table (before, action, after, evidence) for each change.

**Expected observations (execution-tested arc):** the HIGH Kerberoastable finding closes and the exit code changes from 1 toward 0 as HIGH findings are removed; activity stays all-AES.

**Troubleshooting:** if a finding persists, confirm the change took effect (samba-tool spn list / user show) and that you re-exported the LDIF.

**Cleanup:** optionally re-run setup_domain.sh to restore the teaching state for others.

**Learning outcome:** you can harden a directory and evidence each change.

## Practical 2: Write the audit report

**Objective:** Produce a complete audit report for the hardened lab.

**Difficulty:** Advanced.

**Required tools:** the evidence from P1; a text editor.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none.

**Explicit authorised scope:** lab evidence only.

**Step-by-step instructions:**

1. Write the report using the L05 structure: scope/authorisation, method, before-findings, actions with evidence, after-findings/closure, residual risk and forward plan.
2. Put raw tool output in an appendix; keep the body in risk terms.
3. State at least three residual/forward items (PAW separation, a second DC, LAPS on member hosts) with the control each implements.
4. Write a one-paragraph executive summary leading with the risk picture and the quick wins delivered.

**Expected observations:** a report a technical reviewer could verify from the appendix and leadership could act on from the summary.

**Troubleshooting:** if the report reads as tool output, rewrite findings in business-risk terms and move raw output to the appendix.

**Cleanup:** none.

**Learning outcome:** you can produce an evidence-backed identity audit report.
