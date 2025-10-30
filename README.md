# verifiers

Verifiers for [proofofcloud.org](https://proofofcloud.org). The goal is to have a simple API backend to:

1. Verify a given attestation report is valid, and can pass the Proof-of-Cloud verification
2. Query if a given hardware id is accepted by the Proof-of-Cloud verification

The verifier should support major TEE vendors like Intel DCAP attestations (Intel TDX and Intel SGX), AMD SEV(-SNP), and AWS Nitro Enclave.

