## About this module

This module follows an authentication from a typed password to a service you are allowed to use. Active Directory uses Kerberos for authentication and LDAP for directory reads, with NTLM surviving as a weaker fallback. You will learn the three-party Kerberos dance (client, Key Distribution Centre, service), what a ticket-granting ticket and a service ticket are, why encryption types matter, and how LDAP bind and search work. Then you will watch it happen in the lab: obtain a real ticket-granting ticket for the user "asha", use it to bind to the directory over GSSAPI, and read the encryption type the domain controller actually used.

## Why it matters

Almost every serious identity attack is an abuse of these protocols: stealing or forging tickets, downgrading to weak encryption, or replaying password hashes through NTLM (Module 5). You cannot detect or prevent what you do not understand. Knowing that a ticket-granting ticket is encrypted with the krbtgt account's key, that service tickets are encrypted with the service account's key, and that AES has replaced RC4, tells you exactly why the krbtgt account and service-account passwords are so sensitive.

## Where it is used

Every Windows logon, every file-share and database connection that uses integrated authentication, every "single sign-on" to an internal web app through Kerberos or NTLM, and every LDAP-backed application (email, HR, network devices) relies on these flows.

## Learning objectives

1. Describe the Kerberos three-party model and the roles of the AS, TGS and KDC.
2. Explain the TGT and service tickets, and which key encrypts each.
3. Explain Kerberos encryption types and why AES replaced RC4 and DES.
4. Explain LDAP bind (simple versus SASL/GSSAPI) and search.
5. Explain NTLM, why it persists, and why it is weaker than Kerberos.
6. Observe a real authentication flow in the lab and read the audit record.

## Before you start

**Prerequisites:** Module 1; Course 02 Module 4 (TCP and ports).

**Estimated study time:** About 8 hours.
