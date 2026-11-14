Provenance is a signed statement describing how an artefact was built: which source revision, which build platform, which parameters and which dependencies. SLSA (Supply-chain Levels for Software Artifacts) defines the Build track levels in specification version 1.2 [R3]:

| Term | Meaning |
|---|---|
| Build L0 | no requirements; the absence of SLSA. |
| Build L1 | provenance exists showing how the package was built. It helps prevent mistakes but is easy to bypass or forge. |
| Build L2 | signed provenance from a hosted build platform. It addresses tampering after the build. |
| Build L3 | a hardened build platform. It addresses tampering during the build. |

SLSA 1.2 also includes a Source track covering source-code controls. Execution-tested teaching provenance (LAB_ASSETS/C12/provenance_lab.sh): the script wrote an in-toto Statement with a SLSA provenance predicate, whose subject is the artefact's SHA-256, signed it, verified it, and checked artefacts against it:

```text
------------------------------------------------------------- BEGIN OUTPUT
== provenance subject digest: d6ec461b7ce35ebd8974426984c91f553a6ab03c...
Wrote bundle to file provenance.bundle
== verify provenance signature
Verified OK
== consumer check: artefact digest equals provenance subject?
  shipments-1.0.0.tgz  MATCH
  tampered.tgz         MISMATCH
  builder: https://ci.tamarind.example/runners/hosted
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07, cosign v3.1.4 and CPython 3.14.4)
```

**Important limit:** this is a Build L1-style teaching example. The build script itself wrote the provenance, so a compromised build could forge it. Reaching L2 and L3 requires the hosted build platform to generate and sign provenance outside user-controlled steps, with isolated builds. GitHub artifact attestations and the SLSA GitHub generator are examples of platform-generated provenance (not execution-tested here). A consumer verifies the signature, the subject digest, the builder identity and the expected source repository and ref, and rejects anything else.
