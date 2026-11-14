> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C18_Lab_Kit.zip](/downloads/labs/RedKross_C18_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C18/...` refer to the extracted `C18` folder. Everything runs locally against systems you own.

## Practical 1: Measure injection mitigations

---------------------------------------------------

**Objective:** Reproduce and extend the layered-defence measurements.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; Ollama with a local model; LAB_ASSETS/C18/banyanbot.

**Prerequisites:** Lessons L01-L05.

**Environment setup:** ollama pull qwen3:4b; copy the folder.

**Explicit authorised scope:** the local bench only; probes are benign (canaries and a simulated tool).

**Step-by-step instructions:**

1. Run python probes.py 5 then python summarise.py; compare with L05.
2. Replace kb/partner_offer.md with the comment variant (copy partner_offer_comment_variant.md.txt over it); re-run P3 only and compare. Restore the original afterwards.
3. Reword the planted lines so the sanitiser patterns do not match (keep the content benign: a different canary word); measure hardened P3 again and explain the result.
4. Run with 10 seeds and discuss how the counts change.
5. If you have a second local model, repeat and compare.

**Expected observations:** counts vary by placement, wording, model and seed; deterministic layers keep P4-P6 at zero.

**Troubleshooting:** runs take several minutes; reduce seeds while experimenting.

**Cleanup:** restore kb/partner_offer.md (check with python supply_check.py).

**Learning outcome:** you can measure prompt-injection defences honestly.

## Practical 2: Ingestion policy for untrusted content

------------------------------------------------------------

**Objective:** Write an ingestion policy and test it with kb_audit.py.

**Difficulty:** Advanced.

**Required tools:** text editor; kb_audit.py.

**Prerequisites:** Lesson L03.

**Environment setup:** copy the folder.

**Explicit authorised scope:** the fictional knowledge base.

**Step-by-step instructions:**

1. Define trust labels and which labels may be retrieved for which request types.
2. Define audit checks and the human review process for HIGH findings.
3. Run python kb_audit.py; confirm it flags partner_offer.md lines 5-6.
4. Add a new check of your own and a test document that triggers it.

**Expected observations:** the planted page is flagged before indexing.

**Troubleshooting:** avoid patterns that flag normal business text.

**Cleanup:** remove test documents.

**Learning outcome:** you can control untrusted content at ingestion.
