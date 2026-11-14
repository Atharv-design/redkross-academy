**Two separate questions:**

| Term | Meaning |
|---|---|
| Likelihood | how probable is the event or development? |
| Confidence | how sound is the basis for that judgment (sources, logic, gaps)? |

ICD 203 gives a fixed scale of likelihood terms with probability bands [R1]:

```text
almost no chance  01-05%       likely                55-80%
very unlikely     05-20%       very likely           80-95%
unlikely          20-45%       almost certain(ly)    95-99%
roughly even chance 45-55%
```

(A second row of equivalent terms exists - remote, highly improbable, improbable, roughly even odds, probable, highly probable, nearly certain - and the standard encourages analysts not to mix rows.) It also states that a product expressing a confidence level "must not combine a confidence level and a degree of likelihood ... in the same sentence", and that products should distinguish underlying information from assumptions and judgments.

The lab's first draft of estimative_lint.py required likelihood and confidence in the same sentence - exactly what ICD 203 rules out. It was rewritten to require a likelihood term, a separate "Confidence: low | moderate | high." sentence and a source citation (deep dive). Publish your scale with your products; consumers should never have to guess what "likely" means.

**Confidence typically rests on:** source reliability and independence (Module 2), the amount and currency of information, the analytic logic, and known gaps. "Low confidence" is not a weakness to hide; it tells the consumer how much weight the judgment can bear.
