The definitive fix for SQLi is the PARAMETERISED QUERY (prepared statement): the SQL structure is fixed and written by the developer, and input is passed separately as bound parameters that the database treats strictly as data, never as SQL. In Python's sqlite3 this is

```text
cur.execute("SELECT ... WHERE username=? AND password=?", (user, pw))
```

​- the ? parameter markers bind the values; no amount of SQL in the input changes the query. Never build SQL by concatenation or string formatting with input.

**Supporting controls:** least-privilege database accounts (so a successful injection reaches less), input validation (allowlist), and an ORM used correctly. The hardened lab app uses parameterised queries throughout; the SQLi finding is absent after the fix [R3].
