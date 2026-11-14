Running btreview.py on the weak and hardened configurations (execution-tested, CPython 3.14.4, 2026-11-08):

```output
> python btreview.py data/bt_config.json   (HimalayaScanner-BT)
  [HIGH  ] association           'Just Works' association provides NO MITM
                                 protection; use Numeric Comparison/Passkey Entry
  [HIGH  ] le-secure-connections LE legacy pairing in use; enable LE Secure
                                 Connections (ECDH)
  [HIGH  ] default-pin           weak/default pairing PIN '0000'
  [MEDIUM] discoverable          device is always discoverable; make it on-demand
  [MEDIUM] key-size              minimum encryption key size 7 bytes is below the
                                 16-byte maximum
  [LOW   ] bonded-devices        bonded/paired device list not reviewed
  6 finding(s), 3 HIGH -> FAIL

> python btreview.py data/bt_config_fixed.json
  no findings - configuration meets the reviewed controls. PASS
  0 finding(s), 0 HIGH -> PASS
```

**Reading the review:**

- the WEAK device fails on the three key controls: "Just Works" (no MITM protection), LE legacy pairing (brute-forceable keys), and a default "0000" PIN - plus always-discoverable, a 7-byte minimum key size, and un-reviewed bonds: 6 findings, 3 HIGH, FAIL.
- the HARDENED device uses Numeric Comparison (authenticated association), LE Secure Connections (ECDH), on-demand limited discovery, no fixed PIN, 16-byte keys, and reviewed bonds: 0 findings, PASS.

The method mirrors the Wi-Fi review: measure the device against the NIST SP 800-121 controls, and confirm hardening by re-running to zero findings - offline, with no Bluetooth activity. Bluetooth is a real, often-neglected attack surface, and a configuration review is the defender's safe, evidence-producing tool for it.
