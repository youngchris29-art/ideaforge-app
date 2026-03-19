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
        ? "text-accent bg-accent-muted border-accent/20"
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
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-semibold ${color}`}>
      <span className="text-lg">{score}/10</span>
      <span className="text-xs font-medium opacity-80">{label}</span>
    </div>
  );
}

export default function IdeaProfileCard({ profile, sessionId, onViewDocuments }: IdeaProfileCardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="text-4xl">🔥</div>
        <h2 className="text-2xl font-heading font-bold">
          Your Idea Profile
        </h2>
        <p className="text-text-secondary">
          Here&apos;s what we built together in this session
        </p>
      </div>

      {/* Score */}
      <div className="flex justify-center">
        <ScoreBadge score={profile.viabilityScore} />
      </div>

      {/* Title */}
      <div className="p-5 rounded-xl bg-bg-elevated border border-border text-center">
        <h3 className="text-xl font-heading font-bold text-primary">
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
            className="px-6 py-2.5 bg-primary text-text-inverse font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm"
          >
            View Your Documents →
          </button>
        )}
        <Link
          href="/dashboard/new-session"
          className={`px-6 py-2.5 font-medium rounded-lg transition-colors text-sm ${
            onViewDocuments
              ? "border border-border text-text hover:bg-bg-hover"
              : "bg-primary text-text-inverse hover:bg-primary-hover"
          }`}
        >
          Start Another Session
        </Link>
        <Link
          href="/dashboard"
          className="px-6 py-2.5 border border-border text-text rounded-lg hover:bg-bg-hover transition-colors text-sm"
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
    <div className="p-4 rounded-xl bg-bg-surface border border-border">
      <div className="flex items-center gap-2 mb-2">
        <span>{icon}</span>
        <h4 className="font-heading font-semibold text-sm text-text-secondary">
          {title}
        </h4>
      </div>
      <p className="text-sm text-text leading-relaxed">{content}</p>
    </div>
  );
}
