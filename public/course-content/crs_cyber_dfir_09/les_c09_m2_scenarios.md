Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A server cannot be taken offline, but you need its logs and database.

**Task:** Choose an acquisition approach.

> [!TIP] Model answer
> Live targeted (logical) acquisition. Export logs and take a database-consistent backup or snapshot, hashing each item. Capture memory first if malware is suspected. Document the commands and their footprint. Consider a VM or storage snapshot if one is available. Record why a full physical image was not taken (proportionality, availability).
>
> **Lesson:** choose proportionate methods and record the reasons.

## Scenario 2

Your image's verification hash does not match the acquisition hash.

**Task:** Investigate and document.

> [!TIP] Model answer
> Do not use the image. Check whether the right file and algorithm were used. Re-hash, and check the storage media for errors. Compare piecewise hashes if available to locate differences, and check the acquisition log for read errors. Re-acquire if the source is still available. Document everything, including the failed verification.
>
> **Lesson:** a failed verification is a finding to report, not hide.

## Scenario 3

Counsel asks why you used SHA-256 and also recorded MD5.

**Task:** Explain.

> [!TIP] Model answer
> SHA-256 provides collision resistance suitable for integrity today. MD5 was recorded for compatibility with legacy tools and hash databases (for example older case systems), not as the integrity guarantee. Practical MD5 collisions exist, so MD5 is never relied on alone.
>
> **Lesson:** know why each hash is recorded.
