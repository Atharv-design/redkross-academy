Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

After a vendor update, brute-force alerts drop to zero.

**Task:** Investigate and prevent recurrence.

> [!TIP] Model answer
> Check ingestion and parse-error rates for the source; compare raw events before and after the update; fix the parser; backfill/re-parse affected data; review the gap period manually; add parse-failure and "rule fired zero times in N days" health alerts; require change notice for log format changes.
>
> **Lesson:** silence can be failure.

## Scenario 2

Management wants "one dashboard showing whether we are under attack".

**Task:** Respond and propose dashboards.

> [!TIP] Model answer
> No single dashboard can prove safety. Propose: alert queue by severity/age; critical detections in last 24 h; log-source health; identity risk (MFA failures, spray detections); outbound data anomalies; patch status of exposed systems; each with owner and action; plus narrative briefings.
>
> **Lesson:** dashboards support decisions, not certainty.

## Scenario 3

An analyst's query for user="Divya" returns nothing, though events exist.

**Task:** Explain and fix.

> [!TIP] Model answer
> **Case sensitivity or normalisation:** stored values are lower-case "divya". Use lower(user)='divya' or the platform's case-insensitive operator; check field names across sources (user.name vs user); normalise case at ingestion.
>
> **Lesson:** know your data before trusting "no results".
