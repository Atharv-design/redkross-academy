/**
 * Module 6 Question Bank: Cybersecurity Practices, Operations, Governance & Career Development
 * 200 High-Caliber Questions (100 Medium, 100 Difficult)
 * Zero basic recall questions. Focus: Controls, NIST CSF 2.0, Applied Cryptography, SOC/SIEM, Forensics (RFC 3227), IT Act 2000, DPDP & NICE Framework.
 */

export const module6QuestionBank = [
  {
    "id": "q_m6_001",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "medium",
    "q": "An enterprise deploys an automated EDR rule that immediately quarantines a compromised laptop from the local network upon detecting mimikatz execution. How is this defensive control classified by nature and by operational function?",
    "options": [
      "Administrative nature and Preventive function; it is a written policy signed by executive leadership.",
      "Physical nature and Detective function; it physically locks the laptop inside a security cabinet.",
      "Compensating nature and Deterrent function; it reduces user morale through active warning messages.",
      "Technical nature and Corrective function; it uses software logic to isolate the host and remediate active damage."
    ],
    "correct": 3,
    "explanation": "The control is implemented in software/hardware logic (Technical) and acts post-compromise to contain the spread of malware and remediate impact (Corrective)."
  },
  {
    "id": "q_m6_002",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "medium",
    "q": "What major governance advancement was officially introduced in the core functions of the NIST Cybersecurity Framework (CSF) version 2.0?",
    "options": [
      "Mandating that all US corporations must exclusively deploy open-source Linux software.",
      "Requiring all employees to pass a government polygraph examination annually.",
      "The addition of the Govern (GV) function to establish enterprise strategy, supply chain risk, and executive oversight.",
      "The complete deprecation of the Recover (RC) function in favor of cyber insurance payouts."
    ],
    "correct": 2,
    "explanation": "NIST CSF 2.0 introduced the 'Govern' (GV) core function as an overarching pillar covering organizational strategy, policy, leadership roles, and supply chain risk management."
  },
  {
    "id": "q_m6_003",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "medium",
    "q": "Why does legacy Antivirus (AV) relying on MD5/SHA-256 signature matching fail completely against modern fileless malware and living-off-the-land binaries (LOLBins)?",
    "options": [
      "Because Microsoft Windows automatically disables antivirus protection whenever PowerShell is launched.",
      "Because fileless attacks execute directly in system RAM using legitimate built-in operating system binaries (e.g., PowerShell, WMI) without writing suspicious executable files to disk.",
      "Because Antivirus software is only capable of scanning floppy disks and CD-ROM drives.",
      "Because hash algorithms are mathematically incapable of computing digests on modern 64-bit operating systems."
    ],
    "correct": 1,
    "explanation": "Fileless attacks and LOLBins execute malicious commands directly in volatile memory using trusted native utilities (powershell.exe, mshta.exe), producing no new malicious binary file on disk for static hash scanners to match."
  },
  {
    "id": "q_m6_004",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "medium",
    "q": "Why do modern communication protocols (like TLS 1.3 and SSH) deploy hybrid cryptosystems rather than relying solely on asymmetric cryptography for all data transmission?",
    "options": [
      "Because asymmetric encryption is computationally expensive and orders of magnitude slower than symmetric ciphers; hybrid systems use asymmetric keys only to exchange a session key, then switch to fast symmetric AES-GCM.",
      "Because asymmetric encryption cannot encrypt text that contains numbers or special characters.",
      "Because symmetric encryption keys are legally required to be public records under international trade law.",
      "Because asymmetric algorithms can only operate over physical analog telephone lines."
    ],
    "correct": 0,
    "explanation": "Asymmetric algorithms (RSA, ECC) involve complex modular arithmetic and are far too slow for bulk traffic. Hybrid cryptosystems use asymmetric ciphers to negotiate a symmetric key, then encrypt data at wire speed using AES or ChaCha20."
  },
  {
    "id": "q_m6_005",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "medium",
    "q": "In modern Public Key Infrastructure (PKI), how does a client web browser verify that an X.509 digital certificate presented by a web server is authentic and trustworthy?",
    "options": [
      "The browser calls the web server administrator on the telephone to confirm the serial number.",
      "The browser generates a random password and checks if the web server can guess it within 3 seconds.",
      "The browser checks if the certificate is printed on official watermarked security paper.",
      "The browser cryptographically verifies the Certificate Authority's (CA) digital signature on the certificate using the public key of a trusted Root CA pre-installed in the browser's Root Store."
    ],
    "correct": 3,
    "explanation": "Browsers maintain a trusted Root Store. They validate the cryptographic signature on the server's certificate by tracing intermediate signatures up to an embedded Root CA public key."
  },
  {
    "id": "q_m6_006",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "medium",
    "q": "In cloud data architecture, how does the Envelope Encryption design pattern protect massive data sets stored in cloud object storage (e.g., AWS S3, Azure Blob)?",
    "options": [
      "The data is encrypted using the user's social security number as a static symmetric key.",
      "The data is divided into 5-byte chunks and distributed across public social media platforms.",
      "The data payload is encrypted locally with a unique Data Encryption Key (DEK), which is then encrypted by a Key Encryption Key (KEK) managed within a centralized Key Management Service (KMS).",
      "The cloud provider prints all database records onto microfilm and stores them in an underground mountain vault."
    ],
    "correct": 2,
    "explanation": "Envelope encryption encrypts data directly with a fast local DEK. The DEK itself is encrypted (wrapped) by a master KEK housed securely inside a KMS/HSM, and stored alongside the ciphertext."
  },
  {
    "id": "q_m6_007",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "medium",
    "q": "In a tier-structured Security Operations Center (SOC), what is the primary operational responsibility of a Tier 1 Triage Analyst?",
    "options": [
      "Rewiring physical fiber optic backbone cables in corporate data centers.",
      "Monitoring incoming SIEM alert queues in real time, filtering out false positives, validating true positive alerts, and performing initial playbook-driven containment.",
      "Reverse engineering zero-day kernel exploits and writing commercial exploitation frameworks.",
      "Negotiating ransom payment demands directly with international cybercriminal cartels."
    ],
    "correct": 1,
    "explanation": "Tier 1 triage analysts monitor alerts, eliminate benign noise/false positives, perform initial artifact validation, and escalate confirmed threats to Tier 2 incident responders."
  },
  {
    "id": "q_m6_008",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "medium",
    "q": "According to RFC 3227 (Guidelines for Evidence Collection and Archiving), what is the first source of digital evidence an investigator must acquire from a running compromised computer?",
    "options": [
      "The most volatile memory states: CPU registers, cache, and physical system RAM.",
      "The computer's mechanical hard disk drive after shutting down the power supply.",
      "The printed paper invoices stored in the accounting filing cabinet.",
      "The offsite magnetic backup tapes stored in the disaster recovery warehouse."
    ],
    "correct": 0,
    "explanation": "RFC 3227 establishes the Order of Volatility: capture the most ephemeral data first (Registers/Cache, then RAM, then Network state) before powering down, as volatile data vanishes upon reboot."
  },
  {
    "id": "q_m6_009",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "medium",
    "q": "Under the Information Technology Act, 2000 (Section 66C), what specific cybercrime is penalized with up to 3 years imprisonment and fines up to ₹1 Lakh?",
    "options": [
      "Failing to install an antivirus software program on a personal home computer.",
      "Downloading a copyrighted open-source software library without paying licensing fees.",
      "Operating a personal website without registering with the local municipal police.",
      "Identity theft; the fraudulent or dishonest use of another person's electronic signature, password, or unique identification feature."
    ],
    "correct": 3,
    "explanation": "Section 66C of the IT Act criminalizes identity theft, specifically targeting the fraudulent use of another person's digital signature, password, or unique authentication credentials."
  },
  {
    "id": "q_m6_010",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "medium",
    "q": "In the National Initiative for Cybersecurity Education (NICE) Workforce Framework (NIST SP 800-181), which workforce category includes roles responsible for identifying, analyzing, and mitigating threats to internal networks?",
    "options": [
      "Collect and Operate (CO); encompassing Physical Janitorial and Environmental Facilities Maintenance.",
      "Security Provision (SP); encompassing Graphic Design and UI/UX Illustration.",
      "Protect and Defend (PR); encompassing Defensive Cyber Operations, Incident Response, and Vulnerability Assessment.",
      "Oversee and Govern (OV); encompassing Marketing, Public Relations, and Sales Operations."
    ],
    "correct": 2,
    "explanation": "The 'Protect and Defend' (PR) category in the NICE Framework encompasses operational defense, including Incident Response, Cyber Defense Analysis, and Infrastructure Support."
  },
  {
    "id": "q_m6_011",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "medium",
    "q": "[Scenario 2 - Enterprise Governance & Controls Audit] Evaluating security controls classification (admin, technical, physical & preventive, detective, corrective): An enterprise deploys an automated EDR rule that immediately quarantines a compromised laptop from the local network upon detecting mimikatz execution. How is this defensive control classified by nature and by operational function?",
    "options": [
      "Compensating nature and Deterrent function; it reduces user morale through active warning messages.",
      "Technical nature and Corrective function; it uses software logic to isolate the host and remediate active damage.",
      "Administrative nature and Preventive function; it is a written policy signed by executive leadership.",
      "Physical nature and Detective function; it physically locks the laptop inside a security cabinet."
    ],
    "correct": 1,
    "explanation": "The control is implemented in software/hardware logic (Technical) and acts post-compromise to contain the spread of malware and remediate impact (Corrective)."
  },
  {
    "id": "q_m6_012",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "medium",
    "q": "[Scenario 2 - Enterprise Governance & Controls Audit] Evaluating cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: What major governance advancement was officially introduced in the core functions of the NIST Cybersecurity Framework (CSF) version 2.0?",
    "options": [
      "The addition of the Govern (GV) function to establish enterprise strategy, supply chain risk, and executive oversight.",
      "The complete deprecation of the Recover (RC) function in favor of cyber insurance payouts.",
      "Mandating that all US corporations must exclusively deploy open-source Linux software.",
      "Requiring all employees to pass a government polygraph examination annually."
    ],
    "correct": 0,
    "explanation": "NIST CSF 2.0 introduced the 'Govern' (GV) core function as an overarching pillar covering organizational strategy, policy, leadership roles, and supply chain risk management."
  },
  {
    "id": "q_m6_013",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "medium",
    "q": "[Scenario 2 - Enterprise Governance & Controls Audit] Evaluating endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: Why does legacy Antivirus (AV) relying on MD5/SHA-256 signature matching fail completely against modern fileless malware and living-off-the-land binaries (LOLBins)?",
    "options": [
      "Because Antivirus software is only capable of scanning floppy disks and CD-ROM drives.",
      "Because hash algorithms are mathematically incapable of computing digests on modern 64-bit operating systems.",
      "Because Microsoft Windows automatically disables antivirus protection whenever PowerShell is launched.",
      "Because fileless attacks execute directly in system RAM using legitimate built-in operating system binaries (e.g., PowerShell, WMI) without writing suspicious executable files to disk."
    ],
    "correct": 3,
    "explanation": "Fileless attacks and LOLBins execute malicious commands directly in volatile memory using trusted native utilities (powershell.exe, mshta.exe), producing no new malicious binary file on disk for static hash scanners to match."
  },
  {
    "id": "q_m6_014",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "medium",
    "q": "[Scenario 2 - Enterprise Governance & Controls Audit] Evaluating applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: Why do modern communication protocols (like TLS 1.3 and SSH) deploy hybrid cryptosystems rather than relying solely on asymmetric cryptography for all data transmission?",
    "options": [
      "Because symmetric encryption keys are legally required to be public records under international trade law.",
      "Because asymmetric algorithms can only operate over physical analog telephone lines.",
      "Because asymmetric encryption is computationally expensive and orders of magnitude slower than symmetric ciphers; hybrid systems use asymmetric keys only to exchange a session key, then switch to fast symmetric AES-GCM.",
      "Because asymmetric encryption cannot encrypt text that contains numbers or special characters."
    ],
    "correct": 2,
    "explanation": "Asymmetric algorithms (RSA, ECC) involve complex modular arithmetic and are far too slow for bulk traffic. Hybrid cryptosystems use asymmetric ciphers to negotiate a symmetric key, then encrypt data at wire speed using AES or ChaCha20."
  },
  {
    "id": "q_m6_015",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "medium",
    "q": "[Scenario 2 - Enterprise Governance & Controls Audit] Evaluating pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: In modern Public Key Infrastructure (PKI), how does a client web browser verify that an X.509 digital certificate presented by a web server is authentic and trustworthy?",
    "options": [
      "The browser checks if the certificate is printed on official watermarked security paper.",
      "The browser cryptographically verifies the Certificate Authority's (CA) digital signature on the certificate using the public key of a trusted Root CA pre-installed in the browser's Root Store.",
      "The browser calls the web server administrator on the telephone to confirm the serial number.",
      "The browser generates a random password and checks if the web server can guess it within 3 seconds."
    ],
    "correct": 1,
    "explanation": "Browsers maintain a trusted Root Store. They validate the cryptographic signature on the server's certificate by tracing intermediate signatures up to an embedded Root CA public key."
  },
  {
    "id": "q_m6_016",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "medium",
    "q": "[Scenario 2 - Enterprise Governance & Controls Audit] Evaluating data states: data at rest (envelope encryption), in transit & in use (tees): In cloud data architecture, how does the Envelope Encryption design pattern protect massive data sets stored in cloud object storage (e.g., AWS S3, Azure Blob)?",
    "options": [
      "The data payload is encrypted locally with a unique Data Encryption Key (DEK), which is then encrypted by a Key Encryption Key (KEK) managed within a centralized Key Management Service (KMS).",
      "The cloud provider prints all database records onto microfilm and stores them in an underground mountain vault.",
      "The data is encrypted using the user's social security number as a static symmetric key.",
      "The data is divided into 5-byte chunks and distributed across public social media platforms."
    ],
    "correct": 0,
    "explanation": "Envelope encryption encrypts data directly with a fast local DEK. The DEK itself is encrypted (wrapped) by a master KEK housed securely inside a KMS/HSM, and stored alongside the ciphertext."
  },
  {
    "id": "q_m6_017",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "medium",
    "q": "[Scenario 2 - Enterprise Governance & Controls Audit] Evaluating security operations center (soc) architecture, siem & soar automation: In a tier-structured Security Operations Center (SOC), what is the primary operational responsibility of a Tier 1 Triage Analyst?",
    "options": [
      "Reverse engineering zero-day kernel exploits and writing commercial exploitation frameworks.",
      "Negotiating ransom payment demands directly with international cybercriminal cartels.",
      "Rewiring physical fiber optic backbone cables in corporate data centers.",
      "Monitoring incoming SIEM alert queues in real time, filtering out false positives, validating true positive alerts, and performing initial playbook-driven containment."
    ],
    "correct": 3,
    "explanation": "Tier 1 triage analysts monitor alerts, eliminate benign noise/false positives, perform initial artifact validation, and escalate confirmed threats to Tier 2 incident responders."
  },
  {
    "id": "q_m6_018",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "medium",
    "q": "[Scenario 2 - Enterprise Governance & Controls Audit] Evaluating incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): According to RFC 3227 (Guidelines for Evidence Collection and Archiving), what is the first source of digital evidence an investigator must acquire from a running compromised computer?",
    "options": [
      "The printed paper invoices stored in the accounting filing cabinet.",
      "The offsite magnetic backup tapes stored in the disaster recovery warehouse.",
      "The most volatile memory states: CPU registers, cache, and physical system RAM.",
      "The computer's mechanical hard disk drive after shutting down the power supply."
    ],
    "correct": 2,
    "explanation": "RFC 3227 establishes the Order of Volatility: capture the most ephemeral data first (Registers/Cache, then RAM, then Network state) before powering down, as volatile data vanishes upon reboot."
  },
  {
    "id": "q_m6_019",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "medium",
    "q": "[Scenario 2 - Enterprise Governance & Controls Audit] Evaluating cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Information Technology Act, 2000 (Section 66C), what specific cybercrime is penalized with up to 3 years imprisonment and fines up to ₹1 Lakh?",
    "options": [
      "Operating a personal website without registering with the local municipal police.",
      "Identity theft; the fraudulent or dishonest use of another person's electronic signature, password, or unique identification feature.",
      "Failing to install an antivirus software program on a personal home computer.",
      "Downloading a copyrighted open-source software library without paying licensing fees."
    ],
    "correct": 1,
    "explanation": "Section 66C of the IT Act criminalizes identity theft, specifically targeting the fraudulent use of another person's digital signature, password, or unique authentication credentials."
  },
  {
    "id": "q_m6_020",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "medium",
    "q": "[Scenario 2 - Enterprise Governance & Controls Audit] Evaluating nice workforce framework, red/blue/purple teams & home lab engineering: In the National Initiative for Cybersecurity Education (NICE) Workforce Framework (NIST SP 800-181), which workforce category includes roles responsible for identifying, analyzing, and mitigating threats to internal networks?",
    "options": [
      "Protect and Defend (PR); encompassing Defensive Cyber Operations, Incident Response, and Vulnerability Assessment.",
      "Oversee and Govern (OV); encompassing Marketing, Public Relations, and Sales Operations.",
      "Collect and Operate (CO); encompassing Physical Janitorial and Environmental Facilities Maintenance.",
      "Security Provision (SP); encompassing Graphic Design and UI/UX Illustration."
    ],
    "correct": 0,
    "explanation": "The 'Protect and Defend' (PR) category in the NICE Framework encompasses operational defense, including Incident Response, Cyber Defense Analysis, and Infrastructure Support."
  },
  {
    "id": "q_m6_021",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "medium",
    "q": "[Scenario 3 - Enterprise Governance & Controls Audit] Evaluating security controls classification (admin, technical, physical & preventive, detective, corrective): An enterprise deploys an automated EDR rule that immediately quarantines a compromised laptop from the local network upon detecting mimikatz execution. How is this defensive control classified by nature and by operational function?",
    "options": [
      "Administrative nature and Preventive function; it is a written policy signed by executive leadership.",
      "Physical nature and Detective function; it physically locks the laptop inside a security cabinet.",
      "Compensating nature and Deterrent function; it reduces user morale through active warning messages.",
      "Technical nature and Corrective function; it uses software logic to isolate the host and remediate active damage."
    ],
    "correct": 3,
    "explanation": "The control is implemented in software/hardware logic (Technical) and acts post-compromise to contain the spread of malware and remediate impact (Corrective)."
  },
  {
    "id": "q_m6_022",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "medium",
    "q": "[Scenario 3 - Enterprise Governance & Controls Audit] Evaluating cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: What major governance advancement was officially introduced in the core functions of the NIST Cybersecurity Framework (CSF) version 2.0?",
    "options": [
      "Mandating that all US corporations must exclusively deploy open-source Linux software.",
      "Requiring all employees to pass a government polygraph examination annually.",
      "The addition of the Govern (GV) function to establish enterprise strategy, supply chain risk, and executive oversight.",
      "The complete deprecation of the Recover (RC) function in favor of cyber insurance payouts."
    ],
    "correct": 2,
    "explanation": "NIST CSF 2.0 introduced the 'Govern' (GV) core function as an overarching pillar covering organizational strategy, policy, leadership roles, and supply chain risk management."
  },
  {
    "id": "q_m6_023",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "medium",
    "q": "[Scenario 3 - Enterprise Governance & Controls Audit] Evaluating endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: Why does legacy Antivirus (AV) relying on MD5/SHA-256 signature matching fail completely against modern fileless malware and living-off-the-land binaries (LOLBins)?",
    "options": [
      "Because Microsoft Windows automatically disables antivirus protection whenever PowerShell is launched.",
      "Because fileless attacks execute directly in system RAM using legitimate built-in operating system binaries (e.g., PowerShell, WMI) without writing suspicious executable files to disk.",
      "Because Antivirus software is only capable of scanning floppy disks and CD-ROM drives.",
      "Because hash algorithms are mathematically incapable of computing digests on modern 64-bit operating systems."
    ],
    "correct": 1,
    "explanation": "Fileless attacks and LOLBins execute malicious commands directly in volatile memory using trusted native utilities (powershell.exe, mshta.exe), producing no new malicious binary file on disk for static hash scanners to match."
  },
  {
    "id": "q_m6_024",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "medium",
    "q": "[Scenario 3 - Enterprise Governance & Controls Audit] Evaluating applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: Why do modern communication protocols (like TLS 1.3 and SSH) deploy hybrid cryptosystems rather than relying solely on asymmetric cryptography for all data transmission?",
    "options": [
      "Because asymmetric encryption is computationally expensive and orders of magnitude slower than symmetric ciphers; hybrid systems use asymmetric keys only to exchange a session key, then switch to fast symmetric AES-GCM.",
      "Because asymmetric encryption cannot encrypt text that contains numbers or special characters.",
      "Because symmetric encryption keys are legally required to be public records under international trade law.",
      "Because asymmetric algorithms can only operate over physical analog telephone lines."
    ],
    "correct": 0,
    "explanation": "Asymmetric algorithms (RSA, ECC) involve complex modular arithmetic and are far too slow for bulk traffic. Hybrid cryptosystems use asymmetric ciphers to negotiate a symmetric key, then encrypt data at wire speed using AES or ChaCha20."
  },
  {
    "id": "q_m6_025",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "medium",
    "q": "[Scenario 3 - Enterprise Governance & Controls Audit] Evaluating pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: In modern Public Key Infrastructure (PKI), how does a client web browser verify that an X.509 digital certificate presented by a web server is authentic and trustworthy?",
    "options": [
      "The browser calls the web server administrator on the telephone to confirm the serial number.",
      "The browser generates a random password and checks if the web server can guess it within 3 seconds.",
      "The browser checks if the certificate is printed on official watermarked security paper.",
      "The browser cryptographically verifies the Certificate Authority's (CA) digital signature on the certificate using the public key of a trusted Root CA pre-installed in the browser's Root Store."
    ],
    "correct": 3,
    "explanation": "Browsers maintain a trusted Root Store. They validate the cryptographic signature on the server's certificate by tracing intermediate signatures up to an embedded Root CA public key."
  },
  {
    "id": "q_m6_026",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "medium",
    "q": "[Scenario 3 - Enterprise Governance & Controls Audit] Evaluating data states: data at rest (envelope encryption), in transit & in use (tees): In cloud data architecture, how does the Envelope Encryption design pattern protect massive data sets stored in cloud object storage (e.g., AWS S3, Azure Blob)?",
    "options": [
      "The data is encrypted using the user's social security number as a static symmetric key.",
      "The data is divided into 5-byte chunks and distributed across public social media platforms.",
      "The data payload is encrypted locally with a unique Data Encryption Key (DEK), which is then encrypted by a Key Encryption Key (KEK) managed within a centralized Key Management Service (KMS).",
      "The cloud provider prints all database records onto microfilm and stores them in an underground mountain vault."
    ],
    "correct": 2,
    "explanation": "Envelope encryption encrypts data directly with a fast local DEK. The DEK itself is encrypted (wrapped) by a master KEK housed securely inside a KMS/HSM, and stored alongside the ciphertext."
  },
  {
    "id": "q_m6_027",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "medium",
    "q": "[Scenario 3 - Enterprise Governance & Controls Audit] Evaluating security operations center (soc) architecture, siem & soar automation: In a tier-structured Security Operations Center (SOC), what is the primary operational responsibility of a Tier 1 Triage Analyst?",
    "options": [
      "Rewiring physical fiber optic backbone cables in corporate data centers.",
      "Monitoring incoming SIEM alert queues in real time, filtering out false positives, validating true positive alerts, and performing initial playbook-driven containment.",
      "Reverse engineering zero-day kernel exploits and writing commercial exploitation frameworks.",
      "Negotiating ransom payment demands directly with international cybercriminal cartels."
    ],
    "correct": 1,
    "explanation": "Tier 1 triage analysts monitor alerts, eliminate benign noise/false positives, perform initial artifact validation, and escalate confirmed threats to Tier 2 incident responders."
  },
  {
    "id": "q_m6_028",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "medium",
    "q": "[Scenario 3 - Enterprise Governance & Controls Audit] Evaluating incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): According to RFC 3227 (Guidelines for Evidence Collection and Archiving), what is the first source of digital evidence an investigator must acquire from a running compromised computer?",
    "options": [
      "The most volatile memory states: CPU registers, cache, and physical system RAM.",
      "The computer's mechanical hard disk drive after shutting down the power supply.",
      "The printed paper invoices stored in the accounting filing cabinet.",
      "The offsite magnetic backup tapes stored in the disaster recovery warehouse."
    ],
    "correct": 0,
    "explanation": "RFC 3227 establishes the Order of Volatility: capture the most ephemeral data first (Registers/Cache, then RAM, then Network state) before powering down, as volatile data vanishes upon reboot."
  },
  {
    "id": "q_m6_029",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "medium",
    "q": "[Scenario 3 - Enterprise Governance & Controls Audit] Evaluating cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Information Technology Act, 2000 (Section 66C), what specific cybercrime is penalized with up to 3 years imprisonment and fines up to ₹1 Lakh?",
    "options": [
      "Failing to install an antivirus software program on a personal home computer.",
      "Downloading a copyrighted open-source software library without paying licensing fees.",
      "Operating a personal website without registering with the local municipal police.",
      "Identity theft; the fraudulent or dishonest use of another person's electronic signature, password, or unique identification feature."
    ],
    "correct": 3,
    "explanation": "Section 66C of the IT Act criminalizes identity theft, specifically targeting the fraudulent use of another person's digital signature, password, or unique authentication credentials."
  },
  {
    "id": "q_m6_030",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "medium",
    "q": "[Scenario 3 - Enterprise Governance & Controls Audit] Evaluating nice workforce framework, red/blue/purple teams & home lab engineering: In the National Initiative for Cybersecurity Education (NICE) Workforce Framework (NIST SP 800-181), which workforce category includes roles responsible for identifying, analyzing, and mitigating threats to internal networks?",
    "options": [
      "Collect and Operate (CO); encompassing Physical Janitorial and Environmental Facilities Maintenance.",
      "Security Provision (SP); encompassing Graphic Design and UI/UX Illustration.",
      "Protect and Defend (PR); encompassing Defensive Cyber Operations, Incident Response, and Vulnerability Assessment.",
      "Oversee and Govern (OV); encompassing Marketing, Public Relations, and Sales Operations."
    ],
    "correct": 2,
    "explanation": "The 'Protect and Defend' (PR) category in the NICE Framework encompasses operational defense, including Incident Response, Cyber Defense Analysis, and Infrastructure Support."
  },
  {
    "id": "q_m6_031",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "medium",
    "q": "[Scenario 4 - Enterprise Governance & Controls Audit] Evaluating security controls classification (admin, technical, physical & preventive, detective, corrective): An enterprise deploys an automated EDR rule that immediately quarantines a compromised laptop from the local network upon detecting mimikatz execution. How is this defensive control classified by nature and by operational function?",
    "options": [
      "Compensating nature and Deterrent function; it reduces user morale through active warning messages.",
      "Technical nature and Corrective function; it uses software logic to isolate the host and remediate active damage.",
      "Administrative nature and Preventive function; it is a written policy signed by executive leadership.",
      "Physical nature and Detective function; it physically locks the laptop inside a security cabinet."
    ],
    "correct": 1,
    "explanation": "The control is implemented in software/hardware logic (Technical) and acts post-compromise to contain the spread of malware and remediate impact (Corrective)."
  },
  {
    "id": "q_m6_032",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "medium",
    "q": "[Scenario 4 - Enterprise Governance & Controls Audit] Evaluating cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: What major governance advancement was officially introduced in the core functions of the NIST Cybersecurity Framework (CSF) version 2.0?",
    "options": [
      "The addition of the Govern (GV) function to establish enterprise strategy, supply chain risk, and executive oversight.",
      "The complete deprecation of the Recover (RC) function in favor of cyber insurance payouts.",
      "Mandating that all US corporations must exclusively deploy open-source Linux software.",
      "Requiring all employees to pass a government polygraph examination annually."
    ],
    "correct": 0,
    "explanation": "NIST CSF 2.0 introduced the 'Govern' (GV) core function as an overarching pillar covering organizational strategy, policy, leadership roles, and supply chain risk management."
  },
  {
    "id": "q_m6_033",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "medium",
    "q": "[Scenario 4 - Enterprise Governance & Controls Audit] Evaluating endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: Why does legacy Antivirus (AV) relying on MD5/SHA-256 signature matching fail completely against modern fileless malware and living-off-the-land binaries (LOLBins)?",
    "options": [
      "Because Antivirus software is only capable of scanning floppy disks and CD-ROM drives.",
      "Because hash algorithms are mathematically incapable of computing digests on modern 64-bit operating systems.",
      "Because Microsoft Windows automatically disables antivirus protection whenever PowerShell is launched.",
      "Because fileless attacks execute directly in system RAM using legitimate built-in operating system binaries (e.g., PowerShell, WMI) without writing suspicious executable files to disk."
    ],
    "correct": 3,
    "explanation": "Fileless attacks and LOLBins execute malicious commands directly in volatile memory using trusted native utilities (powershell.exe, mshta.exe), producing no new malicious binary file on disk for static hash scanners to match."
  },
  {
    "id": "q_m6_034",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "medium",
    "q": "[Scenario 4 - Enterprise Governance & Controls Audit] Evaluating applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: Why do modern communication protocols (like TLS 1.3 and SSH) deploy hybrid cryptosystems rather than relying solely on asymmetric cryptography for all data transmission?",
    "options": [
      "Because symmetric encryption keys are legally required to be public records under international trade law.",
      "Because asymmetric algorithms can only operate over physical analog telephone lines.",
      "Because asymmetric encryption is computationally expensive and orders of magnitude slower than symmetric ciphers; hybrid systems use asymmetric keys only to exchange a session key, then switch to fast symmetric AES-GCM.",
      "Because asymmetric encryption cannot encrypt text that contains numbers or special characters."
    ],
    "correct": 2,
    "explanation": "Asymmetric algorithms (RSA, ECC) involve complex modular arithmetic and are far too slow for bulk traffic. Hybrid cryptosystems use asymmetric ciphers to negotiate a symmetric key, then encrypt data at wire speed using AES or ChaCha20."
  },
  {
    "id": "q_m6_035",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "medium",
    "q": "[Scenario 4 - Enterprise Governance & Controls Audit] Evaluating pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: In modern Public Key Infrastructure (PKI), how does a client web browser verify that an X.509 digital certificate presented by a web server is authentic and trustworthy?",
    "options": [
      "The browser checks if the certificate is printed on official watermarked security paper.",
      "The browser cryptographically verifies the Certificate Authority's (CA) digital signature on the certificate using the public key of a trusted Root CA pre-installed in the browser's Root Store.",
      "The browser calls the web server administrator on the telephone to confirm the serial number.",
      "The browser generates a random password and checks if the web server can guess it within 3 seconds."
    ],
    "correct": 1,
    "explanation": "Browsers maintain a trusted Root Store. They validate the cryptographic signature on the server's certificate by tracing intermediate signatures up to an embedded Root CA public key."
  },
  {
    "id": "q_m6_036",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "medium",
    "q": "[Scenario 4 - Enterprise Governance & Controls Audit] Evaluating data states: data at rest (envelope encryption), in transit & in use (tees): In cloud data architecture, how does the Envelope Encryption design pattern protect massive data sets stored in cloud object storage (e.g., AWS S3, Azure Blob)?",
    "options": [
      "The data payload is encrypted locally with a unique Data Encryption Key (DEK), which is then encrypted by a Key Encryption Key (KEK) managed within a centralized Key Management Service (KMS).",
      "The cloud provider prints all database records onto microfilm and stores them in an underground mountain vault.",
      "The data is encrypted using the user's social security number as a static symmetric key.",
      "The data is divided into 5-byte chunks and distributed across public social media platforms."
    ],
    "correct": 0,
    "explanation": "Envelope encryption encrypts data directly with a fast local DEK. The DEK itself is encrypted (wrapped) by a master KEK housed securely inside a KMS/HSM, and stored alongside the ciphertext."
  },
  {
    "id": "q_m6_037",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "medium",
    "q": "[Scenario 4 - Enterprise Governance & Controls Audit] Evaluating security operations center (soc) architecture, siem & soar automation: In a tier-structured Security Operations Center (SOC), what is the primary operational responsibility of a Tier 1 Triage Analyst?",
    "options": [
      "Reverse engineering zero-day kernel exploits and writing commercial exploitation frameworks.",
      "Negotiating ransom payment demands directly with international cybercriminal cartels.",
      "Rewiring physical fiber optic backbone cables in corporate data centers.",
      "Monitoring incoming SIEM alert queues in real time, filtering out false positives, validating true positive alerts, and performing initial playbook-driven containment."
    ],
    "correct": 3,
    "explanation": "Tier 1 triage analysts monitor alerts, eliminate benign noise/false positives, perform initial artifact validation, and escalate confirmed threats to Tier 2 incident responders."
  },
  {
    "id": "q_m6_038",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "medium",
    "q": "[Scenario 4 - Enterprise Governance & Controls Audit] Evaluating incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): According to RFC 3227 (Guidelines for Evidence Collection and Archiving), what is the first source of digital evidence an investigator must acquire from a running compromised computer?",
    "options": [
      "The printed paper invoices stored in the accounting filing cabinet.",
      "The offsite magnetic backup tapes stored in the disaster recovery warehouse.",
      "The most volatile memory states: CPU registers, cache, and physical system RAM.",
      "The computer's mechanical hard disk drive after shutting down the power supply."
    ],
    "correct": 2,
    "explanation": "RFC 3227 establishes the Order of Volatility: capture the most ephemeral data first (Registers/Cache, then RAM, then Network state) before powering down, as volatile data vanishes upon reboot."
  },
  {
    "id": "q_m6_039",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "medium",
    "q": "[Scenario 4 - Enterprise Governance & Controls Audit] Evaluating cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Information Technology Act, 2000 (Section 66C), what specific cybercrime is penalized with up to 3 years imprisonment and fines up to ₹1 Lakh?",
    "options": [
      "Operating a personal website without registering with the local municipal police.",
      "Identity theft; the fraudulent or dishonest use of another person's electronic signature, password, or unique identification feature.",
      "Failing to install an antivirus software program on a personal home computer.",
      "Downloading a copyrighted open-source software library without paying licensing fees."
    ],
    "correct": 1,
    "explanation": "Section 66C of the IT Act criminalizes identity theft, specifically targeting the fraudulent use of another person's digital signature, password, or unique authentication credentials."
  },
  {
    "id": "q_m6_040",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "medium",
    "q": "[Scenario 4 - Enterprise Governance & Controls Audit] Evaluating nice workforce framework, red/blue/purple teams & home lab engineering: In the National Initiative for Cybersecurity Education (NICE) Workforce Framework (NIST SP 800-181), which workforce category includes roles responsible for identifying, analyzing, and mitigating threats to internal networks?",
    "options": [
      "Protect and Defend (PR); encompassing Defensive Cyber Operations, Incident Response, and Vulnerability Assessment.",
      "Oversee and Govern (OV); encompassing Marketing, Public Relations, and Sales Operations.",
      "Collect and Operate (CO); encompassing Physical Janitorial and Environmental Facilities Maintenance.",
      "Security Provision (SP); encompassing Graphic Design and UI/UX Illustration."
    ],
    "correct": 0,
    "explanation": "The 'Protect and Defend' (PR) category in the NICE Framework encompasses operational defense, including Incident Response, Cyber Defense Analysis, and Infrastructure Support."
  },
  {
    "id": "q_m6_041",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "medium",
    "q": "[Scenario 5 - Enterprise Governance & Controls Audit] Evaluating security controls classification (admin, technical, physical & preventive, detective, corrective): An enterprise deploys an automated EDR rule that immediately quarantines a compromised laptop from the local network upon detecting mimikatz execution. How is this defensive control classified by nature and by operational function?",
    "options": [
      "Administrative nature and Preventive function; it is a written policy signed by executive leadership.",
      "Physical nature and Detective function; it physically locks the laptop inside a security cabinet.",
      "Compensating nature and Deterrent function; it reduces user morale through active warning messages.",
      "Technical nature and Corrective function; it uses software logic to isolate the host and remediate active damage."
    ],
    "correct": 3,
    "explanation": "The control is implemented in software/hardware logic (Technical) and acts post-compromise to contain the spread of malware and remediate impact (Corrective)."
  },
  {
    "id": "q_m6_042",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "medium",
    "q": "[Scenario 5 - Enterprise Governance & Controls Audit] Evaluating cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: What major governance advancement was officially introduced in the core functions of the NIST Cybersecurity Framework (CSF) version 2.0?",
    "options": [
      "Mandating that all US corporations must exclusively deploy open-source Linux software.",
      "Requiring all employees to pass a government polygraph examination annually.",
      "The addition of the Govern (GV) function to establish enterprise strategy, supply chain risk, and executive oversight.",
      "The complete deprecation of the Recover (RC) function in favor of cyber insurance payouts."
    ],
    "correct": 2,
    "explanation": "NIST CSF 2.0 introduced the 'Govern' (GV) core function as an overarching pillar covering organizational strategy, policy, leadership roles, and supply chain risk management."
  },
  {
    "id": "q_m6_043",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "medium",
    "q": "[Scenario 5 - Enterprise Governance & Controls Audit] Evaluating endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: Why does legacy Antivirus (AV) relying on MD5/SHA-256 signature matching fail completely against modern fileless malware and living-off-the-land binaries (LOLBins)?",
    "options": [
      "Because Microsoft Windows automatically disables antivirus protection whenever PowerShell is launched.",
      "Because fileless attacks execute directly in system RAM using legitimate built-in operating system binaries (e.g., PowerShell, WMI) without writing suspicious executable files to disk.",
      "Because Antivirus software is only capable of scanning floppy disks and CD-ROM drives.",
      "Because hash algorithms are mathematically incapable of computing digests on modern 64-bit operating systems."
    ],
    "correct": 1,
    "explanation": "Fileless attacks and LOLBins execute malicious commands directly in volatile memory using trusted native utilities (powershell.exe, mshta.exe), producing no new malicious binary file on disk for static hash scanners to match."
  },
  {
    "id": "q_m6_044",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "medium",
    "q": "[Scenario 5 - Enterprise Governance & Controls Audit] Evaluating applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: Why do modern communication protocols (like TLS 1.3 and SSH) deploy hybrid cryptosystems rather than relying solely on asymmetric cryptography for all data transmission?",
    "options": [
      "Because asymmetric encryption is computationally expensive and orders of magnitude slower than symmetric ciphers; hybrid systems use asymmetric keys only to exchange a session key, then switch to fast symmetric AES-GCM.",
      "Because asymmetric encryption cannot encrypt text that contains numbers or special characters.",
      "Because symmetric encryption keys are legally required to be public records under international trade law.",
      "Because asymmetric algorithms can only operate over physical analog telephone lines."
    ],
    "correct": 0,
    "explanation": "Asymmetric algorithms (RSA, ECC) involve complex modular arithmetic and are far too slow for bulk traffic. Hybrid cryptosystems use asymmetric ciphers to negotiate a symmetric key, then encrypt data at wire speed using AES or ChaCha20."
  },
  {
    "id": "q_m6_045",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "medium",
    "q": "[Scenario 5 - Enterprise Governance & Controls Audit] Evaluating pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: In modern Public Key Infrastructure (PKI), how does a client web browser verify that an X.509 digital certificate presented by a web server is authentic and trustworthy?",
    "options": [
      "The browser calls the web server administrator on the telephone to confirm the serial number.",
      "The browser generates a random password and checks if the web server can guess it within 3 seconds.",
      "The browser checks if the certificate is printed on official watermarked security paper.",
      "The browser cryptographically verifies the Certificate Authority's (CA) digital signature on the certificate using the public key of a trusted Root CA pre-installed in the browser's Root Store."
    ],
    "correct": 3,
    "explanation": "Browsers maintain a trusted Root Store. They validate the cryptographic signature on the server's certificate by tracing intermediate signatures up to an embedded Root CA public key."
  },
  {
    "id": "q_m6_046",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "medium",
    "q": "[Scenario 5 - Enterprise Governance & Controls Audit] Evaluating data states: data at rest (envelope encryption), in transit & in use (tees): In cloud data architecture, how does the Envelope Encryption design pattern protect massive data sets stored in cloud object storage (e.g., AWS S3, Azure Blob)?",
    "options": [
      "The data is encrypted using the user's social security number as a static symmetric key.",
      "The data is divided into 5-byte chunks and distributed across public social media platforms.",
      "The data payload is encrypted locally with a unique Data Encryption Key (DEK), which is then encrypted by a Key Encryption Key (KEK) managed within a centralized Key Management Service (KMS).",
      "The cloud provider prints all database records onto microfilm and stores them in an underground mountain vault."
    ],
    "correct": 2,
    "explanation": "Envelope encryption encrypts data directly with a fast local DEK. The DEK itself is encrypted (wrapped) by a master KEK housed securely inside a KMS/HSM, and stored alongside the ciphertext."
  },
  {
    "id": "q_m6_047",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "medium",
    "q": "[Scenario 5 - Enterprise Governance & Controls Audit] Evaluating security operations center (soc) architecture, siem & soar automation: In a tier-structured Security Operations Center (SOC), what is the primary operational responsibility of a Tier 1 Triage Analyst?",
    "options": [
      "Rewiring physical fiber optic backbone cables in corporate data centers.",
      "Monitoring incoming SIEM alert queues in real time, filtering out false positives, validating true positive alerts, and performing initial playbook-driven containment.",
      "Reverse engineering zero-day kernel exploits and writing commercial exploitation frameworks.",
      "Negotiating ransom payment demands directly with international cybercriminal cartels."
    ],
    "correct": 1,
    "explanation": "Tier 1 triage analysts monitor alerts, eliminate benign noise/false positives, perform initial artifact validation, and escalate confirmed threats to Tier 2 incident responders."
  },
  {
    "id": "q_m6_048",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "medium",
    "q": "[Scenario 5 - Enterprise Governance & Controls Audit] Evaluating incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): According to RFC 3227 (Guidelines for Evidence Collection and Archiving), what is the first source of digital evidence an investigator must acquire from a running compromised computer?",
    "options": [
      "The most volatile memory states: CPU registers, cache, and physical system RAM.",
      "The computer's mechanical hard disk drive after shutting down the power supply.",
      "The printed paper invoices stored in the accounting filing cabinet.",
      "The offsite magnetic backup tapes stored in the disaster recovery warehouse."
    ],
    "correct": 0,
    "explanation": "RFC 3227 establishes the Order of Volatility: capture the most ephemeral data first (Registers/Cache, then RAM, then Network state) before powering down, as volatile data vanishes upon reboot."
  },
  {
    "id": "q_m6_049",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "medium",
    "q": "[Scenario 5 - Enterprise Governance & Controls Audit] Evaluating cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Information Technology Act, 2000 (Section 66C), what specific cybercrime is penalized with up to 3 years imprisonment and fines up to ₹1 Lakh?",
    "options": [
      "Failing to install an antivirus software program on a personal home computer.",
      "Downloading a copyrighted open-source software library without paying licensing fees.",
      "Operating a personal website without registering with the local municipal police.",
      "Identity theft; the fraudulent or dishonest use of another person's electronic signature, password, or unique identification feature."
    ],
    "correct": 3,
    "explanation": "Section 66C of the IT Act criminalizes identity theft, specifically targeting the fraudulent use of another person's digital signature, password, or unique authentication credentials."
  },
  {
    "id": "q_m6_050",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "medium",
    "q": "[Scenario 5 - Enterprise Governance & Controls Audit] Evaluating nice workforce framework, red/blue/purple teams & home lab engineering: In the National Initiative for Cybersecurity Education (NICE) Workforce Framework (NIST SP 800-181), which workforce category includes roles responsible for identifying, analyzing, and mitigating threats to internal networks?",
    "options": [
      "Collect and Operate (CO); encompassing Physical Janitorial and Environmental Facilities Maintenance.",
      "Security Provision (SP); encompassing Graphic Design and UI/UX Illustration.",
      "Protect and Defend (PR); encompassing Defensive Cyber Operations, Incident Response, and Vulnerability Assessment.",
      "Oversee and Govern (OV); encompassing Marketing, Public Relations, and Sales Operations."
    ],
    "correct": 2,
    "explanation": "The 'Protect and Defend' (PR) category in the NICE Framework encompasses operational defense, including Incident Response, Cyber Defense Analysis, and Infrastructure Support."
  },
  {
    "id": "q_m6_051",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "medium",
    "q": "[Scenario 6 - Enterprise Governance & Controls Audit] Evaluating security controls classification (admin, technical, physical & preventive, detective, corrective): An enterprise deploys an automated EDR rule that immediately quarantines a compromised laptop from the local network upon detecting mimikatz execution. How is this defensive control classified by nature and by operational function?",
    "options": [
      "Compensating nature and Deterrent function; it reduces user morale through active warning messages.",
      "Technical nature and Corrective function; it uses software logic to isolate the host and remediate active damage.",
      "Administrative nature and Preventive function; it is a written policy signed by executive leadership.",
      "Physical nature and Detective function; it physically locks the laptop inside a security cabinet."
    ],
    "correct": 1,
    "explanation": "The control is implemented in software/hardware logic (Technical) and acts post-compromise to contain the spread of malware and remediate impact (Corrective)."
  },
  {
    "id": "q_m6_052",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "medium",
    "q": "[Scenario 6 - Enterprise Governance & Controls Audit] Evaluating cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: What major governance advancement was officially introduced in the core functions of the NIST Cybersecurity Framework (CSF) version 2.0?",
    "options": [
      "The addition of the Govern (GV) function to establish enterprise strategy, supply chain risk, and executive oversight.",
      "The complete deprecation of the Recover (RC) function in favor of cyber insurance payouts.",
      "Mandating that all US corporations must exclusively deploy open-source Linux software.",
      "Requiring all employees to pass a government polygraph examination annually."
    ],
    "correct": 0,
    "explanation": "NIST CSF 2.0 introduced the 'Govern' (GV) core function as an overarching pillar covering organizational strategy, policy, leadership roles, and supply chain risk management."
  },
  {
    "id": "q_m6_053",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "medium",
    "q": "[Scenario 6 - Enterprise Governance & Controls Audit] Evaluating endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: Why does legacy Antivirus (AV) relying on MD5/SHA-256 signature matching fail completely against modern fileless malware and living-off-the-land binaries (LOLBins)?",
    "options": [
      "Because Antivirus software is only capable of scanning floppy disks and CD-ROM drives.",
      "Because hash algorithms are mathematically incapable of computing digests on modern 64-bit operating systems.",
      "Because Microsoft Windows automatically disables antivirus protection whenever PowerShell is launched.",
      "Because fileless attacks execute directly in system RAM using legitimate built-in operating system binaries (e.g., PowerShell, WMI) without writing suspicious executable files to disk."
    ],
    "correct": 3,
    "explanation": "Fileless attacks and LOLBins execute malicious commands directly in volatile memory using trusted native utilities (powershell.exe, mshta.exe), producing no new malicious binary file on disk for static hash scanners to match."
  },
  {
    "id": "q_m6_054",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "medium",
    "q": "[Scenario 6 - Enterprise Governance & Controls Audit] Evaluating applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: Why do modern communication protocols (like TLS 1.3 and SSH) deploy hybrid cryptosystems rather than relying solely on asymmetric cryptography for all data transmission?",
    "options": [
      "Because symmetric encryption keys are legally required to be public records under international trade law.",
      "Because asymmetric algorithms can only operate over physical analog telephone lines.",
      "Because asymmetric encryption is computationally expensive and orders of magnitude slower than symmetric ciphers; hybrid systems use asymmetric keys only to exchange a session key, then switch to fast symmetric AES-GCM.",
      "Because asymmetric encryption cannot encrypt text that contains numbers or special characters."
    ],
    "correct": 2,
    "explanation": "Asymmetric algorithms (RSA, ECC) involve complex modular arithmetic and are far too slow for bulk traffic. Hybrid cryptosystems use asymmetric ciphers to negotiate a symmetric key, then encrypt data at wire speed using AES or ChaCha20."
  },
  {
    "id": "q_m6_055",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "medium",
    "q": "[Scenario 6 - Enterprise Governance & Controls Audit] Evaluating pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: In modern Public Key Infrastructure (PKI), how does a client web browser verify that an X.509 digital certificate presented by a web server is authentic and trustworthy?",
    "options": [
      "The browser checks if the certificate is printed on official watermarked security paper.",
      "The browser cryptographically verifies the Certificate Authority's (CA) digital signature on the certificate using the public key of a trusted Root CA pre-installed in the browser's Root Store.",
      "The browser calls the web server administrator on the telephone to confirm the serial number.",
      "The browser generates a random password and checks if the web server can guess it within 3 seconds."
    ],
    "correct": 1,
    "explanation": "Browsers maintain a trusted Root Store. They validate the cryptographic signature on the server's certificate by tracing intermediate signatures up to an embedded Root CA public key."
  },
  {
    "id": "q_m6_056",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "medium",
    "q": "[Scenario 6 - Enterprise Governance & Controls Audit] Evaluating data states: data at rest (envelope encryption), in transit & in use (tees): In cloud data architecture, how does the Envelope Encryption design pattern protect massive data sets stored in cloud object storage (e.g., AWS S3, Azure Blob)?",
    "options": [
      "The data payload is encrypted locally with a unique Data Encryption Key (DEK), which is then encrypted by a Key Encryption Key (KEK) managed within a centralized Key Management Service (KMS).",
      "The cloud provider prints all database records onto microfilm and stores them in an underground mountain vault.",
      "The data is encrypted using the user's social security number as a static symmetric key.",
      "The data is divided into 5-byte chunks and distributed across public social media platforms."
    ],
    "correct": 0,
    "explanation": "Envelope encryption encrypts data directly with a fast local DEK. The DEK itself is encrypted (wrapped) by a master KEK housed securely inside a KMS/HSM, and stored alongside the ciphertext."
  },
  {
    "id": "q_m6_057",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "medium",
    "q": "[Scenario 6 - Enterprise Governance & Controls Audit] Evaluating security operations center (soc) architecture, siem & soar automation: In a tier-structured Security Operations Center (SOC), what is the primary operational responsibility of a Tier 1 Triage Analyst?",
    "options": [
      "Reverse engineering zero-day kernel exploits and writing commercial exploitation frameworks.",
      "Negotiating ransom payment demands directly with international cybercriminal cartels.",
      "Rewiring physical fiber optic backbone cables in corporate data centers.",
      "Monitoring incoming SIEM alert queues in real time, filtering out false positives, validating true positive alerts, and performing initial playbook-driven containment."
    ],
    "correct": 3,
    "explanation": "Tier 1 triage analysts monitor alerts, eliminate benign noise/false positives, perform initial artifact validation, and escalate confirmed threats to Tier 2 incident responders."
  },
  {
    "id": "q_m6_058",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "medium",
    "q": "[Scenario 6 - Enterprise Governance & Controls Audit] Evaluating incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): According to RFC 3227 (Guidelines for Evidence Collection and Archiving), what is the first source of digital evidence an investigator must acquire from a running compromised computer?",
    "options": [
      "The printed paper invoices stored in the accounting filing cabinet.",
      "The offsite magnetic backup tapes stored in the disaster recovery warehouse.",
      "The most volatile memory states: CPU registers, cache, and physical system RAM.",
      "The computer's mechanical hard disk drive after shutting down the power supply."
    ],
    "correct": 2,
    "explanation": "RFC 3227 establishes the Order of Volatility: capture the most ephemeral data first (Registers/Cache, then RAM, then Network state) before powering down, as volatile data vanishes upon reboot."
  },
  {
    "id": "q_m6_059",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "medium",
    "q": "[Scenario 6 - Enterprise Governance & Controls Audit] Evaluating cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Information Technology Act, 2000 (Section 66C), what specific cybercrime is penalized with up to 3 years imprisonment and fines up to ₹1 Lakh?",
    "options": [
      "Operating a personal website without registering with the local municipal police.",
      "Identity theft; the fraudulent or dishonest use of another person's electronic signature, password, or unique identification feature.",
      "Failing to install an antivirus software program on a personal home computer.",
      "Downloading a copyrighted open-source software library without paying licensing fees."
    ],
    "correct": 1,
    "explanation": "Section 66C of the IT Act criminalizes identity theft, specifically targeting the fraudulent use of another person's digital signature, password, or unique authentication credentials."
  },
  {
    "id": "q_m6_060",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "medium",
    "q": "[Scenario 6 - Enterprise Governance & Controls Audit] Evaluating nice workforce framework, red/blue/purple teams & home lab engineering: In the National Initiative for Cybersecurity Education (NICE) Workforce Framework (NIST SP 800-181), which workforce category includes roles responsible for identifying, analyzing, and mitigating threats to internal networks?",
    "options": [
      "Protect and Defend (PR); encompassing Defensive Cyber Operations, Incident Response, and Vulnerability Assessment.",
      "Oversee and Govern (OV); encompassing Marketing, Public Relations, and Sales Operations.",
      "Collect and Operate (CO); encompassing Physical Janitorial and Environmental Facilities Maintenance.",
      "Security Provision (SP); encompassing Graphic Design and UI/UX Illustration."
    ],
    "correct": 0,
    "explanation": "The 'Protect and Defend' (PR) category in the NICE Framework encompasses operational defense, including Incident Response, Cyber Defense Analysis, and Infrastructure Support."
  },
  {
    "id": "q_m6_061",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "medium",
    "q": "[Scenario 7 - Enterprise Governance & Controls Audit] Evaluating security controls classification (admin, technical, physical & preventive, detective, corrective): An enterprise deploys an automated EDR rule that immediately quarantines a compromised laptop from the local network upon detecting mimikatz execution. How is this defensive control classified by nature and by operational function?",
    "options": [
      "Administrative nature and Preventive function; it is a written policy signed by executive leadership.",
      "Physical nature and Detective function; it physically locks the laptop inside a security cabinet.",
      "Compensating nature and Deterrent function; it reduces user morale through active warning messages.",
      "Technical nature and Corrective function; it uses software logic to isolate the host and remediate active damage."
    ],
    "correct": 3,
    "explanation": "The control is implemented in software/hardware logic (Technical) and acts post-compromise to contain the spread of malware and remediate impact (Corrective)."
  },
  {
    "id": "q_m6_062",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "medium",
    "q": "[Scenario 7 - Enterprise Governance & Controls Audit] Evaluating cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: What major governance advancement was officially introduced in the core functions of the NIST Cybersecurity Framework (CSF) version 2.0?",
    "options": [
      "Mandating that all US corporations must exclusively deploy open-source Linux software.",
      "Requiring all employees to pass a government polygraph examination annually.",
      "The addition of the Govern (GV) function to establish enterprise strategy, supply chain risk, and executive oversight.",
      "The complete deprecation of the Recover (RC) function in favor of cyber insurance payouts."
    ],
    "correct": 2,
    "explanation": "NIST CSF 2.0 introduced the 'Govern' (GV) core function as an overarching pillar covering organizational strategy, policy, leadership roles, and supply chain risk management."
  },
  {
    "id": "q_m6_063",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "medium",
    "q": "[Scenario 7 - Enterprise Governance & Controls Audit] Evaluating endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: Why does legacy Antivirus (AV) relying on MD5/SHA-256 signature matching fail completely against modern fileless malware and living-off-the-land binaries (LOLBins)?",
    "options": [
      "Because Microsoft Windows automatically disables antivirus protection whenever PowerShell is launched.",
      "Because fileless attacks execute directly in system RAM using legitimate built-in operating system binaries (e.g., PowerShell, WMI) without writing suspicious executable files to disk.",
      "Because Antivirus software is only capable of scanning floppy disks and CD-ROM drives.",
      "Because hash algorithms are mathematically incapable of computing digests on modern 64-bit operating systems."
    ],
    "correct": 1,
    "explanation": "Fileless attacks and LOLBins execute malicious commands directly in volatile memory using trusted native utilities (powershell.exe, mshta.exe), producing no new malicious binary file on disk for static hash scanners to match."
  },
  {
    "id": "q_m6_064",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "medium",
    "q": "[Scenario 7 - Enterprise Governance & Controls Audit] Evaluating applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: Why do modern communication protocols (like TLS 1.3 and SSH) deploy hybrid cryptosystems rather than relying solely on asymmetric cryptography for all data transmission?",
    "options": [
      "Because asymmetric encryption is computationally expensive and orders of magnitude slower than symmetric ciphers; hybrid systems use asymmetric keys only to exchange a session key, then switch to fast symmetric AES-GCM.",
      "Because asymmetric encryption cannot encrypt text that contains numbers or special characters.",
      "Because symmetric encryption keys are legally required to be public records under international trade law.",
      "Because asymmetric algorithms can only operate over physical analog telephone lines."
    ],
    "correct": 0,
    "explanation": "Asymmetric algorithms (RSA, ECC) involve complex modular arithmetic and are far too slow for bulk traffic. Hybrid cryptosystems use asymmetric ciphers to negotiate a symmetric key, then encrypt data at wire speed using AES or ChaCha20."
  },
  {
    "id": "q_m6_065",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "medium",
    "q": "[Scenario 7 - Enterprise Governance & Controls Audit] Evaluating pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: In modern Public Key Infrastructure (PKI), how does a client web browser verify that an X.509 digital certificate presented by a web server is authentic and trustworthy?",
    "options": [
      "The browser calls the web server administrator on the telephone to confirm the serial number.",
      "The browser generates a random password and checks if the web server can guess it within 3 seconds.",
      "The browser checks if the certificate is printed on official watermarked security paper.",
      "The browser cryptographically verifies the Certificate Authority's (CA) digital signature on the certificate using the public key of a trusted Root CA pre-installed in the browser's Root Store."
    ],
    "correct": 3,
    "explanation": "Browsers maintain a trusted Root Store. They validate the cryptographic signature on the server's certificate by tracing intermediate signatures up to an embedded Root CA public key."
  },
  {
    "id": "q_m6_066",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "medium",
    "q": "[Scenario 7 - Enterprise Governance & Controls Audit] Evaluating data states: data at rest (envelope encryption), in transit & in use (tees): In cloud data architecture, how does the Envelope Encryption design pattern protect massive data sets stored in cloud object storage (e.g., AWS S3, Azure Blob)?",
    "options": [
      "The data is encrypted using the user's social security number as a static symmetric key.",
      "The data is divided into 5-byte chunks and distributed across public social media platforms.",
      "The data payload is encrypted locally with a unique Data Encryption Key (DEK), which is then encrypted by a Key Encryption Key (KEK) managed within a centralized Key Management Service (KMS).",
      "The cloud provider prints all database records onto microfilm and stores them in an underground mountain vault."
    ],
    "correct": 2,
    "explanation": "Envelope encryption encrypts data directly with a fast local DEK. The DEK itself is encrypted (wrapped) by a master KEK housed securely inside a KMS/HSM, and stored alongside the ciphertext."
  },
  {
    "id": "q_m6_067",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "medium",
    "q": "[Scenario 7 - Enterprise Governance & Controls Audit] Evaluating security operations center (soc) architecture, siem & soar automation: In a tier-structured Security Operations Center (SOC), what is the primary operational responsibility of a Tier 1 Triage Analyst?",
    "options": [
      "Rewiring physical fiber optic backbone cables in corporate data centers.",
      "Monitoring incoming SIEM alert queues in real time, filtering out false positives, validating true positive alerts, and performing initial playbook-driven containment.",
      "Reverse engineering zero-day kernel exploits and writing commercial exploitation frameworks.",
      "Negotiating ransom payment demands directly with international cybercriminal cartels."
    ],
    "correct": 1,
    "explanation": "Tier 1 triage analysts monitor alerts, eliminate benign noise/false positives, perform initial artifact validation, and escalate confirmed threats to Tier 2 incident responders."
  },
  {
    "id": "q_m6_068",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "medium",
    "q": "[Scenario 7 - Enterprise Governance & Controls Audit] Evaluating incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): According to RFC 3227 (Guidelines for Evidence Collection and Archiving), what is the first source of digital evidence an investigator must acquire from a running compromised computer?",
    "options": [
      "The most volatile memory states: CPU registers, cache, and physical system RAM.",
      "The computer's mechanical hard disk drive after shutting down the power supply.",
      "The printed paper invoices stored in the accounting filing cabinet.",
      "The offsite magnetic backup tapes stored in the disaster recovery warehouse."
    ],
    "correct": 0,
    "explanation": "RFC 3227 establishes the Order of Volatility: capture the most ephemeral data first (Registers/Cache, then RAM, then Network state) before powering down, as volatile data vanishes upon reboot."
  },
  {
    "id": "q_m6_069",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "medium",
    "q": "[Scenario 7 - Enterprise Governance & Controls Audit] Evaluating cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Information Technology Act, 2000 (Section 66C), what specific cybercrime is penalized with up to 3 years imprisonment and fines up to ₹1 Lakh?",
    "options": [
      "Failing to install an antivirus software program on a personal home computer.",
      "Downloading a copyrighted open-source software library without paying licensing fees.",
      "Operating a personal website without registering with the local municipal police.",
      "Identity theft; the fraudulent or dishonest use of another person's electronic signature, password, or unique identification feature."
    ],
    "correct": 3,
    "explanation": "Section 66C of the IT Act criminalizes identity theft, specifically targeting the fraudulent use of another person's digital signature, password, or unique authentication credentials."
  },
  {
    "id": "q_m6_070",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "medium",
    "q": "[Scenario 7 - Enterprise Governance & Controls Audit] Evaluating nice workforce framework, red/blue/purple teams & home lab engineering: In the National Initiative for Cybersecurity Education (NICE) Workforce Framework (NIST SP 800-181), which workforce category includes roles responsible for identifying, analyzing, and mitigating threats to internal networks?",
    "options": [
      "Collect and Operate (CO); encompassing Physical Janitorial and Environmental Facilities Maintenance.",
      "Security Provision (SP); encompassing Graphic Design and UI/UX Illustration.",
      "Protect and Defend (PR); encompassing Defensive Cyber Operations, Incident Response, and Vulnerability Assessment.",
      "Oversee and Govern (OV); encompassing Marketing, Public Relations, and Sales Operations."
    ],
    "correct": 2,
    "explanation": "The 'Protect and Defend' (PR) category in the NICE Framework encompasses operational defense, including Incident Response, Cyber Defense Analysis, and Infrastructure Support."
  },
  {
    "id": "q_m6_071",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "medium",
    "q": "[Scenario 8 - Enterprise Governance & Controls Audit] Evaluating security controls classification (admin, technical, physical & preventive, detective, corrective): An enterprise deploys an automated EDR rule that immediately quarantines a compromised laptop from the local network upon detecting mimikatz execution. How is this defensive control classified by nature and by operational function?",
    "options": [
      "Compensating nature and Deterrent function; it reduces user morale through active warning messages.",
      "Technical nature and Corrective function; it uses software logic to isolate the host and remediate active damage.",
      "Administrative nature and Preventive function; it is a written policy signed by executive leadership.",
      "Physical nature and Detective function; it physically locks the laptop inside a security cabinet."
    ],
    "correct": 1,
    "explanation": "The control is implemented in software/hardware logic (Technical) and acts post-compromise to contain the spread of malware and remediate impact (Corrective)."
  },
  {
    "id": "q_m6_072",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "medium",
    "q": "[Scenario 8 - Enterprise Governance & Controls Audit] Evaluating cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: What major governance advancement was officially introduced in the core functions of the NIST Cybersecurity Framework (CSF) version 2.0?",
    "options": [
      "The addition of the Govern (GV) function to establish enterprise strategy, supply chain risk, and executive oversight.",
      "The complete deprecation of the Recover (RC) function in favor of cyber insurance payouts.",
      "Mandating that all US corporations must exclusively deploy open-source Linux software.",
      "Requiring all employees to pass a government polygraph examination annually."
    ],
    "correct": 0,
    "explanation": "NIST CSF 2.0 introduced the 'Govern' (GV) core function as an overarching pillar covering organizational strategy, policy, leadership roles, and supply chain risk management."
  },
  {
    "id": "q_m6_073",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "medium",
    "q": "[Scenario 8 - Enterprise Governance & Controls Audit] Evaluating endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: Why does legacy Antivirus (AV) relying on MD5/SHA-256 signature matching fail completely against modern fileless malware and living-off-the-land binaries (LOLBins)?",
    "options": [
      "Because Antivirus software is only capable of scanning floppy disks and CD-ROM drives.",
      "Because hash algorithms are mathematically incapable of computing digests on modern 64-bit operating systems.",
      "Because Microsoft Windows automatically disables antivirus protection whenever PowerShell is launched.",
      "Because fileless attacks execute directly in system RAM using legitimate built-in operating system binaries (e.g., PowerShell, WMI) without writing suspicious executable files to disk."
    ],
    "correct": 3,
    "explanation": "Fileless attacks and LOLBins execute malicious commands directly in volatile memory using trusted native utilities (powershell.exe, mshta.exe), producing no new malicious binary file on disk for static hash scanners to match."
  },
  {
    "id": "q_m6_074",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "medium",
    "q": "[Scenario 8 - Enterprise Governance & Controls Audit] Evaluating applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: Why do modern communication protocols (like TLS 1.3 and SSH) deploy hybrid cryptosystems rather than relying solely on asymmetric cryptography for all data transmission?",
    "options": [
      "Because symmetric encryption keys are legally required to be public records under international trade law.",
      "Because asymmetric algorithms can only operate over physical analog telephone lines.",
      "Because asymmetric encryption is computationally expensive and orders of magnitude slower than symmetric ciphers; hybrid systems use asymmetric keys only to exchange a session key, then switch to fast symmetric AES-GCM.",
      "Because asymmetric encryption cannot encrypt text that contains numbers or special characters."
    ],
    "correct": 2,
    "explanation": "Asymmetric algorithms (RSA, ECC) involve complex modular arithmetic and are far too slow for bulk traffic. Hybrid cryptosystems use asymmetric ciphers to negotiate a symmetric key, then encrypt data at wire speed using AES or ChaCha20."
  },
  {
    "id": "q_m6_075",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "medium",
    "q": "[Scenario 8 - Enterprise Governance & Controls Audit] Evaluating pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: In modern Public Key Infrastructure (PKI), how does a client web browser verify that an X.509 digital certificate presented by a web server is authentic and trustworthy?",
    "options": [
      "The browser checks if the certificate is printed on official watermarked security paper.",
      "The browser cryptographically verifies the Certificate Authority's (CA) digital signature on the certificate using the public key of a trusted Root CA pre-installed in the browser's Root Store.",
      "The browser calls the web server administrator on the telephone to confirm the serial number.",
      "The browser generates a random password and checks if the web server can guess it within 3 seconds."
    ],
    "correct": 1,
    "explanation": "Browsers maintain a trusted Root Store. They validate the cryptographic signature on the server's certificate by tracing intermediate signatures up to an embedded Root CA public key."
  },
  {
    "id": "q_m6_076",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "medium",
    "q": "[Scenario 8 - Enterprise Governance & Controls Audit] Evaluating data states: data at rest (envelope encryption), in transit & in use (tees): In cloud data architecture, how does the Envelope Encryption design pattern protect massive data sets stored in cloud object storage (e.g., AWS S3, Azure Blob)?",
    "options": [
      "The data payload is encrypted locally with a unique Data Encryption Key (DEK), which is then encrypted by a Key Encryption Key (KEK) managed within a centralized Key Management Service (KMS).",
      "The cloud provider prints all database records onto microfilm and stores them in an underground mountain vault.",
      "The data is encrypted using the user's social security number as a static symmetric key.",
      "The data is divided into 5-byte chunks and distributed across public social media platforms."
    ],
    "correct": 0,
    "explanation": "Envelope encryption encrypts data directly with a fast local DEK. The DEK itself is encrypted (wrapped) by a master KEK housed securely inside a KMS/HSM, and stored alongside the ciphertext."
  },
  {
    "id": "q_m6_077",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "medium",
    "q": "[Scenario 8 - Enterprise Governance & Controls Audit] Evaluating security operations center (soc) architecture, siem & soar automation: In a tier-structured Security Operations Center (SOC), what is the primary operational responsibility of a Tier 1 Triage Analyst?",
    "options": [
      "Reverse engineering zero-day kernel exploits and writing commercial exploitation frameworks.",
      "Negotiating ransom payment demands directly with international cybercriminal cartels.",
      "Rewiring physical fiber optic backbone cables in corporate data centers.",
      "Monitoring incoming SIEM alert queues in real time, filtering out false positives, validating true positive alerts, and performing initial playbook-driven containment."
    ],
    "correct": 3,
    "explanation": "Tier 1 triage analysts monitor alerts, eliminate benign noise/false positives, perform initial artifact validation, and escalate confirmed threats to Tier 2 incident responders."
  },
  {
    "id": "q_m6_078",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "medium",
    "q": "[Scenario 8 - Enterprise Governance & Controls Audit] Evaluating incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): According to RFC 3227 (Guidelines for Evidence Collection and Archiving), what is the first source of digital evidence an investigator must acquire from a running compromised computer?",
    "options": [
      "The printed paper invoices stored in the accounting filing cabinet.",
      "The offsite magnetic backup tapes stored in the disaster recovery warehouse.",
      "The most volatile memory states: CPU registers, cache, and physical system RAM.",
      "The computer's mechanical hard disk drive after shutting down the power supply."
    ],
    "correct": 2,
    "explanation": "RFC 3227 establishes the Order of Volatility: capture the most ephemeral data first (Registers/Cache, then RAM, then Network state) before powering down, as volatile data vanishes upon reboot."
  },
  {
    "id": "q_m6_079",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "medium",
    "q": "[Scenario 8 - Enterprise Governance & Controls Audit] Evaluating cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Information Technology Act, 2000 (Section 66C), what specific cybercrime is penalized with up to 3 years imprisonment and fines up to ₹1 Lakh?",
    "options": [
      "Operating a personal website without registering with the local municipal police.",
      "Identity theft; the fraudulent or dishonest use of another person's electronic signature, password, or unique identification feature.",
      "Failing to install an antivirus software program on a personal home computer.",
      "Downloading a copyrighted open-source software library without paying licensing fees."
    ],
    "correct": 1,
    "explanation": "Section 66C of the IT Act criminalizes identity theft, specifically targeting the fraudulent use of another person's digital signature, password, or unique authentication credentials."
  },
  {
    "id": "q_m6_080",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "medium",
    "q": "[Scenario 8 - Enterprise Governance & Controls Audit] Evaluating nice workforce framework, red/blue/purple teams & home lab engineering: In the National Initiative for Cybersecurity Education (NICE) Workforce Framework (NIST SP 800-181), which workforce category includes roles responsible for identifying, analyzing, and mitigating threats to internal networks?",
    "options": [
      "Protect and Defend (PR); encompassing Defensive Cyber Operations, Incident Response, and Vulnerability Assessment.",
      "Oversee and Govern (OV); encompassing Marketing, Public Relations, and Sales Operations.",
      "Collect and Operate (CO); encompassing Physical Janitorial and Environmental Facilities Maintenance.",
      "Security Provision (SP); encompassing Graphic Design and UI/UX Illustration."
    ],
    "correct": 0,
    "explanation": "The 'Protect and Defend' (PR) category in the NICE Framework encompasses operational defense, including Incident Response, Cyber Defense Analysis, and Infrastructure Support."
  },
  {
    "id": "q_m6_081",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "medium",
    "q": "[Scenario 9 - Enterprise Governance & Controls Audit] Evaluating security controls classification (admin, technical, physical & preventive, detective, corrective): An enterprise deploys an automated EDR rule that immediately quarantines a compromised laptop from the local network upon detecting mimikatz execution. How is this defensive control classified by nature and by operational function?",
    "options": [
      "Administrative nature and Preventive function; it is a written policy signed by executive leadership.",
      "Physical nature and Detective function; it physically locks the laptop inside a security cabinet.",
      "Compensating nature and Deterrent function; it reduces user morale through active warning messages.",
      "Technical nature and Corrective function; it uses software logic to isolate the host and remediate active damage."
    ],
    "correct": 3,
    "explanation": "The control is implemented in software/hardware logic (Technical) and acts post-compromise to contain the spread of malware and remediate impact (Corrective)."
  },
  {
    "id": "q_m6_082",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "medium",
    "q": "[Scenario 9 - Enterprise Governance & Controls Audit] Evaluating cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: What major governance advancement was officially introduced in the core functions of the NIST Cybersecurity Framework (CSF) version 2.0?",
    "options": [
      "Mandating that all US corporations must exclusively deploy open-source Linux software.",
      "Requiring all employees to pass a government polygraph examination annually.",
      "The addition of the Govern (GV) function to establish enterprise strategy, supply chain risk, and executive oversight.",
      "The complete deprecation of the Recover (RC) function in favor of cyber insurance payouts."
    ],
    "correct": 2,
    "explanation": "NIST CSF 2.0 introduced the 'Govern' (GV) core function as an overarching pillar covering organizational strategy, policy, leadership roles, and supply chain risk management."
  },
  {
    "id": "q_m6_083",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "medium",
    "q": "[Scenario 9 - Enterprise Governance & Controls Audit] Evaluating endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: Why does legacy Antivirus (AV) relying on MD5/SHA-256 signature matching fail completely against modern fileless malware and living-off-the-land binaries (LOLBins)?",
    "options": [
      "Because Microsoft Windows automatically disables antivirus protection whenever PowerShell is launched.",
      "Because fileless attacks execute directly in system RAM using legitimate built-in operating system binaries (e.g., PowerShell, WMI) without writing suspicious executable files to disk.",
      "Because Antivirus software is only capable of scanning floppy disks and CD-ROM drives.",
      "Because hash algorithms are mathematically incapable of computing digests on modern 64-bit operating systems."
    ],
    "correct": 1,
    "explanation": "Fileless attacks and LOLBins execute malicious commands directly in volatile memory using trusted native utilities (powershell.exe, mshta.exe), producing no new malicious binary file on disk for static hash scanners to match."
  },
  {
    "id": "q_m6_084",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "medium",
    "q": "[Scenario 9 - Enterprise Governance & Controls Audit] Evaluating applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: Why do modern communication protocols (like TLS 1.3 and SSH) deploy hybrid cryptosystems rather than relying solely on asymmetric cryptography for all data transmission?",
    "options": [
      "Because asymmetric encryption is computationally expensive and orders of magnitude slower than symmetric ciphers; hybrid systems use asymmetric keys only to exchange a session key, then switch to fast symmetric AES-GCM.",
      "Because asymmetric encryption cannot encrypt text that contains numbers or special characters.",
      "Because symmetric encryption keys are legally required to be public records under international trade law.",
      "Because asymmetric algorithms can only operate over physical analog telephone lines."
    ],
    "correct": 0,
    "explanation": "Asymmetric algorithms (RSA, ECC) involve complex modular arithmetic and are far too slow for bulk traffic. Hybrid cryptosystems use asymmetric ciphers to negotiate a symmetric key, then encrypt data at wire speed using AES or ChaCha20."
  },
  {
    "id": "q_m6_085",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "medium",
    "q": "[Scenario 9 - Enterprise Governance & Controls Audit] Evaluating pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: In modern Public Key Infrastructure (PKI), how does a client web browser verify that an X.509 digital certificate presented by a web server is authentic and trustworthy?",
    "options": [
      "The browser calls the web server administrator on the telephone to confirm the serial number.",
      "The browser generates a random password and checks if the web server can guess it within 3 seconds.",
      "The browser checks if the certificate is printed on official watermarked security paper.",
      "The browser cryptographically verifies the Certificate Authority's (CA) digital signature on the certificate using the public key of a trusted Root CA pre-installed in the browser's Root Store."
    ],
    "correct": 3,
    "explanation": "Browsers maintain a trusted Root Store. They validate the cryptographic signature on the server's certificate by tracing intermediate signatures up to an embedded Root CA public key."
  },
  {
    "id": "q_m6_086",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "medium",
    "q": "[Scenario 9 - Enterprise Governance & Controls Audit] Evaluating data states: data at rest (envelope encryption), in transit & in use (tees): In cloud data architecture, how does the Envelope Encryption design pattern protect massive data sets stored in cloud object storage (e.g., AWS S3, Azure Blob)?",
    "options": [
      "The data is encrypted using the user's social security number as a static symmetric key.",
      "The data is divided into 5-byte chunks and distributed across public social media platforms.",
      "The data payload is encrypted locally with a unique Data Encryption Key (DEK), which is then encrypted by a Key Encryption Key (KEK) managed within a centralized Key Management Service (KMS).",
      "The cloud provider prints all database records onto microfilm and stores them in an underground mountain vault."
    ],
    "correct": 2,
    "explanation": "Envelope encryption encrypts data directly with a fast local DEK. The DEK itself is encrypted (wrapped) by a master KEK housed securely inside a KMS/HSM, and stored alongside the ciphertext."
  },
  {
    "id": "q_m6_087",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "medium",
    "q": "[Scenario 9 - Enterprise Governance & Controls Audit] Evaluating security operations center (soc) architecture, siem & soar automation: In a tier-structured Security Operations Center (SOC), what is the primary operational responsibility of a Tier 1 Triage Analyst?",
    "options": [
      "Rewiring physical fiber optic backbone cables in corporate data centers.",
      "Monitoring incoming SIEM alert queues in real time, filtering out false positives, validating true positive alerts, and performing initial playbook-driven containment.",
      "Reverse engineering zero-day kernel exploits and writing commercial exploitation frameworks.",
      "Negotiating ransom payment demands directly with international cybercriminal cartels."
    ],
    "correct": 1,
    "explanation": "Tier 1 triage analysts monitor alerts, eliminate benign noise/false positives, perform initial artifact validation, and escalate confirmed threats to Tier 2 incident responders."
  },
  {
    "id": "q_m6_088",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "medium",
    "q": "[Scenario 9 - Enterprise Governance & Controls Audit] Evaluating incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): According to RFC 3227 (Guidelines for Evidence Collection and Archiving), what is the first source of digital evidence an investigator must acquire from a running compromised computer?",
    "options": [
      "The most volatile memory states: CPU registers, cache, and physical system RAM.",
      "The computer's mechanical hard disk drive after shutting down the power supply.",
      "The printed paper invoices stored in the accounting filing cabinet.",
      "The offsite magnetic backup tapes stored in the disaster recovery warehouse."
    ],
    "correct": 0,
    "explanation": "RFC 3227 establishes the Order of Volatility: capture the most ephemeral data first (Registers/Cache, then RAM, then Network state) before powering down, as volatile data vanishes upon reboot."
  },
  {
    "id": "q_m6_089",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "medium",
    "q": "[Scenario 9 - Enterprise Governance & Controls Audit] Evaluating cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Information Technology Act, 2000 (Section 66C), what specific cybercrime is penalized with up to 3 years imprisonment and fines up to ₹1 Lakh?",
    "options": [
      "Failing to install an antivirus software program on a personal home computer.",
      "Downloading a copyrighted open-source software library without paying licensing fees.",
      "Operating a personal website without registering with the local municipal police.",
      "Identity theft; the fraudulent or dishonest use of another person's electronic signature, password, or unique identification feature."
    ],
    "correct": 3,
    "explanation": "Section 66C of the IT Act criminalizes identity theft, specifically targeting the fraudulent use of another person's digital signature, password, or unique authentication credentials."
  },
  {
    "id": "q_m6_090",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "medium",
    "q": "[Scenario 9 - Enterprise Governance & Controls Audit] Evaluating nice workforce framework, red/blue/purple teams & home lab engineering: In the National Initiative for Cybersecurity Education (NICE) Workforce Framework (NIST SP 800-181), which workforce category includes roles responsible for identifying, analyzing, and mitigating threats to internal networks?",
    "options": [
      "Collect and Operate (CO); encompassing Physical Janitorial and Environmental Facilities Maintenance.",
      "Security Provision (SP); encompassing Graphic Design and UI/UX Illustration.",
      "Protect and Defend (PR); encompassing Defensive Cyber Operations, Incident Response, and Vulnerability Assessment.",
      "Oversee and Govern (OV); encompassing Marketing, Public Relations, and Sales Operations."
    ],
    "correct": 2,
    "explanation": "The 'Protect and Defend' (PR) category in the NICE Framework encompasses operational defense, including Incident Response, Cyber Defense Analysis, and Infrastructure Support."
  },
  {
    "id": "q_m6_091",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "medium",
    "q": "[Scenario 10 - Enterprise Governance & Controls Audit] Evaluating security controls classification (admin, technical, physical & preventive, detective, corrective): An enterprise deploys an automated EDR rule that immediately quarantines a compromised laptop from the local network upon detecting mimikatz execution. How is this defensive control classified by nature and by operational function?",
    "options": [
      "Compensating nature and Deterrent function; it reduces user morale through active warning messages.",
      "Technical nature and Corrective function; it uses software logic to isolate the host and remediate active damage.",
      "Administrative nature and Preventive function; it is a written policy signed by executive leadership.",
      "Physical nature and Detective function; it physically locks the laptop inside a security cabinet."
    ],
    "correct": 1,
    "explanation": "The control is implemented in software/hardware logic (Technical) and acts post-compromise to contain the spread of malware and remediate impact (Corrective)."
  },
  {
    "id": "q_m6_092",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "medium",
    "q": "[Scenario 10 - Enterprise Governance & Controls Audit] Evaluating cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: What major governance advancement was officially introduced in the core functions of the NIST Cybersecurity Framework (CSF) version 2.0?",
    "options": [
      "The addition of the Govern (GV) function to establish enterprise strategy, supply chain risk, and executive oversight.",
      "The complete deprecation of the Recover (RC) function in favor of cyber insurance payouts.",
      "Mandating that all US corporations must exclusively deploy open-source Linux software.",
      "Requiring all employees to pass a government polygraph examination annually."
    ],
    "correct": 0,
    "explanation": "NIST CSF 2.0 introduced the 'Govern' (GV) core function as an overarching pillar covering organizational strategy, policy, leadership roles, and supply chain risk management."
  },
  {
    "id": "q_m6_093",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "medium",
    "q": "[Scenario 10 - Enterprise Governance & Controls Audit] Evaluating endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: Why does legacy Antivirus (AV) relying on MD5/SHA-256 signature matching fail completely against modern fileless malware and living-off-the-land binaries (LOLBins)?",
    "options": [
      "Because Antivirus software is only capable of scanning floppy disks and CD-ROM drives.",
      "Because hash algorithms are mathematically incapable of computing digests on modern 64-bit operating systems.",
      "Because Microsoft Windows automatically disables antivirus protection whenever PowerShell is launched.",
      "Because fileless attacks execute directly in system RAM using legitimate built-in operating system binaries (e.g., PowerShell, WMI) without writing suspicious executable files to disk."
    ],
    "correct": 3,
    "explanation": "Fileless attacks and LOLBins execute malicious commands directly in volatile memory using trusted native utilities (powershell.exe, mshta.exe), producing no new malicious binary file on disk for static hash scanners to match."
  },
  {
    "id": "q_m6_094",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "medium",
    "q": "[Scenario 10 - Enterprise Governance & Controls Audit] Evaluating applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: Why do modern communication protocols (like TLS 1.3 and SSH) deploy hybrid cryptosystems rather than relying solely on asymmetric cryptography for all data transmission?",
    "options": [
      "Because symmetric encryption keys are legally required to be public records under international trade law.",
      "Because asymmetric algorithms can only operate over physical analog telephone lines.",
      "Because asymmetric encryption is computationally expensive and orders of magnitude slower than symmetric ciphers; hybrid systems use asymmetric keys only to exchange a session key, then switch to fast symmetric AES-GCM.",
      "Because asymmetric encryption cannot encrypt text that contains numbers or special characters."
    ],
    "correct": 2,
    "explanation": "Asymmetric algorithms (RSA, ECC) involve complex modular arithmetic and are far too slow for bulk traffic. Hybrid cryptosystems use asymmetric ciphers to negotiate a symmetric key, then encrypt data at wire speed using AES or ChaCha20."
  },
  {
    "id": "q_m6_095",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "medium",
    "q": "[Scenario 10 - Enterprise Governance & Controls Audit] Evaluating pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: In modern Public Key Infrastructure (PKI), how does a client web browser verify that an X.509 digital certificate presented by a web server is authentic and trustworthy?",
    "options": [
      "The browser checks if the certificate is printed on official watermarked security paper.",
      "The browser cryptographically verifies the Certificate Authority's (CA) digital signature on the certificate using the public key of a trusted Root CA pre-installed in the browser's Root Store.",
      "The browser calls the web server administrator on the telephone to confirm the serial number.",
      "The browser generates a random password and checks if the web server can guess it within 3 seconds."
    ],
    "correct": 1,
    "explanation": "Browsers maintain a trusted Root Store. They validate the cryptographic signature on the server's certificate by tracing intermediate signatures up to an embedded Root CA public key."
  },
  {
    "id": "q_m6_096",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "medium",
    "q": "[Scenario 10 - Enterprise Governance & Controls Audit] Evaluating data states: data at rest (envelope encryption), in transit & in use (tees): In cloud data architecture, how does the Envelope Encryption design pattern protect massive data sets stored in cloud object storage (e.g., AWS S3, Azure Blob)?",
    "options": [
      "The data payload is encrypted locally with a unique Data Encryption Key (DEK), which is then encrypted by a Key Encryption Key (KEK) managed within a centralized Key Management Service (KMS).",
      "The cloud provider prints all database records onto microfilm and stores them in an underground mountain vault.",
      "The data is encrypted using the user's social security number as a static symmetric key.",
      "The data is divided into 5-byte chunks and distributed across public social media platforms."
    ],
    "correct": 0,
    "explanation": "Envelope encryption encrypts data directly with a fast local DEK. The DEK itself is encrypted (wrapped) by a master KEK housed securely inside a KMS/HSM, and stored alongside the ciphertext."
  },
  {
    "id": "q_m6_097",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "medium",
    "q": "[Scenario 10 - Enterprise Governance & Controls Audit] Evaluating security operations center (soc) architecture, siem & soar automation: In a tier-structured Security Operations Center (SOC), what is the primary operational responsibility of a Tier 1 Triage Analyst?",
    "options": [
      "Reverse engineering zero-day kernel exploits and writing commercial exploitation frameworks.",
      "Negotiating ransom payment demands directly with international cybercriminal cartels.",
      "Rewiring physical fiber optic backbone cables in corporate data centers.",
      "Monitoring incoming SIEM alert queues in real time, filtering out false positives, validating true positive alerts, and performing initial playbook-driven containment."
    ],
    "correct": 3,
    "explanation": "Tier 1 triage analysts monitor alerts, eliminate benign noise/false positives, perform initial artifact validation, and escalate confirmed threats to Tier 2 incident responders."
  },
  {
    "id": "q_m6_098",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "medium",
    "q": "[Scenario 10 - Enterprise Governance & Controls Audit] Evaluating incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): According to RFC 3227 (Guidelines for Evidence Collection and Archiving), what is the first source of digital evidence an investigator must acquire from a running compromised computer?",
    "options": [
      "The printed paper invoices stored in the accounting filing cabinet.",
      "The offsite magnetic backup tapes stored in the disaster recovery warehouse.",
      "The most volatile memory states: CPU registers, cache, and physical system RAM.",
      "The computer's mechanical hard disk drive after shutting down the power supply."
    ],
    "correct": 2,
    "explanation": "RFC 3227 establishes the Order of Volatility: capture the most ephemeral data first (Registers/Cache, then RAM, then Network state) before powering down, as volatile data vanishes upon reboot."
  },
  {
    "id": "q_m6_099",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "medium",
    "q": "[Scenario 10 - Enterprise Governance & Controls Audit] Evaluating cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Information Technology Act, 2000 (Section 66C), what specific cybercrime is penalized with up to 3 years imprisonment and fines up to ₹1 Lakh?",
    "options": [
      "Operating a personal website without registering with the local municipal police.",
      "Identity theft; the fraudulent or dishonest use of another person's electronic signature, password, or unique identification feature.",
      "Failing to install an antivirus software program on a personal home computer.",
      "Downloading a copyrighted open-source software library without paying licensing fees."
    ],
    "correct": 1,
    "explanation": "Section 66C of the IT Act criminalizes identity theft, specifically targeting the fraudulent use of another person's digital signature, password, or unique authentication credentials."
  },
  {
    "id": "q_m6_100",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "medium",
    "q": "[Scenario 10 - Enterprise Governance & Controls Audit] Evaluating nice workforce framework, red/blue/purple teams & home lab engineering: In the National Initiative for Cybersecurity Education (NICE) Workforce Framework (NIST SP 800-181), which workforce category includes roles responsible for identifying, analyzing, and mitigating threats to internal networks?",
    "options": [
      "Protect and Defend (PR); encompassing Defensive Cyber Operations, Incident Response, and Vulnerability Assessment.",
      "Oversee and Govern (OV); encompassing Marketing, Public Relations, and Sales Operations.",
      "Collect and Operate (CO); encompassing Physical Janitorial and Environmental Facilities Maintenance.",
      "Security Provision (SP); encompassing Graphic Design and UI/UX Illustration."
    ],
    "correct": 0,
    "explanation": "The 'Protect and Defend' (PR) category in the NICE Framework encompasses operational defense, including Incident Response, Cyber Defense Analysis, and Infrastructure Support."
  },
  {
    "id": "q_m6_101",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "difficult",
    "q": "A healthcare facility cannot patch a critical Remote Code Execution vulnerability in a legacy Windows 2008 server controlling a radiological MRI scanner because vendor updates are defunct. The security architect isolates the server into a dedicated VLAN with strict deny-all ACLs, deploys a WAF virtual patch, and enables hyper-sensitive monitoring. Under formal risk frameworks, what is this defensive deployment called?",
    "options": [
      "A Complete Mediation violation; it disables all security inspections to maximize imaging throughput.",
      "An Administrative waiver that completely transfers legal liability to the patient.",
      "A Security through Obscurity failure that violates HIPAA physical safeguard rules.",
      "A Compensating Control architecture; it mitigates residual risk to an acceptable threshold without altering the unpatchable root vulnerability."
    ],
    "correct": 3,
    "explanation": "When a primary control (patching) cannot be achieved due to operational constraints, compensating controls (segmentation, virtual patching, hyper-monitoring) reduce risk to an acceptable level."
  },
  {
    "id": "q_m6_102",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "difficult",
    "q": "A mid-sized logistics company begins adopting the Center for Internet Security (CIS) Critical Security Controls v8. As an organization with limited specialized security personnel seeking essential cyber hygiene, which Implementation Group (IG) represents their mandatory starting baseline?",
    "options": [
      "Implementation Group 0 (IG0), which permits maintaining all corporate passwords in an unencrypted shared spreadsheet.",
      "Implementation Group 4 (IG4), requiring nation-state level offensive cyber capabilities.",
      "Implementation Group 1 (IG1), consisting of 56 foundational safeguards defining essential cyber hygiene against untargeted attacks.",
      "Implementation Group 3 (IG3), requiring custom zero-day exploit research and automated adversary emulation."
    ],
    "correct": 2,
    "explanation": "CIS Controls v8 defines IG1 (56 safeguards) as the foundational cyber hygiene baseline that every organization must implement first before advancing to IG2 or IG3."
  },
  {
    "id": "q_m6_103",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "difficult",
    "q": "An attacker attempts an LSASS memory dump (MITRE ATT&CK T1003.001) using a custom compiled tool to extract plaintext credentials. A modern EDR agent terminates the process in under 50 milliseconds. Which low-level operating system interface enabled the EDR kernel sensor to intercept this action before credentials were read?",
    "options": [
      "The web browser's cookie storage cache, which cross-references user session tokens.",
      "Windows Kernel Callbacks (such as ObRegisterCallbacks) and Event Tracing for Windows (ETW-TI), which monitor and filter handle creation to sensitive processes like lsass.exe.",
      "The Windows Print Spooler service, which converts memory reads into PDF spool files.",
      "The BIOS CMOS battery clock, which measures fluctuations in motherboard electrical current."
    ],
    "correct": 1,
    "explanation": "Modern EDR agents utilize kernel-level callbacks (ObRegisterCallbacks) and Threat Intelligence ETW (ETW-TI) to intercept attempts by untrusted processes to acquire `PROCESS_VM_READ` handles to LSASS memory."
  },
  {
    "id": "q_m6_104",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "difficult",
    "q": "A developer uses AES in Electronic Codebook (ECB) mode to encrypt sensitive customer profile images before uploading them to cloud storage. Why is this implementation a severe cryptographic vulnerability?",
    "options": [
      "ECB encrypts identical plaintext blocks into identical ciphertext blocks without diffusion, preserving high-level structural patterns and outlines (the 'ECB Penguin' vulnerability).",
      "ECB mode automatically transmits the secret key in the clear to anyone pinging the server.",
      "ECB mode limits maximum file sizes to exactly 16 bytes, truncating all customer records.",
      "ECB mode requires the use of quantum computers to generate initial initialization vectors."
    ],
    "correct": 0,
    "explanation": "In ECB mode, each 128-bit plaintext block is encrypted independently. Identical plaintext blocks produce identical ciphertext blocks, leaking structural and visual data patterns."
  },
  {
    "id": "q_m6_105",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "difficult",
    "q": "Why does TLS 1.3 mandate Ephemeral Diffie-Hellman (ECDHE) key exchange and completely eliminate static RSA key exchange (RFC 8446)?",
    "options": [
      "Because static RSA keys can only be generated on hardware manufactured before 1995.",
      "Because Diffie-Hellman keys do not require any mathematical calculations to establish.",
      "Because TLS 1.3 completely eliminates all forms of encryption in favor of cleartext transmission.",
      "To enforce Perfect Forward Secrecy (PFS); with static RSA, an adversary who captures encrypted traffic today can decrypt all historical sessions if they ever compromise the server's private key in the future."
    ],
    "correct": 3,
    "explanation": "Under static RSA key exchange, compromising the server's long-term private key enables retroactive decryption of all historically recorded traffic. Ephemeral Diffie-Hellman generates disposable keys per session, guaranteeing Perfect Forward Secrecy."
  },
  {
    "id": "q_m6_106",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "difficult",
    "q": "An enterprise deploys a confidential computing workload handling sensitive biometric data in a multi-tenant public cloud. Which hardware technology ensures data confidentiality and integrity while data is actively being processed in CPU registers and RAM (Data in Use)?",
    "options": [
      "Deploying redundant diesel backup generators in the cloud provider's physical facility.",
      "Configuring a reverse proxy firewall to terminate external TLS connections.",
      "Hardware-enforced Trusted Execution Environments (TEEs, such as AMD SEV-SNP or Intel SGX/TDX) that encrypt memory pages and isolate the enclave from the host hypervisor and root OS.",
      "Symmetric AES-256 disk encryption applied to the server's secondary swap partition."
    ],
    "correct": 2,
    "explanation": "Confidential Computing utilizes CPU-level hardware enclaves (TEEs) with memory encryption (AMD SEV, Intel SGX/TDX), preventing the cloud provider, hypervisor, or root host OS from reading memory during computation."
  },
  {
    "id": "q_m6_107",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "difficult",
    "q": "A SIEM correlation rule alerts on: 'Windows Event ID 4688 with NewProcessName=powershell.exe and CommandLine containing -EncodedCommand, followed within 120 seconds by an outbound connection on port 4444'. What adversary activity does this rule specifically target?",
    "options": [
      "The operating system synchronizing its internal hardware clock via network NTP.",
      "An obfuscated PowerShell command executing a reverse shell to an adversary Command & Control (C2) listener.",
      "A standard automated Windows Update downloading language translation dictionaries.",
      "A legitimate user clearing their Google Chrome web browser cache history."
    ],
    "correct": 1,
    "explanation": "Adversaries commonly use `-EncodedCommand` (Base64) to hide malicious PowerShell commands from casual inspection, connecting outbound on unprivileged ports (like 4444, Metasploit default) to establish C2 interactive shells."
  },
  {
    "id": "q_m6_108",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "difficult",
    "q": "During an active ransomware containment operation, a junior administrator proposes immediately pulling the physical power cord from an infected critical domain controller. Why is this action a severe forensic and operational mistake?",
    "options": [
      "It instantly obliterates volatile RAM containing running adversary processes, injected DLLs, unencrypted network sockets, and potentially the cryptographic decryption keys needed to recover data.",
      "It causes the computer's motherboard to catch fire due to sudden electrical discharge.",
      "It automatically transmits an encrypted copy of all customer files to the dark web.",
      "It permanently destroys the hard drive's magnetic platters, preventing data recovery."
    ],
    "correct": 0,
    "explanation": "Hard powering off destroys live RAM. Investigators isolate the host from the network instead, capturing volatile memory (RAM) first using tools like WinPmem/DumpIt to preserve ephemeral forensic evidence and cryptographic keys."
  },
  {
    "id": "q_m6_109",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "difficult",
    "q": "Under the Indian CERT-In Cybersecurity Directions of April 2022, what two strict operational mandates were imposed on all corporate entities, intermediaries, and service providers operating in India?",
    "options": [
      "Mandatory deployment of government-authored operating systems, and a complete ban on data encryption.",
      "Reporting all data breaches within 30 days to local police stations, and deleting logs every 24 hours.",
      "Mandatory payment of ransom ransoms through authorized national commercial banks.",
      "Mandatory reporting of cybersecurity incidents within 6 hours of discovery, and mandatory maintenance of secure system logs for a rolling period of 5 years within Indian jurisdiction."
    ],
    "correct": 3,
    "explanation": "CERT-In Directions (2022) established a strict 6-hour incident reporting window for 20 specified cyber event types, alongside a mandatory 5-year log retention requirement synchronized to NPL/NIC NTP."
  },
  {
    "id": "q_m6_110",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "difficult",
    "q": "An aspiring security analyst builds an enterprise home laboratory on a Proxmox hypervisor. Why does professional lab design mandate placing the virtual Active Directory domain controller and victim VMs behind a dedicated virtual firewall (such as pfSense or OPNsense) with host-only virtual networking?",
    "options": [
      "Because pfSense accelerates computer processor clock speeds during malware analysis.",
      "To allow neighbors to freely connect to the Active Directory domain controller.",
      "To establish realistic enterprise network boundaries and prevent malicious exploit payloads or automated worm traffic from escaping into the analyst's home Wi-Fi network and family devices.",
      "Because Windows Server crashes immediately if connected directly to a home consumer router."
    ],
    "correct": 2,
    "explanation": "Host-only virtual switches and virtual firewalls (pfSense) isolate malware testing and active exploits within the virtual lab sandbox, preventing lateral escape or accidental scanning of the physical home network."
  },
  {
    "id": "q_m6_111",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 2] Analyzing complex threats under security controls classification (admin, technical, physical & preventive, detective, corrective): A healthcare facility cannot patch a critical Remote Code Execution vulnerability in a legacy Windows 2008 server controlling a radiological MRI scanner because vendor updates are defunct. The security architect isolates the server into a dedicated VLAN with strict deny-all ACLs, deploys a WAF virtual patch, and enables hyper-sensitive monitoring. Under formal risk frameworks, what is this defensive deployment called?",
    "options": [
      "A Security through Obscurity failure that violates HIPAA physical safeguard rules.",
      "A Compensating Control architecture; it mitigates residual risk to an acceptable threshold without altering the unpatchable root vulnerability.",
      "A Complete Mediation violation; it disables all security inspections to maximize imaging throughput.",
      "An Administrative waiver that completely transfers legal liability to the patient."
    ],
    "correct": 1,
    "explanation": "When a primary control (patching) cannot be achieved due to operational constraints, compensating controls (segmentation, virtual patching, hyper-monitoring) reduce risk to an acceptable level."
  },
  {
    "id": "q_m6_112",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 2] Analyzing complex threats under cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: A mid-sized logistics company begins adopting the Center for Internet Security (CIS) Critical Security Controls v8. As an organization with limited specialized security personnel seeking essential cyber hygiene, which Implementation Group (IG) represents their mandatory starting baseline?",
    "options": [
      "Implementation Group 1 (IG1), consisting of 56 foundational safeguards defining essential cyber hygiene against untargeted attacks.",
      "Implementation Group 3 (IG3), requiring custom zero-day exploit research and automated adversary emulation.",
      "Implementation Group 0 (IG0), which permits maintaining all corporate passwords in an unencrypted shared spreadsheet.",
      "Implementation Group 4 (IG4), requiring nation-state level offensive cyber capabilities."
    ],
    "correct": 0,
    "explanation": "CIS Controls v8 defines IG1 (56 safeguards) as the foundational cyber hygiene baseline that every organization must implement first before advancing to IG2 or IG3."
  },
  {
    "id": "q_m6_113",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 2] Analyzing complex threats under endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: An attacker attempts an LSASS memory dump (MITRE ATT&CK T1003.001) using a custom compiled tool to extract plaintext credentials. A modern EDR agent terminates the process in under 50 milliseconds. Which low-level operating system interface enabled the EDR kernel sensor to intercept this action before credentials were read?",
    "options": [
      "The Windows Print Spooler service, which converts memory reads into PDF spool files.",
      "The BIOS CMOS battery clock, which measures fluctuations in motherboard electrical current.",
      "The web browser's cookie storage cache, which cross-references user session tokens.",
      "Windows Kernel Callbacks (such as ObRegisterCallbacks) and Event Tracing for Windows (ETW-TI), which monitor and filter handle creation to sensitive processes like lsass.exe."
    ],
    "correct": 3,
    "explanation": "Modern EDR agents utilize kernel-level callbacks (ObRegisterCallbacks) and Threat Intelligence ETW (ETW-TI) to intercept attempts by untrusted processes to acquire `PROCESS_VM_READ` handles to LSASS memory."
  },
  {
    "id": "q_m6_114",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 2] Analyzing complex threats under applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: A developer uses AES in Electronic Codebook (ECB) mode to encrypt sensitive customer profile images before uploading them to cloud storage. Why is this implementation a severe cryptographic vulnerability?",
    "options": [
      "ECB mode limits maximum file sizes to exactly 16 bytes, truncating all customer records.",
      "ECB mode requires the use of quantum computers to generate initial initialization vectors.",
      "ECB encrypts identical plaintext blocks into identical ciphertext blocks without diffusion, preserving high-level structural patterns and outlines (the 'ECB Penguin' vulnerability).",
      "ECB mode automatically transmits the secret key in the clear to anyone pinging the server."
    ],
    "correct": 2,
    "explanation": "In ECB mode, each 128-bit plaintext block is encrypted independently. Identical plaintext blocks produce identical ciphertext blocks, leaking structural and visual data patterns."
  },
  {
    "id": "q_m6_115",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 2] Analyzing complex threats under pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: Why does TLS 1.3 mandate Ephemeral Diffie-Hellman (ECDHE) key exchange and completely eliminate static RSA key exchange (RFC 8446)?",
    "options": [
      "Because TLS 1.3 completely eliminates all forms of encryption in favor of cleartext transmission.",
      "To enforce Perfect Forward Secrecy (PFS); with static RSA, an adversary who captures encrypted traffic today can decrypt all historical sessions if they ever compromise the server's private key in the future.",
      "Because static RSA keys can only be generated on hardware manufactured before 1995.",
      "Because Diffie-Hellman keys do not require any mathematical calculations to establish."
    ],
    "correct": 1,
    "explanation": "Under static RSA key exchange, compromising the server's long-term private key enables retroactive decryption of all historically recorded traffic. Ephemeral Diffie-Hellman generates disposable keys per session, guaranteeing Perfect Forward Secrecy."
  },
  {
    "id": "q_m6_116",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 2] Analyzing complex threats under data states: data at rest (envelope encryption), in transit & in use (tees): An enterprise deploys a confidential computing workload handling sensitive biometric data in a multi-tenant public cloud. Which hardware technology ensures data confidentiality and integrity while data is actively being processed in CPU registers and RAM (Data in Use)?",
    "options": [
      "Hardware-enforced Trusted Execution Environments (TEEs, such as AMD SEV-SNP or Intel SGX/TDX) that encrypt memory pages and isolate the enclave from the host hypervisor and root OS.",
      "Symmetric AES-256 disk encryption applied to the server's secondary swap partition.",
      "Deploying redundant diesel backup generators in the cloud provider's physical facility.",
      "Configuring a reverse proxy firewall to terminate external TLS connections."
    ],
    "correct": 0,
    "explanation": "Confidential Computing utilizes CPU-level hardware enclaves (TEEs) with memory encryption (AMD SEV, Intel SGX/TDX), preventing the cloud provider, hypervisor, or root host OS from reading memory during computation."
  },
  {
    "id": "q_m6_117",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 2] Analyzing complex threats under security operations center (soc) architecture, siem & soar automation: A SIEM correlation rule alerts on: 'Windows Event ID 4688 with NewProcessName=powershell.exe and CommandLine containing -EncodedCommand, followed within 120 seconds by an outbound connection on port 4444'. What adversary activity does this rule specifically target?",
    "options": [
      "A standard automated Windows Update downloading language translation dictionaries.",
      "A legitimate user clearing their Google Chrome web browser cache history.",
      "The operating system synchronizing its internal hardware clock via network NTP.",
      "An obfuscated PowerShell command executing a reverse shell to an adversary Command & Control (C2) listener."
    ],
    "correct": 3,
    "explanation": "Adversaries commonly use `-EncodedCommand` (Base64) to hide malicious PowerShell commands from casual inspection, connecting outbound on unprivileged ports (like 4444, Metasploit default) to establish C2 interactive shells."
  },
  {
    "id": "q_m6_118",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 2] Analyzing complex threats under incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): During an active ransomware containment operation, a junior administrator proposes immediately pulling the physical power cord from an infected critical domain controller. Why is this action a severe forensic and operational mistake?",
    "options": [
      "It automatically transmits an encrypted copy of all customer files to the dark web.",
      "It permanently destroys the hard drive's magnetic platters, preventing data recovery.",
      "It instantly obliterates volatile RAM containing running adversary processes, injected DLLs, unencrypted network sockets, and potentially the cryptographic decryption keys needed to recover data.",
      "It causes the computer's motherboard to catch fire due to sudden electrical discharge."
    ],
    "correct": 2,
    "explanation": "Hard powering off destroys live RAM. Investigators isolate the host from the network instead, capturing volatile memory (RAM) first using tools like WinPmem/DumpIt to preserve ephemeral forensic evidence and cryptographic keys."
  },
  {
    "id": "q_m6_119",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 2] Analyzing complex threats under cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Indian CERT-In Cybersecurity Directions of April 2022, what two strict operational mandates were imposed on all corporate entities, intermediaries, and service providers operating in India?",
    "options": [
      "Mandatory payment of ransom ransoms through authorized national commercial banks.",
      "Mandatory reporting of cybersecurity incidents within 6 hours of discovery, and mandatory maintenance of secure system logs for a rolling period of 5 years within Indian jurisdiction.",
      "Mandatory deployment of government-authored operating systems, and a complete ban on data encryption.",
      "Reporting all data breaches within 30 days to local police stations, and deleting logs every 24 hours."
    ],
    "correct": 1,
    "explanation": "CERT-In Directions (2022) established a strict 6-hour incident reporting window for 20 specified cyber event types, alongside a mandatory 5-year log retention requirement synchronized to NPL/NIC NTP."
  },
  {
    "id": "q_m6_120",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 2] Analyzing complex threats under nice workforce framework, red/blue/purple teams & home lab engineering: An aspiring security analyst builds an enterprise home laboratory on a Proxmox hypervisor. Why does professional lab design mandate placing the virtual Active Directory domain controller and victim VMs behind a dedicated virtual firewall (such as pfSense or OPNsense) with host-only virtual networking?",
    "options": [
      "To establish realistic enterprise network boundaries and prevent malicious exploit payloads or automated worm traffic from escaping into the analyst's home Wi-Fi network and family devices.",
      "Because Windows Server crashes immediately if connected directly to a home consumer router.",
      "Because pfSense accelerates computer processor clock speeds during malware analysis.",
      "To allow neighbors to freely connect to the Active Directory domain controller."
    ],
    "correct": 0,
    "explanation": "Host-only virtual switches and virtual firewalls (pfSense) isolate malware testing and active exploits within the virtual lab sandbox, preventing lateral escape or accidental scanning of the physical home network."
  },
  {
    "id": "q_m6_121",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 3] Analyzing complex threats under security controls classification (admin, technical, physical & preventive, detective, corrective): A healthcare facility cannot patch a critical Remote Code Execution vulnerability in a legacy Windows 2008 server controlling a radiological MRI scanner because vendor updates are defunct. The security architect isolates the server into a dedicated VLAN with strict deny-all ACLs, deploys a WAF virtual patch, and enables hyper-sensitive monitoring. Under formal risk frameworks, what is this defensive deployment called?",
    "options": [
      "A Complete Mediation violation; it disables all security inspections to maximize imaging throughput.",
      "An Administrative waiver that completely transfers legal liability to the patient.",
      "A Security through Obscurity failure that violates HIPAA physical safeguard rules.",
      "A Compensating Control architecture; it mitigates residual risk to an acceptable threshold without altering the unpatchable root vulnerability."
    ],
    "correct": 3,
    "explanation": "When a primary control (patching) cannot be achieved due to operational constraints, compensating controls (segmentation, virtual patching, hyper-monitoring) reduce risk to an acceptable level."
  },
  {
    "id": "q_m6_122",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 3] Analyzing complex threats under cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: A mid-sized logistics company begins adopting the Center for Internet Security (CIS) Critical Security Controls v8. As an organization with limited specialized security personnel seeking essential cyber hygiene, which Implementation Group (IG) represents their mandatory starting baseline?",
    "options": [
      "Implementation Group 0 (IG0), which permits maintaining all corporate passwords in an unencrypted shared spreadsheet.",
      "Implementation Group 4 (IG4), requiring nation-state level offensive cyber capabilities.",
      "Implementation Group 1 (IG1), consisting of 56 foundational safeguards defining essential cyber hygiene against untargeted attacks.",
      "Implementation Group 3 (IG3), requiring custom zero-day exploit research and automated adversary emulation."
    ],
    "correct": 2,
    "explanation": "CIS Controls v8 defines IG1 (56 safeguards) as the foundational cyber hygiene baseline that every organization must implement first before advancing to IG2 or IG3."
  },
  {
    "id": "q_m6_123",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 3] Analyzing complex threats under endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: An attacker attempts an LSASS memory dump (MITRE ATT&CK T1003.001) using a custom compiled tool to extract plaintext credentials. A modern EDR agent terminates the process in under 50 milliseconds. Which low-level operating system interface enabled the EDR kernel sensor to intercept this action before credentials were read?",
    "options": [
      "The web browser's cookie storage cache, which cross-references user session tokens.",
      "Windows Kernel Callbacks (such as ObRegisterCallbacks) and Event Tracing for Windows (ETW-TI), which monitor and filter handle creation to sensitive processes like lsass.exe.",
      "The Windows Print Spooler service, which converts memory reads into PDF spool files.",
      "The BIOS CMOS battery clock, which measures fluctuations in motherboard electrical current."
    ],
    "correct": 1,
    "explanation": "Modern EDR agents utilize kernel-level callbacks (ObRegisterCallbacks) and Threat Intelligence ETW (ETW-TI) to intercept attempts by untrusted processes to acquire `PROCESS_VM_READ` handles to LSASS memory."
  },
  {
    "id": "q_m6_124",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 3] Analyzing complex threats under applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: A developer uses AES in Electronic Codebook (ECB) mode to encrypt sensitive customer profile images before uploading them to cloud storage. Why is this implementation a severe cryptographic vulnerability?",
    "options": [
      "ECB encrypts identical plaintext blocks into identical ciphertext blocks without diffusion, preserving high-level structural patterns and outlines (the 'ECB Penguin' vulnerability).",
      "ECB mode automatically transmits the secret key in the clear to anyone pinging the server.",
      "ECB mode limits maximum file sizes to exactly 16 bytes, truncating all customer records.",
      "ECB mode requires the use of quantum computers to generate initial initialization vectors."
    ],
    "correct": 0,
    "explanation": "In ECB mode, each 128-bit plaintext block is encrypted independently. Identical plaintext blocks produce identical ciphertext blocks, leaking structural and visual data patterns."
  },
  {
    "id": "q_m6_125",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 3] Analyzing complex threats under pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: Why does TLS 1.3 mandate Ephemeral Diffie-Hellman (ECDHE) key exchange and completely eliminate static RSA key exchange (RFC 8446)?",
    "options": [
      "Because static RSA keys can only be generated on hardware manufactured before 1995.",
      "Because Diffie-Hellman keys do not require any mathematical calculations to establish.",
      "Because TLS 1.3 completely eliminates all forms of encryption in favor of cleartext transmission.",
      "To enforce Perfect Forward Secrecy (PFS); with static RSA, an adversary who captures encrypted traffic today can decrypt all historical sessions if they ever compromise the server's private key in the future."
    ],
    "correct": 3,
    "explanation": "Under static RSA key exchange, compromising the server's long-term private key enables retroactive decryption of all historically recorded traffic. Ephemeral Diffie-Hellman generates disposable keys per session, guaranteeing Perfect Forward Secrecy."
  },
  {
    "id": "q_m6_126",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 3] Analyzing complex threats under data states: data at rest (envelope encryption), in transit & in use (tees): An enterprise deploys a confidential computing workload handling sensitive biometric data in a multi-tenant public cloud. Which hardware technology ensures data confidentiality and integrity while data is actively being processed in CPU registers and RAM (Data in Use)?",
    "options": [
      "Deploying redundant diesel backup generators in the cloud provider's physical facility.",
      "Configuring a reverse proxy firewall to terminate external TLS connections.",
      "Hardware-enforced Trusted Execution Environments (TEEs, such as AMD SEV-SNP or Intel SGX/TDX) that encrypt memory pages and isolate the enclave from the host hypervisor and root OS.",
      "Symmetric AES-256 disk encryption applied to the server's secondary swap partition."
    ],
    "correct": 2,
    "explanation": "Confidential Computing utilizes CPU-level hardware enclaves (TEEs) with memory encryption (AMD SEV, Intel SGX/TDX), preventing the cloud provider, hypervisor, or root host OS from reading memory during computation."
  },
  {
    "id": "q_m6_127",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 3] Analyzing complex threats under security operations center (soc) architecture, siem & soar automation: A SIEM correlation rule alerts on: 'Windows Event ID 4688 with NewProcessName=powershell.exe and CommandLine containing -EncodedCommand, followed within 120 seconds by an outbound connection on port 4444'. What adversary activity does this rule specifically target?",
    "options": [
      "The operating system synchronizing its internal hardware clock via network NTP.",
      "An obfuscated PowerShell command executing a reverse shell to an adversary Command & Control (C2) listener.",
      "A standard automated Windows Update downloading language translation dictionaries.",
      "A legitimate user clearing their Google Chrome web browser cache history."
    ],
    "correct": 1,
    "explanation": "Adversaries commonly use `-EncodedCommand` (Base64) to hide malicious PowerShell commands from casual inspection, connecting outbound on unprivileged ports (like 4444, Metasploit default) to establish C2 interactive shells."
  },
  {
    "id": "q_m6_128",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 3] Analyzing complex threats under incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): During an active ransomware containment operation, a junior administrator proposes immediately pulling the physical power cord from an infected critical domain controller. Why is this action a severe forensic and operational mistake?",
    "options": [
      "It instantly obliterates volatile RAM containing running adversary processes, injected DLLs, unencrypted network sockets, and potentially the cryptographic decryption keys needed to recover data.",
      "It causes the computer's motherboard to catch fire due to sudden electrical discharge.",
      "It automatically transmits an encrypted copy of all customer files to the dark web.",
      "It permanently destroys the hard drive's magnetic platters, preventing data recovery."
    ],
    "correct": 0,
    "explanation": "Hard powering off destroys live RAM. Investigators isolate the host from the network instead, capturing volatile memory (RAM) first using tools like WinPmem/DumpIt to preserve ephemeral forensic evidence and cryptographic keys."
  },
  {
    "id": "q_m6_129",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 3] Analyzing complex threats under cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Indian CERT-In Cybersecurity Directions of April 2022, what two strict operational mandates were imposed on all corporate entities, intermediaries, and service providers operating in India?",
    "options": [
      "Mandatory deployment of government-authored operating systems, and a complete ban on data encryption.",
      "Reporting all data breaches within 30 days to local police stations, and deleting logs every 24 hours.",
      "Mandatory payment of ransom ransoms through authorized national commercial banks.",
      "Mandatory reporting of cybersecurity incidents within 6 hours of discovery, and mandatory maintenance of secure system logs for a rolling period of 5 years within Indian jurisdiction."
    ],
    "correct": 3,
    "explanation": "CERT-In Directions (2022) established a strict 6-hour incident reporting window for 20 specified cyber event types, alongside a mandatory 5-year log retention requirement synchronized to NPL/NIC NTP."
  },
  {
    "id": "q_m6_130",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 3] Analyzing complex threats under nice workforce framework, red/blue/purple teams & home lab engineering: An aspiring security analyst builds an enterprise home laboratory on a Proxmox hypervisor. Why does professional lab design mandate placing the virtual Active Directory domain controller and victim VMs behind a dedicated virtual firewall (such as pfSense or OPNsense) with host-only virtual networking?",
    "options": [
      "Because pfSense accelerates computer processor clock speeds during malware analysis.",
      "To allow neighbors to freely connect to the Active Directory domain controller.",
      "To establish realistic enterprise network boundaries and prevent malicious exploit payloads or automated worm traffic from escaping into the analyst's home Wi-Fi network and family devices.",
      "Because Windows Server crashes immediately if connected directly to a home consumer router."
    ],
    "correct": 2,
    "explanation": "Host-only virtual switches and virtual firewalls (pfSense) isolate malware testing and active exploits within the virtual lab sandbox, preventing lateral escape or accidental scanning of the physical home network."
  },
  {
    "id": "q_m6_131",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 4] Analyzing complex threats under security controls classification (admin, technical, physical & preventive, detective, corrective): A healthcare facility cannot patch a critical Remote Code Execution vulnerability in a legacy Windows 2008 server controlling a radiological MRI scanner because vendor updates are defunct. The security architect isolates the server into a dedicated VLAN with strict deny-all ACLs, deploys a WAF virtual patch, and enables hyper-sensitive monitoring. Under formal risk frameworks, what is this defensive deployment called?",
    "options": [
      "A Security through Obscurity failure that violates HIPAA physical safeguard rules.",
      "A Compensating Control architecture; it mitigates residual risk to an acceptable threshold without altering the unpatchable root vulnerability.",
      "A Complete Mediation violation; it disables all security inspections to maximize imaging throughput.",
      "An Administrative waiver that completely transfers legal liability to the patient."
    ],
    "correct": 1,
    "explanation": "When a primary control (patching) cannot be achieved due to operational constraints, compensating controls (segmentation, virtual patching, hyper-monitoring) reduce risk to an acceptable level."
  },
  {
    "id": "q_m6_132",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 4] Analyzing complex threats under cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: A mid-sized logistics company begins adopting the Center for Internet Security (CIS) Critical Security Controls v8. As an organization with limited specialized security personnel seeking essential cyber hygiene, which Implementation Group (IG) represents their mandatory starting baseline?",
    "options": [
      "Implementation Group 1 (IG1), consisting of 56 foundational safeguards defining essential cyber hygiene against untargeted attacks.",
      "Implementation Group 3 (IG3), requiring custom zero-day exploit research and automated adversary emulation.",
      "Implementation Group 0 (IG0), which permits maintaining all corporate passwords in an unencrypted shared spreadsheet.",
      "Implementation Group 4 (IG4), requiring nation-state level offensive cyber capabilities."
    ],
    "correct": 0,
    "explanation": "CIS Controls v8 defines IG1 (56 safeguards) as the foundational cyber hygiene baseline that every organization must implement first before advancing to IG2 or IG3."
  },
  {
    "id": "q_m6_133",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 4] Analyzing complex threats under endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: An attacker attempts an LSASS memory dump (MITRE ATT&CK T1003.001) using a custom compiled tool to extract plaintext credentials. A modern EDR agent terminates the process in under 50 milliseconds. Which low-level operating system interface enabled the EDR kernel sensor to intercept this action before credentials were read?",
    "options": [
      "The Windows Print Spooler service, which converts memory reads into PDF spool files.",
      "The BIOS CMOS battery clock, which measures fluctuations in motherboard electrical current.",
      "The web browser's cookie storage cache, which cross-references user session tokens.",
      "Windows Kernel Callbacks (such as ObRegisterCallbacks) and Event Tracing for Windows (ETW-TI), which monitor and filter handle creation to sensitive processes like lsass.exe."
    ],
    "correct": 3,
    "explanation": "Modern EDR agents utilize kernel-level callbacks (ObRegisterCallbacks) and Threat Intelligence ETW (ETW-TI) to intercept attempts by untrusted processes to acquire `PROCESS_VM_READ` handles to LSASS memory."
  },
  {
    "id": "q_m6_134",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 4] Analyzing complex threats under applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: A developer uses AES in Electronic Codebook (ECB) mode to encrypt sensitive customer profile images before uploading them to cloud storage. Why is this implementation a severe cryptographic vulnerability?",
    "options": [
      "ECB mode limits maximum file sizes to exactly 16 bytes, truncating all customer records.",
      "ECB mode requires the use of quantum computers to generate initial initialization vectors.",
      "ECB encrypts identical plaintext blocks into identical ciphertext blocks without diffusion, preserving high-level structural patterns and outlines (the 'ECB Penguin' vulnerability).",
      "ECB mode automatically transmits the secret key in the clear to anyone pinging the server."
    ],
    "correct": 2,
    "explanation": "In ECB mode, each 128-bit plaintext block is encrypted independently. Identical plaintext blocks produce identical ciphertext blocks, leaking structural and visual data patterns."
  },
  {
    "id": "q_m6_135",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 4] Analyzing complex threats under pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: Why does TLS 1.3 mandate Ephemeral Diffie-Hellman (ECDHE) key exchange and completely eliminate static RSA key exchange (RFC 8446)?",
    "options": [
      "Because TLS 1.3 completely eliminates all forms of encryption in favor of cleartext transmission.",
      "To enforce Perfect Forward Secrecy (PFS); with static RSA, an adversary who captures encrypted traffic today can decrypt all historical sessions if they ever compromise the server's private key in the future.",
      "Because static RSA keys can only be generated on hardware manufactured before 1995.",
      "Because Diffie-Hellman keys do not require any mathematical calculations to establish."
    ],
    "correct": 1,
    "explanation": "Under static RSA key exchange, compromising the server's long-term private key enables retroactive decryption of all historically recorded traffic. Ephemeral Diffie-Hellman generates disposable keys per session, guaranteeing Perfect Forward Secrecy."
  },
  {
    "id": "q_m6_136",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 4] Analyzing complex threats under data states: data at rest (envelope encryption), in transit & in use (tees): An enterprise deploys a confidential computing workload handling sensitive biometric data in a multi-tenant public cloud. Which hardware technology ensures data confidentiality and integrity while data is actively being processed in CPU registers and RAM (Data in Use)?",
    "options": [
      "Hardware-enforced Trusted Execution Environments (TEEs, such as AMD SEV-SNP or Intel SGX/TDX) that encrypt memory pages and isolate the enclave from the host hypervisor and root OS.",
      "Symmetric AES-256 disk encryption applied to the server's secondary swap partition.",
      "Deploying redundant diesel backup generators in the cloud provider's physical facility.",
      "Configuring a reverse proxy firewall to terminate external TLS connections."
    ],
    "correct": 0,
    "explanation": "Confidential Computing utilizes CPU-level hardware enclaves (TEEs) with memory encryption (AMD SEV, Intel SGX/TDX), preventing the cloud provider, hypervisor, or root host OS from reading memory during computation."
  },
  {
    "id": "q_m6_137",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 4] Analyzing complex threats under security operations center (soc) architecture, siem & soar automation: A SIEM correlation rule alerts on: 'Windows Event ID 4688 with NewProcessName=powershell.exe and CommandLine containing -EncodedCommand, followed within 120 seconds by an outbound connection on port 4444'. What adversary activity does this rule specifically target?",
    "options": [
      "A standard automated Windows Update downloading language translation dictionaries.",
      "A legitimate user clearing their Google Chrome web browser cache history.",
      "The operating system synchronizing its internal hardware clock via network NTP.",
      "An obfuscated PowerShell command executing a reverse shell to an adversary Command & Control (C2) listener."
    ],
    "correct": 3,
    "explanation": "Adversaries commonly use `-EncodedCommand` (Base64) to hide malicious PowerShell commands from casual inspection, connecting outbound on unprivileged ports (like 4444, Metasploit default) to establish C2 interactive shells."
  },
  {
    "id": "q_m6_138",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 4] Analyzing complex threats under incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): During an active ransomware containment operation, a junior administrator proposes immediately pulling the physical power cord from an infected critical domain controller. Why is this action a severe forensic and operational mistake?",
    "options": [
      "It automatically transmits an encrypted copy of all customer files to the dark web.",
      "It permanently destroys the hard drive's magnetic platters, preventing data recovery.",
      "It instantly obliterates volatile RAM containing running adversary processes, injected DLLs, unencrypted network sockets, and potentially the cryptographic decryption keys needed to recover data.",
      "It causes the computer's motherboard to catch fire due to sudden electrical discharge."
    ],
    "correct": 2,
    "explanation": "Hard powering off destroys live RAM. Investigators isolate the host from the network instead, capturing volatile memory (RAM) first using tools like WinPmem/DumpIt to preserve ephemeral forensic evidence and cryptographic keys."
  },
  {
    "id": "q_m6_139",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 4] Analyzing complex threats under cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Indian CERT-In Cybersecurity Directions of April 2022, what two strict operational mandates were imposed on all corporate entities, intermediaries, and service providers operating in India?",
    "options": [
      "Mandatory payment of ransom ransoms through authorized national commercial banks.",
      "Mandatory reporting of cybersecurity incidents within 6 hours of discovery, and mandatory maintenance of secure system logs for a rolling period of 5 years within Indian jurisdiction.",
      "Mandatory deployment of government-authored operating systems, and a complete ban on data encryption.",
      "Reporting all data breaches within 30 days to local police stations, and deleting logs every 24 hours."
    ],
    "correct": 1,
    "explanation": "CERT-In Directions (2022) established a strict 6-hour incident reporting window for 20 specified cyber event types, alongside a mandatory 5-year log retention requirement synchronized to NPL/NIC NTP."
  },
  {
    "id": "q_m6_140",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 4] Analyzing complex threats under nice workforce framework, red/blue/purple teams & home lab engineering: An aspiring security analyst builds an enterprise home laboratory on a Proxmox hypervisor. Why does professional lab design mandate placing the virtual Active Directory domain controller and victim VMs behind a dedicated virtual firewall (such as pfSense or OPNsense) with host-only virtual networking?",
    "options": [
      "To establish realistic enterprise network boundaries and prevent malicious exploit payloads or automated worm traffic from escaping into the analyst's home Wi-Fi network and family devices.",
      "Because Windows Server crashes immediately if connected directly to a home consumer router.",
      "Because pfSense accelerates computer processor clock speeds during malware analysis.",
      "To allow neighbors to freely connect to the Active Directory domain controller."
    ],
    "correct": 0,
    "explanation": "Host-only virtual switches and virtual firewalls (pfSense) isolate malware testing and active exploits within the virtual lab sandbox, preventing lateral escape or accidental scanning of the physical home network."
  },
  {
    "id": "q_m6_141",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 5] Analyzing complex threats under security controls classification (admin, technical, physical & preventive, detective, corrective): A healthcare facility cannot patch a critical Remote Code Execution vulnerability in a legacy Windows 2008 server controlling a radiological MRI scanner because vendor updates are defunct. The security architect isolates the server into a dedicated VLAN with strict deny-all ACLs, deploys a WAF virtual patch, and enables hyper-sensitive monitoring. Under formal risk frameworks, what is this defensive deployment called?",
    "options": [
      "A Complete Mediation violation; it disables all security inspections to maximize imaging throughput.",
      "An Administrative waiver that completely transfers legal liability to the patient.",
      "A Security through Obscurity failure that violates HIPAA physical safeguard rules.",
      "A Compensating Control architecture; it mitigates residual risk to an acceptable threshold without altering the unpatchable root vulnerability."
    ],
    "correct": 3,
    "explanation": "When a primary control (patching) cannot be achieved due to operational constraints, compensating controls (segmentation, virtual patching, hyper-monitoring) reduce risk to an acceptable level."
  },
  {
    "id": "q_m6_142",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 5] Analyzing complex threats under cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: A mid-sized logistics company begins adopting the Center for Internet Security (CIS) Critical Security Controls v8. As an organization with limited specialized security personnel seeking essential cyber hygiene, which Implementation Group (IG) represents their mandatory starting baseline?",
    "options": [
      "Implementation Group 0 (IG0), which permits maintaining all corporate passwords in an unencrypted shared spreadsheet.",
      "Implementation Group 4 (IG4), requiring nation-state level offensive cyber capabilities.",
      "Implementation Group 1 (IG1), consisting of 56 foundational safeguards defining essential cyber hygiene against untargeted attacks.",
      "Implementation Group 3 (IG3), requiring custom zero-day exploit research and automated adversary emulation."
    ],
    "correct": 2,
    "explanation": "CIS Controls v8 defines IG1 (56 safeguards) as the foundational cyber hygiene baseline that every organization must implement first before advancing to IG2 or IG3."
  },
  {
    "id": "q_m6_143",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 5] Analyzing complex threats under endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: An attacker attempts an LSASS memory dump (MITRE ATT&CK T1003.001) using a custom compiled tool to extract plaintext credentials. A modern EDR agent terminates the process in under 50 milliseconds. Which low-level operating system interface enabled the EDR kernel sensor to intercept this action before credentials were read?",
    "options": [
      "The web browser's cookie storage cache, which cross-references user session tokens.",
      "Windows Kernel Callbacks (such as ObRegisterCallbacks) and Event Tracing for Windows (ETW-TI), which monitor and filter handle creation to sensitive processes like lsass.exe.",
      "The Windows Print Spooler service, which converts memory reads into PDF spool files.",
      "The BIOS CMOS battery clock, which measures fluctuations in motherboard electrical current."
    ],
    "correct": 1,
    "explanation": "Modern EDR agents utilize kernel-level callbacks (ObRegisterCallbacks) and Threat Intelligence ETW (ETW-TI) to intercept attempts by untrusted processes to acquire `PROCESS_VM_READ` handles to LSASS memory."
  },
  {
    "id": "q_m6_144",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 5] Analyzing complex threats under applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: A developer uses AES in Electronic Codebook (ECB) mode to encrypt sensitive customer profile images before uploading them to cloud storage. Why is this implementation a severe cryptographic vulnerability?",
    "options": [
      "ECB encrypts identical plaintext blocks into identical ciphertext blocks without diffusion, preserving high-level structural patterns and outlines (the 'ECB Penguin' vulnerability).",
      "ECB mode automatically transmits the secret key in the clear to anyone pinging the server.",
      "ECB mode limits maximum file sizes to exactly 16 bytes, truncating all customer records.",
      "ECB mode requires the use of quantum computers to generate initial initialization vectors."
    ],
    "correct": 0,
    "explanation": "In ECB mode, each 128-bit plaintext block is encrypted independently. Identical plaintext blocks produce identical ciphertext blocks, leaking structural and visual data patterns."
  },
  {
    "id": "q_m6_145",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 5] Analyzing complex threats under pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: Why does TLS 1.3 mandate Ephemeral Diffie-Hellman (ECDHE) key exchange and completely eliminate static RSA key exchange (RFC 8446)?",
    "options": [
      "Because static RSA keys can only be generated on hardware manufactured before 1995.",
      "Because Diffie-Hellman keys do not require any mathematical calculations to establish.",
      "Because TLS 1.3 completely eliminates all forms of encryption in favor of cleartext transmission.",
      "To enforce Perfect Forward Secrecy (PFS); with static RSA, an adversary who captures encrypted traffic today can decrypt all historical sessions if they ever compromise the server's private key in the future."
    ],
    "correct": 3,
    "explanation": "Under static RSA key exchange, compromising the server's long-term private key enables retroactive decryption of all historically recorded traffic. Ephemeral Diffie-Hellman generates disposable keys per session, guaranteeing Perfect Forward Secrecy."
  },
  {
    "id": "q_m6_146",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 5] Analyzing complex threats under data states: data at rest (envelope encryption), in transit & in use (tees): An enterprise deploys a confidential computing workload handling sensitive biometric data in a multi-tenant public cloud. Which hardware technology ensures data confidentiality and integrity while data is actively being processed in CPU registers and RAM (Data in Use)?",
    "options": [
      "Deploying redundant diesel backup generators in the cloud provider's physical facility.",
      "Configuring a reverse proxy firewall to terminate external TLS connections.",
      "Hardware-enforced Trusted Execution Environments (TEEs, such as AMD SEV-SNP or Intel SGX/TDX) that encrypt memory pages and isolate the enclave from the host hypervisor and root OS.",
      "Symmetric AES-256 disk encryption applied to the server's secondary swap partition."
    ],
    "correct": 2,
    "explanation": "Confidential Computing utilizes CPU-level hardware enclaves (TEEs) with memory encryption (AMD SEV, Intel SGX/TDX), preventing the cloud provider, hypervisor, or root host OS from reading memory during computation."
  },
  {
    "id": "q_m6_147",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 5] Analyzing complex threats under security operations center (soc) architecture, siem & soar automation: A SIEM correlation rule alerts on: 'Windows Event ID 4688 with NewProcessName=powershell.exe and CommandLine containing -EncodedCommand, followed within 120 seconds by an outbound connection on port 4444'. What adversary activity does this rule specifically target?",
    "options": [
      "The operating system synchronizing its internal hardware clock via network NTP.",
      "An obfuscated PowerShell command executing a reverse shell to an adversary Command & Control (C2) listener.",
      "A standard automated Windows Update downloading language translation dictionaries.",
      "A legitimate user clearing their Google Chrome web browser cache history."
    ],
    "correct": 1,
    "explanation": "Adversaries commonly use `-EncodedCommand` (Base64) to hide malicious PowerShell commands from casual inspection, connecting outbound on unprivileged ports (like 4444, Metasploit default) to establish C2 interactive shells."
  },
  {
    "id": "q_m6_148",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 5] Analyzing complex threats under incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): During an active ransomware containment operation, a junior administrator proposes immediately pulling the physical power cord from an infected critical domain controller. Why is this action a severe forensic and operational mistake?",
    "options": [
      "It instantly obliterates volatile RAM containing running adversary processes, injected DLLs, unencrypted network sockets, and potentially the cryptographic decryption keys needed to recover data.",
      "It causes the computer's motherboard to catch fire due to sudden electrical discharge.",
      "It automatically transmits an encrypted copy of all customer files to the dark web.",
      "It permanently destroys the hard drive's magnetic platters, preventing data recovery."
    ],
    "correct": 0,
    "explanation": "Hard powering off destroys live RAM. Investigators isolate the host from the network instead, capturing volatile memory (RAM) first using tools like WinPmem/DumpIt to preserve ephemeral forensic evidence and cryptographic keys."
  },
  {
    "id": "q_m6_149",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 5] Analyzing complex threats under cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Indian CERT-In Cybersecurity Directions of April 2022, what two strict operational mandates were imposed on all corporate entities, intermediaries, and service providers operating in India?",
    "options": [
      "Mandatory deployment of government-authored operating systems, and a complete ban on data encryption.",
      "Reporting all data breaches within 30 days to local police stations, and deleting logs every 24 hours.",
      "Mandatory payment of ransom ransoms through authorized national commercial banks.",
      "Mandatory reporting of cybersecurity incidents within 6 hours of discovery, and mandatory maintenance of secure system logs for a rolling period of 5 years within Indian jurisdiction."
    ],
    "correct": 3,
    "explanation": "CERT-In Directions (2022) established a strict 6-hour incident reporting window for 20 specified cyber event types, alongside a mandatory 5-year log retention requirement synchronized to NPL/NIC NTP."
  },
  {
    "id": "q_m6_150",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 5] Analyzing complex threats under nice workforce framework, red/blue/purple teams & home lab engineering: An aspiring security analyst builds an enterprise home laboratory on a Proxmox hypervisor. Why does professional lab design mandate placing the virtual Active Directory domain controller and victim VMs behind a dedicated virtual firewall (such as pfSense or OPNsense) with host-only virtual networking?",
    "options": [
      "Because pfSense accelerates computer processor clock speeds during malware analysis.",
      "To allow neighbors to freely connect to the Active Directory domain controller.",
      "To establish realistic enterprise network boundaries and prevent malicious exploit payloads or automated worm traffic from escaping into the analyst's home Wi-Fi network and family devices.",
      "Because Windows Server crashes immediately if connected directly to a home consumer router."
    ],
    "correct": 2,
    "explanation": "Host-only virtual switches and virtual firewalls (pfSense) isolate malware testing and active exploits within the virtual lab sandbox, preventing lateral escape or accidental scanning of the physical home network."
  },
  {
    "id": "q_m6_151",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 6] Analyzing complex threats under security controls classification (admin, technical, physical & preventive, detective, corrective): A healthcare facility cannot patch a critical Remote Code Execution vulnerability in a legacy Windows 2008 server controlling a radiological MRI scanner because vendor updates are defunct. The security architect isolates the server into a dedicated VLAN with strict deny-all ACLs, deploys a WAF virtual patch, and enables hyper-sensitive monitoring. Under formal risk frameworks, what is this defensive deployment called?",
    "options": [
      "A Security through Obscurity failure that violates HIPAA physical safeguard rules.",
      "A Compensating Control architecture; it mitigates residual risk to an acceptable threshold without altering the unpatchable root vulnerability.",
      "A Complete Mediation violation; it disables all security inspections to maximize imaging throughput.",
      "An Administrative waiver that completely transfers legal liability to the patient."
    ],
    "correct": 1,
    "explanation": "When a primary control (patching) cannot be achieved due to operational constraints, compensating controls (segmentation, virtual patching, hyper-monitoring) reduce risk to an acceptable level."
  },
  {
    "id": "q_m6_152",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 6] Analyzing complex threats under cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: A mid-sized logistics company begins adopting the Center for Internet Security (CIS) Critical Security Controls v8. As an organization with limited specialized security personnel seeking essential cyber hygiene, which Implementation Group (IG) represents their mandatory starting baseline?",
    "options": [
      "Implementation Group 1 (IG1), consisting of 56 foundational safeguards defining essential cyber hygiene against untargeted attacks.",
      "Implementation Group 3 (IG3), requiring custom zero-day exploit research and automated adversary emulation.",
      "Implementation Group 0 (IG0), which permits maintaining all corporate passwords in an unencrypted shared spreadsheet.",
      "Implementation Group 4 (IG4), requiring nation-state level offensive cyber capabilities."
    ],
    "correct": 0,
    "explanation": "CIS Controls v8 defines IG1 (56 safeguards) as the foundational cyber hygiene baseline that every organization must implement first before advancing to IG2 or IG3."
  },
  {
    "id": "q_m6_153",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 6] Analyzing complex threats under endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: An attacker attempts an LSASS memory dump (MITRE ATT&CK T1003.001) using a custom compiled tool to extract plaintext credentials. A modern EDR agent terminates the process in under 50 milliseconds. Which low-level operating system interface enabled the EDR kernel sensor to intercept this action before credentials were read?",
    "options": [
      "The Windows Print Spooler service, which converts memory reads into PDF spool files.",
      "The BIOS CMOS battery clock, which measures fluctuations in motherboard electrical current.",
      "The web browser's cookie storage cache, which cross-references user session tokens.",
      "Windows Kernel Callbacks (such as ObRegisterCallbacks) and Event Tracing for Windows (ETW-TI), which monitor and filter handle creation to sensitive processes like lsass.exe."
    ],
    "correct": 3,
    "explanation": "Modern EDR agents utilize kernel-level callbacks (ObRegisterCallbacks) and Threat Intelligence ETW (ETW-TI) to intercept attempts by untrusted processes to acquire `PROCESS_VM_READ` handles to LSASS memory."
  },
  {
    "id": "q_m6_154",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 6] Analyzing complex threats under applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: A developer uses AES in Electronic Codebook (ECB) mode to encrypt sensitive customer profile images before uploading them to cloud storage. Why is this implementation a severe cryptographic vulnerability?",
    "options": [
      "ECB mode limits maximum file sizes to exactly 16 bytes, truncating all customer records.",
      "ECB mode requires the use of quantum computers to generate initial initialization vectors.",
      "ECB encrypts identical plaintext blocks into identical ciphertext blocks without diffusion, preserving high-level structural patterns and outlines (the 'ECB Penguin' vulnerability).",
      "ECB mode automatically transmits the secret key in the clear to anyone pinging the server."
    ],
    "correct": 2,
    "explanation": "In ECB mode, each 128-bit plaintext block is encrypted independently. Identical plaintext blocks produce identical ciphertext blocks, leaking structural and visual data patterns."
  },
  {
    "id": "q_m6_155",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 6] Analyzing complex threats under pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: Why does TLS 1.3 mandate Ephemeral Diffie-Hellman (ECDHE) key exchange and completely eliminate static RSA key exchange (RFC 8446)?",
    "options": [
      "Because TLS 1.3 completely eliminates all forms of encryption in favor of cleartext transmission.",
      "To enforce Perfect Forward Secrecy (PFS); with static RSA, an adversary who captures encrypted traffic today can decrypt all historical sessions if they ever compromise the server's private key in the future.",
      "Because static RSA keys can only be generated on hardware manufactured before 1995.",
      "Because Diffie-Hellman keys do not require any mathematical calculations to establish."
    ],
    "correct": 1,
    "explanation": "Under static RSA key exchange, compromising the server's long-term private key enables retroactive decryption of all historically recorded traffic. Ephemeral Diffie-Hellman generates disposable keys per session, guaranteeing Perfect Forward Secrecy."
  },
  {
    "id": "q_m6_156",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 6] Analyzing complex threats under data states: data at rest (envelope encryption), in transit & in use (tees): An enterprise deploys a confidential computing workload handling sensitive biometric data in a multi-tenant public cloud. Which hardware technology ensures data confidentiality and integrity while data is actively being processed in CPU registers and RAM (Data in Use)?",
    "options": [
      "Hardware-enforced Trusted Execution Environments (TEEs, such as AMD SEV-SNP or Intel SGX/TDX) that encrypt memory pages and isolate the enclave from the host hypervisor and root OS.",
      "Symmetric AES-256 disk encryption applied to the server's secondary swap partition.",
      "Deploying redundant diesel backup generators in the cloud provider's physical facility.",
      "Configuring a reverse proxy firewall to terminate external TLS connections."
    ],
    "correct": 0,
    "explanation": "Confidential Computing utilizes CPU-level hardware enclaves (TEEs) with memory encryption (AMD SEV, Intel SGX/TDX), preventing the cloud provider, hypervisor, or root host OS from reading memory during computation."
  },
  {
    "id": "q_m6_157",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 6] Analyzing complex threats under security operations center (soc) architecture, siem & soar automation: A SIEM correlation rule alerts on: 'Windows Event ID 4688 with NewProcessName=powershell.exe and CommandLine containing -EncodedCommand, followed within 120 seconds by an outbound connection on port 4444'. What adversary activity does this rule specifically target?",
    "options": [
      "A standard automated Windows Update downloading language translation dictionaries.",
      "A legitimate user clearing their Google Chrome web browser cache history.",
      "The operating system synchronizing its internal hardware clock via network NTP.",
      "An obfuscated PowerShell command executing a reverse shell to an adversary Command & Control (C2) listener."
    ],
    "correct": 3,
    "explanation": "Adversaries commonly use `-EncodedCommand` (Base64) to hide malicious PowerShell commands from casual inspection, connecting outbound on unprivileged ports (like 4444, Metasploit default) to establish C2 interactive shells."
  },
  {
    "id": "q_m6_158",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 6] Analyzing complex threats under incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): During an active ransomware containment operation, a junior administrator proposes immediately pulling the physical power cord from an infected critical domain controller. Why is this action a severe forensic and operational mistake?",
    "options": [
      "It automatically transmits an encrypted copy of all customer files to the dark web.",
      "It permanently destroys the hard drive's magnetic platters, preventing data recovery.",
      "It instantly obliterates volatile RAM containing running adversary processes, injected DLLs, unencrypted network sockets, and potentially the cryptographic decryption keys needed to recover data.",
      "It causes the computer's motherboard to catch fire due to sudden electrical discharge."
    ],
    "correct": 2,
    "explanation": "Hard powering off destroys live RAM. Investigators isolate the host from the network instead, capturing volatile memory (RAM) first using tools like WinPmem/DumpIt to preserve ephemeral forensic evidence and cryptographic keys."
  },
  {
    "id": "q_m6_159",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 6] Analyzing complex threats under cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Indian CERT-In Cybersecurity Directions of April 2022, what two strict operational mandates were imposed on all corporate entities, intermediaries, and service providers operating in India?",
    "options": [
      "Mandatory payment of ransom ransoms through authorized national commercial banks.",
      "Mandatory reporting of cybersecurity incidents within 6 hours of discovery, and mandatory maintenance of secure system logs for a rolling period of 5 years within Indian jurisdiction.",
      "Mandatory deployment of government-authored operating systems, and a complete ban on data encryption.",
      "Reporting all data breaches within 30 days to local police stations, and deleting logs every 24 hours."
    ],
    "correct": 1,
    "explanation": "CERT-In Directions (2022) established a strict 6-hour incident reporting window for 20 specified cyber event types, alongside a mandatory 5-year log retention requirement synchronized to NPL/NIC NTP."
  },
  {
    "id": "q_m6_160",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 6] Analyzing complex threats under nice workforce framework, red/blue/purple teams & home lab engineering: An aspiring security analyst builds an enterprise home laboratory on a Proxmox hypervisor. Why does professional lab design mandate placing the virtual Active Directory domain controller and victim VMs behind a dedicated virtual firewall (such as pfSense or OPNsense) with host-only virtual networking?",
    "options": [
      "To establish realistic enterprise network boundaries and prevent malicious exploit payloads or automated worm traffic from escaping into the analyst's home Wi-Fi network and family devices.",
      "Because Windows Server crashes immediately if connected directly to a home consumer router.",
      "Because pfSense accelerates computer processor clock speeds during malware analysis.",
      "To allow neighbors to freely connect to the Active Directory domain controller."
    ],
    "correct": 0,
    "explanation": "Host-only virtual switches and virtual firewalls (pfSense) isolate malware testing and active exploits within the virtual lab sandbox, preventing lateral escape or accidental scanning of the physical home network."
  },
  {
    "id": "q_m6_161",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 7] Analyzing complex threats under security controls classification (admin, technical, physical & preventive, detective, corrective): A healthcare facility cannot patch a critical Remote Code Execution vulnerability in a legacy Windows 2008 server controlling a radiological MRI scanner because vendor updates are defunct. The security architect isolates the server into a dedicated VLAN with strict deny-all ACLs, deploys a WAF virtual patch, and enables hyper-sensitive monitoring. Under formal risk frameworks, what is this defensive deployment called?",
    "options": [
      "A Complete Mediation violation; it disables all security inspections to maximize imaging throughput.",
      "An Administrative waiver that completely transfers legal liability to the patient.",
      "A Security through Obscurity failure that violates HIPAA physical safeguard rules.",
      "A Compensating Control architecture; it mitigates residual risk to an acceptable threshold without altering the unpatchable root vulnerability."
    ],
    "correct": 3,
    "explanation": "When a primary control (patching) cannot be achieved due to operational constraints, compensating controls (segmentation, virtual patching, hyper-monitoring) reduce risk to an acceptable level."
  },
  {
    "id": "q_m6_162",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 7] Analyzing complex threats under cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: A mid-sized logistics company begins adopting the Center for Internet Security (CIS) Critical Security Controls v8. As an organization with limited specialized security personnel seeking essential cyber hygiene, which Implementation Group (IG) represents their mandatory starting baseline?",
    "options": [
      "Implementation Group 0 (IG0), which permits maintaining all corporate passwords in an unencrypted shared spreadsheet.",
      "Implementation Group 4 (IG4), requiring nation-state level offensive cyber capabilities.",
      "Implementation Group 1 (IG1), consisting of 56 foundational safeguards defining essential cyber hygiene against untargeted attacks.",
      "Implementation Group 3 (IG3), requiring custom zero-day exploit research and automated adversary emulation."
    ],
    "correct": 2,
    "explanation": "CIS Controls v8 defines IG1 (56 safeguards) as the foundational cyber hygiene baseline that every organization must implement first before advancing to IG2 or IG3."
  },
  {
    "id": "q_m6_163",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 7] Analyzing complex threats under endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: An attacker attempts an LSASS memory dump (MITRE ATT&CK T1003.001) using a custom compiled tool to extract plaintext credentials. A modern EDR agent terminates the process in under 50 milliseconds. Which low-level operating system interface enabled the EDR kernel sensor to intercept this action before credentials were read?",
    "options": [
      "The web browser's cookie storage cache, which cross-references user session tokens.",
      "Windows Kernel Callbacks (such as ObRegisterCallbacks) and Event Tracing for Windows (ETW-TI), which monitor and filter handle creation to sensitive processes like lsass.exe.",
      "The Windows Print Spooler service, which converts memory reads into PDF spool files.",
      "The BIOS CMOS battery clock, which measures fluctuations in motherboard electrical current."
    ],
    "correct": 1,
    "explanation": "Modern EDR agents utilize kernel-level callbacks (ObRegisterCallbacks) and Threat Intelligence ETW (ETW-TI) to intercept attempts by untrusted processes to acquire `PROCESS_VM_READ` handles to LSASS memory."
  },
  {
    "id": "q_m6_164",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 7] Analyzing complex threats under applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: A developer uses AES in Electronic Codebook (ECB) mode to encrypt sensitive customer profile images before uploading them to cloud storage. Why is this implementation a severe cryptographic vulnerability?",
    "options": [
      "ECB encrypts identical plaintext blocks into identical ciphertext blocks without diffusion, preserving high-level structural patterns and outlines (the 'ECB Penguin' vulnerability).",
      "ECB mode automatically transmits the secret key in the clear to anyone pinging the server.",
      "ECB mode limits maximum file sizes to exactly 16 bytes, truncating all customer records.",
      "ECB mode requires the use of quantum computers to generate initial initialization vectors."
    ],
    "correct": 0,
    "explanation": "In ECB mode, each 128-bit plaintext block is encrypted independently. Identical plaintext blocks produce identical ciphertext blocks, leaking structural and visual data patterns."
  },
  {
    "id": "q_m6_165",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 7] Analyzing complex threats under pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: Why does TLS 1.3 mandate Ephemeral Diffie-Hellman (ECDHE) key exchange and completely eliminate static RSA key exchange (RFC 8446)?",
    "options": [
      "Because static RSA keys can only be generated on hardware manufactured before 1995.",
      "Because Diffie-Hellman keys do not require any mathematical calculations to establish.",
      "Because TLS 1.3 completely eliminates all forms of encryption in favor of cleartext transmission.",
      "To enforce Perfect Forward Secrecy (PFS); with static RSA, an adversary who captures encrypted traffic today can decrypt all historical sessions if they ever compromise the server's private key in the future."
    ],
    "correct": 3,
    "explanation": "Under static RSA key exchange, compromising the server's long-term private key enables retroactive decryption of all historically recorded traffic. Ephemeral Diffie-Hellman generates disposable keys per session, guaranteeing Perfect Forward Secrecy."
  },
  {
    "id": "q_m6_166",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 7] Analyzing complex threats under data states: data at rest (envelope encryption), in transit & in use (tees): An enterprise deploys a confidential computing workload handling sensitive biometric data in a multi-tenant public cloud. Which hardware technology ensures data confidentiality and integrity while data is actively being processed in CPU registers and RAM (Data in Use)?",
    "options": [
      "Deploying redundant diesel backup generators in the cloud provider's physical facility.",
      "Configuring a reverse proxy firewall to terminate external TLS connections.",
      "Hardware-enforced Trusted Execution Environments (TEEs, such as AMD SEV-SNP or Intel SGX/TDX) that encrypt memory pages and isolate the enclave from the host hypervisor and root OS.",
      "Symmetric AES-256 disk encryption applied to the server's secondary swap partition."
    ],
    "correct": 2,
    "explanation": "Confidential Computing utilizes CPU-level hardware enclaves (TEEs) with memory encryption (AMD SEV, Intel SGX/TDX), preventing the cloud provider, hypervisor, or root host OS from reading memory during computation."
  },
  {
    "id": "q_m6_167",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 7] Analyzing complex threats under security operations center (soc) architecture, siem & soar automation: A SIEM correlation rule alerts on: 'Windows Event ID 4688 with NewProcessName=powershell.exe and CommandLine containing -EncodedCommand, followed within 120 seconds by an outbound connection on port 4444'. What adversary activity does this rule specifically target?",
    "options": [
      "The operating system synchronizing its internal hardware clock via network NTP.",
      "An obfuscated PowerShell command executing a reverse shell to an adversary Command & Control (C2) listener.",
      "A standard automated Windows Update downloading language translation dictionaries.",
      "A legitimate user clearing their Google Chrome web browser cache history."
    ],
    "correct": 1,
    "explanation": "Adversaries commonly use `-EncodedCommand` (Base64) to hide malicious PowerShell commands from casual inspection, connecting outbound on unprivileged ports (like 4444, Metasploit default) to establish C2 interactive shells."
  },
  {
    "id": "q_m6_168",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 7] Analyzing complex threats under incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): During an active ransomware containment operation, a junior administrator proposes immediately pulling the physical power cord from an infected critical domain controller. Why is this action a severe forensic and operational mistake?",
    "options": [
      "It instantly obliterates volatile RAM containing running adversary processes, injected DLLs, unencrypted network sockets, and potentially the cryptographic decryption keys needed to recover data.",
      "It causes the computer's motherboard to catch fire due to sudden electrical discharge.",
      "It automatically transmits an encrypted copy of all customer files to the dark web.",
      "It permanently destroys the hard drive's magnetic platters, preventing data recovery."
    ],
    "correct": 0,
    "explanation": "Hard powering off destroys live RAM. Investigators isolate the host from the network instead, capturing volatile memory (RAM) first using tools like WinPmem/DumpIt to preserve ephemeral forensic evidence and cryptographic keys."
  },
  {
    "id": "q_m6_169",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 7] Analyzing complex threats under cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Indian CERT-In Cybersecurity Directions of April 2022, what two strict operational mandates were imposed on all corporate entities, intermediaries, and service providers operating in India?",
    "options": [
      "Mandatory deployment of government-authored operating systems, and a complete ban on data encryption.",
      "Reporting all data breaches within 30 days to local police stations, and deleting logs every 24 hours.",
      "Mandatory payment of ransom ransoms through authorized national commercial banks.",
      "Mandatory reporting of cybersecurity incidents within 6 hours of discovery, and mandatory maintenance of secure system logs for a rolling period of 5 years within Indian jurisdiction."
    ],
    "correct": 3,
    "explanation": "CERT-In Directions (2022) established a strict 6-hour incident reporting window for 20 specified cyber event types, alongside a mandatory 5-year log retention requirement synchronized to NPL/NIC NTP."
  },
  {
    "id": "q_m6_170",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 7] Analyzing complex threats under nice workforce framework, red/blue/purple teams & home lab engineering: An aspiring security analyst builds an enterprise home laboratory on a Proxmox hypervisor. Why does professional lab design mandate placing the virtual Active Directory domain controller and victim VMs behind a dedicated virtual firewall (such as pfSense or OPNsense) with host-only virtual networking?",
    "options": [
      "Because pfSense accelerates computer processor clock speeds during malware analysis.",
      "To allow neighbors to freely connect to the Active Directory domain controller.",
      "To establish realistic enterprise network boundaries and prevent malicious exploit payloads or automated worm traffic from escaping into the analyst's home Wi-Fi network and family devices.",
      "Because Windows Server crashes immediately if connected directly to a home consumer router."
    ],
    "correct": 2,
    "explanation": "Host-only virtual switches and virtual firewalls (pfSense) isolate malware testing and active exploits within the virtual lab sandbox, preventing lateral escape or accidental scanning of the physical home network."
  },
  {
    "id": "q_m6_171",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 8] Analyzing complex threats under security controls classification (admin, technical, physical & preventive, detective, corrective): A healthcare facility cannot patch a critical Remote Code Execution vulnerability in a legacy Windows 2008 server controlling a radiological MRI scanner because vendor updates are defunct. The security architect isolates the server into a dedicated VLAN with strict deny-all ACLs, deploys a WAF virtual patch, and enables hyper-sensitive monitoring. Under formal risk frameworks, what is this defensive deployment called?",
    "options": [
      "A Security through Obscurity failure that violates HIPAA physical safeguard rules.",
      "A Compensating Control architecture; it mitigates residual risk to an acceptable threshold without altering the unpatchable root vulnerability.",
      "A Complete Mediation violation; it disables all security inspections to maximize imaging throughput.",
      "An Administrative waiver that completely transfers legal liability to the patient."
    ],
    "correct": 1,
    "explanation": "When a primary control (patching) cannot be achieved due to operational constraints, compensating controls (segmentation, virtual patching, hyper-monitoring) reduce risk to an acceptable level."
  },
  {
    "id": "q_m6_172",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 8] Analyzing complex threats under cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: A mid-sized logistics company begins adopting the Center for Internet Security (CIS) Critical Security Controls v8. As an organization with limited specialized security personnel seeking essential cyber hygiene, which Implementation Group (IG) represents their mandatory starting baseline?",
    "options": [
      "Implementation Group 1 (IG1), consisting of 56 foundational safeguards defining essential cyber hygiene against untargeted attacks.",
      "Implementation Group 3 (IG3), requiring custom zero-day exploit research and automated adversary emulation.",
      "Implementation Group 0 (IG0), which permits maintaining all corporate passwords in an unencrypted shared spreadsheet.",
      "Implementation Group 4 (IG4), requiring nation-state level offensive cyber capabilities."
    ],
    "correct": 0,
    "explanation": "CIS Controls v8 defines IG1 (56 safeguards) as the foundational cyber hygiene baseline that every organization must implement first before advancing to IG2 or IG3."
  },
  {
    "id": "q_m6_173",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 8] Analyzing complex threats under endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: An attacker attempts an LSASS memory dump (MITRE ATT&CK T1003.001) using a custom compiled tool to extract plaintext credentials. A modern EDR agent terminates the process in under 50 milliseconds. Which low-level operating system interface enabled the EDR kernel sensor to intercept this action before credentials were read?",
    "options": [
      "The Windows Print Spooler service, which converts memory reads into PDF spool files.",
      "The BIOS CMOS battery clock, which measures fluctuations in motherboard electrical current.",
      "The web browser's cookie storage cache, which cross-references user session tokens.",
      "Windows Kernel Callbacks (such as ObRegisterCallbacks) and Event Tracing for Windows (ETW-TI), which monitor and filter handle creation to sensitive processes like lsass.exe."
    ],
    "correct": 3,
    "explanation": "Modern EDR agents utilize kernel-level callbacks (ObRegisterCallbacks) and Threat Intelligence ETW (ETW-TI) to intercept attempts by untrusted processes to acquire `PROCESS_VM_READ` handles to LSASS memory."
  },
  {
    "id": "q_m6_174",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 8] Analyzing complex threats under applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: A developer uses AES in Electronic Codebook (ECB) mode to encrypt sensitive customer profile images before uploading them to cloud storage. Why is this implementation a severe cryptographic vulnerability?",
    "options": [
      "ECB mode limits maximum file sizes to exactly 16 bytes, truncating all customer records.",
      "ECB mode requires the use of quantum computers to generate initial initialization vectors.",
      "ECB encrypts identical plaintext blocks into identical ciphertext blocks without diffusion, preserving high-level structural patterns and outlines (the 'ECB Penguin' vulnerability).",
      "ECB mode automatically transmits the secret key in the clear to anyone pinging the server."
    ],
    "correct": 2,
    "explanation": "In ECB mode, each 128-bit plaintext block is encrypted independently. Identical plaintext blocks produce identical ciphertext blocks, leaking structural and visual data patterns."
  },
  {
    "id": "q_m6_175",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 8] Analyzing complex threats under pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: Why does TLS 1.3 mandate Ephemeral Diffie-Hellman (ECDHE) key exchange and completely eliminate static RSA key exchange (RFC 8446)?",
    "options": [
      "Because TLS 1.3 completely eliminates all forms of encryption in favor of cleartext transmission.",
      "To enforce Perfect Forward Secrecy (PFS); with static RSA, an adversary who captures encrypted traffic today can decrypt all historical sessions if they ever compromise the server's private key in the future.",
      "Because static RSA keys can only be generated on hardware manufactured before 1995.",
      "Because Diffie-Hellman keys do not require any mathematical calculations to establish."
    ],
    "correct": 1,
    "explanation": "Under static RSA key exchange, compromising the server's long-term private key enables retroactive decryption of all historically recorded traffic. Ephemeral Diffie-Hellman generates disposable keys per session, guaranteeing Perfect Forward Secrecy."
  },
  {
    "id": "q_m6_176",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 8] Analyzing complex threats under data states: data at rest (envelope encryption), in transit & in use (tees): An enterprise deploys a confidential computing workload handling sensitive biometric data in a multi-tenant public cloud. Which hardware technology ensures data confidentiality and integrity while data is actively being processed in CPU registers and RAM (Data in Use)?",
    "options": [
      "Hardware-enforced Trusted Execution Environments (TEEs, such as AMD SEV-SNP or Intel SGX/TDX) that encrypt memory pages and isolate the enclave from the host hypervisor and root OS.",
      "Symmetric AES-256 disk encryption applied to the server's secondary swap partition.",
      "Deploying redundant diesel backup generators in the cloud provider's physical facility.",
      "Configuring a reverse proxy firewall to terminate external TLS connections."
    ],
    "correct": 0,
    "explanation": "Confidential Computing utilizes CPU-level hardware enclaves (TEEs) with memory encryption (AMD SEV, Intel SGX/TDX), preventing the cloud provider, hypervisor, or root host OS from reading memory during computation."
  },
  {
    "id": "q_m6_177",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 8] Analyzing complex threats under security operations center (soc) architecture, siem & soar automation: A SIEM correlation rule alerts on: 'Windows Event ID 4688 with NewProcessName=powershell.exe and CommandLine containing -EncodedCommand, followed within 120 seconds by an outbound connection on port 4444'. What adversary activity does this rule specifically target?",
    "options": [
      "A standard automated Windows Update downloading language translation dictionaries.",
      "A legitimate user clearing their Google Chrome web browser cache history.",
      "The operating system synchronizing its internal hardware clock via network NTP.",
      "An obfuscated PowerShell command executing a reverse shell to an adversary Command & Control (C2) listener."
    ],
    "correct": 3,
    "explanation": "Adversaries commonly use `-EncodedCommand` (Base64) to hide malicious PowerShell commands from casual inspection, connecting outbound on unprivileged ports (like 4444, Metasploit default) to establish C2 interactive shells."
  },
  {
    "id": "q_m6_178",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 8] Analyzing complex threats under incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): During an active ransomware containment operation, a junior administrator proposes immediately pulling the physical power cord from an infected critical domain controller. Why is this action a severe forensic and operational mistake?",
    "options": [
      "It automatically transmits an encrypted copy of all customer files to the dark web.",
      "It permanently destroys the hard drive's magnetic platters, preventing data recovery.",
      "It instantly obliterates volatile RAM containing running adversary processes, injected DLLs, unencrypted network sockets, and potentially the cryptographic decryption keys needed to recover data.",
      "It causes the computer's motherboard to catch fire due to sudden electrical discharge."
    ],
    "correct": 2,
    "explanation": "Hard powering off destroys live RAM. Investigators isolate the host from the network instead, capturing volatile memory (RAM) first using tools like WinPmem/DumpIt to preserve ephemeral forensic evidence and cryptographic keys."
  },
  {
    "id": "q_m6_179",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 8] Analyzing complex threats under cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Indian CERT-In Cybersecurity Directions of April 2022, what two strict operational mandates were imposed on all corporate entities, intermediaries, and service providers operating in India?",
    "options": [
      "Mandatory payment of ransom ransoms through authorized national commercial banks.",
      "Mandatory reporting of cybersecurity incidents within 6 hours of discovery, and mandatory maintenance of secure system logs for a rolling period of 5 years within Indian jurisdiction.",
      "Mandatory deployment of government-authored operating systems, and a complete ban on data encryption.",
      "Reporting all data breaches within 30 days to local police stations, and deleting logs every 24 hours."
    ],
    "correct": 1,
    "explanation": "CERT-In Directions (2022) established a strict 6-hour incident reporting window for 20 specified cyber event types, alongside a mandatory 5-year log retention requirement synchronized to NPL/NIC NTP."
  },
  {
    "id": "q_m6_180",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 8] Analyzing complex threats under nice workforce framework, red/blue/purple teams & home lab engineering: An aspiring security analyst builds an enterprise home laboratory on a Proxmox hypervisor. Why does professional lab design mandate placing the virtual Active Directory domain controller and victim VMs behind a dedicated virtual firewall (such as pfSense or OPNsense) with host-only virtual networking?",
    "options": [
      "To establish realistic enterprise network boundaries and prevent malicious exploit payloads or automated worm traffic from escaping into the analyst's home Wi-Fi network and family devices.",
      "Because Windows Server crashes immediately if connected directly to a home consumer router.",
      "Because pfSense accelerates computer processor clock speeds during malware analysis.",
      "To allow neighbors to freely connect to the Active Directory domain controller."
    ],
    "correct": 0,
    "explanation": "Host-only virtual switches and virtual firewalls (pfSense) isolate malware testing and active exploits within the virtual lab sandbox, preventing lateral escape or accidental scanning of the physical home network."
  },
  {
    "id": "q_m6_181",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 9] Analyzing complex threats under security controls classification (admin, technical, physical & preventive, detective, corrective): A healthcare facility cannot patch a critical Remote Code Execution vulnerability in a legacy Windows 2008 server controlling a radiological MRI scanner because vendor updates are defunct. The security architect isolates the server into a dedicated VLAN with strict deny-all ACLs, deploys a WAF virtual patch, and enables hyper-sensitive monitoring. Under formal risk frameworks, what is this defensive deployment called?",
    "options": [
      "A Complete Mediation violation; it disables all security inspections to maximize imaging throughput.",
      "An Administrative waiver that completely transfers legal liability to the patient.",
      "A Security through Obscurity failure that violates HIPAA physical safeguard rules.",
      "A Compensating Control architecture; it mitigates residual risk to an acceptable threshold without altering the unpatchable root vulnerability."
    ],
    "correct": 3,
    "explanation": "When a primary control (patching) cannot be achieved due to operational constraints, compensating controls (segmentation, virtual patching, hyper-monitoring) reduce risk to an acceptable level."
  },
  {
    "id": "q_m6_182",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 9] Analyzing complex threats under cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: A mid-sized logistics company begins adopting the Center for Internet Security (CIS) Critical Security Controls v8. As an organization with limited specialized security personnel seeking essential cyber hygiene, which Implementation Group (IG) represents their mandatory starting baseline?",
    "options": [
      "Implementation Group 0 (IG0), which permits maintaining all corporate passwords in an unencrypted shared spreadsheet.",
      "Implementation Group 4 (IG4), requiring nation-state level offensive cyber capabilities.",
      "Implementation Group 1 (IG1), consisting of 56 foundational safeguards defining essential cyber hygiene against untargeted attacks.",
      "Implementation Group 3 (IG3), requiring custom zero-day exploit research and automated adversary emulation."
    ],
    "correct": 2,
    "explanation": "CIS Controls v8 defines IG1 (56 safeguards) as the foundational cyber hygiene baseline that every organization must implement first before advancing to IG2 or IG3."
  },
  {
    "id": "q_m6_183",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 9] Analyzing complex threats under endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: An attacker attempts an LSASS memory dump (MITRE ATT&CK T1003.001) using a custom compiled tool to extract plaintext credentials. A modern EDR agent terminates the process in under 50 milliseconds. Which low-level operating system interface enabled the EDR kernel sensor to intercept this action before credentials were read?",
    "options": [
      "The web browser's cookie storage cache, which cross-references user session tokens.",
      "Windows Kernel Callbacks (such as ObRegisterCallbacks) and Event Tracing for Windows (ETW-TI), which monitor and filter handle creation to sensitive processes like lsass.exe.",
      "The Windows Print Spooler service, which converts memory reads into PDF spool files.",
      "The BIOS CMOS battery clock, which measures fluctuations in motherboard electrical current."
    ],
    "correct": 1,
    "explanation": "Modern EDR agents utilize kernel-level callbacks (ObRegisterCallbacks) and Threat Intelligence ETW (ETW-TI) to intercept attempts by untrusted processes to acquire `PROCESS_VM_READ` handles to LSASS memory."
  },
  {
    "id": "q_m6_184",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 9] Analyzing complex threats under applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: A developer uses AES in Electronic Codebook (ECB) mode to encrypt sensitive customer profile images before uploading them to cloud storage. Why is this implementation a severe cryptographic vulnerability?",
    "options": [
      "ECB encrypts identical plaintext blocks into identical ciphertext blocks without diffusion, preserving high-level structural patterns and outlines (the 'ECB Penguin' vulnerability).",
      "ECB mode automatically transmits the secret key in the clear to anyone pinging the server.",
      "ECB mode limits maximum file sizes to exactly 16 bytes, truncating all customer records.",
      "ECB mode requires the use of quantum computers to generate initial initialization vectors."
    ],
    "correct": 0,
    "explanation": "In ECB mode, each 128-bit plaintext block is encrypted independently. Identical plaintext blocks produce identical ciphertext blocks, leaking structural and visual data patterns."
  },
  {
    "id": "q_m6_185",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 9] Analyzing complex threats under pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: Why does TLS 1.3 mandate Ephemeral Diffie-Hellman (ECDHE) key exchange and completely eliminate static RSA key exchange (RFC 8446)?",
    "options": [
      "Because static RSA keys can only be generated on hardware manufactured before 1995.",
      "Because Diffie-Hellman keys do not require any mathematical calculations to establish.",
      "Because TLS 1.3 completely eliminates all forms of encryption in favor of cleartext transmission.",
      "To enforce Perfect Forward Secrecy (PFS); with static RSA, an adversary who captures encrypted traffic today can decrypt all historical sessions if they ever compromise the server's private key in the future."
    ],
    "correct": 3,
    "explanation": "Under static RSA key exchange, compromising the server's long-term private key enables retroactive decryption of all historically recorded traffic. Ephemeral Diffie-Hellman generates disposable keys per session, guaranteeing Perfect Forward Secrecy."
  },
  {
    "id": "q_m6_186",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 9] Analyzing complex threats under data states: data at rest (envelope encryption), in transit & in use (tees): An enterprise deploys a confidential computing workload handling sensitive biometric data in a multi-tenant public cloud. Which hardware technology ensures data confidentiality and integrity while data is actively being processed in CPU registers and RAM (Data in Use)?",
    "options": [
      "Deploying redundant diesel backup generators in the cloud provider's physical facility.",
      "Configuring a reverse proxy firewall to terminate external TLS connections.",
      "Hardware-enforced Trusted Execution Environments (TEEs, such as AMD SEV-SNP or Intel SGX/TDX) that encrypt memory pages and isolate the enclave from the host hypervisor and root OS.",
      "Symmetric AES-256 disk encryption applied to the server's secondary swap partition."
    ],
    "correct": 2,
    "explanation": "Confidential Computing utilizes CPU-level hardware enclaves (TEEs) with memory encryption (AMD SEV, Intel SGX/TDX), preventing the cloud provider, hypervisor, or root host OS from reading memory during computation."
  },
  {
    "id": "q_m6_187",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 9] Analyzing complex threats under security operations center (soc) architecture, siem & soar automation: A SIEM correlation rule alerts on: 'Windows Event ID 4688 with NewProcessName=powershell.exe and CommandLine containing -EncodedCommand, followed within 120 seconds by an outbound connection on port 4444'. What adversary activity does this rule specifically target?",
    "options": [
      "The operating system synchronizing its internal hardware clock via network NTP.",
      "An obfuscated PowerShell command executing a reverse shell to an adversary Command & Control (C2) listener.",
      "A standard automated Windows Update downloading language translation dictionaries.",
      "A legitimate user clearing their Google Chrome web browser cache history."
    ],
    "correct": 1,
    "explanation": "Adversaries commonly use `-EncodedCommand` (Base64) to hide malicious PowerShell commands from casual inspection, connecting outbound on unprivileged ports (like 4444, Metasploit default) to establish C2 interactive shells."
  },
  {
    "id": "q_m6_188",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 9] Analyzing complex threats under incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): During an active ransomware containment operation, a junior administrator proposes immediately pulling the physical power cord from an infected critical domain controller. Why is this action a severe forensic and operational mistake?",
    "options": [
      "It instantly obliterates volatile RAM containing running adversary processes, injected DLLs, unencrypted network sockets, and potentially the cryptographic decryption keys needed to recover data.",
      "It causes the computer's motherboard to catch fire due to sudden electrical discharge.",
      "It automatically transmits an encrypted copy of all customer files to the dark web.",
      "It permanently destroys the hard drive's magnetic platters, preventing data recovery."
    ],
    "correct": 0,
    "explanation": "Hard powering off destroys live RAM. Investigators isolate the host from the network instead, capturing volatile memory (RAM) first using tools like WinPmem/DumpIt to preserve ephemeral forensic evidence and cryptographic keys."
  },
  {
    "id": "q_m6_189",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 9] Analyzing complex threats under cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Indian CERT-In Cybersecurity Directions of April 2022, what two strict operational mandates were imposed on all corporate entities, intermediaries, and service providers operating in India?",
    "options": [
      "Mandatory deployment of government-authored operating systems, and a complete ban on data encryption.",
      "Reporting all data breaches within 30 days to local police stations, and deleting logs every 24 hours.",
      "Mandatory payment of ransom ransoms through authorized national commercial banks.",
      "Mandatory reporting of cybersecurity incidents within 6 hours of discovery, and mandatory maintenance of secure system logs for a rolling period of 5 years within Indian jurisdiction."
    ],
    "correct": 3,
    "explanation": "CERT-In Directions (2022) established a strict 6-hour incident reporting window for 20 specified cyber event types, alongside a mandatory 5-year log retention requirement synchronized to NPL/NIC NTP."
  },
  {
    "id": "q_m6_190",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 9] Analyzing complex threats under nice workforce framework, red/blue/purple teams & home lab engineering: An aspiring security analyst builds an enterprise home laboratory on a Proxmox hypervisor. Why does professional lab design mandate placing the virtual Active Directory domain controller and victim VMs behind a dedicated virtual firewall (such as pfSense or OPNsense) with host-only virtual networking?",
    "options": [
      "Because pfSense accelerates computer processor clock speeds during malware analysis.",
      "To allow neighbors to freely connect to the Active Directory domain controller.",
      "To establish realistic enterprise network boundaries and prevent malicious exploit payloads or automated worm traffic from escaping into the analyst's home Wi-Fi network and family devices.",
      "Because Windows Server crashes immediately if connected directly to a home consumer router."
    ],
    "correct": 2,
    "explanation": "Host-only virtual switches and virtual firewalls (pfSense) isolate malware testing and active exploits within the virtual lab sandbox, preventing lateral escape or accidental scanning of the physical home network."
  },
  {
    "id": "q_m6_191",
    "topic": "Security Controls Classification (Admin, Technical, Physical & Preventive, Detective, Corrective)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 10] Analyzing complex threats under security controls classification (admin, technical, physical & preventive, detective, corrective): A healthcare facility cannot patch a critical Remote Code Execution vulnerability in a legacy Windows 2008 server controlling a radiological MRI scanner because vendor updates are defunct. The security architect isolates the server into a dedicated VLAN with strict deny-all ACLs, deploys a WAF virtual patch, and enables hyper-sensitive monitoring. Under formal risk frameworks, what is this defensive deployment called?",
    "options": [
      "A Security through Obscurity failure that violates HIPAA physical safeguard rules.",
      "A Compensating Control architecture; it mitigates residual risk to an acceptable threshold without altering the unpatchable root vulnerability.",
      "A Complete Mediation violation; it disables all security inspections to maximize imaging throughput.",
      "An Administrative waiver that completely transfers legal liability to the patient."
    ],
    "correct": 1,
    "explanation": "When a primary control (patching) cannot be achieved due to operational constraints, compensating controls (segmentation, virtual patching, hyper-monitoring) reduce risk to an acceptable level."
  },
  {
    "id": "q_m6_192",
    "topic": "CIS Controls v8 & NIST Cybersecurity Framework (CSF 2.0) Architecture",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 10] Analyzing complex threats under cis controls v8 & nist cybersecurity framework (csf 2.0) architecture: A mid-sized logistics company begins adopting the Center for Internet Security (CIS) Critical Security Controls v8. As an organization with limited specialized security personnel seeking essential cyber hygiene, which Implementation Group (IG) represents their mandatory starting baseline?",
    "options": [
      "Implementation Group 1 (IG1), consisting of 56 foundational safeguards defining essential cyber hygiene against untargeted attacks.",
      "Implementation Group 3 (IG3), requiring custom zero-day exploit research and automated adversary emulation.",
      "Implementation Group 0 (IG0), which permits maintaining all corporate passwords in an unencrypted shared spreadsheet.",
      "Implementation Group 4 (IG4), requiring nation-state level offensive cyber capabilities."
    ],
    "correct": 0,
    "explanation": "CIS Controls v8 defines IG1 (56 safeguards) as the foundational cyber hygiene baseline that every organization must implement first before advancing to IG2 or IG3."
  },
  {
    "id": "q_m6_193",
    "topic": "Endpoint Protection Evolution: AV to NGAV to EDR to XDR & Kernel Telemetry",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 10] Analyzing complex threats under endpoint protection evolution: av to ngav to edr to xdr & kernel telemetry: An attacker attempts an LSASS memory dump (MITRE ATT&CK T1003.001) using a custom compiled tool to extract plaintext credentials. A modern EDR agent terminates the process in under 50 milliseconds. Which low-level operating system interface enabled the EDR kernel sensor to intercept this action before credentials were read?",
    "options": [
      "The Windows Print Spooler service, which converts memory reads into PDF spool files.",
      "The BIOS CMOS battery clock, which measures fluctuations in motherboard electrical current.",
      "The web browser's cookie storage cache, which cross-references user session tokens.",
      "Windows Kernel Callbacks (such as ObRegisterCallbacks) and Event Tracing for Windows (ETW-TI), which monitor and filter handle creation to sensitive processes like lsass.exe."
    ],
    "correct": 3,
    "explanation": "Modern EDR agents utilize kernel-level callbacks (ObRegisterCallbacks) and Threat Intelligence ETW (ETW-TI) to intercept attempts by untrusted processes to acquire `PROCESS_VM_READ` handles to LSASS memory."
  },
  {
    "id": "q_m6_194",
    "topic": "Applied Cryptography: Symmetric AES, Asymmetric ECC & Hybrid Cryptosystems",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 10] Analyzing complex threats under applied cryptography: symmetric aes, asymmetric ecc & hybrid cryptosystems: A developer uses AES in Electronic Codebook (ECB) mode to encrypt sensitive customer profile images before uploading them to cloud storage. Why is this implementation a severe cryptographic vulnerability?",
    "options": [
      "ECB mode limits maximum file sizes to exactly 16 bytes, truncating all customer records.",
      "ECB mode requires the use of quantum computers to generate initial initialization vectors.",
      "ECB encrypts identical plaintext blocks into identical ciphertext blocks without diffusion, preserving high-level structural patterns and outlines (the 'ECB Penguin' vulnerability).",
      "ECB mode automatically transmits the secret key in the clear to anyone pinging the server."
    ],
    "correct": 2,
    "explanation": "In ECB mode, each 128-bit plaintext block is encrypted independently. Identical plaintext blocks produce identical ciphertext blocks, leaking structural and visual data patterns."
  },
  {
    "id": "q_m6_195",
    "topic": "PKI, Digital Certificates (X.509) & TLS 1.3 Perfect Forward Secrecy",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 10] Analyzing complex threats under pki, digital certificates (x.509) & tls 1.3 perfect forward secrecy: Why does TLS 1.3 mandate Ephemeral Diffie-Hellman (ECDHE) key exchange and completely eliminate static RSA key exchange (RFC 8446)?",
    "options": [
      "Because TLS 1.3 completely eliminates all forms of encryption in favor of cleartext transmission.",
      "To enforce Perfect Forward Secrecy (PFS); with static RSA, an adversary who captures encrypted traffic today can decrypt all historical sessions if they ever compromise the server's private key in the future.",
      "Because static RSA keys can only be generated on hardware manufactured before 1995.",
      "Because Diffie-Hellman keys do not require any mathematical calculations to establish."
    ],
    "correct": 1,
    "explanation": "Under static RSA key exchange, compromising the server's long-term private key enables retroactive decryption of all historically recorded traffic. Ephemeral Diffie-Hellman generates disposable keys per session, guaranteeing Perfect Forward Secrecy."
  },
  {
    "id": "q_m6_196",
    "topic": "Data States: Data at Rest (Envelope Encryption), In Transit & In Use (TEEs)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 10] Analyzing complex threats under data states: data at rest (envelope encryption), in transit & in use (tees): An enterprise deploys a confidential computing workload handling sensitive biometric data in a multi-tenant public cloud. Which hardware technology ensures data confidentiality and integrity while data is actively being processed in CPU registers and RAM (Data in Use)?",
    "options": [
      "Hardware-enforced Trusted Execution Environments (TEEs, such as AMD SEV-SNP or Intel SGX/TDX) that encrypt memory pages and isolate the enclave from the host hypervisor and root OS.",
      "Symmetric AES-256 disk encryption applied to the server's secondary swap partition.",
      "Deploying redundant diesel backup generators in the cloud provider's physical facility.",
      "Configuring a reverse proxy firewall to terminate external TLS connections."
    ],
    "correct": 0,
    "explanation": "Confidential Computing utilizes CPU-level hardware enclaves (TEEs) with memory encryption (AMD SEV, Intel SGX/TDX), preventing the cloud provider, hypervisor, or root host OS from reading memory during computation."
  },
  {
    "id": "q_m6_197",
    "topic": "Security Operations Center (SOC) Architecture, SIEM & SOAR Automation",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 10] Analyzing complex threats under security operations center (soc) architecture, siem & soar automation: A SIEM correlation rule alerts on: 'Windows Event ID 4688 with NewProcessName=powershell.exe and CommandLine containing -EncodedCommand, followed within 120 seconds by an outbound connection on port 4444'. What adversary activity does this rule specifically target?",
    "options": [
      "A standard automated Windows Update downloading language translation dictionaries.",
      "A legitimate user clearing their Google Chrome web browser cache history.",
      "The operating system synchronizing its internal hardware clock via network NTP.",
      "An obfuscated PowerShell command executing a reverse shell to an adversary Command & Control (C2) listener."
    ],
    "correct": 3,
    "explanation": "Adversaries commonly use `-EncodedCommand` (Base64) to hide malicious PowerShell commands from casual inspection, connecting outbound on unprivileged ports (like 4444, Metasploit default) to establish C2 interactive shells."
  },
  {
    "id": "q_m6_198",
    "topic": "Incident Response Lifecycles (NIST SP 800-61 vs SANS) & Forensics Volatility (RFC 3227)",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 10] Analyzing complex threats under incident response lifecycles (nist sp 800-61 vs sans) & forensics volatility (rfc 3227): During an active ransomware containment operation, a junior administrator proposes immediately pulling the physical power cord from an infected critical domain controller. Why is this action a severe forensic and operational mistake?",
    "options": [
      "It automatically transmits an encrypted copy of all customer files to the dark web.",
      "It permanently destroys the hard drive's magnetic platters, preventing data recovery.",
      "It instantly obliterates volatile RAM containing running adversary processes, injected DLLs, unencrypted network sockets, and potentially the cryptographic decryption keys needed to recover data.",
      "It causes the computer's motherboard to catch fire due to sudden electrical discharge."
    ],
    "correct": 2,
    "explanation": "Hard powering off destroys live RAM. Investigators isolate the host from the network instead, capturing volatile memory (RAM) first using tools like WinPmem/DumpIt to preserve ephemeral forensic evidence and cryptographic keys."
  },
  {
    "id": "q_m6_199",
    "topic": "Cyber Law & Compliance: IT Act 2000 (Sec 43/66/70), DPDP Act 2023 & CERT-In 6-Hour Mandate",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 10] Analyzing complex threats under cyber law & compliance: it act 2000 (sec 43/66/70), dpdp act 2023 & cert-in 6-hour mandate: Under the Indian CERT-In Cybersecurity Directions of April 2022, what two strict operational mandates were imposed on all corporate entities, intermediaries, and service providers operating in India?",
    "options": [
      "Mandatory payment of ransom ransoms through authorized national commercial banks.",
      "Mandatory reporting of cybersecurity incidents within 6 hours of discovery, and mandatory maintenance of secure system logs for a rolling period of 5 years within Indian jurisdiction.",
      "Mandatory deployment of government-authored operating systems, and a complete ban on data encryption.",
      "Reporting all data breaches within 30 days to local police stations, and deleting logs every 24 hours."
    ],
    "correct": 1,
    "explanation": "CERT-In Directions (2022) established a strict 6-hour incident reporting window for 20 specified cyber event types, alongside a mandatory 5-year log retention requirement synchronized to NPL/NIC NTP."
  },
  {
    "id": "q_m6_200",
    "topic": "NICE Workforce Framework, Red/Blue/Purple Teams & Home Lab Engineering",
    "difficulty": "difficult",
    "q": "[Advanced Operations & Incident Forensic Case 10] Analyzing complex threats under nice workforce framework, red/blue/purple teams & home lab engineering: An aspiring security analyst builds an enterprise home laboratory on a Proxmox hypervisor. Why does professional lab design mandate placing the virtual Active Directory domain controller and victim VMs behind a dedicated virtual firewall (such as pfSense or OPNsense) with host-only virtual networking?",
    "options": [
      "To establish realistic enterprise network boundaries and prevent malicious exploit payloads or automated worm traffic from escaping into the analyst's home Wi-Fi network and family devices.",
      "Because Windows Server crashes immediately if connected directly to a home consumer router.",
      "Because pfSense accelerates computer processor clock speeds during malware analysis.",
      "To allow neighbors to freely connect to the Active Directory domain controller."
    ],
    "correct": 0,
    "explanation": "Host-only virtual switches and virtual firewalls (pfSense) isolate malware testing and active exploits within the virtual lab sandbox, preventing lateral escape or accidental scanning of the physical home network."
  }
];
