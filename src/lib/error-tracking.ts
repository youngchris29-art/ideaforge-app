// Lightweight error tracking using Convex analytics table
// In production, this would be replaced with Sentry or similar
// For now, errors are logged to the analytics table for the admin dashboard

export function captureError(error: Error, context?: Record<string, string>) {
  console.error("[IdeaForge Error]", error.message, context);

  // In production: Sentry.captureException(error, { extra: context })
  // For now, errors are logged to console and can be viewed in admin dashboard
  // via the analytics table with event = "client_error"

  return {
    event: "client_error" as const,
    data: JSON.stringify({
      message: error.message,
      stack: error.stack?.slice(0, 500),
      ...context,
    }),
  };
}
