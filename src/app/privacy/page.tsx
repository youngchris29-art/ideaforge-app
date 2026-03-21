import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Privacy Policy — IdeaForge",
  description: "How IdeaForge collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Privacy Policy</h1>
          <p className="text-on-surface-variant text-sm">Last updated: March 2026</p>
        </div>

        <div className="space-y-6 text-sm text-on-surface-variant leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">What We Collect</h2>
            <p>When you create an account, we collect your name and email address through our authentication provider (Clerk). When you use IdeaForge, we store your conversation messages and generated documents so you can access them later.</p>
            <p>We also collect basic usage analytics (page views, feature usage) using privacy-first analytics that does not use cookies or track you across the web.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">How We Use Your Data</h2>
            <p>Your data is used to provide and improve the IdeaForge service. Specifically, we use your conversation data to generate personalized business documents during your session. We do not use your ideas, conversations, or documents for any other purpose.</p>
            <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Your Ideas Are Private</h2>
            <p>Your business ideas and session content are private to your account. We do not access, review, or use your ideas for any purpose other than providing the service. Your conversations are processed by AI to generate documents — this happens in real-time and is not stored beyond your account.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Third-Party Services</h2>
            <p>IdeaForge uses the following third-party services to operate:</p>
            <div className="space-y-1 pl-4">
              <p><strong className="text-on-surface">Clerk</strong> — Authentication and user management</p>
              <p><strong className="text-on-surface">Convex</strong> — Database and backend infrastructure</p>
              <p><strong className="text-on-surface">Anthropic (Claude)</strong> — AI conversation processing</p>
              <p><strong className="text-on-surface">Polar</strong> — Payment processing</p>
              <p><strong className="text-on-surface">Vercel</strong> — Web hosting</p>
            </div>
            <p>Each of these services has their own privacy policies and data handling practices.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Data Retention & Deletion</h2>
            <p>Your data is retained as long as your account is active. You can archive individual sessions from the dashboard at any time. For full account and data deletion, contact us at <a href="mailto:support@ideaforgeapp.net" className="text-primary hover:text-primary-light">support@ideaforgeapp.net</a> and we will delete all your data within 48 hours.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Cookies</h2>
            <p>IdeaForge uses only essential cookies required for authentication and session management. We do not use tracking cookies, advertising cookies, or any non-essential cookies.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Contact</h2>
            <p>If you have questions about this privacy policy or your data, contact us at <a href="mailto:support@ideaforgeapp.net" className="text-primary hover:text-primary-light">support@ideaforgeapp.net</a>.</p>
          </section>
        </div>

        <div className="text-center pt-4">
          <Link href="/" className="text-sm text-primary hover:text-primary-light transition-colors">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
