| Term | Meaning |
|---|---|
| ​1. Requirement | what behaviour must we detect and why (threat intel, incident lessons, ATT&CK gap analysis, audit findings). |
| ​2. Research | how does the behaviour look in telemetry? Which data sources and fields? What legitimate activity looks similar? |
| ​3. Develop | write the logic (Sigma or platform language). |
| ​4. Test | positive cases (must fire), negative cases (must not), historical replay (how noisy?). |
| ​5. Review | peer review of logic, severity, triage guidance. |
| ​6. Deploy | via version control and a pipeline, with a rollback plan. |
| ​7. Monitor | alert volume, true/false-positive rates, analyst feedback. |
| ​8. Tune or retire | narrow, reviewed changes (Module 4 L06); retire rules that no longer have value. |

The requirement and research steps are where most quality comes from.
