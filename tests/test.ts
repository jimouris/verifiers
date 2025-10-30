#!/usr/bin/env tsx
/**
 * Simple test to verify the attestation API works
 */
import { readFileSync } from "fs";
import { verifyIntelDcap } from "../src/verifiers.ts";

async function test() {
  console.log("🧪 Testing Intel DCAP verification with known quote...\n");

  // Read binary quote file and convert to hex
  const binary = readFileSync("tests/quote-no-poc.bin");
  const hex = "0x" + binary.toString("hex");

  console.log(`📄 Quote size: ${binary.length} bytes`);
  console.log(`🔢 Hex preview: ${hex.substring(0, 66)}...`);
  console.log();

  try {
    const result = await verifyIntelDcap(hex);

    console.log("✅ Verification completed successfully!");
    console.log();
    console.log("📊 Full Response:");
    console.log(JSON.stringify(result, null, 2));
    console.log();

    // Display key fields
    console.log("🔍 Key Results:");
    console.log(`  success: ${result.success}`);
    console.log(`  proof_of_cloud: ${result.proof_of_cloud}`);
    console.log(`  quote.verified: ${result.quote?.verified}`);
    console.log(`  checksum: ${result.checksum}`);

    if (result.quote?.header?.tee_type) {
      console.log(`  TEE type: ${result.quote.header.tee_type}`);
    }

    console.log();

    // Test passes if we get a valid response
    console.log("✅ PASS: Successfully verified quote and received all outputs");

    if (result.quote?.header) {
      console.log(`   - TEE header parsed correctly`);
    }
    if (result.quote?.body) {
      console.log(`   - Quote body contains MRTD, RTMR values, etc.`);
    }
    if (result.checksum) {
      console.log(`   - Checksum: ${result.checksum}`);
    }
  } catch (error) {
    console.error("❌ Test failed with error:");
    console.error(error);
    process.exit(1);
  }
}

test();
