## RBAC objects and scope

![Diagram showing a Role bound by a RoleBinding, and a ClusterRole bound either by a RoleBinding for one namespace or by a ClusterRoleBinding for all namespaces, with a note that rights are a union.](/assets/courses/cyber-21/C21-M04-F1.svg)
*Figure C21-M04-F1. Where a grant applies depends on the binding type, not only the role type.*

## Escalation routes to watch

![Seven rows, each pairing a permission with the access it effectively provides.](/assets/courses/cyber-21/C21-M04-F2.svg)
*Figure C21-M04-F2. Permissions that are effectively more powerful than they look.*

## Bound token lifecycle

![A timeline from pod creation through token issue and refresh to pod deletion, when the token is rejected.](/assets/courses/cyber-21/C21-M04-F3.svg)
*Figure C21-M04-F3. A pod-bound token is valid only while its pod exists, whatever its exp claim says.*
