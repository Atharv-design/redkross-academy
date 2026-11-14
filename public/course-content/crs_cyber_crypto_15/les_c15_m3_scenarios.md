Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A team plans to encrypt 50 MB backups directly with RSA.

**Task:** Advise.

> [!TIP] Model answer
> RSA cannot encrypt 50 MB (318-byte limit at 3072 bits with OAEP-SHA256), and doing it in chunks would be slow and unsafe. Use hybrid encryption: a random AES-256-GCM key per backup, wrapped with RSA-OAEP or derived via X25519, or KMS envelope encryption (Module 2).
>
> **Lesson:** public-key cryptography for keys, symmetric cryptography for data.

## Scenario 2

Your inventory finds RSA-1024 keys on old VPN appliances.

**Task:** Plan remediation.

> [!TIP] Model answer
> RSA-1024 is below acceptable strength. Plan replacement with ECDSA P-256 or RSA-3072 keys generated on the appliances, or upgrade the firmware or replace the appliances. Re-issue certificates, revoke the old ones, and prioritise internet-facing devices. Check the key-generation sources (the ROCA lesson) and scan the inventory for weak keys.
>
> **Lesson:** inventory plus rotation capacity.

## Scenario 3

Leadership asks what "post-quantum" means for the company now.

**Task:** Explain and propose first steps.

> [!TIP] Model answer
> Future quantum computers could break today's public-key algorithms, and data recorded now could be decrypted later. NIST standardised ML-KEM, ML-DSA and SLH-DSA in August 2024. First steps: inventory cryptography and data lifetimes, ask vendors for roadmaps, prefer agile protocols, pilot hybrid key exchange where supported, and budget for certificate and hardware changes.
>
> **Lesson:** start with inventory and agility, not panic.
