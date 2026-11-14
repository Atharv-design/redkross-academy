Policies accumulate recurring weaknesses that a LINTER can detect automatically [R1]:

| Term | Meaning |
|---|---|
| No default-deny | the policy does not end with "deny all", so unmatched traffic may be permitted (a HIGH-severity gap). |
| Allow-any-any | a rule permits all sources to all destinations - a catastrophic over-permission. |
| Over-broad rules | an allow rule covers a huge port range (e.g. 1-65535) instead of the specific service ports. |
| Shadowed rules | a later rule can never fire because an earlier, broader rule already matches all its traffic - dead rules that hide intent and mislead reviewers. |
| Missing egress | only inbound is filtered; outbound (egress) is wide open. |

The lab's firewall.py lints exactly these. On the pre-hardening policy it reports a HIGH (no default-deny), a shadowed rule, a missing-egress finding and an over-broad port range; the hardened policy reports none.
