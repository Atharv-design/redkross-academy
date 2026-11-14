Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A vendor's enterprise search assistant indexes all files with an administrator account.

**Task:** Identify the risk and the design fix.

> [!TIP] Model answer
> Users may receive content from files they cannot open (LLM02/LLM08). Index with document ACLs and filter by the requesting user's identity before ranking; exclude restricted repositories; test with users of different permissions.
>
> **Lesson:** retrieval must respect existing access rights.

## Scenario 2

An agent can browse the web and also run shell commands on a build server.

**Task:** Redesign.

> [!TIP] Model answer
> **Split capabilities:** a browsing component without execution rights returns structured findings; any build action runs through a narrow, reviewed tool with allowlisted commands and human approval; sandbox the build; log and limit steps.
>
> **Lesson:** never combine untrusted input and powerful tools in one unchecked loop.

## Scenario 3

Costs triple after launch; logs show very long conversations.

**Task:** Respond.

> [!TIP] Model answer
> Set per-request and per-user token budgets, conversation length limits and summarisation, rate limits, and alerts on cost anomalies; check for abuse (automation, scraping); cache common answers.
>
> **Lesson:** consumption is a security and availability property (LLM10).
