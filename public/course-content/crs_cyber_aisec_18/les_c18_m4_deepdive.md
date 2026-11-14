1. Classification: customer_C100.md and customer_C200.md are personal data (names, phones, e-mails, orders) labelled customer:<id>; the rest are public.
2. Ingestion: kb_audit.py checks ACL presence, PII in public documents, customer records marked public, and text addressed to assistants; HIGH findings return exit code 1 so a pipeline can stop.
3. Retrieval: with acl on, only public documents and the session customer's record can be retrieved.
4. Prompt: no secrets beyond the canary (which stands in for anything that must not leak); in production, no secrets at all.
5. Output: redaction of other customers' e-mail and phone patterns, canary redaction, URL and image filters.
6. Logs: probe_results.json stores answers truncated to 300 characters; a production system would minimise and protect such logs.
7. Integrity: kb_manifest.json records SHA-256 hashes; supply_check.py reports CHANGED documents.
