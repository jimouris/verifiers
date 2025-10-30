/**
 * Common response format for all TEE attestation verification
 *
 * This interface defines the minimal contract that all TEE verifiers must return.
 * Implementations may return additional vendor-specific fields.
 */
export interface AttestationResponse {
  /** Whether the attestation verification succeeded */
  success: boolean;

  /** Whether the hardware passes Proof-of-Cloud verification criteria */
  proof_of_cloud: boolean;

  /** TEE-specific quote/attestation data (structure varies by vendor) */
  quote?: any;

  /** Additional vendor-specific fields allowed */
  [key: string]: any;
}
