> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C22_Lab_Kit.zip](/downloads/labs/RedKross_C22_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C22/...` refer to the extracted `C22` folder. Everything runs locally against systems you own.

## Practical 1: Review and fix the monitoring architecture

----------------------------------------------------------------

**Objective:** Use resilience_review.py to bring the design to PASS.

**Difficulty:** Specialization.

**Required tools:** Python 3.10+; LAB_ASSETS/C22/resilience_review.py, telemetry_arch.json.

**Prerequisites:** Lessons L01-L05.

**Environment setup:** copy the files to a working folder.

**Explicit authorised scope:** the fictional JSON design only; no live systems.

**Step-by-step instructions:**

1. Run python resilience_review.py telemetry_arch.json; record the 16 findings and exit code 1.
2. Edit a copy of the file to implement the deep-dive design; rerun until the summary shows 0 findings and exit code 0. Compare with telemetry_arch_fixed.json.
3. Add a check of your own: every source must declare an owner; restricted resources must have break-glass use alerting.
4. Write one paragraph per HIGH finding explaining the risk to a manager.

**Expected observations:** 16 findings (7 HIGH) before; 0 after.

**Troubleshooting:** JSON errors usually mean a missing comma or quote.

**Cleanup:** delete your working copies.

**Learning outcome:** you can review logging and resilience designs as code.

## Practical 2: Test continuous-verification signals

----------------------------------------------------------

**Objective:** Prove that each monitoring signal fires on the condition it is designed for and stays silent otherwise.

**Difficulty:** Specialization.

**Required tools:** Python 3.10+; make_decision_log.py, decision_monitor.py.

**Prerequisites:** Lesson L02.

**Environment setup:** copy both scripts.

**Explicit authorised scope:** synthetic, locally generated telemetry only.

**Step-by-step instructions:**

1. Run python make_decision_log.py then python decision_monitor.py and confirm the five alerts M1-M5.
2. In the generator, add a revocation for session s901 within five minutes of the posture event; rerun and confirm M5 disappears.
3. Add a second policy change with a ticket and confirm no new M3 alert.
4. Write a one-page runbook for each signal: owner, triage questions, containment action, closure evidence.

**Expected observations:** each change removes or adds exactly the alert you expect.

**Troubleshooting:** the generator is deterministic (seed 22); if counts differ, check that you edited the copy you are running.

**Cleanup:** delete generated decision_log.jsonl files.

**Learning outcome:** you can test monitoring the way you test code.
