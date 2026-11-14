Azure RBAC assigns a role to a security principal at a scope (management group, subscription, resource group or resource); assignments inherit downwards. Key built-in roles [R3]:

```text
Owner                     full access including assigning roles
Contributor               full management, cannot assign roles
Reader                    view only
User Access Administrator manage user access to resources
Role Based Access Control Administrator  manage role assignments (can be
                          constrained with conditions)
```

Microsoft Entra roles (Global Administrator, Privileged Role Administrator, Application Administrator and others) govern the directory itself and are separate from Azure RBAC. Practice: assign roles to groups, at the narrowest scope, prefer Reader/Contributor-level custom roles over Owner, and make privileged roles eligible (Privileged Identity Management) rather than permanent. Application permissions granted to service principals (for example to read all mailboxes) are privileged too and need the same governance - the Midnight Blizzard lesson.
