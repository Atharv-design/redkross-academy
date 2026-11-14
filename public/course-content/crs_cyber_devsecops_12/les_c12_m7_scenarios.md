Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

An action you use announces its maintainer account was compromised last week.

**Task:** Respond.

> [!TIP] Model answer
> Find every workflow using the action and the versions or SHAs pinned. Compare them with the known-bad versions. Review run logs and audit logs for the period, and rotate any secrets those jobs could access. Pin to a verified safe SHA or replace the action. Add an alert for future advisories. If pins were by SHA to a pre-compromise commit, exposure is likely limited.
>
> **Lesson:** SHA pinning and inventories make this tractable.

## Scenario 2

A customer asks how they can verify that your release is genuine.

**Task:** Answer.

> [!TIP] Model answer
> Publish signatures (and, if keyless, the expected signer identity and issuer), provenance, SBOMs and checksums. Provide the exact cosign verify-blob or verify commands and expected outputs, and document the supported versions and key-rotation policy.
>
> **Lesson:** verifiability must be usable by consumers.

## Scenario 3

Developers want admin permissions on the CI token "to avoid errors".

**Task:** Respond.

> [!TIP] Model answer
> Decline. Find the specific permissions each job needs, grant them per job, and keep the read-only default. Provide documented patterns. Explain the risk: any compromised step or action would gain admin rights.
>
> **Lesson:** least privilege applies to automation too.
