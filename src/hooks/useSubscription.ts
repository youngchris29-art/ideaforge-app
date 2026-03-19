"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function useSubscription() {
  const { user } = useUser();
  const convexUser = useQuery(
    api.users.getByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  const isPaid = convexUser?.subscriptionStatus === "paid";
  const isFree = convexUser?.subscriptionStatus === "free";
  const sessionsRemaining = convexUser?.sessionsRemaining ?? 0;
  const canCreateSession = isPaid || sessionsRemaining > 0;

  return {
    convexUser,
    isPaid,
    isFree,
    sessionsRemaining,
    canCreateSession,
    isLoading: convexUser === undefined,
  };
}
