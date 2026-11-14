LAB_ASSETS/C13/dc/ builds a Samba Active Directory Domain Controller. The image installs the AD DC role and provisions the domain on first start:

```text
realm      AD.SAHYADRI.EXAMPLE      (Kerberos realm, upper case)
domain     SAHYADRI                 (NetBIOS)
DNS back   SAMBA_INTERNAL           (serves the AD SRV records)
server role dc
```

After "docker run ... rk-dc" and a short wait, the DC describes itself (execution-tested, Samba 4.22.11, 2026-11-08):

```output
$ docker exec rk-dc samba-tool domain info 127.0.0.1
Forest           : ad.sahyadri.example
Domain           : ad.sahyadri.example
Netbios domain   : SAHYADRI
DC name          : dc1.ad.sahyadri.example
DC netbios name  : DC1
Server site      : Default-First-Site-Name
Client site      : Default-First-Site-Name
```

DNS is what makes it findable. Pointing the resolver at the DC's own internal DNS and asking for the LDAP SRV record returns the DC:

```output
$ host -t SRV _ldap._tcp.ad.sahyadri.example
_ldap._tcp.ad.sahyadri.example has SRV record 0 100 389
    dc1.ad.sahyadri.example.
```

This single fact explains a failure seen later: samba-tool gpo listall threw "Could not find a DC for domain" until the resolver pointed at the DC's own DNS, because Group Policy tooling locates the DC through exactly this SRV record. The fix was one line - point the resolver at the domain DNS - not a rebuild.

**Interpretation:**

- "Forest == Domain" here because this is a single-domain forest; the forest is still the security boundary (L02).
- The DC is also the DNS server and the Kerberos KDC; in production these roles are distributed across several DCs for resilience (L04).

**Limitations:** one DC means no replication to observe and no FSMO transfer to practise; the capstone notes how a second DC would extend the lab. Samba implements the AD DC role faithfully for these concepts but is not bit-for-bit identical to Windows Server (for example Event Viewer IDs in Module 6).
