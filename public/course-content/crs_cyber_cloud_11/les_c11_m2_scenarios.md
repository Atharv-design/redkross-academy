Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Your "require MFA" policy uses Bool, and a contractor still uses an IAM user access key from a laptop.

**Task:** Explain the risk and fix.

> [!TIP] Model answer
> Requests signed with the access key lack aws:MultiFactorAuthPresent, so the Bool deny does not apply and the contractor can act without MFA. Fix: move the contractor to SSO with MFA and remove the key; change deny statements to BoolIfExists; review CloudTrail for the key's use.
>
> **Lesson:** test policies against every credential type.

## Scenario 2

A SaaS vendor asks for a role in your account "with AdministratorAccess so we can help".

**Task:** Respond.

> [!TIP] Model answer
> Decline AdministratorAccess. Define the minimum tasks; create a role with a scoped policy, trust limited to the vendor's account with an ExternalId, session duration limits, permission boundary, and CloudTrail alerts on its use; review periodically and remove when no longer needed.
>
> **Lesson:** third-party access is least-privilege access too.

## Scenario 3

An old test tenant is discovered with a Global Administrator account and no MFA.

**Task:** Plan the response.

> [!TIP] Model answer
> Treat as a potential exposure: check sign-in and audit logs for the account and any applications in that tenant; enforce MFA or disable the account; review application registrations and consents; rotate credentials; delete the tenant if unused, or bring it under central governance (Conditional Access, PIM, monitoring).
>
> **Lesson:** forgotten tenants are part of the attack surface.
