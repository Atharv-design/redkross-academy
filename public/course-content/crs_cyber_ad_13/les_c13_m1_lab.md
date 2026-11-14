> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C13_Lab_Kit.zip](/downloads/labs/RedKross_C13_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C13/...` refer to the extracted `C13` folder. Everything runs locally against systems you own.

## Practical 1: Build and verify the lab domain controller

**Objective:** Build the Sahyadri Logistics domain controller and confirm it is healthy before later modules build on it.

**Difficulty:** Intermediate.

**Required tools:** Docker; LAB_ASSETS/C13.

**Prerequisites:** Lessons L04-L06.

**Environment setup:** from LAB_ASSETS/C13, docker build -t rk-dc ./dc.

**Explicit authorised scope:** your own lab container only. Do not point any command in this course at a domain you do not administer.

**Step-by-step instructions:**

```text
1. docker run -d --name rk-dc --privileged -h dc1 \
     -e ADMIN_PASS='Lab-Only-Adm1n!' -p 127.0.0.1:1389:389 rk-dc
2. Wait about 20 seconds, then: docker exec rk-dc samba-tool domain info
   127.0.0.1 ; confirm the Forest, Domain and DC name.
3. docker exec rk-dc sh -c "printf 'nameserver 127.0.0.1\n' >
   /etc/resolv.conf; host -t SRV _ldap._tcp.ad.sahyadri.example" ; confirm
   the SRV record points at dc1.
4. Record the domain, forest, NetBIOS name and DC host name.
```

Expected observations (execution-tested, Samba 4.22.11): the domain info and SRV output shown in section 3.

**Troubleshooting:** "Could not find a DC" from a management command almost always means DNS - point the resolver at the DC (step 3). If provisioning fails on first boot, check that the container has the samba-ad-provision package and is run with --privileged.

**Cleanup:** leave rk-dc running for later modules, or docker stop rk-dc to pause it (its state persists until docker rm).

**Learning outcome:** you can build a DC and verify it with its own tools.

## Practical 2: Read the directory with LDAP

**Objective:** Query the directory over LDAP and map what you see to the schema and partitions.

**Difficulty:** Intermediate.

**Required tools:** the running rk-dc container.

**Prerequisites:** Lessons L01, L03.

**Environment setup:** none beyond P1.

**Explicit authorised scope:** your own lab container only.

**Step-by-step instructions:**

1. docker exec rk-dc sh -c "ldbsearch -H /var/lib/samba/private/sam.ldb -b 'DC=ad,DC=sahyadri,DC=example' '(objectClass=domainDNS)' objectSid" ; record the domain SID.
2. List the naming contexts: ldbsearch against the rootDSE for namingContexts; identify the domain, configuration and schema NCs.
3. Find the global-catalogue port and the FSMO role holders with samba-tool fsmo show.
4. Write one sentence each explaining what the configuration NC and the schema NC are for, and why they are forest-wide.

**Expected observations:** a single domain SID; three or more naming contexts; all FSMO roles held by dc1 (a single-DC forest).

**Troubleshooting:** if ldbsearch is not on PATH, use the full path under /usr/bin; if access is denied, run inside the container as root (docker exec).

**Cleanup:** none.

**Learning outcome:** you can read the directory structure and relate it to the schema and partitions.
