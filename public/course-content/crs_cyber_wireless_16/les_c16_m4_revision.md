## Revision

### Summary

Bluetooth (BR/EDR Classic and BLE Low Energy) connects peripherals and IoT over short-range radio, and each link's security rests on PAIRING. The ASSOCIATION

**MODEL determines MITM protection:** "Just Works" provides NONE (used only for devices with no I/O), while Numeric Comparison, Passkey Entry and OOB are authenticated and resist MITM - use an authenticated model wherever I/O allows. The KEY AGREEMENT matters too: LE legacy pairing has weak, recoverable keys, while LE Secure Connections (Bluetooth 4.2, ECDH) resists eavesdropping and, with an authenticated association, MITM - require it wherever supported. Device hardening adds: discoverable only on demand (not always), no default/fixed PINs, the maximum encryption key size (up to 16 bytes, to resist downgrade), periodic review of bonded devices, disabling Bluetooth when unused, and patching firmware. A configuration review measures a device against NIST SP 800-121 Rev.2 and produces a prioritised PASS/FAIL, re-runnable to confirm hardening - offline, with no Bluetooth activity. The Bluetooth threat surface (eavesdropping, pairing MITM, impersonation, unwanted discovery, downgrade, stale bonds) each maps to a control. The lab's btreview.py shows a weak device failing (Just Works, legacy pairing, default PIN, always discoverable, small key - 6 findings, 3 HIGH, FAIL) and a hardened device passing (Numeric Comparison, LE Secure Connections, on-demand discovery, no PIN, 16-byte keys - PASS).

### Important concepts

BR/EDR vs BLE; association models and MITM; LE Secure Connections vs legacy; device hardening; configuration review; threat surface.

### Key technical takeaways

avoid Just Works/legacy pairing for sensitive devices; require Secure Connections and large keys; limit discoverability; no default PINs; prune bonds; patch; review against SP 800-121.

### Glossary

| Term | Meaning |
|---|---|
| BLE | Bluetooth Low Energy (wearables/IoT). |
| association model | how pairing authenticates (Just Works = no MITM protection). |
| LE Secure Connections | ECDH-based BLE key agreement (vs weak legacy pairing). |
| discoverability | whether a device advertises itself (prefer on-demand). |
| bond | stored pairing keys for a trusted device. |

### Common mistakes

Just Works for sensitive devices; LE legacy pairing; always-discoverable; default PINs; small key sizes; never pruning bonds; ignoring Bluetooth entirely.

### Revision questions

​1. Which association models provide MITM protection? 2. Why require LE Secure Connections? 3. Name three Bluetooth hardening settings.

### Further reading

[R1]; [R2]; [R3].

## References

- [R1] NIST. "SP 800-121 Rev.2: Guide to Bluetooth Security". URL: [https://csrc.nist.gov/pubs/sp/800/121/r2/upd1/final](https://csrc.nist.gov/pubs/sp/800/121/r2/upd1/final) Accessed: 2026-11-08. Supports: Bluetooth/BLE architecture, pairing, association models and hardening.
- [R2] NIST. "SP 800-121 Rev.2: Guide to Bluetooth Security" (device hardening recommendations). URL: [https://csrc.nist.gov/pubs/sp/800/121/r2/upd1/final](https://csrc.nist.gov/pubs/sp/800/121/r2/upd1/final) Accessed: 2026-11-08. Supports: the hardening checklist.
- [R3] NIST. "SP 800-183: Networks of 'Things'" (IoT device context for BLE peripherals). URL: [https://csrc.nist.gov/pubs/sp/800/183/final](https://csrc.nist.gov/pubs/sp/800/183/final) Accessed: 2026-11-08. Supports: the IoT/BLE device context.
- [R4] Lab evidence. btreview.py output on the weak and hardened Bluetooth configurations (CPython 3.14.4), LAB_ASSETS/C16/data/ (btreview_weak_output.txt, btreview_fixed_output.txt), 2026-11-08. Supports: the deep-dive configuration review.
