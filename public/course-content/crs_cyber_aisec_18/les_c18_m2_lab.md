> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C18_Lab_Kit.zip](/downloads/labs/RedKross_C18_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C18/...` refer to the extracted `C18` folder. Everything runs locally against systems you own.

## Practical 1: Trace context assembly

--------------------------------------------

**Objective:** See exactly what enters the model's context.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; Ollama with qwen3:4b (or another local model); LAB_ASSETS/C18/banyanbot.

**Prerequisites:** Lessons L01, L02, L04.

**Environment setup:** ollama pull qwen3:4b; copy the folder.

**Explicit authorised scope:** the local bench only.

**Step-by-step instructions:**

1. Run python retrieval_trace.py and compare with L04.
2. In Python, print system_prompt("C100", retrieve(q, "C100", cfg), cfg) for the P3 question in NAIVE and HARDENED; mark untrusted text.
3. Change k from 3 to 5 in retrieve(); re-run; note token cost and which extra documents appear.
4. Ask a question as C200 and confirm C100's record never appears with ACLs on.

**Expected observations:** ACL changes which records are retrieved; token cost grows with k.

**Troubleshooting:** if Ollama is not running, start it (ollama serve).

**Cleanup:** restore k=3.

**Learning outcome:** you can audit context assembly.

## Practical 2: Design an agent's guardrails

--------------------------------------------------

**Objective:** Specify controls for an agent that triages support e-mails.

**Difficulty:** Advanced.

**Required tools:** text editor.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none.

**Explicit authorised scope:** design exercise.

**Step-by-step instructions:**

1. The agent reads incoming e-mails, looks up orders and can issue refunds and reply.
2. Split it into a reader (untrusted input, no tools) and an actor (tools, structured requests only).
3. Define tool permissions, step/budget limits and human approval points.
4. Define the logs and alerts.

**Expected observations:** no single component both reads untrusted e-mail and holds refund authority unchecked.

**Troubleshooting:** remember attachments and links as content.

**Cleanup:** none.

**Learning outcome:** you can bound agent behaviour by design.
