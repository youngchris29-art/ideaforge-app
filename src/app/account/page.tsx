"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Header from "@/components/Header";
import Link from "next/link";

export default function AccountPage() {
  const { user, isLoaded } = useUser();
  const convexUser = useQuery(
    api.users.getByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-surface-container-low rounded" />
            <div className="h-4 w-72 bg-surface-container-low rounded" />
          </div>
        </div>
      </div>
    );
  }

  const isPaid = convexUser?.subscriptionStatus === "paid";
  const sessionsRemaining = convexUser?.sessionsRemaining ?? 2;

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        <h1 className="text-3xl font-display font-bold">Account</h1>

        {/* Profile Card */}
        <div className="p-6 rounded-md border border-hairline bg-surface-container-low space-y-4">
          <h2 className="font-display font-semibold text-lg">Profile</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-on-surface-variant uppercase tracking-wider">Name</label>
              <p className="text-text font-medium">
                {user?.fullName || "Not set"}
              </p>
            </div>
            <div>
              <label className="text-xs text-on-surface-variant uppercase tracking-wider">Email</label>
              <p className="text-text font-medium">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
            <div>
              <label className="text-xs text-on-surface-variant uppercase tracking-wider">Joined</label>
              <p className="text-text font-medium">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Unknown"}
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Card */}
        <div className="p-6 rounded-md border border-hairline bg-surface-container-low space-y-5">
          <h2 className="font-display font-semibold text-lg">Subscription</h2>

          {isPaid ? (
            <>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase">
                  Pro Plan
                </span>
                <span className="text-on-surface-variant text-sm">
                  $15/month
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-md bg-surface-bright">
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Sessions</p>
                  <p className="text-lg font-display font-bold text-success">Unlimited</p>
                </div>
                <div className="p-4 rounded-md bg-surface-bright">
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Export</p>
                  <p className="text-lg font-display font-bold text-success">All Formats</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {convexUser?.polarCustomerId && (
                  <a
                    href={`https://polar.sh/portal?customerId=${convexUser.polarCustomerId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-hairline text-on-surface font-medium rounded-md hover:bg-surface-bright transition-colors text-sm"
                  >
                    Manage Subscription
                  </a>
                )}
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 bg-primary text-surface font-medium rounded-md hover:bg-primary-hover transition-colors text-sm"
                >
                  Go to Dashboard
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase">
                  Starter (Free)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-md bg-surface-bright">
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Sessions Left</p>
                  <p className={`text-lg font-display font-bold ${sessionsRemaining > 0 ? "text-primary" : "text-error"}`}>
                    {sessionsRemaining}
                  </p>
                </div>
                <div className="p-4 rounded-md bg-surface-bright">
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider mb-1">Export</p>
                  <p className="text-lg font-display font-bold text-on-surface-variant">Markdown Only</p>
                </div>
              </div>

              <div className="p-4 rounded-md bg-primary/5 border border-primary/10">
                <p className="text-sm text-on-surface mb-3">
                  Upgrade to Pro to unlock unlimited sessions, PDF exports, shareable document links, and priority support.
                </p>
                <Link
                  href="/checkout"
                  className="inline-block px-6 py-2.5 bg-primary text-surface font-medium rounded-md hover:bg-primary-hover transition-colors text-sm"
                >
                  Upgrade to Pro — $15/mo
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Support */}
        <div className="p-6 rounded-md border border-hairline bg-surface-container-low space-y-4">
          <h2 className="font-display font-semibold text-lg text-on-surface-variant">Support</h2>
          <p className="text-on-surface-variant text-sm">
            Need help? Have feedback? Reach out — we&apos;re building IdeaForge for founders like you.
          </p>
          <a
            href="mailto:support@ideaforge.app"
            className="inline-block px-5 py-2.5 border border-hairline text-on-surface font-medium rounded-md hover:bg-surface-bright transition-colors text-sm"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
