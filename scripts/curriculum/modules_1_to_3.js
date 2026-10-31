// Module 1 to 3 Curriculum Definition
// 19 Lessons, 60 Assessment Questions

export const modules_1_to_3 = [
  // =========================================================================
  // MODULE 1: Introduction to Web Development (6 Lessons, 20 MCQs)
  // =========================================================================
  {
    id: 'mod_1',
    title: 'Module 1: Introduction to Web Development',
    description: 'Master the fundamental mechanics of the World Wide Web, client-server models, DNS resolution, HTTP/HTTPS protocol exchanges, developer tooling, web architecture, and modern accessibility standards.',
    order: 1,
    assignment: {
      id: 'asg_m1',
      title: 'Practical Assignment: Developer Workstation Setup & Architecture Analysis',
      objective: 'Configure a modern web developer environment and perform end-to-end network inspection of an enterprise web application.',
      requirements: [
        'Install and configure VS Code with Prettier, ESLint, and Live Server.',
        'Use Browser DevTools Network tab to trace a complete HTTP/HTTPS handshake, DNS lookup, and asset waterfall.',
        'Document the three-tier web application architecture of an existing online service (Client, API Server, Database).',
        'Submit a structured technical markdown report detailing TTFB, HTTP status codes, and TLS certificate details.'
      ],
      instructions: '1. Open Google Chrome DevTools (F12) -> Network Tab. 2. Navigate to https://redkross.org.in with Cache disabled. 3. Export HAR file and capture screenshot of waterfall. 4. Compile analysis into a 2-page PDF summary.',
      expected_outcome: 'A professional technical audit verifying complete understanding of client-server request lifecycles and modern developer tooling.'
    },
    lessons: [
      {
        id: 'les_m1_l1',
        title: 'How the Web Works: Clients, Servers, DNS, and HTTP/HTTPS',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Explore the complete journey of a web request from browser URL input through DNS resolution, TCP three-way handshake, TLS negotiation, and HTTP/HTTPS request-response cycles.',
        content: `# How the Web Works: Clients, Servers, DNS, and HTTP/HTTPS

## 1. Overview & Learning Objectives
The modern internet is a decentralized network of connected computers communicating through standardized protocols. In this foundational lesson, you will master:
- The fundamental mechanics of Client-Server architecture.
- The recursive DNS resolution process from Root nameservers to Authoritative servers.
- The TCP 3-way handshake (\`SYN\` -> \`SYN-ACK\` -> \`ACK\`) and TLS 1.3 cryptographic negotiation.
- HTTP methods (\`GET\`, \`POST\`, \`PUT\`, \`DELETE\`, \`PATCH\`), status code classes (1xx, 2xx, 3xx, 4xx, 5xx), and header anatomy.

---

## 2. The Client-Server Architecture
At the core of the web is the **client-server model**:
- **The Client (User-Agent):** A web browser (Chrome, Firefox, Safari), mobile application, or CLI tool (cURL) that requests resources.
- **The Server:** A software daemon (Nginx, Apache, Node.js HTTP server) listening on a network socket (typically Port 80 for HTTP or Port 443 for HTTPS) that parses requests and dispatches responses.

\`\`\`
+--------------+      1. DNS Lookup (UDP 53)       +---------------+
|              | --------------------------------> |  DNS Server   |
|              | <-------------------------------- | (8.8.8.8)     |
| Client       |                                   +---------------+
| (Browser)    |      2. TCP / TLS Handshake
|              | <===============================> +---------------+
|              |      3. HTTP GET /index.html      | Web Server    |
|              | --------------------------------> | (Nginx/Node)  |
|              | <-------------------------------- | Port 443      |
+--------------+      4. HTTP 200 OK + Payload     +---------------+
\`\`\`

---

## 3. The DNS Resolution Pipeline
When a user types \`https://academy.redkross.org.in\` into a browser address bar:
1. **Browser Cache:** The browser checks its internal DNS cache (e.g., \`chrome://net-internals/#dns\`).
2. **OS Resolver Cache & Hosts File:** The OS checks \`/etc/hosts\` (Unix) or \`C:\\Windows\\System32\\drivers\\etc\\hosts\` (Windows).
3. **Recursive Resolver:** The query is forwarded to the ISP or recursive DNS resolver (e.g., Cloudflare \`1.1.1.1\` or Google \`8.8.8.8\`).
4. **Root Nameservers (\`.\`):** Directs the resolver to the Top-Level Domain (TLD) nameservers for \`.in\`.
5. **TLD Nameservers (\`.in\`):** Directs the resolver to the authoritative nameserver for \`redkross.org.in\`.
6. **Authoritative Nameserver:** Returns the A Record (IPv4: \`198.51.100.42\`) or AAAA Record (IPv6).

---

## 4. HTTP vs. HTTPS & TLS Handshake
HTTP transmits data in cleartext plaintext. HTTPS encapsulates HTTP within an encrypted Transport Layer Security (TLS) tunnel:
1. **ClientHello:** The browser sends supported TLS cipher suites and a random nonce.
2. **ServerHello & Certificate:** The server responds with the chosen cipher, its digital certificate (X.509) signed by a Certificate Authority (CA), and public key.
3. **Key Exchange (ECDHE):** Both parties compute a shared symmetric session key using Elliptic-Curve Diffie-Hellman.
4. **Encrypted Communication:** All subsequent HTTP headers, bodies, cookies, and tokens are symmetrically encrypted with AES-GCM or ChaCha20.

---

## 5. Practical Hands-On Exercise
Execute the following cURL command in your terminal to inspect the complete HTTP request and response cycle with verbose connection diagnostics:

\`\`\`bash
curl -Iv https://httpbin.org/get
\`\`\`

Examine the output:
- Identify the IP address and port connected to.
- Locate the TLS handshake details and ALPN protocol negotiation (\`h2\` or \`http/1.1\`).
- Inspect the response headers: \`content-type\`, \`server\`, \`date\`, and \`content-length\`.

---

## 6. Key Takeaways
- DNS translates human-readable hostnames into binary IP addresses through a hierarchical resolution tree.
- HTTPS guarantees Confidentiality, Integrity, and Authentication using TLS certificates.
- Every HTTP transaction consists of a Request line, Headers, optional Body, and corresponding Status Code.

## 7. Documentation & References
- [MDN Web Docs: How the Web Works](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works)
- [RFC 9110: HTTP Semantics](https://datatracker.ietf.org/doc/html/rfc9110)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Deep Dive: Web Networking, DNS & The HTTP Protocol',
        video_duration: '18:45',
        videos: [
          { id: 'vid_m1_l1_1', title: 'How the Web Works: Packets, Routers & DNS', url: '/assets/sample-lesson.mp4', duration: '18:45', quality: '1080p' }
        ],
        images: [
          { id: 'img_m1_l1_1', title: 'DNS Resolution Flowchart', url: '/assets/course-art/art-01.jpg', caption: 'Step-by-step recursive DNS resolution traversal.', alt: 'DNS Architecture Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m1_l2',
        title: 'Web Development Ecosystem & Browser DevTools',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Master Chrome and Firefox Developer Tools: inspecting the live DOM, modifying CSS rules, debugging console scripts, profiling network calls, and auditing web storage.',
        content: `# Web Development Ecosystem & Browser DevTools

## 1. Overview & Learning Objectives
Developer Tools (DevTools) are the primary debugging, profiling, and inspection suite built directly into modern browsers. In this lesson, you will learn:
- How the Browser Rendering Engine parses HTML and builds the DOM tree.
- Inspecting and editing live CSS rules, box models, and element states.
- The DevTools Console for REPL execution, logging, and error tracking.
- The Network tab for inspecting waterfalls, payload transfer sizes, and timing metrics (TTFB).
- The Application tab for managing Cookies, LocalStorage, SessionStorage, and Service Workers.

---

## 2. DevTools Panels Overview
Modern browser DevTools provide specialized panels:
1. **Elements Panel:** Inspects the live Document Object Model (DOM) and active CSS Cascade. Allows real-time live editing of markup and styles.
2. **Console Panel:** Interactive JavaScript REPL. Evaluates code in the current page context and logs warnings, errors, and performance traces.
3. **Sources Panel:** JavaScript breakpoint debugger. Supports step-over (\`F10\`), step-into (\`F11\`), watch expressions, and call stack inspection.
4. **Network Panel:** Comprehensive HTTP telemetry. Displays timeline waterfalls, request payloads, response bodies, and timing breakdown.
5. **Performance Panel:** Flame graphs showing main-thread execution, layout recalculations, scripting, and frame rates (FPS).
6. **Application Panel:** Persistent client storage inspection (\`localStorage\`, \`sessionStorage\`, \`IndexedDB\`, Cookies, Cache Storage).

---

## 3. Network Waterfall Analysis & TTFB
In the Network panel, every asset requested exhibits distinct timing phases:
- **Queueing / Stalled:** Time spent waiting for an available TCP socket (browsers limit to 6 concurrent TCP connections per origin in HTTP/1.1).
- **DNS Lookup:** Resolving domain name to IP.
- **Initial Connection:** TCP 3-way handshake.
- **SSL / TLS Negotiation:** Cryptographic key exchange.
- **Request Sent:** Writing HTTP request headers and body to the socket.
- **Waiting for Server Response (TTFB - Time To First Byte):** Time taken by the server to compute the response and dispatch the initial byte back to the client.
- **Content Download:** Receiving asset bytes over the network wire.

---

## 4. Code Example: DevTools Console Utilities
Modern browser consoles provide built-in command-line APIs for rapid querying:

\`\`\`javascript
// Select the first element matching a selector
const mainHeading = $('h1');

// Select all matching elements as an array (not a NodeList)
const allButtons = $$('button.cta-btn');

// Inspect event listeners attached to an element
getEventListeners(document.body);

// Monitor all function calls in real time
function calculateCartTotal(items) { return items.reduce((a, b) => a + b.price, 0); }
monitor(calculateCartTotal);

// Table formatting for array data
console.table([
  { id: 1, role: 'Frontend', salary: 95000 },
  { id: 2, role: 'Backend', salary: 105000 },
  { id: 3, role: 'DevOps', salary: 115000 }
]);
\`\`\`

---

## 5. Practical Exercise
1. Open DevTools (\`Ctrl+Shift+I\` or \`Cmd+Option+I\`).
2. Go to the **Console** tab and run: \`document.designMode = "on"\`.
3. Click anywhere on the webpage and edit the live text directly in the browser viewport.
4. Go to the **Network** tab, throttle the network speed to **Fast 3G**, and reload the page to observe font display and rendering delays.

---

## 6. Key Takeaways
- DevTools provides direct visibility into both the runtime state of JavaScript and the visual styling of the DOM.
- Monitoring TTFB in the Network tab reveals backend processing latency versus frontend network asset bloat.

## 7. Documentation & References
- [Chrome DevTools Official Documentation](https://developer.chrome.com/docs/devtools/)
- [Firefox Developer Tools Guide](https://firefox-source-docs.mozilla.org/devtools-user/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Mastering Browser DevTools & Performance Profiling',
        video_duration: '22:15',
        videos: [
          { id: 'vid_m1_l2_1', title: 'DevTools Architecture & Network Profiling', url: '/assets/sample-lesson.mp4', duration: '22:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m1_l2_1', title: 'DevTools Network Waterfall', url: '/assets/course-art/art-02.jpg', caption: 'Network waterfall demonstrating TTFB and asset downloads.', alt: 'Network Waterfall Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m1_l3',
        title: 'Setting Up Modern Developer Toolchain (VS Code, Terminal, Extensions)',
        duration: '40 mins',
        is_mandatory: true,
        summary: 'Configure an ergonomic, professional developer workspace using Visual Studio Code, integrated UNIX terminals, Git CLI, Prettier, ESLint, and key developer shortcuts.',
        content: `# Setting Up Modern Developer Toolchain (VS Code, Terminal, Extensions)

## 1. Overview & Learning Objectives
A professional development environment dramatically reduces cognitive overhead, automates code formatting, and catches syntax errors before runtime. In this lesson, you will:
- Configure Visual Studio Code with production-ready settings (\`settings.json\`).
- Install and configure Prettier for automated opinionated formatting.
- Set up ESLint for static code quality analysis and linting.
- Integrate modern command-line shells (Bash, Zsh, PowerShell) with standard UNIX utilities.
- Configure Git global user profiles and default branching structures.

---

## 2. VS Code Production Configuration
The \`.vscode/settings.json\` file controls editor behavior per project. Here is an industry standard configuration:

\`\`\`json
{
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "editor.fontFamily": "'Fira Code', 'Cascadia Code', monospace",
  "editor.fontLigatures": true,
  "editor.bracketPairColorization.enabled": true
}
\`\`\`

---

## 3. Essential VS Code Extensions for Full Stack Developers
- **ESLint:** Integrates JavaScript linting into the editor with inline squiggly underlines.
- **Prettier - Code Formatter:** Enforces consistent indentation, quotes, and line wrapping.
- **GitLens:** Inline Git blame annotations, commit history, and branch visualizers.
- **Tailwind CSS IntelliSense:** Intelligent class autocomplete, linting, and CSS hover previews.
- **Thunder Client / Postman:** Lightweight in-editor GUI for testing HTTP/REST endpoints.

---

## 4. Terminal Command Line Fluency
Mastering terminal commands is essential for full stack workflows:

\`\`\`bash
# Create project folder structure in one command
mkdir -p my-app/{src/{components,utils,styles},public,tests}

# Navigate and inspect directory
cd my-app && ls -la

# Initialize package repository
git init -b main

# Configure global git identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
\`\`\`

---

## 5. Key Takeaways
- Automating code formatting on save prevents stylistic debates and pull request noise.
- The command line interface provides faster, more scriptable control over your system than GUI alternatives.

## 6. Documentation & References
- [VS Code Documentation](https://code.visualstudio.com/docs)
- [Prettier Documentation](https://prettier.io/docs/en/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Building a High-Performance Developer Toolchain',
        video_duration: '16:30',
        videos: [
          { id: 'vid_m1_l3_1', title: 'VS Code, Terminal & Tooling Walkthrough', url: '/assets/sample-lesson.mp4', duration: '16:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m1_l3_1', title: 'Developer Toolchain Architecture', url: '/assets/course-art/art-03.jpg', caption: 'Full stack development environment architecture.', alt: 'Dev Toolchain Flowchart' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m1_l4',
        title: 'Anatomy of Modern Web Applications: Frontend vs Backend vs Database',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Understand the multi-tier architectural layers of full stack web applications: presentation layer (SPA/SSR), application logic layer (REST/GraphQL), and persistence layer (SQL/NoSQL).',
        content: `# Anatomy of Modern Web Applications: Frontend vs Backend vs Database

## 1. Overview & Learning Objectives
Modern web applications are distributed systems divided into clear logical tiers:
- **Presentation Tier (Frontend):** Executes in the user's browser, responsible for UI rendering, user interaction, client-side routing, and state.
- **Application Logic Tier (Backend):** Executes in a secure server environment, handling business logic, authentication, input validation, and transaction orchestration.
- **Data Persistence Tier (Database):** Responsible for ACID transactions, relational integrity (PostgreSQL), or document scalability (MongoDB).

---

## 2. The Three-Tier Architectural Pattern

\`\`\`
[ BROWSER / CLIENT ]
      |
      | HTTP/HTTPS (JSON Payloads, Cookies, Auth Headers)
      v
[ REVERSE PROXY / GATEWAY ] (Nginx / Cloudflare)
      |
      | Internal Network Routing
      v
[ BACKEND APPLICATION SERVER ] (Node.js / Express.js)
      | - JWT Authentication & RBAC Verification
      | - Business Logic Validation
      | - Rate Limiting & Audit Logging
      |
      | TCP Socket (SQL / BSON Wire Protocol)
      v
[ DATABASE CLUSTER ] (PostgreSQL / MongoDB)
\`\`\`

---

## 3. Server-Side Rendering (SSR) vs Single-Page Applications (SPA)
- **Traditional Multi-Page Application (MPA):** Every click requests an entirely new HTML document compiled on the server.
- **Single-Page Application (SPA - React, Vue):** A single initial HTML shell is downloaded. JavaScript dynamically re-renders views by fetching raw JSON data from REST APIs without full page reloads.
- **Hybrid SSR / Hydration (Next.js):** Generates initial HTML on the server for instant First Contentful Paint (FCP) and SEO, then "hydrates" React components client-side for dynamic interaction.

---

## 4. Key Takeaways
- The frontend should never trust user input; the backend must independently validate all data.
- Databases must never be directly exposed to the public internet; only the backend application tier should possess database credentials.

## 5. Documentation & References
- [AWS Web Architecture Guide](https://aws.amazon.com/architecture/)
- [Martin Fowler on Software Architecture](https://martinfowler.com/architecture/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Three-Tier Architecture & Full Stack Mechanics',
        video_duration: '24:00',
        videos: [
          { id: 'vid_m1_l4_1', title: 'System Architecture of Modern Web Apps', url: '/assets/sample-lesson.mp4', duration: '24:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m1_l4_1', title: 'Three-Tier System Diagram', url: '/assets/course-art/art-04.jpg', caption: 'Three-tier architecture diagram mapping data flow.', alt: 'Three-tier architecture' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m1_l5',
        title: 'Responsive Design Principles and Modern Web Standards (W3C/WHATWG)',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Learn the principles of mobile-first responsive web design, standard viewport configurations, fluid grids, flexible media, and the governance of the web by W3C and WHATWG.',
        content: `# Responsive Design Principles and Modern Web Standards (W3C/WHATWG)

## 1. Overview & Learning Objectives
A responsive web design ensures that a web application provides an optimal reading, navigation, and interactive experience across a wide spectrum of devices—from smartphones to 4K desktop displays.
- Understand the 3 foundational pillars of responsive web design (Fluid Grids, Flexible Media, Media Queries).
- The critical role of the \`<meta name="viewport">\` declaration.
- Web standards organizations: W3C (World Wide Web Consortium) and WHATWG (Web Hypertext Application Technology Working Group).

---

## 2. The Viewport Meta Tag
Without the viewport meta tag, mobile browsers render desktop-width pages (typically 980px) and scale them down to fit the screen, resulting in unreadable microscopic text:

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`

- \`width=device-width\`: Sets the page width to follow the screen-width of the device in device-independent pixels (CSS pixels).
- \`initial-scale=1.0\`: Establishes a 1:1 relationship between CSS pixels and device-independent pixels when the page first loads.

---

## 3. The Mobile-First Paradigm
Mobile-first design involves writing the base CSS rules for small screen viewports without media queries, then progressively layering complexity using \`min-width\` queries as viewport real estate expands:

\`\`\`css
/* Base styles (Mobile: 0px to 639px) */
.card-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Tablet Breakpoint (640px and wider) */
@media (min-width: 640px) {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop Breakpoint (1024px and wider) */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
\`\`\`

---

## 4. Key Takeaways
- Mobile-first CSS results in cleaner stylesheets, faster mobile execution, and progressive enhancement.
- Always declare the viewport meta tag in the document \`<head>\`.

## 5. Documentation & References
- [WHATWG HTML Living Standard](https://html.spec.whatwg.org/)
- [MDN Responsive Design Basics](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Mobile-First Responsive Design Strategies',
        video_duration: '20:10',
        videos: [
          { id: 'vid_m1_l5_1', title: 'Responsive Design Principles', url: '/assets/sample-lesson.mp4', duration: '20:10', quality: '1080p' }
        ],
        images: [
          { id: 'img_m1_l5_1', title: 'Responsive Breakpoint Matrix', url: '/assets/course-art/art-05.jpg', caption: 'Fluid viewport scaling and layout adaptations.', alt: 'Responsive Grid Matrix' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m1_l6',
        title: 'Web Performance Fundamentals, Accessibility (a11y) & SEO Basics',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Explore Google Core Web Vitals (LCP, INP, CLS), Web Content Accessibility Guidelines (WCAG 2.2 AA), semantic landmarks, ARIA attributes, and foundational search engine optimization.',
        content: `# Web Performance Fundamentals, Accessibility (a11y) & SEO Basics

## 1. Overview & Learning Objectives
An exceptional web application must be fast, accessible to people with disabilities, and discoverable by search engines. In this lesson, you will master:
- **Core Web Vitals:** Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).
- **Web Accessibility (a11y):** The POUR principles (Perceivable, Operable, Understandable, Robust) of WCAG 2.2.
- **Search Engine Optimization (SEO):** Semantic markup, canonical links, structured schema data, and crawlability.

---

## 2. Core Web Vitals Explained
Google evaluates user experience using three core quantitative metrics:
1. **LCP (Largest Contentful Paint):** Measures loading performance. The largest image, video banner, or text block in the viewport must render within **2.5 seconds** of initial page load.
2. **INP (Interaction to Next Paint):** Measures responsiveness. Tracks the latency of all user interactions (clicks, taps, keypresses) across the entire session lifecycle. Target: under **200 milliseconds**.
3. **CLS (Cumulative Layout Shift):** Measures visual stability. Quantifies unexpected layout movement caused by images without dimension attributes, late-loading ads, or dynamic font swap. Target: under **0.1**.

---

## 3. Web Accessibility (WCAG 2.2 AA)
Accessibility is not optional—it is a legal and ethical requirement:
- **Color Contrast:** Normal text requires a minimum contrast ratio of **4.5:1** against its background; large text requires **3:1**.
- **Keyboard Navigation:** All interactive elements must be focusable using \`Tab\` and activate with \`Enter\` or \`Space\`. Always maintain a visible focus indicator (\`:focus-visible\`).
- **Semantic HTML over ARIA:** The first rule of ARIA is: *Don't use ARIA if a native HTML element already possesses the semantics and behavior.*

\`\`\`html
<!-- Anti-pattern: inaccessible div button -->
<div onclick="submitOrder()">Submit</div>

<!-- Production-grade: native accessible button -->
<button type="button" class="btn-primary">
  Submit Order
</button>
\`\`\`

---

## 4. Key Takeaways
- Prevent Cumulative Layout Shift by always providing explicit \`width\` and \`height\` attributes on \`<img>\` tags.
- Semantic HTML natively delivers accessibility, keyboard navigation, and search engine discoverability.

## 5. Documentation & References
- [Google Web Vitals Documentation](https://web.dev/vitals/)
- [W3C Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Core Web Vitals, Accessibility & SEO Architecture',
        video_duration: '21:30',
        videos: [
          { id: 'vid_m1_l6_1', title: 'Web Vitals & WCAG Compliance', url: '/assets/sample-lesson.mp4', duration: '21:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m1_l6_1', title: 'Core Web Vitals Metric Dashboard', url: '/assets/course-art/art-06.jpg', caption: 'Thresholds for LCP, INP, and CLS performance targets.', alt: 'Web Vitals Dashboard' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      }
    ],
    quiz: {
      id: 'quiz_m1',
      title: 'Module 1: Introduction to Web Development - Comprehensive Assessment',
      passing_score: 80,
      duration_minutes: 20,
      questions: [
        {
          id: 'q_m1_1',
          text: 'What is the primary role of the Domain Name System (DNS) in web networking?',
          options: [
            { id: 'opt_1', text: 'Encrypting HTTP request payloads with TLS certificates', is_correct: false },
            { id: 'opt_2', text: 'Translating human-readable domain names into numerical IP addresses', is_correct: true },
            { id: 'opt_3', text: 'Serving static HTML documents directly to the client browser', is_correct: false },
            { id: 'opt_4', text: 'Balancing server CPU utilization across cluster nodes', is_correct: false }
          ],
          explanation: 'DNS functions as the phonebook of the internet, resolving human-readable hostnames (such as redkross.org.in) into routable IP addresses (such as 198.51.100.42).'
        },
        {
          id: 'q_m1_2',
          text: 'Which protocol handles the reliable transmission of web packets by establishing a 3-way handshake prior to data exchange?',
          options: [
            { id: 'opt_1', text: 'User Datagram Protocol (UDP)', is_correct: false },
            { id: 'opt_2', text: 'Transmission Control Protocol (TCP)', is_correct: true },
            { id: 'opt_3', text: 'Internet Control Message Protocol (ICMP)', is_correct: false },
            { id: 'opt_4', text: 'Simple Mail Transfer Protocol (SMTP)', is_correct: false }
          ],
          explanation: 'TCP guarantees ordered, error-checked delivery of packets between client and server by completing a SYN -> SYN-ACK -> ACK handshake.'
        },
        {
          id: 'q_m1_3',
          text: 'In the HTTP/1.1 protocol, which status code class specifically represents client-side errors such as unauthorized access or missing resources?',
          options: [
            { id: 'opt_1', text: '2xx Status Codes', is_correct: false },
            { id: 'opt_2', text: '3xx Status Codes', is_correct: false },
            { id: 'opt_3', text: '4xx Status Codes', is_correct: true },
            { id: 'opt_4', text: '5xx Status Codes', is_correct: false }
          ],
          explanation: '4xx status codes (e.g. 400 Bad Request, 401 Unauthorized, 404 Not Found) designate client-side errors.'
        },
        {
          id: 'q_m1_4',
          text: 'What default port is used for encrypted HTTPS communication across the public internet?',
          options: [
            { id: 'opt_1', text: 'Port 21', is_correct: false },
            { id: 'opt_2', text: 'Port 80', is_correct: false },
            { id: 'opt_3', text: 'Port 443', is_correct: true },
            { id: 'opt_4', text: 'Port 8080', is_correct: false }
          ],
          explanation: 'Standard unencrypted HTTP traffic operates on port 80, whereas TLS-encrypted HTTPS traffic defaults to port 443.'
        },
        {
          id: 'q_m1_5',
          text: 'What metric in the DevTools Network panel reflects the duration between sending an HTTP request and receiving the first byte of response data from the server?',
          options: [
            { id: 'opt_1', text: 'Cumulative Layout Shift (CLS)', is_correct: false },
            { id: 'opt_2', text: 'Time To First Byte (TTFB)', is_correct: true },
            { id: 'opt_3', text: 'DNS Lookup Delay', is_correct: false },
            { id: 'opt_4', text: 'Content Download Duration', is_correct: false }
          ],
          explanation: 'TTFB measures the latency of network transit plus server-side computation time before the server transmits its initial byte of response data.'
        },
        {
          id: 'q_m1_6',
          text: 'Which Browser DevTools panel is specifically designed to inspect and clear client storage mechanisms such as LocalStorage, IndexedDB, and Cookies?',
          options: [
            { id: 'opt_1', text: 'Application Panel', is_correct: true },
            { id: 'opt_2', text: 'Elements Panel', is_correct: false },
            { id: 'opt_3', text: 'Sources Panel', is_correct: false },
            { id: 'opt_4', text: 'Performance Panel', is_correct: false }
          ],
          explanation: 'The Application panel in Chrome DevTools provides full management and inspection tools for Web Storage, IndexedDB, Cookies, and Cache Storage.'
        },
        {
          id: 'q_m1_7',
          text: 'What is the purpose of the viewport meta tag declaration <meta name="viewport" content="width=device-width, initial-scale=1.0">?',
          options: [
            { id: 'opt_1', text: 'It forces the browser to download high-resolution retina images.', is_correct: false },
            { id: 'opt_2', text: 'It instructs mobile browsers to render the layout viewport matching the actual physical device screen width.', is_correct: true },
            { id: 'opt_3', text: 'It disables JavaScript execution on low-powered mobile devices.', is_correct: false },
            { id: 'opt_4', text: 'It enables strict Content Security Policy (CSP) headers.', is_correct: false }
          ],
          explanation: 'Setting width=device-width and initial-scale=1.0 ensures mobile devices map 1 CSS pixel to 1 device-independent pixel rather than zooming out to 980px desktop mode.'
        },
        {
          id: 'q_m1_8',
          text: 'Which Core Web Vital metric tracks unexpected visual shifts of layout elements while a webpage is actively loading or rendering?',
          options: [
            { id: 'opt_1', text: 'Largest Contentful Paint (LCP)', is_correct: false },
            { id: 'opt_2', text: 'Cumulative Layout Shift (CLS)', is_correct: true },
            { id: 'opt_3', text: 'Interaction to Next Paint (INP)', is_correct: false },
            { id: 'opt_4', text: 'First Input Delay (FID)', is_correct: false }
          ],
          explanation: 'CLS measures visual stability. A score under 0.1 ensures users do not accidentally tap shifted elements or experience jarring layout jumps.'
        },
        {
          id: 'q_m1_9',
          text: 'What minimum contrast ratio is mandated by WCAG 2.2 AA guidelines for standard body text against its background?',
          options: [
            { id: 'opt_1', text: '2:1', is_correct: false },
            { id: 'opt_2', text: '3:1', is_correct: false },
            { id: 'opt_3', text: '4.5:1', is_correct: true },
            { id: 'opt_4', text: '7:1', is_correct: false }
          ],
          explanation: 'WCAG 2.2 Level AA requires at least 4.5:1 contrast for regular text and 3:1 for large text (18pt or 14pt bold).'
        },
        {
          id: 'q_m1_10',
          text: 'In a modern three-tier web architecture, where should strict authorization, business logic validation, and database operations execute?',
          options: [
            { id: 'opt_1', text: 'Exclusively in the client browser via JavaScript', is_correct: false },
            { id: 'opt_2', text: 'On the backend application server tier', is_correct: true },
            { id: 'opt_3', text: 'Inside the DNS nameserver resolver cache', is_correct: false },
            { id: 'opt_4', text: 'In third-party CDN edge nodes only', is_correct: false }
          ],
          explanation: 'Client-side code can be inspected and manipulated by adversaries. The backend server must enforce all business rules, auth checks, and DB mutations.'
        },
        {
          id: 'q_m1_11',
          text: 'What happens during the TLS 1.3 handshake before encrypted application data can be sent?',
          options: [
            { id: 'opt_1', text: 'The client and server exchange asymmetric public keys and compute a shared session key using Diffie-Hellman.', is_correct: true },
            { id: 'opt_2', text: 'The client uploads its local hard drive partition table to the server.', is_correct: false },
            { id: 'opt_3', text: 'The server disables all firewalls and network routing rules.', is_correct: false },
            { id: 'opt_4', text: 'The DNS root nameservers issue a new IPv4 subnet allocation.', is_correct: false }
          ],
          explanation: 'TLS 1.3 utilizes Elliptic-Curve Diffie-Hellman (ECDHE) key exchange along with CA certificate verification to establish an encrypted symmetric session.'
        },
        {
          id: 'q_m1_12',
          text: 'Which HTTP request method is specifically intended to apply partial modifications to an existing resource?',
          options: [
            { id: 'opt_1', text: 'GET', is_correct: false },
            { id: 'opt_2', text: 'PUT', is_correct: false },
            { id: 'opt_3', text: 'PATCH', is_correct: true },
            { id: 'opt_4', text: 'OPTIONS', is_correct: false }
          ],
          explanation: 'While PUT is designed to replace an entire resource entity, PATCH is defined in RFC 5789 for partial modifications.'
        },
        {
          id: 'q_m1_13',
          text: 'In modern front-end tooling, what is the primary role of a linter like ESLint?',
          options: [
            { id: 'opt_1', text: 'Compiling JavaScript directly into machine binary code', is_correct: false },
            { id: 'opt_2', text: 'Analyzing source code statically to detect programming errors, anti-patterns, and style violations', is_correct: true },
            { id: 'opt_3', text: 'Minifying CSS stylesheets for production deployment', is_correct: false },
            { id: 'opt_4', text: 'Managing cloud server container orchestration', is_correct: false }
          ],
          explanation: 'ESLint is a static code analysis tool that identifies potential bugs, security anti-patterns, and formatting issues before code is executed.'
        },
        {
          id: 'q_m1_14',
          text: 'Which web standards organization is officially responsible for maintaining the HTML Living Standard?',
          options: [
            { id: 'opt_1', text: 'IETF (Internet Engineering Task Force)', is_correct: false },
            { id: 'opt_2', text: 'WHATWG (Web Hypertext Application Technology Working Group)', is_correct: true },
            { id: 'opt_3', text: 'IEEE Computer Society', is_correct: false },
            { id: 'opt_4', text: 'ISO Standardization Council', is_correct: false }
          ],
          explanation: 'The WHATWG maintains the canonical HTML Living Standard, defining all modern elements, DOM APIs, and browser processing models.'
        },
        {
          id: 'q_m1_15',
          text: 'What does the target threshold of under 2.5 seconds represent in Core Web Vitals assessment?',
          options: [
            { id: 'opt_1', text: 'Interaction to Next Paint (INP)', is_correct: false },
            { id: 'opt_2', text: 'Largest Contentful Paint (LCP)', is_correct: true },
            { id: 'opt_3', text: 'DNS lookup response duration', is_correct: false },
            { id: 'opt_4', text: 'TLS certificate expiration check', is_correct: false }
          ],
          explanation: 'To provide a good user experience, Google Core Web Vitals targets an LCP of 2.5 seconds or faster from the time the page first starts loading.'
        },
        {
          id: 'q_m1_16',
          text: 'Why is using <button> preferred over <div onclick="..."> for clickable interface triggers?',
          options: [
            { id: 'opt_1', text: 'Native buttons automatically support keyboard focus, Enter/Space activation, and screen reader accessibility.', is_correct: true },
            { id: 'opt_2', text: 'Div elements cannot execute JavaScript event listener callbacks.', is_correct: false },
            { id: 'opt_3', text: 'Buttons render faster in the GPU compositor pipeline.', is_correct: false },
            { id: 'opt_4', text: 'Div elements cannot have CSS styling applied to them.', is_correct: false }
          ],
          explanation: 'Native <button> elements carry built-in accessibility roles, keyboard focusability via Tab, and keypress trigger support without extra custom code.'
        },
        {
          id: 'q_m1_17',
          text: 'What is the primary difference between a Single-Page Application (SPA) and a Traditional Multi-Page Application (MPA)?',
          options: [
            { id: 'opt_1', text: 'SPAs cannot connect to relational SQL databases.', is_correct: false },
            { id: 'opt_2', text: 'SPAs update the UI dynamically by intercepting route changes and fetching JSON data without full page reloads.', is_correct: true },
            { id: 'opt_3', text: 'MPAs do not require an HTTP web server.', is_correct: false },
            { id: 'opt_4', text: 'SPAs only function on mobile mobile operating systems.', is_correct: false }
          ],
          explanation: 'An SPA loads a single HTML page and updates views dynamically via client-side JavaScript routing and API data fetches, avoiding full page reloads.'
        },
        {
          id: 'q_m1_18',
          text: 'Which HTTP response header explicitly instructs browser caches to store a resource for a specified maximum duration in seconds?',
          options: [
            { id: 'opt_1', text: 'Server: Nginx/1.24', is_correct: false },
            { id: 'opt_2', text: 'Cache-Control: public, max-age=31536000', is_correct: true },
            { id: 'opt_3', text: 'Content-Type: text/html', is_correct: false },
            { id: 'opt_4', text: 'Access-Control-Allow-Origin: *', is_correct: false }
          ],
          explanation: 'The Cache-Control header with max-age directive defines the cache lifetime in seconds for browsers and intermediate CDN proxies.'
        },
        {
          id: 'q_m1_19',
          text: 'In mobile-first responsive CSS, which media query parameter is predominantly utilized to scale styles up to larger screens?',
          options: [
            { id: 'opt_1', text: '@media (max-width: ...)', is_correct: false },
            { id: 'opt_2', text: '@media (min-width: ...)', is_correct: true },
            { id: 'opt_3', text: '@media (orientation: portrait)', is_correct: false },
            { id: 'opt_4', text: '@media (monochrome)', is_correct: false }
          ],
          explanation: 'Mobile-first styling writes small-screen styles first and uses @media (min-width: ...) to progressively enhance layouts as viewport width increases.'
        },
        {
          id: 'q_m1_20',
          text: 'What diagnostic tool in Chrome DevTools should you use to locate unhandled JavaScript exceptions, trace call stacks, and inspect console.warn outputs?',
          options: [
            { id: 'opt_1', text: 'The Console Panel', is_correct: true },
            { id: 'opt_2', text: 'The Memory Heap Profiler', is_correct: false },
            { id: 'opt_3', text: 'The Lighthouse Audit Tab', is_correct: false },
            { id: 'opt_4', text: 'The Rendering Settings Tab', is_correct: false }
          ],
          explanation: 'The DevTools Console panel logs all runtime JavaScript errors, warnings, diagnostic log messages, and interactive REPL outputs.'
        }
      ]
    }
  },

  // =========================================================================
  // MODULE 2: HTML5 Fundamentals (6 Lessons, 20 MCQs)
  // =========================================================================
  {
    id: 'mod_2',
    title: 'Module 2: HTML5 Fundamentals',
    description: 'Master modern semantic HTML5 architecture, document outlining, accessible forms with native validation, responsive media handling, microformats, and structured SEO metadata.',
    order: 2,
    assignment: {
      id: 'asg_m2',
      title: 'Practical Assignment: Semantic & Accessible Corporate Landing Page',
      objective: 'Author a complete, semantic HTML5 webpage adhering to W3C standards and WCAG 2.2 accessibility without using generic non-semantic div containers.',
      requirements: [
        'Utilize <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer> tags accurately.',
        'Implement an accessible contact and onboarding form containing text, email, tel, number, select, radio, and file upload fields.',
        'Apply native HTML5 validation attributes: required, pattern (regex), min/max, and custom aria-describedby error states.',
        'Integrate responsive media using <picture> with webp and avif fallbacks and descriptive alt text.',
        'Validate the markup using the official W3C Nu HTML Checker with zero errors.'
      ],
      instructions: '1. Create index.html. 2. Implement complete semantic outline. 3. Validate via validator.w3.org. 4. Submit code and validation report.',
      expected_outcome: 'A production-grade semantic HTML5 document achieving 100% W3C compliance.'
    },
    lessons: [
      {
        id: 'les_m2_l1',
        title: 'Semantic HTML5 Elements & Document Outline Architecture',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Learn the architectural purpose of HTML5 semantic tags: header, nav, main, article, section, aside, and footer, and how screen readers traverse the document tree.',
        content: `# Semantic HTML5 Elements & Document Outline Architecture

## 1. Overview & Learning Objectives
Semantic HTML provides meaning to web content beyond mere visual presentation. In this lesson, you will master:
- The fundamental distinction between semantic tags (\`<header>\`, \`<main>\`, \`<article>\`) and non-semantic tags (\`<div>\`, \`<span>\`).
- How assistive technologies (screen readers like NVDA, VoiceOver) construct landmark navigation trees.
- Establishing an unbroken heading hierarchy (\`<h1>\` through \`<h6>\`).
- Structuring a complete enterprise webpage layout following W3C standards.

---

## 2. Core Semantic Landmark Elements
1. \`<header>\`: Introductory content, masthead branding, logo, and top-level site navigation.
2. \`<nav>\`: A section of navigation links intended for primary site-wide or in-page navigation.
3. \`<main>\`: Represents the dominant, unique content of the \`<body>\`. There must only be **one** visible \`<main>\` element per document.
4. \`<article>\`: A self-contained composition that is independently distributable or reusable (e.g., a blog post, product card, forum thread, or comment).
5. \`<section>\`: A thematic grouping of content, typically with a heading. Represents distinct document chapters or landing page sections.
6. \`<aside>\`: Content tangentially related to the content around it (e.g., sidebars, glossaries, related articles, advertising).
7. \`<footer>\`: Concluding information, copyright notices, terms of service links, and organizational metadata.

---

## 3. Production HTML5 Document Scaffold
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cyber Defense Engineering | RedKross Academy</title>
</head>
<body>
  <header>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <nav aria-label="Primary Navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/curriculum">Curriculum</a></li>
      </ul>
    </nav>
  </header>

  <main id="main-content">
    <article>
      <header>
        <h1>Anatomy of Advanced Persistent Threats (APT)</h1>
        <p>Published on <time datetime="2026-10-31">October 31, 2026</time></p>
      </header>
      <section>
        <h2>Reconnaissance & Weaponization</h2>
        <p>Adversaries establish external telemetry collection prior to intrusion...</p>
      </section>
    </article>
  </main>

  <footer>
    <p>&copy; 2026 RedKross Research Foundation. All rights reserved.</p>
  </footer>
</body>
</html>
\`\`\`

---

## 4. Key Takeaways
- Never use multiple \`<h1>\` elements on a single page unless scoped within isolated document outlines.
- Skip links provide essential keyboard accessibility to bypass repetitive navigation bars.

## 5. Documentation & References
- [MDN HTML Elements Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [W3C Semantic Structure Guide](https://www.w3.org/WAI/tutorials/page-structure/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Semantic HTML5 Landmark Architecture',
        video_duration: '19:40',
        videos: [
          { id: 'vid_m2_l1_1', title: 'Semantic HTML Architecture & Document Trees', url: '/assets/sample-lesson.mp4', duration: '19:40', quality: '1080p' }
        ],
        images: [
          { id: 'img_m2_l1_1', title: 'HTML5 Semantic Tag Hierarchy', url: '/assets/course-art/art-07.jpg', caption: 'Document landmarks and assistive technology outlines.', alt: 'HTML5 Semantic Tree' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m2_l2',
        title: 'Working with Text, Hyperlinks, Lists, and Typography Hierarchy',
        duration: '40 mins',
        is_mandatory: true,
        summary: 'Explore typography tags (p, blockquote, pre, code), ordered and unordered lists, description lists (dl, dt, dd), anchor tags, relative vs absolute links, and target attributes.',
        content: `# Working with Text, Hyperlinks, Lists, and Typography Hierarchy

## 1. Overview & Learning Objectives
Content is the fundamental commodity of the web. In this lesson, you will master:
- Structuring body text with paragraphs (\`<p>\`), blockquotes (\`<blockquote>\`), abbreviations (\`<abbr>\`), and citations (\`<cite>\`).
- The semantic distinction between \`<strong>\` (importance) vs \`<b>\` (stylistic), and \`<em>\` (emphasis) vs \`<i>\` (alternate voice).
- Code blocks with \`<pre>\` and \`<code>\`.
- Ordered (\`<ol>\`), unordered (\`<ul>\`), and definition/description lists (\`<dl>\`, \`<dt>\`, \`<dd>\`).
- Hyperlinks: \`href\` schemes (\`https://\`, \`mailto:\`, \`tel:\`, anchor hashes), and security implications of \`rel="noopener noreferrer"\`.

---

## 2. Text Formatting & Code Semantics
\`\`\`html
<p>To inspect active sockets on a host, execute the <code>netstat</code> utility:</p>

<pre><code class="language-bash">
# Display active listening TCP sockets with process IDs
netstat -tulpn | grep LISTEN
</code></pre>

<blockquote cite="https://datatracker.ietf.org/doc/html/rfc9110">
  <p>HTTP is a stateless request/response protocol that operates by exchanging messages across a reliable transport connection.</p>
  <footer>— <cite>RFC 9110 HTTP Semantics</cite></footer>
</blockquote>
\`\`\`

---

## 3. Anchor Security & Relationship Directives
When opening external links in a new browser tab with \`target="_blank"\`, the target page gains partial access to the opening page via the \`window.opener\` object. This creates a known phishing vulnerability (Reverse Tabnabbing).
Always pair external \`target="_blank"\` links with:
\`\`\`html
<a href="https://external-resource.org" target="_blank" rel="noopener noreferrer">
  External Security Documentation
</a>
\`\`\`
- \`noopener\`: Prevents the new page from accessing \`window.opener\`.
- \`noreferrer\`: Prevents the browser from sending the \`Referer\` header containing your site's URL.

---

## 4. Key Takeaways
- Use \`<dl>\`, \`<dt>\`, and \`<dd>\` for key-value pairs, metadata summaries, and glossaries.
- Always include \`rel="noopener noreferrer"\` on external \`target="_blank"\` links.

## 5. Documentation & References
- [MDN Text Formatting Guide](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Typography, Semantic Lists & Hyperlink Architecture',
        video_duration: '17:20',
        videos: [
          { id: 'vid_m2_l2_1', title: 'Text Formatting & Link Security', url: '/assets/sample-lesson.mp4', duration: '17:20', quality: '1080p' }
        ],
        images: [
          { id: 'img_m2_l2_1', title: 'Typography & Anchor Tree', url: '/assets/course-art/art-08.jpg', caption: 'Text elements and link relationship hierarchy.', alt: 'Typography Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m2_l3',
        title: 'Modern Media: Responsive Images (srcset, picture), Audio, and Video',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Implement modern, performant media delivering WebP/AVIF formats with the picture element, resolution switching using srcset/sizes, and accessible video with WebVTT captions.',
        content: `# Modern Media: Responsive Images (srcset, picture), Audio, and Video

## 1. Overview & Learning Objectives
Images and videos account for over 60% of total transfer bytes across the internet. In this lesson, you will master:
- The \`<img>\` tag with explicit \`width\`, \`height\`, and \`loading="lazy"\` attributes.
- Resolution switching with \`srcset\` and \`sizes\` for high-DPI displays.
- Art direction and next-generation format serving (AVIF, WebP) using the \`<picture>\` element.
- Accessible HTML5 \`<video>\` and \`<audio>\` with \`<track>\` for WebVTT closed captions.

---

## 2. Next-Gen Image Delivery with <picture>
The browser evaluates \`<source>\` tags from top to bottom and loads the first format it supports:

\`\`\`html
<picture>
  <!-- 1. Ultra-compact modern AVIF format -->
  <source srcset="/assets/hero-banner.avif" type="image/avif">
  
  <!-- 2. Widely supported WebP format -->
  <source srcset="/assets/hero-banner.webp" type="image/webp">
  
  <!-- 3. Fallback JPEG for legacy browsers -->
  <img
    src="/assets/hero-banner.jpg"
    alt="Cyber defense analysts collaborating in a high-security monitoring center"
    width="1200"
    height="600"
    loading="lazy"
    decoding="async"
  >
</picture>
\`\`\`

---

## 3. Accessible HTML5 Video with Captions
\`\`\`html
<video controls width="800" height="450" poster="/assets/video-poster.jpg" preload="metadata">
  <source src="/assets/lesson-stream.mp4" type="video/mp4">
  <source src="/assets/lesson-stream.webm" type="video/webm">
  <track src="/assets/captions-en.vtt" kind="subtitles" srclang="en" label="English Captions" default>
  <p>Your browser does not support HTML5 video. <a href="/assets/lesson-stream.mp4">Download MP4</a> instead.</p>
</video>
\`\`\`

---

## 4. Key Takeaways
- Always supply \`width\` and \`height\` aspect ratios to eliminate Cumulative Layout Shift (CLS).
- Always include captions via WebVTT (\`<track>\`) to comply with accessibility mandates.

## 5. Documentation & References
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Modern Responsive Media, AVIF/WebP & Video Subtitles',
        video_duration: '22:00',
        videos: [
          { id: 'vid_m2_l3_1', title: 'Next-Gen Media & Captions Implementation', url: '/assets/sample-lesson.mp4', duration: '22:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m2_l3_1', title: 'Responsive Image Resolution Matrix', url: '/assets/course-art/art-09.jpg', caption: 'Serving AVIF, WebP, and JPEG via srcset.', alt: 'Responsive Image Workflow' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m2_l4',
        title: 'Forms and Input Types, Validation Attributes & Form Accessibility',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Construct complex, accessible web forms featuring modern input types, label associations, fieldset/legend groupings, regex pattern validation, and aria-describedby error states.',
        content: `# Forms and Input Types, Validation Attributes & Form Accessibility

## 1. Overview & Learning Objectives
Forms are the primary interactive vehicle through which users submit data to servers. In this lesson, you will master:
- Form elements: \`<form>\`, \`<input>\`, \`<textarea>\`, \`<select>\`, \`<button>\`.
- Input types: \`text\`, \`email\`, \`password\`, \`tel\`, \`number\`, \`date\`, \`file\`, \`checkbox\`, \`radio\`.
- Native validation attributes: \`required\`, \`min\`, \`max\`, \`minlength\`, \`maxlength\`, \`pattern\`.
- Accessible label binding with \`for\` and \`id\`, and grouping with \`<fieldset>\` and \`<legend>\`.

---

## 2. Accessible Form Implementation
\`\`\`html
<form action="/api/cadet/register" method="POST" novalidate>
  <fieldset>
    <legend>Security Cadet Identification</legend>

    <div class="form-group">
      <label for="cadet-email">Institutional Email Address</label>
      <input
        type="email"
        id="cadet-email"
        name="email"
        required
        autocomplete="email"
        aria-describedby="email-hint"
      >
      <small id="email-hint">Must use your corporate or academic domain.</small>
    </div>

    <div class="form-group">
      <label for="passphrase">Access Passphrase</label>
      <input
        type="password"
        id="passphrase"
        name="password"
        required
        minlength="12"
        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{12,}"
        autocomplete="new-password"
      >
    </div>

    <button type="submit">Complete Enrolment</button>
  </fieldset>
</form>
\`\`\`

---

## 3. Key Takeaways
- Never substitute the \`placeholder\` attribute for an explicit \`<label>\`.
- Native browser validation (\`pattern\`, \`required\`) provides immediate client UX feedback, but must always be duplicated with server-side validation.

## 4. Documentation & References
- [MDN HTML Forms Guide](https://developer.mozilla.org/en-US/docs/Learn/Forms)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Accessible Form Architecture & Native Validation',
        video_duration: '23:45',
        videos: [
          { id: 'vid_m2_l4_1', title: 'Production Forms & Validation Best Practices', url: '/assets/sample-lesson.mp4', duration: '23:45', quality: '1080p' }
        ],
        images: [
          { id: 'img_m2_l4_1', title: 'Accessible Form Field Layout', url: '/assets/course-art/art-10.jpg', caption: 'Form field accessibility and error description bindings.', alt: 'Form Architecture Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m2_l5',
        title: 'HTML5 Tables, Semantic Data Representation & Data Attributes (data-*)',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Design accessible, responsive tabular datasets using table, caption, thead, tbody, tfoot, th (with scope attributes), and embed custom metadata via data-* attributes.',
        content: `# HTML5 Tables, Semantic Data Representation & Data Attributes (data-*)

## 1. Overview & Learning Objectives
Tables represent structured, two-dimensional datasets. In this lesson, you will master:
- Accessible tabular structure: \`<table>\`, \`<caption>\`, \`<thead>\`, \`<tbody>\`, \`<tfoot>\`.
- Associating header cells with data cells using \`<th scope="col">\` and \`<th scope="row">\`.
- Spanning rows and columns with \`colspan\` and \`rowspan\`.
- Embedding custom application metadata using HTML5 \`data-*\` dataset attributes.

---

## 2. Accessible Table Code Example
\`\`\`html
<table class="data-table">
  <caption>Active Cybersecurity Incident Triage Queue</caption>
  <thead>
    <tr>
      <th scope="col">Incident ID</th>
      <th scope="col">Severity</th>
      <th scope="col">Affected Subnet</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr data-incident-id="INC-8091" data-priority="critical">
      <th scope="row">INC-8091</th>
      <td><span class="badge critical">CRITICAL</span></td>
      <td><code>10.240.12.0/24</code></td>
      <td>Active Remediation</td>
    </tr>
  </tbody>
</table>
\`\`\`

---

## 3. Accessing Data Attributes in JavaScript
\`\`\`javascript
const row = document.querySelector('tr[data-incident-id="INC-8091"]');
console.log(row.dataset.incidentId); // "INC-8091"
console.log(row.dataset.priority);   // "critical"
\`\`\`

---

## 4. Key Takeaways
- Never use tables for page layout; tables are strictly for structured tabular data.
- The \`scope\` attribute is essential for screen readers to announce table headers accurately.

## 5. Documentation & References
- [MDN Table Accessibility](https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Advanced)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Accessible Tables & Custom HTML5 Datasets',
        video_duration: '18:15',
        videos: [
          { id: 'vid_m2_l5_1', title: 'Data Tables & Semantic Representation', url: '/assets/sample-lesson.mp4', duration: '18:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m2_l5_1', title: 'Tabular Data Structural Model', url: '/assets/course-art/art-01.jpg', caption: 'Table scopes and caption landmark representation.', alt: 'Table Scope Flowchart' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m2_l6',
        title: 'Meta Tags, Open Graph, SEO Optimization & Web Standards Compliance',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Configure document head metadata for search engines and social platforms: Open Graph, Twitter Cards, canonical tags, favicon packages, and robots directives.',
        content: `# Meta Tags, Open Graph, SEO Optimization & Web Standards Compliance

## 1. Overview & Learning Objectives
The \`<head>\` of an HTML document contains machine-readable metadata governing browser behavior, search indexing, and social preview cards. In this lesson, you will master:
- Essential meta tags: \`charset\`, \`viewport\`, \`description\`, and \`robots\`.
- Social metadata with Open Graph (\`og:title\`, \`og:image\`, \`og:url\`) and Twitter Cards.
- Canonical link tags to prevent duplicate content indexing penalties.
- W3C validation compliance and markup cleanliness.

---

## 2. Production Document Head Metadata
\`\`\`html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Full Stack Web Development | RedKross Academy</title>
  <meta name="description" content="Professional 12-week comprehensive curriculum covering HTML5, CSS3, JavaScript, React, Node.js, Express, and MongoDB.">
  <link rel="canonical" href="https://academy.redkross.org.in/courses/full-stack-web-development">
  <meta name="robots" content="index, follow">

  <!-- Open Graph Protocol -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://academy.redkross.org.in/courses/full-stack-web-development">
  <meta property="og:title" content="Full Stack Web Development: From Fundamentals to Deployment">
  <meta property="og:description" content="Master modern web engineering from raw HTML/CSS through React, Node.js, and cloud deployments.">
  <meta property="og:image" content="https://academy.redkross.org.in/assets/course-art/art-01.jpg">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Full Stack Web Development | RedKross Academy">
</head>
\`\`\`

---

## 3. Key Takeaways
- The canonical tag resolves duplicate URL variations (such as \`?ref=social\` or \`http\` vs \`https\`).
- Social platforms require Open Graph tags to generate rich visual card previews when URLs are shared.

## 4. Documentation & References
- [The Open Graph Protocol](https://ogp.me/)
- [Google Search Central Meta Tags](https://developers.google.com/search/docs/crawling-indexing/special-tags)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'SEO Architecture, Open Graph & Document Head Configuration',
        video_duration: '19:10',
        videos: [
          { id: 'vid_m2_l6_1', title: 'Metadata, SEO & Open Graph Tags', url: '/assets/sample-lesson.mp4', duration: '19:10', quality: '1080p' }
        ],
        images: [
          { id: 'img_m2_l6_1', title: 'Open Graph Social Preview Card', url: '/assets/course-art/art-02.jpg', caption: 'Metadata synthesis creating rich preview cards on social networks.', alt: 'Open Graph Architecture' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      }
    ],
    quiz: {
      id: 'quiz_m2',
      title: 'Module 2: HTML5 Fundamentals - Comprehensive Assessment',
      passing_score: 80,
      duration_minutes: 20,
      questions: [
        {
          id: 'q_m2_1',
          text: 'What is the semantic purpose of the HTML5 <main> element?',
          options: [
            { id: 'opt_1', text: 'To wrap the global site header, navigation bar, and primary logo', is_correct: false },
            { id: 'opt_2', text: 'To encapsulate the dominant, unique content of the document body', is_correct: true },
            { id: 'opt_3', text: 'To contain site-wide copyright notices and privacy policy links', is_correct: false },
            { id: 'opt_4', text: 'To render supplementary sidebar navigation menus', is_correct: false }
          ],
          explanation: 'The <main> tag represents the central content unique to the document, excluding headers, footers, and sidebars.'
        },
        {
          id: 'q_m2_2',
          text: 'How many visible <main> landmark elements should be present in a valid HTML5 document?',
          options: [
            { id: 'opt_1', text: 'Exactly one', is_correct: true },
            { id: 'opt_2', text: 'One per <section> tag', is_correct: false },
            { id: 'opt_3', text: 'An unlimited number', is_correct: false },
            { id: 'opt_4', text: 'At least three', is_correct: false }
          ],
          explanation: 'W3C specifications mandate that an HTML document must have only one non-hidden <main> element to provide an unambiguous landmark for screen readers.'
        },
        {
          id: 'q_m2_3',
          text: 'Which HTML5 element represents a self-contained, independently distributable piece of content such as a blog post or news story?',
          options: [
            { id: 'opt_1', text: '<section>', is_correct: false },
            { id: 'opt_2', text: '<article>', is_correct: true },
            { id: 'opt_3', text: '<aside>', is_correct: false },
            { id: 'opt_4', text: '<div>', is_correct: false }
          ],
          explanation: 'An <article> represents a self-contained composition in a document that is independently reusable, such as a forum post or magazine article.'
        },
        {
          id: 'q_m2_4',
          text: 'Why should external links targeting new tabs (target="_blank") always include rel="noopener noreferrer"?',
          options: [
            { id: 'opt_1', text: 'To prevent the new page from accessing window.opener and performing reverse tabnabbing attacks', is_correct: true },
            { id: 'opt_2', text: 'To force the browser to preload the external domain DNS cache', is_correct: false },
            { id: 'opt_3', text: 'To compress images downloaded from the linked domain', is_correct: false },
            { id: 'opt_4', text: 'To disable JavaScript in the destination tab', is_correct: false }
          ],
          explanation: 'Adding rel="noopener" ensures the new window runs in a separate process and cannot manipulate window.opener to redirect the originating page to a phishing site.'
        },
        {
          id: 'q_m2_5',
          text: 'What HTML5 element should be used to provide multiple image format sources (such as AVIF, WebP, and JPG) for browser compatibility?',
          options: [
            { id: 'opt_1', text: '<figure>', is_correct: false },
            { id: 'opt_2', text: '<picture>', is_correct: true },
            { id: 'opt_3', text: '<canvas>', is_correct: false },
            { id: 'opt_4', text: '<svg>', is_correct: false }
          ],
          explanation: 'The <picture> element wraps multiple <source> elements and a fallback <img> to deliver next-generation image formats based on browser support and media queries.'
        },
        {
          id: 'q_m2_6',
          text: 'What is the consequence of omitting explicit width and height attributes on an <img> element?',
          options: [
            { id: 'opt_1', text: 'The browser fails to load the image completely.', is_correct: false },
            { id: 'opt_2', text: 'The browser cannot calculate the aspect ratio before image bytes arrive, causing Cumulative Layout Shift (CLS).', is_correct: true },
            { id: 'opt_3', text: 'The image is automatically rendered in grayscale.', is_correct: false },
            { id: 'opt_4', text: 'The image becomes invisible to search engine crawlers.', is_correct: false }
          ],
          explanation: 'Explicit width and height allow modern browsers to compute the image aspect ratio and reserve layout space immediately, preventing Cumulative Layout Shift.'
        },
        {
          id: 'q_m2_7',
          text: 'How should a group of mutually exclusive options be configured in an HTML form so that selecting one option unchecks the others?',
          options: [
            { id: 'opt_1', text: 'Use <input type="checkbox"> with matching id values', is_correct: false },
            { id: 'opt_2', text: 'Use <input type="radio"> with identical name attributes', is_correct: true },
            { id: 'opt_3', text: 'Wrap each input in a separate <fieldset> container', is_correct: false },
            { id: 'opt_4', text: 'Use <select multiple>', is_correct: false }
          ],
          explanation: 'Radio buttons sharing the same name attribute form a radio button group where only one option can be checked at a time.'
        },
        {
          id: 'q_m2_8',
          text: 'Which HTML attribute explicitly pairs an input field with its corresponding <label> element for screen readers and click-focus targeting?',
          options: [
            { id: 'opt_1', text: 'The name attribute on the label', is_correct: false },
            { id: 'opt_2', text: 'The for attribute on the label matching the id attribute on the input', is_correct: true },
            { id: 'opt_3', text: 'The class attribute matching on both tags', is_correct: false },
            { id: 'opt_4', text: 'The role="input" attribute', is_correct: false }
          ],
          explanation: 'Setting <label for="my-id"> directly binds the label to <input id="my-id">, enabling screen readers to announce the label upon focus.'
        },
        {
          id: 'q_m2_9',
          text: 'What is the role of the pattern attribute on an HTML5 text input element?',
          options: [
            { id: 'opt_1', text: 'It sets a background watermark image on the input box.', is_correct: false },
            { id: 'opt_2', text: 'It specifies a Regular Expression (regex) that the input value must match to pass form validation.', is_correct: true },
            { id: 'opt_3', text: 'It encrypts the input value using AES-256 before transmission.', is_correct: false },
            { id: 'opt_4', text: 'It restricts the font family used in the input.', is_correct: false }
          ],
          explanation: 'The pattern attribute specifies a JavaScript regular expression that the field value is validated against before form submission.'
        },
        {
          id: 'q_m2_10',
          text: 'In an accessible HTML table, what attribute on <th> elements specifies whether the header applies to a column or a row?',
          options: [
            { id: 'opt_1', text: 'colspan', is_correct: false },
            { id: 'opt_2', text: 'scope="col" or scope="row"', is_correct: true },
            { id: 'opt_3', text: 'headers="all"', is_correct: false },
            { id: 'opt_4', text: 'axis="xy"', is_correct: false }
          ],
          explanation: 'The scope attribute explicitly identifies whether a header cell pertains to a column (col), a row (row), or groups thereof.'
        },
        {
          id: 'q_m2_11',
          text: 'How can developers embed private, custom application metadata directly onto HTML elements without violating W3C validation?',
          options: [
            { id: 'opt_1', text: 'By inventing arbitrary custom attributes like my-custom-data="value"', is_correct: false },
            { id: 'opt_2', text: 'By using data-* attributes (such as data-user-id="123")', is_correct: true },
            { id: 'opt_3', text: 'By embedding inline XML nodes inside table cells', is_correct: false },
            { id: 'opt_4', text: 'By placing JSON strings inside CSS class names', is_correct: false }
          ],
          explanation: 'HTML5 data-* attributes allow storing custom data on standard HTML elements, accessible via the element.dataset JavaScript API.'
        },
        {
          id: 'q_m2_12',
          text: 'What is the purpose of the <track> element inside an HTML5 <video> tag?',
          options: [
            { id: 'opt_1', text: 'Tracking user GPS coordinates during video playback', is_correct: false },
            { id: 'opt_2', text: 'Supplying timed text tracks such as subtitles, closed captions, and audio descriptions in WebVTT format', is_correct: true },
            { id: 'opt_3', text: 'Controlling video playback volume via hardware audio buses', is_correct: false },
            { id: 'opt_4', text: 'Downloading video frames into an IndexedDB cache', is_correct: false }
          ],
          explanation: 'The <track> element specifies WebVTT subtitles, closed captions, chapters, and descriptions for accessible multimedia playback.'
        },
        {
          id: 'q_m2_13',
          text: 'Which Open Graph meta tag defines the thumbnail image displayed when a webpage URL is shared on platforms like LinkedIn or WhatsApp?',
          options: [
            { id: 'opt_1', text: '<meta property="og:image" content="...">', is_correct: true },
            { id: 'opt_2', text: '<meta name="thumbnail" content="...">', is_correct: false },
            { id: 'opt_3', text: '<link rel="preview" href="...">', is_correct: false },
            { id: 'opt_4', text: '<meta property="social:pic" content="...">', is_correct: false }
          ],
          explanation: 'og:image is the standard Open Graph Protocol property used by social scrapers to generate visual link previews.'
        },
        {
          id: 'q_m2_14',
          text: 'What is the role of <link rel="canonical" href="..."> in search engine optimization?',
          options: [
            { id: 'opt_1', text: 'It designates the preferred, authoritative URL for a page to avoid duplicate content penalties.', is_correct: true },
            { id: 'opt_2', text: 'It tells search engines to ignore all backlinks to the website.', is_correct: false },
            { id: 'opt_3', text: 'It forces search engine spiders to re-crawl the page every 60 seconds.', is_correct: false },
            { id: 'opt_4', text: 'It converts the page markup into AMP format automatically.', is_correct: false }
          ],
          explanation: 'A canonical link tells search engines which URL represents the primary master copy when multiple URL parameters point to the same content.'
        },
        {
          id: 'q_m2_15',
          text: 'What semantic tag is designed to wrap a code snippet or machine output together with its preformatted whitespace?',
          options: [
            { id: 'opt_1', text: '<samp> inside <kbd>', is_correct: false },
            { id: 'opt_2', text: '<code> inside <pre>', is_correct: true },
            { id: 'opt_3', text: '<var> inside <abbr>', is_correct: false },
            { id: 'opt_4', text: '<blockquote> inside <span>', is_correct: false }
          ],
          explanation: 'Nesting <code> inside <pre> preserves formatting, indentation, and newlines while indicating code semantics to screen readers.'
        },
        {
          id: 'q_m2_16',
          text: 'Which HTML element should be used to define a list of terms and their corresponding descriptions or key-value pairs?',
          options: [
            { id: 'opt_1', text: 'An unordered list (<ul>) with <li> elements', is_correct: false },
            { id: 'opt_2', text: 'A description list (<dl>) containing <dt> and <dd> elements', is_correct: true },
            { id: 'opt_3', text: 'An ordered list (<ol>) with <label> tags', is_correct: false },
            { id: 'opt_4', text: 'A <table> with only <th> tags', is_correct: false }
          ],
          explanation: 'A description list (<dl>) encloses term (<dt>) and description (<dd>) pairs, ideal for glossaries, dictionaries, and key-value metadata.'
        },
        {
          id: 'q_m2_17',
          text: 'What attribute can be placed on a form or input to prevent the browser from automatically trying to complete user inputs?',
          options: [
            { id: 'opt_1', text: 'autocomplete="off"', is_correct: true },
            { id: 'opt_2', text: 'spellcheck="false"', is_correct: false },
            { id: 'opt_3', text: 'novalidate="true"', is_correct: false },
            { id: 'opt_4', text: 'aria-hidden="true"', is_correct: false }
          ],
          explanation: 'autocomplete="off" indicates to user agents that input values should not be automatically populated from prior user entries.'
        },
        {
          id: 'q_m2_18',
          text: 'What does the aria-describedby attribute achieve on a form input element?',
          options: [
            { id: 'opt_1', text: 'It links the input to an element providing additional instructional help or error text.', is_correct: true },
            { id: 'opt_2', text: 'It replaces the visual label of the input entirely.', is_correct: false },
            { id: 'opt_3', text: 'It converts the input into a readonly field.', is_correct: false },
            { id: 'opt_4', text: 'It automatically copies the input value to the clipboard.', is_correct: false }
          ],
          explanation: 'aria-describedby references the id of an element that describes the control (e.g. error message or format requirement), announced by assistive tech.'
        },
        {
          id: 'q_m2_19',
          text: 'Which HTML tag provides an accessible title or caption for an entire <fieldset> grouping in a form?',
          options: [
            { id: 'opt_1', text: '<caption>', is_correct: false },
            { id: 'opt_2', text: '<legend>', is_correct: true },
            { id: 'opt_3', text: '<label>', is_correct: false },
            { id: 'opt_4', text: '<summary>', is_correct: false }
          ],
          explanation: 'The <legend> element represents a caption for the content of its parent <fieldset>, announced by screen readers when navigating group controls.'
        },
        {
          id: 'q_m2_20',
          text: 'What is the function of the novalidate attribute when applied to a <form> tag?',
          options: [
            { id: 'opt_1', text: 'It turns off backend server data processing completely.', is_correct: false },
            { id: 'opt_2', text: 'It disables the browser\'s native client-side validation bubbles, allowing custom JavaScript validation scripts to handle feedback.', is_correct: true },
            { id: 'opt_3', text: 'It encrypts form values before dispatch.', is_correct: false },
            { id: 'opt_4', text: 'It marks all form inputs as optional.', is_correct: false }
          ],
          explanation: 'novalidate suppresses default browser constraint validation popups so developers can build custom styled validation feedback in JavaScript.'
        }
      ]
    }
  },

  // =========================================================================
  // MODULE 3: CSS3 & Responsive Web Design (7 Lessons, 20 MCQs)
  // =========================================================================
  {
    id: 'mod_3',
    title: 'Module 3: CSS3 & Responsive Web Design',
    description: 'Master CSS cascade specificity, modern Box Model rules, Flexbox layouts, 2D CSS Grid systems, fluid typography with clamp(), custom properties (CSS variables), keyframe animations, and micro-interactions.',
    order: 3,
    assignment: {
      id: 'asg_m3',
      title: 'Practical Assignment: High-Craft Responsive Cyber Defense Dashboard',
      objective: 'Construct a responsive multi-column operations dashboard layout using pure modern CSS (Flexbox + CSS Grid + Custom Properties) without relying on external CSS frameworks.',
      requirements: [
        'Establish a global CSS Custom Property design token architecture (colors, spacing, typography scales).',
        'Implement an asymmetric CSS Grid dashboard layout with auto-fit, minmax(), and named grid areas.',
        'Build a responsive header and card components using Flexbox alignment and gap properties.',
        'Create micro-interactions with hardware-accelerated CSS transforms and cubic-bezier transitions.',
        'Demonstrate seamless responsive reflow across mobile (375px), tablet (768px), and 4K desktop (2560px).'
      ],
      instructions: '1. Create styles.css. 2. Implement CSS Grid template areas. 3. Test responsive reflow. 4. Submit CSS and screenshots.',
      expected_outcome: 'A production-grade, framework-free responsive dashboard layout with 100% fluid reflow.'
    },
    lessons: [
      {
        id: 'les_m3_l1',
        title: 'CSS Selectors, Specificity, Inheritance, and Cascade Rules',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Demystify how browsers calculate CSS specificity weights, cascade layers (@layer), inheritance boundaries, and why !important must be avoided in scalable architectures.',
        content: `# CSS Selectors, Specificity, Inheritance, and Cascade Rules

## 1. Overview & Learning Objectives
CSS (Cascading Style Sheets) determines how elements are styled. The cascade determines which rule wins when multiple rules target the same element. In this lesson, you will master:
- Specificity calculations across four distinct tiers: Inline Styles, IDs, Classes/Attributes/Pseudo-classes, and Elements/Pseudo-elements.
- The CSS Cascade algorithm: Origin, Importance, Specificity, and Source Order.
- Property inheritance and the \`inherit\`, \`initial\`, \`unset\`, and \`revert\` keywords.
- Modern CSS Cascade Layers (\`@layer\`) for explicit style priority control.

---

## 2. Specificity Calculation Weight Matrix
Specificity is represented as a 4-part tuple: \`(a, b, c, d)\`:
- **Tier A (Inline styles):** Applied via \`style=""\` attribute. (1, 0, 0, 0)
- **Tier B (ID Selectors):** \`#cyber-nav\`, \`#hero\`. (0, 1, 0, 0)
- **Tier C (Classes, Attributes, Pseudo-classes):** \`.btn\`, \`[type="text"]\`, \`:hover\`, \`:focus\`. (0, 0, 1, 0)
- **Tier D (Elements, Pseudo-elements):** \`h1\`, \`p\`, \`div\`, \`::before\`, \`::after\`. (0, 0, 0, 1)

\`\`\`css
/* Specificity: (0, 0, 0, 1) */
p { color: gray; }

/* Specificity: (0, 0, 1, 1) - Wins over p */
p.lead { color: black; }

/* Specificity: (0, 1, 1, 1) - Wins over p.lead */
#content p.lead { color: blue; }

/* Specificity: (1, 0, 0, 0) - Wins over #content p.lead */
/* <p class="lead" style="color: red;"> */
\`\`\`

---

## 3. Modern CSS Cascade Layers (@layer)
Cascade layers allow structuring CSS so that layer order takes precedence over selector specificity:

\`\`\`css
@layer reset, base, components, utilities;

@layer base {
  /* Low-priority layer: won't override components even with ID */
  #main-content h1 {
    font-size: 2rem;
  }
}

@layer components {
  /* Higher priority layer */
  .hero-title {
    font-size: 3.5rem;
  }
}
\`\`\`

---

## 4. Key Takeaways
- Higher specificity is an architectural liability; prefer flat class-based selectors (BEM or utility patterns).
- \`!important\` breaks the natural cascade and should be reserved only for critical accessibility overrides.

## 5. Documentation & References
- [MDN CSS Specificity Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
- [W3C CSS Cascading and Inheritance Level 5](https://www.w3.org/TR/css-cascade-5/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'The CSS Cascade, Specificity & Cascade Layers (@layer)',
        video_duration: '21:00',
        videos: [
          { id: 'vid_m3_l1_1', title: 'CSS Cascade Algorithm & Specificity Calculator', url: '/assets/sample-lesson.mp4', duration: '21:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m3_l1_1', title: 'Specificity Calculation Weight Hierarchy', url: '/assets/course-art/art-03.jpg', caption: 'Comparison of Inline, ID, Class, and Element selector weights.', alt: 'Specificity Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m3_l2',
        title: 'Box Model Demystified: Content, Padding, Border, Margin & Box-Sizing',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Deep dive into the CSS Box Model: content-box vs border-box, vertical margin collapsing, inline vs block formatting contexts, and outline vs border.',
        content: `# Box Model Demystified: Content, Padding, Border, Margin & Box-Sizing

## 1. Overview & Learning Objectives
Every element rendered on a webpage is a rectangular box. In this lesson, you will master:
- The four concentric layers of the Box Model: Content, Padding, Border, Margin.
- The standard universal reset: \`box-sizing: border-box\`.
- Margin collapsing rules in vertical block layouts.
- Display modes: \`block\`, \`inline\`, \`inline-block\`, and \`none\`.

---

## 2. content-box vs border-box
- **content-box (Default):** \`width\` and \`height\` apply strictly to the content area. Adding padding or borders expands the element's rendered footprint:
  \`Total Rendered Width = width + padding-left + padding-right + border-left + border-right\`
- **border-box (Industry Standard):** \`width\` and \`height\` encompass content, padding, and border. The content area shrinks automatically to accommodate padding:
  \`Total Rendered Width = width (padding and border are absorbed inside)\`

\`\`\`css
/* The Universal Border-Box Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
\`\`\`

---

## 3. Vertical Margin Collapsing
When two vertical margins touch in standard flow:
- They do not add together; instead, they collapse into a single margin equal to the **largest** of the two margins.
- Margin collapsing occurs between adjacent siblings, between parent and first/last child, and on empty blocks.
- Margin collapsing **never** occurs on Flexbox or Grid items.

---

## 4. Key Takeaways
- Always apply the universal \`box-sizing: border-box\` reset at the root of every project.
- Use \`gap\` in Flexbox and Grid instead of margins to avoid margin collapsing issues.

## 5. Documentation & References
- [MDN The Box Model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'The CSS Box Model, Margin Collapsing & border-box',
        video_duration: '18:50',
        videos: [
          { id: 'vid_m3_l2_1', title: 'Box Model Architecture & Sizing Calculations', url: '/assets/sample-lesson.mp4', duration: '18:50', quality: '1080p' }
        ],
        images: [
          { id: 'img_m3_l2_1', title: 'CSS Box Model Concentric Layers', url: '/assets/course-art/art-04.jpg', caption: 'Content, padding, border, and margin dimensional boundaries.', alt: 'Box Model Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m3_l3',
        title: 'Modern CSS Layouts I: Flexbox Deep Dive (Axes, Alignment, Flex Grow/Shrink)',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Master one-dimensional layouts with Flexible Box Layout: main vs cross axis, justify-content, align-items, flex-direction, flex-wrap, flex-grow, flex-shrink, and flex-basis.',
        content: `# Modern CSS Layouts I: Flexbox Deep Dive (Axes, Alignment, Flex Grow/Shrink)

## 1. Overview & Learning Objectives
CSS Flexible Box Layout (Flexbox) provides a powerful model for distributing space and aligning items along a single dimension (either a row or a column). In this lesson, you will master:
- Main Axis vs Cross Axis determined by \`flex-direction\`.
- Alignment properties: \`justify-content\`, \`align-items\`, \`align-self\`, and \`align-content\`.
- Dynamic sizing calculations: \`flex-grow\`, \`flex-shrink\`, and \`flex-basis\`.
- The \`gap\` property for seamless gutters without margin hacks.

---

## 2. Flexbox Container vs Item Properties

\`\`\`
                    MAIN AXIS (flex-direction: row)
           ------------------------------------------------->
       +---------------------------------------------------------+
       | +-------------+     +-------------+     +-------------+ |
CROSS  | | Flex Item 1 |     | Flex Item 2 |     | Flex Item 3 | |
AXIS   | +-------------+     +-------------+     +-------------+ |
  |    +---------------------------------------------------------+
  v    justify-content aligns along MAIN AXIS
       align-items aligns along CROSS AXIS
\`\`\`

---

## 3. Sizing Mechanics: flex shorthand
\`\`\`css
/* flex: <flex-grow> <flex-shrink> <flex-basis> */
.sidebar {
  /* Does not grow, does not shrink, fixed 300px base */
  flex: 0 0 300px;
}

.main-content {
  /* Grows to fill remaining space, shrinks when crowded, 0 base */
  flex: 1 1 0%;
}
\`\`\`

---

## 4. Key Takeaways
- Flexbox is ideal for one-dimensional layouts (navbars, card internals, toolbars).
- Use \`gap\` instead of margins on child items for clean, responsive spacing.

## 5. Documentation & References
- [MDN Basic Concepts of Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Flexbox Architecture & Alignment Mastery',
        video_duration: '24:15',
        videos: [
          { id: 'vid_m3_l3_1', title: 'Complete Flexbox Deep Dive', url: '/assets/sample-lesson.mp4', duration: '24:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m3_l3_1', title: 'Flexbox Main and Cross Axis Flow', url: '/assets/course-art/art-05.jpg', caption: 'Flex-direction axis orientation and alignment properties.', alt: 'Flexbox Axis Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m3_l4',
        title: 'Modern CSS Layouts II: CSS Grid Architecture (Tracks, Areas, Auto-Placement)',
        duration: '60 mins',
        is_mandatory: true,
        summary: 'Master two-dimensional layouts with CSS Grid: defining explicit and implicit tracks, fractional units (fr), grid-template-areas, auto-fit vs auto-fill, and minmax() calculations.',
        content: `# Modern CSS Layouts II: CSS Grid Architecture (Tracks, Areas, Auto-Placement)

## 1. Overview & Learning Objectives
CSS Grid is a true two-dimensional layout system designed for structuring both rows and columns simultaneously. In this lesson, you will master:
- Defining grid columns and rows with fractional units (\`fr\`).
- Responsive auto-responsive card grids without media queries using \`repeat(auto-fit, minmax(280px, 1fr))\`.
- Visual layout templating using \`grid-template-areas\`.
- Controlling explicit vs implicit grid lines.

---

## 2. The Holy Grail Responsive Grid Without Media Queries
\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}
\`\`\`
- \`auto-fit\`: Automatically calculates the maximum number of columns that can fit into the container.
- \`minmax(280px, 1fr)\`: Each card must be at least 280px wide. If extra space exists, cards expand equally to fill the fractional (\`1fr\`) space.

---

## 3. Named Grid Areas for Application Shells
\`\`\`css
.dashboard-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 70px 1fr 60px;
  grid-template-areas:
    "sidebar header"
    "sidebar main"
    "sidebar footer";
  min-height: 100vh;
}

.dashboard-sidebar { grid-area: sidebar; }
.dashboard-header  { grid-area: header; }
.dashboard-main    { grid-area: main; }
.dashboard-footer  { grid-area: footer; }
\`\`\`

---

## 4. Key Takeaways
- Use CSS Grid for overall page layout and two-dimensional grids.
- Use Flexbox for one-dimensional alignments inside grid items.

## 5. Documentation & References
- [MDN CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Two-Dimensional CSS Grid Systems & Auto-Fit Magic',
        video_duration: '26:00',
        videos: [
          { id: 'vid_m3_l4_1', title: 'CSS Grid Architecture & Template Areas', url: '/assets/sample-lesson.mp4', duration: '26:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m3_l4_1', title: 'CSS Grid Matrix & Track Alignment', url: '/assets/course-art/art-06.jpg', caption: 'Tracks, grid lines, and fractional fr allocation.', alt: 'CSS Grid Blueprint' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m3_l5',
        title: 'Responsive Design with Media Queries, Viewport Units, and Fluid Typography',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Implement modern fluid typography and spacing using clamp(), min(), max(), viewport units (vw, vh, dvh), and standard responsive breakpoints.',
        content: `# Responsive Design with Media Queries, Viewport Units, and Fluid Typography

## 1. Overview & Learning Objectives
Modern responsive design moves beyond rigid breakpoint jumping toward continuous fluid scaling. In this lesson, you will master:
- Fluid typography and spacing using the CSS \`clamp()\` function.
- Modern dynamic viewport units: \`dvh\`, \`lvh\`, \`svh\` resolving mobile browser URL bar bugs.
- Establishing sensible, content-driven responsive breakpoints.

---

## 2. Fluid Typography with clamp()
Instead of writing 5 media queries to change font sizes on different devices, use \`clamp(min, preferred, max)\`:

\`\`\`css
h1 {
  /* Minimum: 2rem (32px), Preferred: 5vw + 1rem, Maximum: 4.5rem (72px) */
  font-size: clamp(2rem, 5vw + 1rem, 4.5rem);
  line-height: 1.1;
}

.container {
  /* Fluid padding that scales with screen width */
  padding: clamp(1rem, 3vw, 3rem);
}
\`\`\`

---

## 3. Dynamic Viewport Height Units (dvh)
On mobile devices (iOS Safari, Android Chrome), the address bar dynamically expands and collapses, causing \`100vh\` elements to overflow the visible screen:
- \`svh\` (Small Viewport Height): Assumes address bar is fully expanded.
- \`lvh\` (Large Viewport Height): Assumes address bar is completely retracted.
- \`dvh\` (Dynamic Viewport Height): Actively tracks the live address bar height in real time.

\`\`\`css
.hero-full-screen {
  min-height: 100dvh; /* Never overflows on mobile! */
}
\`\`\`

---

## 4. Key Takeaways
- Use \`clamp()\` to achieve smooth, mathematically responsive typography without media query clutter.
- Always prefer \`dvh\` over \`vh\` for full-height mobile hero sections.

## 5. Documentation & References
- [CSS Tricks: Simplified Fluid Typography](https://css-tricks.com/simplified-fluid-typography/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Fluid Typography, clamp() & Modern Viewport Units',
        video_duration: '20:40',
        videos: [
          { id: 'vid_m3_l5_1', title: 'Fluid Typography & Modern Mobile Units', url: '/assets/sample-lesson.mp4', duration: '20:40', quality: '1080p' }
        ],
        images: [
          { id: 'img_m3_l5_1', title: 'Fluid Sizing Curve Diagram', url: '/assets/course-art/art-07.jpg', caption: 'Continuous clamp scaling across device widths.', alt: 'Fluid Typography Graph' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m3_l6',
        title: 'Modern CSS Features: Custom Properties (Variables), Pseudo-elements & Functions',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Build a design token architecture with CSS Custom Properties (--primary-color), pseudo-elements (::before, ::after, ::marker), and CSS color functions (color-mix, hsl, oklch).',
        content: `# Modern CSS Features: Custom Properties (Variables), Pseudo-elements & Functions

## 1. Overview & Learning Objectives
CSS Custom Properties enable dynamic, reactive design systems directly in standard CSS. In this lesson, you will master:
- Defining and scoping CSS Custom Properties on \`:root\` and components.
- Runtime property inheritance and JavaScript mutation (\`setProperty\`).
- Generating pseudo-elements with \`::before\` and \`::after\`.
- Modern color spaces: \`oklch()\` for perceptually uniform color palettes.

---

## 2. Design Token Architecture with CSS Variables
\`\`\`css
:root {
  /* Brand Tokens */
  --color-primary: #65F58A;
  --color-primary-glow: rgba(101, 245, 138, 0.25);
  --color-bg-deep: #071018;
  --color-surface: #092218;

  /* Typography Scales */
  --font-family-body: 'Lora', Georgia, serif;
  --font-family-mono: 'JetBrains Mono', monospace;

  /* Spacing Scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
}

/* Dark / Cyber Surface Theming */
.cyber-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-primary);
  box-shadow: 0 0 20px var(--color-primary-glow);
  padding: var(--space-md);
}
\`\`\`

---

## 3. Dynamic Theming via JavaScript
\`\`\`javascript
// Toggle theme tokens in real time
document.documentElement.style.setProperty('--color-primary', '#35E6B5');
\`\`\`

---

## 4. Key Takeaways
- CSS Variables cascade and inherit naturally, unlike SASS/SCSS variables which compile away at build time.
- Custom properties enable instant theme switching with zero runtime bundle overhead.

## 5. Documentation & References
- [MDN Using CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Design Tokens, CSS Custom Properties & Dynamic Theming',
        video_duration: '19:30',
        videos: [
          { id: 'vid_m3_l6_1', title: 'CSS Variables & Modern Design Architecture', url: '/assets/sample-lesson.mp4', duration: '19:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m3_l6_1', title: 'Design Token Cascade Architecture', url: '/assets/course-art/art-08.jpg', caption: 'Custom property inheritance and runtime theming.', alt: 'Token System Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m3_l7',
        title: 'CSS Transitions, Keyframe Animations, Micro-interactions & Transform Matrix',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Animate web interfaces with 60 FPS performance: hardware acceleration (transform, opacity), transition-timing-function (cubic-bezier), keyframe choreographies, and prefers-reduced-motion.',
        content: `# CSS Transitions, Keyframe Animations, Micro-interactions & Transform Matrix

## 1. Overview & Learning Objectives
Intentional motion gives life and tactile polish to web applications. In this lesson, you will master:
- Hardware-accelerated properties: \`transform\` and \`opacity\` running on the GPU compositor thread.
- Smooth transitions with custom easing curves (\`cubic-bezier\`).
- Complex multi-step animations using \`@keyframes\`.
- Respecting user accessibility preferences with \`prefers-reduced-motion\`.

---

## 2. 60 FPS Animation Rules: Compositor vs Layout
- **Expensive (Causes Reflow / Repaint):** Animating \`width\`, \`height\`, \`margin\`, \`top\`, \`left\`. Forces the browser CPU to re-compute geometry for the entire page.
- **Cheap (GPU Composited):** Animating \`transform\` (\`translate\`, \`scale\`, \`rotate\`) and \`opacity\`. Runs entirely on the GPU compositor thread without triggering layout reflows!

\`\`\`css
/* High-performance cyber pulse animation */
@keyframes cyberGlowPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(101, 245, 138, 0.2);
  }
  50% {
    transform: scale(1.02);
    box-shadow: 0 0 30px rgba(101, 245, 138, 0.5);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(101, 245, 138, 0.2);
  }
}

.active-pulse-node {
  animation: cyberGlowPulse 2.5s infinite ease-in-out;
}

/* Mandatory Accessibility: Respect User Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

---

## 3. Key Takeaways
- Only animate \`transform\` and \`opacity\` for silky-smooth 60 frames per second animations.
- Always implement the \`prefers-reduced-motion\` media query to prevent motion sickness for sensitive users.

## 4. Documentation & References
- [Google Web Dev High Performance Animations](https://web.dev/animations-guide/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: '60 FPS CSS Animations, Micro-interactions & GPU Acceleration',
        video_duration: '21:50',
        videos: [
          { id: 'vid_m3_l7_1', title: 'Keyframes, Transforms & Easing Curves', url: '/assets/sample-lesson.mp4', duration: '21:50', quality: '1080p' }
        ],
        images: [
          { id: 'img_m3_l7_1', title: 'Browser Rendering Pipeline', url: '/assets/course-art/art-09.jpg', caption: 'JavaScript -> Style -> Layout -> Paint -> Composite pipeline.', alt: 'GPU Compositing Flowchart' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      }
    ],
    quiz: {
      id: 'quiz_m3',
      title: 'Module 3: CSS3 & Responsive Web Design - Comprehensive Assessment',
      passing_score: 80,
      duration_minutes: 20,
      questions: [
        {
          id: 'q_m3_1',
          text: 'Which selector combination possesses the highest specificity weight according to standard W3C cascade rules?',
          options: [
            { id: 'opt_1', text: 'nav ul li a:hover', is_correct: false },
            { id: 'opt_2', text: '#main-nav a.active', is_correct: true },
            { id: 'opt_3', text: 'div.sidebar.active.highlighted', is_correct: false },
            { id: 'opt_4', text: 'header > nav > ul > li > a', is_correct: false }
          ],
          explanation: '#main-nav a.active contains 1 ID, 1 Class, and 1 Element (0, 1, 1, 1), which easily overrides any number of classes or elements without an ID.'
        },
        {
          id: 'q_m3_2',
          text: 'What is the primary benefit of declaring * { box-sizing: border-box; } across a project stylesheet?',
          options: [
            { id: 'opt_1', text: 'It forces borders to render using hardware-accelerated SVG vectors.', is_correct: false },
            { id: 'opt_2', text: 'Element padding and border widths are absorbed inside the declared width, preventing layout overflow.', is_correct: true },
            { id: 'opt_3', text: 'It prevents all margin collapsing in the vertical flow.', is_correct: false },
            { id: 'opt_4', text: 'It enables CSS Grid auto-placement on inline elements.', is_correct: false }
          ],
          explanation: 'border-box causes the specified width and height to include the content, padding, and border, dramatically simplifying responsive layout math.'
        },
        {
          id: 'q_m3_3',
          text: 'When flex-direction is configured as row, which axis does justify-content align items along?',
          options: [
            { id: 'opt_1', text: 'The Cross Axis (Vertical)', is_correct: false },
            { id: 'opt_2', text: 'The Main Axis (Horizontal)', is_correct: true },
            { id: 'opt_3', text: 'The Z-Index Depth Axis', is_correct: false },
            { id: 'opt_4', text: 'The Viewport Scroll Axis', is_correct: false }
          ],
          explanation: 'justify-content always aligns items along the Main Axis, which runs horizontally when flex-direction is row (or row-reverse).'
        },
        {
          id: 'q_m3_4',
          text: 'What CSS Grid declaration creates an auto-responsive grid where cards wrap into columns of at least 250px without requiring media queries?',
          options: [
            { id: 'opt_1', text: 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));', is_correct: true },
            { id: 'opt_2', text: 'grid-template-columns: 250px 250px 250px;', is_correct: false },
            { id: 'opt_3', text: 'grid-columns: flex-wrap(250px);', is_correct: false },
            { id: 'opt_4', text: 'grid-auto-flow: dense 250px;', is_correct: false }
          ],
          explanation: 'repeat(auto-fit, minmax(250px, 1fr)) dynamically fills available width with as many 250px+ columns as can fit and stretches them equally.'
        },
        {
          id: 'q_m3_5',
          text: 'How does the CSS clamp() function operate in fluid typography declarations like clamp(1.5rem, 4vw, 3rem)?',
          options: [
            { id: 'opt_1', text: 'It randomly selects a font size between 1.5rem and 3rem on each page refresh.', is_correct: false },
            { id: 'opt_2', text: 'It scales smoothly at 4vw, never dropping below 1.5rem and never exceeding 3rem.', is_correct: true },
            { id: 'opt_3', text: 'It clamps the text inside a scrollable overflow box.', is_correct: false },
            { id: 'opt_4', text: 'It forces the text to wrap into three distinct columns.', is_correct: false }
          ],
          explanation: 'clamp(min, preferred, max) guarantees the value scales with the preferred expression (4vw) while bounding it between the minimum and maximum limits.'
        },
        {
          id: 'q_m3_6',
          text: 'Why was the dynamic viewport unit (dvh) introduced to modern CSS specifications?',
          options: [
            { id: 'opt_1', text: 'To adjust viewport calculations based on screen pixel density (DPI)', is_correct: false },
            { id: 'opt_2', text: 'To accurately adapt to mobile browser address bars expanding and retracting dynamically during scrolling', is_correct: true },
            { id: 'opt_3', text: 'To support dual-screen foldable smartphone displays', is_correct: false },
            { id: 'opt_4', text: 'To allow CSS variables to access hardware battery levels', is_correct: false }
          ],
          explanation: 'dvh dynamically recalculates height when mobile browser navigation bars show or hide, eliminating the notorious 100vh overflow bug on mobile browsers.'
        },
        {
          id: 'q_m3_7',
          text: 'What two CSS properties are processed entirely on the GPU compositor thread without triggering expensive layout reflows or repaints?',
          options: [
            { id: 'opt_1', text: 'width and height', is_correct: false },
            { id: 'opt_2', text: 'transform and opacity', is_correct: true },
            { id: 'opt_3', text: 'margin and padding', is_correct: false },
            { id: 'opt_4', text: 'top and left', is_correct: false }
          ],
          explanation: 'transform and opacity can be composited directly by the GPU, bypassing the CPU-heavy Layout and Paint phases to deliver 60fps animations.'
        },
        {
          id: 'q_m3_8',
          text: 'Which CSS media query should be implemented to disable non-essential animations for users with vestibular motion sensitivities?',
          options: [
            { id: 'opt_1', text: '@media (prefers-color-scheme: dark)', is_correct: false },
            { id: 'opt_2', text: '@media (prefers-reduced-motion: reduce)', is_correct: true },
            { id: 'opt_3', text: '@media (inverted-colors: inverted)', is_correct: false },
            { id: 'opt_4', text: '@media (forced-colors: active)', is_correct: false }
          ],
          explanation: 'prefers-reduced-motion detects if the user requested the OS to minimize non-essential animations, fulfilling accessibility requirements.'
        },
        {
          id: 'q_m3_9',
          text: 'What is the syntax for retrieving the value of a declared CSS Custom Property named --brand-accent?',
          options: [
            { id: 'opt_1', text: '$brand-accent', is_correct: false },
            { id: 'opt_2', text: 'var(--brand-accent)', is_correct: true },
            { id: 'opt_3', text: 'prop(--brand-accent)', is_correct: false },
            { id: 'opt_4', text: 'get(--brand-accent)', is_correct: false }
          ],
          explanation: 'CSS Custom Properties are retrieved using the var(--property-name) function, optionally accepting a fallback value.'
        },
        {
          id: 'q_m3_10',
          text: 'What occurs when two adjacent vertical block margins meet in standard document flow?',
          options: [
            { id: 'opt_1', text: 'They add together to create a space equal to their sum.', is_correct: false },
            { id: 'opt_2', text: 'They collapse into a single margin equal to the larger of the two margins.', is_correct: true },
            { id: 'opt_3', text: 'The second element is automatically pushed to the right.', is_correct: false },
            { id: 'opt_4', text: 'The browser logs a CSS rendering warning in the console.', is_correct: false }
          ],
          explanation: 'In vertical flow, adjacent block margins collapse into a single margin whose size is the maximum of the participating margins.'
        },
        {
          id: 'q_m3_11',
          text: 'Which Flexbox property allows a flex item to grow proportionally and consume unused space along the main axis?',
          options: [
            { id: 'opt_1', text: 'flex-shrink', is_correct: false },
            { id: 'opt_2', text: 'flex-grow', is_correct: true },
            { id: 'opt_3', text: 'flex-basis', is_correct: false },
            { id: 'opt_4', text: 'flex-wrap', is_correct: false }
          ],
          explanation: 'flex-grow defines the ability for a flex item to grow if necessary, accepting a unitless proportion of available positive space.'
        },
        {
          id: 'q_m3_12',
          text: 'In CSS Cascade Layers (@layer), how is precedence determined between competing layers?',
          options: [
            { id: 'opt_1', text: 'Layers defined later in source order take precedence over earlier declared layers.', is_correct: true },
            { id: 'opt_2', text: 'The layer with the longest name wins.', is_correct: false },
            { id: 'opt_3', text: 'Layer rules are merged randomly.', is_correct: false },
            { id: 'opt_4', text: 'Earlier layers always permanently lock styles.', is_correct: false }
          ],
          explanation: 'In @layer, the last layer declared in the layer order takes priority, allowing component layers to consistently override reset layers.'
        },
        {
          id: 'q_m3_13',
          text: 'What is the required property on a pseudo-element like ::before or ::after for it to render in the DOM?',
          options: [
            { id: 'opt_1', text: 'display: block', is_correct: false },
            { id: 'opt_2', text: 'content: "" (even if empty)', is_correct: true },
            { id: 'opt_3', text: 'position: absolute', is_correct: false },
            { id: 'opt_4', text: 'z-index: 1', is_correct: false }
          ],
          explanation: 'Pseudo-elements require a content property (such as content: "") to be generated; without it, the browser will not render the pseudo-element.'
        },
        {
          id: 'q_m3_14',
          text: 'What happens to flex items inside a container with flex-wrap: nowrap when their combined widths exceed container width?',
          options: [
            { id: 'opt_1', text: 'They automatically drop down to a new row.', is_correct: false },
            { id: 'opt_2', text: 'They shrink according to their flex-shrink factor, or overflow if shrinking is disabled.', is_correct: true },
            { id: 'opt_3', text: 'The browser hides all items beyond the first.', is_correct: false },
            { id: 'opt_4', text: 'The container switches to display: block.', is_correct: false }
          ],
          explanation: 'Under flex-wrap: nowrap, flex items shrink based on flex-shrink ratios to fit on a single line unless bounded by min-width, in which case they overflow.'
        },
        {
          id: 'q_m3_15',
          text: 'Which CSS Grid property enables referencing visual layout templates such as "header header" "sidebar main"?',
          options: [
            { id: 'opt_1', text: 'grid-template-areas', is_correct: true },
            { id: 'opt_2', text: 'grid-named-matrix', is_correct: false },
            { id: 'opt_3', text: 'grid-area-map', is_correct: false },
            { id: 'opt_4', text: 'grid-template-columns', is_correct: false }
          ],
          explanation: 'grid-template-areas specifies named grid areas, allowing intuitive ASCII-art style layout definitions in CSS.'
        },
        {
          id: 'q_m3_16',
          text: 'What is the primary difference between visibility: hidden and display: none in CSS?',
          options: [
            { id: 'opt_1', text: 'display: none leaves an empty space in the layout; visibility: hidden removes it entirely.', is_correct: false },
            { id: 'opt_2', text: 'visibility: hidden hides the element visually while preserving its layout space; display: none removes it from the layout flow completely.', is_correct: true },
            { id: 'opt_3', text: 'visibility: hidden deletes the element from the DOM tree.', is_correct: false },
            { id: 'opt_4', text: 'display: none only works on images.', is_correct: false }
          ],
          explanation: 'visibility: hidden keeps the box geometry and space in the layout flow, whereas display: none removes the box entirely from layout calculation.'
        },
        {
          id: 'q_m3_17',
          text: 'How can you apply CSS styles specifically when a user navigates to an element via keyboard Tab focus rather than mouse click?',
          options: [
            { id: 'opt_1', text: ':hover', is_correct: false },
            { id: 'opt_2', text: ':focus-visible', is_correct: true },
            { id: 'opt_3', text: ':active', is_correct: false },
            { id: 'opt_4', text: ':visited', is_correct: false }
          ],
          explanation: ':focus-visible applies only when the user interacts using a keyboard or non-pointer device, avoiding unsightly focus rings on mouse clicks.'
        },
        {
          id: 'q_m3_18',
          text: 'What unit represents a fractional share of the available free space in a CSS Grid container?',
          options: [
            { id: 'opt_1', text: 'fr', is_correct: true },
            { id: 'opt_2', text: 'vw', is_correct: false },
            { id: 'opt_3', text: 'rem', is_correct: false },
            { id: 'opt_4', text: 'pct', is_correct: false }
          ],
          explanation: 'The fr unit represents a fraction of the remaining free space in the grid container after fixed tracks and gaps are accounted for.'
        },
        {
          id: 'q_m3_19',
          text: 'Which CSS property defines the default base size of a flex item before remaining space is distributed via flex-grow or flex-shrink?',
          options: [
            { id: 'opt_1', text: 'flex-basis', is_correct: true },
            { id: 'opt_2', text: 'flex-initial', is_correct: false },
            { id: 'opt_3', text: 'flex-width', is_correct: false },
            { id: 'opt_4', text: 'flex-start', is_correct: false }
          ],
          explanation: 'flex-basis sets the initial main size of a flex item before free space is distributed according to flex factors.'
        },
        {
          id: 'q_m3_20',
          text: 'What timing function curve allows creating custom bouncy or elastic acceleration profiles in CSS transitions?',
          options: [
            { id: 'opt_1', text: 'linear', is_correct: false },
            { id: 'opt_2', text: 'cubic-bezier(x1, y1, x2, y2)', is_correct: true },
            { id: 'opt_3', text: 'steps(4)', is_correct: false },
            { id: 'opt_4', text: 'ease-none', is_correct: false }
          ],
          explanation: 'cubic-bezier defines a cubic Bézier easing curve, enabling customized acceleration, deceleration, and elastic overshoot animations.'
        }
      ]
    }
  }
];
