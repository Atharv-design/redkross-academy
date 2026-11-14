Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Developers complain the pipeline takes 45 minutes because of security scans.

**Task:** Redesign.

> [!TIP] Model answer
> Run fast checks on pull requests: secret scanning, incremental SAST on changed files, and unit security tests. Run slower ones (full SAST, DAST, container scans) in parallel or nightly, with results feeding the next pull request. Cache dependencies, tune rules to cut noise, and measure gate times.
>
> **Lesson:** fast, relevant gates get adopted.

## Scenario 2

A customer asks you to attest to secure development practices.

**Task:** Explain how you would answer.

> [!TIP] Model answer
> Map your practices to NIST SSDF groups (PO, PS, PW, RV) with evidence: policies, pipeline configurations, scan reports, SBOMs, signing records and vulnerability SLAs. Be honest about gaps, give dates for closing them, and involve legal for any formal attestation.
>
> **Lesson:** attest with evidence, not adjectives.

## Scenario 3

A release manager wants to skip gates for an urgent fix.

**Task:** Respond.

> [!TIP] Model answer
> Keep critical gates (secrets, signatures, security tests), which are fast. Use the documented emergency waiver process for slower gates, with an owner and a follow-up scan within a set time. Record the decision and review it in the post-release retrospective.
>
> **Lesson:** emergencies use governed exceptions, not silent bypasses.
