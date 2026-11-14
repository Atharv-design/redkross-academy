API authentication proves WHO is calling. For mobile, the client is untrusted, so the API must authenticate every request properly:

```text
tokens          the app authenticates (login) and receives a token (e.g. an
                OAuth 2.0 access token / JWT) sent on each request. Tokens must
                be validated server-side (signature, expiry, audience), be
                short-lived, and be revocable.
no client trust the API must never trust a value the client could forge (a
                user id in the request, a "role" field) - authentication and
                authorisation are decided server-side from the verified token.
secrets         the app is a PUBLIC client; it cannot hold a confidential secret
                (Module 6: hardcoded secrets are recoverable). Use flows designed
                for public clients (OAuth PKCE) and keep real secrets server-side.
storage         tokens are stored in the app's protected storage/keystore
                (Module 5), not external storage.
```

Authentication failures - no auth, weak/forgeable tokens, trusting client values, long-lived unrevocable tokens - are the top API weakness class. The lab's apicheck.py flags missing/weak authentication and insecure token handling in the backend configuration.
