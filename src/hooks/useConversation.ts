"use client";

import { useState, useCallback } from "react";
import { useQuery, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export function useConversation(sessionId: Id<"sessions">) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Real-time queries
  const session = useQuery(api.sessions.getById, { sessionId });
  const messages = useQuery(api.messages.listBySession, { sessionId });
  const ideaProfile = useQuery(api.ideaProfiles.getBySession, { sessionId });

  // Actions
  const chatAction = useAction(api.ai.chat);
  const generateProfileAction = useAction(api.ai.generateIdeaProfile);
  const getFirstMessageAction = useAction(api.ai.getFirstMessage);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!session || isSending || !content.trim()) return;

      setIsSending(true);
      setError(null);

      try {
        const result = await chatAction({
          sessionId,
          userMessage: content.trim(),
          currentStage: session.currentStage,
        });

        // If conversation is complete, generate idea profile
        if (result.conversationComplete) {
          try {
            await generateProfileAction({ sessionId });
          } catch (err) {
            console.error("Failed to generate idea profile:", err);
          }
        }

        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong. Please try again.";
        setError(message);
        throw err;
      } finally {
        setIsSending(false);
      }
    },
    [session, sessionId, isSending, chatAction, generateProfileAction]
  );

  const startConversation = useCallback(
    async (ideaDescription: string) => {
      setIsSending(true);
      setError(null);

      try {
        const result = await getFirstMessageAction({
          sessionId,
          ideaDescription,
        });
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to start conversation.";
        setError(message);
        throw err;
      } finally {
        setIsSending(false);
      }
    },
    [sessionId, getFirstMessageAction]
  );

  const clearError = useCallback(() => setError(null), []);

  return {
    session,
    messages: messages ?? [],
    ideaProfile,
    isSending,
    error,
    sendMessage,
    startConversation,
    clearError,
    isLoading: session === undefined || messages === undefined,
    isCompleted: session?.status === "completed",
  };
}
