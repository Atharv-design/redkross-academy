Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A fictional bank's SOC has 40,000 alerts a day and four Tier 1 analysts.

**Task:** Propose changes to people, process and technology.

> [!TIP] Model answer
> 40,000 alerts for four analysts is unworkable (about 10,000 each). Process: measure volume and false-positive rate per rule; retire or tune the noisiest; aggregate duplicates; prioritise by asset criticality. Technology: SOAR enrichment and automatic closure of well-understood benign patterns with sampling review; correlation rules that alert on combinations. People: detection engineering capacity; training; realistic staffing; shift rotas.
>
> **Lesson:** alert volume is a design problem.

## Scenario 2

An MSSP contract for a fictional hospital says only "monitoring of logs".

**Task:** List what the contract should specify.

> [!TIP] Model answer
> Log sources in scope; hours and coverage; detection content and tuning responsibilities; severity definitions and response times; escalation contacts and methods (24x7); containment authority; evidence handling and retention (including 180-day CERT-In logs); reporting and regulatory support (CERT-In 6 hours, DPDP); data protection and access controls; metrics and reviews; exit and data return.
>
> **Lesson:** contracts define what actually happens at 3 a.m.

## Scenario 3

A Tier 1 analyst suspects ransomware precursors at 03:00 but the playbook says "escalate during business hours".

**Task:** Advise.

> [!TIP] Model answer
> Escalate immediately via the emergency path (on-call), documenting evidence; ransomware precursors are time-critical and the 6-hour CERT-In clock may start on noticing. Afterwards, raise a playbook change: severity-based out-of-hours escalation.
>
> **Lesson:** playbooks support judgement; they must not block urgent response.
