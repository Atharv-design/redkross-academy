Work through each scenario on your own first, then compare your reasoning with the model answer.

## Scenario 1

A vendor's sales presentation says your incident "matches APT-X with 87% confidence" based on technique overlap.

**Task:** Evaluate the claim.

> [!TIP] Model answer
> Ask what the percentage means; overlap scores are not probabilities of responsibility. Ask which techniques matched, how many other groups match as well (in the lab six matched every parent technique), whether rare or distinctive behaviours were involved, and whether there is independent evidence (code reuse, infrastructure, victimology, timing). Without those, treat it as weak technical similarity, not attribution, and do not report it as such.
>
> **Lesson:** an overlap score is not a confidence level.

## Scenario 2

Malware from your incident contains comments in a particular language and compile times in office hours of one time zone.

**Task:** Explain how much weight these deserve.

> [!TIP] Model answer
> Both are weak, easily manipulated artefacts: language comments and compile times can be faked (as Olympic Destroyer's Rich header was) or reflect contractors, shared tools or working patterns that many share. Use them only as one line among several, check them for internal consistency with other evidence, and state low confidence unless independent strong evidence agrees.
>
> **Lesson:** soft artefacts support, they do not establish.

## Scenario 3

**The board asks:** "Who attacked us, and are they likely to come back?"

**Task:** Draft a five-sentence answer that is honest and useful.

> [!TIP] Model answer
> **For example:** "We have not identified who is responsible, and with the evidence available to us we are unlikely to be able to. We can say the activity is part of a phishing campaign against insurers that began in early October. Further attempts against our staff are likely in the next month. Confidence: moderate. Our defences are being adjusted to this campaign's methods, which matters more than its name, and we will report any new evidence on responsibility."
>
> **Lesson:** answer the decision-relevant part; be clear about what is unknown.
