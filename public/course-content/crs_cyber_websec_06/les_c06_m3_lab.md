> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C06_Lab_Kit.zip](/downloads/labs/RedKross_C06_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C06/...` refer to the extracted `C06` folder. Everything runs locally against systems you own.

## Practical 1: Confirm the weak session and reason about forgery

**Objective:** Prove the lab's session token is predictable/forgeable and specify the secure design, on a target you own.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C06 (findings.py, target/app.py, target/app_fixed.py).

**Prerequisites:** Lessons L03-L04.

**Environment setup:** run both target apps (8200 vulnerable, 8201 hardened) in separate terminals; loopback only.

**Explicit authorised scope:** 127.0.0.1 only; your own apps.

**Step-by-step instructions:**

1. Run python findings.py --port 8200 and read the Weak session cookie result and the Set-Cookie value.
2. Decode the cookie value from base64 and confirm it is the username.
3. Reason (do not attack anything external) about how an attacker forges the admin token by encoding "admin".
4. Run python findings.py --port 8201 and confirm the weak-session check is absent; read the hardened Set-Cookie (random value, HttpOnly, SameSite).
5. Write the four rules of secure session design.

**Expected observations (execution-tested):** vulnerable token is base64(username) with no attributes (PRESENT); hardened token is random with HttpOnly and SameSite=Strict (absent).

**Troubleshooting:** if port 8201 is not answering, start app_fixed.py.

**Cleanup:** stop both servers; throwaway data only.

**Learning outcome:** you can identify and remediate a weak session design.

## Practical 2: Design a safe recovery and MFA plan

**Objective:** Specify a secure "forgot password" flow and an MFA policy.

**Difficulty:** Intermediate.

**Required tools:** this module.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none (design exercise).

**Explicit authorised scope:** design only.

**Step-by-step instructions:**

1. Write a reset-token design (entropy, single-use, expiry, storage, session rotation, notification).
2. List three MFA weaknesses and the design choice that mitigates each.
3. State why a hardware security key (WebAuthn/FIDO2) is phishing-resistant.
4. Describe how you would screen new passwords against breached lists.

**Expected observations:** a design that treats recovery as critically as login and prefers phishing-resistant MFA.

**Troubleshooting:** if a step relies on "security questions", reconsider - they are weak.

**Cleanup:** none.

**Learning outcome:** you can design safe recovery and MFA.
