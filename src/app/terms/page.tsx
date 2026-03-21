import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Terms of Service — IdeaForge",
  description: "Terms and conditions for using IdeaForge.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold mb-2">Terms of Service</h1>
          <p className="text-on-surface-variant text-sm">Last updated: March 2026</p>
        </div>

        <div className="space-y-6 text-sm text-on-surface-variant leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Acceptance of Terms</h2>
            <p>By creating an account or using IdeaForge, you agree to these terms of service. If you do not agree, please do not use the service.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">The Service</h2>
            <p>IdeaForge is an AI-powered tool that helps users analyze business ideas through guided conversations and generates business planning documents. The service is provided &quot;as is&quot; and is intended for informational and planning purposes only.</p>
            <p>IdeaForge does not provide professional business, legal, or financial advice. The AI-generated documents and analysis should be used as a starting point — not as a substitute for professional consultation.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Your Account</h2>
            <p>You are responsible for maintaining the security of your account and for all activities that occur under your account. You must provide accurate information when creating your account.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Your Content</h2>
            <p>You retain full ownership of your ideas, conversations, and any content you provide to IdeaForge. We do not claim any intellectual property rights over your content.</p>
            <p>By using the service, you grant IdeaForge a limited license to process your content solely for the purpose of providing the service (generating documents and analysis).</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Acceptable Use</h2>
            <p>You agree not to use IdeaForge to generate content that is illegal, harmful, fraudulent, or infringes on the rights of others. We reserve the right to terminate accounts that violate these terms.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Subscriptions & Payments</h2>
            <p>Free accounts include 2 idea sessions. Pro subscriptions are billed monthly at $15/month through our payment provider, Polar. You can cancel anytime from your account settings — access continues until the end of the billing period.</p>
            <p>We reserve the right to change pricing with 30 days notice to existing subscribers.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Limitation of Liability</h2>
            <p>IdeaForge is provided &quot;as is&quot; without warranties of any kind. We are not liable for any damages arising from your use of the service, including but not limited to business decisions made based on AI-generated content.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of the service after changes constitutes acceptance of the new terms. We will notify users of significant changes via email.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-display font-semibold text-on-surface">Contact</h2>
            <p>Questions about these terms? Contact us at <a href="mailto:support@ideaforgeapp.net" className="text-primary hover:text-primary-light">support@ideaforgeapp.net</a>.</p>
          </section>
        </div>

        <div className="text-center pt-4">
          <Link href="/" className="text-sm text-primary hover:text-primary-light transition-colors">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
