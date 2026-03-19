import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-heading font-bold mb-2">
          Page not found
        </h1>
        <p className="text-text-secondary mb-6">
          This page doesn&apos;t exist. Maybe the URL is wrong, or the page was
          moved.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex px-6 py-2.5 bg-primary text-text-inverse font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
