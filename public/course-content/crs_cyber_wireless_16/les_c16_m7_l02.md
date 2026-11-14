Transport security protects API requests in transit over hostile mobile networks:

| Term | Meaning |
|---|---|
| TLS everywhere | every API call over HTTPS (TLS), never cleartext. The server must not expose an HTTP endpoint or downgrade. |
| strong TLS | modern TLS (1.2+/1.3), strong ciphers, a valid certificate from a trusted CA - the server side of Module 2's transport rule. |
| HSTS | tell clients to use HTTPS only. |
| pinning option | the app may pin the server certificate/public key to resist interception (Module 5), balanced against operational cost. |

Transport security is the same principle as Wi-Fi (Module 2) and app networking (Modules 5-6) applied to the API: assume the network is hostile and encrypt. A cleartext or weak-TLS API exposes tokens and data to interception. apicheck.py flags cleartext/weak transport settings in the configuration.
