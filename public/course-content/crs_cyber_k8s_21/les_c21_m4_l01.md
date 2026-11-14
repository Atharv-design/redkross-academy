Kubernetes has no user database. It trusts authenticators you configure:

- People: use an identity provider through OIDC (or a provider's integration) so that joiners, leavers, MFA and groups are managed in one place. Map groups, not individuals, to roles.
- Client certificates: convenient for bootstrapping, but Kubernetes does not support certificate revocation, so a leaked administrator certificate is valid until it expires or the CA is rotated. Keep certificate-based admin credentials for break-glass only, stored offline, with short validity.
- Pipelines: prefer workload identity federation (the CI system's OIDC token exchanged for short-lived access) over long-lived static tokens stored in CI variables.
- Pods: service account tokens (L04).

The group system:masters bypasses RBAC authorisation entirely and cannot be restricted by any role. Never place day-to-day identities in it. In the lab it appeared in the RBAC review bound to cluster-admin, recorded as an accepted built-in break-glass group.
