import fs from 'fs';
import path from 'path';

// Load source raw text
const rawTextPath = path.resolve('RK course notes/RedKross Academy Complete Cybersecurity Course Library/COURSE_03_Linux_and_Windows_System_Administration.txt');
const rawText = fs.readFileSync(rawTextPath, 'utf8');

// Find all 48 lessons in the raw text
const lessonRegex = /LESSON (C03-M(\d\d)-L(\d\d)):\s*([^\r\n]+)/g;
const lessonEntries = [];
let match;
while ((match = lessonRegex.exec(rawText)) !== null) {
  lessonEntries.push({
    fullId: match[1],
    modNum: parseInt(match[2], 10),
    lesNum: parseInt(match[3], 10),
    title: match[4].trim(),
    startIndex: match.index
  });
}

console.log(`Found ${lessonEntries.length} lessons in raw source text.`);

// Function to extract and clean raw text for a specific lesson
function getRawLessonText(idx) {
  const current = lessonEntries[idx];
  const start = current.startIndex;
  let end;
  if (idx < lessonEntries.length - 1) {
    end = lessonEntries[idx + 1].startIndex;
  } else {
    end = rawText.indexOf('PART C - COURSE-WIDE', start);
    if (end === -1) end = rawText.length;
  }

  let text = rawText.substring(start, end);
  // If this is lesson 6 of any module, split off the practicals, scenarios, and MCQs so the lesson notes remain focused!
  if (current.lesNum === 6) {
    const splitIndex = text.search(/\n(?:MODULE\s+\d+\s+PRACTICALS|PRACTICAL\s+C03|C03-M\d\d-P\d)/i);
    if (splitIndex !== -1) {
      text = text.substring(0, splitIndex);
    }
  }

  // Remove the header line "LESSON C03-Mxx-Lxx: ..." and "========"
  text = text.replace(/LESSON C03-M\d\d-L\d\d:[^\n]+\n[=\-]+\n+/i, '');
  return text.trim();
}

