Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A client says "we have a firewall and use HTTPS, so our network is secure".

**Task:** Explain why verification is still needed and what you would check.

> [!TIP] Model answer
> Having a firewall and HTTPS says nothing about whether they are configured correctly. The firewall may lack default-deny, contain an any-any or shadowed rule, or do no egress filtering; the TLS config may still offer deprecated protocols or weak ciphers; segmentation may allow forbidden flows. I would verify each layer with a repeatable check - lint the firewall policy, test connections against the segmentation matrix, review the TLS config against current standards, and review flow telemetry - and report status with before/after evidence, not attestation.
>
> **Lesson:** having a control is not the same as the control working; verify every layer.

## Scenario 2

After hardening, a "fixed" TLS check still reports findings.

**Task:** Explain the likely cause and how to confirm the hardening.

> [!TIP] Model answer
> The most likely cause is that the check was run against the original config, not the hardened one (e.g. the wrong data file), or the hardening did not actually remove the weak setting. Confirm by checking you passed the hardened configuration, inspecting it to ensure deprecated protocols and weak ciphers are removed and the key/cert meet the standard, then re-running the check and confirming zero findings. The hardening is only verified when the same check returns zero.
>
> **Lesson:** verify against the right artefact and re-run the same check to confirm.

## Scenario 3

Your assessment shows all enforcing controls PASS, but telemetry shows a beacon.

**Task:** Explain what this means for the assessment and the response.

> [!TIP] Model answer
> It means the static controls are correctly configured, but real traffic shows a live residual risk - a host beaconing to an external destination (likely C2). The assessment should report the enforcing controls as verified PASS AND flag the beacon as an open monitoring finding requiring response: isolate the host, block the outbound flow, preserve evidence and investigate. A correct policy and a clean telemetry are different things; a complete assessment reports both.
>
> **Lesson:** static verification and live monitoring are complementary; report and act on both.
