"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function Header() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLink = (href: string, label: string) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    return (
      <Link
        href={href}
        className={
          isActive
            ? "text-sm tracking-wide text-primary font-bold border-b-2 border-primary pb-1 transition-colors"
            : "text-sm tracking-wide text-on-surface/60 hover:text-on-surface transition-colors"
        }
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-surface/70 backdrop-blur-2xl shadow-[0px_12px_32px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="flex items-center hover:opacity-80 transition-opacity"
          aria-label="IdeaForge home"
        >
          <Image src="/logo-with-text.svg" alt="IdeaForge Logo" width={160} height={36} priority />
        </Link>

        {/* Desktop Navigation */}
        {isLoaded && user && (
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLink("/dashboard", "Dashboard")}
            {navLink("/dashboard/new-session", "New Session")}
            {navLink("/pricing", "Pricing")}
            {navLink("/account", "Account")}
          </nav>
        )}

        {isLoaded && !user && (
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLink("/pricing", "Pricing")}
            {navLink("/help", "FAQ")}
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-4">
          {isLoaded && user ? (
            <>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-full border border-outline-variant/20",
                  },
                }}
              />
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-on-surface/60 hover:text-on-surface transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/auth/sign-in" className="text-sm text-on-surface/60 hover:text-on-surface transition-colors">
                Sign In
              </Link>
              <Link href="/auth/sign-up" className="btn-primary px-6 py-2 text-sm">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isLoaded && user && mobileMenuOpen && (
        <nav className="md:hidden bg-surface-container-low border-t border-hairline" aria-label="Mobile navigation">
          <div className="px-8 py-4 space-y-1">
            {[
              { href: "/dashboard", label: "Dashboard" },
              { href: "/dashboard/new-session", label: "New Session" },
              { href: "/pricing", label: "Pricing" },
              { href: "/account", label: "Account" },
              { href: "/help", label: "Help & FAQ" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-3 text-sm rounded-sm transition-colors ${
                  pathname === href
                    ? "text-primary font-medium"
                    : "text-on-surface/60 hover:text-on-surface hover:bg-surface-bright"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
