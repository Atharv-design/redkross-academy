Semgrep is an open-source, multi-language static analysis tool whose rules look like the code they match [R1]. The course rule set (LAB_ASSETS/C12/sast/rules.yml):

```text
---------------------------------------------------------------- BEGIN CODE
rules:
  - id: rk-sql-fstring
    languages: [python]
    severity: ERROR
    message: SQL built with an f-string; use a parameterised query (? placeholders).
    metadata: {cwe: "CWE-89", course: "C12-M04"}
    pattern: $DB.execute(f"...", ...)
  - id: rk-subprocess-shell-true
    languages: [python]
    severity: ERROR
    message: subprocess with shell=True; pass an argument list without a shell.
    metadata: {cwe: "CWE-78", course: "C12-M04"}
    pattern: subprocess.$FUNC(..., shell=True, ...)
  - id: rk-weak-hash-md5
    languages: [python]
    severity: WARNING
    message: MD5 is unsuitable for passwords or integrity; use hashlib.scrypt
             (passwords) or sha256.
    metadata: {cwe: "CWE-328", course: "C12-M04"}
    pattern: hashlib.md5(...)
------------------------------------------------------------------ END CODE
```

**Elements:**

```text
id          stable identifier, used in reports and suppressions.
languages   which parsers to use.
severity    INFO, WARNING or ERROR. Drives gate thresholds.
message     tells the developer what to do, not just what is wrong.
metadata    CWE mapping, owner, references.
pattern     code-like template:
              $DB, $FUNC   metavariables that match any expression or name;
              ...          matches any arguments or statements;
              f"..."       matches any f-string.
```

**Further operators:** pattern-either (OR), patterns (AND), pattern-not (exclusions), pattern-inside (context) and taint mode (mode: taint with pattern-sources, pattern-sinks and pattern-sanitizers). Keep each rule small and specific, and add a test file with positive and negative examples. Semgrep supports annotations such as "# ruleid:" and "# ok:" for rule tests.
