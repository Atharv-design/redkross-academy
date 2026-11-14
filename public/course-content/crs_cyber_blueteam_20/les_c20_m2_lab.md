> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C20_Lab_Kit.zip](/downloads/labs/RedKross_C20_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C20/...` refer to the extracted `C20` folder. Everything runs locally against systems you own.

## Practical 1: Investigate WS-07

**Objective:** Rebuild the WS-07 process tree, join it with identity events and write a timeline.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; LAB_ASSETS/C20.

**Prerequisites:** Lessons L02-L04.

**Environment setup:** python make_telemetry.py (creates tamarind_telemetry.jsonl).

**Explicit authorised scope:** synthetic dataset only.

**Step-by-step instructions:**

1. Run: python proctree.py WS-07
2. List the five flagged edges and map each one to an ATT&CK technique.
3. Write a UTC timeline of at least ten lines from 10:41 to 12:40, giving the source of each line (sysmon, security, dns or flow). Use tamarind_telemetry.jsonl for the DNS and flow lines.
4. Mark each inference explicitly.
5. Run python proctree.py ADM-01 and explain why its PowerShell activity is not flagged and whether it should be.

**Expected observations:** five flagged edges on WS-07; svc-print failures and success at 12:10-12:11; 1102 at 12:40; ADM-01 shows explorer -> PowerShell running inventory scripts with no flagged edges.

**Troubleshooting:** "No such file" - run make_telemetry.py in the same folder.

**Cleanup:** none.

**Learning outcome:** you can build an evidence-backed endpoint timeline.

## Practical 2: Plan endpoint containment

**Objective:** Write a containment plan for WS-07 and svc-print.

**Difficulty:** Advanced.

**Required tools:** text editor.

**Prerequisites:** Lesson L05; P1 completed.

**Environment setup:** none.

**Explicit authorised scope:** written plan for the fictional estate; no actions on real systems.

**Step-by-step instructions:**

1. List the actions in order, with the reason for each and the evidence to collect first.
2. State who must approve each action.
3. Identify one business impact (for example, printing stops when svc-print is reset) and how you will manage it.
4. Define how you will confirm that containment worked.

**Expected observations:** a plan that preserves evidence, contains both host and identity, and includes verification (no further beacons from 10.20.1.17; no svc-print logons).

**Troubleshooting:** if your plan starts with "reimage", reconsider evidence needs.

**Cleanup:** none.

**Learning outcome:** you can choose proportionate endpoint response controls.
