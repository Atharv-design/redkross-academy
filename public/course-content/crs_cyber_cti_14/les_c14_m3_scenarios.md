Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A feed lists a cloud provider's address as "C2". Passive DNS shows 30,000 domains on it.

**Task:** Decide what to do.

> [!TIP] Model answer
> Do not block the address: it is shared cloud infrastructure and blocking would break unrelated services. Ask the feed for the specific domain, URL or certificate observed; monitor connections to the address in context (which host names, which processes); block the specific domain or URL if justified; report abuse to the cloud provider. Record why the address was not blocked.
>
> **Lesson:** the more shared the infrastructure, the more specific the indicator must be.

## Scenario 2

Your brand-monitoring alert shows a new certificate for "nilgirimutual-payments.example" issued an hour ago.

**Task:** Describe your analysis and actions.

> [!TIP] Model answer
> Check the certificate's SANs, issuer and other certificates issued at the same time; resolve the name passively (passive DNS) and check registration date and registrar; look for links to the known cluster (same certificate key, address in the window). If it fits, add it to monitoring and proxy/DNS blocks with an expiry, alert the fraud team, request takedown via the registrar, and share with partners. If no link is found, still monitor - a new lookalike is suspicious regardless of attribution.
>
> **Lesson:** certificate logs give early warning; act proportionately.

## Scenario 3

A colleague's cluster links 400 domains to MONSOON LANTERN through a common registrar and free CA.

**Task:** Review it.

> [!TIP] Model answer
> A common registrar and a free CA are weak, very widely shared attributes; they do not support the link. Ask for edge evidence per domain, remove weak edges, apply fan-out limits and time windows, and keep only domains linked by strong or medium evidence; label the rest "unrelated or unknown". Expect the cluster to shrink to a handful.
>
> **Lesson:** big clusters built on weak edges are usually wrong.
