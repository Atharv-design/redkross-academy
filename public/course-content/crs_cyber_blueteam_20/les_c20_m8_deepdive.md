Command (execution-tested, CPython 3.14.4, 2026-11-07), releasing the tuned pack against the previous (baseline) pack:

```text
BEGIN CODE
python build_pack.py detections/tuned detections/tests detections/rules
END CODE
```

```output
PASS G1 unit tests                18 cases, 0 failed, 0 rules without tests
PASS G2 ATT&CK technique tags     untagged: none
PASS G3 purple replay             detected 8/8 (previous 5/8); regressed: none
PASS G4 FP budget (<=25/day)      over budget: none; exceptions: rk_dns_long_txt_label
                                  (aggregate per client in SIEM; ticket DET-112)
RELEASED: pack/manifest.txt (7 rules), pack/release_report.txt
exit=0
```

(The G4 line is wrapped here.) Manifest (hashes shortened here; full values in build_pack_output.txt):

```output
bcc2bd11...6b5e  rk_archive_of_network_share.yml  medium  attack.t1560.001
85166551...ec1c  rk_dns_long_txt_label.yml  medium  attack.t1071.004
46cc870e...ec1c  rk_office_spawns_powershell.yml  high  attack.t1059.001 attack.t1566.001
57af087b...15ff  rk_powershell_encoded_command.yml  medium  attack.t1059.001 attack.t1027
a1d14353...750a  rk_security_log_cleared.yml  high  attack.t1685.005
```

(Five of seven lines shown.) The same command with the exception list emptied:

```output
FAIL G4 FP budget (<=25/day)      over budget: rk_dns_long_txt_label=82; exceptions:
RELEASE BLOCKED
exit=1
```

**Interpretation:**

- G3 compares with the previous pack, so a future change that loses PT-02 will block the release even if all unit tests pass.
- The exit codes make the script usable as a CI step.
- The manifest hashes the tuned rule files exactly as released. Any later edit, even whitespace, changes the hash.

**Limitations:** G2 checks only that a technique tag exists, not that it is correct for ATT&CK 20.1. Adding a lookup against the STIX data (Module 7 P2) is a capstone extension.
