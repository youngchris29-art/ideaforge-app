"use client";

interface SocialShareProps {
  ideaTitle: string;
}

export default function SocialShare({ ideaTitle }: SocialShareProps) {
  const tweetText = encodeURIComponent(
    `Just turned my business idea "${ideaTitle}" into a complete launch plan using @IdeaForge in 45 minutes. From raw concept to product roadmap, GTM strategy, and competitive analysis. 🚀\n\nhttps://ideaforge.app`
  );

  const linkedInText = encodeURIComponent(
    `I just used IdeaForge to transform my business idea into a complete launch plan — product roadmap, go-to-market strategy, market analysis, and more. All from a single AI-guided conversation.\n\nIf you have an idea you've been sitting on, check it out: https://ideaforge.app`
  );

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-on-surface-variant">Share your journey</p>
      <div className="flex items-center gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${tweetText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-hairline rounded-md text-sm text-on-surface-variant hover:text-text hover:bg-surface-bright transition-colors"
          aria-label="Share on X (Twitter)"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Share on X
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=https://ideaforge.app&summary=${linkedInText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-hairline rounded-md text-sm text-on-surface-variant hover:text-text hover:bg-surface-bright transition-colors"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
      </div>
    </div>
  );
}
