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

  const sessions = useQuery(
    api.sessions.listByUser,
    convexUser?._id ? { userId: convexUser._id } : "skip"
  );

  const visibleSessions = sessions?.filter((s) => s.status !== "archived") || [];
  const activeSessions = visibleSessions.filter((s) => s.status === "active");
  const completedSessions = visibleSessions.filter((s) => s.status === "completed");

  const handleArchive = async (e: React.MouseEvent, sessionId: string) => {
    e.preventDefault();
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

  const stageIcons: Record<string, string> = {
    problem_validation: "auto_awesome",
    customer_validation: "people",
    competitive_positioning: "analytics",
    business_model: "account_balance",
    launch_strategy: "rocket_launch",
  };

  return (
    <div className="max-w-7xl mx-auto px-8 pt-20 pb-32">
      {/* Welcome Header */}
      <header className="mb-16">
        <h1 className="font-display text-on-surface text-6xl md:text-7xl leading-tight font-light italic">
          Welcome back, {firstName}
        </h1>
        <p className="font-body text-on-surface/40 text-sm tracking-widest uppercase mt-4">
          Curating your intellectual workspace
        </p>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left column */}
        <section className="md:col-span-4 flex flex-col gap-8">
          {/* New Session card */}
          <Link
            href="/dashboard/new-session"
            className="group relative bg-surface-container-low border border-outline-variant/20 p-8 rounded-xl hover:bg-surface-container transition-all duration-500 flex flex-col justify-between min-h-[320px] cursor-pointer"
          >
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-6 block">add_circle</span>
              <h2 className="font-display text-2xl text-on-surface mb-2">New Session</h2>
              <p className="font-body text-on-surface/60 text-sm leading-relaxed">
                Initialize a fresh environment for creative synthesis or research analysis.
              </p>
            </div>
            <div className="flex items-center gap-2 text-primary font-body text-xs tracking-widest uppercase font-bold group-hover:gap-4 transition-all">
              <span>Begin curation</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </div>
          </Link>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Sessions", value: visibleSessions.length },
              { label: "Plans", value: completedSessions.length },
              { label: "Free Left", value: convexUser?.sessionsRemaining ?? 2, highlight: true },
            ].map(({ label, value, highlight }) => (
              <div key={label} className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10 text-center">
                <p className={`text-2xl font-display font-light ${highlight ? "text-primary" : "text-on-surface"}`}>
                  {value}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-on-surface/40 mt-1 font-body">{label}</p>
              </div>
            ))}
          </div>

          {/* Curator's Tip */}
          <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10">
            <h3 className="font-display text-lg text-primary italic mb-4">Curator&apos;s Tip</h3>
            <p className="font-body text-sm text-on-surface/50 leading-relaxed italic">
              &ldquo;Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn&apos;t really do it, they just saw something.&rdquo;
            </p>
          </div>
        </section>

        {/* Right column — Sessions */}
        <section className="md:col-span-8">
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="font-display text-2xl text-on-surface">Active Sessions</h2>
            <button className="text-on-surface/40 hover:text-primary font-body text-xs tracking-widest uppercase transition-colors">
              View All Archive
            </button>
          </div>

          {visibleSessions.length === 0 ? (
            <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-primary/40 mb-4 block">lightbulb</span>
              <h3 className="font-display text-xl mb-2">No sessions yet</h3>
              <p className="text-on-surface-variant text-sm max-w-md mx-auto mb-6 font-body">
                Start your first idea session and IdeaForge will walk you through validating your concept, analyzing the market, and building a launch plan.
              </p>
              <Link href="/dashboard/new-session" className="btn-primary inline-flex px-6 py-2.5">
                Start Your First Session
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {activeSessions.map((session) => (
                <Link
                  key={session._id}
                  href={`/dashboard/session/${session._id}`}
                  className="group flex items-center justify-between p-6 bg-surface-container-low rounded-lg border border-transparent hover:border-outline-variant/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-surface-container-high rounded text-primary shrink-0">
                      <span className="material-symbols-outlined">
                        {stageIcons[session.currentStage] || "auto_awesome"}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-body font-medium text-on-surface truncate max-w-[260px]">
                        {session.ideaTitle}
                      </h4>
                      <p className="font-body text-xs text-on-surface/40 mt-1">
                        Stage {stageNumber[session.currentStage] || 1}/5 &mdash;{" "}
                        {stageLabels[session.currentStage] || "Problem Validation"}
                      </p>
                      <div className="mt-2 h-0.5 w-40 bg-surface-container-highest overflow-hidden rounded-none">
                        <div
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${((stageNumber[session.currentStage] || 1) / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold tracking-widest uppercase rounded-full">
                      <span className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                      In Progress
                    </span>
                    <button
                      onClick={(e) => handleArchive(e, session._id)}
                      disabled={archivingId === session._id}
                      className="text-on-surface/20 hover:text-error transition-colors opacity-0 group-hover:opacity-100 text-xs font-body"
                      title="Archive session"
                    >
                      {archivingId === session._id ? "..." : "Archive"}
                    </button>
                  </div>
                </Link>
              ))}

              {completedSessions.map((session) => (
                <Link
                  key={session._id}
                  href={`/dashboard/session/${session._id}`}
                  className="group flex items-center justify-between p-6 bg-surface-container-low rounded-lg border border-transparent hover:border-outline-variant/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-surface-container-high rounded text-primary shrink-0">
                      <span className="material-symbols-outlined">description</span>
                    </div>
                    <div>
                      <h4 className="font-body font-medium text-on-surface truncate max-w-[260px]">
                        {session.ideaTitle}
                      </h4>
                      <p className="font-body text-xs text-on-surface/40 mt-1">
                        {new Date(session._creationTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest text-on-surface/40 text-[10px] font-bold tracking-widest uppercase rounded-full">
                      Plan Ready
                    </span>
                    <button
                      onClick={(e) => handleArchive(e, session._id)}
                      disabled={archivingId === session._id}
                      className="text-on-surface/20 hover:text-error transition-colors opacity-0 group-hover:opacity-100 text-xs font-body"
                      title="Archive session"
                    >
                      {archivingId === session._id ? "..." : "Archive"}
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