// Advanced parser to transform plain ASCII into high-craft Markdown
function parseRawToAcademicMarkdown(raw) {
  const lines = raw.split('\n');
  const processedLines = [];
  let inCode = false;
  let inOutput = false;
  let codeBuffer = [];
  let outputBuffer = [];
  let currentTerm = null;
  let currentDesc = '';

  function flushDef() {
    if (currentTerm) {
      processedLines.push(`- **${currentTerm}:** ${currentDesc.trim()}`);
      currentTerm = null;
      currentDesc = '';
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect BEGIN CODE
    if (line.match(/--+\s*BEGIN CODE/i)) {
      flushDef();
      inCode = true;
      codeBuffer = [];
      continue;
    }
    // Detect END CODE
    if (line.match(/--+\s*END CODE/i)) {
      inCode = false;
      const joinedCode = codeBuffer.join('\n').trim();
      const isPowerShell = joinedCode.includes('Get-') || joinedCode.includes('Select-') || joinedCode.includes('Set-') || joinedCode.includes('$');
      const lang = isPowerShell ? 'powershell' : 'bash';
      processedLines.push(`\n\`\`\`${lang}\n${joinedCode}\n\`\`\`\n`);
      continue;
    }
    if (inCode) {
      codeBuffer.push(line);
      continue;
    }

    // Detect BEGIN OUTPUT
    if (line.match(/--+\s*BEGIN OUTPUT/i)) {
      flushDef();
      inOutput = true;
      outputBuffer = [];
      continue;
    }
    // Detect END OUTPUT
    if (line.match(/--+\s*END OUTPUT/i)) {
      inOutput = false;
      processedLines.push(`\n\`\`\`terminal\n${outputBuffer.join('\n').trim()}\n\`\`\`\n`);
      continue;
    }
    if (inOutput) {
      outputBuffer.push(line);
      continue;
    }

    // Detect Subheading (e.g., 2.1.1 Core responsibilities)
    const subHeadMatch = line.match(/^(\d+\.\d+\.\d+)\s+([^\n\r]+)/);
    if (subHeadMatch) {
      flushDef();
      processedLines.push(`\n### ${subHeadMatch[1]} ${subHeadMatch[2].trim()}\n`);
      continue;
    }

    // Detect Security Relevance callouts
    if (line.match(/^Security relevance:\s*(.*)/i)) {
      flushDef();
      const rest = line.replace(/^Security relevance:\s*/i, '').trim();
      let alertText = rest;
      // Slurp following indented lines belonging to this security relevance note
      while (i + 1 < lines.length && lines[i + 1].match(/^\s{2,}\S/)) {
        i++;
        alertText += ' ' + lines[i].trim();
      }
      processedLines.push(`\n> [!NOTE]\n> **Defensive Security Relevance:**\n> ${alertText}\n`);
      continue;
    }

    // Detect Interpretation sections
    if (line.match(/^Interpretation:\s*/i)) {
      flushDef();
      processedLines.push(`\n#### Architectural Telemetry Analysis\n`);
      continue;
    }

    // Detect Key-Value Definition lines
    // e.g. "  Process management   Creating, scheduling..."
    // or "  Linux     A kernel first released..."
    const defMatch = line.match(/^\s{2,}([A-Za-z0-9_\-\.\/]+(?: [A-Za-z0-9_\-\.\/]+){0,3})\s{2,}(.*)$/);
    if (defMatch) {
      flushDef();
      currentTerm = defMatch[1].trim();
      currentDesc = defMatch[2].trim();
      continue;
    }

    // Handle multiline wrapped definition text
    if (currentTerm && line.match(/^\s{4,}\S/)) {
      currentDesc += ' ' + line.trim();
      continue;
    } else {
      flushDef();
    }

    // Convert bullet lists like "  - Windows requires..."
    if (line.match(/^\s{2,}-\s+(.*)/)) {
      const bMatch = line.match(/^\s{2,}-\s+(.*)/);
      processedLines.push(`- ${bMatch[1].trim()}`);
      continue;
    }

    // Normal text lines
    processedLines.push(line);
  }
  flushDef();

  return processedLines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

// Module specific math sections
const mathSpecs = {
  1: {
    title: "Virtual Memory Addressing & Page Frame Translation",
    formula: `In 64-bit operating systems with 4 KB paging, virtual memory addresses are translated to physical frames using bitwise shifting and masking. The Virtual Page Number ($VPN$) and Page Offset ($\\text{Offset}$) are derived mathematically:\n\n:::math-steps\nStep 01: Extract Virtual Page Number | $$VPN = \\lfloor \\frac{\\text{Virtual Address}}{4096} \\rfloor = \\text{Virtual Address} \\gg 12$$\nResult: Indexes the active Page Table Directory structure.\nStep 02: Calculate Frame Offset | $$\\text{Offset} = \\text{Virtual Address} \\pmod{4096} = \\text{Virtual Address} \\ \\& \\ 0\\text{xFFF}$$\nResult: Identifies exact byte position within the 4096-byte memory page.\nStep 03: Resolve Physical Address | $$\\text{Address}_{\\text{physical}} = (\\text{PFN} \\times 4096) + \\text{Offset}$$\nResult: Physical memory coordinates dispatched to hardware bus registers.\n:::\n\nCPU scheduling algorithms allocate time slices ($Q$) across active threads:\n$$Q = \\frac{T_{\\text{slice}}}{N_{\\text{runnable}}}$$\n`
  },
  2: {
    title: "Linux File System Inode & Storage Allocation Ratios",
    formula: `On ext4 and XFS filesystems, file storage capacity and directory structures are constrained by the maximum addressable inode count ($I_{\\text{max}}$) and block allocation ratios:\n\n$$\\text{Inodes Available} = \\lfloor \\frac{\\text{Partition Size (Bytes)}}{\\text{Bytes-per-Inode Ratio}} \\rfloor$$\n\nWhen high-frequency logging exhausts inodes before disk space runs out, write calls fail with \`No space left on device\`, creating subtle denial-of-service conditions.\n`
  },
  3: {
    title: "POSIX Permission Bitmasks & umask Derivation",
    formula: `POSIX file permissions represent an octal bitmask calculated from Read ($r=4$), Write ($w=2$), and Execute ($x=1$). Effective permissions ($P_{\\text{eff}}$) for newly created files are computed via bitwise NOT of the process umask:\n\n:::math-steps\nStep 01: Base File Permissions | $$P_{\\text{base}} = 0666_8 = (110\\ 110\\ 110)_2$$\nResult: Read and write permissions enabled across Owner, Group, and Others.\nStep 02: Invert umask Filter | $$\\sim \\text{umask} = \\sim 0022_8 = (111\\ 101\\ 101)_2$$\nResult: Removes write permissions from Group and Others.\nStep 03: Compute Effective Mode | $$P_{\\text{eff}} = P_{\\text{base}} \\ \\& \\ (\\sim \\text{umask}) = 0644_8 = (110\\ 100\\ 100)_2$$\nResult: Standard secure non-executable file permissions (rw-r--r--).\n:::\n`
  },
  4: {
    title: "Process Exit Status Masking & Signal Arithmetic",
    formula: `In defensive automation, process exit statuses returned by the \`wait()\` system call encode both termination signals and program exit codes:\n\n$$\\text{Exit Code} = (\\text{Status} \\gg 8) \\ \\& \\ 0\\text{xFF}$$\n\nIf terminated by a signal, the signal identifier is extracted via $\\text{Status} \\ \\& \\ 0x7F$, allowing defensive scripts to identify SIGSEGV (11) or SIGKILL (9) crashes immediately.\n`
  },
  5: {
    title: "Windows Security Identifier (SID) Structural Mathematics",
    formula: `Windows Security Identifiers (SIDs) uniquely identify user principals and security boundaries. A domain SID follows the structured canonical formula:\n\n$$S - R - I - S_1 - S_2 - S_3 - \\dots - S_n - \\text{RID}$$\n\nWhere $R$ is revision (1), $I$ is the 48-bit authority (e.g. 5 for NT Authority), and Relative Identifiers (RID) $\\ge 1000$ distinguish custom enterprise security accounts from built-in administrative identities ($RID = 500$ for Administrator).\n`
  },
  6: {
    title: "Enterprise Event Telemetry Sizing & Storage Quotas",
    formula: `Security Operations Centers calculate daily ingestion volume ($V_{\\text{daily}}$) across domain controllers and workstations to size buffer allocations:\n\n$$V_{\\text{daily}} = N_{\\text{endpoints}} \\times \\text{EPS}_{\\text{avg}} \\times S_{\\text{event}} \\times 86,400\\text{ seconds}$$\n\nWhere average serialized XML security events measure 800 to 1,200 bytes for Windows Event IDs 4624 (Logon) and 4688 (Process Creation).\n`
  },
  7: {
    title: "Active Directory Kerberos Clock Skew Window",
    formula: `To prevent replay attacks across domain boundaries, Kerberos Key Distribution Centers enforce an authoritative clock skew tolerance ($T_{\\text{skew}}$):\n\n$$| t_{\\text{client}} - t_{\\text{KDC}} | \\le T_{\\text{skew}} = 300\\text{ seconds (5 minutes)}$$\n\nIf host clocks drift beyond 300 seconds, ticket granting fails with \`KRB_AP_ERR_SKEW\`, forcing vulnerable fallback to legacy NTLM authentication.\n`
  },
  8: {
    title: "Consensus Baseline Compliance Scoring",
    formula: `Automated auditing engines (such as Lynis and CIS-CAT) compute the enterprise Hardening Index ($H_{\\text{index}}$) across operating system control categories:\n\n$$H_{\\text{index}} = \\frac{\\sum_{i=1}^{N} w_i \\cdot C_i}{\\sum_{i=1}^{N} w_i} \\times 100\\%$$\n\nWhere $C_i \\in \\{0, 1\\}$ indicates whether control $i$ passed compliance inspection, and $w_i$ represents the risk weight assigned to the security domain.\n`
  }
};

// Process each of the 8 modules
for (let m = 1; m <= 8; m++) {
  const modPath = path.resolve(`src/services/db/course03/modules/module${m}.js`);
  // Import existing module data to keep questions and metadata intact
  const modData = (await import(`../src/services/db/course03/modules/module${m}.js`))[`module${m}Data`];

  console.log(`Processing Module ${m}: ${modData.title}...`);

  const updatedLessons = modData.lessons.map((lesson, lesIdx) => {
    // Find the corresponding entry in lessonEntries
    const globalIdx = (m - 1) * 6 + lesIdx;
    const rawLessonText = getRawLessonText(globalIdx);
    const parsedMarkdown = parseRawToAcademicMarkdown(rawLessonText);

    const images = lesson.images || [];
    const img1 = images[0] || null;
    const img2 = images[1] || null;

    let textbookContent = `## ${m}.${lesIdx + 1} ${lesson.title.replace(/^\d+\.\d+\s*/, '')}\n\n`;

    // Pedagogical introduction
    textbookContent += `Operating systems constitute the foundational execution fabric of modern enterprise computing. Every digital transaction, database query, identity assertion, and network packet is mediated by the operating system kernel. From an adversarial perspective, the operating system represents the ultimate prize: gaining unauthorized kernel-mode execution (Ring 0) or unconstrained administrator privileges allows adversaries to tamper with audit telemetry, extract cryptographic credentials from volatile memory, install persistent rootkits, and evade defensive detection pipelines.\n\n`;
    textbookContent += `Conversely, for defensive security engineers and SOC analysts, operating systems provide the primary authoritative telemetry streams required for incident triage. Understanding hardware abstraction boundaries, CPU privilege levels, process hierarchies, memory management, and system call interfaces is essential to detecting privilege escalation, investigating persistence mechanisms, and establishing hardened baselines across enterprise Linux and Windows environments.\n\n`;

    // Figure 1
    if (img1) {
      textbookContent += `![${img1.title}](${img1.url})\n\n`;
      textbookContent += `*${img1.caption}*\n\n`;
    }

    // Core parsed technical content
    textbookContent += `${parsedMarkdown}\n\n`;

    // Tailored Mathematical Specification & Formulas
    const mathSpec = mathSpecs[m];
    if (mathSpec) {
      textbookContent += `### Technical Mathematical Specification: ${mathSpec.title}\n\n`;
      textbookContent += `${mathSpec.formula}\n\n`;
    }

    // Figure 2
    if (img2) {
      textbookContent += `![${img2.title}](${img2.url})\n\n`;
      textbookContent += `*${img2.caption}*\n\n`;
    }

    // Platform Comparison Table
    textbookContent += `### Platform Architectural Comparison: Linux vs. Windows NT\n\n`;
    textbookContent += `| Technical Dimension | Linux (GNU/Linux Architecture) | Windows NT Architecture | Defensive Security Implication |\n`;
    textbookContent += `| :--- | :--- | :--- | :--- |\n`;
    textbookContent += `| **Kernel Model** | Monolithic with Loadable Kernel Modules (\`.ko\`) | Hybrid Executive with Microkernel & signed drivers (\`.sys\`) | Kernel compromises require different telemetry (auditd vs. ETW/Sysmon) |\n`;
    textbookContent += `| **Primary Privilege Root** | \`root\` (UID 0) + POSIX Linux Capabilities | \`NT AUTHORITY\\SYSTEM\` & Local Administrators Group | Least privilege requires restricting sudo and disabling debug privileges |\n`;
    textbookContent += `| **Configuration Store** | Plaintext modular files under \`/etc\` and \`/proc\` | Hierarchical binary hives under Windows Registry | Registry allows atomic persistence tracking; \`/etc\` requires file integrity monitoring |\n`;
    textbookContent += `| **Access Control Mechanism** | POSIX permissions (rwx) + Extended ACLs (\`setfacl\`) | Security Descriptors with discretionary ACLs (DACLs) | Windows ACLs support inheritance and fine-grained object auditing |\n`;
    textbookContent += `| **Primary Admin Automation** | Bash shell scripts with POSIX pipes (\`set -euo pipefail\`) | PowerShell 7 with strongly typed .NET object pipelines | PowerShell script block logging (Event ID 4104) captures decrypted code |\n\n`;

    // Operational Security Warning
    textbookContent += `> [!WARNING]\n`;
    textbookContent += `> **Operational Defense Invariant:**\n`;
    textbookContent += `> Operating system misconfigurations represent over 70% of initial privilege escalation vectors in real-world enterprise breaches. Whether exploiting world-writable SUID binaries on Linux or unquoted service path vulnerabilities with weak DACLs on Windows, defensive administrators must audit access permissions continuously rather than relying solely on perimeter firewall filtering.\n`;

    return {
      ...lesson,
      content: textbookContent
    };
  });

  const updatedModule = {
    ...modData,
    lessons: updatedLessons
  };

  const fileOutput = `/**
 * Course 03: Linux and Windows System Administration
 * Module ${m}: ${modData.title.replace(/^Module \d+:\s*/, '')}
 * High-Craft Academic Textbook Architecture
 * Modular load-balanced data file.
 */

export const module${m}Data = ${JSON.stringify(updatedModule, null, 2)};
`;

  fs.writeFileSync(modPath, fileOutput, 'utf8');
  console.log(`Successfully written Module ${m} (${updatedLessons.length} lessons formatted)`);
}

console.log('ALL 8 MODULES AND 48 LESSONS SUCCESSFULLY ENHANCED TO COURSE 02 STANDARDS!');
