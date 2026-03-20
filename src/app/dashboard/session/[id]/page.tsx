"use client";

import { use, useState, useEffect } from "react";
import { useConversation } from "@/hooks/useConversation";
import { useDocuments } from "@/hooks/useDocuments";
import { useSubscription } from "@/hooks/useSubscription";
import { STAGES } from "@/lib/conversation-framework";
import ConversationThread from "@/components/ConversationThread";
import IdeaProfileCard from "@/components/IdeaProfileCard";
// StageProgress replaced by inline progress in this page
import DocumentViewer from "@/components/DocumentViewer";
import UpgradeModal from "@/components/UpgradeModal";
import SocialShare from "@/components/SocialShare";
import Link from "next/link";
import { Id } from "../../../../../convex/_generated/dataModel";

type ViewMode = "conversation" | "profile" | "documents";

export default function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const sessionId = id as Id<"sessions">;
  const [viewMode, setViewMode] = useState<ViewMode>("conversation");

  const {
    session,
    messages,
    ideaProfile,
    isSending,
    error,
    sendMessage,
    clearError,
    isLoading,
    isCompleted,
  } = useConversation(sessionId);

  const {
    documents,
    isGenerating,
    generationProgress,
    generateDocuments,
    hasDocuments,
  } = useDocuments(sessionId);

  const { isPaid } = useSubscription();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [hasTriggeredGeneration, setHasTriggeredGeneration] = useState(false);

  useEffect(() => {
    if (
      isCompleted &&
      ideaProfile &&
      !hasDocuments &&
      !isGenerating &&
      !hasTriggeredGeneration
    ) {
      setHasTriggeredGeneration(true);
      generateDocuments().catch(console.error);
    }
  }, [isCompleted, ideaProfile, hasDocuments, isGenerating, hasTriggeredGeneration, generateDocuments]);

  // Compute stage progress
  const currentStageNum = session?.currentStage ?? 1;
  const progressPct = isCompleted ? 100 : Math.round(((currentStageNum - 1) / 5) * 100);
  const currentStageName = STAGES.find((s) => s.id === currentStageNum)?.name || "Problem Validation";

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-on-surface-variant text-sm font-body">Loading session...</p>
        </div>
      </div>
    );
  }

  // Session not found
  if (!session) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-4xl text-primary/40 block">search</span>
          <h2 className="font-display font-normal text-lg">Session not found</h2>
          <Link href="/dashboard" className="text-primary text-sm hover:underline font-body">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col" style={{ height: "calc(100svh - 64px)" }}>
      {/* Session goal + progress sub-header */}
      <div className="w-full bg-surface-container-low px-4 pt-5 pb-4 md:px-8 md:pt-10 md:pb-6 border-b border-outline-variant/10">
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-6">
          {/* Top row: back + view toggle */}
          <div className="flex items-center justify-between">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-on-surface/40 hover:text-on-surface transition-colors text-sm font-body"
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
              Dashboard
            </Link>

            {isCompleted && ideaProfile && (
              <div className="flex bg-surface-container rounded-full border border-outline-variant/20 p-1">
                {(["conversation", "profile", "documents"] as ViewMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-3 md:px-4 py-1.5 text-xs font-body font-medium rounded-full capitalize transition-all relative ${
                      viewMode === mode
                        ? "btn-primary"
                        : "text-on-surface/40 hover:text-on-surface"
                    }`}
                  >
                    {mode}
                    {mode === "documents" && hasDocuments && viewMode !== "documents" && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-success rounded-full" />
                    )}
                    {mode === "documents" && isGenerating && viewMode !== "documents" && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Goal display */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-body font-medium">
              Active Session Goal
            </span>
            <h1 className="text-lg md:text-3xl serif-display italic leading-snug text-on-background line-clamp-2 md:line-clamp-none">
              &ldquo;{session.ideaTitle}&rdquo;
            </h1>
          </div>

          {/* Progress bar */}
          <div className="relative w-full h-[2px] bg-surface-container-highest rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-1000"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] uppercase tracking-widest text-on-background/40 font-bold font-body">
            <span>
              {isCompleted ? "Session Complete" : `Phase 0${currentStageNum}: ${currentStageName}`}
            </span>
            <span>{progressPct}% Complete</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden min-h-0">
        {viewMode === "documents" ? (
          <DocumentViewer
            documents={documents}
            isGenerating={isGenerating}
            generationProgress={generationProgress}
            isPaid={isPaid}
            onUpgradeClick={() => setShowUpgradeModal(true)}
          />
        ) : viewMode === "profile" && ideaProfile ? (
          <div className="overflow-y-auto h-full px-4 py-6">
            <div className="max-w-2xl mx-auto">
              <IdeaProfileCard
                profile={ideaProfile}
                sessionId={id}
                onViewDocuments={() => setViewMode("documents")}
              />
            </div>
          </div>
        ) : (
          <ConversationThread
            messages={messages}
            isSending={isSending}
            isCompleted={isCompleted}
            onSendMessage={sendMessage}
            error={error}
            onClearError={clearError}
            currentStage={currentStageNum}
          />
        )}
      </div>

      {/* Bottom banners */}
      {isCompleted && !ideaProfile && (
        <div className="px-6 py-4 border-t border-outline-variant/10 bg-surface-container-low text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-on-surface-variant font-body">Generating your idea profile...</p>
          </div>
        </div>
      )}

      {isCompleted && ideaProfile && viewMode === "conversation" && (
        <div className="px-6 py-4 border-t border-outline-variant/10 bg-surface-container-low flex items-center justify-center gap-6">
          <button
            onClick={() => setViewMode("profile")}
            className="text-sm text-primary font-medium hover:underline font-body"
          >
            View Idea Profile
          </button>
          <span className="text-outline text-xs">|</span>
          <button
            onClick={() => setViewMode("documents")}
            className="text-sm text-primary font-medium hover:underline flex items-center gap-1.5 font-body"
          >
            {isGenerating ? (
              <>
                <span className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                Documents generating...
              </>
            ) : hasDocuments ? (
              "View Documents →"
            ) : (
              "Generate Documents"
            )}
          </button>
        </div>
      )}

      {isCompleted && ideaProfile && viewMode === "profile" && (
        <div className="px-6 py-4 border-t border-outline-variant/10 bg-surface-container-low text-center">
          <button
            onClick={() => setViewMode("documents")}
            className="text-sm text-primary font-medium hover:underline flex items-center justify-center gap-1.5 font-body"
          >
            {isGenerating ? (
              <>
                <span className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                Documents generating...
              </>
            ) : hasDocuments ? (
              "View Your Documents →"
            ) : (
              "Generate Business Documents →"
            )}
          </button>
        </div>
      )}

      {isCompleted && hasDocuments && viewMode === "documents" && (
        <div className="px-6 py-4 border-t border-outline-variant/10 bg-surface-container-low">
          <SocialShare ideaTitle={session.ideaTitle} />
        </div>
      )}

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        reason="pdf_export"
      />
    </div>
  );
}
