import { query } from "./_generated/server";

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").order("desc").collect();
  },
});

export const getUserCount = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.length;
  },
});

export const getSessionCount = query({
  args: {},
  handler: async (ctx) => {
    const sessions = await ctx.db.query("sessions").collect();
    return sessions.length;
  },
});

export const getDocumentCount = query({
  args: {},
  handler: async (ctx) => {
    const docs = await ctx.db.query("documents").collect();
    return docs.length;
  },
});

export const getRecentSessions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("sessions")
      .order("desc")
      .take(10);
  },
});

export const getRecentErrors = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("analytics")
      .withIndex("by_event", (q) => q.eq("event", "client_error"))
      .order("desc")
      .take(10);
  },
});

export const getPaidUserCount = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.filter((u) => u.subscriptionStatus === "paid").length;
  },
});
