## Advanced risks and their defences

![A table of advanced risks (XXE, insecure deserialization, business logic, API object access, API data exposure) with each cause and defence.](/assets/courses/cyber-06/C06-M07-F1.svg)
*Figure C06-M07-F1. Each advanced risk, its cause, and its defence [R1][R5].*

## Business logic flaw - client-trusted price

![A comparison of trusting a client-supplied price against looking the price up server-side, with validated quantity and single-use coupon rules.](/assets/courses/cyber-06/C06-M07-F2.svg)
*Figure C06-M07-F2. The archetypal business-logic fix: server-side authority over prices, quantities and rules.*

## The unifying principle

![A diagram stating that all advanced risks reduce to the untrusted-client principle enforced server-side.](/assets/courses/cyber-06/C06-M07-F3.svg)
*Figure C06-M07-F3. The advanced risks share the course's single principle: do not trust the client; enforce on the server.*
