## The Amazon S3 disruption, 28 February 2017 Context: AWS's summary states that an authorised S3 team member, "using an established playbook", executed a command intended to remove a small number of servers for one S3 subsystem. One input was entered incorrectly, and a larger set of servers was removed than intended, disrupting S3 in the Northern Virginia (US-EAST-1) region [C20-M06-R1]. AWS modified the tool to remove capacity more slowly. It also added safeguards to prevent capacity being removed when that would take a subsystem below its minimum required capacity. Lessons for security automation: the playbook existed and the operator was authorised, yet the missing controls were input validation, a rate limit and a safety floor. Containment playbooks need the same three: validate the target list against an inventory, act slowly and in batches, and never breach a floor (for example "never isolate more than N hosts or any tier-0 system without two approvals").



## (FICTIONAL TEACHING SCENARIO): The playbook that isolated the printers

This scenario is fictional. A Tamarind contractor wrote an auto-isolation playbook triggered by the regularity analytic from Module 3, without a rate limit or approval. On day one it isolated 38 printers that reported toner levels on a schedule. The printers dropped off the network, invoices could not be printed and the warehouse stopped dispatching for two hours. The fix was approval gates for isolation, an allowlist of device classes and a cap of two containment actions per hour without a duty manager.

**Lesson:** automation amplifies detection quality, good or bad.
