Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

You are asked to "quickly check if our AD is secure" with no written scope and access to the production directory.

**Task:** Describe what you require before starting and why.

> [!TIP] Model answer
> Require written authorisation and an agreed scope before touching anything: which domains/forests, read-only or change-allowed, what may be exported, how the export and the personal data in it will be handled and retained, and who is informed. An AD export and an access review are sensitive; "quickly check" is not authorisation. Confirm you are authorised to administer the directory (the course's golden rule) and agree the deliverable (a register and plan).
>
> **Lesson:** no authorised scope, no assessment.

## Scenario 2

Your review produces 40 findings and leadership asks "what do we fix first?".

**Task:** Explain how you would prioritise and present them.

> [!TIP] Model answer
> Score every finding HIGH/MEDIUM/LOW by impact and exploitability. Present the HIGHs first - the direct paths to domain compromise (unconstrained delegation off a DC, Kerberoastable privileged accounts, AS-REP roastable admins) - as the "fix now" set, with evidence and specific fixes; group MEDIUMs as near-term projects (RC4 removal, PSO coverage, LAPS); list LOWs as hygiene. Give each an owner and a due date proportionate to severity, and show quick wins separately from projects. Do not present 40 undifferentiated findings.
>
> **Lesson:** prioritise by impact and exploitability; lead with the HIGHs and a plan.

## Scenario 3

Three months after a remediation plan, leadership asks whether identity security has improved.

**Task:** Describe the evidence and metrics you would present.

> [!TIP] Model answer
> **Present the trend:** the number of HIGH findings then and now (for example the Kerberoastable account closed, the tool's exit code now clean), the number of Kerberoastable accounts, accounts not covered by a PSO, dormant accounts disabled, and mean time to remediate. Back each with re-test evidence (before/after tool output). Show which planned projects (LAPS, PAWs) progressed. Improvement is the trend plus evidence, not a single score.
>
> **Lesson:** measure improvement as a trend backed by re-test evidence.
