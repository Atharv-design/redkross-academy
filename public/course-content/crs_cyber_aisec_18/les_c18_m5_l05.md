Model-driven probes show whether the model proposes bad actions; they cannot prove the policy, because the model may simply not propose the action (as happened in hardened P5). Unit tests feed proposed calls directly to the policy. Execution-tested (python -m unittest -v tool_policy_test):

```text
------------------------------------------------------------- BEGIN OUTPUT
test_amount_above_order_value_blocked ... ok
test_call_budget ... ok
test_email_only_to_session_customer ... ok
test_in_policy_refund_allowed ... ok
test_naive_executes_anything ... ok
test_other_customers_order_blocked ... ok
test_outside_refund_window_blocked ... ok
Ran 7 tests in 0.000s
OK
--------------------------------------------------------------- END OUTPUT
(test identifiers shortened)
```

Together, the probe (does the system resist?) and the unit test (does the control work when reached?) give evidence for both behaviour and control.
