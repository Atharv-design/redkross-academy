import fs from 'fs';

let content = fs.readFileSync('api/courses.js', 'utf8');
const netCourseEnd = "created_at: new Date().toISOString()\n      });\n    }";
const netCourseEndCRLF = "created_at: new Date().toISOString()\r\n      });\r\n    }";

const isCRLF = content.includes(netCourseEndCRLF);
const match = isCRLF ? netCourseEndCRLF : netCourseEnd;
const nl = isCRLF ? '\r\n' : '\n';

const course03Block = `${nl}${nl}    if (!activeCourses.some(c => c.id === 'crs_cyber_admin_03' || c.slug === 'linux-and-windows-system-administration')) {
      activeCourses.push({
        id: 'crs_cyber_admin_03',
        slug: 'linux-and-windows-system-administration',
        title: 'Linux and Windows System Administration',
        version: '1.0',
        category: 'Systems Administration & Enterprise Defense',
        difficulty: 'Intermediate',
        price: 0,
        cert_price: 0,
        estimated_duration: '10 Weeks',
        estimated_weeks: 10,
        total_hours: 90,
        rating: 4.97,
        enrolled_count: 1420,
        milestone_cert: 'Certified Systems Administration & Defense Associate (CSADA)',
        short_desc: 'The definitive enterprise systems administration and defensive infrastructure curriculum. Master OS internal architectures, industrial Linux administration, Windows NT executive internals, modern PowerShell 7 object pipelines, Active Directory Kerberos, and CIS system hardening.',
        overview: 'System administration is the frontline operational substrate of cybersecurity. Master CPU privilege rings, virtual memory paging, UEFI Secure Boot, Linux FHS 3.0, POSIX ACLs, defensive Bash automation, Windows NT executive subsystems, registry transaction logs, svchost isolation, SIDs, UAC, NTFS DACLs, PowerShell 7 object pipelines, Windows Event Log XML triage, Active Directory Kerberos authentication, Group Policy LSDOU precedence, and CIS Benchmark system hardening.',
        skills: [
          'Linux Kernel Privilege Rings & Syscall Forensics',
          'POSIX File Permissions, SUID/SGID & Extended ACLs',
          'Defensive Shell Scripting (Strict Mode & Traps)',
          'systemd Service Units & Monotonic Timer Architecture',
          'Windows NT Executive & Core Process Ancestry',
          'Windows Registry Forensics & Persistence Hunting',
          'Security Identifiers (SIDs), UAC & Token Integrity',
          'NTFS DACLs, ACE Evaluation & Share Permissions',
          'PowerShell Object Pipelines, CLM & Script Block Logging',
          'Windows Event Log XML Telemetry (EID 4624/4688/1102)',
          'Active Directory Kerberos Tickets & GPO LSDOU Precedence',
          'CIS Benchmark System Hardening & Lynis Automated Audits'
        ],
        lead_author: {
          name: 'RedKross Systems Engineering Faculty',
          title: 'Enterprise Systems Administration & Infrastructure Defense',
          role: 'Director of Systems Architecture, RedKross Research Foundation',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
        },
        total_tokens_reward: 2000,
        card_variant: 'variant-01',
        created_at: new Date().toISOString()
      });
    }`;

if (content.includes(match)) {
  content = content.replace(match, match + course03Block);
  fs.writeFileSync('api/courses.js', content, 'utf8');
  console.log('Successfully updated api/courses.js with Course 03!');
} else {
  console.error('Target match not found in api/courses.js');
}
