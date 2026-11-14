Design for Tamarind's courier partner webhooks (all primitives were execution-tested in this module; the full scheme is a design for Practical

**P2):**

```text
Sender:
  ts = current UTC Unix time; nonce = secrets.token_hex(16)
  msg = ts + "." + nonce + "." + raw_body_bytes
  sig = HMAC-SHA256(shared_key, msg)
  headers: X-TL-Timestamp: ts, X-TL-Nonce: nonce, X-TL-Signature: hex(sig)
Receiver:
  1. Reject if |now - ts| > 300 seconds (replay window).
  2. Reject if the nonce was seen in the last 10 minutes (stored set).
  3. Recompute the HMAC over exactly the received bytes, and compare with
     hmac.compare_digest.
  4. Only then parse the JSON and act.
  5. Support two active keys during rotation (key ID header).
```

**Why each step matters:**

- The timestamp and nonce stop replays of captured requests.
- Using raw bytes avoids JSON canonicalisation mismatches.
- Constant-time comparison avoids leaking how many bytes matched.
- Verifying before parsing reduces exposure to parser bugs.
- Two keys allow rotation without downtime.
