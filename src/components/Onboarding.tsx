"use client";

import { useState } from "react";

interface OnboardingProps {
  onComplete: () => void;
}

const STEPS = [
  {
    icon: "💡",
    title: "Welcome to IdeaForge",
    description:
      "Your AI business advisor that turns raw ideas into actionable launch plans. No MBA required — just your idea and 45 minutes.",
  },
  {
    icon: "💬",
    title: "Have a conversation",
    description:
      "Our AI asks smart questions about your idea — who you're helping, what problem you're solving, and how you'll make money. It challenges your assumptions and fills in blind spots.",
  },
  {
    icon: "📄",
    title: "Get your documents",
    description:
      "After the conversation, IdeaForge generates 6 personalized documents: one-pager, roadmap, GTM strategy, market analysis, competitive landscape, and elevator pitch. Ready to share with co-founders and investors.",
  },
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 backdrop-blur-sm px-6">
      <div className="max-w-md w-full bg-bg-surface border border-border rounded-2xl p-8 text-center space-y-6">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-6 bg-primary" : i < step ? "w-3 bg-primary/40" : "w-3 bg-border"
              }`}
            />
          ))}
        </div>

        <div className="text-5xl">{current.icon}</div>

        <div className="space-y-2">
          <h2 className="text-xl font-heading font-bold">{current.title}</h2>
          <p className="text-text-secondary text-sm leading-relaxed">
            {current.description}
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-2.5 border border-border text-text rounded-lg hover:bg-bg-hover transition-colors text-sm"
            >
              Back
            </button>
          )}
          {isLast ? (
            <button
              onClick={onComplete}
              className="px-6 py-2.5 bg-primary text-text-inverse font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm"
            >
              Start Your First Session
            </button>
          ) : (
            <button
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-primary text-text-inverse font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm"
            >
              Next
            </button>
          )}
        </div>

        <button
          onClick={onComplete}
          className="text-xs text-text-muted hover:text-text-secondary transition-colors"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
}
