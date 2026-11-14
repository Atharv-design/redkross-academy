## AWS policy evaluation (core)

![A flowchart: explicit deny leads to deny; otherwise an allow leads to allow; otherwise implicit deny.](/assets/courses/cyber-11/C11-M02-F1.svg)
*Figure C11-M02-F1. Explicit deny wins; without an allow the request is implicitly denied.*

## The MFA condition-key trap (lab)

![A table of three request types showing that the Bool form does not deny access-key requests while BoolIfExists does.](/assets/courses/cyber-11/C11-M02-F2.svg)
*Figure C11-M02-F2. With Bool, access-key requests escape the MFA deny.*

## Layers that bound privilege

![Nested layers from organisation guardrails down to resource policies, with effective permissions as their intersection.](/assets/courses/cyber-11/C11-M02-F3.svg)
*Figure C11-M02-F3. Each layer can only reduce what the next grants.*
