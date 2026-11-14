Everything Kubernetes knows - pods, secrets, RBAC rules, service account signing configuration references - lives in etcd. Implications:

- Read access to etcd is read access to every secret, regardless of RBAC. Write access is cluster takeover. etcd must accept connections only from the API server, with mutual TLS, on a network others cannot reach.
- Backups of etcd contain every secret. Protect, encrypt and restrict them like the live datastore.
- Secrets are base64-encoded in the API (an encoding, not encryption) and, by default, stored unencrypted [R3].

Encryption at rest is configured on the API server with an EncryptionConfiguration listing providers in order: identity (no encryption), aescbc, aesgcm, secretbox, or KMS, in which a key held by an external key management service protects the data keys. The first provider encrypts new writes; data written before encryption was enabled stays unencrypted until it is rewritten, so enabling encryption must be followed by rewriting existing secrets [R3].

The lab demonstrated both states. On the default k3s cluster, a new secret with value rk-lab-at-rest-demo-value appeared in one datastore file and "k3s secrets-encrypt status" reported "Encryption Status: Disabled". On the hardened cluster started with --secrets-encryption, the same test found the plaintext in zero files and the "k8s:enc:aescbc" envelope prefix in two, while the API still returned the value to an authorised reader. Encryption at rest protects disks, backups and datastore access; it does not protect against anyone RBAC allows to read the secret.
