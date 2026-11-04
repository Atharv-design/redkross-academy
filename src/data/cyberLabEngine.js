/**
 * cyberLabEngine.js
 * RedKross Academy - Authentic Cyber Lab V3 Engine & 143+ Kali Linux Command Arsenal
 * Reference: https://github.com/godofweak/cyber-lab
 * Command Curriculum: https://www.scribd.com/document/853156058/kali-linux-commands
 * 
 * Provides an authentic state machine, virtual filesystem, and execution engine for:
 * - 7 isolated Docker lab containers on 'lab-isolated' internal network:
 *   1. kali-sandbox (Attacker, 10.10.11.100)
 *   2. debian-target (Target Linux Host, 10.10.11.105)
 *   3. juice-shop (OWASP Juice Shop v15.0, 10.10.11.120)
 *   4. dvwa (Damn Vulnerable Web Application, 10.10.11.110)
 *   5. dvwa-db (MariaDB 10 Database, 10.10.11.111)
 *   6. webgoat (OWASP WebGoat, 10.10.11.130)
 *   7. vampi (Vulnerable REST API, 10.10.11.140)
 * - Complete 143+ Kali Linux command suite covering all 12 operational domains:
 *   1. Basic Linux Commands (ls, cd, pwd, mkdir, rmdir, rm, cp, mv, touch, find, locate, updatedb, cat, less, nano, vi, echo, history, clear, whoami, id, chmod, chown, stat)
 *   2. System & Resources (df, du, mount, umount, tar, zip, unzip, wget, curl, ping, traceroute, arp, ifconfig, ip a, ip route, netstat, ss, nslookup, dig, whois, uptime, free, top, htop, kill, pkill, ps, bg, fg, nohup, alias, unalias, uname, lsb_release, shutdown, reboot)
 *   3. User & Group Management (adduser, userdel, passwd, groupadd, groupdel, usermod, groups, su, sudo, visudo, chage, last, w, who, finger)
 *   4. File Permissions & Ownership (ls -l, chmod 777, chmod 755, chown, umask, getfacl, setfacl)
 *   5. Package Management (apt update, apt upgrade, apt install, apt remove, apt autoremove, apt list, dpkg -i, dpkg -r, dpkg -l)
 *   6. Network Scanning & Security (nmap, nmap -sP, nmap -sV, nmap -A, nmap -O, tcpdump, wireshark, tshark, netcat, nc -zv, aircrack-ng, airmon-ng, airoscript-ng, macchanger)
 *   7. Password Cracking (hydra, john, hashcat, cupp, crunch)
 *   8. Web Penetration Testing (sqlmap, wpscan, gobuster, dirb, sublist3r, nikto, burpsuite)
 *   9. Exploitation & Payloads (metasploit, msfconsole, msfvenom, exploitdb, armitage)
 *   10. Post Exploitation (mimikatz, empire, beef, responder)
 *   11. Forensics & Reverse Engineering (volatility, binwalk, foremost, autopsy, strings, ghidra, gdb)
 *   12. Wireless Attacks (reaver, fern-wifi-cracker, kismet)
 *   13. Miscellaneous & System Calls (ssh, scp, rsync, cron, at, strace, lsof)
 *   14. Lab Management (lab status, lab targets, lab start, lab stop, lab reset, lab backup, lab restore, lab open)
 */

export const CYBER_LAB_CONTAINERS = [
  {
    id: 'kali',
    name: 'kali-sandbox',
    hostname: 'kali',
    role: 'Attacker Machine',
    image: 'personal/kali-attacker:1.0.1',
    ip: '10.10.11.100',
    status: 'Up 24 minutes',
    ports: 'N/A (Attacker Node)',
    network: 'lab-isolated',
    ram: '3 GB',
    cpu: '2 vCPU',
    description: 'Kali Linux rolling attacker node equipped with full security arsenal.'
  },
  {
    id: 'debian',
    name: 'debian-target',
    hostname: 'debian',
    role: 'General Linux Target',
    image: 'personal/debian-target:1.0.1',
    ip: '10.10.11.105',
    status: 'Up 24 minutes',
    ports: '22/tcp (ssh), 80/tcp (http)',
    network: 'lab-isolated',
    ram: '3 GB',
    cpu: '2 vCPU',
    description: 'Hardened & baseline Debian Linux server for system & network pivoting.'
  },
  {
    id: 'juice',
    name: 'juice-shop',
    hostname: 'juice-shop',
    role: 'Web Security Target',
    image: 'bkimminich/juice-shop:latest',
    ip: '10.10.11.120',
    status: 'Up 24 minutes',
    ports: '3000/tcp (http)',
    network: 'lab-isolated',
    url: 'http://juiceshop.lab/#/',
    description: 'OWASP Juice Shop - Modern vulnerable JavaScript/Node.js web application.'
  },
  {
    id: 'dvwa',
    name: 'dvwa',
    hostname: 'dvwa',
    role: 'Classic Vuln App',
    image: 'ghcr.io/digininja/dvwa:latest',
    ip: '10.10.11.110',
    status: 'Up 24 minutes',
    ports: '80/tcp (http)',
    network: 'lab-isolated',
    url: 'http://dvwa.lab/login.php',
    description: 'Damn Vulnerable Web Application (PHP/MySQL) testing SQLi, XSS, and command execution.'
  },
  {
    id: 'dvwa-db',
    name: 'dvwa-db',
    hostname: 'dvwa-db',
    role: 'Database Backend',
    image: 'mariadb:10',
    ip: '10.10.11.111',
    status: 'Up 24 minutes',
    ports: '3306/tcp (mysql)',
    network: 'lab-isolated',
    description: 'Isolated MariaDB 10 persistence engine backing DVWA database schema.'
  },
  {
    id: 'webgoat',
    name: 'webgoat',
    hostname: 'webgoat',
    role: 'Interactive Lessons',
    image: 'webgoat/webgoat:latest',
    ip: '10.10.11.130',
    status: 'Up 24 minutes',
    ports: '8080/tcp (http)',
    network: 'lab-isolated',
    url: 'http://webgoat.lab/WebGoat',
    description: 'OWASP WebGoat Java-based guided vulnerability curriculum.'
  },
  {
    id: 'vampi',
    name: 'vampi',
    hostname: 'vampi',
    role: 'API Security Target',
    image: 'erev0s/vampi:latest',
    ip: '10.10.11.140',
    status: 'Up 24 minutes',
    ports: '5000/tcp (http)',
    network: 'lab-isolated',
    url: 'http://vampi.lab/api',
    description: 'VAmPI - Vulnerable REST API testing OWASP API Top 10 flaws.'
  }
];

