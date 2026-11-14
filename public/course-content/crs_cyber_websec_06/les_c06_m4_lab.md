> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C06_Lab_Kit.zip](/downloads/labs/RedKross_C06_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C06/...` refer to the extracted `C06` folder. Everything runs locally against systems you own.

## Practical 1: Confirm IDOR and the broken admin check

**Objective:** Prove both access-control flaws on your owned lab and read the root cause in the code.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C06 (findings.py, target/app.py, target/app_fixed.py).

**Prerequisites:** Lessons L02-L03, L06.

**Environment setup:** run both apps (8200, 8201) in separate terminals; loopback only.

**Explicit authorised scope:** 127.0.0.1 only; your own apps.

**Step-by-step instructions:**

1. Run python findings.py --port 8200 and read the IDOR and broken-/admin results.
2. In target/app.py, find the /account handler and confirm it has no ownership check; find /admin and confirm it trusts a role cookie.
3. In target/app_fixed.py, read the added ownership check (order username == session user) and the admin session-role check.
4. Run python findings.py --port 8201 and confirm both are absent.
5. Note the CVSS scores from report.py (8.2 and 6.5).

**Expected observations (execution-tested):** both PRESENT on 8200, both absent on 8201; the vulnerable code looks up by id/cookie without server-side checks.

**Troubleshooting:** ensure you are logged in as a normal user for the IDOR proof; the tool handles this automatically.

**Cleanup:** stop both servers; throwaway data only.

**Learning outcome:** you can identify, prove and remediate IDOR and function-level access-control flaws.

## Practical 2: Write the access-control checks

**Objective:** Specify the server-side checks that fix each flaw.

**Difficulty:** Intermediate.

**Required tools:** this module; the lab code.

**Prerequisites:** Lessons L05-L06.

**Environment setup:** none.

**Explicit authorised scope:** design/code reading only.

**Step-by-step instructions:**

1. Write pseudocode for the /account ownership check (deny unless owner or admin).
2. Write pseudocode for the /admin role check (deny unless session role is admin).
3. State the "deny by default" rule and where the user/role must come from.
4. Explain why neither check may rely on a client-supplied value.

**Expected observations:** checks derive identity and role from the server-side session and deny by default.

**Troubleshooting:** if your check reads a cookie or field the client sets, redesign it to use the session.

**Cleanup:** none.

**Learning outcome:** you can write correct server-side authorisation checks.
