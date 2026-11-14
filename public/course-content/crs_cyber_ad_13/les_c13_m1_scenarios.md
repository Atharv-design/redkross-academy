Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A business unit wants to be "completely separate and unable to affect the rest of our Active Directory", and proposes a new child domain.

**Task:** Explain whether a child domain achieves this, and what would.

> [!TIP] Model answer
> A child domain does NOT achieve isolation: it is in the same forest, so it shares the schema and configuration and is joined by automatic, transitive trusts; control of any DC in the forest can reach every domain. True isolation requires a SEPARATE FOREST, with only the specific trusts you choose (one-way, non-transitive, SID-filtered as needed). Explain the cost: a separate forest means separate administration and recovery.
>
> **Lesson:** the forest, not the domain, is the boundary.

## Scenario 2

After a change, users report that logons and Group Policy have stopped working across the site, although the DC is powered on and reachable by ping.

**Task:** Give the most likely cause and the first checks you would run.

> [!TIP] Model answer
> The most likely cause is DNS. Clients locate the DC through SRV records; if clients point at a resolver that no longer serves the AD zone (or the DC's DNS role failed), logon, Kerberos and Group Policy all fail even though the host pings. First checks: on a client, resolve _ldap._tcp.<domain> and _kerberos._tcp.<domain>; confirm clients use the AD DNS servers; check the DC's DNS service and the AD DNS zone. This mirrors the lab's "Could not find a DC" fix.
>
> **Lesson:** in AD, "nothing works" usually means DNS first.

## Scenario 3

A branch office with no server room needs faster local logons.

**Task:** Recommend a domain-controller approach and justify it in security terms.

> [!TIP] Model answer
> Deploy a read-only domain controller (RODC) at the branch for fast local authentication, configured to cache only the branch users' passwords (a password replication policy). Because an RODC caches no other secrets and holds a read-only copy, theft or compromise of the branch server exposes far less than a writable DC would. Add physical controls. If the branch needed genuine isolation rather than speed, consider a separate forest.
>
> **Lesson:** match DC type to the physical risk of the location.
