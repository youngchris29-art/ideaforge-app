"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-8 pt-20 overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/hero_ideaforge.mp4"
      />

      {/* Cinematic overlay — dark vignette + brand tint */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Base dark tint */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Top fade into nav */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0e0e0e] to-transparent" />
        {/* Bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
        {/* Subtle gold radial bloom — brand signature */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(241,201,125,0.06)_0%,_transparent_70%)]" />
      </div>

      <div className="relative z-20 max-w-5xl text-center">
        <span className="inline-block py-1 px-3 mb-6 rounded-full bg-surface/40 backdrop-blur-sm border border-outline-variant/20 text-primary text-xs tracking-[0.2em] uppercase font-body">
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
            className="bg-surface/30 border border-outline-variant/30 text-on-surface px-10 py-4 rounded-md text-lg font-medium backdrop-blur-sm transition-all hover:bg-surface/50 text-center"
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
  );
}
