SLSA (Supply-chain Levels for Software Artifacts) defines a Build track [R2]:

| Term | Meaning |
|---|---|
| Build L0 | no guarantees |
| Build L1 | provenance exists: the package has provenance showing how it was built, which prevents mistakes but is trivial to bypass or forge; provenance may be unsigned and incomplete |
| Build L2 | hosted build platform that generates and signs the provenance; consumers validate its authenticity |
| Build L3 | hardened builds: runs cannot influence one another and provenance signing secrets are kept away from user-defined build steps |

The level descriptions above are from SLSA v1.1; v1.1 is now marked retired and v1.2, the current version, adds a Source track [R3].

The lab built kestrel-api:1.1.0 with "docker buildx build --provenance=mode=max --sbom=true --push" and inspected the result (provenance_summary.txt). The image index contained the image manifest and an attestation manifest; the provenance named the build type, the Dockerfile (Dockerfile.good13) and the resolved base image with its digest. It also showed the limits of a local build: the builder id was empty, the completeness section reported resolvedDependencies as false, and the provenance itself was not signed. That is roughly SLSA Build L1 - useful for incident response, not proof against a determined attacker. Reaching L2-L3 means building on a hosted, isolated platform that signs provenance with keys user steps cannot reach.

Build hygiene that supports any level: ephemeral build environments, pinned inputs (base digests, dependency lock files), no network access during build steps where feasible, separate credentials for build and publish, and reproducible builds where the toolchain allows.
