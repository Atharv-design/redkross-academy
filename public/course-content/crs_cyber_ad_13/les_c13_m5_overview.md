## About this module

To defend Active Directory you must understand the paths attackers take through it - not to perform them, but to find and close them first. This module explains the best-known identity attack techniques in DEFENSIVE terms: what directory condition makes each possible, what signal it leaves, and what control removes it. You will run the lab's directory-hygiene review tool against your own domain and watch it find exactly the conditions these attacks depend on, with the fixes attached. Nothing in this module attacks any third party; every observation is made against the learner's own lab domain and every technique is framed by its prevention.

## Why it matters

**Attackers think in paths:** from a foothold to a credential to a privilege to the directory. Defenders who understand those paths can cut them at the cheapest point - a non-expiring service-account password, an account trusted for delegation, a user object carrying a Service Principal Name. The lab's review tool found five such conditions automatically, including one account with three weaknesses at once. Finding them before an attacker does is the entire point.

## Where it is used

Identity security posture management, Active Directory security reviews (the kind tools such as PingCastle or Purple Knight automate), red/blue purple-teaming, and incident response, where understanding these paths guides both containment and recovery (for example krbtgt rotation).

## Learning objectives

1. Explain credential exposure, pass-the-hash and pass-the-ticket in terms of the controls that stop them.
2. Explain Kerberoasting (T1558.003) and AS-REP roasting (T1558.004) and their directory preconditions and fixes.
3. Explain golden and silver tickets (T1558.001/.002) and why krbtgt is pivotal.
4. Explain delegation (unconstrained, constrained, RBCD) and its risks.
5. Use a hygiene-review tool to find these preconditions in your own directory.
6. Prioritise and plan the fixes that close each path.

## Before you start

**Prerequisites:** Modules 2-4; Course 08 (ATT&CK mapping).

**Estimated study time:** About 9 hours.
