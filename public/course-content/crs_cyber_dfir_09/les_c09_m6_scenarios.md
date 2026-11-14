Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

auth.log on a breached server is 0 bytes, but the server has run for months.

**Task:** Investigate.

> [!TIP] Model answer
> Treat it as possible tampering: check rotated logs (auth.log.1, .gz), the journal (journalctl, if persistent), wtmp/btmp, centrally forwarded copies in the SIEM, file-system timeline entries for auth.log (when it was truncated), shell histories and auditd. Note the truncation time as an event in the timeline.
>
> **Lesson:** missing logs are evidence of an action.

## Scenario 2

VPC flow logs show 4 GB sent over TLS to an unknown IP at 03:10.

**Task:** State what you can conclude and what you need.

> [!TIP] Model answer
> **Conclude:** a host sent about 4 GB over an encrypted channel to that IP at 03:10. Not shown: content or the process responsible. Need: host artefacts (process with network activity at 03:10, SRUM on Windows, auditd or EDR on Linux), DNS and proxy logs for the destination name, TLS SNI if captured, threat intelligence on the IP, and files accessed beforehand.
>
> **Lesson:** volume plus host evidence, never volume alone.

## Scenario 3

A colleague's report says "the attacker downloaded backup.zip" based on an exported HTTP object.

**Task:** Review the claim.

> [!TIP] Model answer
> Check the HTTP response code for that request, the object's size and real type (magic bytes), and whether the content is the expected archive. If it was a 404 or error page, the claim is wrong. If valid, hash it and compare with the server copy. Correct the report accordingly.
>
> **Lesson:** exported objects are named from the URI, not verified content.
