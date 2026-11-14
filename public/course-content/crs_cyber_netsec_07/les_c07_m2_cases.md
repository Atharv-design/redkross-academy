## Firewall misconfiguration as a top risk Context: studies of firewall estates and security incidents consistently find that MISCONFIGURATION - not a flaw in the firewall product - is the dominant cause of firewall-related exposure. Overly permissive rules ("any" services or sources left from a long-ago troubleshooting session), rules that are never removed, shadowed and redundant rules, and missing egress control accumulate over years into policies no one fully understands. Guidance such as NIST SP 800-41r1 therefore stresses default-deny, least-privilege rules, regular policy review and cleanup, and documented change control [C07-M02-R1]. Why it matters for this module: the firewall is only as good as its policy, and policies degrade without active engineering. Automated validation (linting) and disciplined change control are what keep a policy correct over time. Lessons: default-deny; write least-privilege rules; remove shadowed and unused rules; filter egress; review policies regularly; and validate every change.



## (FICTIONAL TEACHING SCENARIO): The troubleshooting rule that stayed

**Context:** Himalaya Retail (fictional) once added a temporary rule "user -> any : all ports ALLOW" to troubleshoot a connectivity issue, intending to remove it after the fix - the exact over-broad rule in the lab's pre-hardening policy.

**What happened:** the rule was never removed. For months it silently allowed user workstations to reach any internal system on any port, including the database, defeating the segmentation design - and it shadowed a later, correct rule, hiding the intent. A routine policy validation (a linter) flagged it: a wide port range, a shadowed downstream rule, and a violation of least privilege.

**Response:** the team removed the broad rule, replaced it with specific allows for the flows users actually need (HTTPS to the web tier), added an explicit deny for user->db, ended the policy with default-deny, and introduced a mandatory lint gate in their change process so no such rule could ship again.

**Lessons:** temporary broad rules become permanent risk; least privilege and default-deny prevent it; and automated validation catches over-broad and shadowed rules before they cause harm.
