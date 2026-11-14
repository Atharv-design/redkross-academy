Purple teaming combines red (offensive emulation) and blue (detection and response) into one collaborative exercise aimed at improving detection. Rather than a red team testing a blue team adversarially and reporting a score, purple teaming:

```text
emulates a technique (red), with the blue team watching;
measures whether the blue team detected it;
diagnoses WHY a miss happened (no telemetry, no rule, mis-tuned rule);
fixes it and re-emulates to confirm.
```

The "purple" is the collaboration: red and blue share the plan, the ATT&CK mapping and the results. The outcome is measured detection improvement, not a win/loss. The lab's purple.py performs the measurement - plan versus detections - and produces the gaps and retests.
