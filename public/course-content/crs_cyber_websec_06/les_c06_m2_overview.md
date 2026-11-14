## About this module

Before you test or defend an application, you map it: what endpoints exist, what each accepts and returns, where the trust boundaries lie, and what the attack surface is. This module teaches scoped application mapping - the disciplined, authorised enumeration of an application you own - and the testing workflow that turns a map into a plan. You will map the lab application with a tool that refuses any non-loopback target, and read its attack surface: entry points, parameters, authentication state and the places where untrusted input crosses into trusted code.

## Why it matters

A test or review without a map is guesswork. The map tells you where to look: every parameter is a possible injection point; every object id is a possible IDOR; every state-changing POST is a possible CSRF; every file or URL parameter is a possible traversal or SSRF. Mapping also defines SCOPE concretely - you cannot stay in scope if you have not enumerated what is in it. For defenders, the map is an inventory of what must be protected and monitored. Good mapping makes the rest of the work systematic rather than random.

## Where it is used

Application-security testing and code review; threat modelling; building and maintaining an endpoint/asset inventory; API governance; and scoping any authorised penetration test of a web application.

## Learning objectives

1. Define attack surface and trust boundary for a web application.
2. Enumerate an owned application's endpoints and parameters within scope.
3. Classify each entry point by the weakness class it may enable.
4. Describe a repeatable web security testing workflow.
5. Keep mapping strictly within an authorised, loopback-only scope.
6. Produce an attack-surface map of the lab application.

## Before you start

**Prerequisites:** Module 1 (HTTP, cookies, sessions); Course 05 scoping concepts (helpful).

**Estimated study time:** About 8 hours.
