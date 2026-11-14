> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C18_Lab_Kit.zip](/downloads/labs/RedKross_C18_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C18/...` refer to the extracted `C18` folder. Everything runs locally against systems you own.

## Practical 1: Extend and test the tool policy

-----------------------------------------------------

**Objective:** Add a rule and prove it with tests.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; LAB_ASSETS/C18/banyanbot (bot.py, tool_policy_test.py).

**Prerequisites:** Lessons L03-L05.

**Environment setup:** copy the folder.

**Explicit authorised scope:** the local bench; tools are simulated.

**Step-by-step instructions:**

1. Run python -m unittest -v tool_policy_test; confirm 7 tests pass.
2. Add a rule: at most one refund per order (keep a set of refunded orders in memory); write a failing test first, then implement.
3. Add a rule: refunds require "confirmed": true in the arguments, which the UI sets only after the customer clicks a confirmation; test it.
4. Re-run probes P1 and P5 (python probes.py 3 after editing PROBES or calling respond() directly) and record the effect on utility.

**Expected observations:** new tests pass; P1 utility may fall unless the confirmation step is modelled.

**Troubleshooting:** keep policy pure and deterministic.

**Cleanup:** none.

**Learning outcome:** you can build tested tool permission boundaries.

## Practical 2: Output handling review

--------------------------------------------

**Objective:** Review an AI feature's output sinks.

**Difficulty:** Advanced.

**Required tools:** text editor.

**Prerequisites:** Lessons L01-L02, L06.

**Environment setup:** none.

**Explicit authorised scope:** BanyanBot or a feature you own.

**Step-by-step instructions:**

1. List every place model output goes (UI, logs, e-mail, tools, analytics).
2. For each, state the encoding/validation applied and the risk if missing.
3. Test filter_output() with five inputs of your own (allowed link, unknown link, image, other customer's phone, the canary).
4. Write the accuracy test set (ten known questions with expected answers) for policy and price questions.

**Expected observations:** every sink has a named control.

**Troubleshooting:** remember notifications and exported transcripts.

**Cleanup:** none.

**Learning outcome:** you can secure AI output handling.
