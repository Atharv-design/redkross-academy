## About this module

A security information and event management (SIEM) platform collects events from many sources, turns them into a consistent searchable form, correlates them to find patterns no single source shows, and presents dashboards and alerts. Commercial and open-source SIEMs differ in query languages and features (Splunk SPL, Microsoft Sentinel KQL, Elastic, Wazuh, Security Onion and others), but the concepts are the same. This module teaches those concepts using minisiem - a deliberately tiny SIEM built on SQLite in the course lab - so you can see every step, then relates them to real platforms.

## Why it matters

Most SOC work happens in the SIEM search bar. Analysts who understand parsing and normalisation know why a search misses events; analysts who understand correlation can write detections that catch multi-step attacks.

## Where it is used

SOC monitoring, compliance reporting (log retention and review), incident investigations, threat hunting.

## Learning objectives

1. Explain ingestion, parsing, normalisation, enrichment, indexing and retention.
2. Parse heterogeneous raw logs into a common schema.
3. Write searches that filter, aggregate and join events.
4. Explain and implement correlation rules across sources.
5. Design useful dashboards and avoid misleading ones.
6. Operate SIEM health checks.

## Before you start

**Prerequisites:** C08-M01, C08-M02; Course 04 Module 3.

**Estimated study time:** About 8 hours.
