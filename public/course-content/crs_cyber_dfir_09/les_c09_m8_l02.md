A defensible forensic report typically contains:

1. Title page. Case ID, version, date, author, classification and distribution.
2. Executive summary.
3. Scope and questions. What the examiner was asked, by whom and under what authority (Module 1).
4. Evidence examined. An item list with identifiers, sources, acquisition details and hashes, including a custody summary.
5. Methods and tools. Procedures, tools and versions, and how they were validated.
6. Timeline. Key events in UTC, each with a source (L03).
7. Findings. Each finding answers a question, cites evidence items and states its certainty (L04).
8. Limitations and alternative explanations (L05).
9. Conclusions. Answers to the questions, with no new material.
10. Recommendations, if within scope (IR reports).
11. Appendices. Evidence table with hashes, detailed artefact output, glossary, and the examiner's CV for expert reports.

Execution-tested appendix generator (LAB_ASSETS/C09/evidence_appendix.py, lab artefacts standing in for case evidence):

```text
------------------------------------------------------------- BEGIN OUTPUT
ID   Size  SHA-256
E1   3044  6e2cf6fe84d9c063c39f8ce9b1e3c1ca996d1b25e0bdf01a20e181c124528a21
           rk_c09_lab.pcap - Packet capture, web01 interface, port 80
E2    968  b484daed1dd601129336d45f7c7f2bde0a32f239eec1943d47f818cecb359e97
           rk_c09_net_lab_output.txt - tshark analysis output
E3    638  1590fab375210634f0974979321394e0de0c00588c6b4be408e384c89d130694
           timeline_output.txt - merged UTC timeline
E4    550  6f150fd9d4b55163009bfd2e5fc2c3c0234692fd742c80e39526480e1ea68d39
           rk_c09_live_lab_output.txt - live-response output
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; reformatted to fit the page)
```

E1's hash (6e2cf6fe...) equals the hash recorded when the capture was made (Module 6). That re-verification shows the pcap is unchanged since acquisition, and the report should state it. Findings then cite items by ID, for example "(E1, frames 4-12)".
