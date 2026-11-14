LAB_ASSETS/C13/setup_domain.sh populates the domain. It creates the tiered OUs, users and groups, adds an SPN to a service account, defines a fine-grained password policy and a GPO, and prints a summary. Selected execution-tested output (Samba 4.22.11, 2026-11-08):

Fine-grained password policy for service accounts:

```output
$ samba-tool domain passwordsettings pso create ServiceAccountPSO 50 \
    --min-pwd-length=25 --history-length=24 --complexity=on
PSO successfully created: CN=ServiceAccountPSO,CN=Password Settings
    Container,CN=System,DC=ad,DC=sahyadri,DC=example
Minimum password length: 25
Password history length: 24
$ samba-tool domain passwordsettings pso apply ServiceAccountPSO legacy-svc
PSO 'ServiceAccountPSO' applied to 'legacy-svc'
```

Service Principal Name on the service account, and the final user list:

```output
$ samba-tool spn add HTTP/app1.ad.sahyadri.example legacy-svc
$ samba-tool spn list legacy-svc
  User CN=Legacy Service,OU=ServiceAccounts,... has the following
  servicePrincipalName:
     HTTP/app1.ad.sahyadri.example
users: Administrator Guest asha krbtgt legacy-svc rohan t0-admin
       t1-srvadm t2-help
```

Group Policy object (after pointing the resolver at the DC's DNS, Module 1):

```output
$ samba-tool gpo create "RK Workstation Baseline" -U Administrator ...
GPO 'RK Workstation Baseline' created as
    {15A8E34D-080F-4CDA-B382-C2E0621A9E13}
$ samba-tool gpo listall
display name : RK Workstation Baseline
display name : Default Domain Policy
```

**Interpretation:**

- The PSO enforces a 25-character minimum for legacy-svc only, while ordinary users keep the domain default (7-character minimum): selective hardening without weakening or over-tightening everyone (L04).
- The SPN on legacy-svc, a normal user account, is a deliberate weakness for Module 5 to detect; a gMSA would be the correct production choice (L05).
- The GPO created but DNS-dependent tooling confirms Module 1's lesson: Group Policy locates the DC through DNS SRV records.

**Limitations:** Samba manages GPOs but does not apply the full set of Windows client-side extensions; the structural concepts (create, link, list, precedence) transfer, while specific Windows settings are noted where used.
