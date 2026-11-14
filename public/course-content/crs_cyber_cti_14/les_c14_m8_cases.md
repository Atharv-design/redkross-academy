## AA23-193A - an advisory that told defenders where to look, 2023

**Context:** on 12 July 2023 CISA and the FBI published AA23-193A about malicious activity in Microsoft cloud environments, later associated with the actor Microsoft calls Storm-0558 [R2].

**What made it actionable:** the advisory described how a US government agency detected the activity in mid-June 2023 from MailItemsAccessed events with an unexpected application identifier, compared against an established baseline, and it discussed the logging licence levels needed for such events. Readers learned which log, which field and which comparison to use - not just that an incident occurred.

**Lessons for briefs:**

- The most valuable recommendation is often "here is the evidence that would show you are affected, and here is how to get it".
- Baselines turn a log event into a detection; say what normal looks like.
- Advisories that address visibility prerequisites (licences, logging configuration) help consumers act; intelligence products should do the same internally (Module 7 gaps).

## (FICTIONAL TEACHING SCENARIO): The twenty-page flash note

**Context:** Nilgiri's first MONSOON LANTERN product was a 20-page document covering the campaign's history, a list of every ATT&CK group that uses phishing, and 400 indicators from all feeds.

**What happened:** the SOC lead read page one, found no actions, and asked the CTI analyst by chat "what do I block?". The analyst answered, but the answer was never recorded; two days later another analyst blocked the full list, including the shared hosting address (Module 3 CS2).

**Response:** products now follow the brief structure with BLUF and owned actions; indicators go to the TAXII collection with scores and expiry; the brief checker runs before release; a peer reviewer signs off.

**Lessons:** length is not value; actions must be written down, owned and traceable.
