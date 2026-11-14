SQL injection (SQLi, CWE-89) occurs when input is concatenated into a SQL query so the input can alter the query [R2]. The classic example is an authentication bypass: a login query like

```text
SELECT ... WHERE username='<input>' AND password='<input>'
```

built by concatenation can be broken by input admin'-- , which comments out the password check, so the query returns the admin row and logs the attacker in. Beyond auth bypass, SQLi can read any table (data theft), modify or delete data, and in some configurations reach the host. Impact is typically High: full confidentiality, integrity and sometimes availability loss. In the lab, /login builds its query by string formatting, so user=admin'-- logs in without a password - findings.py confirms it, and the finding scores CVSS 9.8 (Critical).
