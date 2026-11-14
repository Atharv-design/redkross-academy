briefs/brief_bad.yaml has a misspelled TLP label, a high-confidence state attribution resting on the paste-site report, a judgment citing a report that does not exist, a recommendation to "block all addresses in every feed" with no owner and an invalid PIR, and no review date. briefs/brief_model.yaml is the model answer. Output (execution-tested, CPython 3.14.4, 2026-11-07; m08_brief_output.txt, abridged):

```output
$ python brief_builder.py briefs/brief_bad.yaml briefs/brief_bad.txt
FAIL B1 TLP label missing or invalid: 'AMBERISH'
FAIL B2 judgment 1: needs a scale term and confidence
FAIL B4 judgment 1: rests only on weak sources ['RPT-003']
FAIL B3 judgment 2: unknown source IDs ['RPT-099']
FAIL B5 recommendation 1: needs a valid PIR and an owner
FAIL B6 no review-by date
checks: 6 failure(s)
exit=1
$ python brief_builder.py briefs/brief_model.yaml briefs/brief_model.txt
checks: PASS
exit=0
$ cat briefs/brief_model.txt
TLP:AMBER
MONSOON LANTERN - flash brief for the CISO and SOC (fictional)
Date: 2026-10-28   Review by: 2026-11-11
BOTTOM LINE UP FRONT
A brand-impersonation phishing campaign (MONSOON LANTERN) reached one
Nilgiri finance user on 28 October; campaign infrastructure is very
likely still active. We have no reliable basis to attribute it.
KEY JUDGMENTS
  1. MONSOON LANTERN infrastructure is very likely active against Nilgiri
     users now. Confidence: moderate. [RPT-004, RPT-006]
  2. Further brand-themed lures to Nilgiri staff within 30 days are
     likely. Confidence: moderate. [RPT-001, RPT-004]
  3. Attribution to a specific actor is unlikely to be possible with
     current collection; technique overlap matches several ATT&CK groups
     equally well. Confidence: low. [RPT-001, RPT-002, RPT-003]
RECOMMENDED ACTIONS
  1. Block the 10 active campaign indicators at the proxy and DNS
     resolver for 14-30 days (per type), then review. - owner SOC lead,
     answers PIR-2
  2. Investigate workstation of user u017 (10.40.3.57) for the payload
     and persistence; preserve evidence. - owner IR lead, answers PIR-2
  3. Collect scheduled-task and module-load telemetry to close PARTIAL
     coverage on T1053.005 and T1059.001. - owner Detection
     engineering, answers PIR-1
INTELLIGENCE GAPS
  - No first-hand evidence of post-compromise techniques at Nilgiri yet
    (community reporting only).
  - PIR-3 (regulatory duties) has no collection plan; Legal and the DPO
    to define SIRs.
SOURCES
  [RPT-001] SRC-02 B2 2026-10-03   [RPT-002] SRC-01 B3 2026-10-06
  [RPT-003] SRC-03 E5 2026-10-07   [RPT-004] SRC-05 A1 2026-10-12
  [RPT-006] SRC-04 A1 2026-10-20
```

(Long lines are wrapped here; the sources list is printed one per line by the tool.)

**Interpretation:**

- Every number in the model brief traces to a lab output: 10 active indicators (Module 5), u017 and 10.40.3.57 (Module 5 matches), the attribution judgment (Module 4 overlap), the telemetry gap (Module 7).
- Judgment 1's "Confidence: moderate" reflects two A1 sources that confirm contact but not compromise.
- The bad brief's first judgment fails B2 partly for a reason worth knowing: the checker requires exact scale terms, so "almost certainly" does not match "almost certain" (a documented limitation).

**Limitations:** the checker cannot judge whether evidence supports a judgment; that is the peer reviewer's job.
