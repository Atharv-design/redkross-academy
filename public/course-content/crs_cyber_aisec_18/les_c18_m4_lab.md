> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C18_Lab_Kit.zip](/downloads/labs/RedKross_C18_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C18/...` refer to the extracted `C18` folder. Everything runs locally against systems you own.

## Practical 1: Extend the ingestion audit

------------------------------------------------

**Objective:** Make kb_audit.py catch data-governance failures.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; LAB_ASSETS/C18/banyanbot/kb_audit.py.

**Prerequisites:** Lessons L03, L05.

**Environment setup:** copy the folder (work on the copy).

**Explicit authorised scope:** the fictional knowledge base.

**Step-by-step instructions:**

1. Run python kb_audit.py; confirm the two HIGH findings.
2. Add a test document marked public that contains a fictional phone number; confirm a HIGH "public document contains phone" finding.
3. Add a document with no acl line; confirm the finding.
4. Add a check that customer records contain no payment card patterns (use an obviously fictional pattern) and a test for it.
5. Remove your test documents and confirm the audit returns to two findings.

**Expected observations:** each governance rule has a failing test case.

**Troubleshooting:** keep regexes narrow to avoid false positives.

**Cleanup:** delete test documents; run supply_check.py to confirm kb/ matches the manifest.

**Learning outcome:** you can enforce data rules before indexing.

## Practical 2: Privacy impact assessment for BanyanBot

-------------------------------------------------------------

**Objective:** Complete a privacy assessment of the assistant.

**Difficulty:** Advanced.

**Required tools:** text editor; Course 17 PIA template.

**Prerequisites:** Lessons L04-L06.

**Environment setup:** none.

**Explicit authorised scope:** fictional organisation.

**Step-by-step instructions:**

1. Describe purposes, data categories (KB records, conversations, logs), data principals and recipients.
2. Identify lawful basis and notices, including telling users they are talking to an AI system.
3. Define retention for conversations and logs, and deletion routes.
4. List risks (P2, P4, P6 results) and controls; state residual risk.
5. List questions for legal counsel.

**Expected observations:** retrieval ACLs and output redaction appear as key safeguards.

**Troubleshooting:** separate legal questions from technical controls.

**Cleanup:** none.

**Learning outcome:** you can assess privacy risks of AI features.
