> [!NOTE] Lab kit
> Download the course lab kit: [RedKross_C15_Lab_Kit.zip](/downloads/labs/RedKross_C15_Lab_Kit.zip). Extract it anywhere; paths written as `LAB_ASSETS/C15/...` refer to the extracted `C15` folder. Everything runs locally against systems you own.

​## Task C15-CT1

**Review and rewrite:** a function stores API tokens as MD5(token) and encrypts customer notes with AES-CBC using IV = `b"0"*16` and key = SHA-256(app_name). List all weaknesses and write a corrected design (token storage, encryption, key management) with three tests.

​## Task C15-CT2 Using OpenSSL, create a root and intermediate CA and two leaf certificates (server and client with clientAuth). Show successful validation and three distinct failures, and explain each OpenSSL error code.
