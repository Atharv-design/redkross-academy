## About this module

Mobile security begins with the platform's own security model. This module covers the Android security model - app sandboxing, the permission system, and app data storage - the architecture that both protects apps and defines where they can go wrong. Understanding it is the prerequisite for testing mobile apps (Module 6) and securing their backends (Module 7), and it frames the weaknesses you will find in the lab's demo app.

## Why it matters

A mobile device holds a user's most sensitive data and runs code from many sources. The platform defends this with a strong security model: each app runs in its own sandbox, data is private by default, and access to sensitive resources is gated by permissions the user grants. An app's security largely comes down to how well it works WITH this model - storing secrets in private storage, requesting only the permissions it needs, protecting exported components, and not weakening the defaults (e.g. by allowing cleartext traffic). Most mobile app vulnerabilities are failures to respect the platform model. Knowing the model tells you what is protected for free and what the app must get right.

## Where it is used

Mobile app development and security review; mobile device management policy; and any assessment of an Android application. The model underpins the MASVS categories used in Module 6.

## Learning objectives

1. Explain the Android app sandbox and process isolation.
2. Explain the permission model and dangerous permissions.
3. Explain app data storage options and their security.
4. Explain app components and the risk of exporting them.
5. Explain how an app can weaken the platform defaults.
6. Relate the model to the OWASP MASVS categories.

## Before you start

**Prerequisites:** Basic operating-system and app concepts; Course 06 (app security) helpful.

**Estimated study time:** About 9 hours.
