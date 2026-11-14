Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

An emulated technique produced no alert.

**Task:** Explain the gap analysis and what you do next.

> [!TIP] Model answer
> No alert is a detection GAP. In gap analysis you record the technique, the telemetry and the detection that were needed, and diagnose why it missed (no telemetry, no rule, or a mis-tuned rule). Next: engineer the missing telemetry/detection, then re-emulate the same technique in the isolated range to confirm the detection now fires. The gap is not closed until the re-emulation is detected.
>
> **Lesson:** a miss is a diagnosed gap to engineer and then confirm by retesting.

## Scenario 2

A manager wants a single "red team won/lost" score.

**Task:** Explain why purple teaming reports coverage and gaps instead.

> [!TIP] Model answer
> A win/lost score hides the useful information. Purple teaming reports COVERAGE (detected / emulated) and a prioritised GAP list because the goal is measurable improvement: it shows exactly which techniques are detected, which are not, and what to build for each. That drives a concrete backlog and lets coverage be tracked over time, which a single score cannot.
>
> **Lesson:** report coverage and gaps - an actionable measurement, not a scoreboard.

## Scenario 3

A detection that passed last quarter now misses the technique.

**Task:** Explain what this shows and the practice that catches it.

> [!TIP] Model answer
> **It shows DETECTION DRIFT:** environments and rules change, so a detection that worked can silently break. The practice that catches it is continuous validation - regularly re-emulating key techniques in the isolated range to confirm detections still fire, so regressions are caught early rather than discovered during a real incident.
>
> **Lesson:** detections drift; re-emulate key techniques continuously to catch regressions.
