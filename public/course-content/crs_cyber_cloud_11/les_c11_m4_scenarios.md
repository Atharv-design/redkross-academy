Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

Marketing needs public images on the website from S3.

**Task:** Design without a public bucket.

> [!TIP] Model answer
> Keep the bucket private with Block Public Access; serve through a CDN using origin access control so only the CDN can read objects; separate the public-asset bucket from any sensitive data; log access; alert on policy changes.
>
> **Lesson:** public content does not need a public bucket.

## Scenario 2

A ransomware tabletop assumes an attacker with administrator rights in the production account.

**Task:** Design backups that survive.

> [!TIP] Model answer
> Copy backups to a separate backup account (separate OU, separate administrators, SCPs preventing deletion), use vault lock/Object Lock or Azure immutable storage with a retention period, encrypt with keys the production account cannot delete, alert on backup policy changes, and test restores.
>
> **Lesson:** backups must be out of reach of the compromised account.

## Scenario 3

Legal asks whether encrypting the customer database means a stolen application credential cannot read it.

**Task:** Answer accurately.

> [!TIP] Model answer
> **No:** storage encryption is transparent to authorised callers, so a stolen application credential with read and (for SSE-KMS) Decrypt permissions can read the data. Reduce risk with least-privilege roles, field-level encryption with separately controlled keys, network restrictions, short credential lifetimes and monitoring of unusual reads.
>
> **Lesson:** encryption at rest is not access control.
