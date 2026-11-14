Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A partner shares 5,000 addresses "associated with ransomware" with no dates or roles.

**Task:** Decide how to use them.

> [!TIP] Model answer
> Do not block them. Ask the partner for dates, roles and sources. Validate and allowlist; check fan-out and hosting type; give them low confidence and short expiry; load them as a watchlist for retro-hunting and alert triage, not blocks; promote individual addresses to blocks only after local evidence (sightings) or corroboration. Report false positives back.
>
> **Lesson:** context-free bulk indicators are hunting leads at best.

## Scenario 2

A domain indicator expired yesterday, and today the domain appears in a new phishing e-mail.

**Task:** Describe what should happen.

> [!TIP] Model answer
> A new observation is a new sighting: re-ingest it with the new date and source, which resets its age and raises confidence; redeploy with a new expiry; check whether anything contacted it during the gap (retro-hunt); review whether the half-life for this type or campaign is too short.
>
> **Lesson:** expiry is a default; new evidence revives indicators.

## Scenario 3

The SOC lead wants every feed indicator blocked "to be safe".

**Task:** Respond with a proposal.

> [!TIP] Model answer
> Explain the lab result (81 alerts, 73 false) and outage risks (update services, shared hosting). Propose tiers: block only high-score, validated, specific indicators (domains, URLs, hashes) with expiry; watch the rest; allowlist critical services; measure false-positive rates per feed and adjust weights; review weekly.
>
> **Lesson:** block selectively, watch broadly, measure always.
