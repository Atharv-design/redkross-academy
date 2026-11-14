## Why cookie attributes exist - the long road to SameSite

**Context:** cross-site request forgery (riding a user's authenticated cookie to make state-changing requests) plagued the web for years because browsers sent cookies on every request to a site, including requests triggered by other sites. The structural fix was the SameSite cookie attribute, which tells the browser not to send a cookie on cross-site requests. Major browsers moved, over 2019-2020, to treat cookies without an explicit SameSite attribute as SameSite=Lax by default, materially reducing CSRF exposure across the web [R2][R4]. Why it matters for this module: it shows that web security is often enforced in the mechanics themselves - a single cookie attribute changed the risk profile of the entire web. It also shows why defenders must understand those mechanics: an application that relies on the browser default is in a different position from one that sets SameSite=Strict explicitly and also uses CSRF tokens (defence in depth, Module 6).

**Lessons:** understand the security attributes of the mechanisms you use; do not rely on defaults you have not verified; and prefer explicit, layered defences.

## (FICTIONAL TEACHING SCENARIO): The hidden-field discount

**Context:** Sahyadri Reads (fictional), the lab bookshop, once trusted a price value sent from the browser in a hidden form field at checkout.

**What happened:** a user noticed the hidden field <input type=hidden name=price> in the page source, changed it in the browser, and submitted an order at a price they chose. Because the server trusted the client-supplied price instead of looking it up server-side, the application honoured it. No "hacking tool" was involved - just the fact that the client is untrusted and everything in the browser is editable.

**Response:** the team removed all trust in client-supplied prices; the server now looks up the authoritative price from its own catalogue by product id and ignores any price in the request. They audited every endpoint for other values trusted from the client.

**Lessons:** the client is untrusted; never trust a security- or money-relevant value that comes from the browser; enforce and recompute on the server. This single principle prevents a whole family of business-logic flaws (Module 7).
