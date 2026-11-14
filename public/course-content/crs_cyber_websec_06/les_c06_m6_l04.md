SSRF defence is layered [R3]:

| Term | Meaning |
|---|---|
| Default-deny allowlist | only permit outbound requests to a small, explicit list of required destinations; reject everything else. This is the primary control. |
| Block internal ranges | reject requests to private, loopback and link-local addresses (including the cloud metadata IP) and resolve-then-check to prevent DNS rebinding. |
| Network segmentation | restrict what the fetching service can reach at the network layer, so even a bypass has limited reach. |
| No raw user URLs | where possible, do not let users supply full URLs; use identifiers that map server-side to fixed destinations. |

The hardened lab app replaces the open fetch with a default-deny allowlist that is empty by default, so it fetches nothing the caller names - findings.py reports SSRF absent after hardening.
