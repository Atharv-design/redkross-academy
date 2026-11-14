**A test plan states:**

- authorisation: written approval from the system owner; named testers; for vendor systems, the vendor's permission or published testing policy;
- objectives: the failures to look for, mapped to the threat model (Module 1) - for BanyanBot, P1-P6;
- scope: which environment (a test deployment, never production data unless approved), which features, which accounts;
- safety rules: benign probes only; canaries instead of real secrets; simulated or sandboxed tools; no real personal data; stop conditions;
- data handling: where prompts, outputs and logs are stored and for how long;
- success criteria: for example "0 failures in N runs for P2-P6 and utility >= 80%";
- reporting: audience, format, severity scheme, retest plan.

Course 19's rules-of-engagement discipline applies unchanged.
