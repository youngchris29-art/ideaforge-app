"use client";

import Link from "next/link";
import { PRICING } from "@/lib/polar";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  reason?: "sessions_limit" | "pdf_export" | "notion_export" | "share_link" | "general";
}

const REASON_COPY: Record<string, { title: string; subtitle: string }> = {
  sessions_limit: {
    title: "You've used your free sessions",
    subtitle: "Upgrade to Pro for unlimited idea sessions and keep building.",
  },
  pdf_export: {
    title: "PDF export is a Pro feature",
    subtitle: "Upgrade to download your documents as polished PDFs.",
  },
  notion_export: {
    title: "Notion export is a Pro feature",
    subtitle: "Upgrade to send your documents straight to Notion.",
  },
  share_link: {
    title: "Shareable links are a Pro feature",
    subtitle: "Upgrade to share your documents with investors and collaborators.",
  },
  general: {
    title: "Unlock the full IdeaForge experience",
    subtitle: "Go Pro for unlimited sessions and premium features.",
  },
};

export default function UpgradeModal({ isOpen, onClose, reason = "general" }: UpgradeModalProps) {
  if (!isOpen) return null;

  const copy = REASON_COPY[reason] || REASON_COPY.general;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-surface-container-low border border-hairline rounded-md p-8 space-y-6 shadow-[0_8px_60px_rgba(0,0,0,0.4)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center space-y-2">
          <div className="text-4xl mb-3">⚡</div>
          <h2 className="font-display font-normal text-xl">{copy.title}</h2>
          <p className="text-on-surface-variant text-sm">{copy.subtitle}</p>
        </div>

        {/* Pro features */}
        <div className="space-y-2.5">
          {PRICING.pro.features.slice(0, 6).map((feature) => (
            <div key={feature} className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-primary shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-on-surface">{feature}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="text-center py-2">
          <span className="text-3xl font-display font-light text-primary">$15</span>
          <span className="text-on-surface-variant text-sm">/month</span>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/checkout"
            className="btn-primary block w-full py-3 text-center text-sm font-semibold"
            onClick={onClose}
          >
            Upgrade to Pro
          </Link>
          <button
            onClick={onClose}
            className="block w-full py-3 text-center rounded-md border border-hairline text-on-surface-variant font-medium hover:bg-surface-bright transition-colors text-sm"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
