Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A developer marks an XSS finding fixed after encoding the search output, but the stored review output is still unencoded.

**Task:** Explain why the finding is not closed and what to do.

> [!TIP] Model answer
> The finding is not closed because the root cause - unencoded output - still exists at the stored-review sink; XSS was fixed in one place but not everywhere. A retest of the stored-XSS check would still show it PRESENT. What to do: encode output at every sink (search and reviews and any other), re-run the XSS checks, and only mark the finding closed when the retest shows all XSS sinks absent. Verify the pattern across the codebase.
>
> **Lesson:** fix the root cause at every instance; a finding is closed only when retest confirms all of it.

## Scenario 2

A client asks why your report is ten ranked findings when a scanner reported three hundred issues.

**Task:** Justify the validated, ranked approach.

> [!TIP] Model answer
> The scanner's three hundred are mostly unvalidated and unranked, with false positives and missed logic flaws; acting on them wastes the team's time and buries real issues. The ten are VALIDATED (confirmed safely with evidence), RANKED by CVSS and context, and each has a concrete fix - so the team can act in priority order and verify closure. A short, validated, actionable report reduces more risk than a long unvalidated one.
>
> **Lesson:** validated, ranked, evidenced findings beat raw scanner volume.

## Scenario 3

You must prioritise remediation for a small team.

**Task:** Describe how you order the lab's ten findings and where context matters.

> [!TIP] Model answer
> **Order by CVSS first:** SQL injection (9.8) and broken /admin (8.2), then the two 7.5 High findings (path traversal, SSRF), then the Mediums (IDOR, CSRF, XSS, weak session), then the Low (headers). Then adjust for context: the injection and access-control findings expose customer data directly and are internet-reachable in a real deployment, so weight them even higher; a Low like missing headers is quick to fix and can be batched. Group fixes that share a root cause (encode all output once; parameterise all queries).
>
> **Lesson:** prioritise by CVSS plus exposure, data sensitivity and exploitability; batch shared-root-cause fixes.
