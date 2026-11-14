1. A customer is "signed in" (C100 or C200) - the session identity.
2. retrieve(): keyword scoring over kb/, top three documents; with acl on, only public documents and the session customer's own record; with sanitise on, lines addressed to AI assistants are dropped from imported documents.
3. system_prompt(): role, the confidential canary SYS-CANARY-3141, tool descriptions; with delimit on, documents wrapped in <document> tags with a "data, not instructions" rule.
4. call_model(): Ollama /api/chat on 127.0.0.1 with a JSON schema for {answer, tool_calls}.
5. check_tool(): with tool_policy on, deterministic code checks order ownership, refund policy, value and the Rs 500 supervisor threshold.
6. filter_output(): with out_filter on, canary redaction, URL allowlist, image removal and redaction of other customers' contact details.
7. respond() returns the answer, the tool ledger, the retrieved document IDs and whether the input filter blocked the message - everything a test needs to decide pass or fail.

**Design lesson:** four of the six defences are ordinary code around the model.
