"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

// Polar API base URL
const POLAR_API_URL = "https://api.polar.sh/v1";

/**
 * Create a Polar checkout session for a user to upgrade to Pro.
 * Returns the checkout URL to redirect the user to.
 */
export const createCheckout = action({
  args: {
    userId: v.id("users"),
    userEmail: v.string(),
    successUrl: v.string(),
    cancelUrl: v.string(),
  },
  handler: async (ctx, args): Promise<{ checkoutUrl: string }> => {
    const apiKey = process.env.POLAR_API_KEY;
    const productId = process.env.POLAR_PRODUCT_ID;

    if (!apiKey || !productId) {
      throw new Error(
        "Polar is not configured. Set POLAR_API_KEY and POLAR_PRODUCT_ID in your Convex environment variables."
      );
    }

    // Create checkout session via Polar API
    const response = await fetch(`${POLAR_API_URL}/checkouts/custom`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        success_url: args.successUrl,
        customer_email: args.userEmail,
        metadata: {
          convex_user_id: args.userId,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Polar checkout error:", errorText);
      throw new Error("Failed to create checkout session. Please try again.");
    }

    const data = await response.json();

    // Track checkout initiated
    await ctx.runMutation(api.analytics.track, {
      userId: args.userId,
      event: "checkout_initiated",
      data: JSON.stringify({ productId }),
    });

    return { checkoutUrl: data.url };
  },
});

/**
 * Handle Polar webhook events (called from convex/http.ts).
 * Processes subscription lifecycle events.
 */
export const handleWebhookEvent = action({
  args: {
    eventType: v.string(),
    data: v.any(),
  },
  handler: async (ctx, args): Promise<{ success: boolean }> => {
    const { eventType, data } = args;

    console.log(`Processing Polar webhook: ${eventType}`);

    switch (eventType) {
      case "subscription.created":
      case "subscription.updated":
      case "subscription.active": {
        // Extract user ID from metadata
        const userId = data?.metadata?.convex_user_id;
        const customerId = data?.customer_id || data?.customer?.id;
        const status = data?.status;

        if (!userId) {
          console.error("No convex_user_id in webhook metadata");
          return { success: false };
        }

        // Determine subscription status
        const isActive = status === "active" || status === "trialing";

        await ctx.runMutation(api.users.updateSubscription, {
          userId: userId,
          subscriptionStatus: isActive ? "paid" : "free",
          polarCustomerId: customerId,
        });

        await ctx.runMutation(api.analytics.track, {
          userId: userId,
          event: isActive ? "subscription_activated" : "subscription_updated",
          data: JSON.stringify({ polarStatus: status, customerId }),
        });

        break;
      }

      case "subscription.canceled":
      case "subscription.revoked": {
        const userId = data?.metadata?.convex_user_id;
        const customerId = data?.customer_id || data?.customer?.id;

        if (!userId) {
          console.error("No convex_user_id in webhook metadata");
          return { success: false };
        }

        await ctx.runMutation(api.users.updateSubscription, {
          userId: userId,
          subscriptionStatus: "free",
          polarCustomerId: customerId,
        });

        await ctx.runMutation(api.analytics.track, {
          userId: userId,
          event: "subscription_cancelled",
          data: JSON.stringify({ customerId }),
        });

        break;
      }

      case "checkout.created":
      case "checkout.updated": {
        // Informational — log but no action needed
        console.log(`Checkout event: ${eventType}`, data?.id);
        break;
      }

      default:
        console.log(`Unhandled Polar event: ${eventType}`);
    }

    return { success: true };
  },
});
