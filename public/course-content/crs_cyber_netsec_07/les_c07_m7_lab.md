> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C07_Lab_Kit.zip](/downloads/labs/RedKross_C07_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C07/...` refer to the extracted `C07` folder. Everything runs locally against systems you own.

## Practical 1: Analyse the lab telemetry and plan containment

**Objective:** Detect the attack patterns in the lab flow telemetry and propose network-layer containment for each.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C07 (flowcheck.py, make_flows.py, data/flows.jsonl).

**Prerequisites:** Lessons L01-L05.

**Environment setup:** run python make_flows.py then python flowcheck.py (offline).

**Explicit authorised scope:** offline telemetry only.

**Step-by-step instructions:**

1. Run flowcheck.py and record the top talkers, scan, beacon and segmentation violations.
2. Identify that the scanning source and the beacon destination are the same external host, and explain why that matters.
3. For the scan, the beacon and the user->db violation, propose a network-layer containment action.
4. Explain how segmentation limited the damage from the compromised workstation.
5. State what evidence you would preserve.

**Expected observations (execution-tested):** 1 scan, 1 beacon (~60s), 3 segmentation violations; scanning source = beacon destination (203.0.113.50); containment per signal.

**Troubleshooting:** if no signals appear, regenerate telemetry with make_flows.py.

**Cleanup:** none.

**Learning outcome:** you can analyse flow telemetry and plan containment.

## Practical 2: Packet capture versus flow - choose the tool

**Objective:** Decide when to use flow telemetry versus packet capture.

**Difficulty:** Intermediate.

**Required tools:** this module.

**Prerequisites:** Lessons L01-L02.

**Environment setup:** none.

**Explicit authorised scope:** design exercise only.

**Step-by-step instructions:**

1. For each of: detecting beaconing across the whole network; investigating exactly what one suspicious connection sent; spotting a scan - choose flow or packet capture and justify.
2. List the flow-record fields you would rely on for each network detection.
3. Explain the privacy and storage advantages of flow telemetry.
4. State one limitation of flow telemetry.

**Expected observations:** flow for broad pattern detection; packet capture for targeted deep investigation.

**Troubleshooting:** if you chose packet capture for whole-network monitoring, reconsider the scale/privacy cost.

**Cleanup:** none.

**Learning outcome:** you can choose the right network visibility tool for the task.
