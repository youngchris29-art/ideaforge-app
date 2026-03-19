"use client";

import { useState, useCallback } from "react";
import { useQuery, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export function useDocuments(sessionId: Id<"sessions">) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Real-time query for documents
  const documents = useQuery(api.documents.getBySession, { sessionId });
  const ideaProfile = useQuery(api.ideaProfiles.getBySession, { sessionId });

  // Actions
  const generateAllAction = useAction(api.ai.generateAllDocuments);

  const generateDocuments = useCallback(async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setError(null);
    setGenerationProgress(0);

    // Start a progress simulation (since we can't track real progress from the action)
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 95) return prev;
        // Simulate gradual progress over ~3 minutes
        return prev + (100 - prev) * 0.05;
      });
    }, 3000);

    try {
      const result = await generateAllAction({ sessionId });
      setGenerationProgress(100);

      if (result.status === "already_generated") {
        // Documents already exist
        return result;
      }

      return result;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to generate documents. Please try again.";
      setError(message);
      throw err;
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
    }
  }, [sessionId, isGenerating, generateAllAction]);

  const clearError = useCallback(() => setError(null), []);

  const hasDocuments = (documents?.length ?? 0) > 0;
  const documentCount = documents?.length ?? 0;
  const totalDocuments = 6;

  return {
    documents: documents ?? [],
    ideaProfile,
    isGenerating,
    generationProgress,
    error,
    generateDocuments,
    clearError,
    hasDocuments,
    documentCount,
    totalDocuments,
    isLoading: documents === undefined,
  };
}
