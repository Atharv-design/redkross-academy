## Where each pattern applies

![A request passes through validation, authentication and object authorisation, then parameterised data access, and the response is encoded for its output context; errors are generic to clients and redacted in logs.](/assets/courses/cyber-12/C12-M03-F1.svg)
*Figure C12-M03-F1. The secure-coding patterns along a request's path.*

## Unsafe and safe forms

![A table pairing unsafe SQL, command, HTML and password-hashing code with the safe equivalent for each.](/assets/courses/cyber-12/C12-M03-F2.svg)
*Figure C12-M03-F2. Four common unsafe patterns and their safe replacements, matching the Module 4 SAST rules.*

## Object-level authorisation decision

![A flow that rejects invalid IDs, returns the same not-found response for missing or other users' records, and otherwise returns the record.](/assets/courses/cyber-12/C12-M03-F3.svg)
*Figure C12-M03-F3. The reference service's decision for a shipment read (execution-tested logic).*
