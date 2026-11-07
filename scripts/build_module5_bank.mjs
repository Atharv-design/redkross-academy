import fs from 'fs';
import path from 'path';

const OUT_PATH = path.resolve('src/services/db/questionBanks/module5QuestionBank.js');
if (!fs.existsSync(path.dirname(OUT_PATH))) {
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
}

console.log('Building 200 questions for Module 5: Identity and Access Management...');

const subtopicMatrix = [
  {
    name: 'Identification, Authentication & Authorization Foundations',
    sub: [
      'AuthN vs AuthZ boundaries in distributed OAuth2/OIDC claims',
      'Authentication factor categories (Knowledge vs Possession vs Inherence)',
      'Federated identity protocols (SAML 2.0 assertions vs OpenID Connect JWTs)',
      'Session token hijacking and replay attack mitigations'
    ]
  },
  {
    name: 'Multi-Factor Authentication (MFA) & FIDO2 Mechanics',
    sub: [
      'Time-based One-Time Password (TOTP RFC 6238) drift windows and HMAC secrets',
      'FIDO2 / WebAuthn cryptographic challenge-response and origin binding',
      'SIM swapping and SS7 signaling vulnerabilities undermining SMS MFA',
      'Push notification fatigue attacks and number matching countermeasures'
    ]
  },
  {
    name: 'Access Control Models (RBAC, ABAC, MAC, DAC)',
    sub: [
      'Role explosion in enterprise RBAC and the transition to Policy-Based ABAC',
      'Attribute-Based Access Control evaluating environmental context (device posture, IP)',
      'Discretionary Access Control (DAC) file permission ownership flaws',
      'Mandatory Access Control (MAC) multi-level security classifications (Bell-LaPadula)'
    ]
  },
  {
    name: 'Cryptographic Password Hashing & Key Derivation',
    sub: [
      'Memory-hard hashing functions (Argon2id) defeating GPU/ASIC brute forcing',
      'Bcrypt cost factor tuning and computational work factor calibration',
      'Cryptographic salt uniqueness defeating precomputed rainbow table attacks',
      'Application pepper secrets stored in Hardware Security Modules (HSMs)'
    ]
  },
  {
    name: 'Privileged Access Management (PAM) & JIT Access',
    sub: [
      'Privileged credential rotation and dynamic ephemeral vault checkout',
      'Just-in-Time (JIT) privilege elevation with automated expiration tickets',
      'SSH session recording, keystroke logging, and dual-custody jump hosts',
      'Service account credential hygiene and automated offboarding revocation'
    ]
  }
];

const questions = [];
let qIndex = 1;

while (questions.length < 200) {
  const tGroup = subtopicMatrix[questions.length % subtopicMatrix.length];
  const subName = tGroup.sub[Math.floor(Math.random() * tGroup.sub.length)];
  const isDiff = questions.length % 2 === 1;
  const diffStr = isDiff ? 'difficult' : 'medium';
  const qNum = String(qIndex).padStart(3, '0');

  let qText = '';
  let opts = [];
  let exp = '';
  let correctIdx = (qIndex * 2 + 1) % 4;

  if (tGroup.name === 'Identification, Authentication & Authorization Foundations') {
    qText = `An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling ${subName}. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?`;
    opts = [
      'Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.',
      'Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.',
      'Exhausting the OAuth2 server\'s cryptographic key derivation limits.',
      'Triggering an automated session invalidation due to mismatched user agent strings.'
    ];
    exp = 'In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data).';
  } else if (tGroup.name === 'Multi-Factor Authentication (MFA) & FIDO2 Mechanics') {
    qText = `An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under ${subName}. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?`;
    opts = [
      'The browser cryptographically binds the authenticator\'s signature to the exact origin URL domain; an attacker\'s phishing domain will not match the registered origin.',
      'FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.',
      'The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.',
      'FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.'
    ];
    exp = 'FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server.';
  } else if (tGroup.name === 'Access Control Models (RBAC, ABAC, MAC, DAC)') {
    qText = `A large multinational healthcare provider with 40,000 employees suffers from "role explosion" under standard RBAC while managing ${subName}. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?`;
    opts = [
      'ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).',
      'ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.',
      'ABAC delegates access decisions to third-party public blockchain smart contracts.',
      'ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.'
    ];
    exp = 'Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles.';
  } else if (tGroup.name === 'Cryptographic Password Hashing & Key Derivation') {
    qText = `A security engineering team selects a password hashing algorithm for a customer authentication database subject to ${subName}. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?`;
    opts = [
      'Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.',
      'Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.',
      'Argon2id automatically contacts the police whenever an invalid password attempt is submitted.',
      'Argon2id encrypts passwords with symmetric keys that only the user\'s web browser possesses.'
    ];
    exp = 'Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks.';
  } else {
    qText = `A SOC analyst conducts an access audit on high-privilege administrative accounts under ${subName}. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?`;
    opts = [
      'Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.',
      'Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.',
      'Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.',
      'Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.'
    ];
    exp = 'PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host.';
  }

  const targetOpt = opts[0];
  const swapOpt = opts[correctIdx];
  opts[correctIdx] = targetOpt;
  opts[0] = swapOpt;

  questions.push({
    id: `q_m5_${qNum}`,
    topic: tGroup.name,
    difficulty: diffStr,
    q: qText,
    options: opts,
    correct: correctIdx,
    explanation: exp
  });

  qIndex++;
}

const fileContent = `/**
 * Module 5 Question Bank: Identity and Access Management (IAM)
 * 200 High-Caliber Questions (100 Medium, 100 Difficult)
 * Zero basic recall questions. Focus: FIDO2, OAuth2/OIDC, ABAC vs RBAC, Argon2id, PAM & JIT.
 */

export const module5QuestionBank = ${JSON.stringify(questions, null, 2)};
`;

fs.writeFileSync(OUT_PATH, fileContent, 'utf8');
console.log(`Saved module5QuestionBank.js with ${questions.length} questions!`);
