An image scanner does three things:

1. Inventory: read the OS package database (dpkg status, apk installed, rpm database) and language metadata (Python dist-info, npm package-lock, Java JARs, Go build info) from the layers. The result is essentially an SBOM.
2. Match: compare each package and version with vulnerability data - distribution security trackers, GitHub advisories, NVD and others - to find vulnerable versions and fixed versions.
3. Report: list findings with severity, the installed and fixed versions, and the layer that introduced the package.

**Sources of false positives:** distributions backport fixes without changing upstream version numbers (good scanners use distribution data to handle this); vulnerable code that the application never loads; findings that need conditions absent in your deployment. Sources of false negatives: software copied in without package metadata (a binary in /usr/local/bin); vendored code; vulnerabilities not yet in the database; secrets in formats the scanner does not recognise. Scan results also change daily because the database changes: record the scanner version and scan date with every result (the lab used Trivy 0.76.2 on 2026-11-07).
