## About this module

A zero trust architecture makes a decision for every request. Those decisions are only trustworthy if the signals behind them keep flowing, if someone can see what was decided and why, and if the system behaves safely when a component fails. This module designs the monitoring and resilience layer: a central logging architecture that collects the right telemetry with integrity and adequate retention; continuous verification that turns decision logs and posture signals into monitoring alerts; deliberate failure modes for policy decision points; and an incident-ready design whose recovery and response capabilities do not depend on the systems an incident may have taken away. It ends with two execution-tested reviews of Tamarind Logistics' monitoring and resilience design.

## Why it matters

On 19 July 2024 a faulty content update to CrowdStrike's Falcon sensor crashed Windows hosts worldwide; Microsoft estimated that 8.5 million devices were affected (case study). No attacker was involved: the failure mode of a trusted security component, and the way updates reached the fleet, decided the outcome. Resilience is an architecture property, not an operations afterthought.

## Where it is used

SIEM and log-platform design, SOC engineering, zero trust programme telemetry, business continuity and disaster recovery planning, incident response readiness, change and release governance for security tooling, regulatory logging (CERT-In directions).

## Learning objectives

1. Design a central logging architecture with defined sources, integrity, retention and time synchronisation.
2. Specify the telemetry a zero trust architecture needs and monitor it for continuous verification.
3. Choose and document failure modes for PDPs, PEPs and security agents.
4. Remove single points of failure from monitoring and recovery paths.
5. Design incident-ready architecture: out-of-band access, immutable backups and tested restores.
6. Review a monitoring and resilience design with automated checks.

## Before you start

**Prerequisites:** C22-M01 to C22-M05; Course 08 Modules 2-4 (SIEM and detection); Course 08 Module 6 (incident response).

**Estimated study time:** About 8 hours.
