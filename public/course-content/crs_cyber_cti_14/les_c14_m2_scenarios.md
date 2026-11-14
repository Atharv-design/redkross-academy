Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A colleague wants to register a lookalike account to join a closed Telegram channel where MONSOON LANTERN infrastructure may be discussed.

**Task:** Advise.

> [!TIP] Model answer
> Do not do it on your own initiative. Joining closed groups with a false identity is active collection involving deception; it may breach platform terms, may raise legal issues and creates analyst and organisational risk. If the requirement justifies it, escalate: legal review, a documented policy, a designated team and managed environment, defined purpose and minimisation - or obtain the information through a sharing partner or a commercial provider that collects lawfully. Meanwhile use passive sources.
>
> **Lesson:** deception-based collection needs explicit legal and policy approval, if it is acceptable at all.

## Scenario 2

A vendor report and an ISAC bulletin both state that MONSOON LANTERN uses ISO lures. The ISAC bulletin cites no source.

**Task:** Grade and explain how much corroboration this provides.

> [!TIP] Model answer
> Grade the vendor report (for example B2) and the ISAC bulletin (for example B3), but treat them as one line of evidence unless the ISAC bulletin has independent sourcing - it may repeat the vendor. Ask the ISAC for its source; look for independent evidence (internal telemetry, passive DNS of lure domains, a different vendor). State the judgment with moderate confidence at most and note possible circular reporting.
>
> **Lesson:** count independent sources, not reports.

## Scenario 3

Your inquiry finds a public spreadsheet listing 2,000 policyholders' names and phone numbers, apparently from Nilgiri.

**Task:** Describe your actions.

> [!TIP] Model answer
> Stop collecting further personal data; do not redistribute the file. Preserve minimal evidence (URL, time, hash, a minimised sample) in the restricted store; notify the incident response lead and the DPO/legal immediately, because a personal data breach may trigger CERT-In reporting within 6 hours and DPDP obligations; request takedown through proper channels; investigate the source of the exposure. Record everything.
>
> **Lesson:** discovery of exposed personal data turns OSINT into incident response with legal clocks.
