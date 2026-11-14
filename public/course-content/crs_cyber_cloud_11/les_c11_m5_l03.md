Key fields in a CloudTrail record:

| Term | Meaning |
|---|---|
| eventTime | UTC time of the request |
| eventSource | the service (s3.amazonaws.com, iam.amazonaws.com) |
| eventName | the API action (PutBucketPolicy, CreateAccessKey) |
| userIdentity | who: type (IAMUser, AssumedRole, Root), ARN, accountId, session context (MFA, source identity) |
| sourceIPAddress | caller's IP (or the AWS service name) |
| userAgent | client software |
| requestParameters | what was asked for |
| responseElements | what was returned (for some events) |
| errorCode | for failures (AccessDenied) |
| additionalEventData | extra context, for example MFAUsed on ConsoleLogin |

The lab's 17 synthetic records use these field names with a fictional account (111122223333) and documentation IP ranges.
