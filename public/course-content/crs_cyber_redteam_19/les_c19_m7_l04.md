Detection-gap analysis compares what was emulated with what was detected:

| Term | Meaning |
|---|---|
| for each technique | did a detection fire? If yes, record the alert (coverage). If no, record the gap and what was needed (the data source and detection). |
| diagnose | classify the gap (telemetry vs rule vs tuning) to know the fix. |
| output | a coverage figure and a prioritised gap list with the detection to build for each. |

This is the analytical heart of purple teaming: it converts the exercise into a specific, actionable improvement backlog. The lab's purple.py does exactly this - it reads the emulation plan and the blue-team telemetry and reports, per technique, DETECTED (with the alert) or GAP (with the detection needed), then a coverage figure and a retest list. The deep dive runs it.
