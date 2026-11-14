## About this module

Indicators of compromise (IOCs) are the most operational form of threat intelligence: values a machine can match. They are also the easiest to misuse. Feeds contain public services, stale entries, malformed data and values with no context; matched naively, they flood the SOC with false alerts. This module treats IOCs as a managed product with a lifecycle: normalise, validate, enrich, score, age, deploy, observe and retire. In the lab the same three feeds produced 81 alerts when loaded naively and 8 - all of them real - when managed.

## Why it matters

Even official reports warn about this. The US joint analysis report GRIZZLY STEPPE (December 2016) told administrators that traffic from its listed addresses "may correspond to malicious activity, and some may correspond to legitimate activity" [R2]. An indicator without context and ageing is a guess that never expires.

## Where it is used

Threat intelligence platforms, SIEM watchlists, proxy and DNS blocklists, EDR custom indicators, email gateways, sharing communities.

## Learning objectives

1. Classify indicators and place them on the Pyramid of Pain.
2. Describe the IOC lifecycle from ingestion to retirement.
3. Detect and handle common feed-quality problems.
4. Enrich indicators with context that supports decisions.
5. Score and age indicators with type-specific half-lives and thresholds.
6. Match indicators correctly against logs and use sightings as feedback.

## Before you start

**Prerequisites:** C14-M02, C14-M03; Course 08 Module 5 (IOC basics); Course 04 Module 6 (log parsing).

**Estimated study time:** About 8 hours.
