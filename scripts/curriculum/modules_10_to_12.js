// Module 10 to 12 Curriculum Definition
// 20 Lessons, 60 Assessment Questions

export const modules_10_to_12 = [
  // =========================================================================
  // MODULE 10: Authentication & Web Security (7 Lessons, 20 MCQs)
  // =========================================================================
  {
    id: 'mod_10',
    title: 'Module 10: Authentication & Web Security',
    description: 'Master enterprise web defense and access control: OWASP Top 10 vulnerabilities, bcrypt key derivation, JSON Web Tokens (JWT), httpOnly cookies, Role-Based Access Control (RBAC), XSS/CSRF mitigation, rate limiting, and CORS security.',
    order: 10,
    assignment: {
      id: 'asg_m10',
      title: 'Practical Assignment: Zero-Trust Authentication & RBAC Microservice',
      objective: 'Build a secure, defense-in-depth authentication microservice implementing salted bcrypt password hashing, dual JWT token rotation (Access Token + Refresh Token), and role-based route middleware.',
      requirements: [
        'Hash passwords using bcrypt with work factor 12 prior to database insertion.',
        'Issue short-lived signed JWT access tokens (15m expiration) and long-lived refresh tokens stored in httpOnly, secure, sameSite=strict cookies.',
        'Implement an authorization middleware (authorizeRole("admin", "super_admin")) that verifies cryptographic signatures and claims.',
        'Configure express-rate-limit to mitigate brute-force password guessing attacks (5 attempts per 15 minutes per IP).',
        'Add helmet headers and strict CORS configuration whitelist.'
      ],
      instructions: '1. Create authController.js and authMiddleware.js. 2. Implement JWT signing and verify routines. 3. Test token expiry and rate limiting. 4. Submit code and security audit report.',
      expected_outcome: 'A hardened, zero-trust authentication gateway resilient against credential stuffing, token theft, and privilege escalation.'
    },
    lessons: [
      {
        id: 'les_m10_l1',
        title: 'Web Security Fundamentals: OWASP Top 10 Vulnerabilities Explained',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Explore the modern threat landscape: the OWASP Top 10, Broken Access Control, Cryptographic Failures, Injection Attacks, Insecure Design, and Security Misconfiguration.',
        content: `# Web Security Fundamentals: OWASP Top 10 Vulnerabilities Explained

## 1. Overview & Learning Objectives
Security is not an afterthought; it is an architectural foundation. In this lesson, you will master:
- The **OWASP Top 10 Web Application Security Risks**:
  1. A01: Broken Access Control (leading threat)
  2. A02: Cryptographic Failures (sensitive data exposure)
  3. A03: Injection (SQL, NoSQL, OS Command, LDAP)
  4. A04: Insecure Design
  5. A05: Security Misconfiguration
  6. A06: Vulnerable and Outdated Components
  7. A07: Identification and Authentication Failures
  8. A08: Software and Data Integrity Failures
  9. A09: Security Logging and Monitoring Failures
  10. A10: Server-Side Request Forgery (SSRF)
- Threat modeling and defensive programming standards.

---

## 2. Broken Access Control (A01)
Broken Access Control occurs when users can act outside of their intended permissions (e.g. Insecure Direct Object References - IDOR).
Example of an IDOR Vulnerability:
\`\`\`javascript
// VULNERABLE: Student changes cadetId in URL to view another student's record!
app.get('/api/transcripts/:cadetId', async (req, res) => {
  const transcript = await Transcript.findOne({ cadetId: req.params.cadetId });
  res.json(transcript); // No authorization check!
});

// SECURE: Enforce authorization against authenticated token session
app.get('/api/transcripts/:cadetId', verifyAuth, (req, res) => {
  if (req.user.cadetId !== req.params.cadetId && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'FORBIDDEN: Access denied' });
  }
  // Proceed with lookup
});
\`\`\`

---

## 3. Key Takeaways
- Never trust client identity claims without verifying signed session tokens on the server.
- Adopt the Principle of Least Privilege: Grant users and processes only the minimum access necessary.

## 4. Documentation & References
- [OWASP Top 10 Official Documentation](https://owasp.org/www-project-top-ten/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'OWASP Top 10 Deep Dive & Threat Modeling',
        video_duration: '22:30',
        videos: [
          { id: 'vid_m10_l1_1', title: 'OWASP Top 10 Vulnerabilities & Mitigations', url: '/assets/sample-lesson.mp4', duration: '22:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m10_l1_1', title: 'OWASP Top 10 Threat Matrix', url: '/assets/course-art/art-10.jpg', caption: 'Classification of critical web application security risks.', alt: 'OWASP Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m10_l2',
        title: 'Password Hashing and Key Derivation with bcrypt / Argon2',
        duration: '45 mins',
        is_mandatory: true,
        summary: 'Never store plaintext passwords: why fast hashes (MD5, SHA-256) are insecure for passwords, adaptive slow hashing with bcrypt, cryptographic salts, work factors, and timing attack resistance.',
        content: `# Password Hashing and Key Derivation with bcrypt / Argon2

## 1. Overview & Learning Objectives
Storing passwords in plaintext or using fast general-purpose cryptographic hashes (like MD5 or SHA-256) is catastrophic negligence. In this lesson, you will master:
- Why fast hashes fail against modern GPU brute-force attacks (billions of hashes/sec).
- **Adaptive Key Derivation Functions**: \`bcrypt\` and \`Argon2\`.
- The role of cryptographic **Salts** (preventing Rainbow Table attacks).
- Tuning the work factor / cost factor (e.g. 12 rounds = ~250ms computation time).

---

## 2. Password Hashing with bcrypt
\`\`\`javascript
import bcrypt from 'bcrypt';

// 1. Hashing a new password on registration
export async function hashPassword(plainTextPassword) {
  const saltRounds = 12; // Tuned for ~250ms computation on modern servers
  return await bcrypt.hash(plainTextPassword, saltRounds);
}

// 2. Verifying password on login
export async function verifyPassword(inputPassword, storedHash) {
  // Constant-time comparison prevents timing side-channel attacks
  return await bcrypt.compare(inputPassword, storedHash);
}
\`\`\`

---

## 3. How bcrypt Salts Defeat Rainbow Tables
A Rainbow Table is a massive precomputed dictionary of plaintext passwords and their corresponding hashes.
\`bcrypt\` generates a unique cryptographically random 16-byte salt for every user and embeds it into the resulting hash string:
\`$2b$12$e8uqYpI8p9PzJ... (Algorithm: 2b, Cost: 12, Salt: 22 chars, Hash: 31 chars)\`
Because the salt is unique per user, an adversary must re-compute brute-force attempts from scratch for every individual account!

---

## 4. Key Takeaways
- Never invent your own hashing algorithm; always use industry-standard KDFs (bcrypt or Argon2id).
- Tune the cost factor periodically as server hardware accelerates.

## 5. Documentation & References
- [OWASP Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Password Hashing, Salt Derivation & bcrypt Security',
        video_duration: '19:40',
        videos: [
          { id: 'vid_m10_l2_1', title: 'Cryptographic Hashing & bcrypt Architecture', url: '/assets/sample-lesson.mp4', duration: '19:40', quality: '1080p' }
        ],
        images: [
          { id: 'img_m10_l2_1', title: 'bcrypt Salt & Key Derivation Structure', url: '/assets/course-art/art-01.jpg', caption: 'Salt generation and iterative key stretching pipeline.', alt: 'Hashing Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m10_l3',
        title: 'Token-Based Authentication Architecture with JSON Web Tokens (JWT)',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Architect stateless token authentication: JWT structure (Header, Payload, Signature), HMAC-SHA256 vs RSA signing, token expiration, claims, and Bearer authorization headers.',
        content: `# Token-Based Authentication Architecture with JSON Web Tokens (JWT)

## 1. Overview & Learning Objectives
JSON Web Tokens (JWT) are an open, industry-standard (RFC 7519) method for securely representing claims between two parties. In this lesson, you will master:
- The 3-part structure of a JWT: \`Header.Payload.Signature\`.
- Cryptographic signing with symmetric keys (HS256) vs asymmetric key pairs (RS256).
- Standard claims: \`sub\` (subject), \`exp\` (expiration), \`iat\` (issued at), \`iss\` (issuer).
- Generating, signing, and verifying JWTs using \`jsonwebtoken\`.

---

## 2. The JWT Structure Decoded
A JWT consists of three Base64URL-encoded strings separated by dots:

\`\`\`
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.  <--- 1. HEADER (Algorithm & Token Type)
eyJzdWIiOiJ1c3JfMTAxIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzkzNDYwMDAwfQ. <--- 2. PAYLOAD (Claims)
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  <--- 3. SIGNATURE (HMAC-SHA256)
\`\`\`

---

## 3. Signing and Verification Implementation
\`\`\`javascript
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-min-32-chars';

// 1. Sign Token on Login
export function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      cadet_id: user.cadet_id
    },
    JWT_SECRET,
    { expiresIn: '15m' } // Short-lived access token
  );
}

// 2. Authentication Middleware
export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <TOKEN>"

  if (!token) {
    return res.status(401).json({ error: 'UNAUTHORIZED: Missing access token' });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedUser) => {
    if (err) {
      return res.status(403).json({ error: 'FORBIDDEN: Invalid or expired token' });
    }
    req.user = decodedUser; // Attach verified payload to request
    next();
  });
}
\`\`\`

---

## 4. Key Takeaways
- Never put sensitive data (passwords, social security numbers) in a JWT payload; payloads are merely Base64 encoded and readable by anyone!
- Keep access tokens short-lived (15-30 minutes) and use Refresh Tokens for re-issuance.

## 5. Documentation & References
- [RFC 7519: JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519)
- [JWT.io Debugger](https://jwt.io/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'JWT Architecture, Cryptographic Signatures & Verification',
        video_duration: '23:15',
        videos: [
          { id: 'vid_m10_l3_1', title: 'JSON Web Tokens Deep Dive & Auth Middleware', url: '/assets/sample-lesson.mp4', duration: '23:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m10_l3_1', title: 'JWT Three-Part Cryptographic Structure', url: '/assets/course-art/art-02.jpg', caption: 'Header, Payload, and Signature breakdown and verification.', alt: 'JWT Architecture' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m10_l4',
        title: 'Secure Cookie Management (httpOnly, secure, sameSite) & Session Handling',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Protect tokens against theft with secure HTTP cookies: httpOnly flag preventing XSS theft, Secure flag enforcing HTTPS transit, and SameSite (Strict, Lax) mitigating CSRF.',
        content: `# Secure Cookie Management (httpOnly, secure, sameSite) & Session Handling

## 1. Overview & Learning Objectives
Storing authentication tokens in \`localStorage\` leaves them vulnerable to theft via Cross-Site Scripting (XSS). Storing tokens in HTTP-only cookies eliminates this attack vector. In this lesson, you will master:
- The \`Set-Cookie\` response header directives.
- The **httpOnly** flag: Blocks access from JavaScript (\`document.cookie\`).
- The **Secure** flag: Ensures cookies are only transmitted across encrypted HTTPS connections.
- The **SameSite** attribute (\`Strict\`, \`Lax\`, \`None\`): Prevents Cross-Site Request Forgery (CSRF).

---

## 2. Dispatching Hardened HTTP-Only Cookies in Express
\`\`\`javascript
export function setAuthCookie(res, refreshToken) {
  const isProduction = process.env.NODE_ENV === 'production';

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,  // Prevents malicious XSS scripts from reading the cookie
    secure: isProduction, // Enforces transmission strictly over HTTPS
    sameSite: 'strict',   // Completely blocks cross-site request transmission
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days expiration in milliseconds
  });
}
\`\`\`

---

## 3. SameSite Directives Comparison
- \`SameSite=Strict\`: The cookie is **never** sent in cross-site requests (even following regular links from external sites). Maximum security.
- \`SameSite=Lax\` (Default): The cookie is withheld on cross-site subrequests (images, iframes), but sent when a user navigates to the origin site (top-level link).
- \`SameSite=None\`: Cookie is sent across all cross-site contexts (requires \`Secure\` flag).

---

## 4. Key Takeaways
- Always store refresh tokens in \`httpOnly\`, \`secure\`, \`sameSite=strict\` cookies.
- Client-side JavaScript cannot read or steal an \`httpOnly\` cookie, defeating token exfiltration via XSS.

## 5. Documentation & References
- [MDN Using HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Secure HTTP-Only Cookies & CSRF Mitigation',
        video_duration: '20:30',
        videos: [
          { id: 'vid_m10_l4_1', title: 'HTTP-Only Cookies & Cookie Security Flags', url: '/assets/sample-lesson.mp4', duration: '20:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m10_l4_1', title: 'Cookie Security Flags Model', url: '/assets/course-art/art-03.jpg', caption: 'Shielding cookies with httpOnly, Secure, and SameSite=Strict.', alt: 'Cookie Security Matrix' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m10_l5',
        title: 'Role-Based Access Control (RBAC): Protecting Routes and Resources',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Enforce enterprise authorization: defining user roles (Student, Instructor, Admin, Super Admin), granular permissions, hierarchical role inheritance, and Express RBAC middleware guards.',
        content: `# Role-Based Access Control (RBAC): Protecting Routes and Resources

## 1. Overview & Learning Objectives
Authentication verifies **who** a user is; Authorization dictates **what** a user is permitted to do. In this lesson, you will master:
- Role-Based Access Control (RBAC) architectural models.
- Hierarchical role definitions: \`student\` -> \`instructor\` -> \`admin\` -> \`super_admin\`.
- Composable RBAC route guard middleware.
- Preventing Horizontal and Vertical Privilege Escalation.

---

## 2. Reusable RBAC Middleware Guard
\`\`\`javascript
// Middleware factory accepting allowed roles
export function restrictTo(...allowedRoles) {
  return (req, res, next) => {
    // req.user was populated by prior authenticateToken middleware
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'FORBIDDEN',
        message: \`Role '\${req.user.role}' lacks authorization to execute this operation.\`
      });
    }

    next(); // Authorized! Proceed to controller
  };
}
\`\`\`

Usage in Routes:
\`\`\`javascript
// Student or Admin can view curriculum
router.get('/courses/:id', authenticateToken, restrictTo('student', 'admin', 'super_admin'), getCourse);

// Only Super Admin can delete courses or modify grading policies
router.delete('/courses/:id', authenticateToken, restrictTo('super_admin'), deleteCourse);
\`\`\`

---

## 3. Key Takeaways
- Always perform RBAC authorization checks on the server; client-side UI hiding is merely a visual cosmetic aid.
- Deny access by default; explicitly grant permissions only to authorized roles.

## 4. Documentation & References
- [NIST Role Based Access Control Standard](https://csrc.nist.gov/projects/role-based-access-control)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Role-Based Access Control (RBAC) & Route Security',
        video_duration: '21:15',
        videos: [
          { id: 'vid_m10_l5_1', title: 'RBAC Middleware & Privilege Hierarchy', url: '/assets/sample-lesson.mp4', duration: '21:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m10_l5_1', title: 'RBAC Role Hierarchy & Permission Boundaries', url: '/assets/course-art/art-04.jpg', caption: 'Role inheritance and endpoint permission gating.', alt: 'RBAC Permission Matrix' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m10_l6',
        title: 'Defending Against Cross-Site Scripting (XSS), SQL/NoSQL Injection & CSRF',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Neutralize core application vulnerabilities: Reflected and Stored XSS, parameterized SQL queries, NoSQL operator injection sanitization ($gt query poisoning), and CSRF tokens.',
        content: `# Defending Against Cross-Site Scripting (XSS), SQL/NoSQL Injection & CSRF

## 1. Overview & Learning Objectives
Web vulnerabilities allow adversaries to steal accounts and compromise databases. In this lesson, you will master:
- **Cross-Site Scripting (XSS):** Stored, Reflected, and DOM-based XSS attacks.
- **SQL / NoSQL Injection:** How parameterization and sanitization defeat injection.
- **Cross-Site Request Forgery (CSRF):** How attackers exploit ambient credentials.
- Defending applications with automated sanitization tools (DOMPurify, express-mongo-sanitize).

---

## 2. NoSQL Operator Injection Attack & Defense
Adversaries submit JSON objects instead of strings to bypass authentication:

\`\`\`javascript
// VULNERABLE CONTROLLER:
// Attacker sends: { "username": "admin", "password": { "$gt": "" } }
const user = await User.findOne({ username: req.body.username, password: req.body.password });
// Because password is not empty string, query matches and attacker logs in as admin without password!
\`\`\`

Defensive Mitigation:
\`\`\`javascript
import mongoSanitize from 'express-mongo-sanitize';

// Strips out any keys starting with '$' or containing '.'
app.use(mongoSanitize());
\`\`\`

---

## 3. SQL Injection Defense: Parameterized Queries
Never concatenate raw strings into SQL queries. Always use parameterized placeholders:

\`\`\`javascript
// VULNERABLE: String interpolation
await sql\`SELECT * FROM users WHERE email = '\${userInput}'\`; // Injected: ' OR 1=1; --

// SECURE: Parameterized template query
await sql\`SELECT * FROM users WHERE email = \${userInput}\`; // Safely escaped as literal value!
\`\`\`

---

## 4. Key Takeaways
- Never trust user input; always sanitize and validate schemas.
- Use parameterized queries for SQL and schema casting for NoSQL.

## 5. Documentation & References
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Defensive Engineering: Neutralizing XSS, SQLi & NoSQLi',
        video_duration: '23:00',
        videos: [
          { id: 'vid_m10_l6_1', title: 'XSS, Injection & CSRF Defense in Depth', url: '/assets/sample-lesson.mp4', duration: '23:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m10_l6_1', title: 'Injection Defense Parameterization Boundary', url: '/assets/course-art/art-05.jpg', caption: 'Separating SQL/NoSQL code logic from user data parameters.', alt: 'Injection Defense Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m10_l7',
        title: 'Security Hardening with Helmet, Rate Limiting & CORS Configuration',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Harden Express servers for production: Helmet security headers, Cross-Origin Resource Sharing (CORS) whitelists, rate-limiting brute-force defenses, and IP reputation tracking.',
        content: `# Security Hardening with Helmet, Rate Limiting & CORS Configuration

## 1. Overview & Learning Objectives
Hardening reduces the attack surface of production web servers. In this lesson, you will master:
- Injecting security headers with **Helmet** (Content-Security-Policy, HSTS, X-Content-Type-Options).
- Configuring precise **CORS** (Cross-Origin Resource Sharing) origins.
- Preventing brute-force attacks and DDoS with **express-rate-limit**.
- Hiding technology signatures (\`app.disable('x-powered-by')\`).

---

## 2. Hardened Server Configuration
\`\`\`javascript
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();

// 1. Hide Express technology signature
app.disable('x-powered-by');

// 2. Helmet HTTP Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://images.unsplash.com"]
    }
  }
}));

// 3. Strict CORS Origin Whitelist
const allowedOrigins = ['https://academy.redkross.org.in', 'http://localhost:5173'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS Security Policy'));
    }
  },
  credentials: true, // Allow cookies across origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

// 4. Rate Limiting: Max 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests from this IP, please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', apiLimiter);
\`\`\`

---

## 3. Key Takeaways
- Never configure \`cors({ origin: '*' })\` on endpoints that accept credentials or cookies.
- Rate limiting protects authentication routes against automated credential stuffing bots.

## 4. Documentation & References
- [Helmet.js Official Documentation](https://helmetjs.github.io/)
- [MDN Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Production Server Hardening: Helmet, CORS & Rate Limiting',
        video_duration: '21:40',
        videos: [
          { id: 'vid_m10_l7_1', title: 'Hardening Node.js Servers for Production', url: '/assets/sample-lesson.mp4', duration: '21:40', quality: '1080p' }
        ],
        images: [
          { id: 'img_m10_l7_1', title: 'Server Defensive Hardening Layers', url: '/assets/course-art/art-06.jpg', caption: 'Rate limiting -> CORS -> Helmet CSP -> Sanitization layers.', alt: 'Security Defense Layers' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      }
    ],
    quiz: {
      id: 'quiz_m10',
      title: 'Module 10: Authentication & Web Security - Comprehensive Assessment',
      passing_score: 80,
      duration_minutes: 20,
      questions: [
        {
          id: 'q_m10_1',
          text: 'What category is currently ranked as the number one web application security risk according to the OWASP Top 10?',
          options: [
            { id: 'opt_1', text: 'Broken Access Control', is_correct: true },
            { id: 'opt_2', text: 'Cryptographic Failures', is_correct: false },
            { id: 'opt_3', text: 'Injection Attacks', is_correct: false },
            { id: 'opt_4', text: 'Server-Side Request Forgery', is_correct: false }
          ],
          explanation: 'Broken Access Control holds the #1 position in the OWASP Top 10, representing failures to enforce authorization rules on user actions.'
        },
        {
          id: 'q_m10_2',
          text: 'Why are fast cryptographic hashing algorithms like SHA-256 or MD5 considered unsafe for storing user passwords?',
          options: [
            { id: 'opt_1', text: 'Modern GPUs can compute billions of fast hashes per second, allowing offline brute-force attacks to crack passwords rapidly.', is_correct: true },
            { id: 'opt_2', text: 'They cannot be decoded on Linux systems.', is_correct: false },
            { id: 'opt_3', text: 'They produce hashes that are too long for database strings.', is_correct: false },
            { id: 'opt_4', text: 'They automatically corrupt user email addresses.', is_correct: false }
          ],
          explanation: 'Fast hashes are designed for high throughput. Password hashing requires adaptive slow hashes (bcrypt, Argon2) to make brute-forcing computationally prohibitive.'
        },
        {
          id: 'q_m10_3',
          text: 'What are the three components of a JSON Web Token (JWT) separated by periods?',
          options: [
            { id: 'opt_1', text: 'Header, Payload, and Signature', is_correct: true },
            { id: 'opt_2', text: 'Username, Password, and Salt', is_correct: false },
            { id: 'opt_3', text: 'Issuer, Audience, and Scope', is_correct: false },
            { id: 'opt_4', text: 'Client, Server, and Database', is_correct: false }
          ],
          explanation: 'A JWT consists of Header (algorithm & type), Payload (claims), and Signature (cryptographic verification) separated by dots.'
        },
        {
          id: 'q_m10_4',
          text: 'Can an attacker read the user data stored inside the Payload of a JWT token transmitted over the network?',
          options: [
            { id: 'opt_1', text: 'Yes, because the payload is merely Base64URL-encoded (not encrypted); anyone can decode it unless encrypted with JWE.', is_correct: true },
            { id: 'opt_2', text: 'No, because JWTs are automatically encrypted with AES-256.', is_correct: false },
            { id: 'opt_3', text: 'Only if they know the secret signing key.', is_correct: false },
            { id: 'opt_4', text: 'Only on Windows operating systems.', is_correct: false }
          ],
          explanation: 'Standard JWS tokens are signed for integrity, NOT encrypted for confidentiality. The payload is readable by anyone who decodes the Base64URL string.'
        },
        {
          id: 'q_m10_5',
          text: 'What security flag must be set on an authentication cookie to prevent malicious JavaScript (such as XSS scripts) from accessing document.cookie?',
          options: [
            { id: 'opt_1', text: 'httpOnly', is_correct: true },
            { id: 'opt_2', text: 'Secure', is_correct: false },
            { id: 'opt_3', text: 'SameSite=Lax', is_correct: false },
            { id: 'opt_4', text: 'NoScript', is_correct: false }
          ],
          explanation: 'The httpOnly flag prevents client-side scripts from accessing the cookie via document.cookie, mitigating session hijacking via XSS.'
        },
        {
          id: 'q_m10_6',
          text: 'What cookie attribute ensures cookies are transmitted strictly across encrypted HTTPS connections and never sent over cleartext HTTP?',
          options: [
            { id: 'opt_1', text: 'Secure', is_correct: true },
            { id: 'opt_2', text: 'httpOnly', is_correct: false },
            { id: 'opt_3', text: 'Encrypted', is_correct: false },
            { id: 'opt_4', text: 'TLSOnly', is_correct: false }
          ],
          explanation: 'A cookie with the Secure attribute is only sent to the server with an encrypted request over the HTTPS protocol.'
        },
        {
          id: 'q_m10_7',
          text: 'How does SameSite=Strict on a cookie defend against Cross-Site Request Forgery (CSRF) attacks?',
          options: [
            { id: 'opt_1', text: 'The browser refuses to attach the cookie to any cross-origin HTTP request initiated from an external third-party site.', is_correct: true },
            { id: 'opt_2', text: 'It encrypts the entire HTTP payload.', is_correct: false },
            { id: 'opt_3', text: 'It blocks users from clicking external hyperlinks.', is_correct: false },
            { id: 'opt_4', text: 'It forces the user to solve a CAPTCHA on every request.', is_correct: false }
          ],
          explanation: 'SameSite=Strict ensures the cookie is withheld on all cross-site browsing contexts, preventing malicious sites from executing unauthorized actions.'
        },
        {
          id: 'q_m10_8',
          text: 'What is the primary difference between Authentication and Authorization?',
          options: [
            { id: 'opt_1', text: 'Authentication verifies identity (who you are); Authorization verifies permissions (what you are allowed to do).', is_correct: true },
            { id: 'opt_2', text: 'Authentication happens on the database; Authorization happens in the browser.', is_correct: false },
            { id: 'opt_3', text: 'They are identical concepts.', is_correct: false },
            { id: 'opt_4', text: 'Authorization is only needed for financial transactions.', is_correct: false }
          ],
          explanation: 'Authentication proves identity (credentials verification); Authorization determines permissions and access rights (RBAC).'
        },
        {
          id: 'q_m10_9',
          text: 'What attack occurs when an adversary injects malicious JavaScript into a database, which subsequently executes in the browsers of all other users viewing that record?',
          options: [
            { id: 'opt_1', text: 'Stored Cross-Site Scripting (Stored XSS)', is_correct: true },
            { id: 'opt_2', text: 'Reflected Cross-Site Scripting', is_correct: false },
            { id: 'opt_3', text: 'DNS Spoofing', is_correct: false },
            { id: 'opt_4', text: 'SQL Injection', is_correct: false }
          ],
          explanation: 'Stored (persistent) XSS occurs when injected script code is permanently stored on the target server (e.g. in a database) and served to victims.'
        },
        {
          id: 'q_m10_10',
          text: 'How do Parameterized Queries protect SQL databases from SQL Injection attacks?',
          options: [
            { id: 'opt_1', text: 'They separate user input data from SQL code commands, treating user input purely as literal parameters that cannot alter query structure.', is_correct: true },
            { id: 'opt_2', text: 'They convert all SQL tables into MongoDB collections.', is_correct: false },
            { id: 'opt_3', text: 'They delete any queries containing quotation marks.', is_correct: false },
            { id: 'opt_4', text: 'They run queries on a separate virtual machine.', is_correct: false }
          ],
          explanation: 'Parameterized queries compile the SQL statement template before binding data parameters, making it impossible for input to inject new SQL syntax.'
        },
        {
          id: 'q_m10_11',
          text: 'What is NoSQL Operator Injection in MongoDB/Express applications?',
          options: [
            { id: 'opt_1', text: 'When an attacker submits a JSON object containing query operators (like { "$gt": "" }) instead of a string to bypass password checks.', is_correct: true },
            { id: 'opt_2', text: 'When an attacker deletes the MongoDB configuration file.', is_correct: false },
            { id: 'opt_3', text: 'When a database runs out of disk storage space.', is_correct: false },
            { id: 'opt_4', text: 'When an attacker overrides CSS styles with JavaScript.', is_correct: false }
          ],
          explanation: 'If request bodies are not sanitized, attackers can pass MongoDB query operators ($gt, $ne) in place of expected strings to bypass authentication.'
        },
        {
          id: 'q_m10_12',
          text: 'What header can be removed or disabled via app.disable("x-powered-by") in Express to prevent technology fingerprinting?',
          options: [
            { id: 'opt_1', text: 'X-Powered-By: Express', is_correct: true },
            { id: 'opt_2', text: 'Content-Type', is_correct: false },
            { id: 'opt_3', text: 'Cache-Control', is_correct: false },
            { id: 'opt_4', text: 'Authorization', is_correct: false }
          ],
          explanation: 'Disabling X-Powered-By removes the header that advertises to scanners that the application is running on Express.'
        },
        {
          id: 'q_m10_13',
          text: 'What is the role of Helmet middleware in an Express application stack?',
          options: [
            { id: 'opt_1', text: 'It sets secure HTTP response headers (CSP, HSTS, X-Frame-Options) to shield against common web vulnerabilities.', is_correct: true },
            { id: 'opt_2', text: 'It compresses static assets using Brotli.', is_correct: false },
            { id: 'opt_3', text: 'It acts as an automated database backup utility.', is_correct: false },
            { id: 'opt_4', text: 'It manages Docker container scaling.', is_correct: false }
          ],
          explanation: 'Helmet sets security-focused HTTP headers to protect against clickjacking, sniffing, and cross-site scripting.'
        },
        {
          id: 'q_m10_14',
          text: 'What is Cross-Origin Resource Sharing (CORS) primarily designed to achieve?',
          options: [
            { id: 'opt_1', text: 'It is a browser security mechanism that restricts web applications from making HTTP requests to a different domain unless authorized by headers.', is_correct: true },
            { id: 'opt_2', text: 'It is a cloud load balancer algorithm.', is_correct: false },
            { id: 'opt_3', text: 'It compresses video streams for cellular networks.', is_correct: false },
            { id: 'opt_4', text: 'It is a database synchronization protocol.', is_correct: false }
          ],
          explanation: 'CORS enables servers to declare which origins are permitted to access their resources from within a browser environment.'
        },
        {
          id: 'q_m10_15',
          text: 'Why should CORS origin never be configured as wildcard "*" on endpoints that authenticate users with credentials/cookies?',
          options: [
            { id: 'opt_1', text: 'Browsers block credentialed requests with wildcard origins; allowing all origins enables malicious sites to read authenticated user data.', is_correct: true },
            { id: 'opt_2', text: 'Wildcards crash the DNS nameserver.', is_correct: false },
            { id: 'opt_3', text: 'Wildcards cause high CPU usage in Node.js.', is_correct: false },
            { id: 'opt_4', text: 'Wildcards only work with HTTP GET.', is_correct: false }
          ],
          explanation: 'Browsers explicitly disallow Access-Control-Allow-Origin: * when Access-Control-Allow-Credentials is true for security reasons.'
        },
        {
          id: 'q_m10_16',
          text: 'What is the function of Rate Limiting middleware on authentication routes (like /api/login)?',
          options: [
            { id: 'opt_1', text: 'It throttles and restricts request frequency per IP to prevent automated brute-force password guessing and credential stuffing attacks.', is_correct: true },
            { id: 'opt_2', text: 'It limits the user to viewing 5 courses per day.', is_correct: false },
            { id: 'opt_3', text: 'It decreases network packet bandwidth.', is_correct: false },
            { id: 'opt_4', text: 'It closes database connection sockets after 10 seconds.', is_correct: false }
          ],
          explanation: 'Rate limiting caps the number of requests an IP can make in a given timeframe, neutralizing automated brute-force scripts.'
        },
        {
          id: 'q_m10_17',
          text: 'What is an Insecure Direct Object Reference (IDOR) vulnerability?',
          options: [
            { id: 'opt_1', text: 'When an application exposes direct references to database records (e.g. /api/receipts/1042) without verifying if the requesting user owns that record.', is_correct: true },
            { id: 'opt_2', text: 'When an object has no JavaScript methods.', is_correct: false },
            { id: 'opt_3', text: 'When a database table has no primary key.', is_correct: false },
            { id: 'opt_4', text: 'When a CSS stylesheet has broken image links.', is_correct: false }
          ],
          explanation: 'IDOR occurs when user-supplied input is used to access objects directly without an authorization check verifying ownership.'
        },
        {
          id: 'q_m10_18',
          text: 'In JWT token architecture, why is the dual-token pattern (short-lived Access Token + long-lived Refresh Token) recommended?',
          options: [
            { id: 'opt_1', text: 'If an access token is intercepted, its damage window is limited to minutes; refresh tokens can be revoked in the database upon security alerts.', is_correct: true },
            { id: 'opt_2', text: 'Because single tokens cannot store strings.', is_correct: false },
            { id: 'opt_3', text: 'To allow users to log in without a password.', is_correct: false },
            { id: 'opt_4', text: 'It is required by the HTTP/1.1 specification.', is_correct: false }
          ],
          explanation: 'Short-lived access tokens minimize exposure if stolen, while revocable refresh tokens provide seamless re-authentication without frequent logins.'
        },
        {
          id: 'q_m10_19',
          text: 'What security header instructs web browsers to only communicate with a domain over HTTPS and never use unencrypted HTTP for future requests?',
          options: [
            { id: 'opt_1', text: 'Strict-Transport-Security (HSTS)', is_correct: true },
            { id: 'opt_2', text: 'X-Frame-Options', is_correct: false },
            { id: 'opt_3', text: 'Content-Security-Policy', is_correct: false },
            { id: 'opt_4', text: 'X-Content-Type-Options', is_correct: false }
          ],
          explanation: 'HSTS ensures browsers automatically upgrade all future requests to HTTPS, preventing SSL-stripping man-in-the-middle attacks.'
        },
        {
          id: 'q_m10_20',
          text: 'What does a Content Security Policy (CSP) header control in web browsers?',
          options: [
            { id: 'opt_1', text: 'It defines an allowlist of approved domains and protocols from which scripts, styles, images, and fonts are permitted to load and execute.', is_correct: true },
            { id: 'opt_2', text: 'It limits the number of CSS classes on a page.', is_correct: false },
            { id: 'opt_3', text: 'It forces search engines to index images.', is_correct: false },
            { id: 'opt_4', text: 'It verifies user passwords with the server.', is_correct: false }
          ],
          explanation: 'CSP is an effective defense-in-depth standard that restricts which scripts, styles, and assets the browser is allowed to fetch and run.'
        }
      ]
    }
  },

  // =========================================================================
  // MODULE 11: Git, Testing & Deployment (6 Lessons, 20 MCQs)
  // =========================================================================
  {
    id: 'mod_11',
    title: 'Module 11: Git, Testing & Deployment',
    description: 'Master enterprise software delivery: professional Git branching workflows, unit testing with Vitest/Jest, backend integration testing with Supertest, automated CI/CD pipelines via GitHub Actions, Docker containerization, and production cloud deployments.',
    order: 11,
    assignment: {
      id: 'asg_m11',
      title: 'Practical Assignment: Automated CI/CD Pipeline & Docker Containerization',
      objective: 'Author a complete automated testing suite and Continuous Integration (CI/CD) GitHub Actions workflow that builds, lints, tests, and packages a full stack application into a Docker container.',
      requirements: [
        'Write unit tests for frontend React components using Vitest and React Testing Library.',
        'Write automated API integration tests for Express routes using Supertest.',
        'Create a multi-stage production Dockerfile optimizing image layer caching and reducing final image size (<150MB).',
        'Configure a GitHub Actions workflow (.github/workflows/deploy.yml) that executes linting, runs test suites, and validates builds on pull requests.',
        'Document production deployment strategies (Vercel, Cloudflare Tunnels, Reverse Proxies).'
      ],
      instructions: '1. Create tests/ and Dockerfile. 2. Configure GitHub Actions workflow. 3. Verify test coverage report (>80%). 4. Submit pipeline configuration and test results.',
      expected_outcome: 'A fully automated continuous integration pipeline verifying code quality on every push.'
    },
    lessons: [
      {
        id: 'les_m11_l1',
        title: 'Professional Git Workflows: Branching Strategies, Pull Requests & Merge Conflicts',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Collaborate like a senior engineering team: Git feature branch workflows, resolving three-way merge conflicts, interactive rebasing (git rebase -i), and pull request code reviews.',
        content: `# Professional Git Workflows: Branching Strategies, Pull Requests & Merge Conflicts

## 1. Overview & Learning Objectives
Git is the universal distributed version control system for software development. In this lesson, you will master:
- Feature Branch and Trunk-Based development workflows.
- Merging strategies: Merge Commit (\`git merge\`), Fast-Forward, and Squash Merging.
- Resolving complex three-way merge conflicts.
- Interactive rebasing (\`git rebase -i\`) for clean, atomic commit histories.

---

## 2. Resolving Merge Conflicts Cleanly
A merge conflict occurs when two branches modify the exact same lines of code:

\`\`\`
<<<<<<< HEAD (Current Branch - main)
const API_BASE_URL = 'https://api.redkross.org.in/v2';
=======
const API_BASE_URL = 'https://api-staging.redkross.org.in/v2';
>>>>>>> feature/telemetry-upgrade (Incoming Branch)
\`\`\`

Resolution steps:
1. Examine both implementations and consult with collaborating developers.
2. Manually edit the file to preserve the correct unified logic.
3. Remove the conflict marker lines (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`).
4. Stage and commit:
\`\`\`bash
git add src/config/api.js
git commit -m "fix(config): resolve API endpoint conflict between main and staging"
\`\`\`

---

## 3. Key Takeaways
- Never commit secrets or \`.env\` files to Git repositories; always maintain a strict \`.gitignore\`.
- Keep commits small, focused, and atomic with conventional commit messages (\`feat:\`, \`fix:\`, \`refactor:\`).

## 4. Documentation & References
- [Git Pro Book (Official)](https://git-scm.com/book/en/v2)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Git Branching Strategies & Merge Conflict Mastery',
        video_duration: '21:30',
        videos: [
          { id: 'vid_m11_l1_1', title: 'Git Workflows, Rebasing & Resolving Conflicts', url: '/assets/sample-lesson.mp4', duration: '21:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m11_l1_1', title: 'Git Branching & Pull Request Architecture', url: '/assets/course-art/art-07.jpg', caption: 'Feature branch branching off main and merging via pull request.', alt: 'Git Branch Flow' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m11_l2',
        title: 'Automated Unit Testing with Jest / Vitest & Component Testing with React Testing Library',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Write rock-solid automated tests: Vitest test runner, assertion matchers (expect), mocking dependencies (vi.fn, vi.mock), and testing React components from the user perspective.',
        content: `# Automated Unit Testing with Jest / Vitest & Component Testing with React Testing Library

## 1. Overview & Learning Objectives
Automated testing gives engineers confidence to refactor and ship features without regressions. In this lesson, you will master:
- The Testing Pyramid: Unit, Integration, and End-to-End (E2E) tests.
- Modern fast testing with **Vitest**.
- React component testing with **React Testing Library** (RTL).
- Querying elements by user-facing accessibility roles (\`getByRole\`, \`getByText\`).

---

## 2. React Component Test Example
\`\`\`javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CourseCard } from '../components/CourseCard';

describe('<CourseCard />', () => {
  const mockCourse = {
    title: 'Full Stack Web Development',
    difficulty: 'Intermediate',
    price: 0
  };

  it('renders course title and Free tuition badge', () => {
    render(<CourseCard course={mockCourse} />);

    // Query by accessible role and text
    expect(screen.getByRole('heading', { level: 3, name: /Full Stack Web Development/i })).toBeInTheDocument();
    expect(screen.getByText(/Free/i)).toBeInTheDocument();
  });

  it('triggers onEnroll callback when Enroll button is clicked', () => {
    const handleEnroll = vi.fn();
    render(<CourseCard course={mockCourse} onEnroll={handleEnroll} />);

    const enrollButton = screen.getByRole('button', { name: /Enroll Now/i });
    fireEvent.click(enrollButton);

    expect(handleEnroll).toHaveBeenCalledTimes(1);
  });
});
\`\`\`

---

## 3. Key Takeaways
- Test components like a user interacts with them, avoiding testing internal implementation details.
- Query elements using accessibility roles (\`getByRole\`) to ensure your tests enforce accessibility.

## 4. Documentation & References
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Documentation](https://vitest.dev/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Automated Unit & Component Testing with Vitest & RTL',
        video_duration: '23:00',
        videos: [
          { id: 'vid_m11_l2_1', title: 'Vitest, React Testing Library & Mocking', url: '/assets/sample-lesson.mp4', duration: '23:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m11_l2_1', title: 'The Software Testing Pyramid', url: '/assets/course-art/art-08.jpg', caption: 'Unit tests at the base, integration tests in the middle, E2E tests at the apex.', alt: 'Testing Pyramid' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m11_l3',
        title: 'Integration Testing for Backend APIs using Supertest',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Test Express REST endpoints end-to-end: mounting Express apps in Supertest, asserting HTTP status codes and JSON payloads, testing protected routes with auth headers, and database mocking.',
        content: `# Integration Testing for Backend APIs using Supertest

## 1. Overview & Learning Objectives
Integration testing verifies that routes, middleware, controllers, and databases cooperate correctly. In this lesson, you will master:
- Supertest setup without starting live network ports.
- Testing HTTP response codes (200, 201, 400, 401, 404).
- Testing authenticated routes with mock JWT bearer tokens.
- Setting up in-memory databases (mongodb-memory-server) for isolated test runs.

---

## 2. Supertest Integration Test Suite
\`\`\`javascript
import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../server.js';

describe('POST /api/courses', () => {
  it('returns 401 Unauthorized when no Bearer token is provided', async () => {
    const res = await request(app)
      .post('/api/courses')
      .send({ title: 'Hacking 101' });

    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/Missing access token/i);
  });

  it('creates course and returns 201 Created when called by super_admin', async () => {
    const adminToken = 'valid-super-admin-mock-jwt';

    const res = await request(app)
      .post('/api/courses')
      .set('Authorization', \`Bearer \${adminToken}\`)
      .send({
        title: 'Cloud Security Architecture',
        slug: 'cloud-security-architecture',
        category: 'Backend',
        difficulty: 'Advanced',
        price: 0
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.course.title).toBe('Cloud Security Architecture');
  });
});
\`\`\`

---

## 3. Key Takeaways
- Export \`app\` from \`server.js\` without calling \`app.listen()\` so Supertest can manage ephemeral test sockets.
- Reset mock data between test suites using \`beforeEach\` and \`afterEach\` hooks.

## 4. Documentation & References
- [Supertest GitHub Documentation](https://github.com/ladjs/supertest)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'API Integration Testing with Supertest & Express',
        video_duration: '21:15',
        videos: [
          { id: 'vid_m11_l3_1', title: 'Supertest API Testing & Mock Databases', url: '/assets/sample-lesson.mp4', duration: '21:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m11_l3_1', title: 'Supertest Request Lifecycle', url: '/assets/course-art/art-09.jpg', caption: 'Direct in-memory HTTP simulation against Express router stack.', alt: 'Supertest Flowchart' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m11_l4',
        title: 'Continuous Integration and Continuous Deployment (CI/CD) with GitHub Actions',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Automate build and deployment pipelines: GitHub Actions workflows (.github/workflows), runners, action steps (actions/checkout, actions/setup-node), running tests, and automatic deployment triggers.',
        content: `# Continuous Integration and Continuous Deployment (CI/CD) with GitHub Actions

## 1. Overview & Learning Objectives
Continuous Integration (CI) and Continuous Deployment (CD) automate testing and deployment on every code commit. In this lesson, you will master:
- Creating GitHub Actions workflow manifests in \`.github/workflows/deploy.yml\`.
- Triggers: \`push\` to \`main\`, \`pull_request\`, and manual dispatch.
- Matrix builds across multiple Node versions.
- Storing and referencing encrypted repository secrets (\`secrets.DATABASE_URL\`, \`secrets.VERCEL_TOKEN\`).

---

## 2. Production CI/CD Workflow Manifest (.github/workflows/ci.yml)
\`\`\`yaml
name: RedKross Academy CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  audit-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node.js Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Deterministic Dependency Install
        run: npm ci

      - name: Lint Code Quality
        run: npm run lint

      - name: Run Automated Test Suites
        run: npm test

      - name: Build Production Distribution
        run: npm run build
\`\`\`

---

## 3. Key Takeaways
- Branch protection rules in GitHub should mandate that the CI pipeline passes before a pull request can be merged into \`main\`.
- Never expose API keys or passwords in workflow files; always inject them via GitHub Repository Secrets.

## 4. Documentation & References
- [GitHub Actions Documentation](https://docs.github.com/en/actions)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'GitHub Actions CI/CD Pipeline Automation',
        video_duration: '21:00',
        videos: [
          { id: 'vid_m11_l4_1', title: 'Automated CI/CD Workflows with GitHub Actions', url: '/assets/sample-lesson.mp4', duration: '21:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m11_l4_1', title: 'CI/CD Pipeline Sequence Flow', url: '/assets/course-art/art-10.jpg', caption: 'Git Push -> Lint -> Test -> Build -> Deploy to Cloud.', alt: 'CI/CD Flowchart' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m11_l5',
        title: 'Containerizing Full Stack Applications with Docker & Docker Compose',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Package applications into portable containers: Docker images, containers, multi-stage Dockerfiles for lean production sizes, .dockerignore, and Docker Compose for orchestrating Node + MongoDB services.',
        content: `# Containerizing Full Stack Applications with Docker & Docker Compose

## 1. Overview & Learning Objectives
"It works on my machine" is solved by containerization. Docker bundles an application with its runtime, system tools, and libraries into a portable image. In this lesson, you will master:
- Docker concepts: Images vs Containers.
- Writing multi-stage production Dockerfiles to minimize image size (<150MB).
- Managing multi-container applications (Node.js API + MongoDB) with \`docker-compose.yml\`.
- Persistent data volumes for databases.

---

## 2. Multi-Stage Production Dockerfile
\`\`\`dockerfile
# Stage 1: Build & Dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Lean Production Runtime (<150MB)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server ./server

USER node
EXPOSE 4000
CMD ["node", "server/index.js"]
\`\`\`

---

## 3. Docker Compose Orchestration (docker-compose.yml)
\`\`\`yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "4000:4000"
    environment:
      - PORT=4000
      - MONGO_URI=mongodb://mongo:27017/redkross_academy
    depends_on:
      - mongo

  mongo:
    image: mongo:7.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
\`\`\`

---

## 4. Key Takeaways
- Multi-stage builds keep development dependencies, build compilers, and source code out of the final production image.
- Always run Docker containers as non-root users (\`USER node\`) for container security.

## 5. Documentation & References
- [Docker Official Documentation](https://docs.docker.com/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Docker Containerization & Docker Compose Orchestration',
        video_duration: '23:45',
        videos: [
          { id: 'vid_m11_l5_1', title: 'Docker, Multi-Stage Builds & Compose', url: '/assets/sample-lesson.mp4', duration: '23:45', quality: '1080p' }
        ],
        images: [
          { id: 'img_m11_l5_1', title: 'Multi-Stage Docker Build Pipeline', url: '/assets/course-art/art-01.jpg', caption: 'Compiling assets in builder stage and copying only artifacts to minimal runner.', alt: 'Docker Multi-stage' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m11_l6',
        title: 'Production Deployment & Cloud Hosting: Vercel, Railway, Cloudflare Tunnels & Nginx',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Deploy full stack web applications to production: serverless frontend deployment on Vercel, container hosting on Railway, self-hosting behind Nginx reverse proxies, and secure Cloudflare Tunnels.',
        content: `# Production Deployment & Cloud Hosting: Vercel, Railway, Cloudflare Tunnels & Nginx

## 1. Overview & Learning Objectives
Deploying to production requires understanding DNS routing, SSL certificate automation, reverse proxies, and serverless hosting platforms. In this lesson, you will master:
- Serverless edge deployment on **Vercel** with custom domains.
- Managed container hosting on **Railway** and **Render**.
- Self-hosted infrastructure using **Nginx** reverse proxies and Let's Encrypt SSL.
- Exposing private self-hosted servers securely using **Cloudflare Tunnels** without opening public inbound firewall ports.

---

## 2. Cloudflare Tunnel Architecture
Traditional web hosting requires port forwarding (Port 80/443) and static public IP addresses. Cloudflare Tunnels (\`cloudflared\`) establish an encrypted, outbound-only connection to Cloudflare's global edge network:

\`\`\`
[ User Browser ]
       |
       | HTTPS (Anycast Edge, DDoS Mitigation, WAF)
       v
[ Cloudflare Global Edge Network ]
       |
       | Encrypted Outbound-Only Tunnel (QUIC / HTTP/2)
       v
[ Local cloudflared Daemon ] (Inside private server / localhost)
       |
       | Localhost loopback
       v
[ Node.js Application / Nginx ] (Port 3000 / 4000)
\`\`\`

---

## 3. Production Readiness Checklist
Before launching an application to live users, verify:
1. All database passwords and API keys are stored in environment variables (\`.env\`).
2. SSL/TLS is strictly enforced with automatic HTTP -> HTTPS redirects.
3. Automated database backups are scheduled.
4. Process managers (PM2 / systemd / Docker) are configured with automatic restart on crash policies (\`restart: always\`).

---

## 4. Key Takeaways
- Cloudflare Tunnels eliminate the risk of direct-to-IP DDoS attacks by completely closing all incoming firewall ports.
- Vercel provides zero-configuration Git-based CI/CD deployment with preview environments for pull requests.

## 5. Documentation & References
- [Vercel Deployment Documentation](https://vercel.com/docs)
- [Cloudflare Tunnel Documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Production Cloud Deployment & Cloudflare Tunnels',
        video_duration: '22:15',
        videos: [
          { id: 'vid_m11_l6_1', title: 'Production Deployment, Vercel & Cloudflare', url: '/assets/sample-lesson.mp4', duration: '22:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m11_l6_1', title: 'Cloudflare Tunnel Edge Architecture', url: '/assets/course-art/art-02.jpg', caption: 'Inbound-free secure tunnel between Cloudflare edge and internal server.', alt: 'Cloudflare Tunnel Flow' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      }
    ],
    quiz: {
      id: 'quiz_m11',
      title: 'Module 11: Git, Testing & Deployment - Comprehensive Assessment',
      passing_score: 80,
      duration_minutes: 20,
      questions: [
        {
          id: 'q_m11_1',
          text: 'What Git command allows interactively squashing, editing, and reorganizing past commits into a clean, atomic commit history?',
          options: [
            { id: 'opt_1', text: 'git rebase -i HEAD~N', is_correct: true },
            { id: 'opt_2', text: 'git merge --squash', is_correct: false },
            { id: 'opt_3', text: 'git reset --hard', is_correct: false },
            { id: 'opt_4', text: 'git cherry-pick --all', is_correct: false }
          ],
          explanation: 'Interactive rebasing (git rebase -i) opens an editor to squash, reorder, reword, or drop commits before merging into main.'
        },
        {
          id: 'q_m11_2',
          text: 'In the Software Testing Pyramid, which tier of tests should form the largest, fastest foundation of your automated test suite?',
          options: [
            { id: 'opt_1', text: 'Unit Tests', is_correct: true },
            { id: 'opt_2', text: 'Manual Quality Assurance Tests', is_correct: false },
            { id: 'opt_3', text: 'End-to-End (E2E) Browser Tests', is_correct: false },
            { id: 'opt_4', text: 'Performance Load Tests', is_correct: false }
          ],
          explanation: 'Unit tests are fast to run and isolated, providing the broad base of the testing pyramid.'
        },
        {
          id: 'q_m11_3',
          text: 'What guiding philosophy defines React Testing Library (RTL)?',
          options: [
            { id: 'opt_1', text: 'The more your tests resemble the way your software is used, the more confidence they can give you.', is_correct: true },
            { id: 'opt_2', text: 'Always test internal state variables directly.', is_correct: false },
            { id: 'opt_3', text: 'Never render real DOM elements.', is_correct: false },
            { id: 'opt_4', text: 'All tests must be written in Python.', is_correct: false }
          ],
          explanation: 'RTL encourages testing from the user perspective (querying by accessible roles, labels, text) rather than testing internal state implementation.'
        },
        {
          id: 'q_m11_4',
          text: 'What query method is recommended as top priority when searching for elements in React Testing Library?',
          options: [
            { id: 'opt_1', text: 'getByRole (e.g. getByRole("button", { name: /submit/i }))', is_correct: true },
            { id: 'opt_2', text: 'getByTestId', is_correct: false },
            { id: 'opt_3', text: 'querySelector(".my-css-class")', is_correct: false },
            { id: 'opt_4', text: 'getElementById', is_correct: false }
          ],
          explanation: 'getByRole queries elements exposed to the accessibility tree, reflecting how assistive technologies and users perceive the UI.'
        },
        {
          id: 'q_m11_5',
          text: 'What library is standard for making simulated HTTP assertions against Express applications without binding to live network ports in integration tests?',
          options: [
            { id: 'opt_1', text: 'Supertest', is_correct: true },
            { id: 'opt_2', text: 'Axios', is_correct: false },
            { id: 'opt_3', text: 'cURL', is_correct: false },
            { id: 'opt_4', text: 'Postman CLI', is_correct: false }
          ],
          explanation: 'Supertest provides high-level HTTP abstractions for testing Node.js HTTP servers without opening actual network ports.'
        },
        {
          id: 'q_m11_6',
          text: 'In GitHub Actions, where are workflow YAML files required to be located within a repository?',
          options: [
            { id: 'opt_1', text: '.github/workflows/', is_correct: true },
            { id: 'opt_2', text: '.ci/pipelines/', is_correct: false },
            { id: 'opt_3', text: 'config/actions/', is_correct: false },
            { id: 'opt_4', text: 'scripts/deploy/', is_correct: false }
          ],
          explanation: 'GitHub Actions searches for workflow files defined in the .github/workflows directory of the repository.'
        },
        {
          id: 'q_m11_7',
          text: 'What is the primary benefit of Multi-Stage Builds in Dockerfile design?',
          options: [
            { id: 'opt_1', text: 'They separate build tools and devDependencies into a temporary builder container, producing a clean, minimal runtime image (<150MB).', is_correct: true },
            { id: 'opt_2', text: 'They install multiple operating systems in one image.', is_correct: false },
            { id: 'opt_3', text: 'They run containers faster on GPU chips.', is_correct: false },
            { id: 'opt_4', text: 'They eliminate the need for Docker Compose.', is_correct: false }
          ],
          explanation: 'Multi-stage builds leave compilers, source code, and node_modules out of the final layer, drastically reducing container size and attack surface.'
        },
        {
          id: 'q_m11_8',
          text: 'What file prevents build artifacts, secret .env files, and node_modules from being copied into a Docker build context?',
          options: [
            { id: 'opt_1', text: '.dockerignore', is_correct: true },
            { id: 'opt_2', text: '.gitignore', is_correct: false },
            { id: 'opt_3', text: 'Dockerfile.exclude', is_correct: false },
            { id: 'opt_4', text: '.env.example', is_correct: false }
          ],
          explanation: '.dockerignore prevents files and directories from being included in the Docker build context, speeding up builds and preventing secret leaks.'
        },
        {
          id: 'q_m11_9',
          text: 'What tool orchestrates and configures multi-container Docker applications (such as a Node.js API container + a MongoDB container)?',
          options: [
            { id: 'opt_1', text: 'Docker Compose', is_correct: true },
            { id: 'opt_2', text: 'Docker Swarm', is_correct: false },
            { id: 'opt_3', text: 'Docker Hub', is_correct: false },
            { id: 'opt_4', text: 'Docker Machine', is_correct: false }
          ],
          explanation: 'Docker Compose uses a YAML file (docker-compose.yml) to configure application services, networks, and persistent data volumes.'
        },
        {
          id: 'q_m11_10',
          text: 'How does a Cloudflare Tunnel (cloudflared) enhance the security of a self-hosted web server?',
          options: [
            { id: 'opt_1', text: 'It creates an outbound-only encrypted tunnel to Cloudflare\'s edge, allowing you to host web services without opening ANY inbound ports on your firewall.', is_correct: true },
            { id: 'opt_2', text: 'It encrypts the server\'s RAM hardware.', is_correct: false },
            { id: 'opt_3', text: 'It replaces the Linux operating system.', is_correct: false },
            { id: 'opt_4', text: 'It automatically translates English to Spanish.', is_correct: false }
          ],
          explanation: 'Cloudflare Tunnels establish an outbound connection to Cloudflare edge nodes, routing traffic without exposing public IPs or opening inbound router ports.'
        },
        {
          id: 'q_m11_11',
          text: 'What command is used to stage resolved merge conflicts after manually editing conflict markers in code files?',
          options: [
            { id: 'opt_1', text: 'git add <resolved-file>', is_correct: true },
            { id: 'opt_2', text: 'git resolve --complete', is_correct: false },
            { id: 'opt_3', text: 'git merge --continue-force', is_correct: false },
            { id: 'opt_4', text: 'git checkout --force', is_correct: false }
          ],
          explanation: 'After resolving conflict markers in files, running git add stages the resolved content, ready for a completion commit.'
        },
        {
          id: 'q_m11_12',
          text: 'What Vitest / Jest matcher verifies that a mock function was called exactly twice during a test execution?',
          options: [
            { id: 'opt_1', text: 'expect(mockFn).toHaveBeenCalledTimes(2)', is_correct: true },
            { id: 'opt_2', text: 'expect(mockFn).toBeCalledDouble()', is_correct: false },
            { id: 'opt_3', text: 'expect(mockFn.count).toBe(2)', is_correct: false },
            { id: 'opt_4', text: 'expect(mockFn).toInvokeTwice()', is_correct: false }
          ],
          explanation: 'toHaveBeenCalledTimes(number) asserts that a spy or mock function was called the exact specified number of times.'
        },
        {
          id: 'q_m11_13',
          text: 'Why is it critical to create a non-root user (e.g. USER node) in production Dockerfiles?',
          options: [
            { id: 'opt_1', text: 'Running as root in a container increases risk; if an attacker escapes the container, they gain root privileges on the host server.', is_correct: true },
            { id: 'opt_2', text: 'Containers cannot run Node.js as root.', is_correct: false },
            { id: 'opt_3', text: 'Non-root users make downloads faster.', is_correct: false },
            { id: 'opt_4', text: 'It is required by the npm registry.', is_correct: false }
          ],
          explanation: 'Following least privilege by switching to a non-root user (USER node) mitigates severe container-breakout vulnerabilities.'
        },
        {
          id: 'q_m11_14',
          text: 'What Git command allows applying a specific commit from one branch onto your current branch without merging the entire branch?',
          options: [
            { id: 'opt_1', text: 'git cherry-pick <commit-hash>', is_correct: true },
            { id: 'opt_2', text: 'git pluck <commit-hash>', is_correct: false },
            { id: 'opt_3', text: 'git extract <commit-hash>', is_correct: false },
            { id: 'opt_4', text: 'git grab <commit-hash>', is_correct: false }
          ],
          explanation: 'git cherry-pick applies the changes introduced by some existing commits onto the current active HEAD branch.'
        },
        {
          id: 'q_m11_15',
          text: 'What is the purpose of test coverage reporting in Continuous Integration pipelines?',
          options: [
            { id: 'opt_1', text: 'It quantifies the percentage of lines, functions, branches, and statements executed during automated test runs.', is_correct: true },
            { id: 'opt_2', text: 'It measures the speed of developer typing.', is_correct: false },
            { id: 'opt_3', text: 'It counts how many users have logged into the app.', is_correct: false },
            { id: 'opt_4', text: 'It tests database read throughput.', is_correct: false }
          ],
          explanation: 'Test coverage tools (like c8 / Istanbul) report which portions of the codebase are exercised by test suites to highlight unverified logic.'
        },
        {
          id: 'q_m11_16',
          text: 'What feature in GitHub allows teams to prevent unreviewed or failing code from being merged directly into the main production branch?',
          options: [
            { id: 'opt_1', text: 'Branch Protection Rules', is_correct: true },
            { id: 'opt_2', text: 'Repository Forks', is_correct: false },
            { id: 'opt_3', text: 'Git Tags', is_correct: false },
            { id: 'opt_4', text: 'Issue Templates', is_correct: false }
          ],
          explanation: 'Branch protection rules require status checks (passing CI) and pull request reviews before branches can be merged into main.'
        },
        {
          id: 'q_m11_17',
          text: 'What is the function of a Reverse Proxy (like Nginx) positioned in front of a Node.js application server?',
          options: [
            { id: 'opt_1', text: 'It terminates SSL/TLS, buffers slow clients, serves static assets directly, and load-balances requests across multiple Node worker instances.', is_correct: true },
            { id: 'opt_2', text: 'It compiles React code to assembly language.', is_correct: false },
            { id: 'opt_3', text: 'It generates user passwords automatically.', is_correct: false },
            { id: 'opt_4', text: 'It replaces the application database.', is_correct: false }
          ],
          explanation: 'Nginx acts as a high-performance reverse proxy that handles TLS termination, gzip compression, static file caching, and request forwarding.'
        },
        {
          id: 'q_m11_18',
          text: 'What Docker command lists all currently running containers along with their status, container ID, and port bindings?',
          options: [
            { id: 'opt_1', text: 'docker ps', is_correct: true },
            { id: 'opt_2', text: 'docker images', is_correct: false },
            { id: 'opt_3', text: 'docker run', is_correct: false },
            { id: 'opt_4', text: 'docker status', is_correct: false }
          ],
          explanation: 'docker ps shows active running containers, their ports, names, and uptime.'
        },
        {
          id: 'q_m11_19',
          text: 'What is the role of an automated End-to-End (E2E) testing framework like Playwright or Cypress?',
          options: [
            { id: 'opt_1', text: 'It launches real headless browsers and simulates complete end-user journeys (logging in, submitting forms, taking exams) across the full stack.', is_correct: true },
            { id: 'opt_2', text: 'It tests single JavaScript math functions in isolation.', is_correct: false },
            { id: 'opt_3', text: 'It scans hard drives for malware.', is_correct: false },
            { id: 'opt_4', text: 'It formats CSS stylesheets.', is_correct: false }
          ],
          explanation: 'E2E testing tools run real browser sessions and verify that the combined frontend, backend, and database function seamlessly together.'
        },
        {
          id: 'q_m11_20',
          text: 'What happens when a process manager like PM2 is configured with autorestart: true in a production Node.js deployment?',
          options: [
            { id: 'opt_1', text: 'If the Node application encounters an uncaught exception and crashes, PM2 immediately spawns a fresh process to restore uptime without manual intervention.', is_correct: true },
            { id: 'opt_2', text: 'It restarts the server computer every hour.', is_correct: false },
            { id: 'opt_3', text: 'It deletes the database logs.', is_correct: false },
            { id: 'opt_4', text: 'It sends an SMS to all registered users.', is_correct: false }
          ],
          explanation: 'PM2 monitors the Node.js process and automatically restarts it upon unexpected crashes, maintaining high service availability.'
        }
      ]
    }
  },

  // =========================================================================
  // MODULE 12: Full Stack Capstone Project (7 Lessons, 20 MCQs)
  // =========================================================================
  {
    id: 'mod_12',
    title: 'Module 12: Full Stack Capstone Project',
    description: 'Synthesize all 12 modules into a comprehensive enterprise application: build, test, secure, and deploy a complete MERN Full Stack Course & Certification Management Platform with real-time WebSockets and PDF generation.',
    order: 12,
    assignment: {
      id: 'asg_m12',
      title: 'Capstone Evaluation: Full Stack Course & Institutional Certification Platform',
      objective: 'Build, test, audit, and deploy the complete RedKross Course & Certification Management Platform utilizing React 18, Node.js, Express, MongoDB/PostgreSQL, Socket.io, and jsPDF.',
      requirements: [
        'Complete React 18 frontend with Course Directory, CBT Exam Interface, and Student Dashboard.',
        'Production Express.js REST API with authentication, rate limiting, and RBAC authorization.',
        'Real-time bidirectional synchronization with Socket.io for course mutations and live exam violations.',
        'Client-side vector PDF certificate generation with embedded background crests and verification QR codes.',
        'Zero-blue design token compliance and Lighthouse performance score of 95+.'
      ],
      instructions: '1. Build frontend and backend. 2. Implement WebSocket events. 3. Integrate exact PDF generator. 4. Run automated test suite. 5. Deploy live to production.',
      expected_outcome: 'A fully functional, enterprise-grade, certified MERN web application deployed live on the public internet.'
    },
    lessons: [
      {
        id: 'les_m12_l1',
        title: 'Capstone Architecture & Specifications: Full Stack Course Management System',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Review system design, technical requirements, data flow, component hierarchies, and API contracts for the complete full stack capstone application.',
        content: `# Capstone Architecture & Specifications: Full Stack Course Management System

## 1. Overview & Learning Objectives
The Capstone Project synthesizes every discipline covered in this 12-week curriculum. You will architect and build a complete **Course & Certification Management System**:
- Three-tier decoupled architecture: React 18 Frontend, Express.js Backend API, and persistent Database.
- Strict Zero-Blue institutional cyber aesthetic (\`#65F58A\` Emerald, \`#071018\` Deep Cyber Void).
- Real-time bidirectional WebSockets for instant admin-to-student telemetry.
- Cryptographically verifiable PDF credential generation.

---

## 2. System Architecture Blueprint
\`\`\`
[ STUDENT CLIENT (React 18) ] <====== WebSocket (Socket.io) ======> [ SUPER ADMIN STUDIO (React 18) ]
              \\                                                               /
               \\                                                             /
                \\                         HTTP REST API                     /
                 +=========================> [ EXPRESS.JS API ] <==========+
                                                    |
                                            (JWT / RBAC / Zod)
                                                    |
                                        +-----------+-----------+
                                        |                       |
                                        v                       v
                              [ POSTGRESQL / MONGO ]    [ CLOUD STORAGE ]
                              (Courses, Enrolments)     (PDFs, Video Streams)
\`\`\`

---

## 3. Key Deliverables
1. **Course Directory & Detail Pages:** Filterable courses with enrollment triggers.
2. **Interactive CBT Exam Engine:** Split-view questions palette, live decrementing attempts (3 -> 2 -> 1), and 24-hour proctoring lockouts.
3. **Admin Curriculum Studio:** 4-step wizard to create, edit, and reorder modules, lessons, and MCQs.
4. **Verifiable PDF Credential:** High-res institutional certificate with verification hashes.

## 4. Documentation & References
- [Full Stack Architecture Blueprint](https://github.com/Atharv-design/redkross-academy)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Capstone Blueprint, System Architecture & Requirements',
        video_duration: '22:00',
        videos: [
          { id: 'vid_m12_l1_1', title: 'Capstone System Architecture & Blueprint', url: '/assets/sample-lesson.mp4', duration: '22:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m12_l1_1', title: 'Capstone System Architecture Blueprint', url: '/assets/course-art/art-03.jpg', caption: 'Full stack system topology mapping clients, API gateway, and database clusters.', alt: 'System Blueprint' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m12_l2',
        title: 'Backend Architecture: Database Models, Mongoose Schemas & Controller Pipelines',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Implement database schemas and models: Courses, Modules, Lessons, Quizzes, Questions, Enrolments, and Verification Credentials with relational constraints.',
        content: `# Backend Architecture: Database Models, Mongoose Schemas & Controller Pipelines

## 1. Overview & Learning Objectives
A solid data model prevents bugs and eliminates performance bottlenecks. In this lesson, you will master:
- Modeling deep course hierarchies: Course -> Modules -> Lessons -> Quizzes -> Questions -> Options.
- Tracking student progress and enrollment records.
- Enforcing cascading deletion rules when courses are permanently purged.

---

## 2. Complete Data Schema Relationships
\`\`\`javascript
// Course Model
const courseSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  modules: [{
    title: String,
    lessons: [{
      title: String,
      content: String,
      videos: [{ url: String, title: String }],
      images: [{ url: String, caption: String }],
      pdf_attachment_url: String
    }],
    quiz: {
      passing_score: { type: Number, default: 80 },
      questions: [{
        text: String,
        options: [{ text: String, is_correct: Boolean }],
        explanation: String
      }]
    }
  }]
});
\`\`\`

---

## 3. Key Takeaways
- Use cascading deletes so that removing a course cleanly purges all its child modules, lessons, quizzes, and enrollments.
- Store explanations directly with questions for instant remediation reviews.

## 4. Documentation & References
- [Mongoose Schema Design Patterns](https://mongoosejs.com/docs/guide.html)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Database Schema Modeling & Controller Architecture',
        video_duration: '24:30',
        videos: [
          { id: 'vid_m12_l2_1', title: 'Database Schemas & Data Model Pipelines', url: '/assets/sample-lesson.mp4', duration: '24:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m12_l2_1', title: 'Curriculum Entity-Relationship Diagram', url: '/assets/course-art/art-04.jpg', caption: 'Entity relationships between courses, modules, lessons, and attempts.', alt: 'ER Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m12_l3',
        title: 'Backend API Implementation: Authentication, Course CRUD & Enrolment Endpoints',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Build and secure the API layer: user registration/login with JWT, Course CRUD endpoints, student enrollment triggers, and proctoring violation handlers.',
        content: `# Backend API Implementation: Authentication, Course CRUD & Enrolment Endpoints

## 1. Overview & Learning Objectives
The REST API connects the frontend client to the persistence layer. In this lesson, you will master:
- Implementing user auth controllers with secure cookie issuance.
- Course creation and mutation endpoints protected by \`restrictTo('super_admin')\`.
- Enrollment handlers initializing student progress at 0%.
- Real-time event dispatching via Socket.io upon course mutations.

---

## 2. Real-Time Mutation Dispatch
\`\`\`javascript
// controllers/courseController.js
export async function createCourse(req, res) {
  const course = await Course.create(req.body);

  // Broadcast live mutation event to all connected clients
  io.emit('course:mutation', {
    action: 'CREATED',
    courseId: course.id,
    title: course.title
  });

  res.status(201).json({ success: true, course });
}
\`\`\`

---

## 3. Key Takeaways
- Emit WebSocket events on course mutations so student catalog interfaces update in real time without manual page refreshes.
- Verify user authorization before permitting course deletion.

## 4. Documentation & References
- [Express Router Documentation](https://expressjs.com/en/guide/routing.html)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'REST API Implementation & Real-Time Event Dispatch',
        video_duration: '23:15',
        videos: [
          { id: 'vid_m12_l3_1', title: 'Backend API Routes & Socket Emission', url: '/assets/sample-lesson.mp4', duration: '23:15', quality: '1080p' }
        ],
        images: [
          { id: 'img_m12_l3_1', title: 'API Endpoint Routing Matrix', url: '/assets/course-art/art-05.jpg', caption: 'Route mapping and controller execution pipelines.', alt: 'API Routing Diagram' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m12_l4',
        title: 'Frontend Architecture: State Management, Component Hierarchy & Protected Routing',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Architect the React 18 client application: modular component hierarchy, custom authentication context, protected student routes, and zero-blue aesthetic theming.',
        content: `# Frontend Architecture: State Management, Component Hierarchy & Protected Routing

## 1. Overview & Learning Objectives
A scalable frontend requires clean directory structure and decoupled state. In this lesson, you will master:
- Component hierarchy: Common, Layout, Public, Student, and Admin pages.
- Global authentication context (\`AuthContext\`) with LocalStorage fallback.
- Client-side routing with role-based Route Guards.
- Enforcing the strict Zero-Blue institutional design tokens.

---

## 2. Component Hierarchy Blueprint
\`\`\`
src/
  ├── components/
  │    ├── common/ (Navbar, Footer, Modal)
  │    ├── student/ (ExamCBTInterface, PDFCertificateModal)
  │    └── ui/ (PixelBackground, CyberCards)
  ├── pages/
  │    ├── public/ (HomePage, CourseCatalogPage, CourseDetailPage)
  │    ├── student/ (StudentDashboardPage, LessonPlayerPage)
  │    └── admin/ (AdminDashboardPage, AdminCoursesPage)
  ├── services/
  │    ├── api/ (apiClient)
  │    └── db/ (mockEngine, videoStorage)
\`\`\`

---

## 3. Key Takeaways
- Centralize all API network calls inside an \`apiClient\` abstraction to easily switch between mock engines and live PostgreSQL.
- Keep layout components focused on styling, delegating logic to custom hooks.

## 4. Documentation & References
- [React Architecture Best Practices](https://react.dev/learn/scaling-up-with-reducer-and-context)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'React Client Architecture & Component Hierarchy',
        video_duration: '21:00',
        videos: [
          { id: 'vid_m12_l4_1', title: 'React Frontend Architecture & Design Systems', url: '/assets/sample-lesson.mp4', duration: '21:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m12_l4_1', title: 'React Frontend Component Topology', url: '/assets/course-art/art-06.jpg', caption: 'Hierarchy of pages, layout wrappers, and reusable components.', alt: 'Component Architecture' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m12_l5',
        title: 'Frontend Implementation: Dynamic Course Catalog, CBT Quiz Engine & Student Dashboard',
        duration: '60 mins',
        is_mandatory: true,
        summary: 'Build core student views: dynamic course catalog with embargo support, Open edX-style lesson player with sticky sidebar, and the CBT examination engine with questions palette.',
        content: `# Frontend Implementation: Dynamic Course Catalog, CBT Quiz Engine & Student Dashboard

## 1. Overview & Learning Objectives
In this lesson, you will assemble the three core student experience engines:
- **Course Catalog:** Dynamic filtering by difficulty, search queries, and embargo empty-states.
- **Lesson Player:** Sticky syllabus outline, video streaming with speed controls, and Markdown rendering.
- **CBT Exam Engine:** Split layout featuring questions palette, attempted (green) vs unattempted (red) markers, live attempt decrement counter, and 24-hour lockout HUD.

---

## 2. CBT Interface Integration
\`\`\`jsx
<ExamCBTInterface
  quiz={activeQuiz}
  enrolmentId={enrolmentId}
  isFinalExam={activeUnit?.type === 'final_exam'}
  timerSeconds={examTimeRemaining}
  attemptsStatus={attemptsStatus}
  answers={quizAnswers}
  onSelectAnswer={handleSelectQuizOption}
  onSubmitExam={handleSubmitQuiz}
  isSubmitted={quizSubmitted}
  submissionResult={quizResult}
  onRetakeExam={handleRetakeExam}
  isLockoutActive={isLockoutActive}
  lockoutCountdown={lockoutCountdown}
/>
\`\`\`

---

## 3. Key Takeaways
- The CBT interface provides immediate visual status of student progress through the question number palette.
- Real-time countdown timers give candidates exact feedback on proctoring lockout expiration.

## 4. Documentation & References
- [React State Management Guide](https://react.dev/learn/managing-state)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'CBT Exam Engine & Open edX Courseware Interface',
        video_duration: '25:30',
        videos: [
          { id: 'vid_m12_l5_1', title: 'CBT Examination Engine & Courseware Player', url: '/assets/sample-lesson.mp4', duration: '25:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m12_l5_1', title: 'CBT Exam Split Workspace Layout', url: '/assets/course-art/art-07.jpg', caption: 'Questions panel on left, palette grid on right, attempt counter at top.', alt: 'CBT Blueprint' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m12_l6',
        title: 'End-to-End System Integration: Real-Time WebSockets & PDF Certificate Generation',
        duration: '55 mins',
        is_mandatory: true,
        summary: 'Wire up real-time telemetry and credentials: bidirectional Socket.io events, dispatching certificate requests, generating vector PDF certificates with jsPDF, and verification QR codes.',
        content: `# End-to-End System Integration: Real-Time WebSockets & PDF Certificate Generation

## 1. Overview & Learning Objectives
Integration transforms disconnected features into a cohesive enterprise system. In this lesson, you will master:
- Bidirectional real-time events with **Socket.io**: \`course:mutation\`, \`catalog:visibility\`, \`exam:violation\`, \`certificate:dispatched\`.
- Vector PDF certificate generation using **jsPDF**.
- Incorporating high-resolution security crests, watermarks, and verification QR codes.
- Verifying certificates on the public registry (\`/verify/:verificationId\`).

---

## 2. Exact Vector PDF Certificate Generation
\`\`\`javascript
import { jsPDF } from 'jspdf';

export function generateInstitutionalCertificate({ studentName, courseTitle, verificationId, issueDate }) {
  // Create landscape A4 document (297mm x 210mm)
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  // 1. Draw Deep Cyber Void Background
  doc.setFillColor(7, 16, 24); // #071018
  doc.rect(0, 0, 297, 210, 'F');

  // 2. Draw Emerald Border Guilloche Frame
  doc.setDrawColor(101, 245, 138); // #65F58A
  doc.setLineWidth(1.5);
  doc.rect(8, 8, 281, 194);

  // 3. Render Institutional Typography
  doc.setTextColor(101, 245, 138);
  doc.setFontSize(28);
  doc.setFont('times', 'bold');
  doc.text('REDKROSS RESEARCH FOUNDATION', 148.5, 38, { align: 'center' });

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text('This credential certifies that', 148.5, 62, { align: 'center' });

  // Student Candidate Name
  doc.setTextColor(101, 245, 138);
  doc.setFontSize(32);
  doc.setFont('times', 'bold');
  doc.text(studentName.toUpperCase(), 148.5, 82, { align: 'center' });

  // Course Title
  doc.setTextColor(200, 240, 220);
  doc.setFontSize(18);
  doc.text(courseTitle, 148.5, 110, { align: 'center' });

  // Verification Hash
  doc.setFontSize(10);
  doc.setFont('courier', 'normal');
  doc.text(\`VERIFICATION ID: \${verificationId}\`, 148.5, 175, { align: 'center' });

  // Save PDF file to client
  doc.save(\`RedKross-Certificate-\${verificationId}.pdf\`);
}
\`\`\`

---

## 3. Key Takeaways
- Vector PDF rendering ensures sharp text at any zoom level, avoiding blurry bitmap artifacts.
- Socket.io synchronizes student views instantly whenever an administrator dispatches an issued certificate.

## 4. Documentation & References
- [jsPDF Documentation](https://artskydj.github.io/jsPDF/docs/index.html)
- [Socket.io Official Documentation](https://socket.io/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Vector PDF Certificate Generation & WebSocket Telemetry',
        video_duration: '24:00',
        videos: [
          { id: 'vid_m12_l6_1', title: 'jsPDF Vector Generation & Socket.io Integration', url: '/assets/sample-lesson.mp4', duration: '24:00', quality: '1080p' }
        ],
        images: [
          { id: 'img_m12_l6_1', title: 'Verifiable PDF Certificate Architecture', url: '/assets/course-art/art-08.jpg', caption: 'Vector certificate with embedded security border and verification ID.', alt: 'Certificate Blueprint' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      },
      {
        id: 'les_m12_l7',
        title: 'Production Hardening, Performance Audits (Lighthouse 95+), Security Review & Final Launch',
        duration: '50 mins',
        is_mandatory: true,
        summary: 'Prepare for public production release: Lighthouse 95+ audit optimization (LCP, CLS, FID), bundle size analysis, security penetration checklist, and launch verification.',
        content: `# Production Hardening, Performance Audits (Lighthouse 95+), Security Review & Final Launch

## 1. Overview & Learning Objectives
The final step in professional engineering is production hardening and launch verification. In this lesson, you will master:
- Running Google Lighthouse audits to achieve 95+ scores across Performance, Accessibility, Best Practices, and SEO.
- Vite bundle analysis and code-splitting optimizations.
- Final security verification: checking for exposed secrets, missing headers, or unhandled errors.
- Final launch readiness sign-off.

---

## 2. Lighthouse 95+ Optimization Checklist
- [x] **Performance (95+):**
  - Next-gen image formats (AVIF/WebP) with explicit \`width\` and \`height\`.
  - Minified CSS and JavaScript chunks with Gzip/Brotli compression.
  - Zero render-blocking resources in the document \`<head>\`.
- [x] **Accessibility (100):**
  - Minimum 4.5:1 color contrast ratio across all text elements.
  - High-visibility keyboard \`:focus-visible\` indicators on interactive elements.
  - Complete semantic landmark structure (\`<header>\`, \`<nav>\`, \`<main>\`, \`<footer>\`).
- [x] **Best Practices (100):**
  - HTTPS enforced with strict HSTS.
  - No vulnerable npm packages (\`npm audit\` clean).
  - Clean console output with zero runtime errors.
- [x] **SEO (100):**
  - Canonical URL declared on all pages.
  - Meta description and Open Graph cards configured.

---

## 3. Launch Verification Protocol
Execute final end-to-end integration test suites:
\`\`\`bash
# 1. Run full unit and integration tests
npm test

# 2. Build production distribution
npm run build

# 3. Test production preview build
npm run preview
\`\`\`

---

## 4. Key Takeaways
- High-craft engineering means testing every single user flow before declaring a system complete.
- Continuous monitoring and audit logging ensure operational integrity long after launch.

## 5. Documentation & References
- [Google Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/overview/)
- [Web.dev Performance Auditing Guide](https://web.dev/fast/)`,
        video_url: '/assets/sample-lesson.mp4',
        video_title: 'Production Hardening, Lighthouse 95+ & Final Launch Protocol',
        video_duration: '22:30',
        videos: [
          { id: 'vid_m12_l7_1', title: 'Production Audit, Lighthouse 95+ & Final Launch', url: '/assets/sample-lesson.mp4', duration: '22:30', quality: '1080p' }
        ],
        images: [
          { id: 'img_m12_l7_1', title: 'Lighthouse 95+ Performance Scorecard', url: '/assets/course-art/art-09.jpg', caption: '100% scores across Performance, Accessibility, Best Practices, and SEO.', alt: 'Lighthouse Audit' }
        ],
        pdf_attachment_url: '/assets/certificate/sample.pdf'
      }
    ],
    quiz: {
      id: 'quiz_m12',
      title: 'Module 12: Full Stack Capstone Project - Comprehensive Assessment',
      passing_score: 80,
      duration_minutes: 20,
      questions: [
        {
          id: 'q_m12_1',
          text: 'In a modern full stack MERN application, what is the role of the REST API application server?',
          options: [
            { id: 'opt_1', text: 'It handles business logic, authenticates requests, enforces authorization (RBAC), and orchestrates database transactions between client and database.', is_correct: true },
            { id: 'opt_2', text: 'It serves strictly as a static CSS file CDN.', is_correct: false },
            { id: 'opt_3', text: 'It runs inside the user\'s browser sandbox.', is_correct: false },
            { id: 'opt_4', text: 'It replaces the browser rendering engine.', is_correct: false }
          ],
          explanation: 'The backend API acts as the secure intermediary, executing business logic, enforcing validation, and interacting with the database.'
        },
        {
          id: 'q_m12_2',
          text: 'What protocol is utilized by Socket.io to establish low-latency, bidirectional, real-time communication between browser clients and servers?',
          options: [
            { id: 'opt_1', text: 'WebSockets (with HTTP long-polling fallback)', is_correct: true },
            { id: 'opt_2', text: 'FTP (File Transfer Protocol)', is_correct: false },
            { id: 'opt_3', text: 'DNS UDP packets', is_correct: false },
            { id: 'opt_4', text: 'SMTP Email Protocol', is_correct: false }
          ],
          explanation: 'Socket.io primarily uses WebSockets for bidirectional low-latency communication, gracefully falling back to HTTP long-polling when needed.'
        },
        {
          id: 'q_m12_3',
          text: 'Why is generating vector PDF certificates client-side using jsPDF preferable over returning rasterized screenshot images?',
          options: [
            { id: 'opt_1', text: 'Vector PDFs preserve crisp, resolution-independent fonts, sharp vector vector borders, selectable text, and smaller file sizes (<100KB).', is_correct: true },
            { id: 'opt_2', text: 'Raster images cannot be opened on mobile phones.', is_correct: false },
            { id: 'opt_3', text: 'Vector PDFs cannot be printed.', is_correct: false },
            { id: 'opt_4', text: 'jsPDF automatically encrypts the student\'s hard drive.', is_correct: false }
          ],
          explanation: 'Vector graphics and native font glyphs in PDFs scale cleanly to any resolution or print size without pixelation or heavy image byte bloat.'
        },
        {
          id: 'q_m12_4',
          text: 'When a Super Admin deletes a course in the Admin Studio, why must database cascading deletion rules be executed?',
          options: [
            { id: 'opt_1', text: 'To cleanly remove all associated child modules, lessons, quizzes, questions, options, and student enrolments, preventing orphaned records and broken foreign keys.', is_correct: true },
            { id: 'opt_2', text: 'To restart the server computer.', is_correct: false },
            { id: 'opt_3', text: 'To delete all user accounts in the system.', is_correct: false },
            { id: 'opt_4', text: 'It is a requirement of HTML5 validation.', is_correct: false }
          ],
          explanation: 'Cascading deletes maintain referential integrity by cleaning up all subordinate records that depend on the deleted parent course entity.'
        },
        {
          id: 'q_m12_5',
          text: 'What score target across Performance, Accessibility, Best Practices, and SEO is required to meet high-craft production standards?',
          options: [
            { id: 'opt_1', text: '95+ (with 100 on Accessibility and SEO)', is_correct: true },
            { id: 'opt_2', text: '50 minimum', is_correct: false },
            { id: 'opt_3', text: 'Scores do not matter in production.', is_correct: false },
            { id: 'opt_4', text: 'Lighthouse audits only measure CSS animations.', is_correct: false }
          ],
          explanation: 'Production-grade applications target 95+ across all Lighthouse categories, guaranteeing optimal speed, universal access, and discoverability.'
        },
        {
          id: 'q_m12_6',
          text: 'In the CBT Exam Interface, why should question attempts decrement live (3 -> 2 -> 1) with an automatic 24-hour lockout when exhausted?',
          options: [
            { id: 'opt_1', text: 'To enforce rigorous academic evaluation integrity, preventing brute-force guessing and enforcing a mandatory study cooldown.', is_correct: true },
            { id: 'opt_2', text: 'Because servers cannot process more than 3 requests.', is_correct: false },
            { id: 'opt_3', text: 'To delete student accounts after 3 tries.', is_correct: false },
            { id: 'opt_4', text: 'To force students to purchase new computers.', is_correct: false }
          ],
          explanation: 'Limiting attempts and enforcing a 24-hour cooldown prevents trial-and-error guessing on certification assessments and encourages thorough review.'
        },
        {
          id: 'q_m12_7',
          text: 'What is the role of a Unique Verification ID (e.g. RK-XXXX-XXXX) printed on an academic certificate?',
          options: [
            { id: 'opt_1', text: 'It enables employers and external third parties to query the public registry and verify that the credential was genuinely issued to that candidate.', is_correct: true },
            { id: 'opt_2', text: 'It is the student\'s credit card number.', is_correct: false },
            { id: 'opt_3', text: 'It specifies the student\'s IP address.', is_correct: false },
            { id: 'opt_4', text: 'It expires after 24 hours.', is_correct: false }
          ],
          explanation: 'Unique verification IDs map to tamper-proof credential records in the database, allowing cryptographic verification on the public registry.'
        },
        {
          id: 'q_m12_8',
          text: 'How does Socket.io ensure that when an admin deletes or creates a course, student catalog pages update instantly without needing a manual browser refresh?',
          options: [
            { id: 'opt_1', text: 'The admin action triggers an event emission (e.g. io.emit("course:mutation")) which client listeners intercept to refetch data immediately.', is_correct: true },
            { id: 'opt_2', text: 'The server reboots all student computers.', is_correct: false },
            { id: 'opt_3', text: 'The browser runs a continuous infinite while loop.', is_correct: false },
            { id: 'opt_4', text: 'Students must refresh the page manually.', is_correct: false }
          ],
          explanation: 'WebSocket push events deliver instant notification of mutations to all active connected clients, triggering real-time UI updates.'
        },
        {
          id: 'q_m12_9',
          text: 'What design token colors are strictly mandated to enforce the RedKross Academy Zero-Blue cyber aesthetic?',
          options: [
            { id: 'opt_1', text: 'Emerald Green (#65F58A), Mint (#35E6B5), and Deep Cyber Void (#071018 / #092218) with 0% Blue.', is_correct: true },
            { id: 'opt_2', text: 'Royal Blue and Bright Purple', is_correct: false },
            { id: 'opt_3', text: 'Pure White and Black only', is_correct: false },
            { id: 'opt_4', text: 'Pastel Yellow and Orange', is_correct: false }
          ],
          explanation: 'The RedKross Academy brand strictly enforces a zero-blue cyber design system built around emerald green, mint, and deep dark green surfaces.'
        },
        {
          id: 'q_m12_10',
          text: 'What should be displayed on the student public catalog when the Super Admin toggles the catalog release status to EMBARGOED?',
          options: [
            { id: 'opt_1', text: 'A clean preparation empty-state screen stating "Curriculum Preparation in Progress (Courses will be out soon)", hiding all courses from unauthenticated visitors.', is_correct: true },
            { id: 'opt_2', text: 'A 404 Page Not Found error.', is_correct: false },
            { id: 'opt_3', text: 'Fake placeholder courses.', is_correct: false },
            { id: 'opt_4', text: 'A blank white screen.', is_correct: false }
          ],
          explanation: 'When embargoed, public visitors see the refined "Courses will be out soon" state, preventing premature access to unreleased curriculum.'
        },
        {
          id: 'q_m12_11',
          text: 'What tool should you use to verify that a client-side bundle does not accidentally include heavy, bloated libraries before deploying to production?',
          options: [
            { id: 'opt_1', text: 'rollup-plugin-visualizer or webpack-bundle-analyzer', is_correct: true },
            { id: 'opt_2', text: 'git status', is_correct: false },
            { id: 'opt_3', text: 'cURL', is_correct: false },
            { id: 'opt_4', text: 'MongoDB Compass', is_correct: false }
          ],
          explanation: 'Bundle visualizers produce interactive treemaps of output chunks, identifying oversized dependencies for code-splitting.'
        },
        {
          id: 'q_m12_12',
          text: 'In the CBT Exam Question Palette, what visual marking immediately informs the student whether a question has been answered or not?',
          options: [
            { id: 'opt_1', text: 'Attempted questions are marked in Green (#65F58A); Not Attempted questions are marked in Red (#F43F5E).', is_correct: true },
            { id: 'opt_2', text: 'All buttons remain gray.', is_correct: false },
            { id: 'opt_3', text: 'Attempted questions are hidden from the grid.', is_correct: false },
            { id: 'opt_4', text: 'Numbers change to letters.', is_correct: false }
          ],
          explanation: 'The question palette color-codes answered questions in green and unattempted questions in red for instant test progress visibility.'
        },
        {
          id: 'q_m12_13',
          text: 'What happens when a student attempts to switch browser tabs or loses window focus during an active proctored examination?',
          options: [
            { id: 'opt_1', text: 'The anti-cheat proctoring protocol immediately intercepts the focus loss, terminates the exam session, and enforces a mandatory 24-hour lockout.', is_correct: true },
            { id: 'opt_2', text: 'The browser closes automatically.', is_correct: false },
            { id: 'opt_3', text: 'The timer adds 10 minutes.', is_correct: false },
            { id: 'opt_4', text: 'Nothing happens.', is_correct: false }
          ],
          explanation: 'Anti-cheat monitors visibilitychange and blur events; detecting tab switching immediately records a violation and locks the exam for 24 hours.'
        },
        {
          id: 'q_m12_14',
          text: 'What HTTP status code should the backend return if an unauthorized student attempts to trigger an administrative course deletion endpoint?',
          options: [
            { id: 'opt_1', text: '403 Forbidden', is_correct: true },
            { id: 'opt_2', text: '200 OK', is_correct: false },
            { id: 'opt_3', text: '404 Not Found', is_correct: false },
            { id: 'opt_4', text: '503 Service Unavailable', is_correct: false }
          ],
          explanation: '403 Forbidden indicates that the server understands the request but refuses to authorize it because the user lacks required permissions.'
        },
        {
          id: 'q_m12_15',
          text: 'Why should database credentials and JWT signing secrets never be hardcoded into Git source code repositories?',
          options: [
            { id: 'opt_1', text: 'Any collaborator or attacker with repository access can extract secrets and completely compromise database clusters and counterfeit signed tokens.', is_correct: true },
            { id: 'opt_2', text: 'Git cannot commit strings containing punctuation.', is_correct: false },
            { id: 'opt_3', text: 'Hardcoded secrets slow down network bandwidth.', is_correct: false },
            { id: 'opt_4', text: 'It prevents the code from compiling in React.', is_correct: false }
          ],
          explanation: 'Hardcoding secrets exposes credentials to anyone with code access; secrets must always be injected at runtime via environment variables.'
        },
        {
          id: 'q_m12_16',
          text: 'In the Open edX-style lesson player, how is sequential module gating enforced?',
          options: [
            { id: 'opt_1', text: 'Module N+1 remains locked until all mandatory lessons in Module N are completed AND the Module N technical assessment is passed with >= 80%.', is_correct: true },
            { id: 'opt_2', text: 'All modules are completely unlocked from day one.', is_correct: false },
            { id: 'opt_3', text: 'Modules unlock based on calendar dates only.', is_correct: false },
            { id: 'opt_4', text: 'Students must pay money to unlock each module.', is_correct: false }
          ],
          explanation: 'Sequential gating enforces that students master each module by completing all lessons and passing the assessment before unlocking subsequent modules.'
        },
        {
          id: 'q_m12_17',
          text: 'What format should technical documentation and lesson instructional notes be stored in to allow rich styling, code blocks, and diagrams?',
          options: [
            { id: 'opt_1', text: 'Markdown (rendered securely via markdown-to-html parsers)', is_correct: true },
            { id: 'opt_2', text: 'Raw binary machine code', is_correct: false },
            { id: 'opt_3', text: 'Unformatted plain text only', is_correct: false },
            { id: 'opt_4', text: 'Adobe Flash files', is_correct: false }
          ],
          explanation: 'Markdown allows authors to write structured content with headings, lists, tables, and syntax-highlighted code blocks rendered into HTML.'
        },
        {
          id: 'q_m12_18',
          text: 'What is the function of the lead_author object stored on a course record in the database?',
          options: [
            { id: 'opt_1', text: 'It encapsulates the instructor\'s name, title, role, and avatar to present verifiable educator provenance on course detail views.', is_correct: true },
            { id: 'opt_2', text: 'It stores the author\'s bank account details.', is_correct: false },
            { id: 'opt_3', text: 'It locks the course from being edited.', is_correct: false },
            { id: 'opt_4', text: 'It is used to send marketing emails.', is_correct: false }
          ],
          explanation: 'lead_author attributes the curriculum to a recognized industry educator with credentials and institutional title.'
        },
        {
          id: 'q_m12_19',
          text: 'How does the Super Admin confirm course creation in the Admin Studio?',
          options: [
            { id: 'opt_1', text: 'Clicking "Save & Finalize Course" persists the course hierarchy to the database and displays a celebratory emerald pop-up modal with direct links to view in catalog and student portal.', is_correct: true },
            { id: 'opt_2', text: 'The page immediately crashes.', is_correct: false },
            { id: 'opt_3', text: 'The admin must restart the computer.', is_correct: false },
            { id: 'opt_4', text: 'An alert prompt asks for a root password.', is_correct: false }
          ],
          explanation: 'The course builder persists deep modules and questions, then renders an elegant success modal with confetti and direct navigation actions.'
        },
        {
          id: 'q_m12_20',
          text: 'What is the ultimate objective of completing the Full Stack Web Development curriculum?',
          options: [
            { id: 'opt_1', text: 'To achieve complete mastery of end-to-end web engineering, from foundational protocols and UI craft through scalable APIs, security defense, and automated cloud deployments.', is_correct: true },
            { id: 'opt_2', text: 'To learn how to use a computer mouse.', is_correct: false },
            { id: 'opt_3', text: 'To memorize basic HTML tags only.', is_correct: false },
            { id: 'opt_4', text: 'To install browser extensions.', is_correct: false }
          ],
          explanation: 'The curriculum equips candidates with comprehensive full stack engineering skills spanning frontend, backend, security, testing, and deployment.'
        }
      ]
    }
  }
];
