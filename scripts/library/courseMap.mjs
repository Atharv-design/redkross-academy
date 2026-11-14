/**
 * Library course number -> academy identifiers. Course numbers 01-04 are already
 * hand-built in src/services/db and are NOT imported (their richer versions stay).
 * IDs are permanent once students enrol: never rename an existing entry.
 */
export const LIBRARY_COURSE_MAP = {
  5: { id: 'crs_cyber_pentest_05', slug: 'ethical-hacking-and-penetration-testing', category: 'Authorised Security Testing' },
  6: { id: 'crs_cyber_websec_06', slug: 'web-application-security', category: 'Application Security' },
  7: { id: 'crs_cyber_netsec_07', slug: 'network-security', category: 'Network Defence' },
  8: { id: 'crs_cyber_soc_08', slug: 'soc-analyst-and-security-operations', category: 'Security Operations' },
  9: { id: 'crs_cyber_dfir_09', slug: 'digital-forensics-and-incident-response', category: 'Incident Response & Forensics' },
  10: { id: 'crs_cyber_malware_10', slug: 'malware-analysis-and-reverse-engineering', category: 'Malware Analysis' },
  11: { id: 'crs_cyber_cloud_11', slug: 'cloud-security-aws-and-azure', category: 'Cloud Security' },
  12: { id: 'crs_cyber_devsecops_12', slug: 'devsecops-and-secure-software-engineering', category: 'Secure Software Engineering' },
  13: { id: 'crs_cyber_ad_13', slug: 'active-directory-and-enterprise-security', category: 'Identity & Enterprise Security' },
  14: { id: 'crs_cyber_cti_14', slug: 'threat-intelligence-and-osint', category: 'Threat Intelligence' },
  15: { id: 'crs_cyber_crypto_15', slug: 'cryptography-and-applied-security', category: 'Applied Cryptography' },
  16: { id: 'crs_cyber_wireless_16', slug: 'wireless-and-mobile-security', category: 'Wireless & Mobile Security' },
  17: { id: 'crs_cyber_grc_17', slug: 'governance-risk-and-compliance', category: 'Governance, Risk & Compliance' },
  18: { id: 'crs_cyber_aisec_18', slug: 'ai-security-and-emerging-cyber-threats', category: 'AI Security' },
  19: { id: 'crs_cyber_redteam_19', slug: 'advanced-penetration-testing-and-red-team-operations', category: 'Adversary Emulation (Authorised)' },
  20: { id: 'crs_cyber_blueteam_20', slug: 'blue-team-engineering-and-threat-hunting', category: 'Detection Engineering & Threat Hunting' },
  21: { id: 'crs_cyber_k8s_21', slug: 'kubernetes-container-and-infrastructure-security', category: 'Cloud-Native Infrastructure Security' },
  22: { id: 'crs_cyber_zta_22', slug: 'security-architecture-and-zero-trust-engineering', category: 'Security Architecture' },
};

/** Files never shipped in a public lab kit (large public datasets, binaries, keys, build output). */
export const LAB_KIT_EXCLUDES = [
  /(^|\/)__pycache__(\/|$)/,
  /\.pyc$/,
  /\.key$/,
  /\.tar$/,
  /\.exe$/i, // inert teaching specimen - rebuilt locally by make_specimen.py
  /\.elf$/i,
  /^C14\/data\/enterprise-attack\.json$/, // 53 MB public MITRE dataset - download from MITRE
];

export const LAB_KIT_NOTES = {
  10: 'The inert teaching specimens (rkspecimen.exe / rkspecimen.elf) are not shipped in the download.\nRebuild them locally, offline, with: python make_specimen.py\n',
  14: 'data/enterprise-attack.json (MITRE ATT&CK Enterprise, STIX 2.1, ~53 MB) is not shipped.\nDownload it from the official MITRE repository and save it as data/enterprise-attack.json:\nhttps://github.com/mitre-attack/attack-stix-data/tree/master/enterprise-attack\n',
};
