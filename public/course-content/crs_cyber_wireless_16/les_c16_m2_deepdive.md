Running wifireview.py on the weak and hardened configurations (execution-tested, CPython 3.14.4, 2026-11-08):

```output
> python wifireview.py data/wifi_config.json   (SSID HimalayaCorp)
  [HIGH  ] cipher       weak/deprecated cipher 'TKIP+AES'; require AES-CCMP/GCMP
  [HIGH  ] passphrase   weak PSK/SAE passphrase; use a long, random passphrase
  [HIGH  ] pmf          Protected Management Frames (802.11w) disabled; WPA3
                        requires PMF
  [HIGH  ] wps          WPS enabled: the PIN method is brute-forceable; disable
  [HIGH  ] admin-creds  default/weak AP admin credentials
  [HIGH  ] guest-segmentation guest network shares the corporate VLAN
  [MEDIUM] encryption   WPA2-Personal: prefer WPA3-Personal (SAE)
  [MEDIUM] firmware     AP firmware out of date
  [MEDIUM] guest-isolation guest network lacks client isolation
  [LOW   ] mac-filtering MAC filtering relied on as security (spoofable)
  10 finding(s), 6 HIGH -> FAIL

> python wifireview.py data/wifi_config_fixed.json
  no findings - configuration meets the reviewed controls. PASS
  0 finding(s), 0 HIGH -> PASS
```

**Reading the review:**

- the WEAK config fails on every major control: a TKIP cipher, a weak passphrase ("himalaya2019"), PMF off, WPS on, default admin/admin, guests on the corporate VLAN, plus WPA2 (prefer WPA3), stale firmware, no guest isolation, and MAC filtering relied on as "security" - 10 findings, 6 HIGH: FAIL.
- the HARDENED config fixes each: WPA3-Personal (SAE) with AES-CCMP, PMF required, WPS disabled, a long random passphrase, a unique admin user and long password, current firmware, and a segmented, isolated guest network - 0 findings: PASS.

This is the module's whole skill: review a configuration against WPA3/PMF/WPS/admin/firmware/segmentation controls, and confirm hardening by re-running the same check to zero findings - evidence, not opinion, and entirely offline.
