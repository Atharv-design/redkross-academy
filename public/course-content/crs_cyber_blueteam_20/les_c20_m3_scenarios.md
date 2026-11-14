Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A threat report names a domain used for command and control. Your resolver logs are kept for 30 days and the report says activity began 90 days ago.

**Task:** Describe what you can and cannot conclude, and what to change.

> [!TIP] Model answer
> You can check the last 30 days only. A match proves contact in that window. No match says nothing about days 31-90, and the report should say so explicitly. Look for other sources with longer retention (proxy, firewall, flow archives, EDR DNS events). Extend resolver retention in line with Module 1, and keep a hunt ticket open to re-check when new indicators arrive.
>
> **Lesson:** state the window your evidence covers.

## Scenario 2

A new IDS rule fires 9,000 times a day on "content:"admin"".

**Task:** Improve it.

> [!TIP] Model answer
> Bind the match to a sticky buffer (for example http.uri) and a direction with flow:established,to_server. Anchor or lengthen the content to the specific path or parameter of concern, restrict addresses to the relevant servers with variables, and test against benign traffic captures. Give the rule a precise msg, and increment rev. Measure the alert volume after the change.
>
> **Lesson:** precision comes from fields, direction and scope.

## Scenario 3

Legal asks whether the SOC may keep full packet capture of all staff traffic for a year "just in case".

**Task:** Advise.

> [!TIP] Model answer
> Advise against blanket capture. It is disproportionate, holds large amounts of personal data and communications content, raises legal issues (interception and data-protection law, including India's DPDP Act 2023; SME review advised) and costs a great deal. Recommend metadata (DNS and flow) with defined retention, content capture only at specific chokepoints or on demand for investigations, a written policy, access control and audit, and legal sign-off.
>
> **Lesson:** capture proportionately and lawfully.
