Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

EDR shows excel.exe starting cmd.exe on 40 finance workstations every month-end.

**Task:** Decide how to handle it in detection logic.

> [!TIP] Model answer
> **Investigate before filtering:** identify the macro or add-in responsible, its signer, the exact command lines and the user group. If it is legitimate, write a narrow filter (specific command line or signed script path, finance hosts, month-end window) rather than excluding Excel -> cmd globally. Document the exception with an owner and a review date, and keep a separate rule for Excel -> cmd outside that pattern. Ask the business to replace the macro with a safer mechanism.
>
> **Lesson:** filter narrowly and document; never silence a behaviour class.

## Scenario 2

A host's event volume drops from 4,000 per hour to zero at 02:00 and returns at 02:20.

**Task:** Describe your investigation.

> [!TIP] Model answer
> Treat it as a possible sensor impairment until proven otherwise. Check change records and maintenance windows; agent and service state (Sysmon Event ID 4, EDR tamper events); system reboots; and network path issues at the collector. Check whether other hosts dropped at the same time (collector problem) or only this one (host problem). Check whether buffered events arrived late with original timestamps, and what the host did just before and after the gap.
>
> **Lesson:** silence is a signal; distinguish outages from impairment.

## Scenario 3

The incident commander wants to reimage WS-07 immediately "to be safe".

**Task:** Advise.

> [!TIP] Model answer
> Advise isolation first (containment without evidence loss), then collect a triage package and, if justified, memory; confirm the scope of other affected hosts and identities so the attacker is not tipped off while active elsewhere; reset svc-print and user07; then reimage after evidence collection with a documented decision. Reimaging alone does not remove stolen credentials or other footholds.
>
> **Lesson:** contain first, preserve evidence, then eradicate.
