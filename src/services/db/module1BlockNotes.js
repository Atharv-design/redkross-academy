/**
 * RedKross Academy — Cyber Division Master Curriculum
 * Module 1: Introduction to Web Development & Web Security Architecture
 * Rich BlockNote Document Data Fixtures
 */

export const MODULE_1_BLOCK_NOTES = {
  // -------------------------------------------------------------------------
  // LESSON 1: How the Web Works
  // -------------------------------------------------------------------------
  les_m1_l1: [
    {
      id: 'm1_l1_h1',
      type: 'heading',
      props: { level: 1, textAlignment: 'left' },
      content: [{ type: 'text', text: 'How the Web Works: Clients, Servers, DNS & HTTP/HTTPS', styles: { bold: true } }]
    },
    {
      id: 'm1_l1_quote1',
      type: 'quote',
      props: { textColor: 'default', backgroundColor: 'default' },
      content: [
        { type: 'text', text: 'SECURITY NOTICE // ARCHITECTURAL DIRECTIVE: ', styles: { bold: true, textColor: 'orange' } },
        { type: 'text', text: 'Every modern full-stack web application is fundamentally a state machine communicating across untrusted packet-switched networks. Mastering DNS traversal, TCP three-way handshakes, and TLS 1.3 cryptographic tunnels is mandatory before deploying production defenses.', styles: { italic: true } }
      ]
    },
    {
      id: 'm1_l1_p1',
      type: 'paragraph',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'When a user accesses an institutional web property such as ', styles: {} },
        { type: 'text', text: 'https://academy.redkross.org.in', styles: { bold: true, textColor: 'orange' } },
        { type: 'text', text: ', a coordinated sequence of distributed protocols executes across OSI Layer 4 (Transport) and Layer 7 (Application) within tens of milliseconds.', styles: {} }
      ]
    },
    {
      id: 'm1_l1_h2_1',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '1. The Client-Server Telemetry Pipeline', styles: { bold: true } }]
    },
    {
      id: 'm1_l1_diag1',
      type: 'codeBlock',
      props: { language: 'text' },
      content: 
`+------------------+         1. DNS Recursive Query (UDP 53)        +-------------------+
|  CLIENT BROWSER  | ---------------------------------------------> |  DNS RESOLVER     |
|  (User-Agent)    | <--------------------------------------------- |  (1.1.1.1 / 8.8.8)|
|                  |            Returns A Record: 198.51.100.42     +-------------------+
|                  |
|                  |         2. TCP 3-Way Handshake (SYN / SYN-ACK)  +-------------------+
|                  | <============================================> |  EDGE REVERSE     |
|                  |         3. TLS 1.3 ECDHE Handshake (Port 443)  |  PROXY (NGINX)    |
|                  | <============================================> |  (Port 443)       |
|                  |         4. HTTP/2 GET /dashboard [Encrypted]   |                   |
|                  | ---------------------------------------------> |                   |
|                  |         5. HTTP 200 OK + React SPA Payload     |                   |
|                  | <--------------------------------------------- |                   |
+------------------+                                                +-------------------+`
    },
    {
      id: 'm1_l1_h2_2',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '2. The 6-Stage Recursive DNS Resolution Chain', styles: { bold: true } }]
    },
    {
      id: 'm1_l1_num1',
      type: 'numberedListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Browser DNS Cache Check: ', styles: { bold: true } },
        { type: 'text', text: 'Inspects local socket memory (chrome://net-internals/#dns) for cached TTL validity.', styles: {} }
      ]
    },
    {
      id: 'm1_l1_num2',
      type: 'numberedListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'OS Socket Resolution & /etc/hosts: ', styles: { bold: true } },
        { type: 'text', text: 'Verifies kernel loopback overrides and Windows System32 /etc/hosts entries.', styles: {} }
      ]
    },
    {
      id: 'm1_l1_num3',
      type: 'numberedListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Recursive Resolver Query: ', styles: { bold: true } },
        { type: 'text', text: 'Forwards recursive request to Anycast DNS servers (Cloudflare 1.1.1.1 or Google 8.8.8.8).', styles: {} }
      ]
    },
    {
      id: 'm1_l1_num4',
      type: 'numberedListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Root Nameserver Traversal (.): ', styles: { bold: true } },
        { type: 'text', text: 'Directs resolver to the 13 global root clusters handling TLD delegations.', styles: {} }
      ]
    },
    {
      id: 'm1_l1_num5',
      type: 'numberedListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'TLD Authority (.org / .in): ', styles: { bold: true } },
        { type: 'text', text: 'Yields authoritative nameserver delegations for the specific registered second-level domain.', styles: {} }
      ]
    },
    {
      id: 'm1_l1_num6',
      type: 'numberedListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Authoritative Nameserver: ', styles: { bold: true } },
        { type: 'text', text: 'Dispatches authoritative A (IPv4), AAAA (IPv6), and CNAME records back to the client resolver.', styles: {} }
      ]
    },
    {
      id: 'm1_l1_h2_3',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '3. Transport Layer Security (TLS 1.3) vs Cleartext HTTP', styles: { bold: true } }]
    },
    {
      id: 'm1_l1_p2',
      type: 'paragraph',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Cleartext HTTP (Port 80) transmits raw ASCII payloads vulnerable to Man-In-The-Middle (MITM) interception and packet sniffing. HTTPS mandates TLS 1.3 negotiation with forward secrecy via ephemeral Diffie-Hellman (ECDHE).', styles: {} }
      ]
    },
    {
      id: 'm1_l1_code1',
      type: 'codeBlock',
      props: { language: 'bash' },
      content:
`# Terminal Command: Verbose Network & TLS Handshake Inspection
curl -Iv https://academy.redkross.org.in

# Diagnostics Breakdown:
# * Connected to academy.redkross.org.in (198.51.100.42) port 443
# * ALPN: offers h2, http/1.1
# * TLSv1.3 (IN), TLS handshake, Server hello (3):
# * TLSv1.3 (IN), TLS handshake, [Certificate verification: OK]
# * Server certificate: academy.redkross.org.in (Let's Encrypt / ECDSA)
# > GET / HTTP/2
# > Host: academy.redkross.org.in
# > User-Agent: curl/8.4.0
# < HTTP/2 200 OK
# < strict-transport-security: max-age=31536000; includeSubDomains; preload`
    },
    {
      id: 'm1_l1_h2_4',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '4. Student Laboratory Verification Checklist', styles: { bold: true } }]
    },
    {
      id: 'm1_l1_chk1',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Verify recursive DNS resolution using "nslookup academy.redkross.org.in"', styles: {} }]
    },
    {
      id: 'm1_l1_chk2',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Confirm automatic HTTP (Port 80) redirection to HTTPS (Port 443)', styles: {} }]
    },
    {
      id: 'm1_l1_chk3',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Audit TLS 1.3 cipher suites and enforce Strict-Transport-Security (HSTS)', styles: {} }]
    },
    {
      id: 'm1_l1_chk4',
      type: 'checkListItem',
      props: { checked: false },
      content: [{ type: 'text', text: 'Capture Wireshark packet capture verifying encrypted payload zero-leakage', styles: {} }]
    }
  ],

  // -------------------------------------------------------------------------
  // LESSON 2: Browser DevTools & Ecosystem
  // -------------------------------------------------------------------------
  les_m1_l2: [
    {
      id: 'm1_l2_h1',
      type: 'heading',
      props: { level: 1, textAlignment: 'left' },
      content: [{ type: 'text', text: 'Web Development Ecosystem & Browser DevTools Mastery', styles: { bold: true } }]
    },
    {
      id: 'm1_l2_quote1',
      type: 'quote',
      props: { textColor: 'default', backgroundColor: 'default' },
      content: [
        { type: 'text', text: 'CRITICAL DIAGNOSTIC SUITE: ', styles: { bold: true, textColor: 'orange' } },
        { type: 'text', text: 'Browser DevTools is not just an inspector—it is a live runtime telemetry cockpit for debugging DOM mutation, network latency waterfalls, JavaScript heap allocations, and client storage vectors.', styles: { italic: true } }
      ]
    },
    {
      id: 'm1_l2_h2_1',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '1. Primary DevTools Functional Panels', styles: { bold: true } }]
    },
    {
      id: 'm1_l2_bullet1',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Elements Panel: ', styles: { bold: true } },
        { type: 'text', text: 'Live DOM tree inspector, CSS cascade debugger, and Box Model dimensions (margin, border, padding, content).', styles: {} }
      ]
    },
    {
      id: 'm1_l2_bullet2',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Console REPL: ', styles: { bold: true } },
        { type: 'text', text: 'Execution sandbox with built-in utility commands ($0, $$, console.table, monitorEvents).', styles: {} }
      ]
    },
    {
      id: 'm1_l2_bullet3',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Sources & Breakpoints: ', styles: { bold: true } },
        { type: 'text', text: 'Conditional breakpoints, call stack evaluation, scope inspection (Global, Closure, Block).', styles: {} }
      ]
    },
    {
      id: 'm1_l2_bullet4',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Network Telemetry: ', styles: { bold: true } },
        { type: 'text', text: 'Waterfall visualization, TTFB (Time To First Byte), HTTP status code filtering, payload preview.', styles: {} }
      ]
    },
    {
      id: 'm1_l2_bullet5',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Application Storage: ', styles: { bold: true } },
        { type: 'text', text: 'Inspection of localStorage, sessionStorage, IndexedDB, and security flags on cookies (HttpOnly, Secure, SameSite).', styles: {} }
      ]
    },
    {
      id: 'm1_l2_h2_2',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '2. Network Waterfall & Latency Anatomy', styles: { bold: true } }]
    },
    {
      id: 'm1_l2_diag1',
      type: 'codeBlock',
      props: { language: 'text' },
      content:
`[QUEUEING] ----------> [DNS LOOKUP: 12ms]
                       [TCP CONNECT: 24ms]
                       [TLS HANDSHAKE: 38ms]
                       [REQUEST SENT: 1ms]
                       [WAITING FOR SERVER (TTFB): 65ms] <--- BACKEND LATENCY
                       [CONTENT DOWNLOAD: 42ms] ----------> [RENDER COMPLETE]`
    },
    {
      id: 'm1_l2_h2_3',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '3. Advanced DevTools Console Commands', styles: { bold: true } }]
    },
    {
      id: 'm1_l2_code1',
      type: 'codeBlock',
      props: { language: 'javascript' },
      content:
`// 1. Select currently highlighted DOM node
console.log($0);

// 2. Query all matching elements as a true JS Array
const telemetryCards = $$('.cyber-telemetry-card');

// 3. Tabular visualization of security headers
console.table({
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'",
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff'
});

// 4. Live monitoring of form submission event dispatch
monitorEvents(document.querySelector('form'), ['submit', 'reset']);`
    },
    {
      id: 'm1_l2_chk_head',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '4. Hands-On Verification Tasks', styles: { bold: true } }]
    },
    {
      id: 'm1_l2_chk1',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Activate Device Toolbar (Ctrl+Shift+M) and test 360px mobile viewport reflow', styles: {} }]
    },
    {
      id: 'm1_l2_chk2',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Simulate Fast 3G throttling to evaluate font display swap behavior', styles: {} }]
    },
    {
      id: 'm1_l2_chk3',
      type: 'checkListItem',
      props: { checked: false },
      content: [{ type: 'text', text: 'Export HAR archive from Network tab for offline telemetry auditing', styles: {} }]
    }
  ],

  // -------------------------------------------------------------------------
  // LESSON 3: Developer Toolchain Setup
  // -------------------------------------------------------------------------
  les_m1_l3: [
    {
      id: 'm1_l3_h1',
      type: 'heading',
      props: { level: 1, textAlignment: 'left' },
      content: [{ type: 'text', text: 'Modern Developer Toolchain: VS Code, Terminal & Version Control', styles: { bold: true } }]
    },
    {
      id: 'm1_l3_quote1',
      type: 'quote',
      props: { textColor: 'default', backgroundColor: 'default' },
      content: [
        { type: 'text', text: 'ENVIRONMENT REPRODUCIBILITY: ', styles: { bold: true, textColor: 'orange' } },
        { type: 'text', text: 'A professional engineering environment ensures that code executes identically across development workstations, CI/CD runners, and production Linux containers.', styles: { italic: true } }
      ]
    },
    {
      id: 'm1_l3_h2_1',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '1. Recommended Enterprise VS Code Architecture', styles: { bold: true } }]
    },
    {
      id: 'm1_l3_bullet1',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Prettier & ESLint: ', styles: { bold: true } },
        { type: 'text', text: 'Automated syntax formatting and static analysis rules preventing common prototype pollution and security flaws.', styles: {} }
      ]
    },
    {
      id: 'm1_l3_bullet2',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Tailwind CSS IntelliSense: ', styles: { bold: true } },
        { type: 'text', text: 'Autocomplete token suggestions, class ordering, and CSS variable previews.', styles: {} }
      ]
    },
    {
      id: 'm1_l3_bullet3',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'GitLens & Git Graph: ', styles: { bold: true } },
        { type: 'text', text: 'Granular line annotations, branch visualizers, and atomic commit inspections.', styles: {} }
      ]
    },
    {
      id: 'm1_l3_h2_2',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '2. Terminal Configuration & Command-Line Fundamentals', styles: { bold: true } }]
    },
    {
      id: 'm1_l3_code1',
      type: 'codeBlock',
      props: { language: 'bash' },
      content:
`# Verify Node.js and NPM LTS Environments
node --version # >= v20.x required
npm --version  # >= v10.x required

# Initialize a standard enterprise workspace
mkdir redkross-cyber-lab && cd redkross-cyber-lab
git init
git branch -M main

# Configure strict git config signatures
git config --local user.name "Cadet Engineer"
git config --local user.email "cadet@academy.redkross.org.in"
git config --local core.autocrlf false`
    },
    {
      id: 'm1_l3_h2_3',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '3. Developer Setup Checklist', styles: { bold: true } }]
    },
    {
      id: 'm1_l3_chk1',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Install Node.js LTS and Git command-line tools', styles: {} }]
    },
    {
      id: 'm1_l3_chk2',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Configure .editorconfig and .gitignore with secret exclusions (.env*)', styles: {} }]
    },
    {
      id: 'm1_l3_chk3',
      type: 'checkListItem',
      props: { checked: false },
      content: [{ type: 'text', text: 'Generate SSH Ed25519 cryptographic key for GitHub authentication', styles: {} }]
    }
  ],

  // -------------------------------------------------------------------------
  // LESSON 4: Anatomy of Modern Web Apps
  // -------------------------------------------------------------------------
  les_m1_l4: [
    {
      id: 'm1_l4_h1',
      type: 'heading',
      props: { level: 1, textAlignment: 'left' },
      content: [{ type: 'text', text: 'Anatomy of Modern Web Applications: Frontend, Backend & Database', styles: { bold: true } }]
    },
    {
      id: 'm1_l4_quote1',
      type: 'quote',
      props: { textColor: 'default', backgroundColor: 'default' },
      content: [
        { type: 'text', text: 'THREE-TIER ISOLATION: ', styles: { bold: true, textColor: 'orange' } },
        { type: 'text', text: 'Separation of concerns is the cornerstone of scalable architecture. The Presentation tier, Application logic tier, and Data persistence tier operate behind distinct security boundaries.', styles: { italic: true } }
      ]
    },
    {
      id: 'm1_l4_diag1',
      type: 'codeBlock',
      props: { language: 'text' },
      content:
`+-----------------------------+
|      TIER 1: CLIENT         |
|  React 18 SPA + Vite        |
|  Tailwind CSS + State Store |
+-----------------------------+
              |  HTTPS / JSON REST API (JWT Authenticated)
              v
+-----------------------------+
|      TIER 2: BACKEND        |
|  Node.js + Express REST     |
|  Rate Limiting, Zod Validation
|  OWASP Helmet Security      |
+-----------------------------+
              |  Encrypted Connection Pool (Mongoose Driver)
              v
+-----------------------------+
|     TIER 3: DATABASE        |
|  MongoDB Cluster (NoSQL)    |
|  BSON Documents, Indexes    |
|  ACID Transaction Sessions  |
+-----------------------------+`
    },
    {
      id: 'm1_l4_h2_1',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '1. Tier Responsibilities & Defense Boundaries', styles: { bold: true } }]
    },
    {
      id: 'm1_l4_bullet1',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Presentation Tier (Client): ', styles: { bold: true } },
        { type: 'text', text: 'Handles user interaction, local reactive state, optimistic updates, and input formatting. Never trust client validation as authoritative.', styles: {} }
      ]
    },
    {
      id: 'm1_l4_bullet2',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Application Logic Tier (Server): ', styles: { bold: true } },
        { type: 'text', text: 'Enforces business rules, RBAC authorization, cryptographic password hashing (bcrypt), and schema sanitation.', styles: {} }
      ]
    },
    {
      id: 'm1_l4_bullet3',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Persistence Tier (Database): ', styles: { bold: true } },
        { type: 'text', text: 'Ensures data durability, index optimization, unique constraints, and automated backup replication.', styles: {} }
      ]
    },
    {
      id: 'm1_l4_h2_2',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '2. Architecture Review Checklist', styles: { bold: true } }]
    },
    {
      id: 'm1_l4_chk1',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Verify all database connection strings are stored in protected environment variables', styles: {} }]
    },
    {
      id: 'm1_l4_chk2',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Ensure CORS origins are restricted to verified domain whitelists', styles: {} }]
    },
    {
      id: 'm1_l4_chk3',
      type: 'checkListItem',
      props: { checked: false },
      content: [{ type: 'text', text: 'Audit API routes for authorization middleware enforcement on all mutations', styles: {} }]
    }
  ],

  // -------------------------------------------------------------------------
  // LESSON 5: Responsive Design & Web Standards
  // -------------------------------------------------------------------------
  les_m1_l5: [
    {
      id: 'm1_l5_h1',
      type: 'heading',
      props: { level: 1, textAlignment: 'left' },
      content: [{ type: 'text', text: 'Responsive Design Principles & Modern Web Standards (W3C/WHATWG)', styles: { bold: true } }]
    },
    {
      id: 'm1_l5_quote1',
      type: 'quote',
      props: { textColor: 'default', backgroundColor: 'default' },
      content: [
        { type: 'text', text: 'FLUID RESPONSIVENESS: ', styles: { bold: true, textColor: 'orange' } },
        { type: 'text', text: 'Responsive design is not merely breakpoint stacking—it is fluid proportional scaling using CSS Grid, Flexbox, and CSS clamp() math functions across screen resolutions from 360px to 4K displays.', styles: { italic: true } }
      ]
    },
    {
      id: 'm1_l5_h2_1',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '1. Modern Responsive CSS Techniques', styles: { bold: true } }]
    },
    {
      id: 'm1_l5_code1',
      type: 'codeBlock',
      props: { language: 'html' },
      content:
`<!-- Fluid typography without arbitrary media query jumps -->
<style>
  :root {
    --fluid-title: clamp(1.75rem, 4vw + 1rem, 3.5rem);
    --grid-card-min: 280px;
  }

  .responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--grid-card-min), 1fr));
    gap: 1.5rem;
  }

  .fluid-heading {
    font-size: var(--fluid-title);
    line-height: 1.15;
  }
</style>`
    },
    {
      id: 'm1_l5_h2_2',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '2. Responsive Verification Checklist', styles: { bold: true } }]
    },
    {
      id: 'm1_l5_chk1',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Ensure viewport meta tag is declared: <meta name="viewport" content="width=device-width, initial-scale=1.0">', styles: {} }]
    },
    {
      id: 'm1_l5_chk2',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Verify zero horizontal scrollbar overflow at 360px, 768px, 1024px, and 1440px breakpoints', styles: {} }]
    },
    {
      id: 'm1_l5_chk3',
      type: 'checkListItem',
      props: { checked: false },
      content: [{ type: 'text', text: 'Test touch target ergonomics (minimum 44x44px bounding box for all interactive controls)', styles: {} }]
    }
  ],

  // -------------------------------------------------------------------------
  // LESSON 6: Web Performance & Accessibility
  // -------------------------------------------------------------------------
  les_m1_l6: [
    {
      id: 'm1_l6_h1',
      type: 'heading',
      props: { level: 1, textAlignment: 'left' },
      content: [{ type: 'text', text: 'Web Performance Fundamentals, Accessibility (WCAG 2.2) & SEO', styles: { bold: true } }]
    },
    {
      id: 'm1_l6_quote1',
      type: 'quote',
      props: { textColor: 'default', backgroundColor: 'default' },
      content: [
        { type: 'text', text: 'CORE WEB VITALS: ', styles: { bold: true, textColor: 'orange' } },
        { type: 'text', text: 'High-performing web platforms achieve sub-second Largest Contentful Paint (LCP < 2.5s), zero Cumulative Layout Shift (CLS < 0.1), and immediate Interaction to Next Paint (INP < 200ms) while complying strictly with WCAG AA accessibility standards.', styles: { italic: true } }
      ]
    },
    {
      id: 'm1_l6_h2_1',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '1. Core Web Vitals Key Thresholds', styles: { bold: true } }]
    },
    {
      id: 'm1_l6_bullet1',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'LCP (Largest Contentful Paint): ', styles: { bold: true } },
        { type: 'text', text: 'Measures loading performance. Target: ≤ 2.5 seconds.', styles: {} }
      ]
    },
    {
      id: 'm1_l6_bullet2',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'INP (Interaction to Next Paint): ', styles: { bold: true } },
        { type: 'text', text: 'Measures page responsiveness during user clicks/keys. Target: ≤ 200 milliseconds.', styles: {} }
      ]
    },
    {
      id: 'm1_l6_bullet3',
      type: 'bulletListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'CLS (Cumulative Layout Shift): ', styles: { bold: true } },
        { type: 'text', text: 'Measures visual stability and unexpected content shifting. Target: ≤ 0.1.', styles: {} }
      ]
    },
    {
      id: 'm1_l6_h2_2',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '2. WCAG 2.2 AA Accessibility Best Practices', styles: { bold: true } }]
    },
    {
      id: 'm1_l6_num1',
      type: 'numberedListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Contrast Ratios: ', styles: { bold: true } },
        { type: 'text', text: 'Ensure minimum 4.5:1 contrast for body text and 3:1 for large display headers.', styles: {} }
      ]
    },
    {
      id: 'm1_l6_num2',
      type: 'numberedListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Keyboard Navigation: ', styles: { bold: true } },
        { type: 'text', text: 'Every interactive element must provide visible :focus-visible outlines and support Tab / Shift+Tab cycling.', styles: {} }
      ]
    },
    {
      id: 'm1_l6_num3',
      type: 'numberedListItem',
      props: { textAlignment: 'left' },
      content: [
        { type: 'text', text: 'Semantic Landmark Roles: ', styles: { bold: true } },
        { type: 'text', text: 'Utilize <header>, <nav>, <main>, <aside>, and <footer> rather than generic <div> containers.', styles: {} }
      ]
    },
    {
      id: 'm1_l6_h2_3',
      type: 'heading',
      props: { level: 2, textAlignment: 'left' },
      content: [{ type: 'text', text: '3. Final Module Audit Checklist', styles: { bold: true } }]
    },
    {
      id: 'm1_l6_chk1',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Run Chrome Lighthouse audit achieving ≥ 95 on Performance and Accessibility', styles: {} }]
    },
    {
      id: 'm1_l6_chk2',
      type: 'checkListItem',
      props: { checked: true },
      content: [{ type: 'text', text: 'Verify image alt attributes on all non-decorative graphical elements', styles: {} }]
    },
    {
      id: 'm1_l6_chk3',
      type: 'checkListItem',
      props: { checked: false },
      content: [{ type: 'text', text: 'Validate semantic schema.org Course metadata for search indexing', styles: {} }]
    }
  ]
};
