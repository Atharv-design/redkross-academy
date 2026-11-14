Configuration review (introduced in Module 2) is the systematic check of a WLAN's settings against the secure baseline, each weakness flagged with a severity:

```text
encryption/cipher    WPA3 preferred, WPA2-AES acceptable, no WEP/WPA/TKIP.
PMF                  required (802.11w).
authentication       Enterprise (802.1X) for corporate; strong passphrase for
                     Personal/SAE.
WPS                  disabled.
AP management        unique admin credentials; current firmware.
segmentation         guest on a separate VLAN, isolated.
weak pseudo-controls MAC filtering/SSID hiding not relied upon.
```

The output is a prioritised list and a PASS/FAIL, re-runnable after remediation. Configuration review is high-value and zero-risk: it finds the systemic weaknesses (a TKIP cipher, PMF off, WPS on) that attackers exploit, with no radio activity. The lab's wifireview.py (Module 2) is the tool; in assessment, you run it across every AP's configuration and aggregate the findings.
