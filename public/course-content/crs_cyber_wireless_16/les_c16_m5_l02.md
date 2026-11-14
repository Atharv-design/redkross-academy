Because the sandbox isolates apps, an app needs PERMISSIONS to access shared or sensitive resources - the network, the camera, location, contacts, external storage. Android classifies permissions by risk:

```text
normal permissions     low-risk (e.g. INTERNET); granted at install.
dangerous/runtime       access to sensitive data or resources (location,
  permissions            contacts, camera, microphone, storage); the user must
                        grant them at RUNTIME, and can revoke them.
signature/system        reserved for apps signed by the same key or the system.
```

**The security principles:** an app should request the MINIMUM permissions it needs (least privilege), justify each, and handle the user denying or revoking them. Over-requesting permissions enlarges the attack surface and the privacy impact, and is a review finding. The lab's demo app over-requests (WRITE_EXTERNAL_STORAGE, READ_CONTACTS, ACCESS_FINE_LOCATION), which mobilecheck.py flags for justification.
