## Why self-assessment tools became standard Context: through the late 2010s and into the 2020s, free and commercial Active Directory assessment tools (for example PingCastle and Microsoft's own guidance on AD security assessments) became a near-standard part of enterprise security programmes, precisely because the same handful of misconfigurations - Kerberoastable accounts, unconstrained delegation, over-privileged groups, stale admin accounts, weak krbtgt hygiene - recurred across organisations and were readily found by automated review [C13-M07-R2]. Microsoft's security documentation recommends regular, evidence-based review of these exact items. Why it matters for this module: the lab's dir_review.py performs the same class of checks by hand, so learners understand what those tools report and why - and can read, trust and act on the output rather than treating it as a black box. Lessons: automated assessment is now expected, not optional; the value is in acting on and re-testing findings, not in running the tool once; understand what each check means so you can triage expected conditions from real risk.



## (FICTIONAL TEACHING SCENARIO): The audit that found a plan, not a pile

**Context:** Sahyadri Logistics (fictional) faced an external audit of its identity controls. A year earlier the team had only tool dumps; this time it ran the Module 7 method.

**What happened:** the team presented a findings register scored HIGH/MEDIUM/LOW with evidence, a remediation plan with owners and due dates, and re-test results showing the previous HIGH (the legacy-svc SPN) closed and the tool's exit code now clean. The auditors could trace each control to evidence and each finding to a dated fix.

**Response:** the audit passed with minor observations; leadership funded the LAPS and PAW projects that appeared as MEDIUM-term items in the plan.

**Lessons:** auditors (and leadership) fund plans with evidence and owners, not tool output; re-test results are the proof of improvement; a repeatable method turns an audit from a scramble into a report.
