```text
Separate admin identities  administrators use distinct accounts for
                    privileged tasks, never for email or browsing.
Tiering             tier 0 (identity, PKI, hypervisors, cloud
                    organisation root) separated from tier 1 (servers,
                    apps) and tier 2 (user devices); credentials never
                    cross downwards.
Privileged access workstations (PAWs)  hardened, managed devices used only
                    for administration.
Just-in-time (JIT) / just-enough  elevation requested, approved and
                    time-limited (e.g., 1-4 hours), with standing admin
                    rights near zero.
Session controls    brokered sessions with recording for high-risk
                    systems; command logging.
Break-glass         a small number of emergency accounts, strongest
                    authentication stored securely, alerts on any use,
                    tested periodically.
Monitoring          alert on admin group changes (Course 08 rule R3),
                    unusual elevation, and use outside PAWs.
```
