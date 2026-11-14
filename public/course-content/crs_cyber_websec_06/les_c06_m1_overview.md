## About this module

You cannot secure what you do not understand. Every web weakness in this course is a consequence of how the web actually works: a stateless request-response protocol (HTTP) between an untrusted client (the browser) and a server, with state bolted on through cookies and sessions, and increasingly mediated by APIs. This module builds that foundation. It covers the browser-server model and the trust boundary between them; the structure of HTTP requests and responses; how cookies and sessions add state to a stateless protocol; and what an API is and why it matters for security. Throughout, we map each mechanic to the weakness it enables - so that by the end you see, for example, why "the client is untrusted" is the single most important sentence in web security.

## Why it matters

Most web vulnerabilities come from trusting the client, mishandling input or output, or misusing the mechanisms of state and identity. If you understand that HTTP is stateless and that cookies carry identity on every request, you understand why session theft and CSRF are possible and how to defend against them. If you understand that the browser renders whatever HTML the server returns, you understand cross-site scripting. The foundations are not background reading; they are the direct cause of, and defence against, the flaws in the rest of the course.

## Where it is used

Every web and API team, every application-security review, every secure-coding standard, and every incident investigation starts from these mechanics. Developers apply them when designing endpoints and handling sessions; testers apply them when mapping and probing an application; responders apply them when reading logs of an attack.

## Learning objectives

1. Explain the browser-server model and the client/server trust boundary.
2. Read and construct HTTP requests and responses, including methods, status codes and headers.
3. Explain how cookies and sessions add state, and their security attributes.
4. Explain what an API is and how web and API security relate.
5. Connect each mechanic to the weakness classes it enables.
6. Start the authorised lab application and observe its HTTP behaviour.

## Before you start

**Prerequisites:** Course 02 networking basics (TCP, DNS); Course 04 command line.

**Estimated study time:** About 8 hours.
