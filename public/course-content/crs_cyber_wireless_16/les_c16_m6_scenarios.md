Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A static review finds a token in external storage and a hardcoded key.

**Task:** Explain the risk and the remediation for each.

> [!TIP] Model answer
> The external-storage token (MASVS-STORAGE) is readable by other apps and via backup - exposing the session; remediation: store it in private internal storage, encrypted with a keystore-backed key, and never in external storage. The hardcoded key (MASVS-CRYPTO) is recoverable by anyone who inspects the app, so it is not a secret; remediation: remove it from the app, keep secrets server-side or in the keystore, and rotate the exposed key. Re-run the review to confirm closure.
>
> **Lesson:** move secrets into private encrypted storage / keystore / server-side; never ship them in the app or shared storage.

## Scenario 2

A static review shows cleartext is permitted; you need to confirm it actually happens.

**Task:** Explain how dynamic testing would confirm it, safely and authorised.

> [!TIP] Model answer
> Dynamic testing on a device or emulator YOU control, using a test build of YOUR app, with the app's traffic routed through a proxy you control: you observe whether the app actually sends requests over HTTP (cleartext) rather than HTTPS and whether it validates certificates. This confirms the static "cleartext permitted" as a real cleartext request. Do it only on an authorised app, with test accounts and data, handling any captured traffic responsibly.
>
> **Lesson:** dynamic testing on a controlled, authorised test build confirms runtime behaviour like cleartext traffic.

## Scenario 3

A team wants to test a competitor's app to compare security.

**Task:** Explain the authorisation problem and the right approach.

> [!TIP] Model answer
> You are not authorised to test a competitor's app - decompiling, instrumenting or intercepting it without permission can breach the app's terms, copyright and law, and is out of scope. The right approach: test only your own apps (or a client's under written agreement), and for comparison rely on published information or a properly authorised, scoped engagement. The course's demo app exists so you can practise without any third-party app.
>
> **Lesson:** test only authorised apps; a competitor's app is off-limits without permission.
