## Volt Typhoon and behaviour-based defence, 2024 Context: on 7 February 2024 CISA, the NSA, the FBI and partners published AA24-038A on PRC state-sponsored actors (Volt Typhoon) compromising US critical infrastructure, assessing with high confidence that the actors were pre-positioning, with some footholds maintained for at least five years [C14-M07-R3]. Behaviour over indicators: the advisory described living-off-the-land as a hallmark - built-in tools such as wmic, netsh, ntdsutil and PowerShell camouflaged within normal administration - and recommended defensive steps tied to behaviour and visibility: central log storage, review of VPN and remote access, watching for activity in temporary and public directories, and monitoring event log clearing and directory service database events. Mapping lessons: - When adversaries use the same tools as administrators, atomic indicators are few and short-lived; mapping to techniques and asking "do we have the data to distinguish this from normal use?" is the only scalable approach. - The advisory's recommendations are, in effect, gap analysis outputs: collect, centralise and baseline the data components these techniques touch. - Version awareness matters: guidance from 2023-2024 maps to the ATT&CK version of its time; resolve identifiers before merging with 20.1 mappings.



## (FICTIONAL TEACHING SCENARIO): The 90 per cent heat map

**Context:** a consultant presented Nilgiri Mutual (fictional) with an ATT&CK heat map showing "90% coverage", based on the product features its security vendors claimed.

**What happened:** after the 28 October event, the CTI team asked which of the campaign's techniques would have alerted. The answer, rule by rule, was one; most "covered" cells reflected product marketing, and none had been tested against Nilgiri's data.

**Response:** the team replaced the heat map with attack_map.py-style evidence (data components actually collected), a list of tested rules per technique, and a quarterly purple-team exercise to verify (Course 19).

**Lessons:** coverage claims need definitions and evidence; colour without tests is decoration.
