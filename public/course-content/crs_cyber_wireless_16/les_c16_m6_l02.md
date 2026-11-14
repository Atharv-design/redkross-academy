Dynamic testing observes the app RUNNING (on a device or emulator you control), revealing behaviour static inspection cannot fully see:

```text
network traffic    intercepting the app's traffic (through a proxy you control,
                   with the app's consent/test configuration) to confirm it uses
                   TLS, validates certificates, and does not leak data - the
                   mobile analogue of watching requests.
storage at runtime inspecting what files, databases and preferences the app
                   actually writes, and whether secrets land in them.
logs               checking whether the app logs sensitive data as it runs.
platform behaviour how it handles backgrounding (screenshots of sensitive
                   screens), inter-app communication, and permission use.
```

Dynamic testing requires a controlled test device/emulator and an app you are authorised to test; it confirms and extends the static findings (e.g. a static "cleartext allowed" becomes a confirmed cleartext request). The MASTG defines procedures for both static and dynamic testing per MASVS control. The lab focuses on static inspection (which needs no device), while this lesson frames the dynamic half you would add with a controlled test environment.
