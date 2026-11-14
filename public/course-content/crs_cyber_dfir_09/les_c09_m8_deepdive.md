A reader should be able to reproduce every key finding. Techniques:

- Reference items by ID and location: "E1, HTTP frame for GET /backup/customers.csv".
- Include the exact command or query in an appendix, for example: tshark -r rk_c09_lab.pcap -q --export-objects http,out ; sha256sum out/customers.csv
- Record tool versions: TShark 4.2.5, The Sleuth Kit 4.12.1, CPython 3.14.4, sigma-cli 4.0.0 (as used in this course).
- Re-verify evidence hashes at report time (the appendix generator) and state the result.
- Keep scripts used for analysis (timeline.py, baseline_diff.py) under version control with the case, and hash them too.
- Separate observation from interpretation in both text and tables.
- Where a finding depends on parsing, show one example of raw data next to the parsed result. For example, the raw /proc/net/tcp value "0100007F:20FB" next to "127.0.0.1:8443" (Module 4).

These practices also make the report easier to defend, because the challenge "how do you know?" always has a documented answer.
