## About this module

Everything so far assumed that the image you deploy is the image you reviewed and scanned. This module tests that assumption. It looks at how software moves from source to cluster, where it can be altered on the way, and the controls that let a cluster refuse anything it cannot verify: build provenance, signatures, signed attestations and admission rules that accept only immutable, approved references. In the lab you will run a private registry, sign the kestrel-api release, replace it with an unauthorised rebuild under the same tag, watch verification fail, attach the SBOM as a signed attestation, inspect BuildKit provenance, and deploy by digest through an admission policy.

## Why it matters

The xz Utils backdoor (CVE-2024-3094, disclosed 29 March 2024) was hidden in the upstream release tarballs rather than in the visible source repository, and was activated by the build process [R1]. A reviewer reading the Git history would not have seen it. Build integrity and provenance exist precisely to connect what was reviewed to what was shipped.

## Where it is used

Release engineering, CI/CD platform design, registry administration, admission policy for production clusters, supplier assurance and customer or regulator requests for SBOMs and provenance.

## Learning objectives

1. Build a software supply-chain threat model from source to runtime.
2. Explain SLSA build levels and interpret real build provenance.
3. Sign and verify container images, and explain what verification does and does not prove.
4. Demonstrate why deployment must use digests rather than tags.
5. Create and verify signed attestations (SBOM) bound to an image digest.
6. Design deployment controls that admit only verified, immutable references.

## Before you start

**Prerequisites:** C21-M02 (images, SBOMs), C21-M04 (admission policy); Course 12 Modules 6-7 (signing and provenance basics) are helpful.

**Estimated study time:** About 9 hours.
