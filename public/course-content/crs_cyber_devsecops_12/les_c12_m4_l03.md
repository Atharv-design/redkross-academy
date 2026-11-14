Execution-tested (semgrep 1.184.0 in python:3.12-slim; LAB_ASSETS/C12/sast):

```text
semgrep scan --config rules.yml --metrics=off --disable-version-check
  --quiet --text legacy_reports.py
```

```text
------------------------------------------------------------- BEGIN OUTPUT
3 Code Findings
  legacy_reports.py
   rk-sql-fstring
      SQL built with an f-string; use a parameterised query (? placeholders).
        8| return db.execute(f"SELECT * FROM customers WHERE name =
           '{name}'").fetchall()
   rk-subprocess-shell-true
      subprocess with shell=True; pass an argument list without a shell.
       16| subprocess.run(f"tar czf /backups/out.tgz {path}", shell=True,
           check=True)
   rk-weak-hash-md5
      MD5 is unsuitable for passwords or integrity; ...
       24| return hashlib.md5(pw.encode()).hexdigest()
exit=0
--------------------------------------------------------------- END OUTPUT
(execution-tested 2026-11-07; box-drawing characters removed, lines wrapped)
```

Then, as a gate with --error and JSON output:

```text
gate_exit=1
[('rk-sql-fstring', 8), ('rk-subprocess-shell-true', 16),
 ('rk-weak-hash-md5', 24)]
```

(execution-tested)

**Observations:**

- All three unsafe functions were found, and none of the safe variants (find_customer_safe, archive_safe) were flagged. The rules separate the Module 3 patterns precisely.
- Without --error, the scan exited 0 despite findings. A pipeline relying on the exit code would never have blocked. With --error, the exit code was 1. Always test that the gate actually fails (Module 1).
- The fourth MD5 call (file_checksum, line 29) was not reported, because it carries a justified suppression comment (L05).
- --metrics=off disables usage telemetry. Check the tool's data-handling settings before scanning proprietary code, particularly for cloud features.
