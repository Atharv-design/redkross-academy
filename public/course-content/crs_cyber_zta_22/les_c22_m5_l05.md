**Key custody answers:** where keys live (HSM, cloud KMS, external key manager), who can use them (application roles), who can manage them (key administrators), and how use is audited. Principles:

- separation of duties: key administrators cannot read data; data administrators cannot change key policies;
- scope: one key per purpose, environment, tenant or data class - never one key for everything (Course 15 M02);
- lifecycle: generation in the HSM/KMS, rotation, disablement, destruction; old keys must stop being trusted (signing keys especially);
- authorisation of use via IAM conditions (which service, which context), and alerting on unusual decrypt volumes;
- signing keys for tokens: strict issuer/audience scoping, rotation, and validation logic that rejects keys outside their scope;
- backup and escrow with dual control for keys whose loss would destroy data.
