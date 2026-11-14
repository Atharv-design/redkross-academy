Trust relationships are the pre-existing accesses that lateral movement abuses:

```text
account trust     an account valid on many hosts (shared local admin, a widely-
                  privileged service account) lets one credential open many doors.
host/service trust remote-management and file services that accept credentials
                  from across the network.
domain trust      authentication relationships (within and between domains) that
                  grant access widely (Course 13).
```

The more broadly a credential or trust is honoured, the farther an adversary can move with it. Assessing trust relationships means finding where trust is too broad - a local admin password reused everywhere, a service account over-privileged across hosts, flat network trust - so it can be narrowed. Narrow trust is the structural defence against lateral movement; detection is the backstop.
