> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C06_Lab_Kit.zip](/downloads/labs/RedKross_C06_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C06/...` refer to the extracted `C06` folder. Everything runs locally against systems you own.

## Practical 1: Confirm SQLi and XSS safely, then read the fixes

**Objective:** Prove SQL injection and reflected/stored XSS on your owned lab using benign markers, and read the parameterisation and encoding fixes.

**Difficulty:** Intermediate.

**Required tools:** Python 3; LAB_ASSETS/C06 (findings.py, target/app.py, target/app_fixed.py).

**Prerequisites:** Lessons L02-L06.

**Environment setup:** run both apps (8200, 8201) in separate terminals; loopback only.

**Explicit authorised scope:** 127.0.0.1 only; your own apps; benign markers only.

**Step-by-step instructions:**

1. Run python findings.py --port 8200 and read the SQLi and two XSS results.
2. In target/app.py, find the concatenated login query and the unencoded output in /search and /reviews.
3. In target/app_fixed.py, read the parameterised query (execute(sql, params)) and the html.escape output encoding plus the CSP header.
4. Run python findings.py --port 8201 and confirm all three are absent.
5. Note the CVSS scores from report.py (9.8, 6.1, 5.4).

**Expected observations (execution-tested):** all three PRESENT on 8200, absent on 8201; the vulnerable code concatenates input into SQL and renders input unencoded.

**Troubleshooting:** use only the benign markers the tool uses; never run destructive SQL, even against your own lab.

**Cleanup:** stop both servers; throwaway data only.

**Learning outcome:** you can identify, safely prove and remediate injection and XSS.

## Practical 2: Rewrite unsafe code to safe

**Objective:** Convert vulnerable patterns to safe ones.

**Difficulty:** Intermediate.

**Required tools:** this module; a text editor.

**Prerequisites:** Lessons L03, L05.

**Environment setup:** none.

**Explicit authorised scope:** code exercise only.

**Step-by-step instructions:**

1. Rewrite a concatenated SQL query as a parameterised query.
2. Rewrite an unencoded HTML output line to use contextual encoding (html.escape).
3. Write a minimal Content-Security-Policy that disallows inline script.
4. Explain why encoding at output (not only validating input) is required.

**Expected observations:** safe query uses parameter markers; safe output encodes special characters; CSP restricts script sources.

**Troubleshooting:** if your "fix" still formats input into the query string, it is not parameterised.

**Cleanup:** none.

**Learning outcome:** you can write injection- and XSS-safe code.
