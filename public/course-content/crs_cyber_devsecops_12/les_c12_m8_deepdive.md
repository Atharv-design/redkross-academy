LAB_ASSETS/C12/release/release_report.py (execution-tested) reads:

| Term | Meaning |
|---|---|
| `*.rc` | exit codes written by each gate (0 = pass) |
| sast.json | Semgrep results (count of findings) |
| audit.json | pip-audit results. Unique (package, advisory ID) pairs are counted with a set, which avoids the duplicate-row inflation seen in Module 5. |
| sbom.cdx.json | component count and specVersion |
| licences.json | pip-licenses output. Licences not matching a permissive allowlist (MIT, BSD, Apache, ISC, PSF) are listed for review. The allowlist is a policy input to agree with legal, and the substring match is deliberately simple, so review the list manually. |
| versions.txt | tool versions, for repeatability |

and computes the artefact's SHA-256 itself, so the report states exactly which bytes it describes. The decision line is "RELEASE APPROVED" only when every gate exit code is 0. A CI system would also use the script's output (or its own exit code, a possible extension) to stop the deployment job.
