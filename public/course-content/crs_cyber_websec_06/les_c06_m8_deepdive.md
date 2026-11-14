Running the lab tools end to end produces a complete assessment. The report ranks the ten confirmed findings; execution-tested excerpt (CPython 3.14.4, 2026-11-08):

```output
EXECUTIVE SUMMARY
  10 confirmed findings: 1 critical, 3 high, 6 medium/low.
  Highest risk: SQL injection (login) (9.8). Fix in the order below.
 1. SQL injection (login)            9.8 Critical  A05 / CWE-89
 2. Broken access control (/admin)   8.2 High      A01 / CWE-284
 3. Path traversal (download)        7.5 High      A01 / CWE-22
 4. Server-side request forgery      7.5 High      A01 / CWE-918
 5. IDOR (other user's order)        6.5 Medium    A01 / CWE-639
 6. Cross-site request forgery       6.5 Medium    A01 / CWE-352
 7. Reflected XSS (search)           6.1 Medium    A05 / CWE-79
 8. Stored XSS (reviews)             5.4 Medium    A05 / CWE-79
 9. Weak session cookie              5.3 Medium    A07 / CWE-1004
10. Missing security headers         3.1 Low       A02 / CWE-693
```

After applying the remediations in app_fixed.py, retest.py runs the same checks against both apps. Execution-tested:

```output
weakness                         vuln:8200  fixed:8201 closed?
SQL injection (login)            PRESENT    absent     yes
Broken access control (/admin)   PRESENT    absent     yes
Path traversal (download)        PRESENT    absent     yes
Server-side request forgery      PRESENT    absent     yes
IDOR (other user's order)        PRESENT    absent     yes
Cross-site request forgery       PRESENT    absent     yes
Reflected XSS (search)           PRESENT    absent     yes
Stored XSS (reviews)             PRESENT    absent     yes
Weak session cookie              PRESENT    absent     yes
Missing security headers         PRESENT    absent     yes
vulnerable: 10/10 present | hardened: 0/10 present | closed: 10/10
```

This is the whole course in one view: ten weaknesses found and proven safely on an owned target, scored and ranked, each remediated in code, and every one confirmed closed by retest. The secure code review reinforces it: codereview.py flags many suspect lines in the vulnerable app and few in the hardened one, with the remaining hits being leads a reviewer confirms are now handled safely. Closure is proven, not assumed.
