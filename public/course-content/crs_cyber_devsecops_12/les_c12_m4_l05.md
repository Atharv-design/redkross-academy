Semgrep honours inline comments of the form "# nosemgrep: <rule-id>".

**In the lab file:**

```text
---------------------------------------------------------------- BEGIN CODE
def file_checksum(data: bytes) -> str:
    # MD5 used only to match a legacy partner's non-security checksum format
    return hashlib.md5(data).hexdigest()  # nosemgrep: rk-weak-hash-md5
------------------------------------------------------------------ END CODE
```

**Good suppression practice:**

- Always name the rule ID. A bare "nosemgrep" hides every rule on that line, including future ones.
- Write the reason on the line above, so reviewers see why.
- Treat suppressions as code changes requiring review. Pipeline policy can require CODEOWNERS approval for new suppressions.
- Report suppression counts per repository, and investigate spikes.
- Prefer fixing the rule (pattern-not for a safe wrapper) when the same false positive appears repeatedly.

Python's hashlib also accepts usedforsecurity=False for MD5 in non-security contexts. It documents intent in code and can be matched by a pattern-not to remove the need for a suppression comment.
