## Revision

### Summary

Intelligence is analysed, evaluated information answering a consumer's question; it serves strategic, operational, tactical and technical levels. Requirements (PIR, SIR, EEI) come from consumers' decisions and make collection possible; the lab showed a PIR with no SIRs and an EEI with no collection. The lifecycle runs direction, collection, processing, analysis, dissemination and feedback. Judgments need a likelihood term from a fixed scale (ICD 203: almost no chance 01-05% to almost certain 95-99%) and a separate confidence statement; ICD 203 forbids combining them in one sentence, which the lab's linter now enforces. Biases (confirmation, anchoring, availability, mirror imaging, groupthink) are countered with structured techniques such as key assumptions checks and ACH. Value is measured by decisions and actions, not volume. Log4Shell showed requirements changing within hours.

### Important concepts

levels of intelligence; PIR/SIR/EEI; collection gaps; likelihood versus confidence; structured analysis.

### Key technical takeaways

keep requirements in a file with owners; lint judgments; version products during crises.

### Glossary

| Term | Meaning |
|---|---|
| ACH | Analysis of competing hypotheses. |
| EEI | Essential element of information. |
| ICD 203 | US Intelligence Community Directive on analytic standards. |
| PIR | Priority intelligence requirement. |
| SIR | Specific intelligence requirement. |

### Common mistakes

topic lists instead of requirements; "may/could"; confidence and likelihood in one sentence; measuring volume.

### Revision questions

​1. Name the six lifecycle phases. 2. Give the seven likelihood terms. 3. Explain likelihood versus confidence.

### Further reading

[R1]; [R2].

## References

- [R1] Office of the Director of National Intelligence. Intelligence Community Directive 203 "Analytic Standards" (signed 2 January 2015, with technical amendment). URL: [https://archive.dni.gov/files/documents/ICD/ICD-203.pdf](https://archive.dni.gov/files/documents/ICD/ICD-203.pdf) Accessed: 2026-11-07 (text extracted from the PDF). Supports: likelihood scale, separation of confidence and likelihood, sourcing standards.
- [R2] Caltagirone, S., Pendergast, A., Betz, C. "The Diamond Model of Intrusion Analysis", 2013. URL: [https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf](https://www.activeresponse.org/wp-content/uploads/2013/07/diamond.pdf) Accessed: 2026-11-07. Supports: analytic modelling (used in Module 4).
- [R3] CISA. "Apache Log4j Vulnerability Guidance". URL: [https://www.cisa.gov/news-events/news/apache-log4j-vulnerability-guidance](https://www.cisa.gov/news-events/news/apache-log4j-vulnerability-guidance) Accessed: 2026-11-07 (verified in an earlier library course). Supports: CS1 versions, upgrades, ED 22-02 date.
- [R4] Lab evidence. make_ti_data.py, requirements_view.py, estimative_lint.py, briefs/, m01_output.txt (CPython 3.14.4), 2026-11-07.
