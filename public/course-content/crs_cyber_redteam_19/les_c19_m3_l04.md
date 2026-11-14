Evidence management makes findings trustworthy and defensible:

| Term | Meaning |
|---|---|
| what to record | for each finding/action: what was done, against which in-scope asset, by which operator, at what time, and the proof. |
| integrity | the record must be tamper-evident, so it is clear nothing was altered after the fact. |
| attribution | each entry is tied to an operator (and the deconfliction tag). |
| handling | evidence is stored securely (encrypted), with defined retention, per the RoE's data-handling terms. |

Good evidence lets the organisation trust, reproduce and act on findings, and protects the tester. The lab's evidence.py keeps an append-only log where each entry chains to the previous one by hash, so any alteration breaks the chain.
