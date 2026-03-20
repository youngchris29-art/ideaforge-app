"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Social Proof ───────────────────────────────────────────────────────────
// Each logo drifts up one by one — like a curtain slowly rising
export function SocialProofSection() {
  const logos = ["AETHER", "LUMINARY", "OBSIDIAN.IO", "FORGE CAPITAL", "STRATOS"];
  return (
    <section className="py-16 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-8">
        <motion.p
          className="text-center text-[10px] tracking-[0.3em] uppercase text-outline mb-12 font-body"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease }}
        >
          Trusted by visionary teams at
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30 grayscale contrast-125">
          {logos.map((name, i) => (
            <motion.div
              key={name}
              className="text-xl font-display text-on-surface"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease, delay: i * 0.09 }}
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Methodology ────────────────────────────────────────────────────────────
// Header fades in, then each card rises from below with a slight scale reveal
export function MethodologySection() {
  const steps = [
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
  ];
  return (
    <section id="methodology" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-light mb-4">The Curation Process</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto font-body">
            We move beyond simple chat by applying a rigorous editorial framework to your business logic.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {steps.map(({ icon, step, desc }, i) => (
            <motion.div
              key={step}
              className="group"
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease, delay: i * 0.14 }}
            >
              <div className="mb-8">
                <span className="material-symbols-outlined text-4xl text-primary">{icon}</span>
              </div>
              <h3 className="text-2xl font-display mb-4">{step}</h3>
              <p className="text-on-surface-variant font-body font-light leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bento Grid ─────────────────────────────────────────────────────────────
// Header sweeps in from the left; grid cards reveal with a masked clip-path
export function BentoGridSection() {
  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-light mb-6 leading-tight">
              Curated Intelligence for Modern Founders
            </h2>
          </div>
          <Link href="/pricing" className="text-primary hover:underline font-body text-sm tracking-widest pb-2 uppercase">
            Explore the Ecosystem
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Feature 1 — large, clips up from below */}
          <motion.div
            className="md:col-span-8 bg-surface p-12 border border-outline-variant/10 rounded-lg group hover:bg-surface-bright transition-colors"
            initial={{ opacity: 0, clipPath: "inset(10% 0% 0% 0%)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="flex flex-col h-full justify-between">
              <div>
                <span className="material-symbols-outlined text-3xl mb-6 text-primary">account_tree</span>
                <h3 className="text-3xl font-display mb-4">Neural Architecture Mapping</h3>
                <p className="text-on-surface-variant max-w-md font-body">
                  Visualize the logical flow of your business model. Connect dependencies and identify bottlenecks before they cost you time.
                </p>
              </div>
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
          </motion.div>
          {/* Feature 2 — slides from right */}
          <motion.div
            className="md:col-span-4 bg-surface p-10 border border-outline-variant/10 rounded-lg group hover:bg-surface-bright transition-colors"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <span className="material-symbols-outlined text-3xl mb-6 text-primary">history_edu</span>
            <h3 className="text-2xl font-display mb-4">Editorial Polish</h3>
            <p className="text-on-surface-variant font-body">
              Your documents are rendered with the gravity of a premiere publication. Ready for boardrooms or seed rounds.
            </p>
            <div className="mt-12 border-l-2 border-primary/40 pl-6 italic text-on-surface/80 font-display text-sm">
              &ldquo;The clarity this platform provides is unparalleled.&rdquo;
            </div>
          </motion.div>
          {/* Feature 3 — rises from below */}
          <motion.div
            className="md:col-span-4 bg-surface-container-high p-10 rounded-lg group hover:bg-surface-bright transition-colors"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease, delay: 0.05 }}
          >
            <span className="material-symbols-outlined text-3xl mb-6 text-primary">security</span>
            <h3 className="text-2xl font-display mb-4">Obsidian Encryption</h3>
            <p className="text-on-surface-variant font-body">
              Your intellectual property is siloed. No data is used to train public models. Pure focus, pure security.
            </p>
          </motion.div>
          {/* Feature 4 — clips up from below */}
          <motion.div
            className="md:col-span-8 bg-surface-container-high p-10 rounded-lg group hover:bg-surface-bright transition-colors flex flex-col md:flex-row gap-12"
            initial={{ opacity: 0, clipPath: "inset(10% 0% 0% 0%)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
          >
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
// Cinematic scale-up: the quote "breathes" into existence from a slightly
// smaller state — deliberate, slow, editorial
export function TestimonialSection() {
  return (
    <section className="py-32 bg-surface">
      <motion.div
        className="max-w-4xl mx-auto px-8 text-center"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease }}
      >
        <motion.span
          className="material-symbols-outlined text-5xl text-primary/30 mb-8 block"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          format_quote
        </motion.span>
        <blockquote className="text-3xl md:text-4xl font-light font-display leading-snug text-on-background mb-12">
          &ldquo;IdeaForge changed the way we approach strategic planning. It&apos;s not just a tool; it&apos;s like having a world-class advisor available 24/7 who actually understands the{" "}
          <span className="italic">nuance</span> of our brand.&rdquo;
        </blockquote>
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
        >
          <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant text-lg font-display">
            J
          </div>
          <div className="text-left">
            <p className="font-medium text-on-surface font-body">Julian Vane</p>
            <p className="text-xs text-on-surface-variant tracking-wider uppercase font-body">Founder, Stratos Global</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Why IdeaForge ───────────────────────────────────────────────────────────
// The two columns split apart from the center — left slides from x:-50, right from x:50
export function WhySection() {
  const withoutItems = [
    "Stare at a blank Google Doc for hours",
    "Google contradicting advice on YouTube",
    "ChatGPT gives generic, surface-level tips",
    "Traditional tools assume MBA-level knowledge",
    "Friends and family always say 'great idea!'",
  ];
  const withItems = [
    "Guided conversation that does the thinking for you",
    "Smart questions that challenge your assumptions",
    "Deeply personalized analysis of YOUR specific idea",
    "Zero jargon — built for first-timers",
    "Honest feedback with actionable next steps",
  ];
  return (
    <section className="py-32 bg-surface-container-low">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-light mb-4">Why IdeaForge?</h2>
          <p className="text-on-surface-variant max-w-xl mx-auto font-body">Other tools assume you already know business planning. We don&apos;t.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div
            className="p-8 rounded-lg border border-hairline bg-surface-container-low"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease }}
          >
            <div className="tag-intelligence text-on-surface-variant mb-6">Without IdeaForge</div>
            <div className="space-y-4">
              {withoutItems.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.07 }}
                >
                  <span className="text-error mt-0.5 shrink-0 text-sm">✕</span>
                  <span className="text-sm text-on-surface-variant">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="p-8 rounded-lg border border-primary/20 bg-primary/5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.85, ease }}
          >
            <div className="tag-intelligence text-primary mb-6">With IdeaForge</div>
            <div className="space-y-4">
              {withItems.map((item, i) => (
                <motion.div
                  key={item}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease, delay: 0.2 + i * 0.07 }}
                >
                  <span className="text-success mt-0.5 shrink-0 text-sm">✓</span>
                  <span className="text-sm text-on-surface">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
// The card lifts up from deep below — a grand finale entrance
export function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-surface-container-lowest">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-8 text-center border border-outline-variant/10 py-24 rounded-2xl bg-surface/40 backdrop-blur-md"
        initial={{ opacity: 0, y: 80, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.0, ease }}
      >
        <motion.h2
          className="text-5xl md:text-6xl font-display font-light mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
        >
          Ready to curate your next breakthrough?
        </motion.h2>
        <motion.p
          className="text-on-surface-variant text-xl max-w-2xl mx-auto mb-12 font-body font-light"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
        >
          Join the exclusive workspace for founders who value intelligence over noise.
        </motion.p>
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
        >
          <WaitlistForm />
          <Link href="/auth/sign-up" className="btn-primary px-12 py-5 text-xl shadow-[0_8px_60px_rgba(0,0,0,0.2)]">
            Begin Your Journey
          </Link>
          <p className="text-sm text-outline font-body uppercase tracking-widest">Limited sessions available this month.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
// Gentle fade-in — quiet, understated, dignified
export function FooterSection() {
  return (
    <motion.footer
      className="w-full border-t border-outline-variant/20 bg-surface-lowest"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease }}
    >
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
    </motion.footer>
  );
}
