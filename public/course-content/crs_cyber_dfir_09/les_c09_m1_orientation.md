## Before you begin

> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C09_Lab_Kit.zip](/downloads/labs/RedKross_C09_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C09/...` refer to the extracted `C09` folder. Everything runs locally against systems you own.

**Lab assets:** LAB_ASSETS/C09/ contains

| Term | Meaning |
|---|---|
| rk_c09_acquire_lab.sh | imaging and hash verification of a 16 MB stand-in "device" (Debian container) |
| rk_c09_fs_lab.sh | FAT16 and ext4 images with a deleted file, examined with The Sleuth Kit 4.12.1 |
| rk_c09_live_lab.sh | process and connection artefacts from /proc |
| rk_c09_net_lab.sh | isolated Docker capture of an HTTP download, file carving with tshark 4.2.5 and hash matching |
| timeline.py | merges syslog, web log and pcap events into one UTC timeline |

Each script has a saved `*_output.txt.` All were execution-tested on 2026-11-07 in disposable containers (Docker 29.4.2) or with CPython 3.14.4. All files, users, hosts and the organisation "Tamarind Logistics" are fictional. Addresses are RFC 1918 private ranges on an isolated Docker bridge.

**Scope and ethics:** forensic techniques in this course are applied only to images and systems you own or are explicitly authorised to examine. Never image, search or access another person's device or account without lawful authority.

**Access classification note:** the blueprint classes Course 09 as PAID.
