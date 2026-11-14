**Purple teaming is collaboration:** the people who emulate adversaries and the people who detect them work together, share what was done and what was seen, and fix gaps in short cycles. Validation methods, in order of realism and risk:

1. Telemetry replay  synthetic or recorded log events are fed to the detection logic. It is safe, fast and repeatable, and it tests rule logic and parsing, but not sensors.
2. Benign simulation  harmless actions that produce the same telemetry as a technique (for example a test scheduled task that runs a harmless command) in an isolated lab. It tests sensors and pipelines.
3. Adversary emulation  an authorised team reproduces a threat's behaviour end to end in an approved scope, using frameworks such as MITRE CALDERA or Red Canary's Atomic Red Team. It needs written authorisation, isolation and rollback plans (Course 19).

This course uses method 1 throughout. It is the right first step for detection engineers, because it isolates rule logic from sensor problems.