export const JUICE_SHOP_PRODUCTS = [
  {
    id: 'p1',
    name: 'Apple Juice (1000ml)',
    price: 1.99,
    currency: '\u00A4',
    image: 'juice',
    description: 'The all-time classic. Freshly squeezed from organic orchard apples.'
  },
  {
    id: 'p2',
    name: 'Apple Pomace',
    price: 0.89,
    currency: '\u00A4',
    image: 'pomace',
    description: 'Finest quality apple pomace rich in fiber, suitable for baking or brewing.'
  },
  {
    id: 'p3',
    name: 'Banana Juice (1000ml)',
    price: 1.99,
    currency: '\u00A4',
    image: 'juice',
    description: 'Delicious creamy nectar packed with natural potassium.'
  },
  {
    id: 'p4',
    name: 'Carrot Juice (1000ml)',
    price: 2.99,
    currency: '\u00A4',
    image: 'juice',
    description: 'Cold-pressed crisp carrot juice enriched with beta-carotene.'
  },
  {
    id: 'p5',
    name: 'OWASP Juice Shop Logo T-Shirt',
    price: 22.49,
    currency: '\u00A4',
    image: 'shirt',
    description: 'Official 100% organic cotton shirt with the radiant Juice Shop icon.'
  }
];

class VirtualFileSystem {
  constructor() {
    this.currentPath = '/home/kali';
    this.currentUser = 'kali';
    this.files = {
      '/home/kali': ['Desktop', 'Downloads', 'recon_notes.txt', 'wordlist.txt'],
      '/home/kali/Desktop': [],
      '/home/kali/Downloads': ['targets.csv'],
      '/tmp': ['bundle.p12', 'session.tmp'],
      '/etc': ['passwd', 'hosts', 'shadow', 'os-release'],
      '/var/log': ['auth.log', 'syslog', 'nginx.log'],
      '/root': ['.bashrc', 'root_flag.txt']
    };
    this.fileContents = {
      '/home/kali/recon_notes.txt': '[RedKross Cyber Range Mission]\nTarget Subnet: 10.10.11.0/24\nDVWA Target: 10.10.11.110 (SQLi, Command Injection)\nJuice Shop: 10.10.11.120 (OWASP Top 10)\nDebian Server: 10.10.11.105 (SSH / SUID pivot)',
      '/home/kali/wordlist.txt': 'admin\npassword\n123456\nroot\ntoor\nkali\nsecret\nhackme',
      '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\nkali:x:1000:1000:kali,,,:/home/kali:/bin/zsh\nwww-data:x:33:33:www-data:/var/www:/usr/sbin/nologin\nmariadb:x:105:109:MariaDB database server,,,:/var/lib/mysql:/bin/false',
      '/etc/hosts': '127.0.0.1 localhost\n127.0.1.1 kali\n10.10.11.100 kali-sandbox\n10.10.11.105 debian-target\n10.10.11.110 dvwa.lab\n10.10.11.111 dvwa-db.lab\n10.10.11.120 juiceshop.lab\n10.10.11.130 webgoat.lab\n10.10.11.140 vampi.lab',
      '/etc/os-release': 'PRETTY_NAME="Kali GNU/Linux Rolling"\nNAME="Kali GNU/Linux"\nVERSION_ID="2024.1"\nID=kali\nID_LIKE=debian\nHOME_URL="https://www.kali.org/"',
      '/root/root_flag.txt': 'RK{K4L1_R00T_S4NDB0X_C3RT1F13D}'
    };
  }

  ls(path = this.currentPath) {
    const target = path === '.' ? this.currentPath : (path.startsWith('/') ? path : `${this.currentPath}/${path}`.replace(/\/+/g, '/'));
    return this.files[target] || Object.keys(this.files).filter(k => k.startsWith(target)).map(k => k.split('/').pop());
  }

  touch(filename) {
    const cleanName = filename.trim();
    if (!cleanName) return false;
    const targetDir = this.currentPath;
    if (!this.files[targetDir]) this.files[targetDir] = [];
    if (!this.files[targetDir].includes(cleanName)) {
      this.files[targetDir].push(cleanName);
    }
    const fullPath = `${targetDir}/${cleanName}`.replace(/\/+/g, '/');
    this.fileContents[fullPath] = `Created on ${new Date().toISOString()}`;
    return true;
  }

  mkdir(dirname) {
    const cleanDir = dirname.trim();
    if (!cleanDir) return false;
    const fullDir = `${this.currentPath}/${cleanDir}`.replace(/\/+/g, '/');
    if (!this.files[this.currentPath]) this.files[this.currentPath] = [];
    if (!this.files[this.currentPath].includes(cleanDir)) {
      this.files[this.currentPath].push(cleanDir);
    }
    this.files[fullDir] = [];
    return true;
  }

  rm(name) {
    const clean = name.trim();
    if (!this.files[this.currentPath]) return false;
    this.files[this.currentPath] = this.files[this.currentPath].filter(f => f !== clean);
    const fullPath = `${this.currentPath}/${clean}`.replace(/\/+/g, '/');
    delete this.fileContents[fullPath];
    delete this.files[fullPath];
    return true;
  }

  cat(filename) {
    const fullPath = filename.startsWith('/') ? filename : `${this.currentPath}/${filename}`.replace(/\/+/g, '/');
    return this.fileContents[fullPath] || null;
  }
}

export const virtualFS = new VirtualFileSystem();

/**
 * Master Execution Engine for all 143+ Kali Linux commands & CyberLab Range
 */
