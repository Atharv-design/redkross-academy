Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

No 4624 events exist before yesterday on a server, though it has run for a year.

**Task:** Explain and propose sources.

> [!TIP] Model answer
> **Possible causes:** log rollover (circular, size-limited), log clearing (look for 1102 or 104 and gaps in EventRecordID), audit policy changes, or a rebuild. Sources: SIEM or forwarded copies; Volume Shadow Copies holding older .evtx files; other systems' logs (DCs, VPN, firewall); and artefacts such as Prefetch, SRUM and the file-system timeline.
>
> **Lesson:** absence of events needs explaining.

## Scenario 2

Prefetch shows a wiping tool was run once at 03:12.

**Task:** Describe your next steps.

> [!TIP] Model answer
> Identify the tool and the files it referenced (Prefetch file references). Check the session that ran it (4624/4688, BAM/UserAssist), the file-system timeline and USN journal for deletions at the time, and shadow copies and backups for the deleted data. Report wiping as an anti-forensic action, and avoid assuming intent without evidence.
>
> **Lesson:** anti-forensics leaves its own artefacts.

## Scenario 3

**HR asks:** "Did Priya copy the files to USB?"

**Task:** Frame your answer.

> [!TIP] Model answer
> Report what the artefacts show: a device (serial), connection times, drive letter, folders browsed and files opened, all during account priya's interactive session, with confidence levels. State the limits: physical presence, other people using the session, and the content actually copied unless shown by other evidence. Suggest corroboration such as CCTV or badge logs, DLP and interviews (HR and legal).
>
> **Lesson:** artefacts describe the account and the device, not the person.
