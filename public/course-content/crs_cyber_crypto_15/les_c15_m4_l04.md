HMAC (RFC 2104, FIPS 198-1) combines a secret key with a hash function in a nested construction, giving a message authentication code that resists length extension. Common uses: webhook signatures, API request signing, session cookies and tokens, and integrity of stored records.

**Execution-tested:**

```text
------------------------------------------------------------- BEGIN OUTPUT
== 2. HMAC
  tag: 0a1dc39627006475537206eb659244b7...
  genuine verifies: True  modified body verifies: False
--------------------------------------------------------------- END OUTPUT
(execution-tested)
```

**Rules:**

- Use a random key of at least 32 bytes, separate from encryption keys.
- Compare tags with hmac.compare_digest, a constant-time comparison (Module 7), never with ==.
- MAC exactly the bytes you will use. Canonicalise JSON, or MAC the raw body as received, and include a timestamp and nonce to prevent replay (Course 12 Module 2 webhook threats).
- Verify the MAC before parsing or acting on the data.
