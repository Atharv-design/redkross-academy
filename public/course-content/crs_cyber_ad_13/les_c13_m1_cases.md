## Why the forest is the boundary - guidance after real forest compromises

**Context:** across many incident-response engagements through the late 2010s and early 2020s, attackers who gained control of one domain controller were repeatedly able to reach the entire forest, because trusts inside a forest are automatic, transitive and backed by a shared schema and configuration. Microsoft's security documentation responded by stating plainly that the forest, not the domain, is the security boundary, and that organisations needing genuine administrative isolation must use separate forests (the approach taken by its Enhanced Security Admin Environment / "Red Forest" and later the Enterprise Access Model) [R2].

**What defenders learned:**

- A "resource domain" in the same forest as production is not isolated from it; a breach of one is a breach of all.
- Recovery planning must be forest-wide: if any DC's secrets are stolen, the krbtgt account (Module 5) and trusts across the whole forest are in scope.

**Lessons:** draw your trust boundaries at the forest; design isolation and recovery at that level, not the domain.

## (FICTIONAL TEACHING SCENARIO): The branch-office server in the cupboard

**Context:** Sahyadri Logistics (fictional) runs a small warehouse branch with one server in an unlocked store cupboard. To "speed up logons" an administrator makes it a full, writable domain controller.

**What happened:** during a break-in the server is stolen. Because a writable DC holds the password material for the whole domain, the firm must treat every account as potentially compromised and perform a domain-wide credential reset.

**Response and prevention:** the firm replaces the branch server with a read-only domain controller (RODC), which by default caches no passwords and holds a read-only copy, so a stolen RODC exposes far less; and it applies physical controls. Had the branch truly needed isolation, a separate forest would have been considered (CS1).

**Lessons:** match DC type to the physical risk of the site; a writable DC in an insecure location is a domain-wide liability.