export function executeCyberLabCommand(cmdString, stateCallback = {}) {
  const clean = (cmdString || '').trim();
  const lower = clean.toLowerCase();
  const parts = clean.split(/\s+/);
  const baseCmd = parts[0]?.toLowerCase() || '';

  if (!clean) {
    return { output: '', exitCode: 0, isError: false };
  }

  if (lower === 'help' || lower === 'lab help') {
    return {
      output: `========================================================================
                      CYBER LAB V3 & KALI LINUX COMMAND SUITE
========================================================================
LAB MANAGEMENT:
  lab status          - Show status of all 7 isolated lab containers
  lab targets         - Display target matrix (IPs, ports, vulnerabilities)
  lab start           - Boot all lab containers on 'lab-isolated' (10.10.11.0/24)
  lab stop            - Gracefully suspend the isolated lab suite
  lab reset           - Wipe volatile state and recreate clean sandbox
  lab backup / restore- Manage offline container archives
  lab open <target>   - Open target in Chromium (juice, dvwa, webgoat, vampi)

143+ KALI LINUX ARSENAL:
  Recon & Scan:       nmap, tcpdump, wireshark, tshark, netcat, nikto, dirb, gobuster
  Web Exploitation:   sqlmap, wpscan, burpsuite, sublist3r
  Password & Hash:    hydra, john, hashcat, cupp, crunch
  Exploitation:       msfconsole, msfvenom, exploitdb, armitage
  Post Exploitation:  mimikatz, empire, beef, responder
  Forensics & RE:     volatility, binwalk, foremost, autopsy, strings, ghidra, gdb
  Wireless Tools:     aircrack-ng, airmon-ng, airoscript-ng, macchanger, reaver
  Linux Systems:      ls, cd, pwd, cat, chmod, chown, ps, top, htop, ifconfig, ip a`,
      exitCode: 0,
      isError: false
    };
  }

  if (lower === 'lab status' || lower === 'docker compose ps' || lower === 'docker ps') {
    return {
      output: `NAME            IMAGE                               COMMAND                  SERVICE      CREATED          STATUS          PORTS
kali-sandbox    personal/kali-attacker:1.0.1        "/bin/bash"              kali         24 minutes ago   Up 24 minutes   
debian-target   personal/debian-target:1.0.1        "/bin/bash"              debian       24 minutes ago   Up 24 minutes   22/tcp, 80/tcp
dvwa            ghcr.io/digininja/dvwa:latest       "/main.sh"               dvwa         24 minutes ago   Up 24 minutes   80/tcp
dvwa-db         mariadb:10                          "docker-entrypoint.s..." dvwa-db      24 minutes ago   Up 24 minutes   3306/tcp
juice-shop      bkimminich/juice-shop:latest        "/bin/sh -c 'npm sta..." juice-shop   24 minutes ago   Up 24 minutes   3000/tcp
webgoat         webgoat/webgoat:latest              "/bin/sh -c 'java -j..." webgoat      24 minutes ago   Up 24 minutes   8080/tcp
vampi           erev0s/vampi:latest                 "/entrypoint.sh"         vampi        24 minutes ago   Up 24 minutes   5000/tcp

[+] Network: lab-isolated (Internal Bridge, Subnet: 10.10.11.0/24)
[+] Mode: Offline-First Isolated Cyber Range
[+] All 7 containers are HEALTHY and communicating.`,
      exitCode: 0,
      isError: false
    };
  }

  if (lower === 'lab targets') {
    return {
      output: `========================================================================
                     CYBER LAB V3 TARGET MATRIX
========================================================================
ALIAS      CONTAINER        IP ADDRESS     PORTS       PRIMARY VULNERABILITY
------------------------------------------------------------------------
kali       kali-sandbox     10.10.11.100   N/A         Attacker Operating System
debian     debian-target    10.10.11.105   22, 80      Linux Misconfigurations, SUID
juice      juice-shop       10.10.11.120   3000        OWASP Top 10, JWT, NoSQLi, XSS
dvwa       dvwa             10.10.11.110   80          SQLi, Command Injection, CSRF
dvwa-db    dvwa-db          10.10.11.111   3306        Database Exfiltration Target
webgoat    webgoat          10.10.11.130   8080        Java Insecure Deserialization
vampi      vampi            10.10.11.140   5000        BOLA, Broken Object Level Auth
========================================================================
Tip: Use 'lab open <alias>' or browse to the target in the Chromium browser window.`,
      exitCode: 0,
      isError: false
    };
  }

  if (lower.startsWith('lab open ')) {
    const targetAlias = parts[2]?.toLowerCase();
    if (stateCallback.onOpenTarget) {
      stateCallback.onOpenTarget(targetAlias);
    }
    return {
      output: `[+] Launching target interface: [${targetAlias || 'target'}]
[+] Binding local display to active viewport...
[+] Connected to http://${targetAlias || 'target'}.lab/`,
      exitCode: 0,
      isError: false,
      targetOpened: targetAlias
    };
  }

  if (lower === 'lab start') {
    return {
      output: `[+] Starting Cyber Lab V3 on network [lab-isolated]...
[+] Container kali-sandbox started.
[+] Container debian-target started.
[+] Container dvwa-db started.
[+] Container dvwa started.
[+] Container juice-shop started.
[+] Container webgoat started.
[+] Container vampi started.
[+] Lab environment is ONLINE. Type 'lab status' to inspect.`,
      exitCode: 0,
      isError: false
    };
  }

  if (lower === 'lab stop') {
    return {
      output: `[+] Stopping Cyber Lab V3 containers...
[+] Gracefully terminating target nodes...
[+] All 7 lab containers safely suspended. Data volumes preserved in dvwa-data.`,
      exitCode: 0,
      isError: false
    };
  }

  if (lower === 'lab reset') {
    return {
      output: `[!] Performing Cyber Lab Sandbox Reset...
[+] Flushing volatile containers...
[+] Purging ephemeral container modifications...
[+] Restoring initial vulnerable seeds (DVWA database, Juice Shop inventory)...
[+] Reset complete. Lab sandbox restored to pristine state.`,
      exitCode: 0,
      isError: false
    };
  }

  if (lower === 'lab backup' || lower === 'lab restore') {
    return {
      output: `[+] Cyber Lab V3 Offline Container Images:
[+] kali-sandbox:1.0.1 (1.82 GB) - VERIFIED
[+] debian-target:1.0.1 (650 MB) - VERIFIED
[+] dvwa:latest (720 MB) - VERIFIED
[+] juice-shop:latest (480 MB) - VERIFIED
[+] webgoat:latest (920 MB) - VERIFIED
[+] vampi:latest (310 MB) - VERIFIED
[+] Offline cache integrity check: 100% OK.`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'pwd') {
    return { output: virtualFS.currentPath, exitCode: 0, isError: false };
  }

  if (baseCmd === 'cd') {
    const target = parts[1] || '~';
    if (target === '~' || target === '') {
      virtualFS.currentPath = '/home/kali';
    } else if (target === '..') {
      const segs = virtualFS.currentPath.split('/').filter(Boolean);
      segs.pop();
      virtualFS.currentPath = segs.length === 0 ? '/' : `/${segs.join('/')}`;
    } else if (target.startsWith('/')) {
      virtualFS.currentPath = target;
    } else {
      virtualFS.currentPath = `${virtualFS.currentPath}/${target}`.replace(/\/+/g, '/');
    }
    return { output: '', exitCode: 0, isError: false };
  }

  if (baseCmd === 'ls') {
    const files = virtualFS.ls();
    const isLong = lower.includes('-l');
    if (isLong) {
      const lines = files.map((f, i) => {
        const isDir = f === 'Desktop' || f === 'Downloads' || !f.includes('.');
        const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
        const size = isDir ? 4096 : (1024 + i * 256);
        return `${perms}  1 kali kali  ${size} Nov  3 01:00 ${f}`;
      });
      return { output: `total ${files.length * 4}\n${lines.join('\n')}`, exitCode: 0, isError: false };
    }
    return { output: files.join('   '), exitCode: 0, isError: false };
  }

  if (baseCmd === 'touch') {
    const name = parts[1] || 'new_file.txt';
    virtualFS.touch(name);
    if (stateCallback.onFileCreated) stateCallback.onFileCreated(name);
    return { output: '', exitCode: 0, isError: false };
  }

  if (baseCmd === 'mkdir') {
    const name = parts[1] || 'new_folder';
    virtualFS.mkdir(name);
    if (stateCallback.onFolderCreated) stateCallback.onFolderCreated(name);
    return { output: '', exitCode: 0, isError: false };
  }

  if (baseCmd === 'rm' || baseCmd === 'rmdir') {
    const name = parts.slice(1).find(p => !p.startsWith('-')) || '';
    virtualFS.rm(name);
    if (stateCallback.onItemDeleted) stateCallback.onItemDeleted(name);
    return { output: '', exitCode: 0, isError: false };
  }

  if (baseCmd === 'cat') {
    const file = parts[1] || '';
    const content = virtualFS.cat(file);
    if (content !== null) {
      return { output: content, exitCode: 0, isError: false };
    }
    return { output: `cat: ${file}: No such file or directory`, exitCode: 1, isError: true };
  }

  if (baseCmd === 'cp' || baseCmd === 'mv') {
    return { output: `[+] Completed ${baseCmd} operation for ${parts[1] || 'source'} -> ${parts[2] || 'dest'}`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'find') {
    return { output: `/home/kali\n/home/kali/recon_notes.txt\n/home/kali/wordlist.txt\n/home/kali/Desktop\n/home/kali/Downloads`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'locate') {
    const q = parts[1] || 'kali';
    return { output: `/usr/bin/${q}\n/usr/share/${q}\n/etc/${q}\n/usr/share/man/man1/${q}.1.gz`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'updatedb') {
    return { output: `[+] Updated locate database (/var/lib/mlocate/mlocate.db). 182,491 indices recorded.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'whoami') {
    return { output: virtualFS.currentUser, exitCode: 0, isError: false };
  }

  if (baseCmd === 'id') {
    return { output: `uid=1000(kali) gid=1000(kali) groups=1000(kali),24(cdrom),25(floppy),27(sudo),29(audio),30(dip),44(video),46(plugdev),100(users),106(netdev),118(bluetooth)`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'stat') {
    const f = parts[1] || 'recon_notes.txt';
    return {
      output: `  File: ${f}
  Size: 4096       Blocks: 8          IO Block: 4096   regular file
Device: 801h/2049d Inode: 1441824    Links: 1
Access: (0644/-rw-r--r--)  Uid: ( 1000/    kali)   Gid: ( 1000/    kali)
Access: 2026-11-03 01:00:00.000000000 +0000
Modify: 2026-11-03 01:00:00.000000000 +0000
Change: 2026-11-03 01:00:00.000000000 +0000`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'chmod' || baseCmd === 'chown') {
    return { output: `[+] Permissions updated for ${parts[2] || parts[1] || 'target'}.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'echo') {
    const text = parts.slice(1).join(' ').replace(/['"]/g, '');
    return { output: text, exitCode: 0, isError: false };
  }

  if (baseCmd === 'history') {
    return { output: `    1  lab status\n    2  lab targets\n    3  nmap dvwa\n    4  curl http://juice-shop\n    5  whoami\n    6  uname -a`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'nano' || baseCmd === 'vi' || baseCmd === 'less') {
    return { output: `[GNU nano 7.2] - Opened ${parts[1] || 'buffer'}. Use Ctrl+X to exit.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'df') {
    return {
      output: `Filesystem     1K-blocks     Used Available Use% Mounted on
udev             1945600        0   1945600   0% /dev
tmpfs             394240     1420    392820   1% /run
/dev/sda1       24682496 15124000   8284496  65% /
tmpfs            1971200        0   1971200   0% /dev/shm`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'du') {
    return { output: `4.0K\t./Desktop\n8.0K\t./Downloads\n16K\t./\n16K\ttotal`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'mount' || baseCmd === 'umount') {
    return { output: `/dev/sda1 on / type ext4 (rw,relatime,errors=remount-ro)\nlab-isolated on /docker/net type bridge (rw,noexec,nosuid)`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'tar' || baseCmd === 'zip' || baseCmd === 'unzip') {
    return { output: `[+] Archive operation completed successfully.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'uname') {
    return { output: `Linux kali-sandbox 6.19.14-kali-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.19.14-1kali1 x86_64 GNU/Linux`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'lsb_release') {
    return { output: `Distributor ID:\tKali\nDescription:\tKali GNU/Linux Rolling\nRelease:\t2024.1\nCodename:\tkali-rolling`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'uptime') {
    return { output: ` 01:00:15 up 24 min,  1 user,  load average: 0.12, 0.18, 0.14`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'free') {
    return {
      output: `               total        used        free      shared  buff/cache   available
Mem:            3.8Gi       887Mi       1.8Gi        12Mi       1.1Gi       2.7Gi
Swap:           1.0Gi          0B       1.0Gi`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'top' || baseCmd === 'htop') {
    return {
      output: `top - 01:00:20 up 24 min,  1 user,  load average: 0.10, 0.15, 0.14
Tasks: 182 total,   1 running, 181 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.1 us,  0.8 sy,  0.0 ni, 97.0 id,  0.1 wa,  0.0 hi,  0.0 si
MiB Mem :   3942.4 total,   1854.2 free,    887.3 used,   1200.9 buff/cache
MiB Swap:   1024.0 total,   1024.0 free,      0.0 used.   2850.5 avail Mem 

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
  724 kali      20   0  385204  94820  42100 S   1.8   2.4   0:14.22 qterminal
  512 root      20   0  210400  48100  28400 S   0.9   1.2   0:08.40 kasmvnc
  104 root      20   0   48200  12400   8200 S   0.1   0.3   0:01.12 dockerd`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'ps') {
    return {
      output: `UID          PID    PPID  C STIME TTY          TIME CMD
root           1       0  0 00:36 ?        00:00:01 /sbin/init
root         512       1  0 00:36 ?        00:00:08 /usr/bin/kasmvnc :1
kali         720     512  0 00:36 ?        00:00:03 xfce4-session
kali         724     720  0 00:36 pts/0    00:00:14 /bin/zsh
kali         890     724  0 01:00 pts/0    00:00:00 ps -ef`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'kill' || baseCmd === 'pkill') {
    return { output: `[+] Signal delivered to process ${parts[1] || 'PID'}.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'ifconfig') {
    return {
      output: `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.10.11.100  netmask 255.255.255.0  broadcast 10.10.11.255
        ether 02:42:0a:0a:0b:64  txqueuelen 0  (Ethernet)
        RX packets 4892  bytes 1294821 (1.2 MB)
        TX packets 3824  bytes 842194 (822.4 KB)

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        loop  txqueuelen 1000  (Local Loopback)`,
      exitCode: 0,
      isError: false
    };
  }

  if (clean === 'ip a' || clean === 'ip addr') {
    return {
      output: `1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    inet 10.10.11.100/24 brd 10.10.11.255 scope global eth0
       valid_lft forever preferred_lft forever`,
      exitCode: 0,
      isError: false
    };
  }

  if (clean === 'ip route') {
    return {
      output: `default via 10.10.11.1 dev eth0 
10.10.11.0/24 dev eth0 proto kernel scope link src 10.10.11.100`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'netstat' || baseCmd === 'ss') {
    return {
      output: `State   Recv-Q  Send-Q   Local Address:Port   Peer Address:Port  Process
LISTEN  0       128      0.0.0.0:22           0.0.0.0:*          sshd
LISTEN  0       4096     0.0.0.0:5901         0.0.0.0:*          kasmvnc
LISTEN  0       511      10.10.11.110:80      0.0.0.0:*          apache2 (dvwa)
LISTEN  0       511      10.10.11.120:3000    0.0.0.0:*          node (juice)`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'arp') {
    return {
      output: `Address                  HWtype  HWaddress           Flags Mask            Iface
10.10.11.105             ether   02:42:0a:0a:0b:69   C                     eth0
10.10.11.110             ether   02:42:0a:0a:0b:6e   C                     eth0
10.10.11.120             ether   02:42:0a:0a:0b:78   C                     eth0`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'traceroute') {
    return {
      output: `traceroute to ${parts[1] || '10.10.11.110'} (10.10.11.110), 30 hops max, 60 byte packets
 1  10.10.11.1 (lab-isolated gateway)  0.284 ms  0.210 ms  0.198 ms
 2  10.10.11.110 (dvwa.lab)  0.412 ms  0.390 ms  0.365 ms`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'nslookup' || baseCmd === 'dig') {
    return {
      output: `; <<>> DiG 9.19.17-1-Debian <<>> ${parts[1] || 'dvwa.lab'}
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 48912
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; ANSWER SECTION:
${parts[1] || 'dvwa.lab'}.\t\t300\tIN\tA\t10.10.11.110

;; Query time: 0 msec
;; SERVER: 127.0.0.11#53(127.0.0.11) (UDP)`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'whois') {
    return {
      output: `Domain Name: REDKROSS.INTERNAL
Registry Domain ID: RK_94821_LAB
Registrar: RedKross Research Foundation Security Registry
Updated Date: 2026-11-01T00:00:00Z
Creation Date: 2024-01-01T00:00:00Z
Registrant Organization: RedKross Cyber Range Labs`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'ping') {
    const host = parts[parts.length - 1] || '10.10.11.110';
    return {
      output: `PING ${host} (${host}) 56(84) bytes of data.
64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.482 ms
64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.410 ms
64 bytes from ${host}: icmp_seq=3 ttl=64 time=0.395 ms

--- ${host} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2048ms
rtt min/avg/max/mdev = 0.395/0.429/0.482/0.037 ms`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'apt' || baseCmd === 'apt-get') {
    if (lower.includes('update')) {
      return {
        output: `Hit:1 http://http.kali.org/kali kali-rolling InRelease
Get:2 http://http.kali.org/kali kali-rolling/main amd64 Packages [19.2 MB]
Fetched 19.2 MB in 2s (9,600 kB/s)
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
All packages are up to date.`,
        exitCode: 0,
        isError: false
      };
    }
    if (lower.includes('upgrade') || lower.includes('install')) {
      return { output: `Reading package lists... Done\nBuilding dependency tree... Done\n0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.`, exitCode: 0, isError: false };
    }
    if (lower.includes('list')) {
      return { output: `nmap/kali-rolling,now 7.94-1 amd64 [installed]\nsqlmap/kali-rolling,now 1.8.2-1 all [installed]\nwireshark/kali-rolling,now 4.2.2-1 amd64 [installed]`, exitCode: 0, isError: false };
    }
  }

  if (baseCmd === 'dpkg') {
    return { output: `ii  kali-tools-top10   2024.1   amd64   Kali Linux Top 10 Security Tools\nii  metasploit-framework 6.3.55  amd64   Penetration testing platform`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'nmap') {
    if (lower.includes('juice') || lower.includes('10.10.11.120')) {
      return {
        output: `Starting Nmap 7.94 ( https://nmap.org ) at 2026-11-03 01:00 UTC
Nmap scan report for juice-shop (10.10.11.120)
Host is up (0.00042s latency).
Not shown: 999 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
3000/tcp open  http    Node.js Express framework (OWASP Juice Shop v15.0.0)
| http-title: OWASP Juice Shop
|_Requested resource was /#/
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 1.42 seconds`,
        exitCode: 0,
        isError: false
      };
    }

    if (lower.includes('debian') || lower.includes('10.10.11.105')) {
      return {
        output: `Starting Nmap 7.94 ( https://nmap.org ) at 2026-11-03 01:00 UTC
Nmap scan report for debian-target (10.10.11.105)
Host is up (0.00035s latency).
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 9.2p1 Debian 2+deb12u2 (protocol 2.0)
80/tcp open  http    Apache httpd 2.4.57 ((Debian))
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Nmap done: 1 IP address (1 host up) scanned in 0.98 seconds`,
        exitCode: 0,
        isError: false
      };
    }

    return {
      output: `Starting Nmap 7.94 ( https://nmap.org ) at 2026-11-03 01:00 UTC
Nmap scan report for dvwa (10.10.11.110)
Host is up (0.00038s latency).
PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.54 ((Debian))
|_http-server-header: Apache/2.4.54 (Debian)
|_http-title: Login :: Damn Vulnerable Web Application (DVWA) v1.10 *Development*
MAC Address: 02:42:0A:0A:0B:6E (Docker Virtual Interface)

Nmap done: 1 IP address (1 host up) scanned in 1.12 seconds`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'tcpdump') {
    return {
      output: `tcpdump: verbose output suppressed, use -v[v]... for full protocol decode
listening on any, link-type LINUX_SLL (Linux cooked v1), snapshot length 262144 bytes
01:00:22.104291 IP 10.10.11.100.48912 > 10.10.11.110.80: Flags [S], seq 3891248, win 64240, options [mss 1460,sackOK,TS val 18294 ecr 0], length 0
01:00:22.104672 IP 10.10.11.110.80 > 10.10.11.100.48912: Flags [S.], seq 8294812, ack 3891249, win 65160, options [mss 1460,sackOK,TS val 29184 ecr 18294], length 0
01:00:22.104710 IP 10.10.11.100.48912 > 10.10.11.110.80: Flags [.], ack 1, win 64240, length 0
3 packets captured, 3 packets received by filter, 0 packets dropped by kernel`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'wireshark' || baseCmd === 'tshark') {
    return { output: `[+] TShark/Wireshark capturing on 'eth0' (10.10.11.100/24). Captured 48 frames. Protocol: HTTP/TCP.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'netcat' || baseCmd === 'nc') {
    return { output: `Connection to 10.10.11.110 80 port [tcp/http] succeeded!`, exitCode: 0, isError: false };
  }

  if (baseCmd.startsWith('aircrack') || baseCmd.startsWith('airmon') || baseCmd.startsWith('macchanger')) {
    return { output: `[+] Wireless interface configured. Monitor mode: active. Target BSSID: 00:11:22:33:44:55.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'curl') {
    if (lower.includes('juice') || lower.includes('3000')) {
      return {
        output: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
X-Content-Type-Options: nosniff
Feature-Policy: payment 'self'
Content-Type: text/html; charset=utf-8
Content-Length: 1842
Date: Tue, 03 Nov 2026 01:00:00 GMT
Connection: keep-alive

<!-- OWASP Juice Shop v15.0.0 Online Target -->
<!DOCTYPE html><html lang="en"><head><title>OWASP Juice Shop</title></head><body>...</body></html>`,
        exitCode: 0,
        isError: false
      };
    }

    return {
      output: `HTTP/1.1 200 OK
Date: Tue, 03 Nov 2026 01:00:00 GMT
Server: Apache/2.4.54 (Debian)
X-Powered-By: PHP/7.4.33
Set-Cookie: PHPSESSID=rk_session_84920; path=/
Content-Type: text/html; charset=UTF-8

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN">
<html><head><title>Login :: Damn Vulnerable Web Application (DVWA)</title></head><body>...</body></html>`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'sqlmap') {
    return {
      output: `[+] testing connection to target URL: http://10.10.11.110/vulnerabilities/sqli/?id=1&Submit=Submit
[+] confirming parameter 'id' is vulnerable to SQL injection...
---
Parameter: id (GET)
    Type: boolean-based blind
    Title: AND boolean-based blind - WHERE or HAVING clause
    Payload: id=1' AND 8492=8492 AND 'rk'='rk

    Type: UNION query
    Title: Generic UNION query (NULL) - 2 columns
    Payload: id=-1' UNION ALL SELECT NULL,CONCAT(user,0x3a,password) FROM dvwa.users-- -
---
[+] Back-end DBMS: MySQL/MariaDB >= 10.0
[+] Database: dvwa
[+] Extracted credentials: admin:5f4dcc3b5aa765d61d8327deb882cf99 (MD5: 'password')`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'gobuster' || baseCmd === 'dirb' || baseCmd === 'ffuf') {
    return {
      output: `===============================================================
Gobuster v3.6 - Directory & File Discovery
===============================================================
[+] Url:                     http://10.10.11.110/
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
===============================================================
/login.php            (Status: 200) [Size: 1540]
/vulnerabilities      (Status: 302) [Size: 0] [--> login.php]
/robots.txt           (Status: 200) [Size: 26]
/config               (Status: 403) [Size: 278]
/docs                 (Status: 200) [Size: 1840]
/phpinfo.php          (Status: 200) [Size: 94820]
===============================================================`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'nikto') {
    return {
      output: `- Nikto v2.5.0
+ Target IP:          10.10.11.110
+ Target Hostname:    dvwa.lab
+ Target Port:        80
+ Server: Apache/2.4.54 (Debian)
+ /login.php: Cookie PHPSESSID created without the secure flag.
+ /phpinfo.php: Output from the phpinfo() function was found.
+ /config/: Directory indexing found.
+ 7842 requests: 0 error(s) and 4 item(s) reported on remote host`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'hydra') {
    return {
      output: `Hydra v9.5 (c) 2023 by van Hauser/THC - Please do not use in military/secret service organizations, or for illegal purposes.
[DATA] max 16 tasks per 1 server, overall 16 tasks, 8 login tries (l:1/p:8), ~1 try per task
[80][http-post-form] host: 10.10.11.110   login: admin   password: password   [SUCCESS]
1 of 1 target completed, 1 valid password found`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'john' || baseCmd === 'hashcat') {
    return {
      output: `Using default wordlist: /usr/share/john/password.lst
Loaded 1 password hash (raw-md5, 84920 hashes)
password         (admin)     
1g 0:00:00:00 DONE (2026-11-03 01:00) 50.00g/s 409600p/s 409600c/s 409600C/s 123456..password
Use the "--show" option to display all of the cracked passwords reliably`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'metasploit' || baseCmd === 'msfconsole') {
    return {
      output: `
                 _---------.
             .' #######   ;.'
  .-"-.     /  #####       /
 /     \\   /  ##     #    /
|       | /  #     #     /
 \\     / /  #     #     /
  '-.-' /  #     #     /
       /  ##    #     /
      /  #####       /
     /  ########   .'
    '---------'
       =[ metasploit v6.3.55-dev                          ]
+ -- --=[ 2394 exploits - 1234 auxiliary - 418 post       ]
+ -- --=[ 964 payloads - 45 encoders - 11 nops            ]
msf6 > `,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'msfvenom') {
    return {
      output: `[-] No platform was selected, choosing Msf::Module::Platform::Linux from the payload
[-] No arch selected, selecting arch: x64 from the payload
No encoder specified, outputting raw payload
Payload size: 119 bytes
Final size of elf file: 239 bytes
[+] Saved payload to shell.elf`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'searchsploit' || baseCmd === 'exploitdb') {
    return {
      output: `--------------------------------------------------------------------------------------- ---------------------------------
 Exploit Title                                                                         |  Path
--------------------------------------------------------------------------------------- ---------------------------------
 Apache 2.4.49/2.4.50 - Path Traversal & Remote Code Execution (RCE)                   | multiple/webapps/50383.sh
 Apache HTTP Server 2.4.53 - Denial of Service (DoS)                                  | linux/dos/50923.py
--------------------------------------------------------------------------------------- ---------------------------------`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'volatility' || baseCmd === 'binwalk' || baseCmd === 'foremost' || baseCmd === 'strings') {
    return { output: `[+] Forensic extraction completed. 14 string artifacts and firmware headers mapped cleanly.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'ssh' || baseCmd === 'scp' || baseCmd === 'rsync') {
    return { output: `[+] Secure tunnel established with target node: 10.10.11.105 (Debian Target).`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'lsof' || baseCmd === 'strace') {
    return { output: `COMMAND     PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME\napache2     512 root    4u  IPv4  24912      0t0  TCP 10.10.11.110:80 (LISTEN)\nkasmvnc     724 kali    6u  IPv4  84920      0t0  TCP *:5901 (LISTEN)`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'neofetch' || baseCmd === 'fastfetch') {
    return {
      output: `...............-*-............      linuxiac@kali
............:***:...............     -------------
...........+****-...............     OS: Kali GNU/Linux Rolling x86_64
..........+*****-...............     Host: KVM/QEMU Standard PC (Q35 + ICH9, 2009) (pc-q35-11.0)
.........-******:...............     Kernel: Linux 6.19.14-kali-amd64
........:*******+...............     Uptime: 24 mins
.......-*********:..............     Packages: 2879 (dpkg)
......:***********:.............     Shell: zsh 5.9
.....-*************:............     Display (QEMU Monitor): 1680x1050 in 15", 60 Hz
....:***************:...........     DE: Xfce4 4.20
...-*****************:..........     WM: Xfwm4 (X11)
..:*******************:.........     WM Theme: Kali-Dark
.-*********************:........     Theme: Fusion [Qt], Kali-Dark [GTK2/3/4]
:***********************:.......     Icons: Flat-Remix-Blue-Dark [Qt], Flat-Remix-Blue-Dark [GTK2/3/4]
.:::::::::::::::::::::::........     Font: Cantarell (11pt) [GTK2/3/4]
................................     Cursor: Adwaita (24px)
                                     Terminal: qterminal 2.4.0
                                     Terminal Font: FiraCode (10pt)
                                     CPU: 2 x AMD Ryzen 7 7700X (2) @ 4.49 GHz
                                     GPU: RedHat Virtio 1.0 GPU
                                     Memory: 887.32 MiB / 3.83 GiB (23%)
                                     Swap: 0 B / 1.33 GiB (0%)
                                     Disk (/): 14.47 GiB / 23.13 GiB (63%) - ext4
                                     Local IP (eth0): 10.10.11.100/24
                                     Locale: en_US.UTF-8

                                     \x1b[41m   \x1b[42m   \x1b[43m   \x1b[44m   \x1b[45m   \x1b[46m   \x1b[47m   \x1b[0m`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'wget') {
    const url = parts[1] || 'http://10.10.11.110/login.php';
    return {
      output: `--2026-11-03 01:00:25--  ${url}
Connecting to 10.10.11.110:80... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1540 (1.5K) [text/html]
Saving to: 'index.html'

index.html          100%[===================>]   1.50K  --.-KB/s    in 0.001s

2026-11-03 01:00:25 (1.50 MB/s) - 'index.html' saved [1540/1540]`,
      exitCode: 0,
      isError: false
    };
  }

  if (baseCmd === 'bg') {
    return { output: `[1]+ tcpdump -i eth0 &`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'fg') {
    return { output: `tcpdump -i eth0`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'jobs') {
    return { output: `[1]+  Running                 tcpdump -i eth0 &`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'nohup') {
    return { output: `nohup: ignoring input and appending output to 'nohup.out'`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'alias') {
    return { output: `alias ll='ls -la'\nalias grep='grep --color=auto'\nalias update='sudo apt update && sudo apt upgrade'`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'unalias') {
    return { output: `[+] Alias removed for '${parts[1] || 'cmd'}'.`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'shutdown' || baseCmd === 'reboot' || baseCmd === 'poweroff') {
    return { output: `Broadcast message from root@kali-sandbox (pts/0) (2026-11-03 01:00):\n\nThe system is going down for maintenance NOW!`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'adduser' || baseCmd === 'useradd') {
    const u = parts[1] || 'newuser';
    return { output: `Adding user \`${u}' ...\nAdding new group \`${u}' (1001) ...\nAdding new user \`${u}' (1001) with group \`${u}' ...\nCreating home directory \`/home/${u}' ...\nCopying files from \`/etc/skel' ...`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'userdel') {
    const u = parts[1] || 'user';
    return { output: `userdel: user \`${u}' removed successfully.`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'passwd') {
    return { output: `New password: \nRetype new password: \npasswd: password updated successfully for ${parts[1] || 'kali'}`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'groupadd') {
    return { output: `groupadd: group '${parts[1] || 'security'}' created with GID 1002.`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'groupdel') {
    return { output: `groupdel: group '${parts[1] || 'security'}' removed.`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'usermod') {
    return { output: `usermod: user '${parts[parts.length - 1] || 'kali'}' modified successfully.`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'groups') {
    return { output: `kali : kali cdrom floppy sudo audio dip video plugdev users netdev bluetooth`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'su' || baseCmd === 'sudo') {
    if (clean.includes('su -') || clean.includes('sudo su')) {
      virtualFS.currentUser = 'root';
      return { output: `[sudo] password for kali: \nroot@kali-sandbox:~# `, exitCode: 0, isError: false };
    }
    return { output: `[sudo] command executed with root privileges.`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'visudo') {
    return { output: `/etc/sudoers: parsed OK\n# User privilege specification\nroot    ALL=(ALL:ALL) ALL\nkali    ALL=(ALL:ALL) NOPASSWD:ALL`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'chage') {
    return { output: `Minimum Password Age: 0\nMaximum Password Age: 99999\nPassword Expiration Warning: 7\nPassword Inactive: never\nAccount Expires: never`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'last') {
    return { output: `kali     pts/0        10.10.11.1       Tue Nov  3 00:36   still logged in\nreboot   system boot  6.19.14-kali     Tue Nov  3 00:35   still running\n\nwtmp begins Tue Nov  3 00:35:10 2026`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'w') {
    return { output: ` 01:00:30 up 24 min,  1 user,  load average: 0.12, 0.18, 0.14\nUSER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT\nkali     pts/0    10.10.11.1       00:36    0.00s  0.18s  0.02s w`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'who') {
    return { output: `kali     pts/0        2026-11-03 00:36 (10.10.11.1)`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'finger') {
    return { output: `Login: kali                             Name: Kali Default User\nDirectory: /home/kali                   Shell: /bin/zsh\nOn since Tue Nov  3 00:36 (UTC) on pts/0 from 10.10.11.1\nNo mail.\nNo Plan.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'umask') {
    return { output: `0022`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'getfacl') {
    const f = parts[1] || 'recon_notes.txt';
    return { output: `# file: ${f}\n# owner: kali\n# group: kali\nuser::rw-\ngroup::r--\nother::r--`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'setfacl') {
    return { output: `setfacl: ACL updated for ${parts[parts.length - 1] || 'target'}.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'cupp') {
    return { output: `[+] Common User Passwords Profiler (CUPP) v3.2.0\n[+] Loaded dictionary generator engine.\n[+] Generated 1,482 targeted dictionary candidate hashes. Saved to user_wordlist.txt.`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'crunch') {
    return { output: `Crunch will now generate the following amount of data: 48512 bytes (0 MB)\nCrunch will now generate 5482 words.\n[+] Process finished. Output written to stdout / crunch.txt.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'wpscan') {
    return { output: `_______________________________________________________________\n        __          _______   _____                    \n        \\ \\        / /  __ \\ / ____|                   \n         \\ \\  /\\  / /| |__) | (___   ___  __ _ _ __    \n          \\ \\/  \\/ / |  ___/ \\___ \\ / __|/ _\` | '_ \\   \n           \\  /\\  /  | |     ____) | (__| (_| | | | |  \n            \\/  \\/   |_|    |_____/ \\___|\\__,_|_| |_|  \n\n[+] URL: http://10.10.11.110/\n[+] Effective URL: http://10.10.11.110/login.php\n[+] Interesting Finding: robots.txt found (Status: 200)\n[+] WordPress version: Non-WordPress application detected (Custom PHP/DVWA).`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'sublist3r') {
    return { output: `[-] Enumerating subdomains now for redkross.internal\n[-] Searching now in Baidu, Yahoo, Google, Bing, Ask, Netcraft, Virustotal...\n[+] Total Unique Subdomains Found: 4\napi.redkross.internal\nauth.redkross.internal\nlab.redkross.internal\nportal.redkross.internal`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'burpsuite') {
    return { output: `[+] Burp Suite Community Edition v2024.1.2\n[+] Proxy service listening on 127.0.0.1:8080 (Intercept: OFF)\n[+] Headless API gateway active for cyber-lab browser integration.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'armitage') {
    return { output: `[*] Starting Armitage GUI connector on 127.0.0.1:55553...\n[*] Connected to Metasploit RPC daemon.\n[*] 7 Target nodes mapped to interactive graphical canvas.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'mimikatz') {
    return { output: `  .#####.   mimikatz 2.2.0 (x64) #19041 Aug 10 2023 17:19:53\n .## ^ ##.  "A La Vie, A L'Amour"\n ## / \\ ##  /* * *                      \n ## \\ / ##   Benjamin DELPY \`gentilkiwi\` ( benjamin@gentilkiwi.com )\n '## v ##'   http://blog.gentilkiwi.com/mimikatz             (oe.eo)\n  '#####'    Ported to Linux LSASS dump extraction           * * * */\n\nmimikatz # sekurlsa::logonpasswords\nAuthentication Id : 0 ; 996 (00000000:000003e4)\nSession           : Service from 0\nUser Name         : SYSTEM\nDomain            : REDKROSS\nLogon Server      : (null)\n    * NTLM        : 31d6cfe0d16ae931b73c59d7e0c089c0\n    * SHA1        : da39a3ee5e6b4b0d3255bfef95601890afd80709`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'empire') {
    return { output: `================================================================\n[Empire] > Active listeners: 1 (http_80)\n[Empire] > Active agents: 1 (Debian-Target / 10.10.11.105)\n================================================================`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'beef') {
    return { output: `[BeEF] Hook URL: http://10.10.11.100:3000/hook.js\n[BeEF] UI URL:   http://10.10.11.100:3000/ui/panel\n[BeEF] Online hooked browsers: 1 (Juice-Shop Chromium Session)`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'responder') {
    return { output: `[+] Listening for events on eth0 (10.10.11.100)...\n[+] Poisoners: LLMNR: ON | NBT-NS: ON | MDNS: ON\n[+] Servers:   HTTP: ON | HTTPS: ON | SMB: ON | LDAP: ON\n[+] Waiting for incoming credential authentication requests...`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'autopsy') {
    return { output: `[+] Autopsy Forensic Browser v4.21.0\n[+] Digital investigation engine active on http://127.0.0.1:9999/autopsy\n[+] Case loaded: 'RedKross Incident Response 01'. Images: debian_root.dd`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'ghidra') {
    return { output: `[+] Ghidra Software Reverse Engineering Suite v11.0.1\n[+] Loaded project: 'crackme_challenge'\n[+] Architecture: x86_64 ELF. Entry point: 0x00401120. Decompiler initialized.`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'gdb') {
    return { output: `GNU gdb (Debian 13.2-1) 13.2\nCopyright (C) 2023 Free Software Foundation, Inc.\nType "help" for a list of commands.\n(gdb) target remote 10.10.11.105:1234\nRemote debugging using 10.10.11.105:1234\n0x00007ffff7fe32b0 in _start () from /lib64/ld-linux-x86-64.so.2\n(gdb) `, exitCode: 0, isError: false };
  }

  if (baseCmd === 'reaver') {
    return { output: `Reaver v1.6.6 WiFi Protected Setup Attack Tool\nCopyright (c) 2011, Tactical Network Solutions, Craig Heffner\n[+] Waiting for beacon from 00:11:22:33:44:55\n[+] Associated with 00:11:22:33:44:55 (ESSID: RedKross-Secure-Lab)\n[+] Trying pin '12345670'`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'fern-wifi-cracker') {
    return { output: `[+] Fern WiFi Wireless Security Auditing Suite initialized.\n[+] Monitoring interface: wlan0mon. 4 access points in range.`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'kismet') {
    return { output: `INFO: Kismet 2023-07-R1\nINFO: Logging to /home/kali/Kismet-20261103.kismet\nINFO: Web UI active on http://127.0.0.1:2501\nINFO: Packets captured: 1,492 on virtual RF bridge.`, exitCode: 0, isError: false };
  }

  if (baseCmd === 'cron' || baseCmd === 'crontab') {
    return { output: `# RedKross Crontab File\n0 * * * * /usr/local/bin/lab-healthcheck.sh\n*/15 * * * * /usr/bin/python3 /opt/recon_agent.py\n# Scheduled jobs are active.`, exitCode: 0, isError: false };
  }
  if (baseCmd === 'at') {
    return { output: `job 1 at Tue Nov  3 02:00:00 2026\n[+] Scheduled task registered.`, exitCode: 0, isError: false };
  }

  return {
    output: `[kali-sandbox: ~]$ Executed: '${clean}'\n[+] Task acknowledged by Kali attacker subsystem (PID ${Math.floor(Math.random() * 8000 + 1000)}).`,
    exitCode: 0,
    isError: false
  };
}
