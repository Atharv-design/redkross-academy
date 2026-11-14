**Each finding should state:**

- the observation (what the evidence shows);
- the evidence items and artefacts that support it;
- the interpretation and its basis;
- the confidence, expressed consistently.

A simple, defined scale helps readers. For example:

```text
"is shown by"       directly observed in reliable evidence, corroborated.
"is consistent with" the evidence fits, but other explanations remain.
"suggests"          some support; weaker or single-source.
"cannot determine"  the evidence is insufficient.
```

Define the scale in the report and use it consistently. Some forensic bodies publish guidance on evaluative opinions and likelihood-ratio approaches. Follow your jurisdiction's and laboratory's conventions.

**Examples:**

```text
Good: "The file customers.csv was transferred from web01 to 172.31.0.20
at 05:51:40Z. This is shown by the HTTP response in E1 and by the
SHA-256 of the file reconstructed from E1, which equals the hash of the
server copy (04e8f300...)."
Good: "The transfer is consistent with deliberate staging by a user of
the deploy account: the file was copied into the web-served directory
97 seconds earlier (E3). The evidence examined does not show who
controlled that account."
Poor: "The deploy user stole the customer database." This overstates in
three ways: it equates the account with a person, assumes intent, and
calls a CSV file a database.
```

Avoid speculation, emotive words, and conclusions about guilt or legal liability, which are for the court or the decision-maker.
