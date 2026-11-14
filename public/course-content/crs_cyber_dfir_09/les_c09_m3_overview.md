## About this module

A file system is a data structure that maps names to bytes on a disk. When a file is "deleted", most file systems do not erase its contents. They mark the name and the space as free, and the bytes remain until something overwrites them. Understanding how partitions and file systems record names, metadata and allocation lets an examiner:

- recover deleted files;
- interpret timestamps correctly;
- recognise traces that ordinary users never see.

This module covers MBR and GPT partitioning, FAT, NTFS and ext4, deletion and recovery, timestamps, and timelines. The lab uses The Sleuth Kit on images built for the purpose.

## Why it matters

Many investigations turn on a file's existence, content or timing. File system details decide what is recoverable and what a timestamp really means. They also decide whether a tool's report can be trusted, as the Casey Anthony case shows.

## Where it is used

Data-theft and misconduct investigations, malware dropper analysis, ransomware scoping, e-discovery, and law-enforcement examinations.

## Learning objectives

1. Interpret MBR and GPT partition layouts.
2. Describe the key structures of FAT, NTFS and ext4.
3. Explain what happens on deletion and how recovery and carving work.
4. Interpret MACB timestamps and their limits per file system.
5. Use The Sleuth Kit (fsstat, fls, istat, icat, mactime) on an image.
6. Validate tool results and report uncertainty.

## Before you start

**Prerequisites:** C09-M01, C09-M02; Course 03 (file systems and permissions).

**Estimated study time:** About 10 hours.
