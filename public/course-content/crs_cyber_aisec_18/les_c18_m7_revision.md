## Revision

### Summary

AI red teaming is authorised, objective-driven evaluation of whole AI systems, distinct from model benchmarks. Plans set authorisation, objectives, scope, safety rules, data handling, success criteria and reporting. Safe probes use canaries, simulated tools and fictional data with objective checks, plus utility probes. Because outputs vary, results need repetitions and intervals: in the lab, 0/5 failures still allowed up to 43%, and claims below 5% need about 60 failure-free runs (rule of three). Deterministic controls are best evidenced by unit tests. Regression suites run on every change and production signals mirror probes. Reports give counts, intervals, evidence, root causes, recommendations and residual risk. Microsoft's lessons from red teaming over 100 products stress that simple techniques work, red teaming is not benchmarking, and the work never ends.

### Important concepts

rules of engagement; canary probes; uncertainty; regression.

### Key technical takeaways

report.py (Wilson interval); probes.py seeds; release gate.

### Glossary

```text
Rule of three   Zero failures in n trials -> 95% upper bound about 3/n.
Regression suite  Probes re-run on every change.
RoE             Rules of engagement.
Wilson interval Confidence interval for a proportion.
```

### Common mistakes

single runs; unqualified "secure" claims; real data in probes; testing systems without permission.

### Revision questions

​1. Write an RoE for an AI test. 2. Interpret 0/5. 3. Structure an AI risk report.

### Further reading

Microsoft lessons [R1]; NIST AI 100-2 [R2]; NIST AI RMF and AI 600-1 [R3].

## References

- [R1] B. Bullwinkel, A. Minnich, S. Chawla et al. "Lessons From Red Teaming 100 Generative AI Products", arXiv 2501.07238, submitted 13 January 2025. URL: [https://arxiv.org/abs/2501.07238](https://arxiv.org/abs/2501.07238) Accessed: 2026-11-08.
- [R2] NIST. AI 100-2 E2025, March 2025. URL: [https://csrc.nist.gov/pubs/ai/100/2/e2025/final](https://csrc.nist.gov/pubs/ai/100/2/e2025/final) Accessed: 2026-11-08.
- [R3] NIST. "AI Risk Management Framework" (AI RMF 1.0, 26 January 2023; AI 600-1, 26 July 2024). URL: [https://www.nist.gov/itl/ai-risk-management-framework](https://www.nist.gov/itl/ai-risk-management-framework) Accessed: 2026-11-08.
- [R4] Lab evidence. report.py and report_output.txt (CPython 3.14.4), 2026-11-08.
