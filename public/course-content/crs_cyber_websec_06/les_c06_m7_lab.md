> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C06_Lab_Kit.zip](/downloads/labs/RedKross_C06_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C06/...` refer to the extracted `C06` folder. Everything runs locally against systems you own.

## Practical 1: Fix the business-logic flaw and audit for client trust

**Objective:** Apply server-side authority to the lab's business-logic example and find other places the client is trusted.

**Difficulty:** Intermediate.

**Required tools:** this module; LAB_ASSETS/C06 (target/app.py, app_fixed.py).

**Prerequisites:** Lessons L03-L04, L06.

**Environment setup:** optional - run the apps to read behaviour; design/code exercise.

**Explicit authorised scope:** your own apps; code reading only.

**Step-by-step instructions:**

1. Write the UNSAFE client-trusted price pattern and the SAFE server-side lookup fix.
2. In target/app.py, list three values or decisions taken from client-supplied data (e.g. the role cookie, the session token value, the order id) and how the hardened app moves each to server-side state.
3. For a hypothetical single-use coupon, write the rule that makes it truly single-use (atomic mark-used) and sequence-safe.
4. State the unifying principle linking XXE, deserialization, business logic and API flaws.

**Expected observations:** every fix moves authority from the client to the server; the principle is "the client is untrusted; the server enforces".

**Troubleshooting:** if a "fix" still reads a security/business value from the request, it is not fixed.

**Cleanup:** stop any servers; throwaway data only.

**Learning outcome:** you can recognise and fix client-trust and business-logic flaws.

## Practical 2: Specify XXE, deserialization and API defences

**Objective:** Write the concrete defence for each advanced risk.

**Difficulty:** Intermediate.

**Required tools:** this module.

**Prerequisites:** Lessons L01-L02, L05-L06.

**Environment setup:** none.

**Explicit authorised scope:** design only.

**Step-by-step instructions:**

1. Write the parser setting that prevents XXE (disable external entities/DTD) and why it works.
2. State the rule for deserializing untrusted data and the safe format to use.
3. List three API risks (object-level authorisation, data exposure/mass assignment, resource consumption) and one defence each.
4. Explain how all of these reduce to "the server enforces from trustworthy state".

**Expected observations:** XXE fixed by parser config; untrusted data handled with JSON; API risks met with object-level checks, field control and rate limits.

**Troubleshooting:** if a defence relies on the client behaving, reconsider.

**Cleanup:** none.

**Learning outcome:** you can specify defences for XXE, deserialization and API risks.
