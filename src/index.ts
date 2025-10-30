import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { verifyIntelDcap } from "./verifiers.ts";
import { isVerified } from "./hardware.ts";

const app = new Hono();

// Health check
app.get("/", (c) => c.json({
  name: "Proof-of-Cloud Verifiers",
  version: "1.0.0",
  status: "running",
}));

// POST /attestations/verify
app.post("/attestations/verify", async (c) => {
  try {
    const { hex } = await c.req.json();

    if (!hex) {
      return c.json({ success: false, error: "missing_hex" }, 400);
    }

    // Currently only Intel DCAP is implemented.
    // When adding new verifiers, you should:
    // - Add a "type" field to the request body, or
    //     - auto-detect the type from the hex by length,
    //     - or even try all the verifiers in sequence until one succeeds
    // - Call the proper verifier function
    const result = await verifyIntelDcap(hex);
    return c.json(result);
  } catch (error) {
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, 500);
  }
});

// GET /hardware_id/:id
app.get("/hardware_id/:id", (c) => {
  const id = c.req.param("id");

  if (isVerified(id)) {
    return c.json({ success: true });
  }

  return c.json({ success: false, error: "not_found" }, 404);
});

// Start server
const port = parseInt(process.env.PORT || "3000");
console.log(`🚀 Server running on port ${port}`);

serve({ fetch: app.fetch, port });
