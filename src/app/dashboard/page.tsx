"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

export default function DashboardPage() {
  const { user } = useUser();
  const firstName = user?.firstName || "there";
  const [archivingId, setArchivingId] = useState<string | null>(null);

  // Sync Clerk user to Convex
  const createOrUpdate = useMutation(api.users.createOrUpdate);
  const archiveSession = useMutation(api.sessions.archive);
  const convexUser = useQuery(
    api.users.getByClerkId,
    user?.id ? { clerkId: user.id } : "skip"
  );

  useEffect(() => {
    if (user && !convexUser) {
      createOrUpdate({
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.fullName || user.firstName || "User",
      });
    }
  }, [user, convexUser, createOrUpdate]);

  // Fetch sessions
  const sessions = useQuery(
    api.sessions.listByUser,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  // Filter out archived
  const visibleSessions = sessions?.filter((s) => s.status !== "archived") || [];
  const activeSessions = visibleSessions.filter(
    (s) => s.status === "active"
  );
  const completedSessions = visibleSessions.filter(
    (s) => s.status === "completed"
  );

  const handleArchive = async (e: React.MouseEvent, sessionId: string) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    setArchivingId(sessionId);
    try {
      await archiveSession({ sessionId: sessionId as Id<"sessions"> });
    } finally {
      setArchivingId(null);
    }
  };

  const stageLabels: Record<string, string> = {
    problem_validation: "Problem Validation",
    customer_validation: "Customer Validation",
    competitive_positioning: "Competitive Positioning",
    business_model: "Business Model",
    launch_strategy: "Launch Strategy",
  };

  const stageNumber: Record<string, number> = {
    problem_validation: 1,
    customer_validation: 2,
    competitive_positioning: 3,
    business_model: 4,
    launch_strategy: 5,
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-heading font-bold">
          Welcome back, <span className="text-primary">{firstName}</span>
        </h1>
        <p className="text-text-secondary mt-1">
          Ready to forge your next idea?
        </p>
      </div>

      {/* New Session CTA */}
      <Link
        href="/dashboard/new-session"
        className="block p-6 rounded-xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-bg-hover transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-2xl group-hover:bg-primary/20 transition-colors">
            +
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg group-hover:text-primary transition-colors">
              Start a New Session
            </h3>
            <p className="text-text-secondary text-sm">
              Tell us your idea and we&apos;ll guide you to a launch plan
            </p>
          </div>
        </div>
      </Link>

      {/* Active Sessions */}
      {activeSessions.length > 0 && (
        <div>
          <h2 className="text-xl font-heading font-semibold mb-4">
            Active Sessions
          </h2>
          <div className="space-y-3">
            {activeSessions.map((session) => (
              <Link
                key={session._id}
                href={`/dashboard/session/${session._id}`}
                className="block p-5 rounded-xl border border-border bg-bg-surface hover:border-primary/40 hover:bg-bg-elevated transition-all group relative"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-lg truncate group-hover:text-primary transition-colors">
                      {session.ideaTitle}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent bg-accent-muted px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        In Progress
                      </span>
                      <span className="text-xs text-text-muted">
                        Stage {stageNumber[session.currentStage] || 1}/5 &mdash;{" "}
                        {stageLabels[session.currentStage] || "Problem Validation"}
                      </span>
                    </div>
                    {/* Stage progress bar */}
                    <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{
                          width: `${((stageNumber[session.currentStage] || 1) / 5) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-text-muted text-xs whitespace-nowrap">
                      {new Date(session._creationTime).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => handleArchive(e, session._id)}
                      disabled={archivingId === session._id}
                      className="text-xs text-text-muted hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                      title="Archive session"
                    >
                      {archivingId === session._id ? "..." : "Archive"}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Completed Sessions */}
      {completedSessions.length > 0 && (
        <div>
          <h2 className="text-xl font-heading font-semibold mb-4">
            Completed Plans
          </h2>
          <div className="space-y-3">
            {completedSessions.map((session) => (
              <Link
                key={session._id}
                href={`/dashboard/session/${session._id}`}
                className="block p-5 rounded-xl border border-border bg-bg-surface hover:border-primary/40 hover:bg-bg-elevated transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-lg truncate group-hover:text-primary transition-colors">
                      {session.ideaTitle}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        Plan Ready
                      </span>
                      <span className="text-xs text-text-muted">·</span>
                      <span className="text-xs text-primary font-medium">
                        View Documents →
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-text-muted text-xs whitespace-nowrap">
                      {new Date(session._creationTime).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => handleArchive(e, session._id)}
                      disabled={archivingId === session._id}
                      className="text-xs text-text-muted hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                      title="Archive session"
                    >
                      {archivingId === session._id ? "..." : "Archive"}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {visibleSessions.length === 0 && (
        <div>
          <h2 className="text-xl font-heading font-semibold mb-4">
            Your Sessions
          </h2>
          <div className="rounded-xl border border-border bg-bg-surface p-8 text-center">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="font-heading font-semibold text-lg mb-2">
              No sessions yet
            </h3>
            <p className="text-text-secondary text-sm max-w-md mx-auto mb-4">
              Start your first idea session and IdeaForge will walk you through
              validating your concept, analyzing the market, and building a
              launch plan.
            </p>
            <Link
              href="/dashboard/new-session"
              className="inline-flex px-6 py-2.5 bg-primary text-text-inverse font-medium rounded-lg hover:bg-primary-hover transition-colors"
            >
              Start Your First Session
            </Link>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-border bg-bg-surface">
          <p className="text-text-muted text-sm">Sessions Created</p>
          <p className="text-2xl font-heading font-bold text-text mt-1">
            {visibleSessions.length}
          </p>
        </div>
        <div className="p-5 rounded-xl border border-border bg-bg-surface">
          <p className="text-text-muted text-sm">Plans Generated</p>
          <p className="text-2xl font-heading font-bold text-text mt-1">
            {completedSessions.length}
          </p>
        </div>
        <div className="p-5 rounded-xl border border-border bg-bg-surface">
          <p className="text-text-muted text-sm">Free Sessions Left</p>
          <p className="text-2xl font-heading font-bold text-primary mt-1">
            {convexUser?.sessionsRemaining ?? 2}
          </p>
        </div>
      </div>
    </div>
  );
}
