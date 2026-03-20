"use client";

import { Doc } from "../../convex/_generated/dataModel";
import Link from "next/link";

interface IdeaProfileCardProps {
  profile: Doc<"ideaProfiles">;
  sessionId: string;
  onViewDocuments?: () => void;
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 7
      ? "text-success bg-success-bg border-success/20"
      : score >= 4
        ? "text-primary bg-primary/10 border-primary/20"
        : "text-error bg-error-bg border-error/20";

  const label =
    score >= 8
      ? "Strong Potential"
      : score >= 6
        ? "Promising"
        : score >= 4
          ? "Needs Work"
          : "High Risk";

  return (
    <div className={`tag-intelligence inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${color}`}>
      <span className="text-lg">{score}/10</span>
      <span className="opacity-80">{label}</span>
    </div>
  );
}

export default function IdeaProfileCard({ profile, sessionId, onViewDocuments }: IdeaProfileCardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="text-4xl">🔥</div>
        <h2 className="text-2xl font-display font-light">
          Your Idea Profile
        </h2>
        <p className="text-on-surface-variant">
          Here&apos;s what we built together in this session
        </p>
      </div>

      {/* Score */}
      <div className="flex justify-center">
        <ScoreBadge score={profile.viabilityScore} />
      </div>

      {/* Title */}
      <div className="p-5 rounded-md bg-surface-bright border border-hairline text-center">
        <h3 className="text-xl font-display font-normal text-primary">
          {profile.title}
        </h3>
      </div>

      {/* Profile sections */}
      <div className="grid gap-4">
        <ProfileSection
          title="The Problem"
          icon="🎯"
          content={profile.problem}
        />
        <ProfileSection
          title="Target Audience"
          icon="👥"
          content={profile.targetAudience}
        />
        <ProfileSection
          title="The Solution"
          icon="💡"
          content={profile.solution}
        />
        <ProfileSection
          title="Business Model"
          icon="💰"
          content={profile.businessModel}
        />
        <ProfileSection
          title="Competitive Advantage"
          icon="⚡"
          content={profile.competitiveAdvantage}
        />
        <ProfileSection
          title="Launch Strategy"
          icon="🚀"
          content={profile.launchStrategy}
        />
        {profile.keyRisks && (
          <ProfileSection
            title="Key Risks"
            icon="⚠️"
            content={profile.keyRisks}
          />
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        {onViewDocuments && (
          <button
            onClick={onViewDocuments}
            className="btn-primary px-6 py-2.5 text-sm"
          >
            View Your Documents →
          </button>
        )}
        <Link
          href="/dashboard/new-session"
          className={`px-6 py-2.5 font-medium rounded-md transition-colors text-sm ${
            onViewDocuments
              ? "border border-hairline text-on-surface hover:bg-surface-bright"
              : "btn-primary"
          }`}
        >
          Start Another Session
        </Link>
        <Link
          href="/dashboard"
          className="px-6 py-2.5 border border-hairline text-on-surface rounded-md hover:bg-surface-bright transition-colors text-sm"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

function ProfileSection({
  title,
  icon,
  content,
}: {
  title: string;
  icon: string;
  content: string;
}) {
  return (
    <div className="p-4 rounded-md bg-surface-container-low border border-hairline">
      <div className="flex items-center gap-2 mb-2">
        <span>{icon}</span>
        <h4 className="tag-intelligence text-on-surface-variant">
          {title}
        </h4>
      </div>
      <p className="text-sm text-on-surface leading-relaxed">{content}</p>
    </div>
  );
}
