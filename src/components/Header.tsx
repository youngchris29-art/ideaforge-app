"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const { user, isLoaded } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={user ? "/dashboard" : "/"}
          className="text-xl font-heading font-bold text-primary hover:text-primary-light transition-colors"
          aria-label="IdeaForge home"
        >
          IdeaForge
        </Link>

        {/* Desktop Navigation */}
        {isLoaded && user && (
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <Link href="/dashboard" className="text-sm text-text-secondary hover:text-text transition-colors">
              Dashboard
            </Link>
            <Link href="/dashboard/new-session" className="text-sm font-medium text-primary hover:text-primary-light transition-colors">
              + New Session
            </Link>
            <Link href="/pricing" className="text-sm text-text-secondary hover:text-text transition-colors">
              Pricing
            </Link>
            <Link href="/account" className="text-sm text-text-secondary hover:text-text transition-colors">
              Account
            </Link>
          </nav>
        )}

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isLoaded && user ? (
            <>
              <span className="hidden md:inline text-sm text-text-secondary">
                {user.firstName || user.emailAddresses[0]?.emailAddress}
              </span>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-text-secondary hover:text-text transition-colors"
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
            <div className="flex items-center gap-3">
              <Link href="/pricing" className="text-sm text-text-secondary hover:text-text transition-colors hidden sm:inline">
                Pricing
              </Link>
              <Link href="/auth/sign-in" className="text-sm text-text-secondary hover:text-text transition-colors">
                Sign In
              </Link>
              <Link href="/auth/sign-up" className="px-4 py-2 bg-primary text-text-inverse font-medium rounded-lg hover:bg-primary-hover transition-colors text-sm">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isLoaded && user && mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-bg-surface" aria-label="Mobile navigation">
          <div className="px-6 py-4 space-y-1">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-3 text-sm text-text-secondary hover:text-text hover:bg-bg-hover rounded-lg transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/new-session"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-3 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              + New Session
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-3 text-sm text-text-secondary hover:text-text hover:bg-bg-hover rounded-lg transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-3 text-sm text-text-secondary hover:text-text hover:bg-bg-hover rounded-lg transition-colors"
            >
              Account
            </Link>
            <Link
              href="/help"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-3 text-sm text-text-secondary hover:text-text hover:bg-bg-hover rounded-lg transition-colors"
            >
              Help & FAQ
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
