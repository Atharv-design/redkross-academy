> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C06_Lab_Kit.zip](/downloads/labs/RedKross_C06_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C06/...` refer to the extracted `C06` folder. Everything runs locally against systems you own.

## Practical 1: Start the lab and read its HTTP

**Objective:** Run the authorised lab application and observe raw HTTP requests, responses, status codes, headers and the session cookie.

**Difficulty:** Beginner.

**Required tools:** Python 3; LAB_ASSETS/C06 (target/app.py, map.py); a browser or curl.

**Prerequisites:** Lessons L01-L05.

**Environment setup:** in one terminal, run python target/app.py (binds to 127.0.0.1:8200 only).

**Explicit authorised scope:** 127.0.0.1 only; the app and tools you own.

**Step-by-step instructions:**

1. Start the app and confirm it prints the loopback URL.
2. Run python map.py --port 8200 and read the method/path/status/content-type map.
3. Visit [http://127.0.0.1:8200/login?user=asha&pw=reader123](http://127.0.0.1:8200/login?user=asha&pw=reader123) and inspect the response headers (browser dev tools or curl -i); find the Set-Cookie.
4. Decode the cookie value (base64) and note that it is just the username - a forgeable token.
5. Note which security headers are absent in the response.

**Expected observations (execution-tested):** the map shows 200s for /, /search, /login, /account and a 403 for /admin; the login response sets session=YXNoYQ== with no HttpOnly/Secure/SameSite; no security headers are present; the Server banner reads SahyadriReads/0.9.

**Troubleshooting:** if the port is busy, stop other copies; the app binds loopback only and refuses other addresses by design.

**Cleanup:** stop the server with Ctrl+C; it holds only throwaway fictional data.

**Learning outcome:** you can read an HTTP exchange and spot state (cookies) and missing hardening (headers).

## Practical 2: Map methods to risks

**Objective:** Connect each HTTP mechanic to the weakness it enables.

**Difficulty:** Beginner.

**Required tools:** this module; the lab map.

**Prerequisites:** Lessons L01-L06.

**Environment setup:** none beyond P1.

**Explicit authorised scope:** lab notes only.

**Step-by-step instructions:**

1. For each of GET, POST, cookies, sessions and security headers, write one sentence on the weakness its misuse enables (e.g. GET for state change -> CSRF).
2. For the lab's session cookie, list the three attributes it is missing and the attack each omission enables.
3. Identify, from the map, the one response that discloses software/version and explain the (minor) risk.

**Expected observations:** GET-for-state -> CSRF; no HttpOnly -> cookie theft via XSS; no SameSite -> CSRF; no Secure -> leak over HTTP; banner -> information disclosure.

**Troubleshooting:** if unsure, re-read L03-L05 and the deep dive.

**Cleanup:** none.

**Learning outcome:** you can reason from mechanic to weakness to defence.
