"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function CheckoutSuccessPage() {
  const { user } = useUser();
  const [showConfetti, setShowConfetti] = useState(true);

  const convexUser = useQuery(
    api.users.getByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  const isPaid = convexUser?.subscriptionStatus === "paid";

  // Hide confetti after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        {showConfetti && (
          <div className="text-5xl animate-bounce">🎉</div>
        )}

        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">
            {isPaid ? "Welcome to Pro!" : "Processing..."}
          </h1>
          {isPaid ? (
            <p className="text-text-secondary">
              You now have unlimited idea sessions, PDF exports, and premium features. Time to forge some ideas.
            </p>
          ) : (
            <p className="text-text-secondary">
              Your payment is being processed. This usually takes just a few seconds. Your subscription will activate automatically.
            </p>
          )}
        </div>

        {isPaid && (
          <div className="p-4 rounded-xl bg-success/5 border border-success/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-sm font-semibold text-success">
                Pro Plan Active
              </span>
            </div>
            <p className="text-xs text-text-secondary">
              Unlimited sessions · PDF export · Notion export · Priority support
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard/new-session"
            className="px-6 py-2.5 bg-primary text-text-inverse font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm"
          >
            Start a New Session
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-2.5 border border-border text-text font-medium rounded-lg hover:bg-bg-hover transition-colors text-sm"
          >
            Go to Dashboard
          </Link>
        </div>

        {!isPaid && (
          <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
            <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span>Waiting for confirmation...</span>
          </div>
        )}
      </div>
    </div>
  );
}
