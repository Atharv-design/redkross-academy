Execution-tested (python supply_check.py; approved_models.json lists only qwen3:4b with its digest; kb_manifest.json from kb_audit.py --write-manifest):

```text
------------------------------------------------------------- BEGIN OUTPUT
== models
  qwen3:4b     359d7dd4bcda 4.0B Q4_K_M gguf -> APPROVED
  qwen3:8b     500a1f067a9f 8.2B Q4_K_M gguf -> NOT APPROVED
  moondream:latest 55fc3abd3867 1B Q4_0 gguf -> NOT APPROVED
  tinyllama:latest 2644915ede35 1B Q4_0 gguf -> NOT APPROVED
== knowledge base
  customer_C100.md     c9d9c5fae188 OK
  ...
  partner_offer.md     85119820acb5 OK
  plans.md             97ec8fa982fc OK
summary: 3 item(s) need review
### after an unreviewed edit to plans.md (lab simulation)
  plans.md             2045601018bc CHANGED
summary: 4 item(s) need review
--------------------------------------------------------------- END OUTPUT
(some KB lines omitted; digests truncated by the script)
```

**Reading it:** the content team's machine had three other local models that were never approved; the check flags them (your list will differ). After a deliberate test edit to plans.md the file is reported CHANGED; restoring it returned the summary to three items. In production: deploy only approved digests, fail the pipeline on NOT APPROVED or CHANGED, re-approve through review, and run the check on a schedule.
