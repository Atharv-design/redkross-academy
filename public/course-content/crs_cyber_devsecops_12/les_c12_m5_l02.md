A software bill of materials is a machine-readable inventory of components in a piece of software. NTIA's "The Minimum Elements For a Software Bill of Materials" (12 July 2021) lists the minimum data fields [R2]:

```text
supplier name, component name, version, other unique identifiers (such
as a package URL), dependency relationship, author of the SBOM data, and
timestamp.
```

It also covers automation support (machine-readable formats) and practices and processes (when to generate SBOMs and how to share them). The two main formats are CycloneDX (OWASP) and SPDX (Linux Foundation; ISO/IEC 5962:2021). Execution-tested (cyclonedx-py on LAB_ASSETS/C12/deps/requirements.txt):

```text
------------------------------------------------------------- BEGIN OUTPUT
bomFormat CycloneDX specVersion 1.6
[('PyYAML', '6.0.1', 'pkg:pypi/pyyaml@6.0.1'),
 ('requests', '2.25.0', 'pkg:pypi/requests@2.25.0'),
 ('urllib3', '1.26.4', 'pkg:pypi/urllib3@1.26.4')]
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; wrapped)
```

**Coverage limit:** the SBOM built from requirements.txt lists only the three direct pins. The installed environment also contained idna, chardet and certifi, pulled in transitively by requests (see the L03 and L06 output). An SBOM is only as complete as its input, so generate it from the resolved environment, a lock file or the built artefact or image, not from the top-level manifest alone. Each component's package URL (purl) gives a stable identifier for matching against vulnerability databases.
