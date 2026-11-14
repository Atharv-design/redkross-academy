Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Leadership asks for "a hunt for Volt Typhoon" after the advisory.

**Task:** Plan it.

> [!TIP] Model answer
> Translate the advisory into specific hypotheses (unusual VPN login frequency/duration, NTDS.dit copying via ESENT events, unexpected files in C:\windows\temp\ and C:\users\public\, LOTL tool usage patterns); check data requirements and retention (years of dwell time); prioritise critical assets; run, record outcomes and gaps; convert findings to detections; report results with confidence levels.
>
> **Lesson:** hunts start from specific, data-backed hypotheses.

## Scenario 2

A colleague's case notes say "malware confirmed, contained, done".

**Task:** Improve them.

> [!TIP] Model answer
> **Add:** which malware and how confirmed (evidence, hashes); affected entities; UTC timeline; containment actions with approver and time; evidence locations; notifications; root cause; remaining risks; follow-ups; closure disposition.
>
> **Lesson:** write for someone who was not there.

## Scenario 3

Your hunt finds a host beaconing regularly to a software vendor's update server.

**Task:** Decide the outcome.

> [!TIP] Model answer
> **Validate:** is the destination legitimately the vendor (DNS, certificate, process making the request, signed binary)? If confirmed benign, record as benign with evidence and add to the hunt's reviewed allowlist with a review date; if the process or certificate is unexpected, escalate.
>
> **Lesson:** regular is not malicious - verify then record.
