"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useAction } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import UpgradeModal from "@/components/UpgradeModal";

export default function NewSessionPage() {
  const [ideaTitle, setIdeaTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  const convexUser = useQuery(
    api.users.getByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );
  const createSession = useMutation(api.sessions.create);
  const decrementSessions = useMutation(api.users.decrementSessions);
  const getFirstMessage = useAction(api.ai.getFirstMessage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaTitle.trim() || !convexUser) return;

    // Check free tier limit
    if (
      convexUser.subscriptionStatus === "free" &&
      convexUser.sessionsRemaining <= 0
    ) {
      setShowUpgradeModal(true);
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      // Create session
      const sessionId = await createSession({
        userId: convexUser._id,
        ideaTitle: ideaTitle.trim(),
      });

      // Decrement free tier sessions
      await decrementSessions({ userId: convexUser._id });

      // Get first AI response (this starts the conversation)
      await getFirstMessage({
        sessionId,
        ideaDescription: ideaTitle.trim(),
      });

      // Navigate to conversation
      router.push(`/dashboard/session/${sessionId}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to start session. Please try again."
      );
      setIsCreating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="text-sm text-text-secondary hover:text-text transition-colors mb-8 inline-block"
      >
        &larr; Back to Dashboard
      </Link>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold mb-2">
          Let&apos;s <span className="text-primary">forge</span> your idea
        </h1>
        <p className="text-text-secondary">
          Start by telling us about your idea in a sentence or two. Our AI will
          then walk you through a structured conversation to build out a complete
          launch plan.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-error-bg border border-error/20 rounded-xl">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      {/* Free tier notice */}
      {convexUser && convexUser.subscriptionStatus === "free" && (
        <div className="mb-6 p-4 bg-accent-muted border border-accent/20 rounded-xl">
          <p className="text-sm text-accent">
            {convexUser.sessionsRemaining > 0
              ? `You have ${convexUser.sessionsRemaining} free session${convexUser.sessionsRemaining === 1 ? "" : "s"} remaining`
              : (
                <>
                  You&apos;ve used all your free sessions.{" "}
                  <Link href="/checkout" className="underline font-semibold hover:text-primary transition-colors">
                    Upgrade to Pro
                  </Link>{" "}
                  for unlimited sessions!
                </>
              )}
          </p>
        </div>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        reason="sessions_limit"
      />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="idea"
            className="block text-sm font-medium text-text-secondary mb-2"
          >
            What&apos;s your business idea?
          </label>
          <textarea
            id="idea"
            value={ideaTitle}
            onChange={(e) => setIdeaTitle(e.target.value)}
            placeholder="e.g., A marketplace connecting freelance designers with small businesses that need branding..."
            rows={4}
            className="w-full px-4 py-3 bg-bg-surface border border-border rounded-xl text-text placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
            maxLength={500}
            disabled={isCreating}
          />
          <div className="flex justify-between mt-1.5">
            <p className="text-xs text-text-muted">
              Be as specific as you can — who&apos;s it for and what problem
              does it solve?
            </p>
            <p className="text-xs text-text-muted">{ideaTitle.length}/500</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={!ideaTitle.trim() || isCreating || !convexUser}
          className="w-full py-3.5 bg-primary text-text-inverse font-semibold rounded-xl hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg shadow-glow hover:shadow-lg"
        >
          {isCreating ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-text-inverse/30 border-t-text-inverse rounded-full animate-spin" />
              Starting Your Session...
            </span>
          ) : (
            "Start Forging"
          )}
        </button>
      </form>

      {/* What to expect */}
      <div className="mt-12 p-6 rounded-xl border border-border bg-bg-surface">
        <h3 className="font-heading font-semibold mb-3">What happens next?</h3>
        <div className="space-y-3">
          {[
            { num: "1", title: "Problem Validation", desc: "We explore whether the problem is real and painful" },
            { num: "2", title: "Customer Validation", desc: "We define who your ideal customer is" },
            { num: "3", title: "Competitive Positioning", desc: "We analyze what makes you different" },
            { num: "4", title: "Business Model", desc: "We figure out how you'll make money" },
            { num: "5", title: "Launch Strategy", desc: "We build your plan to get first customers" },
          ].map((step) => (
            <div key={step.num} className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                {step.num}
              </span>
              <div>
                <span className="font-medium text-sm">{step.title}</span>
                <span className="text-text-secondary text-sm">
                  {" "}— {step.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-text-muted text-xs mt-4">
          The whole conversation takes about 30-45 minutes
        </p>
      </div>
    </div>
  );
}
