## Secret delivery without secrets in code

![Configuration in git contains only a secret reference; the service uses its workload identity to fetch the value from a secrets manager that logs access and supports rotation.](/assets/courses/cyber-12/C12-M06-F1.svg)
*Figure C12-M06-F1. Configuration holds references. The running service fetches secret values using its own identity.*

## Why deletion is not removal

![Three commits, with the key added in the middle commit and removed in the latest; the working tree is clean but history still contains the key.](/assets/courses/cyber-12/C12-M06-F2.svg)
*Figure C12-M06-F2. The lab repository's history: the key persists in an earlier commit (execution-tested).*

## Leaked-secret response order

![Five ordered steps from revoking the secret through investigation, fixing the cause, optional history cleaning and recording lessons.](/assets/courses/cyber-12/C12-M06-F3.svg)
*Figure C12-M06-F3. Revocation comes first; history cleaning cannot undo exposure.*
