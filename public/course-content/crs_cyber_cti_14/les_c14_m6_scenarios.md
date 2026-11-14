Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A partner's platform rejects your bundle without explanation.

**Task:** Describe how you troubleshoot.

> [!TIP] Model answer
> **Validate locally:** strict parse, pattern validation, spec_version 2.1 on all objects, valid identifiers and references (no dangling refs), timestamps in the right format, and marking definitions the partner recognises. Check size limits and media types for the TAXII API root, the status resource for per-object failures, and whether the partner rejects custom properties or particular SDOs. Ask for their validation log.
>
> **Lesson:** validate before sharing and read the TAXII status.

## Scenario 2

Your ISAC asks you to share the MONSOON LANTERN bundle, including the sighting, under TLP:CLEAR "so that everyone benefits".

**Task:** Respond.

> [!TIP] Model answer
> Share the indicators, attack patterns and campaign description at an appropriate level (TLP:GREEN for the community, or CLEAR for indicators that are safe to publish), but not the sighting: it reveals Nilgiri's compromise and internal details. If the community needs the sighting, share it anonymised (no where_sighted identity, coarse time) through the ISAC under TLP:AMBER. Check feed licences for any indicators that came from commercial sources.
>
> **Lesson:** share as widely as safe, mark by sensitivity, not by convenience.

## Scenario 3

You will run a TAXII server for 40 member organisations.

**Task:** List the security and governance requirements.

> [!TIP] Model answer
> HTTPS with modern TLS; per-member authentication (certificates or tokens), per-collection read/write permissions per member and per TLP level; logging and monitoring of access; rate limits and size limits; backups and integrity of stored objects; a membership agreement covering use, re-sharing, TLP and licences; validation on ingest; a process for corrections and revocations; and a contact for abuse or incidents.
>
> **Lesson:** a sharing server is both a security system and a governance system.
