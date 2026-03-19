// Polar payment integration utilities
// Configure these env vars in your .env.local:
//   NEXT_PUBLIC_POLAR_ORG_ID — Your Polar organization slug/ID
//   POLAR_API_KEY — Server-side Polar API key (from Polar dashboard → Settings → API Keys)
//   POLAR_WEBHOOK_SECRET — Webhook signing secret (from Polar dashboard → Settings → Webhooks)

export const POLAR_CONFIG = {
  orgId: process.env.NEXT_PUBLIC_POLAR_ORG_ID || "",
  // Polar checkout URLs
  checkoutUrl: (productId: string, userId: string, email: string) =>
    `https://polar.sh/checkout?productId=${productId}&metadata[userId]=${userId}&customerEmail=${encodeURIComponent(email)}`,
  // Polar customer portal (for managing subscriptions)
  portalUrl: (customerId: string) =>
    `https://polar.sh/portal?customerId=${customerId}`,
} as const;

export const PRICING = {
  free: {
    name: "Starter",
    price: 0,
    priceLabel: "Free",
    sessionsPerMonth: 2,
    features: [
      "2 idea sessions",
      "AI-guided conversation (5 stages)",
      "Idea profile with viability score",
      "View all 6 business documents",
      "Copy documents as markdown",
    ],
    limitations: [
      "No PDF export",
      "No Notion export",
      "No document sharing links",
    ],
  },
  pro: {
    name: "Pro",
    price: 15,
    priceLabel: "$15/mo",
    sessionsPerMonth: Infinity,
    features: [
      "Unlimited idea sessions",
      "AI-guided conversation (5 stages)",
      "Idea profile with viability score",
      "All 6 business documents",
      "Export to PDF",
      "Export to Notion",
      "Shareable document links",
      "Priority support",
    ],
    limitations: [],
  },
} as const;
