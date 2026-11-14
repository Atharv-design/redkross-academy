SCA tools compare components and versions with vulnerability databases such as the OSV database, the GitHub Advisory Database, the PyPA advisory database and NVD. Execution-tested (pip-audit 2.10.1):

```text
pip-audit -r requirements.txt
```

```text
------------------------------------------------------------- BEGIN OUTPUT
Found 32 known vulnerabilities in 3 packages
Name     Version ID              Fix Versions
requests 2.25.0  PYSEC-2023-74   2.31.0
requests 2.25.0  PYSEC-2026-1873 2.32.0
requests 2.25.0  PYSEC-2026-1872 2.32.4
requests 2.25.0  PYSEC-2026-2275 2.33.0
urllib3  1.26.4  PYSEC-2021-108  1.26.5
...
--------------------------------------------------------------- END OUTPUT
(execution-tested; rows deduplicated for display)
```

The JSON output (-f json), deduplicated by advisory ID, showed:

```text
requests 2.25.0  4 unique advisories, including
   PYSEC-2023-74   CVE-2023-32681  fix 2.31.0
   PYSEC-2026-1873 CVE-2024-35195  fix 2.32.0
   PYSEC-2026-1872 CVE-2024-47081  fix 2.32.4
   PYSEC-2026-2275 CVE-2026-25645  fix 2.33.0
urllib3 1.26.4   11 unique advisories
idna 2.10        2 unique advisories (transitive)
pyyaml 6.0.1, chardet 3.0.4, certifi 2026.10.23: none
audit_exit=1
```

(execution-tested 2026-11-07; results depend on the database on the day of the scan)

**Reading it:**

- "32 known vulnerabilities in 3 packages" counts table rows, which included repeats. There were 17 unique advisory IDs. Deduplicate before reporting numbers.
- The three affected packages were requests, urllib3 and the transitive idna, not PyYAML. pip-audit resolves dependencies, unlike the manifest-only SBOM.
- One example: CVE-2023-32681 (GHSA-j8r2-6x86-q33q) means requests versions 2.3.0 up to, but not including, 2.31.0 could send a Proxy-Authorization header to destination servers when redirected to HTTPS. The advisory rates it Moderate, CVSS 3.1 score 6.1 [R3].
- The exit code was 1 when vulnerabilities were found, so pip-audit can serve as a gate directly.
