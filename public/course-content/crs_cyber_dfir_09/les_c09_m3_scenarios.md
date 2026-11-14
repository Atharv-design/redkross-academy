Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A tool reports a document "created 2019" on a laptop bought in 2024.

**Task:** Explain possible reasons and next steps.

> [!TIP] Model answer
> **Possible reasons:** the file was copied or extracted from an archive and kept the original modification time; the creation time was preserved by a migration tool; the clock was wrong; or the timestamps were manipulated. Compare SI and FN timestamps, the USN journal, document metadata and download artefacts (Zone.Identifier). Report the alternatives.
>
> **Lesson:** timestamps record events in a system, not truth.

## Scenario 2

You must say whether a deleted file existed on an NTFS volume, but its MFT record has been reused.

**Task:** Name other sources.

> [!TIP] Model answer
> $UsnJrnl:$J entries for the name; $LogFile; directory index slack ($I30); link (LNK) files and jump lists; recent-documents registry keys (Module 5); backups and Volume Shadow Copies; application logs; cloud sync history.
>
> **Lesson:** deletion leaves secondary traces.

## Scenario 3

A lawyer asks whether "the suspect deleted file X on 3 March".

**Task:** Answer carefully.

> [!TIP] Model answer
> State what the artefacts show. For example: "The USN journal records deletion of X at 2026-03-03 10:14 UTC while account A was logged on." Say what they do not show, such as who was physically present. Confirm the time zone. Mention corroboration and alternatives, such as scheduled cleanup or another session.
>
> **Lesson:** separate system events from human attribution.
