"use client";

interface ConversationTipsProps {
  currentStage: number;
  onSuggestionClick: (suggestion: string) => void;
}

const STAGE_TIPS: Record<number, { tip: string; suggestions: string[] }> = {
  1: {
    tip: "Be specific about the problem — who feels the pain and how often?",
    suggestions: [
      "I've seen this problem myself when...",
      "The biggest pain point is...",
      "People currently deal with this by...",
    ],
  },
  2: {
    tip: "Think about a real person, not a demographic. Who's your ideal first customer?",
    suggestions: [
      "My ideal customer looks like...",
      "I've talked to potential users who said...",
      "They currently spend money on...",
    ],
  },
  3: {
    tip: "Honest differentiation is key — what makes your approach genuinely unique?",
    suggestions: [
      "The closest competitor is...",
      "What makes my approach different is...",
      "People would switch because...",
    ],
  },
  4: {
    tip: "Ground your pricing in what customers already pay for alternatives.",
    suggestions: [
      "I'm thinking of charging...",
      "Similar tools charge around...",
      "My first revenue goal is...",
    ],
  },
  5: {
    tip: "Focus on concrete actions. What can you do this week?",
    suggestions: [
      "My MVP would include...",
      "I'd reach first users through...",
      "In the next 30 days I want to...",
    ],
  },
};

export default function ConversationTips({
  currentStage,
  onSuggestionClick,
}: ConversationTipsProps) {
  const stageTips = STAGE_TIPS[currentStage];
  if (!stageTips) return null;

  return (
    <div className="px-3 sm:px-4 py-2.5 border-t border-hairline bg-surface-container-low">
      <p className="text-xs text-on-surface-variant mb-2">
        💡 {stageTips.tip}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {stageTips.suggestions.map((suggestion, i) => (
          <button
            key={i}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-xs px-2.5 py-1.5 rounded-sm bg-surface border border-hairline text-on-surface-variant hover:text-primary hover:border-primary/25 hover:bg-surface transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
