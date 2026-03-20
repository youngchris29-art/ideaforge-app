"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const joinWaitlist = useMutation(api.waitlist.join);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    try {
      await joinWaitlist({ email: email.trim() });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="inline-flex items-center gap-2 px-6 py-3 bg-success/8 border border-hairline rounded-md text-success text-sm font-medium">
        <span>✓</span> You&apos;re on the list! We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="w-full sm:flex-1 px-4 py-3 bg-surface-container-low border border-hairline rounded-md text-on-surface text-sm placeholder:text-on-surface-variant focus:border-primary focus:ring-0 outline-none transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full sm:w-auto px-6 py-3 text-sm disabled:opacity-50 whitespace-nowrap"
      >
        {status === "loading" ? "Joining..." : "Get Early Access"}
      </button>
      {status === "error" && (
        <p className="text-xs text-error">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
