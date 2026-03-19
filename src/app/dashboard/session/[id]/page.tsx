"use client";

import { use, useState, useEffect } from "react";
import { useConversation } from "@/hooks/useConversation";
import { useDocuments } from "@/hooks/useDocuments";
import { useSubscription } from "@/hooks/useSubscription";
import ConversationThread from "@/components/ConversationThread";
import StageProgress from "@/components/StageProgress";
import IdeaProfileCard from "@/components/IdeaProfileCard";
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

  // Auto-generate documents when session completes and profile is ready
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

  // Auto-switch to documents view when documents become available
  useEffect(() => {
    if (hasDocuments && viewMode === "conversation" && isCompleted) {
      // Don't auto-switch — let the user decide via the banner
    }
  }, [hasDocuments, viewMode, isCompleted]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-text-secondary text-sm">Loading session...</p>
        </div>
      </div>
    );
  }

  // Session not found
  if (!session) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center space-y-3">
          <div className="text-4xl">🔍</div>
          <h2 className="font-heading font-semibold text-lg">Session not found</h2>
          <Link
            href="/dashboard"
            className="text-primary text-sm hover:underline"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-73px)]">
      {/* Session header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-text-secondary hover:text-text transition-colors text-sm"
          >
            &larr;
          </Link>
          <div>
            <h1 className="font-heading font-semibold text-sm truncate max-w-[250px] md:max-w-none">
              {session.ideaTitle}
            </h1>
            <p className="text-xs text-text-muted">
              {isCompleted ? "Completed" : "In progress"}
            </p>
          </div>
        </div>

        {/* View toggle (only when completed with profile) */}
        {isCompleted && ideaProfile && (
          <div className="flex bg-bg-elevated rounded-lg border border-border">
            <button
              onClick={() => setViewMode("conversation")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                viewMode === "conversation"
                  ? "bg-primary text-text-inverse"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              Conversation
            </button>
            <button
              onClick={() => setViewMode("profile")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                viewMode === "profile"
                  ? "bg-primary text-text-inverse"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setViewMode("documents")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors relative ${
                viewMode === "documents"
                  ? "bg-primary text-text-inverse"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              Documents
              {hasDocuments && viewMode !== "documents" && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full" />
              )}
              {isGenerating && viewMode !== "documents" && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Stage progress */}
      {viewMode !== "documents" && (
        <StageProgress
          currentStage={session.currentStage}
          isCompleted={isCompleted}
        />
      )}

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
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
            currentStage={session.currentStage}
          />
        )}
      </div>

      {/* Bottom banners */}
      {isCompleted && !ideaProfile && (
        <div className="px-4 py-3 border-t border-border bg-primary/5 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-text-secondary">
              Generating your idea profile...
            </p>
          </div>
        </div>
      )}

      {isCompleted && ideaProfile && viewMode === "conversation" && (
        <div className="px-4 py-3 border-t border-border bg-primary/5 text-center flex items-center justify-center gap-4">
          <button
            onClick={() => setViewMode("profile")}
            className="text-sm text-primary font-medium hover:underline"
          >
            View Idea Profile
          </button>
          <span className="text-text-muted text-xs">|</span>
          <button
            onClick={() => setViewMode("documents")}
            className="text-sm text-primary font-medium hover:underline flex items-center gap-1.5"
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
        <div className="px-4 py-3 border-t border-border bg-primary/5 text-center">
          <button
            onClick={() => setViewMode("documents")}
            className="text-sm text-primary font-medium hover:underline flex items-center justify-center gap-1.5"
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

      {/* Social sharing for completed sessions */}
      {isCompleted && hasDocuments && viewMode === "documents" && (
        <div className="px-4 py-4 border-t border-border bg-bg-surface/50">
          <SocialShare ideaTitle={session.ideaTitle} />
        </div>
      )}

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        reason="pdf_export"
      />
    </div>
  );
}
