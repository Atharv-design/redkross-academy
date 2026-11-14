Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A manager wants "100% ATT&CK coverage" by the end of the quarter.

**Task:** Respond with a realistic, measurable alternative.

> [!TIP] Model answer
> Explain that full coverage is neither achievable nor meaningful, because techniques vary in detectability and one rule rarely covers a technique.
>
> **Propose instead:** a threat-informed list of 20-30 priority techniques; a target of score 3 on, say, 80% of them across at least 90% of the relevant fleet; a purple-team detection rate target; and a false-positive budget. Report monthly with the denominators shown.
>
> **Lesson:** measurable, threat-informed targets beat vanity percentages.

## Scenario 2

DNS logs are kept for 30 days. Your incident history shows that intrusions are typically discovered 60-90 days after initial access.

**Task:** Recommend a change and justify its cost.

> [!TIP] Model answer
> Retention shorter than the typical time to discovery means the evidence of initial access is gone before anyone looks. Extend DNS retention to at least the discovery window plus a margin (for example 12 months), using cheaper cold storage for older data with a documented retrieval time. Check legal obligations (for example the CERT-In 180-day requirement for logs in scope). Estimate the cost from daily volume, and compare it with the cost of an investigation that cannot establish scope.
>
> **Lesson:** retention is set by investigation needs and law, not by default.

## Scenario 3

A vendor offers a product that "covers 400 ATT&CK techniques".

**Task:** List the questions you would ask before believing the claim.

> [!TIP] Model answer
> **Ask the vendor:** which ATT&CK version; what "cover" means (any alert, prevention or a tested detection); what telemetry each detection needs and whether you collect it; the false-positive rates; whether independent test results exist; how the mapping is kept current when ATT&CK changes; and whether you can see and test the logic. Then validate a sample with your own purple-team replay before purchase.
>
> **Lesson:** coverage claims need definitions and evidence.
