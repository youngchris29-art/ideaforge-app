// Privacy-first analytics using Convex
// No cookies, no third-party tracking, no PII collection
// Just simple event tracking to understand feature usage

export type AnalyticsEvent =
  | "page_view"
  | "session_started"
  | "session_completed"
  | "document_viewed"
  | "document_copied"
  | "document_downloaded"
  | "upgrade_clicked"
  | "waitlist_joined"
  | "share_clicked";

export function trackEvent(event: AnalyticsEvent, data?: Record<string, string | number>) {
  // We'll fire this client-side; the actual tracking happens via Convex mutation
  // This is a helper that formats the data
  return {
    event,
    data: data ? JSON.stringify(data) : undefined,
    timestamp: Date.now(),
  };
}
