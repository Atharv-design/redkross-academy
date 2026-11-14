API testing must be authorised and scoped:

| Term | Meaning |
|---|---|
| authorise | test only APIs you own or are explicitly authorised to test. Calling a third-party API to probe it - even "just" by changing an id - is unauthorised access. |
| scope | agree the endpoints, accounts and data in scope; use test accounts and test data, not real users' data. |
| rate care | authorisation/rate-limit testing can affect availability; agree limits and timing (ties to the do-no-harm rules of Course 19). |
| data care | API responses contain personal data; handle responsibly and minimise. |

This course reviews API CONFIGURATIONS offline (no live API is called), so all practice is safe and authorised. Against a live API, the authorisation, scope and do-no-harm rules of the penetration-testing courses apply. In India, probing an API you are not authorised to use engages the IT Act, 2000 (ss.43, 66), and API data may be personal data under the DPDP Act, 2023. This is not legal advice. The OWASP testing guidance assumes an authorised engagement.
