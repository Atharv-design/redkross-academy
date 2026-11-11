import fs from 'fs';
import path from 'path';

const modulePath = path.resolve('src/services/db/course03/modules/module3.js');
let content = fs.readFileSync(modulePath, 'utf8');

const updates = [
  // Lesson 3.1 - Fig 1 (C03-M03-D19)
  {
    id: 'C03-M03-D19',
    caption: '*Figure C03-M03-D19: Structural breakdown of fields in /etc/passwd and the cryptographic salt and password hash fields in /etc/shadow.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **/etc/passwd User Record Architecture:** Displays the colon-delimited structure of the primary user database (\`username:password_placeholder:UID:GID:GECOS:home_directory:login_shell\`). The second field contains the literal character \`x\`, signaling to authentication modules (such as PAM) that the actual password hash is isolated in the shadow database. System accounts occupy UIDs 1–999, while human interactive user accounts begin at UID 1000 on modern Linux distributions.
- **/etc/shadow Cryptographic Hash Subsystem:** Highlights the segregated password store accessible strictly by root (\`0640\` or \`0600\` permissions). The hash field is deconstructed into three modular segments: the algorithm identifier (e.g., \`$6$\` for SHA-512, \`$y$\` for yescrypt), the cryptographic salt string (high-entropy random characters), and the resulting one-way digest value.
- **Salt Entropy & Defense Mechanics:** The cryptographic salt prevents precomputation attacks by ensuring that two users with identical plaintext passwords produce entirely distinct hash digests, effectively neutralizing offline rainbow table lookups.
- **Aging & Expiration Fields:** Illustrates the trailing numerical fields regulating password policy: date of last password change (expressed in days since the Unix epoch), minimum password lifetime (preventing immediate cycling), maximum password lifetime (forcing periodic rotation), and account inactivity and expiration boundaries.
- **Defensive Engineering Implication:** If \`/etc/passwd\` inadvertently contains raw password hashes rather than \`x\`, or if permissions on \`/etc/shadow\` become world-readable (\`0644\`), unprivileged attackers can copy the hashes offline and execute dictionary and brute-force cracking attacks using tools like Hashcat or John the Ripper.`
  },

  // Lesson 3.1 - Fig 2 (C03-M03-D20)
  {
    id: 'C03-M03-D20',
    caption: '*Figure C03-M03-D20: Relationship between primary user identities (UIDs), primary groups, and supplementary groups defined in /etc/group.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Subject Identity Context:** Highlights the kernel credentials assigned to a process token upon login, anchored by the primary User ID (UID 1002, e.g., \`secops\`). Every file created by this subject defaults to this owner UID.
- **Primary Group Attribution:** Points from the user identity to the primary Group ID (GID 1002). In User Private Group (UPG) schemes, each user receives a unique matching group, ensuring that files created with default umasks remain unexposed to other system users.
- **Supplementary Group Aggregation:** Shows additional group memberships defined in \`/etc/group\` (\`group_name:password_placeholder:GID:member_list\`). The diagram traces supplementary access vectors: the \`sudo\` group (GID 27) granting administrative command execution, the \`adm\` group (GID 4) permitting read access to protected logs, and the \`docker\` group (GID 999) granting write access to the Unix control socket.
- **Kernel Credential Evaluation:** When a process executes a system call requesting filesystem access, the Linux kernel checks the process's effective UID against the file's owner, followed by the process's effective GID and all supplementary GIDs against the file's group.
- **Security Boundary & Least Privilege:** Demonstrates why administrative group memberships must be closely monitored; granting access to secondary groups like \`docker\` or \`disk\` is functionally equivalent to granting full root privileges due to arbitrary container mounting or raw disk block device access.`
  },

  // Lesson 3.2 - Fig 1 (C03-M03-F1)
  {
    id: 'C03-M03-F1',
    caption: '*Figure C03-M03-F1: Octal digits map to special bits and owner/group/other permissions; special bits appear as s or t in directory listings.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Four-Digit Octal Decomposition:** Deconstructs the full 12-bit POSIX permission word into four octal columns: Special Attributes (Bits 11–9), Owner Permissions (Bits 8–6), Group Permissions (Bits 5–3), and Other/World Permissions (Bits 2–0).
- **Binary Weighting & Arithmetic Mapping:** Each triad represents a 3-bit binary vector where Read (\`r\`) carries weight 4 (\`100_2\`), Write (\`w\`) carries weight 2 (\`010_2\`), and Execute (\`x\`) carries weight 1 (\`001_2\`). The arithmetic sum of set bits determines the octal value (e.g., \`r-x\` = 4 + 0 + 1 = 5; \`rwx\` = 4 + 2 + 1 = 7).
- **Special Bits Triad:** Analyzes the uppermost octal digit: Setuid (weight 4, \`4000\`), Setgid (weight 2, \`2000\`), and the Sticky Bit (weight 1, \`1000\`). Setting these bits alters runtime process credentials or filesystem deletion semantics.
- **Visual Display Overrides in Directory Listings:** Shows how \`ls -l\` formats special bits over the execute character slots. SUID replaces the owner execute bit with \`s\` (or \`S\` if the underlying execute bit is not set). SGID replaces the group execute bit with \`s\` (or \`S\`). The Sticky Bit replaces the other execute bit with \`t\` (or \`T\`).
- **Defensive Auditing Invariant:** System administrators must periodically execute \`find / -perm -4000 -o -perm -2000\` to catalog all binaries executing with elevated privileges and verify that no unauthorized SUID/SGID binaries have been introduced.`
  },

  // Lesson 3.2 - Fig 2 (C03-M03-D21)
  {
    id: 'C03-M03-D21',
    caption: "*Figure C03-M03-D21: Crucial operational distinction of r, w, x on directories: 'r' lists contents, 'w' creates/deletes entries, and 'x' enables traversing and accessing files.*",
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **File vs. Directory Operational Semantics:** Contrasts standard file permission behaviors (where \`r\` reads contents, \`w\` modifies file bytes, and \`x\` executes machine code) against directory permission semantics in the VFS layer.
- **Directory Read (r) Semantics:** Grants permission to read the directory's internal table of filenames via the \`getdents64\` system call (e.g., executing \`ls\`). Without the execute bit, the user can see entry names but cannot query inode metadata (\`stat\`), file sizes, or permissions.
- **Directory Write (w) Semantics:** Governs directory entry (dentry) modification. A user with write permission can create new files, rename existing files, or delete files inside the directory, regardless of who owns those files or whether the target files are marked read-only.
- **Directory Execute (x) Traverse Invariant:** Controls directory traversal and inode path resolution. Execute permission is strictly required to \`cd\` into the directory, traverse through it to access subdirectories, or read the data of files whose names are known.
- **Critical Security Scenario:** Illustrates the vulnerability where an unprivileged user with write access to a shared directory can delete a critical configuration file owned by root unless the Sticky Bit is explicitly enforced on the parent directory.`
  },

  // Lesson 3.3 - Fig 1 (C03-M03-F2)
  {
    id: 'C03-M03-F2',
    caption: '*Figure C03-M03-F2: Linux checks owner, named-user ACLs, groups, and others in order, requiring traverse permission on every parent directory in the path.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Path Traversal Prerequisite:** The flowchart opens at the mandatory traversal validation step. The kernel evaluates whether the process possesses execute (\`x\`) permissions on every intermediate directory in the canonical path leading to the target inode. If traversal fails on any parent directory, an immediate \`EACCES\` (Permission Denied) error is returned before checking the file itself.
- **Sequential Evaluation Hierarchy:** Depicts the strict top-down access check algorithm. The kernel tests the user against the first matching category and halts evaluation immediately—subsequent rules are ignored:
  - **Step 1 (Owner Match):** If the process effective UID matches the file's owner UID, only the owner permission bits apply. If the requested operation is not permitted by the owner triad, access is denied immediately even if group or other bits allow it!
  - **Step 2 (Extended Named-User ACLs):** If POSIX ACLs exist and a named-user entry matches the process UID, the requested access is evaluated against the named ACL entry intersecting with the ACL mask.
  - **Step 3 (Group Match):** If the process GID or any of its supplementary GIDs match the file group (or a named group ACL), group permissions (masked by the ACL mask if present) are evaluated.
  - **Step 4 (Other Fallback):** If neither owner nor group matches, the kernel falls back to the world/other permission triad.
- **Defensive Implication:** Illustrates the "owner trap": an owner who sets permissions to \`007\` on their own file will be denied read/write access because the owner triad (\`0\`) matches and terminates evaluation before the world triad (\`7\`) is ever reached.`
  },

  // Lesson 3.3 - Fig 2 (C03-M03-D22)
  {
    id: 'C03-M03-D22',
    caption: '*Figure C03-M03-D22: Operational mechanics and privilege escalation attack surfaces of Setuid root binaries, Setgid shared collaboration directories, and Sticky Bit on /tmp.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **SUID (Set User ID, Octal 4000) Threat Model:** Depicts an unprivileged user executing a root-owned SUID binary (such as \`/usr/bin/passwd\`). The kernel assigns the process an Effective UID (EUID) of 0 while retaining the user's Real UID (RUID). If the binary contains buffer overflows, environment variable injection vulnerabilities, or invokes untrusted subshells, an attacker can hijack the root execution context to gain an interactive root shell.
- **SGID (Set Group ID, Octal 2000) Collaborative Directory Architecture:** Shows a shared project directory configured with SGID (\`chmod 2775 /srv/team\`). When any team member creates a file or subdirectory inside, the kernel forces the newly created entry to inherit the group ownership of the parent directory rather than the creator's primary group, maintaining team read/write accessibility.
- **Sticky Bit (Restricted Deletion Flag, Octal 1000) Protection Mechanics:** Visualizes world-writable directories such as \`/tmp\` and \`/var/tmp\` (\`chmod 1777\`). The sticky bit modifies the VFS deletion check: even though every user possesses write permission on the directory, the kernel restricts file deletion and renaming exclusively to the file's owner, the directory owner, or the root superuser.
- **Mitigation & Hardening Controls:** Highlights critical defensive countermeasures, including mounting shared filesystems (\`/tmp\`, \`/dev/shm\`, user home directories) with the \`nosuid\` and \`noexec\` mount options in \`/etc/fstab\` to neutralize rogue SUID payloads.`
  },

  // Lesson 3.4 - Fig 1 (C03-M03-D23)
  {
    id: 'C03-M03-D23',
    caption: '*Figure C03-M03-D23: Grammar structure of /etc/sudoers rules: User_Alias, Host_Alias, Runas_Alias, Command_Alias, and restrictive command whitelisting.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Sudoers Rule Grammar Anatomy:** Dissects the formal syntax of administrative elevation rules: \`User_Specification = (Runas_Specification:Group_Specification) Tag_Specification Command_Specification\`. Every segment acts as a gatekeeper restricting where, as whom, and what an authorized user can execute.
- **Alias Abstraction Hierarchy:** Illustrates how enterprise environments scale privilege management using structured alias blocks:
  - **User_Alias:** Groups individual user accounts or netgroups under a logical administrative role (e.g., \`ADMINS = alice, bob, %wheel\`).
  - **Host_Alias:** Restricts rule validity to specific network hosts or server tiers (e.g., \`WEBSERVERS = web01, web02\`).
  - **Runas_Alias:** Defines authorized target execution identities, such as restricting execution to service accounts rather than root (e.g., \`DBUSERS = postgres, mysql\`).
  - **Command_Alias:** Encapsulates explicit, fully qualified binary paths while strictly prohibiting wildcard abuse (e.g., \`NETOPS = /usr/sbin/tcpdump, /usr/sbin/nft\`).
- **Execution Tags & Password Authentication:** Highlights execution tags such as \`NOPASSWD:\` and \`PASSWD:\`. Bypassing password challenges with \`NOPASSWD\` reduces administrative friction for automated scripts but introduces significant credential-stuffing and lateral movement risks.
- **Defensive Command Whitelisting Invariant:** Emphasizes that shell escapes, script interpreters (Python, Perl, Bash), and editors (vi, nano) must never be granted in sudoers rules without restricted parameters, as attackers routinely exploit built-in shell spawn functions (GTFOBins) to escape to an unrestricted root prompt.`
  },

  // Lesson 3.4 - Fig 2 (C03-M03-D24)
  {
    id: 'C03-M03-D24',
    caption: '*Figure C03-M03-D24: Best-practice sudo policy management utilizing isolated drop-in configuration files in /etc/sudoers.d/ validated with visudo -c.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Modular Drop-in Architecture:** Contrasts monolithic editing of \`/etc/sudoers\` against modern modular governance using \`/etc/sudoers.d/\`. The primary configuration file delegates to the drop-in directory using the directive \`#includedir /etc/sudoers.d\` (where the leading \`#\` is part of the syntax, not a comment).
- **Automated Configuration Management Isolation:** Shows individual configuration management tools (Ansible, Puppet, Terraform) deploying isolated, role-specific policy files (e.g., \`10-secops\`, \`20-monitoring\`, \`30-developers\`) without colliding or overwriting adjacent team configurations.
- **Naming Convention & Filename Invariant:** Illustrates the strict parser requirement: files containing periods (\`.\`) or ending with backup characters (such as \`~\`) are automatically skipped by the sudo parser. This prevents temporary editor files and package manager update artifacts (\`.dpkg-old\`, \`.rpmnew\`) from accidentally taking effect.
- **Validation Pipeline with visudo:** Demonstrates the continuous validation workflow using \`visudo -cf /etc/sudoers.d/<filename>\`. Modifying sudoers files directly without syntax checking can corrupt the grammar, locking all administrative users out of root access across the entire fleet.
- **Secure File Permissions:** Highlights the mandatory filesystem permission boundary: drop-in files must be owned by \`root:root\` with permissions set strictly to \`0440\` (\`r--r-----\`) to prevent unauthorized tampering.`
  },

  // Lesson 3.5 - Fig 1 (C03-M03-D25)
  {
    id: 'C03-M03-D25',
    caption: '*Figure C03-M03-D25: Linux package maintenance cycle showing repository sync, dependency resolution, CVE patch detection, and unattended-upgrades automation.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Repository Metadata Synchronization:** The cycle initiates with repository indexing (e.g., \`apt update\` or \`dnf check-update\`). The package manager retrieves upstream \`InRelease\` or \`repomd.xml\` manifests over HTTPS, establishing a synchronized local index of available software packages and security updates.
- **Cryptographic Trust & GPG Signature Verification:** Details how the local package manager validates the digital signature of downloaded metadata against public GPG keys stored in \`/etc/apt/trusted.gpg.d/\` or \`/etc/pki/rpm-gpg/\`. This verification step defends against man-in-the-middle attacks and malicious repository mirroring.
- **Dependency Resolution Engine:** Visualizes the package manager building a Directed Acyclic Graph (DAG) to resolve library dependencies, conflicts, and version constraints before installing or upgrading any system component.
- **CVE Patch Detection & Classification:** Highlights the automated vulnerability identification process, where package changelogs and security advisories are evaluated to prioritize critical zero-day and remote code execution (RCE) security patches.
- **Unattended-Upgrades Automation:** Depicts the background automation daemon periodically pulling, verifying, and applying security-only updates without administrative intervention, rebooting the system safely within designated maintenance windows if required.`
  },

  // Lesson 3.5 - Fig 2 (C03-M03-D26)
  {
    id: 'C03-M03-D26',
    caption: '*Figure C03-M03-D26: File integrity verification checking installed binaries against package manager MD5/SHA-256 databases to detect rootkit tampering.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Baseline Package Manifest Database:** Highlights the authoritative local package database (\`/var/lib/dpkg/info/\` on Debian/Ubuntu or the RPM database on Red Hat/CentOS). The database maintains pre-computed cryptographic checksums (SHA-256/MD5), expected file sizes, symbolic link targets, and original file permissions for every installed binary and library.
- **Integrity Verification Process:** Depicts the execution of verification commands (\`dpkg -V\` or \`rpm -V\`). The package manager scans the live filesystem, recomputes the hash of each binary on disk, and compares the runtime values against the trusted installation baseline.
- **Discrepancy Flags & Rootkit Detection:** Deconstructs the single-character audit flags returned upon verification failure (e.g., \`S\` for file size change, \`5\` for MD5 digest mismatch, \`T\` for modification timestamp change, \`M\` for permission mode discrepancy, and \`U/G\` for ownership changes).
- **Triage: Legitimate Configuration vs. Compromise:** Distinguishes between expected configuration modifications (files in \`/etc/\` that administrators legitimately adjust) versus catastrophic integrity violations in system binary directories (\`/bin/\`, \`/sbin/\`, \`/usr/lib/\`), which indicate binary trojanization or kernel rootkit implantation.
- **Defensive Engineering Implication:** Automated integrity auditing provides high-confidence evidence during incident response, allowing responders to rapidly identify whether core utilities (such as \`ps\`, \`netstat\`, or \`ls\`) have been replaced to conceal malicious adversary processes.`
  },

  // Lesson 3.6 - Fig 1 (C03-M03-F3)
  {
    id: 'C03-M03-F3',
    caption: '*Figure C03-M03-F3: Logs flow from kernel and applications into journald, optionally to rsyslog text files rotated by logrotate, and forward to central SIEM storage.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Log Generation Sources:** Traces system event generation across three primary telemetry producers: the Linux kernel via \`/dev/kmsg\`, standard userland applications and daemons emitting events over \`/dev/log\`, and systemd service units streaming stdout and stderr.
- **Central Collection Hub (systemd-journald):** Shows journald acting as the high-speed, unified first-stage log collector. It enriches raw log records with indexed structured metadata (including \`_PID\`, \`_UID\`, \`_SYSTEMD_UNIT\`, and boot IDs) and stores them in indexed binary journals (\`/run/log/journal/\` for volatile memory or \`/var/log/journal/\` for persistent storage).
- **Secondary Processing with rsyslog:** Illustrates journald forwarding streams through a local Unix domain socket to the \`rsyslog\` daemon. rsyslog filters events by facility and severity, writing human-readable text logs into classic log destinations (\`/var/log/syslog\`, \`/var/log/auth.log\`, and \`/var/log/secure\`).
- **Logrotate Maintenance Lifecycle:** Depicts the scheduled rotation daemon managing text log files on disk, executing size-based and time-based truncation, compression, and archival to protect host storage from exhaustion.
- **Encrypted Central SIEM Forwarding:** Shows the enterprise telemetry egress path: rsyslog streaming structured event records over TLS (port 6514) to a centralized Security Information and Event Management (SIEM) platform or log aggregator (such as Elasticsearch or Splunk) for correlation, threat hunting, and tamper-resistant retention.`
  },

  // Lesson 3.6 - Fig 2 (C03-M03-D27)
  {
    id: 'C03-M03-D27',
    caption: '*Figure C03-M03-D27: Lifecycle of log rotation showing active log truncation, postrotate daemon HUP signals, gzip compression, and secure 0640 permissions.*',
    walkthrough: `#### Visual Walkthrough & Architectural Breakdown

- **Scheduled Rotation Trigger:** The lifecycle initiates when \`logrotate\` executes via a cron job or systemd timer, parsing configuration directives in \`/etc/logrotate.conf\` and drop-in files in \`/etc/logrotate.d/\`. The rotation threshold evaluates whether conditions (e.g., \`daily\`, \`weekly\`, or exceeding a file size limit like \`size 100M\`) are satisfied.
- **Log File Renaming & Truncation:** Details the file transition workflow. The active log file (e.g., \`auth.log\`) is renamed to \`auth.log.1\`. A brand-new active log file is instantiated with restrictive ownership and permissions (\`create 0640 root adm\`) so services can immediately continue writing without downtime.
- **The postrotate Daemon HUP Signal:** Visualizes the \`postrotate\` script block executing \`systemctl kill -s HUP <daemon>.service\`. This SIGHUP signal informs the logging daemon that its open file descriptor has been moved, prompting it to close the old inode and reopen the newly created \`auth.log\` file without requiring a full service restart.
- **Background Compression & Numbered Retention:** Illustrates older archives being compressed into gzip files (\`auth.log.2.gz\`, \`auth.log.3.gz\`) to minimize disk consumption. The \`rotate <count>\` parameter defines the retention window; once the count is exceeded, the oldest archive is permanently unlinked.
- **Access Control & Log Confidentiality:** Emphasizes that newly generated log files maintain strict \`0640\` or \`0600\` permissions, preventing unprivileged local users from inspecting sensitive authentication logs, session tokens, and operational telemetry.`
  }
];

let matchCount = 0;
for (const update of updates) {
  if (!content.includes(update.caption)) {
    console.error('ERROR: Caption not found for ' + update.id + ': ' + update.caption);
    process.exit(1);
  }
  const escapedWalkthrough = JSON.stringify(update.walkthrough).slice(1, -1);
  const replacement = update.caption + '\\n\\n' + escapedWalkthrough;

  content = content.replace(update.caption, () => replacement);
  matchCount++;
}

console.log('Successfully matched and formatted ' + matchCount + ' figures in Module 3.');
fs.writeFileSync(modulePath, content, 'utf8');
console.log('Successfully wrote updated module3.js!');
