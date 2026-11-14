Design each tool as a narrow, policy-checked operation:

- Identity: derive the customer from the authenticated session, never from model arguments.
- Ownership: the object (order, account) must belong to the session user.
- Business rules: refund window, usage threshold, maximum value.
- Thresholds: above Rs 500, require supervisor approval (a human step).
- Budgets: maximum tool calls per request and per day.
- Recipients: e-mail only to the session customer's verified address.
- Idempotency and audit: unique request IDs; every proposal and decision logged with reason.

BanyanBot's check_tool() implements these rules in about 30 lines of deterministic code - the model cannot talk its way past them.
