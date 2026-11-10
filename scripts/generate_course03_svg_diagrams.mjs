import fs from 'fs';
import path from 'path';

// Output directory
const outputDir = path.resolve('public/assets/courses/cyber-03');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read all 8 modules to extract all 96 diagrams
const diagrams = [];
for (let i = 1; i <= 8; i++) {
  const modPath = path.resolve(`src/services/db/course03/modules/module${i}.js`);
  const content = fs.readFileSync(modPath, 'utf8');
  // Extract images array objects using regex
  const imgRegex = /"id":\s*"(img_c3_[^"]+)",[\s\S]*?"title":\s*"([^"]+)",[\s\S]*?"url":\s*"([^"]+)",[\s\S]*?"caption":\s*"([^"]+)",[\s\S]*?"alt":\s*"([^"]+)"/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    diagrams.push({
      modNum: i,
      id: match[1],
      title: match[2],
      url: match[3],
      caption: match[4],
      alt: match[5]
    });
  }
}

console.log(`Found ${diagrams.length} diagrams across all 8 modules.`);

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate tailored SVG for each diagram
diagrams.forEach((diag, index) => {
  const baseFilename = path.basename(diag.url);
  const nameWithoutExt = baseFilename.replace(/\.[^/.]+$/, '');
  const figTag = diag.title.split(':')[0].trim();
  const titleText = diag.title.includes(':') ? diag.title.substring(diag.title.indexOf(':') + 1).trim() : diag.title;
  const modTitle = `MODULE ${diag.modNum.toString().padStart(2, '0')} // SYSTEMS DEFENSE`;

  // Determine diagram archetype based on title keywords
  const titleLower = diag.title.toLowerCase();
  let archetype = 'stack'; // default
  if (titleLower.includes('tree') || titleLower.includes('hierarchy') || titleLower.includes('fhs')) {
    archetype = 'tree';
  } else if (titleLower.includes('state') || titleLower.includes('transition') || titleLower.includes('lifecycle')) {
    archetype = 'state';
  } else if (titleLower.includes('pipeline') || titleLower.includes('flow') || titleLower.includes('exchange') || titleLower.includes('kerberos')) {
    archetype = 'flow';
  } else if (titleLower.includes('vs') || titleLower.includes('comparative') || titleLower.includes('comparison')) {
    archetype = 'compare';
  } else if (titleLower.includes('permission') || titleLower.includes('matrix') || titleLower.includes('acl')) {
    archetype = 'matrix';
  }

  // Build inner graphic based on archetype
  let graphicSvg = '';

  if (archetype === 'stack') {
    // 4-layer stacked architecture
    graphicSvg = `
      <!-- Layer 4: Top / User Space -->
      <g transform="translate(140, 160)">
        <rect width="920" height="85" rx="10" fill="#F8FAFC" stroke="#0284C7" stroke-width="2.5" stroke-dasharray="6,4" />
        <rect x="0" y="0" width="14" height="85" rx="4" fill="#0284C7" />
        <text x="35" y="38" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="700" fill="#0369A1">LAYER 4: USER SPACE &amp; APPLICATIONS (RING 3)</text>
        <text x="35" y="62" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" fill="#475569">Restricted execution: CLI shells, GUI desktop, user-mode agents, and web applications running with non-root security tokens.</text>
        <g transform="translate(740, 25)">
          <rect width="150" height="36" rx="6" fill="#E0F2FE" stroke="#38BDF8" stroke-width="1.5" />
          <text x="75" y="23" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="#0369A1" text-anchor="middle">UNPRIVILEGED</text>
        </g>
      </g>

      <!-- System Call Boundary Line -->
      <g transform="translate(140, 260)">
        <line x1="0" y1="18" x2="920" y2="18" stroke="#FF7A00" stroke-width="3" stroke-dasharray="8,6" />
        <rect x="360" y="0" width="200" height="36" rx="18" fill="#FFF7ED" stroke="#FF7A00" stroke-width="2" />
        <text x="460" y="23" font-family="JetBrains Mono, monospace" font-size="12" font-weight="800" fill="#C2410C" text-anchor="middle">↕ SYSTEM CALLS (TRAP)</text>
      </g>

      <!-- Layer 3: Kernel Space -->
      <g transform="translate(140, 310)">
        <rect width="920" height="110" rx="10" fill="#FFFBEB" stroke="#D97706" stroke-width="2.5" />
        <rect x="0" y="0" width="14" height="110" rx="4" fill="#D97706" />
        <text x="35" y="36" font-family="Inter, system-ui, sans-serif" font-size="16" font-weight="700" fill="#B45309">LAYER 3: PRIVILEGED KERNEL EXECUTIVE (RING 0)</text>
        <text x="35" y="60" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="500" fill="#78350F">Core subsystems: Process Scheduler, Virtual Memory Paging, VFS File Systems, IPC, and Cryptographic Security Token Verification.</text>
        <g transform="translate(35, 74)">
          <rect width="180" height="26" rx="4" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" />
          <text x="90" y="17" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="#92400E" text-anchor="middle">PROCESS SCHEDULER</text>
          <rect x="200" y="0" width="180" height="26" rx="4" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" />
          <text x="290" y="17" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="#92400E" text-anchor="middle">MEMORY MMU / ASLR</text>
          <rect x="400" y="0" width="180" height="26" rx="4" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" />
          <text x="490" y="17" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="#92400E" text-anchor="middle">VFS / NTFS DRIVERS</text>
          <rect x="600" y="0" width="180" height="26" rx="4" fill="#FEF3C7" stroke="#F59E0B" stroke-width="1" />
          <text x="690" y="17" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="700" fill="#92400E" text-anchor="middle">NETWORK / PACKETS</text>
        </g>
      </g>

      <!-- Layer 2: Drivers & HAL -->
      <g transform="translate(140, 435)">
        <rect width="920" height="75" rx="10" fill="#F8FAFC" stroke="#64748B" stroke-width="2" />
        <rect x="0" y="0" width="14" height="75" rx="4" fill="#64748B" />
        <text x="35" y="32" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="700" fill="#334155">LAYER 2: HARDWARE ABSTRACTION LAYER (HAL) &amp; DEVICE DRIVERS</text>
        <text x="35" y="55" font-family="Inter, system-ui, sans-serif" font-size="12.5" font-weight="500" fill="#64748B">Modular device drivers (.sys / .ko) executing under hardware abstraction APIs for storage controllers, NICs, and bus bridges.</text>
      </g>

      <!-- Layer 1: Physical Hardware -->
      <g transform="translate(140, 525)">
        <rect width="920" height="70" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="2" />
        <rect x="0" y="0" width="14" height="70" rx="4" fill="#FF7A00" />
        <text x="35" y="30" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="700" fill="#F8FAFC">LAYER 1: BARE-METAL PHYSICAL HARDWARE &amp; FIRMWARE</text>
        <text x="35" y="52" font-family="Inter, system-ui, sans-serif" font-size="12.5" font-weight="500" fill="#94A3B8">x86-64 / ARM CPU Privilege Registers, Physical RAM Modules, NVMe Storage, Hardware TPM 2.0, and UEFI Firmware NVRAM.</text>
      </g>
    `;
  } else if (archetype === 'compare') {
    // Side-by-side Linux vs Windows architecture comparison
    graphicSvg = `
      <!-- Left Column: Linux Architecture -->
      <g transform="translate(140, 160)">
        <rect width="445" height="430" rx="12" fill="#F0FDF4" stroke="#16A34A" stroke-width="2.5" />
        <rect x="0" y="0" width="445" height="50" rx="12" fill="#16A34A" />
        <rect x="0" y="30" width="445" height="20" fill="#16A34A" />
        <text x="222" y="32" font-family="Inter, system-ui, sans-serif" font-size="17" font-weight="800" fill="#FFFFFF" text-anchor="middle">LINUX (GNU / LINUX ARCHITECTURE)</text>
        
        <g transform="translate(20, 70)">
          <rect width="405" height="60" rx="8" fill="#DCFCE7" stroke="#22C55E" stroke-width="1.5" />
          <text x="20" y="26" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" fill="#15803D">USER SPACE: SYSTEMD &amp; GNU UTILITIES</text>
          <text x="20" y="46" font-family="Inter, system-ui, sans-serif" font-size="11.5" fill="#166534">systemd (PID 1), bash, coreutils, glibc, OpenSSH daemon</text>
        </g>

        <g transform="translate(20, 145)">
          <rect width="405" height="35" rx="6" fill="#FEF08A" stroke="#EAB308" stroke-width="1.5" />
          <text x="202" y="22" font-family="JetBrains Mono, monospace" font-size="11.5" font-weight="700" fill="#854D0E" text-anchor="middle">SYSCALLS: openat, fork, clone, execve, mmap</text>
        </g>

        <g transform="translate(20, 195)">
          <rect width="405" height="110" rx="8" fill="#DCFCE7" stroke="#22C55E" stroke-width="1.5" />
          <text x="20" y="28" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" fill="#15803D">MONOLITHIC MODULAR KERNEL (RING 0)</text>
          <text x="20" y="50" font-family="Inter, system-ui, sans-serif" font-size="11.5" fill="#166534">- Process &amp; Thread Scheduler (CFS / EEVDF)</text>
          <text x="20" y="70" font-family="Inter, system-ui, sans-serif" font-size="11.5" fill="#166534">- VFS Abstraction (ext4, XFS, btrfs, /proc, /sys)</text>
          <text x="20" y="90" font-family="Inter, system-ui, sans-serif" font-size="11.5" fill="#166534">- Loadable Kernel Modules (LKM, modprobe, lsmod)</text>
        </g>

        <g transform="translate(20, 320)">
          <rect width="405" height="90" rx="8" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.5" />
          <text x="20" y="26" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" fill="#334155">SECURITY BOUNDARIES &amp; TOKENS</text>
          <text x="20" y="48" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#475569">UID 0 (root), POSIX DAC perms (rwxrwxrwx), SUID/SGID,</text>
          <text x="20" y="68" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#475569">POSIX Extended ACLs (getfacl/setfacl), Linux Capabilities.</text>
        </g>
      </g>

      <!-- Right Column: Windows Architecture -->
      <g transform="translate(615, 160)">
        <rect width="445" height="430" rx="12" fill="#EFF6FF" stroke="#2563EB" stroke-width="2.5" />
        <rect x="0" y="0" width="445" height="50" rx="12" fill="#2563EB" />
        <rect x="0" y="30" width="445" height="20" fill="#2563EB" />
        <text x="222" y="32" font-family="Inter, system-ui, sans-serif" font-size="17" font-weight="800" fill="#FFFFFF" text-anchor="middle">WINDOWS NT ARCHITECTURE</text>
        
        <g transform="translate(20, 70)">
          <rect width="405" height="60" rx="8" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5" />
          <text x="20" y="26" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" fill="#1E40AF">USER SPACE: WIN32 SUBSYSTEM &amp; SERVICES</text>
          <text x="20" y="46" font-family="Inter, system-ui, sans-serif" font-size="11.5" fill="#1E3A8A">smss.exe, csrss.exe, wininit.exe, services.exe, lsass.exe</text>
        </g>

        <g transform="translate(20, 145)">
          <rect width="405" height="35" rx="6" fill="#FEF08A" stroke="#EAB308" stroke-width="1.5" />
          <text x="202" y="22" font-family="JetBrains Mono, monospace" font-size="11.5" font-weight="700" fill="#854D0E" text-anchor="middle">WIN32 API -> NTDLL.DLL -> NTOSKRNL TRAP</text>
        </g>

        <g transform="translate(20, 195)">
          <rect width="405" height="110" rx="8" fill="#DBEAFE" stroke="#3B82F6" stroke-width="1.5" />
          <text x="20" y="28" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" fill="#1E40AF">HYBRID NT EXECUTIVE &amp; MICROKERNEL (RING 0)</text>
          <text x="20" y="50" font-family="Inter, system-ui, sans-serif" font-size="11.5" fill="#1E3A8A">- NT Executive: Object Manager, Process Manager</text>
          <text x="20" y="70" font-family="Inter, system-ui, sans-serif" font-size="11.5" fill="#1E3A8A">- Security Reference Monitor (SRM), Virtual Memory</text>
          <text x="20" y="90" font-family="Inter, system-ui, sans-serif" font-size="11.5" fill="#1E3A8A">- Hardware Abstraction Layer (HAL.dll) &amp; Signed Drivers</text>
        </g>

        <g transform="translate(20, 320)">
          <rect width="405" height="90" rx="8" fill="#F1F5F9" stroke="#94A3B8" stroke-width="1.5" />
          <text x="20" y="26" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" fill="#334155">SECURITY BOUNDARIES &amp; TOKENS</text>
          <text x="20" y="48" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#475569">SIDs (S-1-5-21...), User Access Tokens, UAC Integrity</text>
          <text x="20" y="68" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#475569">Levels (Low/Med/High/System), NTFS DACLs &amp; ACEs.</text>
        </g>
      </g>
    `;
  } else if (archetype === 'state') {
    // Process / Service State Machine Lifecycle
    graphicSvg = `
      <g transform="translate(140, 180)">
        <!-- Node 1: NEW / CREATION -->
        <g transform="translate(40, 60)">
          <circle cx="50" cy="50" r="45" fill="#E0F2FE" stroke="#0284C7" stroke-width="2.5" />
          <text x="50" y="46" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="800" fill="#0369A1" text-anchor="middle">NEW</text>
          <text x="50" y="62" font-family="JetBrains Mono, monospace" font-size="9.5" fill="#0284C7" text-anchor="middle">fork/clone</text>
        </g>

        <!-- Arrow 1 -> 2 -->
        <path d="M 140 110 L 220 110" stroke="#0284C7" stroke-width="2.5" marker-end="url(#arrowBlue)" />
        <text x="180" y="100" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="#64748B" text-anchor="middle">admitted</text>

        <!-- Node 2: READY -->
        <g transform="translate(230, 45)">
          <rect width="140" height="130" rx="12" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5" />
          <text x="70" y="40" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="800" fill="#B45309" text-anchor="middle">READY</text>
          <text x="70" y="65" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#78350F" text-anchor="middle">Runnable Queue</text>
          <text x="70" y="85" font-family="JetBrains Mono, monospace" font-size="10" fill="#92400E" text-anchor="middle">Waiting for CPU</text>
          <rect x="20" y="98" width="100" height="20" rx="4" fill="#FDE68A" />
          <text x="70" y="112" font-family="JetBrains Mono, monospace" font-size="9" font-weight="700" fill="#78350F" text-anchor="middle">CFS / EEVDF</text>
        </g>

        <!-- Arrow 2 -> 3 -->
        <path d="M 375 95 L 465 95" stroke="#16A34A" stroke-width="3" />
        <text x="420" y="85" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" fill="#15803D" text-anchor="middle">scheduler dispatch</text>

        <!-- Node 3: RUNNING -->
        <g transform="translate(470, 35)">
          <rect width="170" height="150" rx="14" fill="#DCFCE7" stroke="#16A34A" stroke-width="3" />
          <text x="85" y="45" font-family="Inter, system-ui, sans-serif" font-size="17" font-weight="800" fill="#15803D" text-anchor="middle">RUNNING</text>
          <text x="85" y="70" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="600" fill="#166534" text-anchor="middle">Executing on CPU Core</text>
          <text x="85" y="92" font-family="JetBrains Mono, monospace" font-size="10.5" fill="#14532D" text-anchor="middle">Ring 3 / Ring 0</text>
          <rect x="25" y="108" width="120" height="26" rx="6" fill="#BBF7D0" />
          <text x="85" y="125" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#14532D" text-anchor="middle">Active Instruction</text>
        </g>

        <!-- Arrow 3 -> 2 (Preemption) -->
        <path d="M 470 145 C 430 185, 410 185, 375 145" fill="none" stroke="#D97706" stroke-width="2.5" stroke-dasharray="5,4" />
        <text x="420" y="200" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" fill="#B45309" text-anchor="middle">time quantum expire</text>

        <!-- Arrow 3 -> 4 (Blocked / Waiting) -->
        <path d="M 555 190 L 555 260" stroke="#6366F1" stroke-width="2.5" />
        <text x="575" y="230" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" fill="#4338CA">I/O or Event</text>

        <!-- Node 4: BLOCKED / WAITING -->
        <g transform="translate(470, 265)">
          <rect width="170" height="110" rx="12" fill="#EEF2FF" stroke="#4F46E5" stroke-width="2.5" />
          <text x="85" y="38" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="800" fill="#3730A3" text-anchor="middle">BLOCKED / WAITING</text>
          <text x="85" y="62" font-family="Inter, system-ui, sans-serif" font-size="11.5" fill="#312E81" text-anchor="middle">Waiting for Disk/Network</text>
          <text x="85" y="84" font-family="JetBrains Mono, monospace" font-size="10" fill="#4338CA" text-anchor="middle">Sleep state (S / D)</text>
        </g>

        <!-- Arrow 4 -> 2 -->
        <path d="M 470 320 C 320 360, 290 280, 300 180" fill="none" stroke="#4F46E5" stroke-width="2.5" />
        <text x="320" y="290" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" fill="#3730A3" text-anchor="middle">I/O complete</text>

        <!-- Node 5: TERMINATED / ZOMBIE -->
        <g transform="translate(710, 50)">
          <rect width="170" height="120" rx="12" fill="#FEE2E2" stroke="#DC2626" stroke-width="2.5" />
          <text x="85" y="40" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="800" fill="#991B1B" text-anchor="middle">TERMINATED</text>
          <text x="85" y="65" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#7F1D1D" text-anchor="middle">exit_group / SIGCHLD</text>
          <rect x="25" y="80" width="120" height="24" rx="4" fill="#FECACA" />
          <text x="85" y="96" font-family="JetBrains Mono, monospace" font-size="9.5" font-weight="700" fill="#991B1B" text-anchor="middle">Zombie until wait()</text>
        </g>

        <!-- Arrow 3 -> 5 -->
        <path d="M 645 95 L 705 95" stroke="#DC2626" stroke-width="2.5" />
        <text x="675" y="85" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="700" fill="#991B1B" text-anchor="middle">exit()</text>
      </g>
    `;
  } else if (archetype === 'tree') {
    // Hierarchical Tree Structure (FHS, Process Ancestry, or Registry Hives)
    graphicSvg = `
      <g transform="translate(140, 160)">
        <!-- Root Node -->
        <g transform="translate(410, 20)">
          <rect width="180" height="65" rx="10" fill="#0F172A" stroke="#FF7A00" stroke-width="2.5" />
          <text x="90" y="32" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FF7A00" text-anchor="middle">ROOT ANCHOR</text>
          <text x="90" y="52" font-family="JetBrains Mono, monospace" font-size="11" fill="#F8FAFC" text-anchor="middle">/ (VFS) or System (PID 4)</text>
        </g>

        <!-- Tree Branch Lines -->
        <path d="M 500 85 L 500 130" stroke="#64748B" stroke-width="2.5" />
        <path d="M 120 130 L 880 130" stroke="#64748B" stroke-width="2.5" />
        <path d="M 120 130 L 120 160" stroke="#64748B" stroke-width="2.5" />
        <path d="M 370 130 L 370 160" stroke="#64748B" stroke-width="2.5" />
        <path d="M 630 130 L 630 160" stroke="#64748B" stroke-width="2.5" />
        <path d="M 880 130 L 880 160" stroke="#64748B" stroke-width="2.5" />

        <!-- Child Node 1 -->
        <g transform="translate(30, 165)">
          <rect width="180" height="100" rx="8" fill="#F8FAFC" stroke="#0284C7" stroke-width="2" />
          <text x="90" y="28" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" fill="#0369A1" text-anchor="middle">BINARIES &amp; EXEC</text>
          <text x="90" y="50" font-family="JetBrains Mono, monospace" font-size="10.5" fill="#0284C7" text-anchor="middle">/bin, /sbin, /usr/bin</text>
          <text x="90" y="70" font-family="Inter, system-ui, sans-serif" font-size="10" fill="#64748B" text-anchor="middle">System32 / smss.exe</text>
          <rect x="25" y="78" width="130" height="16" rx="3" fill="#E0F2FE" />
          <text x="90" y="90" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="#0369A1" text-anchor="middle">Protected System Core</text>
        </g>

        <!-- Child Node 2 -->
        <g transform="translate(280, 165)">
          <rect width="180" height="100" rx="8" fill="#FFFBEB" stroke="#D97706" stroke-width="2" />
          <text x="90" y="28" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" fill="#B45309" text-anchor="middle">CONFIGURATIONS</text>
          <text x="90" y="50" font-family="JetBrains Mono, monospace" font-size="10.5" fill="#D97706" text-anchor="middle">/etc / HKLM\SYSTEM</text>
          <text x="90" y="70" font-family="Inter, system-ui, sans-serif" font-size="10" fill="#64748B" text-anchor="middle">Security &amp; Services Config</text>
          <rect x="25" y="78" width="130" height="16" rx="3" fill="#FEF3C7" />
          <text x="90" y="90" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="#B45309" text-anchor="middle">Audit Target (CIS)</text>
        </g>

        <!-- Child Node 3 -->
        <g transform="translate(540, 165)">
          <rect width="180" height="100" rx="8" fill="#F0FDF4" stroke="#16A34A" stroke-width="2" />
          <text x="90" y="28" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" fill="#15803D" text-anchor="middle">USER DATA &amp; PROFILES</text>
          <text x="90" y="50" font-family="JetBrains Mono, monospace" font-size="10.5" fill="#16A34A" text-anchor="middle">/home / C:\Users</text>
          <text x="90" y="70" font-family="Inter, system-ui, sans-serif" font-size="10" fill="#64748B" text-anchor="middle">HKCU Hive / User SIDs</text>
          <rect x="25" y="78" width="130" height="16" rx="3" fill="#DCFCE7" />
          <text x="90" y="90" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="#15803D" text-anchor="middle">User Boundary</text>
        </g>

        <!-- Child Node 4 -->
        <g transform="translate(790, 165)">
          <rect width="180" height="100" rx="8" fill="#FDF2F8" stroke="#DB2777" stroke-width="2" />
          <text x="90" y="28" font-family="Inter, system-ui, sans-serif" font-size="13" font-weight="700" fill="#9D174D" text-anchor="middle">LOGS &amp; TELEMETRY</text>
          <text x="90" y="50" font-family="JetBrains Mono, monospace" font-size="10.5" fill="#DB2777" text-anchor="middle">/var/log / Event Log</text>
          <text x="90" y="70" font-family="Inter, system-ui, sans-serif" font-size="10" fill="#64748B" text-anchor="middle">Security.evtx, journald</text>
          <rect x="25" y="78" width="130" height="16" rx="3" fill="#FCE7F3" />
          <text x="90" y="90" font-family="Inter, system-ui, sans-serif" font-size="9" font-weight="600" fill="#9D174D" text-anchor="middle">SIEM Ingestion Stream</text>
        </g>

        <!-- Sub-branch Box below configurations -->
        <g transform="translate(190, 300)">
          <rect width="620" height="110" rx="10" fill="#F8FAFC" stroke="#94A3B8" stroke-width="2" />
          <text x="30" y="32" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="700" fill="#1E293B">DEFENSIVE SECURITY SIGNIFICANCE &amp; ACL INHERITANCE</text>
          <text x="30" y="58" font-family="Inter, system-ui, sans-serif" font-size="12" fill="#475569">- Directory traversals require execute ('x') bit on POSIX; Bypass Traverse Checking privilege on Windows.</text>
          <text x="30" y="78" font-family="Inter, system-ui, sans-serif" font-size="12" fill="#475569">- Permissions flow downwards through inheritance unless explicitly blocked or replaced with explicit ACEs.</text>
          <text x="30" y="98" font-family="Inter, system-ui, sans-serif" font-size="12" fill="#475569">- System binaries in /bin or System32 must be owned exclusively by root/SYSTEM with non-writable DACLs.</text>
        </g>
      </g>
    `;
  } else {
    // Flow / Pipeline / Matrix (PowerShell, Bash, Kerberos, ACLs)
    graphicSvg = `
      <g transform="translate(140, 170)">
        <!-- Step 1 Card -->
        <g transform="translate(30, 40)">
          <rect width="260" height="200" rx="12" fill="#F8FAFC" stroke="#0284C7" stroke-width="2.5" />
          <rect x="0" y="0" width="260" height="42" rx="12" fill="#0284C7" />
          <rect x="0" y="25" width="260" height="17" fill="#0284C7" />
          <text x="130" y="27" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">STAGE 1: EMISSION</text>
          <text x="25" y="70" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" fill="#0369A1">Raw Object / Request</text>
          <text x="25" y="92" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#475569">Command emits strongly typed objects or credential request.</text>
          <rect x="20" y="115" width="220" height="65" rx="6" fill="#F0F9FF" stroke="#BAE6FD" stroke-width="1" />
          <text x="30" y="136" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="#0369A1">Get-Process |</text>
          <text x="30" y="152" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="#0369A1">AS-REQ (Kerberos) |</text>
          <text x="30" y="168" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="#0369A1">POSIX open(2)</text>
        </g>

        <!-- Arrow 1 -> 2 -->
        <path d="M 305 140 L 345 140" stroke="#FF7A00" stroke-width="3" marker-end="url(#arrowAmber)" />

        <!-- Step 2 Card -->
        <g transform="translate(360, 40)">
          <rect width="260" height="200" rx="12" fill="#FFFBEB" stroke="#D97706" stroke-width="2.5" />
          <rect x="0" y="0" width="260" height="42" rx="12" fill="#D97706" />
          <rect x="0" y="25" width="260" height="17" fill="#D97706" />
          <text x="130" y="27" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">STAGE 2: FILTER &amp; CHECK</text>
          <text x="25" y="70" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" fill="#B45309">Policy Verification</text>
          <text x="25" y="92" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#78350F">SRM DACL evaluation, KDC ticket generation, or pipeline filter.</text>
          <rect x="20" y="115" width="220" height="65" rx="6" fill="#FEF3C7" stroke="#FDE68A" stroke-width="1" />
          <text x="30" y="136" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="#92400E">Where-Object CPU -gt 10</text>
          <text x="30" y="152" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="#92400E">KDC TGT Validation</text>
          <text x="30" y="168" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="#92400E">DACL ACE Mask Comparison</text>
        </g>

        <!-- Arrow 2 -> 3 -->
        <path d="M 635 140 L 675 140" stroke="#FF7A00" stroke-width="3" marker-end="url(#arrowAmber)" />

        <!-- Step 3 Card -->
        <g transform="translate(690, 40)">
          <rect width="260" height="200" rx="12" fill="#F0FDF4" stroke="#16A34A" stroke-width="2.5" />
          <rect x="0" y="0" width="260" height="42" rx="12" fill="#16A34A" />
          <rect x="0" y="25" width="260" height="17" fill="#16A34A" />
          <text x="130" y="27" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">STAGE 3: EXECUTION / LOG</text>
          <text x="25" y="70" font-family="Inter, system-ui, sans-serif" font-size="12" font-weight="700" fill="#15803D">Verified Action &amp; Audit</text>
          <text x="25" y="92" font-family="Inter, system-ui, sans-serif" font-size="11" fill="#166534">Authorized action executes; telemetry logged to SIEM.</text>
          <rect x="20" y="115" width="220" height="65" rx="6" fill="#DCFCE7" stroke="#BBF7D0" stroke-width="1" />
          <text x="30" y="136" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="#15803D">Format-Table / Out-File</text>
          <text x="30" y="152" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="#15803D">Service Ticket (TGS-REP)</text>
          <text x="30" y="168" font-family="JetBrains Mono, monospace" font-size="10" font-weight="600" fill="#15803D">Event ID 4624 / 4688</text>
        </g>

        <!-- Bottom Informational Bar -->
        <g transform="translate(30, 275)">
          <rect width="920" height="120" rx="10" fill="#0F172A" stroke="#1E293B" stroke-width="2" />
          <text x="30" y="34" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="700" fill="#FF7A00">OPERATIONAL &amp; DEFENSIVE INVARIANTS</text>
          <text x="30" y="60" font-family="Inter, system-ui, sans-serif" font-size="12" fill="#E2E8F0">• Idempotent Execution: Commands and policies must be safe to re-run without creating unintended duplicate state.</text>
          <text x="30" y="80" font-family="Inter, system-ui, sans-serif" font-size="12" fill="#E2E8F0">• Complete Telemetry: All administrative escalations (sudo, runas, TokenElevation) generate indelible audit records.</text>
          <text x="30" y="100" font-family="Inter, system-ui, sans-serif" font-size="12" fill="#E2E8F0">• Least Privilege Enforcement: Restrict permissions to the exact scope necessary; eliminate legacy admin shares.</text>
        </g>
      </g>
    `;
  }

  const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 680" width="100%" height="100%">
  <defs>
    <!-- Grid Pattern -->
    <pattern id="gridPattern" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F1F5F9" stroke-width="1.5" />
      <circle cx="30" cy="30" r="1.5" fill="#E2E8F0" />
    </pattern>
    <!-- Drop Shadow Filter -->
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.08" />
    </filter>
  </defs>

  <!-- Clean Crisp White Background -->
  <rect width="1200" height="680" fill="#FFFFFF" />
  <rect width="1200" height="680" fill="url(#gridPattern)" />

  <!-- Outer Architectural Border -->
  <rect x="25" y="25" width="1150" height="630" rx="16" fill="none" stroke="#CBD5E1" stroke-width="2" />
  <rect x="27" y="27" width="1146" height="626" rx="14" fill="none" stroke="#F8FAFC" stroke-width="3" />

  <!-- Corner Tech Accent Ticks -->
  <path d="M 25 50 L 50 25 M 1175 50 L 1150 25 M 25 605 L 50 630 M 1175 605 L 1150 630" stroke="#FF7A00" stroke-width="3" stroke-linecap="round" />

  <!-- Top Header Banner -->
  <g transform="translate(60, 50)">
    <!-- Category & Badge -->
    <rect width="170" height="28" rx="6" fill="#FFF7ED" stroke="#FF7A00" stroke-width="1.5" />
    <text x="85" y="19" font-family="JetBrains Mono, monospace" font-size="11" font-weight="800" fill="#C2410C" text-anchor="middle">${escapeXml(figTag)}</text>
    
    <text x="185" y="19" font-family="JetBrains Mono, monospace" font-size="11" font-weight="700" fill="#64748B">${escapeXml(modTitle)}</text>

    <!-- Main Figure Title -->
    <text x="0" y="58" font-family="Inter, system-ui, sans-serif" font-size="22" font-weight="800" fill="#0F172A">${escapeXml(titleText)}</text>
  </g>

  <!-- Horizontal Divider Line -->
  <line x1="60" y1="130" x2="1140" y2="130" stroke="#E2E8F0" stroke-width="2" />

  <!-- Tailored Diagram Architecture Graphic -->
  ${graphicSvg}

  <!-- Footer Banner: Caption & Institutional Accreditation -->
  <g transform="translate(60, 615)">
    <line x1="0" y1="0" x2="1080" y2="0" stroke="#E2E8F0" stroke-width="1.5" />
    <text x="0" y="24" font-family="Inter, system-ui, sans-serif" font-size="11.5" font-weight="500" fill="#64748B">
      <tspan font-weight="700" fill="#334155">${escapeXml(figTag)}:</tspan> ${escapeXml(diag.caption.replace(/^Figure\s+[^:]+:\s*/i, ''))}
    </text>
    <text x="1080" y="24" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#FF7A00" text-anchor="end">REDKROSS ACADEMY // CYBERSECURITY ARCHITECTURE</text>
  </g>
</svg>
`;

  // Write SVG file
  const svgFilename = `${nameWithoutExt}.svg`;
  const pngFilename = `${nameWithoutExt}.png`;
  fs.writeFileSync(path.join(outputDir, svgFilename), fullSvg, 'utf8');
  // Also write identical SVG content to .png filename so browsers requesting .png load valid image directly!
  fs.writeFileSync(path.join(outputDir, pngFilename), fullSvg, 'utf8');

  // Also check if there's a figure name like C03-M01-F1
  const figMatch = diag.title.match(/C03-M\d\d-F\d/i);
  if (figMatch) {
    const fName = figMatch[0].toUpperCase();
    fs.writeFileSync(path.join(outputDir, `${fName}.svg`), fullSvg, 'utf8');
    fs.writeFileSync(path.join(outputDir, `${fName}.png`), fullSvg, 'utf8');
  }
});

console.log('Successfully generated all 96 vector diagrams in public/assets/courses/cyber-03/');
