import type { Metadata, Viewport } from "next";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "IdeaForge — From Idea to Launch Plan in One Conversation",
    template: "%s | IdeaForge",
  },
  description:
    "AI-powered business advisor that guides first-time founders through structured conversations to transform raw ideas into validated launch plans.",
  keywords: [
    "startup",
    "business plan",
    "AI advisor",
    "entrepreneur",
    "idea validation",
    "go-to-market strategy",
    "product roadmap",
    "first-time founder",
  ],
  authors: [{ name: "Christian", url: "https://ideaforge.app" }],
  creator: "IdeaForge",
  metadataBase: new URL("https://ideaforge.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ideaforge.app",
    siteName: "IdeaForge",
    title: "IdeaForge — From Idea to Launch Plan in One Conversation",
    description:
      "AI-powered business advisor that transforms your raw startup idea into a validated launch plan in 45 minutes.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "IdeaForge" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IdeaForge — From Idea to Launch Plan in One Conversation",
    description:
      "AI-powered business advisor that transforms your raw startup idea into a validated launch plan in 45 minutes.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#131313",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Instrument+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-surface text-on-surface antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
