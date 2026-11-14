Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

You must present a wireless-and-mobile assessment to management and engineers.

**Task:** Outline the structure and what evidence you include.

> [!TIP] Model answer
> **Structure:** (1) scope and authorisation (authorised, offline, do-no-harm); (2) method and tools; (3) findings by area - Wi-Fi, Bluetooth, mobile app, mobile API, rogue APs - with severities; (4) enforcing evidence (the FAIL-to-PASS review outputs for the three control domains); (5) remediation mapped to the secure baseline, with verification (re-run to PASS); (6) a clear summary for management and the detailed evidence for engineers. Include the dated, reproducible tool outputs as evidence and prioritise HIGH findings and failed controls.
>
> **Lesson:** present scope, findings by area, enforcing evidence and prioritised remediation, for both audiences.

## Scenario 2

The consolidated review shows 3/3 controls PASS but 16 app findings and 2 rogue APs.

**Task:** Explain what this means and the next actions.

> [!TIP] Model answer
> It means the three configuration control domains (Wi-Fi, Bluetooth, API) are correctly hardened and verified (enforcing evidence), but there remain 16 mobile-app weaknesses (mostly insecure data handling) and 2 evil-twin APs to address. Next actions: remediate the app per Modules 5-6 (private encrypted storage, keystore keys, TLS, strong crypto, unexported components, release flags) and re-run the static review; and investigate and remove the rogue APs (Modules 1, 3), then keep detecting them. The hardened configs become acceptance tests for the baseline.
>
> **Lesson:** enforced controls are done; detective findings (app, rogue APs) are the remaining work.

## Scenario 3

A colleague proposes testing a neighbouring company's Wi-Fi and app "to compare".

**Task:** Explain why this is out of scope and the correct approach.

> [!TIP] Model answer
> Testing a neighbouring company's Wi-Fi or app is unauthorised - it is their network, radio and software, and probing them (scanning, connecting, intercepting, decompiling) can breach the IT Act and others and is out of scope. The correct approach is to assess only your own (or a client's, under written agreement) networks, devices, apps and APIs, as this course does - offline and within an authorised scope. Comparison relies on published information or a properly authorised engagement.
>
> **Lesson:** assess only what you are authorised to; a third party's systems are always out of scope without permission.
