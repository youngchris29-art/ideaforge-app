import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
    subscriptionStatus: v.union(v.literal("free"), v.literal("paid")),
    sessionsRemaining: v.number(),
    polarCustomerId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  sessions: defineTable({
    userId: v.id("users"),
    ideaTitle: v.string(),
    ideaSummary: v.optional(v.string()),
    status: v.union(
      v.literal("active"),
      v.literal("completed"),
      v.literal("archived")
    ),
    currentStage: v.number(), // 1-5
    createdAt: v.number(),
    updatedAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_status", ["userId", "status"]),

  messages: defineTable({
    sessionId: v.id("sessions"),
    role: v.union(v.literal("user"), v.literal("assistant"), v.literal("system")),
    content: v.string(),
    stage: v.number(), // which conversation stage (1-5)
    createdAt: v.number(),
  }).index("by_session", ["sessionId"]),

  ideaProfiles: defineTable({
    sessionId: v.id("sessions"),
    title: v.string(),
    problem: v.string(),
    targetAudience: v.string(),
    solution: v.string(),
    businessModel: v.string(),
    competitiveAdvantage: v.string(),
    launchStrategy: v.string(),
    viabilityScore: v.number(), // 1-10
    keyRisks: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_session", ["sessionId"]),

  documents: defineTable({
    sessionId: v.id("sessions"),
    ideaProfileId: v.id("ideaProfiles"),
    type: v.union(
      v.literal("roadmap"),
      v.literal("gtm"),
      v.literal("market_analysis"),
      v.literal("competitive_landscape"),
      v.literal("elevator_pitch"),
      v.literal("one_pager")
    ),
    title: v.string(),
    content: v.string(), // markdown
    shareToken: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_session", ["sessionId"])
    .index("by_share_token", ["shareToken"]),

  analytics: defineTable({
    userId: v.optional(v.id("users")),
    sessionId: v.optional(v.id("sessions")),
    event: v.string(),
    data: v.optional(v.string()), // JSON string
    createdAt: v.number(),
  }).index("by_event", ["event"]),

  waitlist: defineTable({
    email: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});
