Tuning changes a rule to catch more true positives or fewer false positives. Every change risks breaking something else. The routine:

1. Change the rule in a branch, and bump status or modified.
2. Re-run the unit tests (they must all still pass).
3. Re-run the purple-team plan (the misses should now be detected, and nothing previously detected should be missed).
4. Re-run the rule over a reference day of normal telemetry. Hit counts must not rise unexpectedly.
5. Add new unit tests for each new variant, so the gain is locked in.

Be honest about new risks. The tuned rule matches " -e " in a PowerShell command line, so it would also match a script that takes its own "-e" argument (for example powershell.exe -File tool.ps1 -e prod). On Tamarind's reference day this caused no new hits, but another estate may differ. Record that as a known false-positive source in the rule.
