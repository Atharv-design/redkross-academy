## AA23-144A, structured indicators for living off the land, 2023

**Context:** on 24 May 2023 the NSA, CISA, FBI and partner agencies in Australia, Canada, New Zealand and the United Kingdom published advisory AA23-144A, "People's Republic of China State-Sponsored Cyber Actor Living off the Land to Evade Detection", about the actor also known as Volt Typhoon [R4].

**Structured content:** the advisory provided indicators and offered STIX XML and STIX JSON downloads; it mapped behaviour to MITRE ATT&CK (version 13) and included command lines, file names and paths.

**The caveat:** because the actor relied on built-in administration tools, the advisory warned that many behavioural indicators "can also be legitimate system administration commands that appear in benign activity" and that care should be taken not to assume findings are malicious without further investigation.

**Lessons:**

- Structured formats made the advisory's indicators immediately loadable into thousands of platforms - which is exactly why their caveats must travel with them (confidence, descriptions, valid periods).
- For living-off-the-land activity, the most valuable structured content is behaviour (attack patterns and analytics, Module 7), not atomic indicators.

## (FICTIONAL TEACHING SCENARIO): The sighting that went public

**Context:** Nilgiri Mutual (fictional) shared the MONSOON LANTERN bundle with its ISAC. An analyst exported everything, including the TLP:RED sighting, to a partner platform configured to republish community data publicly.

**What happened:** the public feed now showed that an insurer matching Nilgiri's description had been hit on 28 October. A journalist asked for comment.

**Response:** the partner removed the object; Nilgiri's export process now filters by marking (only CLEAR and GREEN to that platform), sightings are shared through the ISAC with the victim identity removed, and the TAXII collections were split by TLP level so that permissions enforce what the labels intend.

**Lessons:** markings must be enforced by process and access control; the most sensitive part of a bundle is often the observation of your own incident.
