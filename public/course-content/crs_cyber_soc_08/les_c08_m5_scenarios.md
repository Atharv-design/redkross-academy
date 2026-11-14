Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A free feed adds 50,000 IPs daily; enabling auto-block causes outages for a payment partner.

**Task:** Fix the process.

> [!TIP] Model answer
> Stop auto-blocking from unvetted feeds; define requirements; score and age indicators; allowlist critical partners; block only high-confidence, current indicators with context, through change control; use the rest for enrichment and hunting; measure feed value (matches that led to TPs).
>
> **Lesson:** intelligence volume is not value.

## Scenario 2

A TLP:RED briefing names a domain; you find it in your proxy logs.

**Task:** Act within the TLP constraints.

> [!TIP] Model answer
> Act internally (investigate, contain per playbook) - use of the information for your own defence is normally expected - but do not share the domain or briefing beyond named recipients; if wider action is needed (for example asking a vendor to block), ask the originator for permission or a downgraded release.
>
> **Lesson:** TLP governs disclosure, not defence.

## Scenario 3

Management asks, "Which nation attacked us?" after the Banyan incident.

**Task:** Respond.

> [!TIP] Model answer
> Explain that attribution is uncertain and often unnecessary for remediation; give what is known with confidence levels (infrastructure, TTPs, any intelligence-community or ISAC assessments); focus on impact and fixes; if attribution matters (legal, regulatory, law enforcement), involve CERT-In and law enforcement.
>
> **Lesson:** state confidence; avoid speculation.
