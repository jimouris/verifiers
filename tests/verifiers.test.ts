import { readFileSync } from "fs";
import { verifyIntelDcap } from "../src/verifiers";

describe("Intel DCAP Verification", () => {
  it("should verify attestation and return correct proof_of_cloud value", async () => {
    const binary = readFileSync("tests/quote-no-poc.bin");
    const hex = "0x" + binary.toString("hex");

    const result = await verifyIntelDcap(hex);

    expect(result.success).toBe(true);
    expect(result.proof_of_cloud).toBe(false);
    expect(result.quote).toBeDefined();
    expect(result.quote.verified).toBe(true);
    expect(result.checksum).toBeDefined();
  });

  it("should include quote header with TEE type", async () => {
    const binary = readFileSync("tests/quote-no-poc.bin");
    const hex = "0x" + binary.toString("hex");

    const result = await verifyIntelDcap(hex);

    expect(result.quote.header).toBeDefined();
    expect(result.quote.header.tee_type).toBe("TEE_TDX");
  });

  it("should include quote body with measurements", async () => {
    const binary = readFileSync("tests/quote-no-poc.bin");
    const hex = "0x" + binary.toString("hex");

    const result = await verifyIntelDcap(hex);

    expect(result.quote.body).toBeDefined();
    expect(result.quote.body.mrtd).toBeDefined();
    expect(result.quote.body.rtmr0).toBeDefined();
  });
});
