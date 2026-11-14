Severity is a property of a vulnerability; risk depends on your deployment. A practical triage order:

1. Fixable CRITICAL and HIGH findings: rebuild or upgrade the pin.
2. Unfixable CRITICAL and HIGH: is the package needed? Can you change the base? If not, record, monitor and mitigate.
3. Everything else: batch into the regular rebuild.

Gates encode the policy. The lab's image_gate.py blocks on any fixable CRITICAL or HIGH finding and on any detected secret, warns on unfixable ones, and accepts exceptions only with an owner, a reason and an expiry date. Expired exceptions stop working automatically (deep dive).

**Pinning has a cost:** a digest pin freezes vulnerabilities as well as content. The lab's first hardened image pinned a locally cached distroless Debian 12 image and still carried 325 findings (2 CRITICAL, 67 HIGH). The same Dockerfile on a current distroless Debian 13 base carried 203 (0 CRITICAL, 35 HIGH, only 2 of them with a fix). So pair pinning with a rebuild cadence: an automated job that proposes a new base digest when one is published, rebuilds, rescans and lets the gate decide. Minimal images make this cheap.
