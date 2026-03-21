import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Help & FAQ — IdeaForge",
  description: "Find answers to common questions about IdeaForge — how sessions work, pricing, data privacy, and more.",
};

function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="p-5 rounded-md border border-hairline bg-surface-container-low">
      <h3 className="font-display font-semibold text-sm mb-2">{question}</h3>
      <p className="text-on-surface-variant text-sm leading-relaxed">{answer}</p>
    </div>
  );
}

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Header />
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-10">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold mb-3">Help & FAQ</h1>
          <p className="text-on-surface-variant text-lg">Everything you need to know about IdeaForge.</p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold">Getting Started</h2>
          <FaqItem
            question="How long does a session take?"
            answer="Most sessions take about 30-45 minutes. The AI will guide you through 5 stages of conversation — problem validation, customer validation, competitive positioning, business model, and launch strategy. You can pause and come back anytime."
          />
          <FaqItem
            question="Do I need business experience?"
            answer="Not at all. IdeaForge is built for first-time founders who have never written a business plan before. The AI asks simple questions in plain language and handles all the business analysis for you."
          />
          <FaqItem
            question="What documents do I get?"
            answer="After completing a session, IdeaForge generates 6 personalized documents: a one-pager, product roadmap, go-to-market strategy, market analysis, competitive landscape, and elevator pitch. All are formatted and ready to share."
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold">Pricing & Billing</h2>
          <FaqItem
            question="Can I try IdeaForge for free?"
            answer="Yes! You get 2 full sessions on the free plan — that's 2 complete conversations with all 6 business documents generated. No credit card required."
          />
          <FaqItem
            question="What happens after my 2 free sessions?"
            answer="You'll still have access to your completed sessions and documents. To start new sessions, upgrade to Pro for $15/month — unlimited sessions, PDF exports, and shareable document links."
          />
          <FaqItem
            question="How do I cancel my subscription?"
            answer="You can cancel anytime from your Account page. Click 'Manage Subscription' to access the billing portal. You'll keep Pro access until the end of your billing period. No cancellation fees."
          />
          <FaqItem
            question="What payment methods do you accept?"
            answer="We use Polar for payments, which supports all major credit and debit cards. Your payment info is handled securely — we never see your card details."
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold">Privacy & Data</h2>
          <FaqItem
            question="Is my data private?"
            answer="Yes. Your ideas and conversations are private to your account. We don't share, sell, or use your ideas for any purpose other than generating your documents. See our Privacy Policy for details."
          />
          <FaqItem
            question="Can I delete my data?"
            answer="Yes. You can archive individual sessions from the dashboard. For full account deletion, contact us at support@ideaforgeapp.net and we'll delete everything within 48 hours."
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-display font-semibold">Using Your Documents</h2>
          <FaqItem
            question="What can I do with my documents?"
            answer="They're yours! Share them with co-founders, mentors, investors, or use them as the foundation for your business plan. Pro users can export as PDF and share via unique links."
          />
          <FaqItem
            question="Can I edit my documents after they're generated?"
            answer="Currently, documents are generated based on your conversation and can't be edited directly in IdeaForge. You can copy the markdown content and edit it in any text editor or document tool."
          />
        </div>

        {/* Contact */}
        <div className="p-6 rounded-md border border-hairline bg-surface-container-low text-center space-y-3">
          <h2 className="font-display font-semibold text-lg">Still have questions?</h2>
          <p className="text-on-surface-variant text-sm">We&apos;re building IdeaForge for founders like you. Reach out anytime.</p>
          <a
            href="mailto:support@ideaforgeapp.net"
            className="inline-block px-6 py-2.5 bg-primary text-surface font-medium rounded-md hover:bg-primary-hover transition-colors text-sm"
          >
            Contact Support
          </a>
        </div>

        <div className="text-center">
          <Link href="/" className="text-sm text-primary hover:text-primary-light transition-colors">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
