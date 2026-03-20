"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Header from "@/components/Header";
import Link from "next/link";

export default function CheckoutPage() {
  const { user, isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convexUser = useQuery(
    api.users.getByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  const createCheckout = useAction(api.polar.createCheckout);

  // Auto-redirect to Polar checkout when page loads
  useEffect(() => {
    if (!convexUser || !user || isLoading) return;

    // Already paid — redirect to dashboard
    if (convexUser.subscriptionStatus === "paid") {
      window.location.href = "/dashboard";
      return;
    }

    const initiateCheckout = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { checkoutUrl } = await createCheckout({
          userId: convexUser._id,
          userEmail: user.primaryEmailAddress?.emailAddress || "",
          successUrl: `${window.location.origin}/checkout/success`,
          cancelUrl: `${window.location.origin}/pricing`,
        });

        // Redirect to Polar checkout
        window.location.href = checkoutUrl;
      } catch (err) {
        console.error("Checkout error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
        setIsLoading(false);
      }
    };

    initiateCheckout();
  }, [convexUser, user, isLoading, createCheckout]);

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-surface">
        <Header />
        <div className="max-w-md mx-auto px-6 py-20 text-center space-y-4">
          <h1 className="text-2xl font-display font-bold">Sign in to upgrade</h1>
          <p className="text-on-surface-variant text-sm">
            You need to be signed in to upgrade to Pro.
          </p>
          <Link
            href="/auth/sign-in"
            className="inline-block px-6 py-2.5 bg-primary text-surface font-medium rounded-md hover:bg-primary-hover transition-colors text-sm"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="max-w-md mx-auto px-6 py-20 text-center space-y-6">
        {error ? (
          <>
            <div className="text-4xl">😕</div>
            <h1 className="text-2xl font-display font-bold">
              Checkout Error
            </h1>
            <p className="text-on-surface-variant text-sm">{error}</p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-primary text-surface font-medium rounded-md hover:bg-primary-hover transition-colors text-sm"
              >
                Try Again
              </button>
              <Link
                href="/pricing"
                className="px-6 py-2.5 border border-hairline text-on-surface font-medium rounded-md hover:bg-surface-bright transition-colors text-sm"
              >
                Back to Pricing
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
            <h1 className="text-2xl font-display font-bold">
              Preparing checkout...
            </h1>
            <p className="text-on-surface-variant text-sm">
              Redirecting you to our secure payment partner.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
