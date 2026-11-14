Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A colleague imports 3,000 community Sigma rules straight into production on a Friday.

**Task:** Propose a safer process.

> [!TIP] Model answer
> Roll back, then stage the import. Select rules relevant to your telemetry and threat model. Run sigma check and convert with your pipeline. Run them against a reference day of telemetry to measure volume. Deploy to a staging SIEM in monitor mode. Review the top noisy rules and add filters as tested code. Promote in batches with owners, and avoid production changes before a weekend without on-call cover.
>
> **Lesson:** volume and relevance must be measured before rules page anyone.

## Scenario 2

A rule matches correctly in rk_sigma tests but returns nothing in the SIEM after conversion.

**Task:** List likely causes and checks.

> [!TIP] Model answer
> Check field-name mapping (missing or wrong pipeline); log-source mapping to the right index; escaping differences in the converted query (read it); case sensitivity of the backend for regex or exact matches; whether the data actually contains the field (parsing); time range; and permissions on the index. Test the converted query by hand against a known event, then add that event as a test fixture.
>
> **Lesson:** tests prove logic; integration tests prove deployment.

## Scenario 3

An analyst asks to "just edit the rule in the SIEM console" to stop a false positive during an incident.

**Task:** Respond.

> [!TIP] Model answer
> For urgent noise, use the platform's temporary suppression with an expiry, recorded in the incident log. Then make the real fix in the repository: add the false positive as a negative test, write a narrow filter, and get it reviewed and deployed through the pipeline. Console edits drift from the repository and are lost or overwritten at the next deployment.
>
> **Lesson:** the repository is the source of truth.
