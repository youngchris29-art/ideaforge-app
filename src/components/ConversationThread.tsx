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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

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
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-6 md:px-6 md:py-12 space-y-6 md:space-y-10">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex flex-col ${message.role === "user" ? "items-end self-end max-w-md ml-auto" : "items-start max-w-2xl"} group`}
          >
            {/* Label row */}
            <div className={`flex items-center gap-3 mb-3 ${message.role === "user" ? "justify-end" : ""}`}>
              {message.role === "assistant" && (
                <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: "14px" }}>auto_awesome</span>
                </div>
              )}
              <span
                className={`text-[10px] uppercase tracking-widest font-bold font-body ${
                  message.role === "assistant" ? "text-primary" : "text-on-surface/40"
                }`}
              >
                {message.role === "user" ? "You" : "IdeaForge"}
              </span>
            </div>

            {/* Bubble */}
            <div
              className={`leading-relaxed text-sm md:text-base whitespace-pre-wrap ${
                message.role === "user"
                  ? "p-5 bg-surface-container-highest rounded-xl text-on-surface/90"
                  : "p-6 bg-surface-container-low border border-outline-variant/10 rounded-xl text-on-surface/90"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isSending && (
          <div className="flex flex-col items-start max-w-2xl group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary" style={{ fontSize: "14px" }}>auto_awesome</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold font-body">IdeaForge</span>
            </div>
            <div className="p-6 bg-surface-container-low border border-outline-variant/10 rounded-xl">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0ms]" />
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:150ms]" />
                <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex justify-center">
            <div className="bg-error-container/20 border border-error/20 rounded-xl px-6 py-4 max-w-md text-center">
              <p className="text-sm text-error">{error}</p>
              <button onClick={onClearError} className="text-xs text-error/70 hover:text-error mt-2 underline">
                Dismiss
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Conversation tips */}
      {!isCompleted && !isSending && showTips && userMessagesCount > 0 && (
        <ConversationTips currentStage={currentStage} onSuggestionClick={handleSuggestionClick} />
      )}

      {/* Completed banner */}
      {isCompleted && (
        <div className="border-t border-outline-variant/10 bg-surface-container-low px-6 py-4 text-center">
          <p className="text-sm text-on-surface-variant font-body">
            This session is complete. View your Idea Profile above.
          </p>
        </div>
      )}

      {/* Input area */}
      {!isCompleted && (
        <div className="sticky bottom-0 w-full bg-gradient-to-t from-background via-background/95 to-transparent pt-6 pb-4 px-4 md:pt-12 md:pb-8 md:px-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              {/* Input container */}
              <div className="relative flex items-center bg-surface-container-high border border-outline-variant/40 rounded-xl p-2 pl-6 focus-within:border-primary/70 focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Inquire further or define your preference..."
                  disabled={isSending}
                  rows={1}
                  className="w-full bg-transparent border-none focus:ring-0 text-sm text-on-surface placeholder:text-on-surface/30 py-3 outline-none resize-none disabled:opacity-50"
                  maxLength={2000}
                />
                <div className="flex items-center gap-2 pr-2 shrink-0">
                  {input.length > 1500 && (
                    <span className="text-xs text-on-surface-variant">{input.length}/2000</span>
                  )}
                  <button
                    type="submit"
                    disabled={!input.trim() || isSending}
                    className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span>{isSending ? "..." : "Send"}</span>
                    {!isSending && (
                      <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>north_east</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
            <p className="text-[9px] text-center mt-4 uppercase tracking-[0.3em] text-on-surface/20 font-bold font-body">
              Curated Intelligence for Intellectual Labor • Press Enter to send
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
