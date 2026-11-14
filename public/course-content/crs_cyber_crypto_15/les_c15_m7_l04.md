Side channels leak secrets through timing, power use, electromagnetic emissions, cache behaviour or error messages, not through the mathematics. Practices:

- Constant-time comparisons for MACs, tokens and password hashes (hmac.compare_digest). == may return as soon as a byte differs, so the response time can reveal how many leading bytes were correct.
- Uniform errors. Do not reveal whether padding, MAC or decryption failed separately; padding-oracle attacks exploited exactly that. Return one generic error.
- Use library implementations designed for constant-time operation, including AES hardware instructions.
- Hardware key storage (HSMs, secure elements) for high-value keys. Physical side channels matter for devices attackers can hold.

The lab confirms compare_digest's correct results but, honestly, does not attempt to measure timing differences, which are hard to observe reliably in Python on a busy machine:

```text
------------------------------------------------------------- BEGIN OUTPUT
== 4. MAC comparison
  compare_digest equal: True  different: False
--------------------------------------------------------------- END OUTPUT
(execution-tested)
```
