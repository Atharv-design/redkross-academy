## About this module

Endpoints are where users open documents, where malware runs and where credentials are used. They produce the richest telemetry an organisation has. This module teaches you how endpoint events are generated and collected, how to rebuild process trees from them, and how to join them with identity telemetry. It also covers how to choose response controls that contain an incident without destroying evidence or disrupting the business. You will analyse the Tamarind Freight workstation WS-07 from the shared dataset.

## Why it matters

Attackers increasingly "live off the land", using built-in tools such as PowerShell, wmic and netsh so that their activity blends with administration. CISA's advisory AA24-038A on Volt Typhoon describes exactly this [R1]. A single process event rarely proves anything; the relationships between processes, users and logons do.

## Where it is used

EDR consoles, SIEM endpoint searches, detection engineering for process behaviour, incident triage, and the containment decisions taken by incident commanders.

## Learning objectives

1. Compare endpoint telemetry sources (Windows Security 4688, Sysmon, EDR) and their collection prerequisites.
2. Rebuild a process tree from process GUIDs and interpret parent/child relationships.
3. Interpret Windows logon events and logon types as identity telemetry.
4. Correlate process and identity events into an incident timeline.
5. Select proportionate endpoint response controls and sequence them with evidence preservation.
6. Monitor sensor health and detect attempts to impair it.

## Before you start

**Prerequisites:** C20-M01; Course 03 Module 5 (Windows logs); Course 09 Modules 1-3 (evidence handling).

**Estimated study time:** About 9 hours.
