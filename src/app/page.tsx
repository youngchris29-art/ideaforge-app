import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import HeroSection from "@/components/HeroSection";
import {
  SocialProofSection,
  MethodologySection,
  BentoGridSection,
  TestimonialSection,
  WhySection,
  CtaSection,
  FooterSection,
} from "@/components/AnimatedLandingSections";

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
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image src="/logo-with-text.svg" alt="IdeaForge Logo" width={160} height={36} priority />
          </Link>
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
      <HeroSection />

      <SocialProofSection />
      <MethodologySection />
      <BentoGridSection />
      <TestimonialSection />
      <WhySection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
