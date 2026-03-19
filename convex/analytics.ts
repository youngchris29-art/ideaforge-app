import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const track = mutation({
  args: {
    userId: v.optional(v.id("users")),
    sessionId: v.optional(v.id("sessions")),
    event: v.string(),
    data: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("analytics", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getBySession = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("analytics")
      .filter((q) => q.eq(q.field("sessionId"), args.sessionId))
      .order("desc")
      .collect();
  },
});

export const getByEvent = query({
  args: { event: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("analytics")
      .withIndex("by_event", (q) => q.eq("event", args.event))
      .order("desc")
      .take(100);
  },
});
