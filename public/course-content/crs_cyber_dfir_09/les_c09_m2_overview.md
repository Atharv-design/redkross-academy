## About this module

Acquisition is the moment evidence passes from the world into your custody. Everything later depends on getting it right. This module explains the main kinds of forensic images and when to use each, how write blockers prevent accidental change, how cryptographic hashes prove an image matches its source, and how chain-of-custody records connect the two. The lab images a stand-in "device", verifies it, and shows that a single changed byte is detected.

## Why it matters

If you cannot show that your image is a faithful copy and that it has not changed since, every finding drawn from it can be challenged. Acquisition errors are also among the hardest to fix. Some sources, such as memory or a cloud instance about to be terminated, cannot be collected twice.

## Where it is used

IR teams collecting from servers and laptops, law-enforcement laboratories, e-discovery vendors, cloud security teams snapshotting compromised instances.

## Learning objectives

1. Distinguish physical, logical, targeted and live acquisition, and raw versus forensic container formats.
2. Explain how hardware and software write blockers work and their limits.
3. Acquire an image while hashing, and verify it.
4. Explain hash properties and why SHA-256 is preferred to MD5 and SHA-1.
5. Maintain chain of custody through acquisition, transfer and storage.
6. Choose acquisition methods for VMs and cloud workloads.

## Before you start

**Prerequisites:** C09-M01; Course 04 Module 6 (hashing in Python); Course 03 (Linux commands).

**Estimated study time:** About 9 hours.
