Dispositions (names vary by SOC):

| Term | Meaning |
|---|---|
| True positive (TP) | real malicious or policy-violating activity. |
| Benign true positive (BTP) | the rule worked as designed, but the activity is authorised, such as an administrator's approved script or a penetration test. |
| False positive (FP) | the rule matched something it should not have, because of a logic or data error. |
| Undetermined | evidence insufficient; record what is missing. |

**Grouping:** alerts that share entities and time belong in one case. In the dataset, R1, R6, R3, R4 and R5 share WS-104/divya, and R2 involves an external IP that also probed 10.40.0.5:3389 (Module 3). Whether the VPN spray is linked to the phishing is a hypothesis for investigation, not a fact. Record it as such.
