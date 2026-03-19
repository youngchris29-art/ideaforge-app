import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    sessionId: v.id("sessions"),
    title: v.string(),
    problem: v.string(),
    targetAudience: v.string(),
    solution: v.string(),
    businessModel: v.string(),
    competitiveAdvantage: v.string(),
    launchStrategy: v.string(),
    viabilityScore: v.number(),
    keyRisks: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("ideaProfiles", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getBySession = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ideaProfiles")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .unique();
  },
});
