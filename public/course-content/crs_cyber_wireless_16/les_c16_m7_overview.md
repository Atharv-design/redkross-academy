## About this module

A mobile app is only half the system: the other half is the backend API it talks to. This module covers mobile API security - the authentication of API requests, the transport security protecting them, and the backend hardening that stops the API itself becoming the weak point. You will run the lab's API configuration reviewer over an insecure and a hardened backend configuration, seeing how each control moves the result from FAIL to PASS.

## Why it matters

Attackers do not need the app to attack the API - they can call the API directly. If the API trusts the client, accepts weak or missing authentication, allows cleartext, or leaks data, then every user is exposed regardless of how well the app is written. Mobile APIs are ordinary web APIs (Course 06) reached from an untrusted client over hostile networks, so they need strong authentication, TLS, authorisation on every request, rate limiting, and careful error handling. Many real mobile breaches are backend/API failures, not app failures. Securing the API is therefore essential to securing the mobile system.

## Where it is used

Backend/API security for mobile apps; API gateways and authentication services; the OWASP API Security Top 10; and the server side of any mobile assessment. It is the meeting point of mobile security and web/API security.

## Learning objectives

1. Explain mobile API authentication and its failures.
2. Explain transport security for mobile APIs.
3. Explain backend hardening (authorisation, rate limiting, errors).
4. Review an API configuration and interpret the result.
5. Explain the OWASP API Security Top 10 in the mobile context.
6. Explain authorised API testing.

## Before you start

**Prerequisites:** Module 5-6; Course 06 (web/API security) strongly helpful.

**Estimated study time:** About 9 hours.
