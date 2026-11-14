## About this module

Before you can secure Active Directory you must know what it actually is: a distributed, replicated database of objects (users, computers, groups and more) that answers two questions billions of times a day - "who are you?" and "what may you reach?". This module builds the vocabulary and the mental model used in every later module. You will learn what a directory service is, how domains, trees and forests fit together, what the schema and the global catalogue are, and what jobs a domain controller does. Then you will build a real domain controller in the lab (Sahyadri Logistics, ad.sahyadri.example) and read its own description of itself back to you.

## Why it matters

Almost every enterprise attack that reaches "domain admin" travels through Active Directory, because AD is where privilege lives. You cannot defend a structure you cannot describe. Knowing that the forest, not the domain, is the security boundary; that a read-only domain controller holds no secrets it is not told to; and that the schema is forest-wide and hard to undo - these facts drive real security decisions. Microsoft's own guidance treats the forest as the unit of trust and isolation [R2].

## Where it is used

Every organisation that runs Windows networking at scale: banks, insurers, manufacturers, hospitals, universities and government. The same concepts underlie Entra ID (formerly Azure AD) in the cloud and Samba AD in mixed environments, and interoperate with Linux through Kerberos and LDAP.

## Learning objectives

1. Define a directory service and name the standards Active Directory is built on (LDAP, Kerberos, DNS).
2. Explain domains, trees, forests, trusts and why the forest is the security boundary.
3. Describe the directory schema, partitions and the global catalogue.
4. Explain domain-controller roles, FSMO roles and read-only domain controllers.
5. Explain the central role of DNS and replication in a working domain.
6. Build a domain controller in the lab and verify it with its own tools.

## Before you start

**Prerequisites:** Course 02 Modules 4-5 (networking and DNS).

**Estimated study time:** About 7 hours.
