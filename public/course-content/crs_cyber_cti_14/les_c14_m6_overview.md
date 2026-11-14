## About this module

Intelligence that only exists in prose cannot be loaded into a firewall, merged with a partner's data or queried next year. Structured formats fix that. STIX 2.1 represents intelligence as typed objects and relationships; TAXII 2.1 moves those objects between organisations over HTTPS; the Traffic Light Protocol (TLP) tells recipients how far they may share them. In this module you will model MONSOON LANTERN as a validated STIX bundle - campaign, indicators, techniques, a sighting and a report - publish it to a local TAXII server, poll it back with filters, and see the server refuse unauthorised access.

## Why it matters

Government advisories, ISAC feeds and threat intelligence platforms exchange STIX: CISA's May 2023 joint advisory on Volt Typhoon offered its indicators as STIX XML and STIX JSON downloads (case study CS1) [R4]. Structure also enforces discipline: a STIX Indicator needs a pattern, a validity period and, ideally, a confidence; a Campaign is distinct from a Threat Actor. Modelling exposes vague thinking.

## Where it is used

Threat intelligence platforms, SIEM and SOAR integrations, ISAC and CERT sharing, government indicator-sharing programmes, vendor feeds.

## Learning objectives

1. Describe the STIX 2.1 object families and choose the right objects for a case.
2. Build a STIX bundle with indicators, patterns, relationships, sightings and a report, and validate it.
3. Explain STIX patterns and validity windows.
4. Operate a TAXII 2.1 exchange: discovery, collections, publishing and filtered polling.
5. Apply TLP 2.0 handling and marking definitions correctly.
6. Govern sharing: agreements, minimisation, licences and feedback.

## Before you start

**Prerequisites:** C14-M03 to C14-M05; JSON; Python virtual environments.

**Estimated study time:** About 8 hours.
