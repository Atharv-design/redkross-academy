> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C07_Lab_Kit.zip](/downloads/labs/RedKross_C07_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C07/...` refer to the extracted `C07` folder. Everything runs locally against systems you own.

## Practical 1: Reason about the lab's detections and thresholds

**Objective:** Understand why the lab's scan and beacon fire while normal traffic does not, and how thresholds tune the detector.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C07 (flowcheck.py, make_flows.py, data/flows.jsonl).

**Prerequisites:** Lessons L02-L06.

**Environment setup:** run python make_flows.py then python flowcheck.py (offline).

**Explicit authorised scope:** offline telemetry only.

**Step-by-step instructions:**

1. Run flowcheck.py and record the scan and beacon it reports.
2. In flowcheck.py, find the SCAN_PORT_THRESHOLD, SCAN_WINDOW, BEACON_MIN_HITS and BEACON_JITTER constants.
3. Explain why normal web traffic (many contacts to port 443) is NOT flagged as a scan, and why jittered internal traffic is NOT flagged as a beacon.
4. Predict what happens if you lower the scan threshold to 2 ports (do not need to run): more false positives.
5. Classify each detector as signature- or anomaly-based.

**Expected observations (execution-tested):** one scan (60 ports in 59s) and one beacon (~60s interval); normal traffic not flagged; both detectors are anomaly-based.

**Troubleshooting:** if nothing is detected, regenerate telemetry with make_flows.py.

**Cleanup:** none.

**Learning outcome:** you can reason about behavioural detection and threshold tuning.

## Practical 2: Tune to reduce false positives

**Objective:** Apply tuning concepts to a noisy-alert scenario.

**Difficulty:** Intermediate.

**Required tools:** this module; CS2.

**Prerequisites:** Lessons L04-L05.

**Environment setup:** none.

**Explicit authorised scope:** design exercise only.

**Step-by-step instructions:**

1. Given hundreds of daily "port scan" alerts from an authorised internal scanner, write three tuning actions to cut the noise.
2. Write one higher-priority rule for the context that matters (external source to a sensitive zone).
3. Explain the false-positive/false-negative trade-off of raising the scan threshold.
4. State one metric you would track to measure alert quality.

**Expected observations:** suppression of known-benign sources, environment-tuned thresholds, prioritised high-value alerts, and a quality metric.

**Troubleshooting:** if your tuning suppresses external scans too, it is too broad.

**Cleanup:** none.

**Learning outcome:** you can tune detection to produce actionable alerts.
