Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A teammate wants to "just start testing" without mapping first.

**Task:** Explain what mapping provides and why it comes first.

> [!TIP] Model answer
> Mapping enumerates the attack surface - endpoints, parameters, authentication state and the sinks input reaches - and defines scope concretely. Without it, testing is random: you miss entry points, cannot prove coverage, and risk straying out of scope. Mapping turns testing into a plan where each entry point has a hypothesised weakness and a verification step. It comes first (after authorisation) because every later step depends on knowing what exists.
>
> **Lesson:** map before you test; a map is the test plan and the scope made concrete.

## Scenario 2

During mapping you find a link that points to an external domain you do not own.

**Task:** Explain what you do and why.

> [!TIP] Model answer
> Do not follow it or test it. An external domain you do not own is out of scope, and testing it could be unlawful (e.g. IT Act 2000) and a contract breach. Note it in the map as an out-of-scope reference, confirm scope with the authorising owner if a dependency genuinely needs assessment (which requires its own authorisation from its owner), and keep all testing on the authorised target. The lab tools enforce this by refusing non-loopback hosts.
>
> **Lesson:** scope governs every action; never test anything you are not authorised to test.

## Scenario 3

You must brief a developer on why robots.txt is not protecting their /admin page.

**Task:** Explain the issue and the correct control.

> [!TIP] Model answer
> robots.txt is a public file that crawlers and attackers read; listing /admin there advertises it rather than hiding it, and provides no access control. The correct control is server-side authentication and authorisation: /admin must require a valid admin session and reject everyone else, regardless of whether the path is known. Remove sensitive paths from robots.txt, protect them with real access control, and monitor access.
>
> **Lesson:** obscurity is not access control; protect sensitive endpoints with authentication and authorisation.
