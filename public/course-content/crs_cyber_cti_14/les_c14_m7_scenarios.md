Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Two analysts mapped the same paragraph to different techniques.

**Task:** Describe how to resolve it.

> [!TIP] Model answer
> Return to the source text and the evidence; each analyst explains the behaviour they saw and the ATT&CK definition they applied. If the text is ambiguous, map at the level both agree (sub-technique, technique or tactic) and note the ambiguity; if one misread, correct and record why. Use the disagreement to improve team mapping guidance.
>
> **Lesson:** map from evidence, review in pairs, document ambiguity.

## Scenario 2

The budget allows one telemetry investment this year.

**Task:** Use the lab output to argue for one.

> [!TIP] Model answer
> For example Network Traffic Content (full proxy logs with URLs): it is missing for T1041 and T1566.002, would have allowed the payload URL to match in Module 5, and supports investigation of the confirmed contact. Alternatively Module Load (T1059.001, T1560.001). Compare cost, number of techniques improved, relevance to the active campaign, and the investigation value; recommend one with the acceptance test.
>
> **Lesson:** choose the investment that closes the most relevant gaps.

## Scenario 3

A partner shares a 2023 mapping of a campaign using Defense Evasion techniques.

**Task:** Explain how to merge it with your 20.1 analysis.

> [!TIP] Model answer
> Resolve every technique identifier against 20.1: follow revoked-by relationships, map retired tactic references to Stealth or Defense Impairment according to the techniques' current tactics, and keep the original identifiers and version as provenance. Re-check the evidence for each mapping, since the meaning of some techniques changed. Then merge with your list, noting which mappings came from the partner and their confidence.
>
> **Lesson:** resolve, keep provenance, re-check evidence.
