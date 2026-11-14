> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C12_Lab_Kit.zip](/downloads/labs/RedKross_C12_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C12/...` refer to the extracted `C12` folder. Everything runs locally against systems you own.

## Practical 1: Run and break the security tests

------------------------------------------------------

**Objective:** Prove that the tests detect a regression.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; LAB_ASSETS/C12/app.

**Prerequisites:** Lessons L01-L05.

**Environment setup:** copy the app folder to a work directory.

**Explicit authorised scope:** your copy of the lab code.

**Step-by-step instructions:**

1. Run python -m unittest test_shipments -v and record "OK".
2. Remove the owner check (row[1] != user) and rerun. Record which tests fail.
3. Change fullmatch to match and rerun. Record which inputs now pass validation.
4. Remove html.escape and rerun.
5. Restore the code and confirm all 8 tests pass.

**Expected observations:** step 2 fails test_other_user_denied and test_missing_and_forbidden_look_the_same. Step 3 fails test_malformed_ids_rejected for "TL-00000001 " and the appended-punctuation case, because match accepts trailing text. Step 4 fails the encoding test.

**Troubleshooting:** run from inside the app folder so the import works.

**Cleanup:** delete the work copy.

**Learning outcome:** you can show that tests enforce security requirements.

## Practical 2: Implement REQ-LOG-01

------------------------------------------

**Objective:** Add log redaction and a test.

**Difficulty:** Advanced.

**Required tools:** Python 3.10+; logging module.

**Prerequisites:** Lesson L06.

**Environment setup:** your work copy.

**Explicit authorised scope:** your copy.

**Step-by-step instructions:**

1. Write a logging.Filter that replaces values of keys named password, token or secret with "[REDACTED]" in log records.
2. Log a failed login with a password and a token in the message arguments.
3. Write a test using self.assertLogs that asserts the password and token do not appear in the output.
4. Add the test to the suite and run it.

**Expected observations:** log lines show [REDACTED], and the test passes.

**Troubleshooting:** filters on handlers and on loggers behave differently, so attach the filter where your test captures output.

**Cleanup:** none.

**Learning outcome:** you can enforce safe logging.
