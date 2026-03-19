import Link from "next/link";
import type { Metadata } from "next";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "IdeaForge — From Idea to Launch Plan in One Conversation",
  description:
    "AI-powered business advisor that transforms your raw startup idea into a validated launch plan with a product roadmap, GTM strategy, and competitive analysis in 45 minutes.",
  openGraph: {
    title: "IdeaForge — From Idea to Launch Plan in One Conversation",
    description:
      "AI-powered business advisor that transforms your raw startup idea into a validated launch plan in 45 minutes.",
    type: "website",
    url: "https://ideaforge.app",
    siteName: "IdeaForge",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IdeaForge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IdeaForge — From Idea to Launch Plan in One Conversation",
    description:
      "AI-powered business advisor that transforms your raw startup idea into a validated launch plan in 45 minutes.",
    images: ["/og-image.png"],
  },
};

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl border border-border bg-bg-surface hover:border-primary/30 hover:bg-bg-elevated transition-all group">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-heading font-bold text-lg shrink-0">
        {number}
      </div>
      <div>
        <h3 className="font-heading font-semibold text-base mb-1">{title}</h3>
        <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-heading font-bold text-primary">IdeaForge</Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/pricing" className="text-sm text-text-secondary hover:text-text transition-colors hidden sm:inline">Pricing</Link>
            <Link href="/help" className="text-sm text-text-secondary hover:text-text transition-colors hidden sm:inline">FAQ</Link>
            <Link href="/auth/sign-in" className="text-sm text-text-secondary hover:text-text transition-colors">Sign In</Link>
            <Link href="/auth/sign-up" className="px-4 py-2 bg-primary text-text-inverse font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm">Get Started Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-muted text-accent rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            AI-Powered Idea Validation
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight">
            From idea to <span className="text-primary">launch plan</span>
            <br className="hidden sm:block" /> in one conversation
          </h1>

          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            IdeaForge is an AI business advisor that asks the right questions in the right order — transforming your raw idea into a validated business blueprint with a roadmap, GTM strategy, and competitive analysis.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/auth/sign-up" className="w-full sm:w-auto px-8 py-3.5 bg-primary text-text-inverse font-semibold rounded-xl hover:bg-primary-hover transition-all text-lg shadow-glow hover:shadow-lg text-center">
              Start Your Free Session
            </Link>
            <p className="text-sm text-text-muted">No credit card required — 2 free sessions</p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-text-muted text-sm">
            <span>45 min to clarity</span>
            <span className="hidden sm:inline w-1 h-1 bg-border rounded-full" />
            <span>6 personalized documents</span>
            <span className="hidden sm:inline w-1 h-1 bg-border rounded-full" />
            <span>Investor-ready output</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-16 md:py-24 bg-bg-surface/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">How it works</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">45 minutes from raw idea to actionable launch plan. No templates, no jargon, no prior experience needed.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <StepCard number={1} title="Share your idea" description="Start a conversation and tell IdeaForge about your concept. No pitch deck needed — just your raw idea and enthusiasm." />
            <StepCard number={2} title="Answer smart questions" description="Our AI asks the right questions to deeply understand your idea — target audience, market gaps, revenue model, and launch constraints." />
            <StepCard number={3} title="Get your launch plan" description="Receive 6 personalized business documents: one-pager, product roadmap, GTM strategy, market analysis, competitive landscape, and elevator pitch." />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Everything you need to go from idea to action</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">Built for first-time founders who are serious about execution.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard icon="🧠" title="Smart Qualifying Questions" description="Not a chatbot — our AI asks progressively deeper questions that adapt based on your responses, probing blind spots you didn't know existed." />
            <FeatureCard icon="📄" title="6 Business Documents" description="One-pager, product roadmap, GTM strategy, market analysis, competitive landscape, and elevator pitch — all personalized to your idea." />
            <FeatureCard icon="📊" title="Viability Scoring" description="Get an honest assessment of your idea's strengths, weaknesses, and risks — with concrete suggestions to improve your odds of success." />
            <FeatureCard icon="🎯" title="Market Analysis" description="Understand your target audience, market size, and competitive landscape without spending weeks on research." />
            <FeatureCard icon="🚀" title="Go-to-Market Strategy" description="Get a personalized launch plan with specific channels, tactics, and timelines based on your unique constraints and goals." />
            <FeatureCard icon="💼" title="Investor-Ready Output" description="Share your documents with co-founders, mentors, and investors. Everything is formatted and ready to present." />
          </div>
        </div>
      </section>

      {/* Why IdeaForge */}
      <section className="px-6 py-16 md:py-24 bg-bg-surface/50 border-y border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">Why IdeaForge?</h2>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">Other tools assume you already know business planning. We don&apos;t.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-2xl border border-border bg-bg-surface">
              <div className="text-sm font-semibold text-text-muted uppercase tracking-wider mb-4">Without IdeaForge</div>
              <div className="space-y-3">
                {["Stare at a blank Google Doc for hours", "Google contradicting advice on YouTube", "ChatGPT gives generic, surface-level tips", "Traditional tools assume MBA-level knowledge", "Friends and family always say 'great idea!'"].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="text-error mt-0.5 shrink-0">✕</span>
                    <span className="text-sm text-text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl border-2 border-primary/30 bg-primary/5">
              <div className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">With IdeaForge</div>
              <div className="space-y-3">
                {["Guided conversation that does the thinking for you", "Smart questions that challenge your assumptions", "Deeply personalized analysis of YOUR specific idea", "Zero jargon — built for first-timers", "Honest feedback with actionable next steps"].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span className="text-success mt-0.5 shrink-0">✓</span>
                    <span className="text-sm text-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA + Waitlist */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            Ready to turn your idea into a <span className="text-primary">real plan</span>?
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            Join founders, creators, and side-hustlers who are using IdeaForge to go from &quot;I have an idea&quot; to &quot;I have a plan.&quot;
          </p>
          <WaitlistForm />
          <div className="pt-4">
            <Link href="/auth/sign-up" className="inline-flex px-8 py-3.5 bg-primary text-text-inverse font-semibold rounded-xl hover:bg-primary-hover transition-all text-lg shadow-glow hover:shadow-lg">
              Start Free — No Credit Card
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="px-6 py-16 md:py-24 bg-bg-surface/50 border-y border-border">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Simple pricing</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-bg-surface text-left">
              <h3 className="font-heading font-bold text-lg">Starter</h3>
              <p className="text-3xl font-heading font-bold mt-2">Free</p>
              <p className="text-sm text-text-secondary mt-1 mb-4">2 full idea sessions with all 6 documents</p>
              <Link href="/auth/sign-up" className="block w-full py-2.5 text-center rounded-lg border border-border text-text font-medium hover:bg-bg-hover transition-colors text-sm">Get Started</Link>
            </div>
            <div className="p-6 rounded-2xl border-2 border-primary bg-bg-surface text-left relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-0.5 bg-primary text-text-inverse text-xs font-bold uppercase rounded-full">Popular</span>
              </div>
              <h3 className="font-heading font-bold text-lg">Pro</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-heading font-bold text-primary">$15</span>
                <span className="text-text-secondary text-sm">/mo</span>
              </div>
              <p className="text-sm text-text-secondary mt-1 mb-4">Unlimited sessions, PDF exports, sharing</p>
              <Link href="/auth/sign-up" className="block w-full py-2.5 text-center rounded-lg bg-primary text-text-inverse font-medium hover:bg-primary-hover transition-colors text-sm">Start Free, Upgrade Anytime</Link>
            </div>
          </div>
          <Link href="/pricing" className="text-sm text-primary hover:text-primary-light transition-colors">See full pricing details →</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/" className="font-heading font-bold text-primary">IdeaForge</Link>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              <Link href="/pricing" className="hover:text-text transition-colors">Pricing</Link>
              <Link href="/help" className="hover:text-text transition-colors">FAQ</Link>
              <Link href="/privacy" className="hover:text-text transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-text transition-colors">Terms</Link>
            </div>
          </div>
          <p className="text-sm text-text-muted">&copy; {new Date().getFullYear()} IdeaForge. Built by Christian at NC A&T.</p>
        </div>
      </footer>
    </div>
  );
}
