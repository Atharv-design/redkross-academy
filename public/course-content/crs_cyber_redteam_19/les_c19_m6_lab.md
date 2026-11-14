> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C19_Lab_Kit.zip](/downloads/labs/RedKross_C19_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C19/...` refer to the extracted `C19` folder. Everything runs locally against systems you own.

## Practical 1: Map C2 indicators and containment

**Objective:** Produce the detection/containment map for the C2 technique.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C19 (attackmap.py, data/emulation_plan.json).

**Prerequisites:** Lessons L01-L05.

**Environment setup:** offline; no C2 is run.

**Explicit authorised scope:** the provided plan file only.

**Step-by-step instructions:**

1. Run attackmap.py with --tactic "Command and Control".
2. Record the data source, detection and containment for T1071.
3. Explain why detection is behavioural (beaconing), not protocol blocking.
4. Explain how egress filtering and proxy inspection contain C2.
5. Note the lab's safety control (beacon to a lab sink, no real egress).

**Expected observations (execution-tested):** T1071 mapped to network/proxy telemetry, a beacon detection and egress/proxy containment.

**Troubleshooting:** ensure the tactic name is quoted exactly.

**Cleanup:** none.

**Learning outcome:** you can turn C2 into network indicators and containment.

## Practical 2: Design C2 detection and containment

**Objective:** Design a C2 detection-and-containment capability for a lab network.

**Difficulty:** Advanced.

**Required tools:** this module; Course 07 flow-analysis concept.

**Prerequisites:** Lessons L02-L06.

**Environment setup:** none (design/plan) for your own isolated range.

**Explicit authorised scope:** your own lab network; design only.

**Step-by-step instructions:**

1. List the C2 network indicators to detect (periodicity, destination, anomaly).
2. Describe a beacon-detection approach over flow/proxy telemetry (interval analysis).
3. Define the egress-control and proxy architecture that would contain C2.
4. State how you would emulate the indicator safely (lab sink, no real egress) to test the detection.
5. State the authorisation and isolation rules.

**Expected observations:** a C2 detection-and-containment design plus a safe indicator-only emulation plan.

**Troubleshooting:** if an emulation step would reach a real destination, re-scope to a lab sink.

**Cleanup:** none.

**Learning outcome:** you can design C2 detection and containment and test it safely.
