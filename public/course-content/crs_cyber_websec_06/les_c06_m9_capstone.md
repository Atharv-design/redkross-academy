> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C06_Lab_Kit.zip](/downloads/labs/RedKross_C06_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C06/...` refer to the extracted `C06` folder. Everything runs locally against systems you own.

​### Objectives

Perform a complete, authorised, evidence-based web application security assessment of your own loopback lab, from authorisation to retest-proven closure, and present it as a professional deliverable.

​### Scenario

You are the application security engineer for "Sahyadri Reads", a web application you build and own and run on 127.0.0.1 only. You are authorised (by yourself, as owner) to assess it, report findings, remediate them, and retest. All work is on loopback; nothing else is in scope.

​### Requirements

1. Authorisation and scope: complete scope.md for the loopback target; confirm the out-of-scope and stop conditions.
2. Mapping: run map.py; produce the attack-surface table (entry point -> parameter -> sink -> hypothesised weakness).
3. Verification: run findings.py --save against the vulnerable app; confirm each weakness with the minimum safe check; keep the evidence (data/).
4. Scoring: confirm each finding's CVSS vector and score with cvss.py.
5. Reporting: run report.py; write an executive summary and the ten findings in priority order with evidence and remediation.
6. Secure code review: run codereview.py on app.py and app_fixed.py; for two findings, cite the vulnerable code line and the fix.
7. Remediation and retest: confirm app_fixed.py remediates every finding; run retest.py; show 10/10 closed.
8. Mandatory gate: evidence that every step was performed only against your own authorised loopback lab.

​### Deliverables

- Completed scope.md.
- Attack-surface table and the saved tool outputs (map, findings, report, retest, codereview) from data/.
- A written security report: executive summary + ten ranked findings (title, OWASP/CWE, CVSS vector/score/severity, evidence, impact, remediation).
- A short code-review note citing two vulnerable lines and their fixes.
- The retest result proving closure.

​### Rubric (0-4 per criterion; Competent = 3)

```text
Authorisation and scope: scope.md complete; loopback-only confirmed.
Mapping: complete, accurate attack-surface table.
Verification: each finding confirmed with a minimum safe, loopback-only
  check; evidence kept.
Scoring: correct CVSS vectors and severities.
Reporting: validated, ranked, actionable findings with an executive summary.
Code review: findings tied to specific code and fixes.
Remediation and retest: all findings remediated; retest shows 10/10 closed.
Professionalism and ethics: authorisation respected throughout; nothing out
  of scope; evidence of loopback-only.
```

​### Professional skills

End-to-end application security assessment, secure code review, CVSS scoring, risk-ranked reporting, remediation and retest, and the discipline of authorised, evidence-based, in-scope testing.
