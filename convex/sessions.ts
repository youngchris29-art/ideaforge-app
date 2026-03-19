import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    userId: v.id("users"),
    ideaTitle: v.string(),
  },
  handler: async (ctx, args) => {
    // Rate limiting: check sessions created today
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentSessions = await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const todaySessions = recentSessions.filter(
      (s) => s.createdAt > oneDayAgo
    );

    // Free users: max 5 sessions per day
    if (user.subscriptionStatus === "free" && todaySessions.length >= 5) {
      throw new Error(
        "Daily session limit reached. Free users can create up to 5 sessions per day. Upgrade to Pro for unlimited sessions."
      );
    }

    // Check remaining sessions for free users
    if (user.subscriptionStatus === "free" && user.sessionsRemaining <= 0) {
      throw new Error(
        "You've used all your free sessions. Upgrade to Pro for unlimited sessions."
      );
    }

    // Decrement sessions remaining for free users
    if (user.subscriptionStatus === "free") {
      await ctx.db.patch(args.userId, {
        sessionsRemaining: user.sessionsRemaining - 1,
        updatedAt: Date.now(),
      });
    }

    return await ctx.db.insert("sessions", {
      userId: args.userId,
      ideaTitle: args.ideaTitle,
      status: "active",
      currentStage: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const getById = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.sessionId);
  },
});

export const listByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("sessions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const updateStage = mutation({
  args: {
    sessionId: v.id("sessions"),
    stage: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, {
      currentStage: args.stage,
      updatedAt: Date.now(),
    });
  },
});

export const complete = mutation({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, {
      status: "completed",
      completedAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const archive = mutation({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, {
      status: "archived",
      updatedAt: Date.now(),
    });
  },
});

export const updateTitle = mutation({
  args: {
    sessionId: v.id("sessions"),
    ideaTitle: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.sessionId, {
      ideaTitle: args.ideaTitle,
      updatedAt: Date.now(),
    });
  },
});
