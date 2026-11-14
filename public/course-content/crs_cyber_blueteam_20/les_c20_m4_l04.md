Each rule gets a test file of named cases, each with an event and an expected result:

- positive cases: the behaviour the rule exists to catch (true must match);
- negative cases: similar but benign events (the false positives you know about must not match);
- edge cases: boundary conditions such as case variations, paths without the expected separator, missing fields, and a filter that must exclude exactly what it claims.

The Tamarind tests include "admin_host_filtered" (net group "domain admins" on ADM-01 must not match) and "long_label_a_record" (a 28-character label in an A query must not match the TXT rule). A rule with no tests fails the release gate in Module 8. Tests must use synthetic or sanitised events; never paste real user data into a repository. Beyond unit tests, run each rule against a reference day of real telemetry to measure alert volume (Module 8's false-positive budget), and against replayed attack telemetry (Module 7).
