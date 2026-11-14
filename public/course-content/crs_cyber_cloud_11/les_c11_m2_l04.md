For people, enforce MFA at the IdP (Conditional Access in Entra; the IdP behind IAM Identity Center) with phishing-resistant methods (FIDO2, passkeys, certificate-based). In AWS policies, the condition key aws:MultiFactorAuthPresent is used to deny actions without MFA. AWS documents that this key is not present in requests signed with long-term access keys [R1]. The lab shows the consequence:

- "read, no MFA" (key present, false) -> explicit Deny works.
- "read, access key" (key absent) -> the Bool condition does not match, so the Deny does not apply and the request is ALLOWED.
- "read, key, IfExists" -> with BoolIfExists the absent key is treated as matching, so the Deny applies.

**Lesson:** a "require MFA" policy written with Bool silently exempts access keys. Use BoolIfExists for deny-without-MFA statements, and better still remove long-term keys for people altogether.
