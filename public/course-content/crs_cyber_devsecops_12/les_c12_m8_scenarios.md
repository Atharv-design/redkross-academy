Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A high-severity advisory appears for a dependency one day after release.

**Task:** Respond using your release evidence.

> [!TIP] Model answer
> Query the stored SBOM for the release to confirm presence and version. Assess reachability and exposure. Prioritise per the SLA (Module 5). Prepare a patched release through the same pipeline. Notify customers with affected versions and mitigations. Update the report addendum.
>
> **Lesson:** release evidence enables fast, accurate response.

## Scenario 2

An executive asks you to mark a blocked release as approved for a customer deadline.

**Task:** Respond.

> [!TIP] Model answer
> Do not falsify the report. Offer options: fix and re-run (often fast for dependency upgrades), or a documented waiver with an owner, compensating controls and expiry, approved at the right level and shown in the report. The customer receives an accurate statement.
>
> **Lesson:** governed exceptions, never misrepresentation.

## Scenario 3

A customer's SBOM check finds a component your report does not list.

**Task:** Investigate.

> [!TIP] Model answer
> Compare the customer's SBOM source (image, artefact) with yours (lock file or environment). Check for tooling or base-image components, or a different artefact. Verify the artefact digest and signature. Fix the SBOM generation scope, issue a corrected SBOM, and add a consistency check.
>
> **Lesson:** the SBOM must describe the delivered artefact.
