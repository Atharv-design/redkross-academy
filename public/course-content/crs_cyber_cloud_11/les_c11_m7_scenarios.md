Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Your CI platform announces a breach affecting stored secrets.

**Task:** Respond.

> [!TIP] Model answer
> Use the secrets inventory to rotate every secret stored in the platform (cloud keys, tokens, signing keys), prioritising production and high-privilege ones; review cloud logs for use of those credentials since the exposure window began; move to OIDC federation so the platform holds no long-lived cloud credentials; record actions.
>
> **Lesson:** rotation speed depends on preparation.

## Scenario 2

A team stores API keys in Lambda environment variables "because they are encrypted".

**Task:** Advise.

> [!TIP] Model answer
> Environment variables are readable by anyone with permission to read the function configuration and often appear in logs and tooling. Store keys in Secrets Manager/Key Vault with access by the function's role, fetch at runtime with caching, rotate them, and prefer identity-based access where the target supports it.
>
> **Lesson:** "encrypted at rest" is not "secret".

## Scenario 3

An image has 3 CRITICAL vulnerabilities with no fix available.

**Task:** Decide on deployment.

> [!TIP] Model answer
> Assess exploitability and exposure (is the package used? reachable?); consider an alternative base without those packages; if deploying, record a time-limited exception with owner, compensating controls (network restrictions, runtime monitoring) and a rebuild when fixes appear.
>
> **Lesson:** gate on risk, document exceptions.
