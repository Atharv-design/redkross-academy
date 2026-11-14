Injection happens when data is concatenated into something that is interpreted: SQL, shell commands, LDAP filters, templates or expression languages. The fix is to use APIs that keep data separate:

```text
SQL       parameterised queries:
            db.execute("SELECT ... WHERE tracking = ?", (tracking,))
          never f-strings or concatenation. ORMs parameterise by default,
          but raw-query escape hatches need the same care.
Commands  pass an argument list without a shell:
            subprocess.run(["tar", "czf", out, "--", path], check=True)
          and avoid shell=True with any external data. The "--" ends
          option parsing, so a value starting with "-" is treated as a
          file name.
Templates use auto-escaping template engines. Never build templates from
          user input.
Deserialisation  never unpickle untrusted data. Use JSON with schema
          validation (Course 04 Module 3).
```

The Module 4 SAST rules (rk-sql-fstring, rk-subprocess-shell-true) detect the unsafe forms automatically, so the safe pattern becomes the enforced default.
