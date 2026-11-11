import fs from 'fs';
import path from 'path';

const modulePath = path.resolve('src/services/db/course03/modules/module7.js');
let content = fs.readFileSync(modulePath, 'utf8');

const updates = [
  // Lesson 7.1 - Fig 1 (C03-M07-F1)
  {
    id: 'C03-M07-F1',
    caption: '*Figure C03-M07-F1: Windows components write to event channels governed by audit policy; events are forwarded to a central collector for retention and analysis.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Event Tracing for Windows (ETW) Instrumentation:** Traces kernel and userland event producers (including the Windows Kernel, LSASS, Service Control Manager, and PowerShell runtime) emitting low-overhead binary trace messages through the ETW logging subsystem.
- **Audit Policy Governance:** Shows Advanced Audit Policy Configuration acting as the administrative filter. Only events matching active audit subcategory policies (e.g., "Audit Process Creation - Success", "Audit Account Lockout - Failure") are allowed to materialize into event channels, keeping log volume manageable.
- **Structured Channel Storage:** Details local event storage in \`C:\\Windows\\System32\\winevt\\Logs\\\` across discrete binary EVTX channels: \`Security.evtx\` (governed by SACLs and SRM), \`System.evtx\` (hardware and driver lifecycle), \`Application.evtx\`, and dedicated \`Microsoft-Windows-*\\Operational\` provider logs.
- **Log Forwarding & Central Telemetry Collector:** Visualizes the Windows Event Forwarding (WEF) subscription engine reading new records and forwarding them across the network to a central log collector for long-term retention and automated threat detection.`
  },

  // Lesson 7.1 - Fig 2 (C03-M07-D55)
  {
    id: 'C03-M07-D55',
    caption: '*Figure C03-M07-D55: Structural breakdown of Windows Event Log XML: standard <System> header metadata and specialized <EventData> parameter payload.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Dual-Section XML Schema Architecture:** Dissects the canonical XML representation of a Windows event record into its two fundamental blocks: the universal \`<System>\` header and the context-specific \`<EventData>\` payload.
- **The Standard <System> Header Schema:** Examines immutable metadata fields common to every Windows event:
  - \`<Provider Name="..." Guid="...">\`: The registered ETW provider identity.
  - \`<EventID>\`: The primary numeric event identifier (e.g., \`4624\`).
  - \`<Level>\`: Event severity rating (Information = 4, Warning = 3, Error = 2, Critical = 1).
  - \`<TimeCreated SystemTime="...">\`: High-precision UTC timestamp.
  - \`<EventRecordID>\`: Monotonically increasing sequential index per channel, enabling detection of deleted log entries.
  - \`<Execution ProcessID="..." ThreadID="...">\`: Identifies the exact process that generated the event.
  - \`<Computer>\`: Fully qualified domain name (FQDN) of the originating host.
- **The Contextual <EventData> Parameter Payload:** Highlights the dynamic parameter array. For authentication events (Event 4624), \`<EventData>\` encapsulates critical threat intelligence: \`TargetUserName\`, \`TargetDomainName\`, \`TargetUserSid\`, \`LogonType\`, \`LogonProcessName\`, \`AuthenticationPackageName\`, and source \`IpAddress\` with source \`IpPort\`.
- **Parsing Invariant for Detection Engineers:** Explains that modern SIEM correlation queries parse typed fields directly from \`<EventData>\` rather than regex-matching raw text messages, ensuring immune parsing across international Windows language packs.`
  },

  // Lesson 7.2 - Fig 1 (C03-M07-D56)
  {
    id: 'C03-M07-D56',
    caption: '*Figure C03-M07-D56: High-fidelity Windows Security event catalog: Logon Types (2 Interactive, 3 Network, 10 RDP), Account Changes (4720), and Log Cleared (1102).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Critical Security Event Taxonomy:** Organizes the primary security event IDs that constitute the core baseline for threat hunting and compliance monitoring in Windows environments:
- **Authentication & Logon Dynamics (Events 4624 & 4625):** Maps the crucial \`LogonType\` field:
  - **Type 2 (Interactive):** Physical keyboard/console login or direct virtual machine console access.
  - **Type 3 (Network):** Remote access via network share (SMB), RPC, or IIS authentication (common lateral movement channel).
  - **Type 4 (Batch) & Type 5 (Service):** Automated scheduled task and background service startups.
  - **Type 7 (Unlock):** Workstation unlock events.
  - **Type 9 (NewCredentials):** RunAs with \`/netonly\`, widely used by adversaries using Mimikatz or Cobalt Strike to stage alternate network identities.
  - **Type 10 (RemoteInteractive):** Remote Desktop Protocol (RDP) sessions over port 3389.
- **Privilege Elevation & Account Modifications:** Details Event 4672 (assignment of special administrator privileges at logon), Event 4720 (user account creation), and Events 4728/4732 (member added to privileged domain or local security groups).
- **Anti-Forensics & Log Tampering Alert (Event 1102):** Highlights Event ID 1102 ("The audit log was cleared"). This is an immediate, high-fidelity indicator of adversary anti-forensics that must trigger automated priority-1 security alerts in any enterprise SOC.`
  },

  // Lesson 7.2 - Fig 2 (C03-M07-D57)
  {
    id: 'C03-M07-D57',
    caption: '*Figure C03-M07-D57: Enabling command line auditing in Event 4688: capturing parent process ancestry, creator subject, and full argument strings for threat triage.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Default Process Auditing vs. Command Line Auditing:** Contrasts standard Event 4688 logging (which captures only the executable name and process ID) against enhanced command-line auditing enabled via Group Policy (\`Include command line in process creation events\`).
- **Parent-Child Process Ancestry:** Details the lineage correlation:
  - \`SubjectUserName\`: The security principal initiating the process creation.
  - \`ParentProcessName\`: The spawning parent binary (e.g., \`C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE\`).
  - \`NewProcessName\`: The child process spawned (e.g., \`C:\\Windows\\System32\\cmd.exe\`).
- **Adversary Tradecraft Detection via ProcessCommandLine:** Illustrates how the full argument string exposes adversary activity (e.g., \`cmd.exe /c powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -Enc aQB4ACA...\`). Without command-line auditing enabled, defenders only see that \`cmd.exe\` ran, with zero visibility into the malicious Base64 payload.
- **Anomalous Process Lineage Detection:** Demonstrates how SOC analysts leverage this telemetry to flag living-off-the-land techniques—such as web servers (\`w3wp.exe\`) or document editors (\`winword.exe\`, \`excel.exe\`) spawning administrative shells (\`cmd.exe\`, \`powershell.exe\`, \`wmic.exe\`).`
  },

  // Lesson 7.3 - Fig 1 (C03-M07-D58)
  {
    id: 'C03-M07-D58',
    caption: '*Figure C03-M07-D58: Centralized log aggregation with WEF: comparing Collector-Initiated push models with enterprise Source-Initiated (push over WinRM 5985/5986) architecture.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Architectural Comparison: Collector-Initiated vs. Source-Initiated WEF:** Contrasts the two deployment patterns for Windows Event Forwarding across enterprise environments:
- **Collector-Initiated Model (Legacy / Lab):** The Windows Event Collector (WEC) server maintains an explicit list of client hostnames and actively reaches out over the network to pull events. This model breaks when clients sit behind corporate firewalls, NAT routers, or mobile VPNs, and requires the collector to possess administrative credentials on every managed endpoint.
- **Source-Initiated Model (Enterprise Standard):** Endpoints discover collector subscriptions via Group Policy and actively initiate outbound connections over Windows Remote Management (WinRM, TCP 5985 for Kerberos or 5986 for mutual TLS). This model is NAT-friendly, firewall-compliant, and scales seamlessly to tens of thousands of endpoints without maintaining static host lists.
- **WinRM Transport & Security Boundary:** Shows the encrypted WinRM transport channel carrying event payloads compressed and batched according to subscription latency profiles (\`MinLatency\`, \`MaxLatency\`).
- **Defensive Resilience:** Source-initiated architecture guarantees that remote laptops re-establish forwarder pipelines automatically whenever they reconnect to the corporate network, transmitting accumulated security logs without data loss.`
  },

  // Lesson 7.3 - Fig 2 (C03-M07-D59)
  {
    id: 'C03-M07-D59',
    caption: '*Figure C03-M07-D59: End-to-end telemetry pipeline from fleet endpoints through Windows Event Forwarding into an enterprise SIEM cluster with real-time detection rules.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **End-to-End Enterprise Telemetry Flow:** Traces security events through a four-stage pipeline from edge workstations to the security operations center:
  1. **Fleet Endpoints:** Workstations, application servers, and Domain Controllers generate high-fidelity security events (logon, process execution, PowerShell script blocks).
  2. **WEF Forwarding Tier:** Endpoints filter and stream XML event records over encrypted WinRM channels to high-availability Windows Event Collector (WEC) servers.
  3. **Ingestion & Normalization Layer:** Lightweight log shippers (such as Winlogbeat, Splunk Universal Forwarder, or Elastic Agent) running on WEC servers ingest the aggregated \`ForwardedEvents.evtx\` stream, parse XML fields into Elastic Common Schema (ECS) or CIM format, and transmit structured JSON over TLS to the SIEM.
  4. **SIEM Analytics & Detection Engine:** The central SIEM cluster (e.g., Splunk, Microsoft Sentinel, Elasticsearch) indexes events and evaluates real-time detection rules (Sigma rules, MITRE ATT&CK mappings).
- **Operational Scalability & Resilience:** Concentrating log forwarding onto a dedicated WEC tier minimizes network egress bandwidth and isolates endpoint agents from directly connecting to core SIEM storage clusters.`
  },

  // Lesson 7.4 - Fig 1 (C03-M07-D60)
  {
    id: 'C03-M07-D60',
    caption: '*Figure C03-M07-D60: Hierarchical Active Directory Domain Services (AD DS) structure: Forest root domain, child trees, two-way transitive trusts, and OU tiering architecture.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Active Directory Logical Hierarchy:** Details the structural topology of Active Directory Domain Services:
  - **Forest:** The ultimate security and administrative boundary sharing a single unified Schema, Configuration partition, and Global Catalog.
  - **Forest Root Domain (\`corp.local\`):** The root identity realm holding forest-wide FSMO roles (Schema Master, Domain Naming Master).
  - **Child Domains & Trees:** Regional or business unit domains (\`na.corp.local\`, \`eu.corp.local\`) bound by automatic two-way transitive Kerberos trust relationships.
- **Organizational Unit (OU) Architecture:** Shows the container structure used to organize security principals (users, groups, computers) and link Group Policy Objects.
- **Enterprise Access Tiering Model (Tier 0 / Tier 1 / Tier 2):** Highlights modern Active Directory hardening:
  - **Tier 0:** Domain Controllers, PKI, and identity administrators. High-impact assets isolated from all lower tiers.
  - **Tier 1:** Enterprise servers, cloud management planes, and database applications.
  - **Tier 2:** Workstations, end-user accounts, and peripheral hardware.
- **Lateral Movement Defense:** Enforces the fundamental security invariant: credentials from higher tiers (Tier 0 admins) must never be entered or cached on lower-tier assets (Tier 2 workstations), completely mitigating Pass-the-Hash and credential harvesting lateral movement.`
  },

  // Lesson 7.4 - Fig 2 (C03-M07-D61)
  {
    id: 'C03-M07-D61',
    caption: '*Figure C03-M07-D61: Detailed 3-phase Kerberos v5 ticket exchange: Authentication Service (TGT request), Ticket-Granting Service (Service Ticket request), and Client Application session.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **The Three-Phase Kerberos v5 Protocol Exchange:** Maps the complete cryptographic authentication sequence governing Windows Active Directory access:
- **Phase 1: Authentication Service (AS) Exchange:**
  - Client sends \`AS-REQ\` containing user identity and a timestamp encrypted with the user's password hash (pre-authentication proving knowledge of secret).
  - Key Distribution Center (KDC on DC) verifies the timestamp, generates a session key, and replies with \`AS-REP\` containing the **Ticket Granting Ticket (TGT)** (encrypted with the KDC's master \`krbtgt\` secret) and a client/TGS session key.
- **Phase 2: Ticket-Granting Service (TGS) Exchange:**
  - Client presents the TGT and an encrypted authenticator in \`TGS-REQ\` requesting access to a specific Service Principal Name (SPN, e.g., \`cifs/fileserver.corp.local\`).
  - KDC decrypts the TGT using \`krbtgt\`, validates client identity, and responds with \`TGS-REP\` containing the **Service Ticket (ST)** (encrypted with the target service account's password hash) and a client/server session key.
- **Phase 3: Client / Server Application (AP) Exchange:**
  - Client presents the Service Ticket in \`AP-REQ\` to the application server. The server decrypts the ticket using its own secret key, validates the client PAC (Privilege Attribute Certificate), and grants session access.
- **Adversary Attack Surface Insights:** Explains the cryptographic mechanics underlying major AD attacks: Kerberoasting exploits offline brute-forcing of Phase 2 Service Tickets, while Golden Ticket attacks forge unauthorized Phase 1 TGTs by compromising the \`krbtgt\` key.`
  },

  // Lesson 7.5 - Fig 1 (C03-M07-F2)
  {
    id: 'C03-M07-F2',
    caption: '*Figure C03-M07-F2: Group Policy applies local, site, domain, then OU policies; later settings win unless Enforcement or Block Inheritance applies.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Group Policy Application Order (LSDOU Hierarchy):** Illustrates the sequential processing pipeline executed by the Group Policy client on endpoints during boot and user logon:
  1. **Local Policy (L):** Evaluated first; lowest precedence.
  2. **Site Policies (S):** Applied based on the Active Directory subnet site configuration.
  3. **Domain Policies (D):** Applied at the domain root (e.g., Default Domain Policy governing password complexity and account lockout).
  4. **Organizational Unit Policies (OU):** Applied sequentially from top-level parent OUs down to nested child OUs; latest processed OU holds highest standard precedence.
- **Conflict Resolution Rule ("Later Setting Wins"):** By default, when identical policy settings conflict between parent and child containers, the policy applied *later* in the pipeline overwrites earlier settings.
- **Precedence Exception Overrides:**
  - **Block Inheritance:** Configured on an OU container; prevents policy settings from parent domain/OUs from flowing down into that container.
  - **Enforced (No Override):** Configured on a GPO link at a parent container; forces that GPO's settings to take precedence over all downstream child OU policies, unconditionally piercing through any "Block Inheritance" flags.
- **Defensive Application:** Security teams enforce baseline hardening GPOs (such as disabling LLMNR/NetBIOS and mandating SMB signing) at the domain root with "Enforced" status to prevent decentralized IT teams from accidentally overriding enterprise safeguards.`
  },

  // Lesson 7.5 - Fig 2 (C03-M07-D62)
  {
    id: 'C03-M07-D62',
    caption: '*Figure C03-M07-D62: Anatomy of a GPO: Active Directory Group Policy Container (GPC metadata) linked to SYSVOL Group Policy Template (GPT files and scripts).*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Dual-Storage GPO Architecture:** Deconstructs a Group Policy Object into its two synchronized components spanning Active Directory and the filesystem:
- **Group Policy Container (GPC in Active Directory):** Resides in the AD database under \`CN=Policies,CN=System,DC=corp,DC=local\`. It stores GPO metadata: unique GUID, display name, status flags (Enabled, User Disabled, Computer Disabled), version number, and extension tool GUIDs. It replicates across DCs via native multi-master Active Directory replication.
- **Group Policy Template (GPT in SYSVOL):** Resides on the filesystem at \`\\\\corp.local\\SYSVOL\\corp.local\\Policies\\{GUID}\\\`. Contains physical policy files: \`gpt.ini\` (holding the version counter), registry policy files (\`Registry.pol\`), administrative templates (\`.admx\`), security templates, and startup/logon scripts. It replicates across DCs via Distributed File System Replication (DFSR).
- **The Version Synchronization Invariant:** Shows how the 32-bit version number in the GPC must strictly match the version number stored inside the GPT's \`gpt.ini\`.
- **Operational Troubleshooting Value:** If an endpoint fails to apply a newly updated GPO, administrators verify whether DFSR replication latency has caused a version mismatch between GPC and GPT, preventing the client from downloading updated policy files.`
  },

  // Lesson 7.6 - Fig 1 (C03-M07-F3)
  {
    id: 'C03-M07-F3',
    caption: '*Figure C03-M07-F3: Patch management moves from inventory and prioritization through tested ring deployment to verification and operational metrics.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Structured Six-Stage Patch Lifecycle:** Depicts the continuous enterprise vulnerability remediation workflow:
  1. **Asset & Software Inventory:** Automated scanning tools discover all hardware assets, operating system build versions, and installed third-party software packages.
  2. **Vulnerability Prioritization:** Security teams evaluate patch advisories using CVSS scores, threat intelligence, and the CISA Known Exploited Vulnerabilities (KEV) catalog to identify critical zero-day threats.
  3. **Lab Testing (Ring 0):** Patches are deployed into an isolated lab environment running representative mission-critical applications to identify software regressions.
  4. **Pilot Deployment (Ring 1):** Updates rollout to IT and SecOps early-adopter endpoints (1–5% of fleet) for real-world user validation.
  5. **Broad Enterprise Rollout (Ring 2 & 3):** Phased rollout across general production workstations and departmental servers in staged batches.
  6. **Verification & Metric Auditing:** Compliance scanners verify patch installation status, track reboot completion SLAs, and identify non-compliant outlier hosts.
- **Risk Mitigation:** Prevents business disruption by testing updates before fleet-wide distribution, balancing rapid vulnerability mitigation against operational stability.`
  },

  // Lesson 7.6 - Fig 2 (C03-M07-D63)
  {
    id: 'C03-M07-D63',
    caption: '*Figure C03-M07-D63: WSUS architecture: upstream Microsoft Update synchronization, downstream internal WSUS servers, and GPO client targeting into deployment rings.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Enterprise WSUS Hierarchy & Bandwidth Management:** Illustrates the multi-tier distribution model for managing Windows operating system updates:
  - **Upstream Synchronization:** The master corporate Windows Server Update Services (WSUS) server downloads approved update binaries and metadata from public Microsoft Update servers over HTTPS.
  - **Downstream Replica Servers:** Branch office WSUS servers replicate approved updates from the upstream master, conserving expensive WAN bandwidth by serving updates locally to branch clients.
- **Group Policy Client-Side Targeting:** Shows Group Policy configuring endpoint update behavior:
  - \`Specify intranet Microsoft update service location\`: Points endpoints to the internal WSUS URL (e.g., \`http://wsus.corp.local:8530\`).
  - \`Enable client-side targeting\`: Directs workstations into designated WSUS Computer Target Groups based on OU membership.
- **Phased Deployment Rings:** Visualizes the progression of updates across target groups: Ring 0 (Canary/IT) receiving updates on Day 0; Ring 1 (Pilot Business Users) receiving updates on Day 7; Ring 2 (Broad Production Fleet) receiving updates on Day 14.
- **Defensive Significance:** Centralized patch management prevents unauthorized endpoint updates while ensuring critical security CVEs are systematically deployed and auditable across all domain assets.`
  }
];

// Apply updates
for (const update of updates) {
  let matched = false;
  if (content.includes(update.caption)) {
    matched = true;
  } else {
    const bareCaption = update.caption.replace(/^\*|\*$/g, '');
    if (content.includes(bareCaption)) {
      matched = true;
      update.caption = bareCaption;
    }
  }
  if (!matched) {
    console.error('ERROR: Caption not found for ' + update.id + ': ' + update.caption);
    process.exit(1);
  }
  const escapedWalkthrough = JSON.stringify(update.walkthrough).slice(1, -1);
  const replacement = update.caption + '\\n\\n' + escapedWalkthrough;

  content = content.replace(update.caption, () => replacement);
}

console.log('Successfully matched and formatted ' + updates.length + ' figures in Module 7.');
fs.writeFileSync(modulePath, content, 'utf8');
console.log('Successfully wrote updated module7.js!');
