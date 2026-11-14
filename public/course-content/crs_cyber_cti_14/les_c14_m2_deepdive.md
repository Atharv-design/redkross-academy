Source grading (source_eval.py; m02_output.txt):

```output
report   grade source                                 corroborated by
RPT-001  B2    Vendor blog (fictional 'Kaveri Labs')  -
RPT-002  B3    Sector ISAC bulletin                   -
RPT-003  E5    Anonymous paste site post              -
         !! unreliable source, information improbable, uncorroborated:
         do not use as the basis of a judgment
RPT-004  A1    National CERT advisory (fictional)     RPT-006
RPT-005  C3    Social media researcher thread         -
RPT-006  A1    Nilgiri SOC telemetry                  RPT-004
```

Minimisation of a synthetic forum post (collection/forum_post_raw.txt):

```output
$ python minimise.py collection/forum_post_raw.txt collection/forum_post_min.txt
replaced: {'EMAIL': 1, 'PHONE': 2, 'ID12': 1, 'PAN': 1}
Posted 2026-10-14 by "lantern_watch": the claims portal clone
portal-nilgiri-claims.example is back on 198.51.100.77. Contact me at
[EMAIL] or [PHONE] for the full list. A victim posted their details by
mistake: Aadhaar-shaped number [ID12], PAN [PAN], phone [PHONE]. Hosting
also seen on 203.0.113.45.
```

(Version 1 replaced only one phone number; m02_output_v1_phone_miss.txt shows "+91 98765 43210" left in place.)

**Collection record:**

```output
logged forum_post_min.txt sha256=dcf57e584db64d42... for SIR-1.1
logged reports.json sha256=32969ebb07070918... for PIR-1
$ python collect_log.py --verify collection/collection_log.jsonl
entry 1: ok  forum_post_min.txt
entry 2: ok  reports.json
exit=0
$ (edit entry 1 requirement) python collect_log.py --verify ...tampered.jsonl
entry 1: TAMPERED OR OUT OF ORDER  forum_post_min.txt
entry 2: ok  reports.json
exit=1
```

**Interpretation:**

- Grades show at a glance what can carry a judgment: A1 reports corroborate each other; B-grade vendor and ISAC reports are useful but uncorroborated; E5 is set aside.
- Minimisation kept the indicators the analysis needs and removed every personal identifier in the sample - after the pattern was fixed.
- The log detects the edit at entry 1. Entry 2 still verifies because its link to entry 1 uses the hash recorded at the time; a verifier should treat everything after a broken entry as suspect.
- The hashes in the log differ between runs only if the files differ; the hash recorded for forum_post_min.txt changed after the minimiser fix because the file content changed.

**Limitations:** corroboration by shared technique is a weak test (two independent reports may share a common technique by chance); real corroboration needs analyst judgment about independence.
