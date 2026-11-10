import fs from 'fs';
import path from 'path';

// Import existing modules to preserve all 160 MCQs and metadata
import { module1Data } from '../src/services/db/course03/modules/module1.js';
import { module2Data } from '../src/services/db/course03/modules/module2.js';
import { module3Data } from '../src/services/db/course03/modules/module3.js';
import { module4Data } from '../src/services/db/course03/modules/module4.js';
import { module5Data } from '../src/services/db/course03/modules/module5.js';
import { module6Data } from '../src/services/db/course03/modules/module6.js';
import { module7Data } from '../src/services/db/course03/modules/module7.js';
import { module8Data } from '../src/services/db/course03/modules/module8.js';

const modules = [
  module1Data,
  module2Data,
  module3Data,
  module4Data,
  module5Data,
  module6Data,
  module7Data,
  module8Data
];

console.log('Starting Course 03 textbook re-architecture across 8 modules and 48 lessons...');

// Helper to clean raw ASCII dumps into high-craft textbook Markdown
function cleanAndElaborateLesson(modNum, lessonIdx, lesson) {
  const lesNum = lessonIdx + 1;
  const title = lesson.title.replace(/^\d+\.\d+\s*/, '').trim();
  const images = lesson.images || [];
  const img1 = images[0] || null;
  const img2 = images[1] || null;

  // Extract raw text if present
  let raw = lesson.content || '';
  // Strip out old ASCII header banners
  raw = raw.replace(/LESSON C03-M\d\d-L\d\d:[^\n]+\n[=\-]+\n/g, '');
  raw = raw.replace(/!\[.*?\]\(.*?\)(?:\s*\n+\*.*?\*)?/g, ''); // strip raw image references to re-place them cleanly

  // Parse sections (e.g. 2.1.1, 2.1.2 or 3.1.1)
  const sections = [];
  const secRegex = /(\d+\.\d+\.\d+)\s+([^\n\r]+)([\s\S]*?)(?=\d+\.\d+\.\d+|$)/g;
  let match;
  while ((match = secRegex.exec(raw)) !== null) {
    sections.push({
      num: match[1],
      heading: match[2].trim(),
      body: match[3].trim()
    });
  }

  // Format sections into academic prose, structured lists, and code blocks
  let formattedSections = '';

  if (sections.length > 0) {
    sections.forEach((sec, sIdx) => {
      let bodyText = sec.body;

      // Convert CODE blocks
      bodyText = bodyText.replace(/--+\s*BEGIN CODE\s*([\s\S]*?)--+\s*END CODE/g, (m, code) => {
        const lang = code.includes('Get-') || code.includes('Select-') || code.includes('$') ? 'powershell' : 'bash';
        return `\n\`\`\`${lang}\n${code.trim()}\n\`\`\`\n`;
      });

      // Convert OUTPUT blocks
      bodyText = bodyText.replace(/--+\s*BEGIN OUTPUT\s*([\s\S]*?)--+\s*END OUTPUT/g, (m, output) => {
        return `\n\`\`\`terminal\n${output.trim()}\n\`\`\`\n`;
      });

      // Convert indented lists into bold bullet points
      // e.g. "  Process management   Creating, scheduling..." -> "- **Process Management:** Creating, scheduling..."
      bodyText = bodyText.replace(/^[ \t]{2,}([A-Za-z0-9_\-\.\/]+(?: [A-Za-z0-9_\-\.\/]+){0,3})[ \t]{2,}([^\n]+)/gm, (m, term, desc) => {
        const cleanTerm = term.trim();
        const cleanDesc = desc.trim();
        return `- **${cleanTerm}:** ${cleanDesc}`;
      });

      // Convert standalone Linux / Windows bullet lines
      bodyText = bodyText.replace(/^[ \t]+Linux[ \t]+([^\n]+)/gm, '- **Linux Implementation:** $1');
      bodyText = bodyText.replace(/^[ \t]+Windows[ \t]+([^\n]+)/gm, '- **Windows NT Implementation:** $1');

      // Paragraph chunking: clean excessive blank lines
      bodyText = bodyText.replace(/\n{3,}/g, '\n\n').trim();

      formattedSections += `\n### ${sec.num} ${sec.heading}\n\n${bodyText}\n`;
    });
  } else {
    // If no numbered sections, clean up the text
    let cleanText = raw;
    cleanText = cleanText.replace(/--+\s*BEGIN CODE\s*([\s\S]*?)--+\s*END CODE/g, '\n```bash\n$1\n```\n');
    cleanText = cleanText.replace(/--+\s*BEGIN OUTPUT\s*([\s\S]*?)--+\s*END OUTPUT/g, '\n```terminal\n$1\n```\n');
    formattedSections = `\n${cleanText}\n`;
  }

  // Construct comprehensive textbook chapter matching Course 02
  let content = `## ${modNum}.${lesNum} ${title}\n\n`;

  // 1. Pedagogical Framing & Defensive Rationale
  content += `Operating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\n`;
  content += `Conversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n`;

  // 2. Embed Figure 1
  if (img1) {
    content += `![${img1.title}](${img1.url})\n\n`;
    content += `*${img1.caption}*\n\n`;
  }

  // 3. Core Technical Content Sections
  content += formattedSections;

  // 4. Mathematical Formula / Technical Calculation Block tailored to the module
  if (modNum === 1) {
    content += `\n### 1.${lesNum}.M Architectural Mathematical Specification & Memory Addressing\n\n`;
    content += `In 64-bit architectures with 4 KB paging, virtual memory addresses are translated to physical frames using bitwise shifting and masking. The Virtual Page Number ($VPN$) and Page Offset ($\text{Offset}$) are derived mathematically:\n\n`;
    content += `:::math-steps\n`;
    content += `Step 01: Extract Virtual Page Number | $$VPN = \\lfloor \\frac{\\text{Virtual Address}}{4096} \\rfloor = \\text{Virtual Address} \\gg 12$$\n`;
    content += `Result: Indexes the active Page Table Directory structure.\n`;
    content += `Step 02: Calculate Frame Offset | $$\\text{Offset} = \\text{Virtual Address} \\pmod{4096} = \\text{Virtual Address} \\ \\& \\ 0\\text{xFFF}$$\n`;
    content += `Result: Identifies exact byte position within the 4096-byte memory page.\n`;
    content += `Step 03: Resolve Physical Address | $$\\text{Address}_{\\text{physical}} = (\\text{PFN} \\times 4096) + \\text{Offset}$$\n`;
    content += `Result: Physical memory coordinates dispatched to hardware bus registers.\n`;
    content += `:::\n\n`;
  } else if (modNum === 2) {
    content += `\n### 2.${lesNum}.M Linux File System Hierarchy & Inode Allocation Mathematics\n\n`;
    content += `On ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n`;
    content += `$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\n`;
    content += `When an application exhausts available inodes through high-frequency file creation (e.g. temporary spool directories), write operations fail with \`No space left on device\` even if substantial gigabytes of raw block capacity remain free.\n\n`;
  } else if (modNum === 3) {
    content += `\n### 3.${lesNum}.M POSIX Permission Bitmask & umask Calculation\n\n`;
    content += `POSIX permission modes are calculated using octal bitmasks where Read ($r=4$), Write ($w=2$), and Execute ($x=1$). When creating new files, the operating system calculates effective file permissions ($P_{\\text{eff}}$) by performing a bitwise AND between the base permissions and the bitwise NOT of the process umask:\n\n`;
    content += `:::math-steps\n`;
    content += `Step 01: Determine Base File Mode | $$P_{\\text{base}} = 0666_8 = (110\\ 110\\ 110)_2$$\n`;
    content += `Result: Default read-write permissions across Owner, Group, and Others.\n`;
    content += `Step 02: Invert Process umask Mask | $$\\sim \\text{umask} = \\sim 0022_8 = (111\\ 101\\ 101)_2$$\n`;
    content += `Result: Bitmask permitting writes only for the file owner.\n`;
    content += `Step 03: Compute Effective Permissions | $$P_{\\text{eff}} = P_{\\text{base}} \\ \\& \\ (\\sim \\text{umask}) = 0644_8 = (110\\ 100\\ 100)_2$$\n`;
    content += `Result: Standard secure non-executable file permissions (rw-r--r--).\n`;
    content += `:::\n\n`;
  } else if (modNum === 4) {
    content += `\n### 4.${lesNum}.M Process Exit Code Masking & Status Arithmetic\n\n`;
    content += `In defensive shell automation, process exit statuses returned by the Linux \`wait()\` system call encode both the termination signal and exit code. The return code is masked via the lower 8 bits:\n\n`;
    content += `$$\\text{Exit Code} = (\\text{Status} \\gg 8) \\ \\& \\ 0\\text{xFF}$$\n\n`;
    content += `If a process terminates abnormally due to a hardware signal (e.g. SIGKILL 9 or SIGSEGV 11), the signal number is extracted via $\\text{Status} \\ \\& \\ 0x7F$, enabling defensive wrapper scripts to distinguish graceful operational shutdowns from memory violation crashes.\n\n`;
  } else if (modNum === 5) {
    content += `\n### 5.${lesNum}.M Windows Security Identifier (SID) Structural Encoding\n\n`;
    content += `Windows Security Identifiers (SIDs) uniquely identify user principals, security groups, and computer objects within the security reference monitor. A standard domain SID follows the structured canonical format:\n\n`;
    content += `$$S - R - I - S_1 - S_2 - S_3 - \\dots - S_n - \\text{RID}$$\n\n`;
    content += `Where $R$ is the revision level (always 1), $I$ is the 48-bit identifier authority (e.g., 5 for \`SECURITY_NT_AUTHORITY\`), $S_1 \\dots S_n$ represent the sub-authorities (domain GUID components), and $\\text{RID}$ is the Relative Identifier. By architectural specification, user accounts created by administrators receive $\\text{RID} \\ge 1000$, whereas default administrative accounts possess fixed well-known RIDs (e.g., 500 for built-in Administrator, 501 for Guest, 512 for Domain Admins).\n\n`;
  } else if (modNum === 6) {
    content += `\n### 6.${lesNum}.M Enterprise Event Log Throughput & SIEM Storage Sizing\n\n`;
    content += `Enterprise security teams calculate daily ingestion volume ($V_{\\text{daily}}$) across clustered domain controllers and endpoint workstations to prevent buffer starvation and storage exhaustion:\n\n`;
    content += `$$V_{\\text{daily}} = N_{\\text{endpoints}} \\times \\text{EPS}_{\\text{avg}} \\times S_{\\text{event}} \\times 86,400\\text{ seconds}$$\n\n`;
    content += `Where $\\text{EPS}_{\\text{avg}}$ represents the average Events Per Second per host, and $S_{\\text{event}}$ is the average serialized XML event size (typically 800 to 1,200 bytes for Windows Security Event ID 4624 and 4688).\n\n`;
  } else if (modNum === 7) {
    content += `\n### 7.${lesNum}.M Active Directory Kerberos Time Skew & Ticket Lifecycles\n\n`;
    content += `To prevent replay attacks against the Kerberos authentication subsystem (Course 07), the Active Directory Key Distribution Center (KDC) enforces a strict allowable time skew window ($\\Delta t$):\n\n`;
    content += `$$| t_{\\text{client}} - t_{\\text{KDC}} | \\le T_{\\text{skew}} = 300\\text{ seconds (5 minutes)}$$\n\n`;
    content += `If client workstation clocks drift beyond 300 seconds relative to the PDC Emulator time authority, Kerberos authentication fails with error \`KRB_AP_ERR_SKEW\`, forcing endpoints to fall back to legacy, vulnerable NTLM challenge-response authentication.\n\n`;
  } else if (modNum === 8) {
    content += `\n### 8.${lesNum}.M Consensus Hardening Compliance Index Formula\n\n`;
    content += `Automated auditing engines (such as Lynis and CIS-CAT) compute the enterprise Hardening Index ($H_{\\text{index}}$) across operating system control categories:\n\n`;
    content += `$$H_{\\text{index}} = \\frac{\\sum_{i=1}^{N} w_i \\cdot C_i}{\\sum_{i=1}^{N} w_i} \\times 100\\%$$\n\n`;
    content += `Where $C_i \\in \\{0, 1\\}$ indicates whether control $i$ passed compliance inspection, and $w_i$ represents the risk weight assigned to the security domain (e.g., kernel privilege boundaries carry higher weighting than banner display settings).\n\n`;
  }

  // 5. Embed Figure 2
  if (img2) {
    content += `![${img2.title}](${img2.url})\n\n`;
    content += `*${img2.caption}*\n\n`;
  }

  // 6. Comparative Platform Architectural Table (Linux vs. Windows NT)
  content += `### Platform Architectural Comparison: Linux vs. Windows NT\n\n`;
  content += `| Technical Dimension | Linux (GNU/Linux Architecture) | Windows NT Architecture | Defensive Security Implication |\n`;
  content += `| :--- | :--- | :--- | :--- |\n`;
  content += `| **Kernel Model** | Monolithic with Loadable Kernel Modules (\`.ko\`) | Hybrid Executive with Microkernel & signed drivers (\`.sys\`) | Kernel compromises require different telemetry (auditd vs. ETW/Sysmon) |\n`;
  content += `| **Primary Privilege Root** | \`root\` (UID 0) + POSIX Linux Capabilities | \`NT AUTHORITY\\SYSTEM\` & Local Administrators Group | Least privilege requires restricting sudo and disabling debug privileges |\n`;
  content += `| **Configuration Store** | Plaintext modular files under \`/etc\` and \`/proc\` | Hierarchical binary hives under Windows Registry | Registry allows atomic persistence tracking; \`/etc\` requires file integrity monitoring |\n`;
  content += `| **Access Control Mechanism** | POSIX permissions (rwx) + Extended ACLs (\`setfacl\`) | Security Descriptors with discretionary ACLs (DACLs) | Windows ACLs support inheritance and fine-grained object auditing |\n`;
  content += `| **Primary Admin Automation** | Bash shell scripts with POSIX pipes (\`set -euo pipefail\`) | PowerShell 7 with strongly typed .NET object pipelines | PowerShell script block logging (Event ID 4104) captures decrypted code |\n\n`;

  // 7. Security Alert / Incident Case Study
  content += `> [!WARNING]\n`;
  content += `> **Operational Defense Invariant:**\n`;
  content += `> Operating system misconfigurations represent over 70% of initial privilege escalation vectors in real-world enterprise breaches. Whether exploiting world-writable SUID binaries on Linux or unquoted service path vulnerabilities with weak DACLs on Windows, defensive administrators must audit access permissions continuously rather than relying solely on perimeter firewall filtering.\n`;

  return content;
}

// Iterate over all 8 modules and regenerate module files
modules.forEach((mod, modIdx) => {
  const modNum = modIdx + 1;
  const modFilePath = path.resolve(`src/services/db/course03/modules/module${modNum}.js`);

  console.log(`Re-architecting Module ${modNum}: ${mod.title}...`);

  const updatedLessons = mod.lessons.map((lesson, lesIdx) => {
    const formattedContent = cleanAndElaborateLesson(modNum, lesIdx, lesson);
    return {
      ...lesson,
      content: formattedContent
    };
  });

  const updatedModuleData = {
    ...mod,
    lessons: updatedLessons
  };

  const fileContent = `/**
 * Course 03: Linux and Windows System Administration
 * Module ${modNum}: ${mod.title.replace(/^Module \d+:\s*/, '')}
 * High-Craft Academic Textbook Architecture
 * Modular load-balanced data file.
 */

export const module${modNum}Data = ${JSON.stringify(updatedModuleData, null, 2)};
`;

  fs.writeFileSync(modFilePath, fileContent, 'utf8');
  console.log(`Saved updated Module ${modNum} to ${modFilePath}`);
});

console.log('Successfully re-architected all 8 Course 03 modules with textbook Markdown!');
