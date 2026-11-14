STIX patterns describe what to look for in observable data, for example:

```text
[ipv4-addr:value = '198.51.100.77']
[domain-name:value = 'portal-nilgiri-claims.example']
[url:value = 'https://nm-invoice-share.example/inv/2026-10.iso']
[file:hashes.'SHA-256' = '751ce214...']
```

Patterns can combine observations with AND, OR and FOLLOWEDBY and time qualifiers, but most shared indicators are single comparisons. valid_from and valid_until express the indicator's useful life - the STIX form of Module 5's expiry.

Validate before sharing. The lab checks every pattern with the stix2-patterns validator, then writes the bundle and parses it back with the stix2 library in strict mode (allow_custom=False), which rejects unknown properties and malformed objects. Invalid STIX is often silently dropped by recipients' platforms, so validation is not optional.
