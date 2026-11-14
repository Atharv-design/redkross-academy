## Revision

### Summary

SAST analyses code statically through pattern matching, data flow, taint (sources, sinks, sanitisers) and type-aware analysis. It is early and broad but misses runtime and design issues. Semgrep rules are code-like patterns with metavariables, ellipses, metadata and operators such as pattern-not and taint mode. In the tested lab (semgrep 1.184.0), three course rules found the f-string SQL, shell=True and MD5 password hash, ignored the safe variants and honoured a rule-specific suppression. The scan exited 0 by default and 1 with --error, so gates must be tested. Triage classifies findings as true positive, false positive or accepted risk, with reasons, owners and expiries. Suppressions need rule IDs and review. Compiler warnings and linters matter too: goto fail would have been caught by -Wunreachable-code, which -Wall did not include.

### Important concepts

precise rules; tested gates; disciplined suppression.

### Key technical takeaways

pattern, pattern-not, metavariables; --error; nosemgrep: <id>.

### Glossary

| Term | Meaning |
|---|---|
| False positive | Finding with no real risk. |
| Metavariable | Named wildcard in a Semgrep pattern ($X). |
| SAST | Static application security testing. |
| Sanitiser | Code that makes tainted data safe for a sink. |
| Sink | Dangerous operation receiving data. |
| Source | Origin of untrusted data. |
| Taint analysis | Tracking untrusted data from sources to sinks. |

### Common mistakes

gates that exit 0; bare suppressions; enabling huge rule packs at once.

### Revision questions

​1. Write a rule for yaml.load without SafeLoader. 2. Explain taint analysis. 3. What makes a good suppression?

### Further reading

Semgrep documentation [R1]; Langley on goto fail [R2].

## References

- [R1] Semgrep. "Semgrep documentation - Writing rules". URL: [https://semgrep.dev/docs/writing-rules/overview](https://semgrep.dev/docs/writing-rules/overview) Accessed: 2026-11-07. Supports: rule syntax, operators, testing annotations.
- [R2] Langley, A. "Apple's SSL/TLS bug", ImperialViolet, 22 February 2014. URL: [https://www.imperialviolet.org/2014/02/22/applebug.html](https://www.imperialviolet.org/2014/02/22/applebug.html) Accessed: 2026-11-07. Supports: duplicate goto, skipped check, -Wall versus -Wunreachable-code, testing difficulty.
- [R3] Apple. "About the security content of iOS 7.0.6" (HT6147), February 2014. URL: [https://support.apple.com/kb/HT6147](https://support.apple.com/kb/HT6147) Accessed: 2026-11-07 (web-search cross-check). Supports: CVE-2014-1266 fix.
- [R4] Lab evidence. sast/rules.yml, sast/legacy_reports.py, semgrep_output.txt, semgrep_gate_output.txt (semgrep 1.184.0), 2026-11-07.
