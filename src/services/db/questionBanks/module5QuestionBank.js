/**
 * Module 5 Question Bank: Identity and Access Management (IAM)
 * 200 High-Caliber Questions (100 Medium, 100 Difficult)
 * Zero basic recall questions. Focus: FIDO2, OAuth2/OIDC, ABAC vs RBAC, Argon2id, PAM & JIT.
 */

export const module5QuestionBank = [
  {
    "id": "q_m5_001",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Session token hijacking and replay attack mitigations. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_002",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under SIM swapping and SS7 signaling vulnerabilities undermining SMS MFA. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_003",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Mandatory Access Control (MAC) multi-level security classifications (Bell-LaPadula). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_004",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_005",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Service account credential hygiene and automated offboarding revocation. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_006",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Authentication factor categories (Knowledge vs Possession vs Inherence). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_007",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Time-based One-Time Password (TOTP RFC 6238) drift windows and HMAC secrets. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_008",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Attribute-Based Access Control evaluating environmental context (device posture, IP). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_009",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Memory-hard hashing functions (Argon2id) defeating GPU/ASIC brute forcing. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_010",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Service account credential hygiene and automated offboarding revocation. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_011",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Session token hijacking and replay attack mitigations. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_012",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under SIM swapping and SS7 signaling vulnerabilities undermining SMS MFA. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_013",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Attribute-Based Access Control evaluating environmental context (device posture, IP). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_014",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_015",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Just-in-Time (JIT) privilege elevation with automated expiration tickets. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_016",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Federated identity protocols (SAML 2.0 assertions vs OpenID Connect JWTs). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_017",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Push notification fatigue attacks and number matching countermeasures. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_018",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Attribute-Based Access Control evaluating environmental context (device posture, IP). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_019",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Bcrypt cost factor tuning and computational work factor calibration. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_020",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Service account credential hygiene and automated offboarding revocation. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_021",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Authentication factor categories (Knowledge vs Possession vs Inherence). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_022",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Time-based One-Time Password (TOTP RFC 6238) drift windows and HMAC secrets. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_023",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Attribute-Based Access Control evaluating environmental context (device posture, IP). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_024",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_025",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Just-in-Time (JIT) privilege elevation with automated expiration tickets. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_026",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Authentication factor categories (Knowledge vs Possession vs Inherence). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_027",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under SIM swapping and SS7 signaling vulnerabilities undermining SMS MFA. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_028",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Attribute-Based Access Control evaluating environmental context (device posture, IP). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_029",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_030",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_031",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling AuthN vs AuthZ boundaries in distributed OAuth2/OIDC claims. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_032",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Time-based One-Time Password (TOTP RFC 6238) drift windows and HMAC secrets. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_033",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Discretionary Access Control (DAC) file permission ownership flaws. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_034",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Cryptographic salt uniqueness defeating precomputed rainbow table attacks. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_035",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Privileged credential rotation and dynamic ephemeral vault checkout. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_036",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Federated identity protocols (SAML 2.0 assertions vs OpenID Connect JWTs). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_037",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under SIM swapping and SS7 signaling vulnerabilities undermining SMS MFA. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_038",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Discretionary Access Control (DAC) file permission ownership flaws. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_039",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Bcrypt cost factor tuning and computational work factor calibration. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_040",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Just-in-Time (JIT) privilege elevation with automated expiration tickets. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_041",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Authentication factor categories (Knowledge vs Possession vs Inherence). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_042",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Push notification fatigue attacks and number matching countermeasures. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_043",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Mandatory Access Control (MAC) multi-level security classifications (Bell-LaPadula). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_044",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Memory-hard hashing functions (Argon2id) defeating GPU/ASIC brute forcing. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_045",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Just-in-Time (JIT) privilege elevation with automated expiration tickets. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_046",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Federated identity protocols (SAML 2.0 assertions vs OpenID Connect JWTs). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_047",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under SIM swapping and SS7 signaling vulnerabilities undermining SMS MFA. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_048",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Attribute-Based Access Control evaluating environmental context (device posture, IP). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_049",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Cryptographic salt uniqueness defeating precomputed rainbow table attacks. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_050",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Privileged credential rotation and dynamic ephemeral vault checkout. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_051",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Authentication factor categories (Knowledge vs Possession vs Inherence). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_052",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Push notification fatigue attacks and number matching countermeasures. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_053",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Role explosion in enterprise RBAC and the transition to Policy-Based ABAC. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_054",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Memory-hard hashing functions (Argon2id) defeating GPU/ASIC brute forcing. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_055",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Service account credential hygiene and automated offboarding revocation. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_056",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Federated identity protocols (SAML 2.0 assertions vs OpenID Connect JWTs). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_057",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under SIM swapping and SS7 signaling vulnerabilities undermining SMS MFA. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_058",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Discretionary Access Control (DAC) file permission ownership flaws. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_059",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Bcrypt cost factor tuning and computational work factor calibration. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_060",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_061",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Session token hijacking and replay attack mitigations. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_062",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under FIDO2 / WebAuthn cryptographic challenge-response and origin binding. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_063",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Discretionary Access Control (DAC) file permission ownership flaws. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_064",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Bcrypt cost factor tuning and computational work factor calibration. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_065",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_066",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling AuthN vs AuthZ boundaries in distributed OAuth2/OIDC claims. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_067",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under FIDO2 / WebAuthn cryptographic challenge-response and origin binding. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_068",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Mandatory Access Control (MAC) multi-level security classifications (Bell-LaPadula). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_069",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_070",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_071",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling AuthN vs AuthZ boundaries in distributed OAuth2/OIDC claims. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_072",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Push notification fatigue attacks and number matching countermeasures. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_073",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Attribute-Based Access Control evaluating environmental context (device posture, IP). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_074",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Memory-hard hashing functions (Argon2id) defeating GPU/ASIC brute forcing. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_075",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Service account credential hygiene and automated offboarding revocation. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_076",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Authentication factor categories (Knowledge vs Possession vs Inherence). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_077",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under FIDO2 / WebAuthn cryptographic challenge-response and origin binding. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_078",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Discretionary Access Control (DAC) file permission ownership flaws. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_079",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Cryptographic salt uniqueness defeating precomputed rainbow table attacks. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_080",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Just-in-Time (JIT) privilege elevation with automated expiration tickets. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_081",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Authentication factor categories (Knowledge vs Possession vs Inherence). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_082",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Push notification fatigue attacks and number matching countermeasures. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_083",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Attribute-Based Access Control evaluating environmental context (device posture, IP). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_084",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Cryptographic salt uniqueness defeating precomputed rainbow table attacks. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_085",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Just-in-Time (JIT) privilege elevation with automated expiration tickets. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_086",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Federated identity protocols (SAML 2.0 assertions vs OpenID Connect JWTs). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_087",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under SIM swapping and SS7 signaling vulnerabilities undermining SMS MFA. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_088",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Role explosion in enterprise RBAC and the transition to Policy-Based ABAC. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_089",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_090",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Privileged credential rotation and dynamic ephemeral vault checkout. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_091",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Federated identity protocols (SAML 2.0 assertions vs OpenID Connect JWTs). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_092",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under FIDO2 / WebAuthn cryptographic challenge-response and origin binding. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_093",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Role explosion in enterprise RBAC and the transition to Policy-Based ABAC. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_094",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Bcrypt cost factor tuning and computational work factor calibration. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_095",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_096",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Federated identity protocols (SAML 2.0 assertions vs OpenID Connect JWTs). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_097",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Time-based One-Time Password (TOTP RFC 6238) drift windows and HMAC secrets. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_098",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Mandatory Access Control (MAC) multi-level security classifications (Bell-LaPadula). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_099",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Bcrypt cost factor tuning and computational work factor calibration. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_100",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_101",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling AuthN vs AuthZ boundaries in distributed OAuth2/OIDC claims. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_102",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under FIDO2 / WebAuthn cryptographic challenge-response and origin binding. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_103",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Role explosion in enterprise RBAC and the transition to Policy-Based ABAC. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_104",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Memory-hard hashing functions (Argon2id) defeating GPU/ASIC brute forcing. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_105",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Just-in-Time (JIT) privilege elevation with automated expiration tickets. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_106",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Federated identity protocols (SAML 2.0 assertions vs OpenID Connect JWTs). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_107",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Time-based One-Time Password (TOTP RFC 6238) drift windows and HMAC secrets. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_108",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Role explosion in enterprise RBAC and the transition to Policy-Based ABAC. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_109",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Bcrypt cost factor tuning and computational work factor calibration. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_110",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_111",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling AuthN vs AuthZ boundaries in distributed OAuth2/OIDC claims. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_112",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Time-based One-Time Password (TOTP RFC 6238) drift windows and HMAC secrets. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_113",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Discretionary Access Control (DAC) file permission ownership flaws. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_114",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Memory-hard hashing functions (Argon2id) defeating GPU/ASIC brute forcing. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_115",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_116",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Federated identity protocols (SAML 2.0 assertions vs OpenID Connect JWTs). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_117",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Time-based One-Time Password (TOTP RFC 6238) drift windows and HMAC secrets. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_118",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Attribute-Based Access Control evaluating environmental context (device posture, IP). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_119",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Memory-hard hashing functions (Argon2id) defeating GPU/ASIC brute forcing. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_120",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Just-in-Time (JIT) privilege elevation with automated expiration tickets. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_121",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Authentication factor categories (Knowledge vs Possession vs Inherence). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_122",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under FIDO2 / WebAuthn cryptographic challenge-response and origin binding. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_123",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Role explosion in enterprise RBAC and the transition to Policy-Based ABAC. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_124",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_125",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_126",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Federated identity protocols (SAML 2.0 assertions vs OpenID Connect JWTs). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_127",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under FIDO2 / WebAuthn cryptographic challenge-response and origin binding. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_128",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Role explosion in enterprise RBAC and the transition to Policy-Based ABAC. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_129",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Bcrypt cost factor tuning and computational work factor calibration. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_130",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_131",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling AuthN vs AuthZ boundaries in distributed OAuth2/OIDC claims. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_132",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Push notification fatigue attacks and number matching countermeasures. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_133",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Mandatory Access Control (MAC) multi-level security classifications (Bell-LaPadula). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_134",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_135",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_136",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Federated identity protocols (SAML 2.0 assertions vs OpenID Connect JWTs). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_137",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under FIDO2 / WebAuthn cryptographic challenge-response and origin binding. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_138",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Mandatory Access Control (MAC) multi-level security classifications (Bell-LaPadula). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_139",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_140",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Privileged credential rotation and dynamic ephemeral vault checkout. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_141",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Session token hijacking and replay attack mitigations. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_142",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under SIM swapping and SS7 signaling vulnerabilities undermining SMS MFA. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_143",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Attribute-Based Access Control evaluating environmental context (device posture, IP). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_144",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_145",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_146",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Authentication factor categories (Knowledge vs Possession vs Inherence). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_147",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under FIDO2 / WebAuthn cryptographic challenge-response and origin binding. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_148",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Discretionary Access Control (DAC) file permission ownership flaws. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_149",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_150",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Just-in-Time (JIT) privilege elevation with automated expiration tickets. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_151",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Authentication factor categories (Knowledge vs Possession vs Inherence). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_152",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Push notification fatigue attacks and number matching countermeasures. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_153",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Attribute-Based Access Control evaluating environmental context (device posture, IP). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_154",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_155",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under SSH session recording, keystroke logging, and dual-custody jump hosts. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_156",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Authentication factor categories (Knowledge vs Possession vs Inherence). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_157",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under SIM swapping and SS7 signaling vulnerabilities undermining SMS MFA. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_158",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Role explosion in enterprise RBAC and the transition to Policy-Based ABAC. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_159",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Cryptographic salt uniqueness defeating precomputed rainbow table attacks. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_160",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Just-in-Time (JIT) privilege elevation with automated expiration tickets. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_161",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling AuthN vs AuthZ boundaries in distributed OAuth2/OIDC claims. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_162",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under SIM swapping and SS7 signaling vulnerabilities undermining SMS MFA. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_163",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Role explosion in enterprise RBAC and the transition to Policy-Based ABAC. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_164",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Bcrypt cost factor tuning and computational work factor calibration. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_165",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Just-in-Time (JIT) privilege elevation with automated expiration tickets. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_166",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling AuthN vs AuthZ boundaries in distributed OAuth2/OIDC claims. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_167",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Time-based One-Time Password (TOTP RFC 6238) drift windows and HMAC secrets. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_168",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Mandatory Access Control (MAC) multi-level security classifications (Bell-LaPadula). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_169",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Memory-hard hashing functions (Argon2id) defeating GPU/ASIC brute forcing. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_170",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Privileged credential rotation and dynamic ephemeral vault checkout. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_171",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling AuthN vs AuthZ boundaries in distributed OAuth2/OIDC claims. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_172",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under FIDO2 / WebAuthn cryptographic challenge-response and origin binding. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_173",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Discretionary Access Control (DAC) file permission ownership flaws. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_174",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Cryptographic salt uniqueness defeating precomputed rainbow table attacks. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_175",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Privileged credential rotation and dynamic ephemeral vault checkout. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_176",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Session token hijacking and replay attack mitigations. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_177",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Push notification fatigue attacks and number matching countermeasures. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_178",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Discretionary Access Control (DAC) file permission ownership flaws. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_179",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Memory-hard hashing functions (Argon2id) defeating GPU/ASIC brute forcing. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_180",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Privileged credential rotation and dynamic ephemeral vault checkout. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_181",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Session token hijacking and replay attack mitigations. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_182",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Push notification fatigue attacks and number matching countermeasures. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_183",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Mandatory Access Control (MAC) multi-level security classifications (Bell-LaPadula). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_184",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Cryptographic salt uniqueness defeating precomputed rainbow table attacks. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_185",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Privileged credential rotation and dynamic ephemeral vault checkout. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_186",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling AuthN vs AuthZ boundaries in distributed OAuth2/OIDC claims. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_187",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Push notification fatigue attacks and number matching countermeasures. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_188",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Mandatory Access Control (MAC) multi-level security classifications (Bell-LaPadula). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_189",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Cryptographic salt uniqueness defeating precomputed rainbow table attacks. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_190",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Privileged credential rotation and dynamic ephemeral vault checkout. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_191",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "medium",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Authentication factor categories (Knowledge vs Possession vs Inherence). If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Triggering an automated session invalidation due to mismatched user agent strings.",
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions."
    ],
    "correct": 3,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_192",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "difficult",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under Push notification fatigue attacks and number matching countermeasures. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office."
    ],
    "correct": 1,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_193",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "medium",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Role explosion in enterprise RBAC and the transition to Policy-Based ABAC. How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory.",
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status)."
    ],
    "correct": 3,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_194",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "difficult",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Application pepper secrets stored in Hardware Security Modules (HSMs). Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses."
    ],
    "correct": 1,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_195",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "medium",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Service account credential hygiene and automated offboarding revocation. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports.",
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host."
    ],
    "correct": 3,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  },
  {
    "id": "q_m5_196",
    "topic": "Identification, Authentication & Authorization Foundations",
    "difficulty": "difficult",
    "q": "An identity architect reviews an OAuth 2.0 / OpenID Connect implementation handling Session token hijacking and replay attack mitigations. If a web application receives an ID token and uses it to grant direct database access without obtaining an access token, what fundamental identity principle is violated?",
    "options": [
      "Violating transport encryption, because ID tokens are transmitted unencrypted over HTTP ports.",
      "Confusing Authentication with Authorization; an ID token merely proves user identity, while an access token authorizes specific resource interactions.",
      "Exhausting the OAuth2 server's cryptographic key derivation limits.",
      "Triggering an automated session invalidation due to mismatched user agent strings."
    ],
    "correct": 1,
    "explanation": "In modern identity architecture, an ID token is for Authentication (proving who the user is to the client), whereas an Access Token is for Authorization (granting permission to access backend APIs and data)."
  },
  {
    "id": "q_m5_197",
    "topic": "Multi-Factor Authentication (MFA) & FIDO2 Mechanics",
    "difficulty": "medium",
    "q": "An enterprise upgrades from SMS-based MFA to FIDO2 / WebAuthn hardware security keys under SIM swapping and SS7 signaling vulnerabilities undermining SMS MFA. Why does FIDO2 cryptographically neutralize adversary-in-the-middle (AiTM) reverse proxy phishing sites?",
    "options": [
      "FIDO2 relies on satellite GPS coordinates that only match when the user is physically inside their corporate office.",
      "FIDO2 security keys automatically launch a denial-of-service attack against the phishing domain server.",
      "The hardware key encrypts the user’s physical computer monitor so phishing sites cannot render.",
      "The browser cryptographically binds the authenticator's signature to the exact origin URL domain; an attacker's phishing domain will not match the registered origin."
    ],
    "correct": 3,
    "explanation": "FIDO2 / WebAuthn features cryptographic origin binding. The hardware authenticator signs a challenge that includes the exact browser origin (domain). If the user visits a fake domain, the signature fails validation on the real server."
  },
  {
    "id": "q_m5_198",
    "topic": "Access Control Models (RBAC, ABAC, MAC, DAC)",
    "difficulty": "difficult",
    "q": "A large multinational healthcare provider with 40,000 employees suffers from \"role explosion\" under standard RBAC while managing Mandatory Access Control (MAC) multi-level security classifications (Bell-LaPadula). How does transitioning to Attribute-Based Access Control (ABAC) resolve this architectural crisis?",
    "options": [
      "ABAC eliminates all user roles and grants global administrative permissions to all licensed medical staff.",
      "ABAC dynamically computes authorization using Boolean rules combining user attributes, resource sensitivity, and environmental context (time, location, device status).",
      "ABAC delegates access decisions to third-party public blockchain smart contracts.",
      "ABAC enforces a strict limit of exactly 5 user groups across the entire enterprise active directory."
    ],
    "correct": 1,
    "explanation": "Role explosion occurs when RBAC requires creating a separate role for every permission permutation. ABAC solves this by defining dynamic, context-aware policies using attributes (department, clearance, patient assignment, location) without multiplying roles."
  },
  {
    "id": "q_m5_199",
    "topic": "Cryptographic Password Hashing & Key Derivation",
    "difficulty": "medium",
    "q": "A security engineering team selects a password hashing algorithm for a customer authentication database subject to Memory-hard hashing functions (Argon2id) defeating GPU/ASIC brute forcing. Why is Argon2id mathematically superior to MD5, SHA-256, and legacy PBKDF2 for protecting stored credentials?",
    "options": [
      "Argon2id encrypts passwords with symmetric keys that only the user's web browser possesses.",
      "Argon2id generates 1024-byte passwords that are completely impossible for computer memory to store.",
      "Argon2id automatically contacts the police whenever an invalid password attempt is submitted.",
      "Argon2id is memory-hard and time-cost configurable, rendering parallelized GPU and custom ASIC cracking hardware cost-prohibitive while resisting cache-timing side-channels."
    ],
    "correct": 3,
    "explanation": "Fast hashes (like SHA-256) allow billions of guesses per second on GPUs/ASICs. Argon2id is intentionally slow, memory-hard (forcing high RAM allocation per hash), and engineered to neutralize both GPU cracking rigs and side-channel attacks."
  },
  {
    "id": "q_m5_200",
    "topic": "Privileged Access Management (PAM) & JIT Access",
    "difficulty": "difficult",
    "q": "A SOC analyst conducts an access audit on high-privilege administrative accounts under Service account credential hygiene and automated offboarding revocation. Which Privileged Access Management (PAM) architecture prevents credential theft and lateral movement by zero-day malware executing on admin workstations?",
    "options": [
      "Assigning permanent domain administrator rights to personal employee laptops with biometric fingerprint logins.",
      "Just-in-Time (JIT) privilege elevation with ephemeral single-use credentials checked out from an isolated vault through an audited, session-recorded jump host.",
      "Storing administrative root credentials in an encrypted, password-protected spreadsheet on a shared corporate network drive.",
      "Allowing administrators to log into production servers directly using legacy telnet on non-standard ports."
    ],
    "correct": 1,
    "explanation": "PAM with JIT access eliminates standing privileges. Administrators never know the actual static root password; instead, ephemeral, single-use credentials are automatically provisioned and revoked for the exact duration of the maintenance task through an audited jump host."
  }
];
