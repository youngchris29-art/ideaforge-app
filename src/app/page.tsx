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

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary/30">

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-[0px_12px_32px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
          <Link href="/" className="text-2xl font-display italic text-primary tracking-tight">IdeaForge</Link>
          <div className="hidden md:flex items-center gap-8 font-display font-light text-lg">
            <Link href="/pricing" className="text-on-surface hover:text-primary transition-colors">Pricing</Link>
            <Link href="/help" className="text-on-surface hover:text-primary transition-colors">FAQ</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/sign-in" className="text-sm text-on-surface/60 hover:text-on-surface transition-colors hidden sm:inline">
              Sign In
            </Link>
            <Link href="/auth/sign-up" className="btn-primary px-6 py-2 text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-8 pt-20 overflow-hidden">
        {/* Ambient blur orbs */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary-container/5 blur-[150px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-5xl text-center">
          <span className="inline-block py-1 px-3 mb-6 rounded-full bg-surface-container-high border border-outline-variant/20 text-primary text-xs tracking-[0.2em] uppercase font-body">
            Intellectual Workspace
          </span>

          <h1 className="text-6xl md:text-8xl font-display font-light tracking-tight text-on-background leading-[1.1] mb-8">
            From idea to launch plan in one{" "}
            <span className="italic font-normal">conversation.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-on-surface-variant font-body font-light leading-relaxed mb-12">
            A high-end environment for modern founders. IdeaForge curates your raw concepts into precision-engineered business intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="btn-primary px-10 py-4 text-lg shadow-[0_8px_60px_rgba(0,0,0,0.4)] text-center"
            >
              Start Your Free Session
            </Link>
            <Link
              href="#methodology"
              className="bg-surface-container-highest/50 border border-outline-variant/30 text-on-surface px-10 py-4 rounded-md text-lg font-medium backdrop-blur-sm transition-all hover:bg-surface-bright text-center"
            >
              View Methodology
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-on-surface-variant text-sm">
            <span>45 min to clarity</span>
            <span className="w-1 h-1 bg-outline rounded-full hidden sm:inline-block" />
            <span>6 personalized documents</span>
            <span className="w-1 h-1 bg-outline rounded-full hidden sm:inline-block" />
            <span>No credit card required</span>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-[10px] tracking-[0.3em] uppercase text-outline mb-12 font-body">
            Trusted by visionary teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale contrast-125">
            {["AETHER", "LUMINARY", "OBSIDIAN.IO", "FORGE CAPITAL", "STRATOS"].map((name) => (
              <div key={name} className="text-xl font-display text-on-surface">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="methodology" className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-24 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-light mb-4">The Curation Process</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto font-body">
              We move beyond simple chat by applying a rigorous editorial framework to your business logic.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                icon: "temp_preferences_custom",
                step: "01. Intake",
                desc: "Articulate your vision. Our AI acts as a sophisticated interviewer, extracting the core pillars of your intent through guided inquiry.",
              },
              {
                icon: "analytics",
                step: "02. Synthesis",
                desc: "We cross-reference your ideas with market dynamics and historical intelligence to find the path of least resistance to your goals.",
              },
              {
                icon: "auto_awesome_motion",
                step: "03. Artifacts",
                desc: "The final output isn't text—it's a high-fidelity blueprint, ready for execution, complete with risk vectors and growth milestones.",
              },
            ].map(({ icon, step, desc }) => (
              <div key={step} className="group">
                <div className="mb-8">
                  <span className="material-symbols-outlined text-4xl text-primary">{icon}</span>
                </div>
                <h3 className="text-2xl font-display mb-4">{step}</h3>
                <p className="text-on-surface-variant font-body font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-light mb-6 leading-tight">
                Curated Intelligence for Modern Founders
              </h2>
            </div>
            <Link href="/pricing" className="text-primary hover:underline font-body text-sm tracking-widest pb-2 uppercase">
              Explore the Ecosystem
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Feature 1 — large */}
            <div className="md:col-span-8 bg-surface p-12 border border-outline-variant/10 rounded-lg group hover:bg-surface-bright transition-colors">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <span className="material-symbols-outlined text-3xl mb-6 text-primary">account_tree</span>
                  <h3 className="text-3xl font-display mb-4">Neural Architecture Mapping</h3>
                  <p className="text-on-surface-variant max-w-md font-body">
                    Visualize the logical flow of your business model. Connect dependencies and identify bottlenecks before they cost you time.
                  </p>
                </div>
                {/* Progress bar visual */}
                <div className="mt-12 bg-surface-container-low rounded border border-outline-variant/10 p-4">
                  <div className="space-y-3">
                    <div className="h-1.5 w-full bg-primary/20 rounded-full overflow-hidden">
                      <div className="h-full w-4/5 bg-primary" />
                    </div>
                    <div className="h-1.5 w-full bg-primary/10 rounded-full" />
                    <div className="h-1.5 w-3/4 bg-primary/10 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            {/* Feature 2 — small */}
            <div className="md:col-span-4 bg-surface p-10 border border-outline-variant/10 rounded-lg group hover:bg-surface-bright transition-colors">
              <span className="material-symbols-outlined text-3xl mb-6 text-primary">history_edu</span>
              <h3 className="text-2xl font-display mb-4">Editorial Polish</h3>
              <p className="text-on-surface-variant font-body">
                Your documents are rendered with the gravity of a premiere publication. Ready for boardrooms or seed rounds.
              </p>
              <div className="mt-12 border-l-2 border-primary/40 pl-6 italic text-on-surface/80 font-display text-sm">
                "The clarity this platform provides is unparalleled."
              </div>
            </div>
            {/* Feature 3 */}
            <div className="md:col-span-4 bg-surface-container-high p-10 rounded-lg group hover:bg-surface-bright transition-colors">
              <span className="material-symbols-outlined text-3xl mb-6 text-primary">security</span>
              <h3 className="text-2xl font-display mb-4">Obsidian Encryption</h3>
              <p className="text-on-surface-variant font-body">
                Your intellectual property is siloed. No data is used to train public models. Pure focus, pure security.
              </p>
            </div>
            {/* Feature 4 — large */}
            <div className="md:col-span-8 bg-surface-container-high p-10 rounded-lg group hover:bg-surface-bright transition-colors flex flex-col md:flex-row gap-12">
              <div className="flex-1">
                <span className="material-symbols-outlined text-3xl mb-6 text-primary">model_training</span>
                <h3 className="text-2xl font-display mb-4">Market Simulation</h3>
                <p className="text-on-surface-variant font-body">
                  Stress-test your assumptions against real-world economic scenarios and historical industry cycles.
                </p>
              </div>
              <div className="flex-1 bg-surface-container-low rounded border border-outline-variant/10 p-4">
                <div className="space-y-3">
                  <div className="h-2 w-full bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-primary" />
                  </div>
                  <div className="h-2 w-full bg-primary/10 rounded-full" />
                  <div className="h-2 w-3/4 bg-primary/10 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 bg-surface">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <span className="material-symbols-outlined text-5xl text-primary/30 mb-8 block">format_quote</span>
          <blockquote className="text-3xl md:text-4xl font-light font-display leading-snug text-on-background mb-12">
            &ldquo;IdeaForge changed the way we approach strategic planning. It&apos;s not just a tool; it&apos;s like having a world-class advisor available 24/7 who actually understands the{" "}
            <span className="italic">nuance</span> of our brand.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant text-lg font-display">
              J
            </div>
            <div className="text-left">
              <p className="font-medium text-on-surface font-body">Julian Vane</p>
              <p className="text-xs text-on-surface-variant tracking-wider uppercase font-body">Founder, Stratos Global</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why IdeaForge — comparison */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-light mb-4">Why IdeaForge?</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto font-body">Other tools assume you already know business planning. We don&apos;t.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-8 rounded-lg border border-hairline bg-surface-container-low">
              <div className="tag-intelligence text-on-surface-variant mb-6">Without IdeaForge</div>
              <div className="space-y-4">
                {[
                  "Stare at a blank Google Doc for hours",
                  "Google contradicting advice on YouTube",
                  "ChatGPT gives generic, surface-level tips",
                  "Traditional tools assume MBA-level knowledge",
                  "Friends and family always say 'great idea!'",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-error mt-0.5 shrink-0 text-sm">✕</span>
                    <span className="text-sm text-on-surface-variant">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-8 rounded-lg border border-primary/20 bg-primary/5">
              <div className="tag-intelligence text-primary mb-6">With IdeaForge</div>
              <div className="space-y-4">
                {[
                  "Guided conversation that does the thinking for you",
                  "Smart questions that challenge your assumptions",
                  "Deeply personalized analysis of YOUR specific idea",
                  "Zero jargon — built for first-timers",
                  "Honest feedback with actionable next steps",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-success mt-0.5 shrink-0 text-sm">✓</span>
                    <span className="text-sm text-on-surface">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-surface-container-lowest">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center border border-outline-variant/10 py-24 rounded-2xl bg-surface/40 backdrop-blur-md">
          <h2 className="text-5xl md:text-6xl font-display font-light mb-8">
            Ready to curate your next breakthrough?
          </h2>
          <p className="text-on-surface-variant text-xl max-w-2xl mx-auto mb-12 font-body font-light">
            Join the exclusive workspace for founders who value intelligence over noise.
          </p>
          <div className="flex flex-col items-center gap-6">
            <WaitlistForm />
            <Link href="/auth/sign-up" className="btn-primary px-12 py-5 text-xl shadow-[0_8px_60px_rgba(0,0,0,0.2)]">
              Begin Your Journey
            </Link>
            <p className="text-sm text-outline font-body uppercase tracking-widest">Limited sessions available this month.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-outline-variant/20 bg-surface-lowest">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-8 py-12 gap-6">
          <div className="flex flex-col gap-2">
            <Link href="/" className="font-display text-xl text-on-surface">IdeaForge</Link>
            <p className="font-body text-sm tracking-wide text-on-surface/40">
              &copy; {new Date().getFullYear()} IdeaForge. The Digital Curator for Business Intelligence.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 font-body text-sm tracking-wide">
            {[
              { href: "/terms", label: "Terms" },
              { href: "/privacy", label: "Privacy" },
              { href: "/help", label: "FAQ" },
              { href: "/pricing", label: "Pricing" },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="text-on-surface/40 hover:text-primary transition-colors uppercase tracking-widest text-xs">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
