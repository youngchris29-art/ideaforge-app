"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Header from "@/components/Header";
import { PRICING } from "@/lib/polar";

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-success shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-4 h-4 text-on-surface-variant shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
    </svg>
  );
}

export default function PricingPage() {
  const { user, isSignedIn } = useUser();
  const convexUser = useQuery(
    api.users.getByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  const isPaid = convexUser?.subscriptionStatus === "paid";

  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-light mb-3">
            Simple, founder-friendly pricing
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
            Start free. Upgrade when you&apos;re ready to forge unlimited ideas into launch plans.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Free Tier */}
          <div className="p-8 rounded-md border border-hairline bg-transparent space-y-6">
            <div>
              <h2 className="font-display font-normal text-xl">{PRICING.free.name}</h2>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-display font-light">{PRICING.free.priceLabel}</span>
              </div>
              <p className="text-on-surface-variant text-sm mt-2">
                Perfect for testing your first idea
              </p>
            </div>

            <div className="space-y-3">
              {PRICING.free.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-sm text-on-surface">{feature}</span>
                </div>
              ))}
              {PRICING.free.limitations.map((limitation) => (
                <div key={limitation} className="flex items-start gap-2.5">
                  <LockIcon />
                  <span className="text-sm text-on-surface-variant">{limitation}</span>
                </div>
              ))}
            </div>

            {isSignedIn ? (
              <Link
                href="/dashboard"
                className="block w-full py-3 text-center rounded-md border border-hairline text-on-surface font-medium hover:bg-surface-bright transition-colors text-sm"
              >
                {isPaid ? "Current: Starter" : "Go to Dashboard"}
              </Link>
            ) : (
              <Link
                href="/auth/sign-up"
                className="block w-full py-3 text-center rounded-md border border-hairline text-on-surface font-medium hover:bg-surface-bright transition-colors text-sm"
              >
                Get Started Free
              </Link>
            )}
          </div>

          {/* Pro Tier */}
          <div className="p-8 rounded-md border border-primary/30 bg-surface-container-low space-y-6 relative">
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="tag-intelligence px-4 py-1.5 bg-primary text-surface rounded-full">
                Most Popular
              </span>
            </div>

            <div>
              <h2 className="font-display font-normal text-xl">{PRICING.pro.name}</h2>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-display font-light text-primary">$15</span>
                <span className="text-on-surface-variant text-sm">/month</span>
              </div>
              <p className="text-on-surface-variant text-sm mt-2">
                For founders who are serious about execution
              </p>
            </div>

            <div className="space-y-3">
              {PRICING.pro.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5">
                  <CheckIcon />
                  <span className="text-sm text-on-surface">{feature}</span>
                </div>
              ))}
            </div>

            {isPaid ? (
              <div className="w-full py-3 text-center rounded-md bg-success/10 border border-success/20 text-success font-medium text-sm">
                Your Current Plan
              </div>
            ) : isSignedIn ? (
              <Link
                href="/checkout"
                className="btn-primary block w-full py-3 text-center text-sm"
              >
                Upgrade to Pro
              </Link>
            ) : (
              <Link
                href="/auth/sign-up"
                className="btn-primary block w-full py-3 text-center text-sm"
              >
                Start Free, Upgrade Anytime
              </Link>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl font-display font-normal text-center mb-8">
            Questions? We got you.
          </h2>

          <div className="space-y-4">
            <FaqItem
              question="Can I try IdeaForge for free?"
              answer="Absolutely. You get 2 full sessions on the free plan — that's 2 complete idea-to-plan conversations with all 6 business documents. No credit card required."
            />
            <FaqItem
              question="What happens after my 2 free sessions?"
              answer="You'll still have access to your completed sessions and documents. To start new sessions, upgrade to Pro for $15/month — unlimited sessions, PDF exports, and more."
            />
            <FaqItem
              question="Can I cancel anytime?"
              answer="Yes, cancel anytime from your account settings. You'll keep Pro access until the end of your billing period. No cancellation fees, no hassle."
            />
            <FaqItem
              question="What payment methods do you accept?"
              answer="We use Polar for payments, which supports all major credit and debit cards. Your payment info is handled securely — we never see your card details."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-5 rounded-md border border-hairline bg-surface-container-low">
      <h3 className="font-body font-medium text-sm mb-2">{question}</h3>
      <p className="text-on-surface-variant text-sm leading-relaxed">{answer}</p>
    </div>
  );
}
