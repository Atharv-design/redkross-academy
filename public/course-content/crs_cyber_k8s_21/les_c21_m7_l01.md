Follow an artefact from idea to running pod and ask, at each step, who could change it:

| Term | Meaning |
|---|---|
| source | unreviewed commits, compromised developer accounts, malicious pull requests |
| dependencies | compromised or typo-squatted packages, malicious updates, base images (Module 2) |
| build | a compromised or shared build machine, build scripts that fetch unpinned inputs, injected steps, leaked signing keys |
| artefact | a release built from something other than the reviewed source (the xz pattern) |
| distribution | a registry where tags can be moved or credentials leak |
| deployment | manifests that name tags, clusters that accept any image |

**Controls answer different questions:** code review protects source; pinning and SBOMs protect dependencies; hardened, isolated, hosted builds and provenance protect the build; signatures and attestations protect the artefact through distribution; admission policy protects deployment. No single control covers the chain, and each relies on the one before it - a perfectly signed image built on a compromised machine is still malicious.
