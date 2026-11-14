A repeatable workflow keeps quality consistent across analysts and shifts:

1. Read the alert: which rule fired, on what, and what does the rule detect? Read the rule logic if you are unsure.
2. Scope the entities: host, user, IP, process, file hash, URL.
3. Enrich: who and what are these (L03)?
4. Validate: look at raw events around the alert (L04).
5. Check related alerts on the same entities in the last days (grouping).
6. Decide: close with a disposition, keep investigating, or escalate.
7. Document: what you checked, what you found, why you decided (M08).

Use a time box. Many SOCs aim to make a first decision within about 15-30 minutes and escalate rather than sit on an unclear alert. Times vary by organisation, so treat these figures as illustrative.
