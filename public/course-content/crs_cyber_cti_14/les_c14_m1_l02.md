Requirements state what consumers need to know. A common hierarchy:

| Term | Meaning |
|---|---|
| PIR | priority intelligence requirement: a decision-relevant question from a named consumer, with a priority and a time frame |
| SIR | specific intelligence requirement: a narrower, answerable sub-question |
| EEI | essential element of information: the concrete data that would answer the SIR (and that collection can look for) |

Good requirements are tied to a decision, specific enough to collect against, owned by a consumer and reviewed on a schedule. Nilgiri's requirements file (data/requirements.yaml) has three PIRs; for example PIR-2 "Is MONSOON LANTERN infrastructure active against Nilgiri networks now?" for the SOC lead, broken into SIR-2.1 with EEIs such as "matches of current IOCs in proxy_log". PIR-3 ("Which regulatory reporting duties apply if policyholder data is exposed?") has no SIRs at all - a common defect: a valid question nobody has decomposed, so nobody collects against it.

Gather requirements by interviewing consumers ("what decisions will you take in the next quarter, and what would change them?"), not by asking "what threat intelligence would you like?". Record them, prioritise them with the consumers and retire them when the decision has passed.
