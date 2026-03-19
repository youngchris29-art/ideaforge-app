import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

export const getById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const createOrUpdate = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) {
      await ctx.db.patch(existing._id, {
        email: args.email,
        name: args.name,
        avatarUrl: args.avatarUrl,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      avatarUrl: args.avatarUrl,
      subscriptionStatus: "free",
      sessionsRemaining: 2,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateSubscription = mutation({
  args: {
    userId: v.id("users"),
    subscriptionStatus: v.union(v.literal("free"), v.literal("paid")),
    polarCustomerId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      subscriptionStatus: args.subscriptionStatus,
      polarCustomerId: args.polarCustomerId,
      sessionsRemaining: args.subscriptionStatus === "paid" ? 999 : 0,
      updatedAt: Date.now(),
    });
  },
});

// Grant Pro access for testing (no payment required)
export const grantProAccess = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      subscriptionStatus: "paid",
      sessionsRemaining: 999,
      updatedAt: Date.now(),
    });

    return user._id;
  },
});

export const decrementSessions = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");
    if (user.subscriptionStatus === "paid") return; // unlimited for paid users
    if (user.sessionsRemaining <= 0) throw new Error("No sessions remaining");

    await ctx.db.patch(args.userId, {
      sessionsRemaining: user.sessionsRemaining - 1,
      updatedAt: Date.now(),
    });
  },
});

// Reset a user back to the free tier (for testing)
export const resetToFree = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      subscriptionStatus: "free",
      sessionsRemaining: 2,
      updatedAt: Date.now(),
    });

    return user._id;
  },
});
