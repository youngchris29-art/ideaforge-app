import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
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
    content: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("documents", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getBySession = query({
  args: { sessionId: v.id("sessions") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
  },
});

export const getBySessionAndType = query({
  args: {
    sessionId: v.id("sessions"),
    type: v.union(
      v.literal("roadmap"),
      v.literal("gtm"),
      v.literal("market_analysis"),
      v.literal("competitive_landscape"),
      v.literal("elevator_pitch"),
      v.literal("one_pager")
    ),
  },
  handler: async (ctx, args) => {
    const docs = await ctx.db
      .query("documents")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();
    return docs.find((d) => d.type === args.type) ?? null;
  },
});

export const updateContent = mutation({
  args: {
    documentId: v.id("documents"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.documentId, {
      content: args.content,
    });
  },
});

export const setShareToken = mutation({
  args: {
    documentId: v.id("documents"),
    shareToken: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.documentId, {
      shareToken: args.shareToken,
    });
  },
});

export const getByShareToken = query({
  args: { shareToken: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .withIndex("by_share_token", (q) => q.eq("shareToken", args.shareToken))
      .unique();
  },
});
