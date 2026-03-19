"use client";

import { useRef, useEffect, useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import ConversationTips from "./ConversationTips";

interface ConversationThreadProps {
  messages: Doc<"messages">[];
  isSending: boolean;
  isCompleted: boolean;
  onSendMessage: (content: string) => void;
  error: string | null;
  onClearError: () => void;
  currentStage?: number;
}

export default function ConversationThread({
  messages,
  isSending,
  isCompleted,
  onSendMessage,
  error,
  onClearError,
  currentStage = 1,
}: ConversationThreadProps) {
  const [input, setInput] = useState("");
  const [showTips, setShowTips] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  // Hide tips after user sends a message in the current stage
  const userMessagesCount = messages.filter((m) => m.role === "user").length;
  useEffect(() => {
    setShowTips(true);
  }, [currentStage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending || isCompleted) return;

    onSendMessage(input.trim());
    setInput("");
    setShowTips(false);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowTips(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 ${
                message.role === "user"
                  ? "bg-primary/15 text-text border border-primary/20"
                  : "bg-bg-elevated text-text border border-border"
              }`}
            >
              {/* Role label */}
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-xs font-semibold ${
                    message.role === "user" ? "text-primary" : "text-secondary-light"
                  }`}
                >
                  {message.role === "user" ? "You" : "IdeaForge"}
                </span>
              </div>

              {/* Message content */}
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </div>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isSending && (
          <div className="flex justify-start">
            <div className="bg-bg-elevated border border-border rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-secondary-light">
                  IdeaForge
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0ms]" />
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:150ms]" />
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="flex justify-center">
            <div className="bg-error-bg border border-error/20 rounded-xl px-4 py-3 max-w-md text-center">
              <p className="text-sm text-error">{error}</p>
              <button
                onClick={onClearError}
                className="text-xs text-error/70 hover:text-error mt-1 underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Conversation tips */}
      {!isCompleted && !isSending && showTips && userMessagesCount > 0 && (
        <ConversationTips
          currentStage={currentStage}
          onSuggestionClick={handleSuggestionClick}
        />
      )}

      {/* Completed banner */}
      {isCompleted && (
        <div className="border-t border-border bg-bg-surface/50 px-4 py-3 text-center">
          <p className="text-sm text-text-secondary">
            This session is complete. View your Idea Profile above.
          </p>
        </div>
      )}

      {/* Input area */}
      {!isCompleted && (
        <div className="border-t border-border bg-bg-surface/50 px-2 sm:px-4 py-2 sm:py-3 safe-area-bottom">
          <form onSubmit={handleSubmit} className="flex items-end gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Share your thoughts..."
                disabled={isSending}
                rows={1}
                className="w-full px-3 sm:px-4 py-2.5 bg-bg-elevated border border-border rounded-xl text-text text-sm placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none disabled:opacity-50"
                maxLength={2000}
              />
              {input.length > 1500 && (
                <span className="absolute right-3 bottom-2 text-xs text-text-muted">
                  {input.length}/2000
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className="px-3 sm:px-4 py-2.5 bg-primary text-text-inverse font-medium rounded-xl hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm flex-shrink-0"
            >
              {isSending ? "..." : "Send"}
            </button>
          </form>
          <p className="text-xs text-text-muted mt-1.5 px-1 hidden sm:block">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      )}
    </div>
  );
}
