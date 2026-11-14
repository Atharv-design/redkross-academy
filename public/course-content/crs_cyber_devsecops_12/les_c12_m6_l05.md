Treat every leaked secret as compromised, whatever its visibility (private repository, quickly deleted). Order matters:

1. Revoke or rotate immediately at the issuer (cloud console, provider dashboard, secrets manager). This is the step that removes the risk.
2. Investigate use. Review the issuer's audit logs (for cloud keys, CloudTrail or the Activity Log, Course 11) from the time of the leak to revocation, looking for unknown source IPs or unusual actions. Escalate per the incident process if misuse is found (Course 08 Module 7).
3. Fix the cause. Move the secret to a secrets manager or workload identity, and add pre-commit and CI scanning.
4. Clean history only after revocation, if policy requires it, using tools such as git filter-repo, then force-push and coordinate clones, forks and caches. Cleaning history does not undo exposure. That is why revocation comes first.
5. Record the incident and lessons, and check for the same secret elsewhere (other repositories, images, wikis).

Pre-agree with providers and owners how fast each secret type can be rotated. A secret that cannot be rotated quickly is itself a risk finding.
