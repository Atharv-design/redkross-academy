1. The model returns JSON {answer, tool_calls}; parsing failures fall back to text with no tools.
2. For each proposed call, check_tool(call, session_customer, cfg, n): unknown tool -> blocked; refund -> order exists and belongs to the session customer, within 7 days and under 10% data used, amount <= order price and <= Rs 500 (else "needs supervisor approval"); e-mail -> recipient equals the session customer's address; more than three calls -> blocked.
3. Every decision is recorded in the ledger with a reason - the basis for audit and alerts.
4. filter_output(): canary redaction; markdown images replaced with "[image removed]"; URLs whose host is not banyan.example or care.banyan.example replaced with "[link removed]"; other customers' e-mail addresses and phone numbers redacted.
5. The UI should render the answer as plain text; even filtered links are shown, not fetched.

**Production additions:** user confirmation before refunds, supervisor queue above threshold, rate limits per customer, and alerts on blocked cross-customer calls.
