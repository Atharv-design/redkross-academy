Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A supplier offers a "signed" container image but cannot say what key or identity signed it, or how it was built.

**Task:** State what you would require before production use.

> [!TIP] Model answer
> A signature is only as useful as trust in the signer. Require: the public key or the keyless identity and issuer that sign releases, published through a channel you trust; how keys are protected and rotated; signed provenance stating the builder, source repository and revision (ideally SLSA Build L2 or higher); an SBOM attestation; a vulnerability disclosure and patch process. Configure verification for that identity only, and pin deployments to verified digests.
>
> **Lesson:** verify who signed and how it was built, not just that a signature exists.

## Scenario 2

Your CI signs images with a private key stored as a CI secret readable by every job.

**Task:** Assess the risk and redesign.

> [!TIP] Model answer
> Any job - including one from a malicious pull request or a compromised dependency - can read the key and sign anything, and signatures would look legitimate. Move the key to a KMS or use keyless signing bound to the release workflow's identity; allow signing only in the protected release job on protected branches; separate build and sign steps; log and alert on every signature; rotate the existing key and treat its past signatures as suspect until reviewed.
>
> **Lesson:** signing authority must be narrower than build access.

## Scenario 3

A team wants to adopt signature verification at admission across all clusters next week.

**Task:** Plan a safe rollout.

> [!TIP] Model answer
> Inventory images in all clusters and which are signed by which identity; sign the missing first-party images; decide policy for third-party images (sign on import into an internal registry). Deploy the verifier in warn/audit mode first, collect failures, fix them; plan the webhook's availability (replicas, failurePolicy, exclusions for kube-system and the webhook itself) and break-glass; then enforce namespace by namespace, starting with new ones. Combine with digest pinning.
>
> **Lesson:** inventory, observe, fix, then enforce - and keep the verifier highly available.
