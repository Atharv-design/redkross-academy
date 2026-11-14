## Authentication versus authorisation

![A diagram contrasting authentication (who you are) with authorisation (what you may do), split into object-level and function-level checks.](/assets/courses/cyber-06/C06-M04-F1.svg)
*Figure C06-M04-F1. Authentication and authorisation are distinct; broken access control is a missing authorisation check.*

## IDOR in the lab

![A flow showing a user changing an order id to read another user's order in the vulnerable app, and the ownership check that returns 403 in the hardened app.](/assets/courses/cyber-06/C06-M04-F2.svg)
*Figure C06-M04-F2. IDOR: lookup by client id with no ownership check exposes another user's object; the fix enforces ownership [R2].*

## Broken function-level control in the lab

![A comparison of the vulnerable admin check that trusts a client-supplied role cookie against the hardened check that requires an authenticated admin session.](/assets/courses/cyber-06/C06-M04-F3.svg)
*Figure C06-M04-F3. The vulnerable /admin trusts a client cookie; the fix requires a server-side admin session.*
