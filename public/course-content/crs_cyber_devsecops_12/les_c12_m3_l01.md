Validate every input that crosses a trust boundary (Module 2): request parameters, headers, files, messages from queues, partner webhooks and even data read back from your own database if other systems write to it.

**Principles:**

- Allowlist, not denylist. Define what is valid (type, length, format, range) and reject everything else. Denylists of "bad characters" miss variants.
- Validate early, at the boundary, before the value reaches business logic or a database.
- Use precise patterns. The reference service accepts tracking IDs only if TRACKING_RE.fullmatch(value) succeeds, where the pattern is TL-\d{8}. fullmatch, unlike match or search, requires the whole string to fit, so trailing text is rejected.
- Canonicalise before validating where encodings vary: Unicode normalisation, path resolution with os.path.realpath before checking a directory prefix (Course 04 Module 4).
- Validate structured data with schemas (JSON Schema, pydantic or similar) and limit sizes to prevent resource exhaustion.

Validation reduces risk but does not replace the other patterns. A perfectly valid name can still contain an apostrophe, so queries must still be parameterised.
