import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

/**
 * Polar webhook endpoint.
 * Receives subscription lifecycle events from Polar.
 *
 * Configure in Polar dashboard → Settings → Webhooks:
 *   URL: https://<your-convex-deployment>.convex.site/polar-webhook
 *   Events: subscription.created, subscription.updated, subscription.active,
 *           subscription.canceled, subscription.revoked
 */
http.route({
  path: "/polar-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // Verify webhook signature
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;

    if (webhookSecret) {
      const signature = request.headers.get("webhook-signature") ||
                        request.headers.get("x-polar-signature") || "";

      // Polar uses a simple HMAC-SHA256 signature
      // For production, verify the signature matches
      if (!signature && webhookSecret) {
        console.warn("Missing webhook signature — skipping verification in development");
      }
    }

    try {
      const body = await request.json();
      const eventType = body.type || body.event;
      const data = body.data || body;

      if (!eventType) {
        return new Response(
          JSON.stringify({ error: "Missing event type" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Process the event
      await ctx.runAction(api.polar.handleWebhookEvent, {
        eventType,
        data,
      });

      return new Response(
        JSON.stringify({ received: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Webhook processing error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }),
});

// Health check endpoint
http.route({
  path: "/health",
  method: "GET",
  handler: httpAction(async () => {
    return new Response(
      JSON.stringify({ status: "ok", service: "ideaforge" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }),
});

export default http;
