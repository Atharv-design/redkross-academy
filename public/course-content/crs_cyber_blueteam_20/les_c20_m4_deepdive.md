All commands were execution-tested on 2026-11-07 in LAB_ASSETS/C20. Unit tests (rk_sigma.py, CPython 3.14.4, PyYAML 6.0.3):

```output
PASS rk_archive_of_network_share          tar_unc                                  expect=True got=True
PASS rk_archive_of_network_share          tar_rooted_local_path                    expect=False got=False
PASS rk_archive_of_network_share          tar_local                                expect=False got=False
PASS rk_domain_admin_group_enum           admin_host_filtered                      expect=False got=False
...
18 cases, 0 failed, 0 rules without tests
```

Scan of the reference day:

```output
rk_archive_of_network_share.yml              medium   hits=1   WS-07
rk_dns_long_txt_label.yml                    medium   hits=82  10.20.1.17
rk_domain_admin_group_enum.yml               medium   hits=1   WS-07
rk_office_spawns_powershell.yml              high     hits=1   WS-07
rk_powershell_encoded_command.yml            medium   hits=1   WS-07
rk_schtask_user_writable_path.yml            high     hits=1   WS-07
rk_security_log_cleared.yml                  high     hits=1   WS-07
```

Lint and convert (sigma-cli 4.0.0 with the Splunk backend, in a virtual environment):

```text
BEGIN CODE
sigma check rules
sigma convert -t splunk --without-pipeline rules
END CODE
```

```output
Found 0 errors, 0 condition errors and 0 issues.
(Image IN ("*\\tar.exe", "*\\7z.exe", "*\\rar.exe")) CommandLine="* \\\\*"
qtype="TXT"
| regex query="^[a-z0-9]{25,}\\."
(Image IN ("*\\net.exe", "*\\net1.exe")) CommandLine="*group*"
  CommandLine="*domain admins*" NOT host="ADM-01"     (wrapped here)
EventID=1102
```

An older sigma-cli (3.0.2) reported InvalidATTACKTagIssue warnings for an early draft that used the tags attack.defense-evasion and attack.t1070.001. Those names no longer exist in ATT&CK 20.1. With current tags, version 4.0.0 reports no issues. Linting therefore also catches taxonomy drift. Git hook (detections/pre-commit-hook.sh; output in git_hook_output.txt):

```output
$ git commit -m "Shorten encoded-command match"
18 cases, 1 failed, 0 rules without tests
FAIL rk_powershell_encoded_command        long_flag                                expect=True got=False
commit exit=1
```

The change from ' -EncodedCommand ' to ' -Encoded ' looks harmless. But the match pattern includes a trailing space, so " -Encoded " no longer appears in "-EncodedCommand SQBF...". The positive test caught a bug that a reviewer might have approved.
