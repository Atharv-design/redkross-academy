## About this module

Because every cloud change is an API call, cloud environments can be far more observable than data centres - if logging is configured, retained and watched. This module covers the main audit logs in AWS and Azure (CloudTrail, the Azure Activity log, Entra sign-in and audit logs, Microsoft 365 audit), data-plane and network logs, how to centralise and protect them, how to alert on the events that matter, and how provider-native detection services fit in. The lab runs five detections over synthetic CloudTrail-format records.

## Why it matters

CISA's Microsoft Expanded Cloud Logs Implementation Playbook records that on 15 June 2023 the US Department of State's SOC used an in-house detection that relied on enhanced logging - then available only to Purview Audit (Premium) customers - to flag the activity later attributed to Storm-0558. Microsoft subsequently made those logs available to E3/G3-and-above customers (case study). Whether a customer can detect an intrusion can depend on which logs exist and are switched on.

## Where it is used

SOC log onboarding, SIEM content engineering, cloud security posture and threat detection services, audit and compliance (log retention), and incident investigation.

## Learning objectives

1. Identify the control-plane, identity, data-plane and network logs in AWS and Azure and what each records.
2. Configure organisation-wide, protected, retained logging.
3. Read CloudTrail-format records and key fields.
4. Write and test detections for high-value cloud events.
5. Use provider-native detection services alongside custom rules.
6. Recognise logs that are off by default and enable them deliberately.

## Before you start

**Prerequisites:** C11-M01 to C11-M04; Course 08 Modules 2-4 (SIEM and detection engineering).

**Estimated study time:** About 9 hours.
