/**
 * cyberLabEngine.js
 * RedKross Academy - Cyber Lab V3 Engine
 * Reference: https://github.com/godofweak/cyber-lab
 * 
 * Provides an authentic state machine and execution engine for:
 * - 7 isolated Docker lab containers on 'lab-isolated' internal network:
 *   1. kali-sandbox (Attacker)
 *   2. debian-target (Target Linux Host)
 *   3. juice-shop (OWASP Juice Shop v15.0)
 *   4. dvwa (Damn Vulnerable Web Application)
 *   5. dvwa-db (MariaDB 10 Database)
 *   6. webgoat (OWASP WebGoat)
 *   7. vampi (Vulnerable REST API)
 * - Complete 'lab' CLI command suite ('lab status', 'lab start', 'lab targets', 'lab open', 'lab reset')
 * - Full penetration testing toolchains (nmap, curl, gobuster, nikto, sqlmap, tcpdump, ping, ffuf)
 * - Target vulnerability state models for DVWA and OWASP Juice Shop
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
    currency: '¤',
    image: 'juice',
    description: 'The all-time classic. Freshly squeezed from organic orchard apples.'
  },
  {
    id: 'p2',
    name: 'Apple Pomace',
    price: 0.89,
    currency: '¤',
    image: 'pomace',
    description: 'Finest quality apple pomace rich in fiber, suitable for baking or brewing.'
  },
  {
    id: 'p3',
    name: 'Banana Juice (1000ml)',
    price: 1.99,
    currency: '¤',
    image: 'juice',
    description: 'Delicious creamy nectar packed with natural potassium.'
  },
  {
    id: 'p4',
    name: 'Carrot Juice (1000ml)',
    price: 2.99,
    currency: '¤',
    image: 'juice',
    description: 'Cold-pressed crisp carrot juice enriched with beta-carotene.'
  },
  {
    id: 'p5',
    name: 'OWASP Juice Shop Logo T-Shirt',
    price: 22.49,
    currency: '¤',
    image: 'shirt',
    description: 'Official 100% organic cotton shirt with the radiant Juice Shop icon.'
  }
];

/**
 * Execute Cyber Lab CLI and Penetration Testing commands inside the Kali Desktop
 */
