Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A new CISO asks the CTI team for "everything about ransomware".

**Task:** Turn this into requirements.

> [!TIP] Model answer
> Interview the CISO about decisions: for example, investment in backups and recovery, cyber insurance, board reporting, patch priorities. Write PIRs such as "Which ransomware groups are likely to target Indian insurers in the next six months, and through which initial access methods?" with SIRs (initial access techniques observed against the sector; exploited vulnerabilities in products we run; data-extortion behaviour) and EEIs (ATT&CK techniques with evidence, CVEs listed in advisories, our exposure). Agree priorities, consumers, products (quarterly assessment; SOC detection content) and a review date.
>
> **Lesson:** requirements come from decisions, not topics.

## Scenario 2

**A draft says:** "APT-X could be behind the incident and may have stolen data."

**Task:** Explain the problems and rewrite it using the course's conventions (invent plausible sources RPT-101 and RPT-102).

> [!TIP] Model answer
> "Could" and "may" carry no probability; there is no confidence statement and no source; "behind the incident" mixes attribution with fact; data theft is asserted without evidence. Rewrite, for example: "Judgment: Attribution of the incident to a specific actor is unlikely with current evidence. Confidence: low. [RPT-101]" and "Judgment: Exfiltration of claims data is likely, based on 2 GB of outbound transfer from the claims server. Confidence: moderate. [RPT-102]". State the gaps that limit confidence.
>
> **Lesson:** one likelihood term, separate confidence, sources, gaps.

## Scenario 3

During a major vulnerability event, five consumers send urgent questions in one hour.

**Task:** Describe how you manage requirements and products for the next 48 hours.

> [!TIP] Model answer
> Appoint a requirements owner who triages and merges the questions into a short, prioritised list (exposure first: where do we run it; then exploitation evidence; then supplier status). Publish a single versioned product with a fixed update rhythm (for example every six hours), each version stating what changed and superseding the last; route technical data to the SOC in machine-readable form; record decisions taken; after 48 hours, review and return to standing requirements.
>
> **Lesson:** under pressure, fewer, owned, versioned products.
