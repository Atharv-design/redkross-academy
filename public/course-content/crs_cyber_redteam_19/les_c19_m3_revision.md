## Revision

### Summary

Inside the authorised scope, an engagement MAPS assets and identities, VALIDATES findings in a controlled way, and MANAGES evidence rigorously. ASSET AND IDENTITY MAPPING inventories in-scope hosts, services, accounts and their relationships - only within scope. SCOPE ENFORCEMENT is fail-safe: a target is acted on only if provably in scope, and anything else is refused; it is applied before every action. CONTROLLED VALIDATION confirms a finding with the minimum necessary, non-destructive, reversible proof - proving the risk without becoming the incident. EVIDENCE MANAGEMENT records, for each action, what was done, against which in-scope asset, by which operator, when, and the proof, in a TAMPER-EVIDENT log; CHAIN OF CUSTODY is the unbroken, integrity-protected history, enforced by hashing each entry to the previous so any alteration is detected. The lab's scopecheck.py refuses an out-of-scope target (8.8.8.8) while passing in-scope range hosts, and evidence.py keeps a hash-chained log that verifies intact and detects a one-character tamper as BROKEN. Together these keep the assessment in bounds and its findings trustworthy - the professional backbone that the technique-focused modules operate inside. Both tools are offline and touch no system.

### Important concepts

asset/identity mapping; fail-safe scope enforcement; controlled validation; evidence management; chain of custody; integrity.

### Key technical takeaways

map only in scope; enforce scope before every action; validate minimally and non-destructively; record attributed, integrity-protected evidence; keep the chain of custody intact.

### Glossary

| Term | Meaning |
|---|---|
| asset/identity mapping | inventorying in-scope hosts, services and accounts. |
| scope enforcement | acting only on provably in-scope targets (fail-safe). |
| controlled validation | minimal, non-destructive, reversible proof of a finding. |
| evidence management | recording attributed, integrity-protected proof. |
| chain of custody | the unbroken, documented, integrity-protected evidence history. |

### Common mistakes

acting out of scope; destructive "proof"; unrecorded or unattributed findings; no integrity protection; checking scope only once.

### Revision questions

​1. State the fail-safe scope rule. 2. What does controlled validation require? 3. How does a hash chain make evidence tamper-evident?

### Further reading

[R1]; [R2]; [R4].

## References

- [R1] NIST. "SP 800-115: Technical Guide to Information Security Testing and Assessment" (discovery/validation within scope; evidence). URL: [https://csrc.nist.gov/pubs/sp/800/115/final](https://csrc.nist.gov/pubs/sp/800/115/final) Accessed: 2026-11-08. Supports: scope discipline and evidence in assessment.
- [R2] PTES. "Technical Guidelines" (validation and reporting discipline). URL: [https://web.archive.org/web/20230601000000/http://www.pentest-standard.org/index.php/PTES_Technical_Guidelines](https://web.archive.org/web/20230601000000/http://www.pentest-standard.org/index.php/PTES_Technical_Guidelines) Accessed: 2026-11-08. Supports: controlled validation and evidence.
- [R3] NIST. "SP 800-86: Guide to Integrating Forensic Techniques into Incident Response" (evidence integrity and chain of custody). URL: [https://csrc.nist.gov/pubs/sp/800/86/final](https://csrc.nist.gov/pubs/sp/800/86/final) Accessed: 2026-11-08. Supports: chain of custody and integrity.
- [R4] Lab evidence. scopecheck.py (8.8.8.8 OUT-OF-SCOPE, refused) and evidence.py (chain intact -> OK; one-char edit -> BROKEN) (CPython 3.14.4), LAB_ASSETS/C19/data/scopecheck_output.txt and evidence_output.txt, 2026-11-08. Supports: the scope-enforcement and evidence-chain deep dive.
