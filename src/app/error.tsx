"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚡</div>
        <h1 className="text-2xl font-heading font-bold mb-2">
          Something went wrong
        </h1>
        <p className="text-text-secondary mb-6">
          We hit a snag. Don&apos;t worry — your data is safe. Try again or head
          back to the dashboard.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-primary text-text-inverse font-medium rounded-lg hover:bg-primary-hover transition-colors"
          >
            Try Again
          </button>
          <a
            href="/dashboard"
            className="px-6 py-2.5 border border-border text-text rounded-lg hover:bg-bg-hover transition-colors"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
