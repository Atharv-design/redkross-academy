## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C13_Lab_Kit.zip](/downloads/labs/RedKross_C13_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C13/...` refer to the extracted `C13` folder. Everything runs locally against systems you own.

**Shared lab and tools:** LAB_ASSETS/C13/ contains everything needed to build a self-contained Active Directory domain controller and audit it. Nothing in this course scans, exploits, or touches any system you do not own.

```text
dc/Dockerfile, dc/provision.sh  build and provision a Samba Active
                     Directory Domain Controller (the role Windows Server
                     calls "AD DS") for the fictional firm Sahyadri
                     Logistics, domain ad.sahyadri.example
setup_domain.sh      populates a tiered organisation: organisational units,
                     users, groups, a service account with a Service
                     Principal Name, a fine-grained password policy and a
                     Group Policy object
auth_monitor.py      reads JSON authentication audit events and reports
                     failed-logon bursts, weak Kerberos encryption types
                     and the sources of privileged logons (Modules 6, 7)
dir_review.py        offline directory-hygiene review from an exported
                     LDIF snapshot: Kerberoastable accounts, never-expire
                     passwords, delegation and stale accounts (Modules 5, 7)
data/                captured telemetry and saved tool output
```

All assets were execution-tested on 2026-11-08 against Samba 4.22.11 (Active Directory Domain Controller role) running in Docker on Windows 11, with CPython 3.14. The domain controller issued real Kerberos tickets (AES256), accepted an LDAP bind over GSSAPI, and emitted JSON authentication audit events (eventId 4624). Saved outputs sit beside each script in data/.

Why a Samba lab, not Windows Server: the concepts - domains, forests, Kerberos, LDAP, Group Policy, the directory schema, SPNs, delegation flags and audit events - are the same protocol and directory concepts on either platform, because Active Directory is built on open standards (Kerberos RFC 4120, LDAP RFC 4511). Samba implements the same AD DC role and runs without a Windows licence, so every learner can build the lab. Where Windows behaviour or tooling differs (Event Viewer IDs, PowerShell, LAPS, the Protected Users group), the text says so explicitly.

**Safety and ethics statement:** every organisation, person, host name, domain (.example, reserved by RFC 2606/IANA) and password in this course is fictional and for the learner's own lab only. This course teaches how to BUILD, CONFIGURE, HARDEN, AUDIT and MONITOR a directory you own. It does not teach how to attack anyone else's directory. Attack techniques (Kerberoasting, AS-REP roasting, credential theft, delegation abuse) are presented only at the level needed to DETECT and PREVENT them, framed by the defensive controls that stop them, and demonstrated only against the learner's own lab domain. Never run directory queries, authentication attempts or audits against a domain you are not explicitly authorised to administer.

**Access classification note:** per the blueprint, Course 13 is "PAID advanced".

**ATT&CK version note:** technique identifiers (for example T1558.003 Kerberoasting) were checked against MITRE ATT&CK on 2026-11-08.

**India law note:** Module 3 and the capstone touch on records retention and audit-log handling in the context of the CERT-In Directions of 28 April 2022 and the Digital Personal Data Protection Act, 2023, at an introductory level only. This is not legal advice; obtain qualified counsel for your facts.
