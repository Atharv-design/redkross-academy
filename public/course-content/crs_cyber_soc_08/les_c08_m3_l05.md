Correlation links events across time, sources and entities. Patterns:

| Term | Meaning |
|---|---|
| Sequence | A then B within T (spray failures then success). |
| Threshold | N events in window (Course 04 Module 6). |
| Combination | events from different sources sharing an entity (proxy download + Office spawning PowerShell on the same host). |
| Absence | expected event missing (log source silent). |

minisiem's rule R2 (execution-tested) joins VPN successes to earlier VPN failures from the same IP:

```text
---------------------------------------------------------------- BEGIN CODE
SELECT s.src_ip, COUNT(DISTINCT f.user) AS users_failed, s.user AS success_user, s.ts
FROM events s JOIN events f ON f.src_ip = s.src_ip
WHERE s.source='vpn' AND s.outcome='success' AND f.source='vpn'
  AND f.outcome='failure' AND f.ts <= s.ts
GROUP BY s.src_ip, s.user, s.ts HAVING users_failed >= 5
------------------------------------------------------------------ END CODE
Result: ('203.0.113.66', 8, 'gopal', '2026-11-03T06:46:00Z')
```

**Line by line:** s = successes, f = failures; join on the same source IP; only failures at or before the success; count distinct users who failed; keep cases with at least five. One row: eight users sprayed, then gopal's account succeeded - a high-priority alert (Module 4). All six minisiem rules fired exactly once on the storyline (execution-tested "rules" output: R1 office_spawns_script, R2 vpn_spray_then_success, R3 new_local_admin (2 events), R4 large_upload, R5 log_cleared, R6 beacon_regular_small).
