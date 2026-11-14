Running roguescan.py over the provided scan against the authorised inventory (execution-tested, CPython 3.14.4, 2026-11-08):

```output
> python roguescan.py data/authorized_aps.json data/observed_aps.json
Rogue/evil-twin AP analysis (offline, provided scan):
  [HIGH] evil-twin 66:de:ad:be:ef:01 / HimalayaCorp ch11 -38dBm OPEN
         EVIL TWIN: managed SSID on UNKNOWN BSSID with weak/open security
         (classic credential trap)
  [HIGH] evil-twin 66:de:ad:be:ef:02 / HimalayaCorp ch1  -41dBm WPA2
         EVIL TWIN: managed SSID on UNKNOWN BSSID
  [INFO] foreign   aa:bb:cc:11:22:33 / Free_Airport_WiFi ch9 -70dBm OPEN
  [OK  ] authorised 02:11:aa:00:00:01 / HimalayaCorp ch36 -45dBm WPA3
  [OK  ] authorised 02:11:aa:00:00:02 / HimalayaCorp ch40 -52dBm WPA3
  [OK  ] authorised 02:11:aa:00:00:03 / HimalayaCorp-Guest ch6 -60dBm WPA2
  2 rogue/evil-twin finding(s) requiring investigation.
```

**Reading the detection:**

- two EVIL TWINS: the managed SSID "HimalayaCorp" advertised by BSSIDs NOT in the inventory (66:de:ad:be:ef:01/02). The first is OPEN with a strong signal (-38 dBm) - a classic credential trap near the entrance; the second mimics WPA2. Both must be investigated physically and removed.
- the three authorised BSSIDs match the inventory (OK); the neighbouring "Free_Airport_WiFi" is foreign (informational).
- the analysis is pure data processing - the assessor transmitted nothing; the scan was provided.

This is wireless assessment's second pillar: an inventory of authorised BSSIDs plus an observed scan reveals impostors, offline. Combined with the Module-2 configuration review (wifireview.py), it gives the full picture - are the APs configured securely, and is anything impersonating them - as reproducible evidence.
