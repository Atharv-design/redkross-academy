As Module 4 established, authenticating to a system can leave credential material on it. Two reuse techniques follow:

| Term | Meaning |
|---|---|
| pass-the-hash | NTLM uses the NT hash as password-equivalent; an attacker who harvests a hash can authenticate as that user without the plaintext. Controls: prefer Kerberos over NTLM; Protected Users (no NTLM for members); tiering so hashes of powerful accounts are never on low-trust hosts; LAPS. |
| pass-the-ticket | a harvested Kerberos ticket (a TGT or service ticket) is reused directly. Controls: tiering (limit where powerful tickets exist); short TGT lifetimes (Protected Users caps at four hours); and detection of anomalous ticket use. |

The unifying defence is CONTAINMENT (Module 4): if a powerful credential is never exposed on a low-trust system, it cannot be harvested there.
