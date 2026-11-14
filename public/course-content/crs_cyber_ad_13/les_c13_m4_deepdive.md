The lab's structure (Module 3) is a working, if small, tier model. Reading it back shows how the pieces line up and where a single DC forces compromises.

Tiered accounts and their intended systems:

```output
Tier 0 : t0-admin   (member of Domain Admins)   -> DCs only
Tier 1 : t1-srvadm  (member of Server-Admins)   -> servers (OU=Servers)
Tier 2 : t2-help    (member of Helpdesk)        -> workstations, help desk
         asha, rohan (ordinary staff)
Service: legacy-svc (OU=ServiceAccounts, SPN, PSO)
```

Where Protected Users would apply (a design decision, demonstrated in the capstone): t0-admin and t1-srvadm are candidates - adding them forces AES-only Kerberos, blocks NTLM and delegation, and caps their TGT at four hours. legacy-svc must NOT be added: it is a service account, and Protected Users can break service logons [R2].

The "clean source" check on the lab: with one host, the DC, the admin tooling and the "workstation" are the same machine - which VIOLATES the model (you are administering Tier 0 from the same box you run everything on). The deep-dive lesson is to NAME the violation: in production, Tier 0 administration happens from a PAW, never from a general workstation. The lab teaches the rules and the review; it cannot physically separate tiers on one container.

How the baseline and monitoring connect: the tier model defines WHO may log on WHERE; Module 6's authentication monitor then checks whether Tier 0 logons actually come only from expected sources. In the captured telemetry, the monitor reports:

```output
i Tier 0 logons observed from: 172.17.0.2
  (confirm these originate only from privileged access workstations)
```

That line is the tier model made observable: it tells the defender to verify that privileged logons came from clean sources, not ordinary machines.

**Limitations:** a single-container lab cannot enforce physical PAW separation or apply the full Windows Protected Users behaviour; these are demonstrated conceptually and flagged where Windows differs.
