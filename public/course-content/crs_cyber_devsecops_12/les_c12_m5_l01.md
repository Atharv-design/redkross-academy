**Dependency types:**

```text
Direct        packages you declare (requirements.txt, package.json).
Transitive    their dependencies, often many more than the direct ones.
Build/tooling compilers, plugins and CI actions (Module 7).
Runtime base  container base images and OS packages.
```

**Dependency risks:**

- known vulnerabilities in a version you use;
- unmaintained projects;
- malicious or typosquatted packages, and dependency confusion (Module 2 case study);
- compromised maintainer accounts;
- licence conflicts.

The defences in this module are inventory (SBOM), detection (SCA), control (pinning, hashes, approved index) and governance (licences, policy). They map to SSDF practices PW.4 (reuse well-secured software) and RV.1 (identify vulnerabilities).
