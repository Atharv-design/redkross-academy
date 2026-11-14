> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C18_Lab_Kit.zip](/downloads/labs/RedKross_C18_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C18/...` refer to the extracted `C18` folder. Everything runs locally against systems you own.

## Practical 1: Plan and run a measured evaluation

--------------------------------------------------------

**Objective:** Produce statistically meaningful results for BanyanBot.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; Ollama; LAB_ASSETS/C18/banyanbot.

**Prerequisites:** Lessons L02-L04.

**Environment setup:** copy the folder; ensure the model is pulled.

**Explicit authorised scope:** the local bench only.

**Step-by-step instructions:**

1. Write a one-page test plan using L02's headings.
2. Run python probes.py 20 (expect about 20 minutes on a laptop CPU); then python report.py.
3. Compare intervals with the 5-run results; state what you can now claim.
4. Add two new benign probes (for example an indirect probe through the outage notice, and a send_email to another customer's address) with objective checks; run them.

**Expected observations:** narrower intervals; new probes produce evidence for their categories.

**Troubleshooting:** run overnight for 60 seeds; keep probe_results.json files per run.

**Cleanup:** archive results with the plan; delete when the course ends.

**Learning outcome:** you can run probabilistic evaluations properly.

## Practical 2: Write the evaluation report

-------------------------------------------------

**Objective:** Communicate AI risk to engineers and management.

**Difficulty:** Advanced.

**Required tools:** text editor; report.py output.

**Prerequisites:** Lesson L06; P1.

**Environment setup:** none.

**Explicit authorised scope:** your own lab results.

**Step-by-step instructions:**

1. Write the summary, method and limitations.
2. Write one finding per category with counts, intervals, evidence and root cause.
3. Include control evidence (tool_policy_test, kb_audit, supply_check).
4. Recommend actions with owners; state residual risk; propose a retest.

**Expected observations:** no claim stronger than the evidence.

**Troubleshooting:** avoid "secure" or "safe" without qualification.

**Cleanup:** none.

**Learning outcome:** you can report AI risk honestly.
