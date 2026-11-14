Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

**A customer asks:** "Is your product affected by a new critical CVE in library X?"

**Task:** Answer quickly and reliably.

> [!TIP] Model answer
> Query the stored SBOMs for each supported release for library X and its versions. Check reachability and configuration where it is present. Respond with the affected releases, the fix plan and interim mitigations. If SBOMs are missing, scan the released artefacts now and fix the process afterwards.
>
> **Lesson:** per-release SBOMs make this a query.

## Scenario 2

A dependency bot opens 40 upgrade pull requests at once.

**Task:** Handle them.

> [!TIP] Model answer
> **Group them:** security fixes first by severity, then minor and patch upgrades batched, then majors scheduled. Rely on the test and gate suite to merge confidently. Configure the bot's schedule and grouping to avoid floods. Track SLA compliance.
>
> **Lesson:** automation needs good tests and grouping.

## Scenario 3

A developer wants to add an unfamiliar package with one maintainer and no recent releases.

**Task:** Evaluate.

> [!TIP] Model answer
> Assess maintenance, maintainers, security history, OpenSSF Scorecard, licence, size and transitive dependencies, and whether the standard library or an approved package already does the job. If adopted, pin with hashes, add it to the SBOM and monitor it. Consider vendoring or replacing it later.
>
> **Lesson:** every dependency is a trust decision.
