> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C20_Lab_Kit.zip](/downloads/labs/RedKross_C20_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C20/...` refer to the extracted `C20` folder. Everything runs locally against systems you own.

## Practical 1: Release the pack and break it on purpose

**Objective:** Release the tuned pack, then show that each gate blocks a bad change.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+ with PyYAML; LAB_ASSETS/C20.

**Prerequisites:** Lessons L02-L04.

**Environment setup:** python make_telemetry.py; delete any old pack/ folder.

**Explicit authorised scope:** lab files only.

**Step-by-step instructions:**

1. Run the deep-dive command and keep pack/manifest.txt.
2. In separate copies of detections/tuned, make one change per run: (a) change EventID 1102 to 1103 in the log-cleared rule; (b) delete that rule's attack.t1685.005 tag line; (c) remove '\pwsh.exe' from the Office rule and pass detections/tuned (the released pack) as PREVIOUS_RULE_DIR; (d) empty BUDGET_EXCEPTIONS in a copy of build_pack.py.
3. For each run, record every failing gate and its message.
4. Release the unmodified pack again and confirm the manifest matches step 1.

**Expected observations (execution-tested):** (a) fails G1 ("18 cases, 1 failed") and also G3 ("regressed: PT-08"), because one bug can trip several gates; (b) fails G2 ("untagged: rk_security_log_cleared.yml"); (c) fails G3 ("detected 7/8 (previous 8/8); regressed: PT-06"); (d) fails G4. Every failure ends "RELEASE BLOCKED" with exit=1, and a blocked run leaves pack/ unchanged. The re-released manifest is identical to step 1.

**Troubleshooting:** if (c) is RELEASED, you compared against detections/rules. The baseline pack also missed PT-06, so losing it is not a regression against the baseline. Run (c) in a copy, because a successful run overwrites pack/.

**Cleanup:** delete copies and pack/.

**Learning outcome:** you can trust and explain your release gates.

## Practical 2: Executive summary from evidence

**Objective:** Write a one-page executive summary of the Tamarind incident and the detection programme.

**Difficulty:** Advanced.

**Required tools:** text editor; outputs from Modules 1-8.

**Prerequisites:** Lesson L05.

**Environment setup:** none.

**Explicit authorised scope:** fictional organisation.

**Step-by-step instructions:**

1. Summarise what happened on 2026-11-03 in four sentences without technique IDs.
2. State impact and confidence (for example, Q4 finance files were probably archived and sent out; confidence moderate, based on the archive command and a 312 MB outbound flow).
3. List what was done and what is planned.
4. Ask for one decision, with options (for example funding Security event forwarding to all workstations, with cost and risk reduction).
5. Give two metrics with denominators for the next quarter.

**Expected observations:** a page that a non-specialist can act on, where every claim traces to an output file.

**Troubleshooting:** if a sentence cannot be traced to evidence, remove it or label it as an assumption.

**Cleanup:** none.

**Learning outcome:** you can communicate detection engineering to leadership.
