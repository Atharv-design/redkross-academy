The lab grounds the advanced-risk module in a concrete, code-level business-logic flaw: trusting a client-supplied value. In the scenario from Module 1, the checkout trusted a price sent from the browser (a hidden form field), instead of looking the price up server-side. No input was "malformed" - the price was a valid number - so input validation and scanners would not flag it; only knowledge of the workflow (the price must be authoritative and server-controlled) reveals the abuse.

**The vulnerable pattern (illustrative):**

```output
# UNSAFE: trusts the client's price
price = float(form["price"])        # attacker sets this to anything
total = price * quantity
```

The fix (server-side authority), the same principle the hardened lab app uses for every security decision:

```output
# SAFE: look the price up server-side; ignore any client-supplied price
price = catalogue.price_of(product_id)   # authoritative, server-controlled
total = price * quantity                 # quantity also validated (>0, <=max)
```

Why this is the archetype: every advanced risk in this module is, at root, the same lesson as the whole course - do not trust the client, and enforce rules and authority on the server. XXE is a dangerous parser trusting attacker XML; insecure deserialization is code trusting attacker bytes; business logic flaws are workflows trusting client state or sequence; API flaws are endpoints trusting client-supplied ids and fields. The lab's hardened app demonstrates the discipline end to end: identity, authorisation, queries, output, paths and business values are all decided from trustworthy server-side state, which is why findings.py reports 0 of 10 weaknesses on the hardened target.