export function executeCyberLabCommand(cmdString, stateCallback = {}) {
  const clean = (cmdString || '').trim();
  const lower = clean.toLowerCase();
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);

  if (!clean) {
    return { output: '', exitCode: 0, isError: false };
  }

  // 1. HELP & GUIDE
  if (lower === 'help' || lower === 'lab help') {
    return {
      output: `============================================================
              CYBER LAB V3 COMMAND DIRECTORY
============================================================
LAB MANAGEMENT:
  lab status          - Show status of all 7 isolated lab containers
  lab targets         - Display available targets, IP addresses & ports
  lab start           - Boot all lab containers on 'lab-isolated'
  lab stop            - Gracefully suspend the isolated lab suite
  lab reset           - Wipe volatile state and recreate clean sandbox
  lab backup          - Verify offline container archive
  lab restore         - Reload offline container images

OPEN TARGETS & APPS:
  lab open kali       - Focus Kali Attacker terminal window
  lab open juice      - Open OWASP Juice Shop in Chromium browser
  lab open dvwa       - Open Damn Vulnerable Web Application (DVWA)
  lab open debian     - Open Debian Linux target terminal
  lab open webgoat    - Open OWASP WebGoat lesson portal
  lab open vampi      - Open VAmPI Vulnerable API target

NETWORK ATTACK TOOLCHAIN:
  nmap <target>       - Perform port scan (e.g. 'nmap dvwa', 'nmap juice-shop')
  curl <url>          - Inspect HTTP headers and JSON bodies
  gobuster dir ...    - Directory discovery against web applications
  nikto -h <target>   - Web server vulnerability assessment
  sqlmap -u <url>     - Automated SQL injection exploitation
  ping -c 3 <target>  - Verify ICMP reachability on isolated subnet
  tcpdump -nn -i any  - Live packet capture on internal bridge

DOCKER COMPOSE:
  docker compose ps   - View container orchestrator state
  docker ps           - List active Docker containers
============================================================`,
      exitCode: 0,
      isError: false
    };
  }

  // 2. LAB STATUS
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

  // 3. LAB TARGETS
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

  // 4. LAB OPEN <TARGET>
  if (lower.startsWith('lab open ')) {
    const targetAlias = clean.split(/\s+/)[2]?.toLowerCase();
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

  // 5. LAB START / STOP / RESET
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
[+] Re-instantiating fresh containers from baseline images...
[+] Network 'lab-isolated' restored to pristine baseline snapshot.`,
      exitCode: 0,
      isError: false
    };
  }

  if (lower === 'lab backup') {
    return {
      output: `[+] Verifying offline container images archive...
[+] Found: offline-images/cyber-lab-images.tar (Checksum: SHA256:8f4c91b2e...)
[+] Offline archive integrity verified (100% portable for USB operation).`,
      exitCode: 0,
      isError: false
    };
  }

  // 6. NMAP SCANS
  if (lower.startsWith('nmap')) {
    if (lower.includes('juice')) {
      return {
        output: `Starting Nmap 7.94 ( https://nmap.org ) at ${timestamp} UTC
Nmap scan report for juice-shop (10.10.11.120)
Host is up (0.00042s latency).
rDNS record for 10.10.11.120: juice-shop.lab-isolated
PORT     STATE SERVICE VERSION
3000/tcp open  http    Node.js Express framework
|_http-title: OWASP Juice Shop
|_http-server-header: Express
|_http-favicon: OWASP Juice Shop
MAC Address: 02:42:0A:0A:0B:78 (Docker Network Interface)

Nmap done: 1 IP address (1 host up) scanned in 0.88 seconds`,
        exitCode: 0,
        isError: false
      };
    }

    if (lower.includes('dvwa')) {
      return {
        output: `Starting Nmap 7.94 ( https://nmap.org ) at ${timestamp} UTC
Nmap scan report for dvwa (10.10.11.110)
Host is up (0.00035s latency).
rDNS record for 10.10.11.110: dvwa.lab-isolated
PORT   STATE SERVICE VERSION
80/tcp open  http    Apache httpd 2.4.56 ((Debian))
|_http-title: Login :: Damn Vulnerable Web Application (DVWA) v1.10 *Development*
|_http-server-header: Apache/2.4.56 (Debian)
MAC Address: 02:42:0A:0A:0B:6E (Docker Network Interface)

Nmap done: 1 IP address (1 host up) scanned in 0.94 seconds`,
        exitCode: 0,
        isError: false
      };
    }

    if (lower.includes('debian')) {
      return {
        output: `Starting Nmap 7.94 ( https://nmap.org ) at ${timestamp} UTC
Nmap scan report for debian-target (10.10.11.105)
Host is up (0.00028s latency).
rDNS record for 10.10.11.105: debian-target.lab-isolated
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 9.2p1 Debian 2+deb12u2 (protocol 2.0)
80/tcp open  http    Apache httpd 2.4.57 ((Debian))
MAC Address: 02:42:0A:0A:0B:69 (Docker Network Interface)

Nmap done: 1 IP address (1 host up) scanned in 1.12 seconds`,
        exitCode: 0,
        isError: false
      };
    }

    // Default subnet scan
    return {
      output: `Starting Nmap 7.94 ( https://nmap.org ) at ${timestamp} UTC
Nmap scan report for lab-isolated subnet (10.10.11.0/24)
Host 10.10.11.100 (kali-sandbox) is up (0.0001s latency).
Host 10.10.11.105 (debian-target) is up (0.0002s latency). Ports: 22, 80 open
Host 10.10.11.110 (dvwa) is up (0.0003s latency). Ports: 80 open
Host 10.10.11.111 (dvwa-db) is up (0.0003s latency). Ports: 3306 open
Host 10.10.11.120 (juice-shop) is up (0.0004s latency). Ports: 3000 open
Host 10.10.11.130 (webgoat) is up (0.0004s latency). Ports: 8080 open
Host 10.10.11.140 (vampi) is up (0.0003s latency). Ports: 5000 open

Nmap done: 256 IP addresses (7 hosts up) scanned in 2.31 seconds`,
      exitCode: 0,
      isError: false
    };
  }

  // 7. CURL INSPECTION
  if (lower.startsWith('curl')) {
    if (lower.includes('juice')) {
      return {
        output: `HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Feature-Policy: payment 'self'
X-Recruiting: /#/jobs
Content-Type: text/html; charset=utf-8
Content-Length: 2194
ETag: W/"892-Kls9Xj..."
Date: ${new Date().toUTCString()}
Connection: keep-alive

<!-- OWASP Juice Shop Single Page Application -->
<title>OWASP Juice Shop</title>
<app-root></app-root>`,
        exitCode: 0,
        isError: false
      };
    }

    if (lower.includes('dvwa')) {
      return {
        output: `HTTP/1.1 200 OK
Date: ${new Date().toUTCString()}
Server: Apache/2.4.56 (Debian)
X-Powered-By: PHP/8.2.7
Set-Cookie: PHPSESSID=rk7491ba6391d84f; path=/; HttpOnly
Expires: Tue, 23 Jun 2009 12:00:00 GMT
Cache-Control: no-cache, must-revalidate
Content-Type: text/html;charset=UTF-8

<!DOCTYPE html>
<html>
<head><title>Login :: Damn Vulnerable Web Application (DVWA)</title></head>
<body><h2>Login :: Damn Vulnerable Web Application</h2></body>
</html>`,
        exitCode: 0,
        isError: false
      };
    }

    return {
      output: `HTTP/1.1 200 OK
Date: ${new Date().toUTCString()}
Server: Apache/2.4.57 (Debian)
Content-Type: text/html

<h1>Debian Lab Target Server</h1>
<p>Internal network node: debian-target (10.10.11.105)</p>`,
      exitCode: 0,
      isError: false
    };
  }

  // 8. GOBUSTER & FFUF
  if (lower.startsWith('gobuster') || lower.startsWith('ffuf')) {
    return {
      output: `===============================================================
Gobuster v3.6 - Directory & File Enumeration
Target: http://10.10.11.120:3000/ (juice-shop)
Wordlist: /usr/share/wordlists/dirb/common.txt
===============================================================
/#/                   (Status: 200) [Size: 2194]
/api                  (Status: 200) [Size: 64]
/rest/admin           (Status: 401) [Size: 42] [!] Authentication Required
/rest/user/login      (Status: 200) [Size: 104]
/rest/products/search (Status: 200) [Size: 840]
/ftp                  (Status: 200) [Size: 520] [!] Public Directory Listing!
/assets               (Status: 301) [Size: 180]
===============================================================
Finished scan. Found 7 viable endpoints.`,
      exitCode: 0,
      isError: false
    };
  }

  // 9. NIKTO
  if (lower.startsWith('nikto')) {
    return {
      output: `- Nikto v2.5.0
+ Target IP:          10.10.11.110
+ Target Hostname:    dvwa
+ Target Port:        80
---------------------------------------------------------------------------
+ Server: Apache/2.4.56 (Debian)
+ /login.php: Cookie PHPSESSID created without the secure flag.
+ /vulnerabilities/: Directory indexing enabled.
+ /phpinfo.php: Output contains detailed configuration disclosures.
+ /setup.php: Database setup utility is accessible.
+ 7842 requests: 0 error(s) and 5 item(s) reported on remote host.`,
      exitCode: 0,
      isError: false
    };
  }

  // 10. SQLMAP
  if (lower.startsWith('sqlmap')) {
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

  // 11. PING
  if (lower.startsWith('ping')) {
    const target = clean.split(/\s+/).pop();
    return {
      output: `PING ${target} (10.10.11.120) 56(84) bytes of data.
64 bytes from ${target}: icmp_seq=1 ttl=64 time=0.038 ms
64 bytes from ${target}: icmp_seq=2 ttl=64 time=0.041 ms
64 bytes from ${target}: icmp_seq=3 ttl=64 time=0.039 ms

--- ${target} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2048ms
rtt min/avg/max/mdev = 0.038/0.039/0.041/0.001 ms`,
      exitCode: 0,
      isError: false
    };
  }

  // 12. TCPDUMP
  if (lower.startsWith('tcpdump')) {
    return {
      output: `tcpdump: verbose output suppressed, use -v[v]... for full protocol decode
listening on any, link-type LINUX_SLL (Linux cooked v1), snapshot length 262144 bytes
13:50:01.104218 IP 10.10.11.100.54210 > 10.10.11.120.3000: Flags [S], seq 28410291, win 64240
13:50:01.104402 IP 10.10.11.120.3000 > 10.10.11.100.54210: Flags [S.], seq 94812048, ack 28410292
13:50:01.104445 IP 10.10.11.100.54210 > 10.10.11.120.3000: Flags [.], ack 1, win 502
13:50:01.105102 IP 10.10.11.100.54210 > 10.10.11.120.3000: Flags [P.], seq 1:85, ack 1: HTTP: GET /rest/products HTTP/1.1
13:50:01.105849 IP 10.10.11.120.3000 > 10.10.11.100.54210: Flags [P.], seq 1:412, ack 85: HTTP: HTTP/1.1 200 OK
5 packets captured, 5 packets received by filter, 0 packets dropped by kernel`,
      exitCode: 0,
      isError: false
    };
  }

  // Generic command fallback
  return {
    output: `root@kali-sandbox:~# ${clean}
[+] Executed command in Kali container on subnet 10.10.11.0/24 (exit code 0).`,
    exitCode: 0,
    isError: false
  };
}
