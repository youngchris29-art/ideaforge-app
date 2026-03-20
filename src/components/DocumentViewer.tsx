"use client";

import React, { useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { DOCUMENT_TITLES, DOCUMENT_ICONS, DOCUMENT_DESCRIPTIONS } from "@/lib/document-prompts";

interface DocumentViewerProps {
  documents: Doc<"documents">[];
  isGenerating: boolean;
  generationProgress: number;
  isPaid?: boolean;
  onUpgradeClick?: () => void;
}

const DOC_TYPE_ORDER = [
  "one_pager",
  "roadmap",
  "gtm",
  "market_analysis",
  "competitive_landscape",
  "elevator_pitch",
] as const;

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1.5 text-xs font-medium rounded-md border border-hairline text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors"
    >
      {copied ? "Copied!" : "Copy Markdown"}
    </button>
  );
}

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.JSX.Element[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(
        <hr key={key++} className="border-hairline my-6" />
      );
      i++;
      continue;
    }

    // Headers
    const h1Match = line.match(/^# (.+)/);
    if (h1Match) {
      elements.push(
        <h1 key={key++} className="text-2xl font-display font-normal text-primary mt-8 mb-4 first:mt-0">
          {renderInline(h1Match[1])}
        </h1>
      );
      i++;
      continue;
    }

    const h2Match = line.match(/^## (.+)/);
    if (h2Match) {
      elements.push(
        <h2 key={key++} className="text-xl font-display font-normal text-on-surface mt-8 mb-3">
          {renderInline(h2Match[1])}
        </h2>
      );
      i++;
      continue;
    }

    const h3Match = line.match(/^### (.+)/);
    if (h3Match) {
      elements.push(
        <h3 key={key++} className="text-lg font-display font-light text-on-surface-variant mt-6 mb-2">
          {renderInline(h3Match[1])}
        </h3>
      );
      i++;
      continue;
    }

    const h4Match = line.match(/^#### (.+)/);
    if (h4Match) {
      elements.push(
        <h4 key={key++} className="text-base font-display font-light text-on-surface-variant mt-4 mb-2">
          {renderInline(h4Match[1])}
        </h4>
      );
      i++;
      continue;
    }

    // Table detection
    if (line.includes("|") && i + 1 < lines.length && /^\|[-| :]+\|$/.test(lines[i + 1]?.trim() ?? "")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(renderTable(tableLines, key++));
      continue;
    }

    // Unordered list
    if (/^[-*] /.test(line.trim())) {
      const listItems: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i]?.trim() ?? "")) {
        listItems.push(lines[i].trim().replace(/^[-*] /, ""));
        i++;
      }
      elements.push(
        <ul key={key++} className="space-y-1.5 my-3 ml-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-on-surface leading-relaxed">
              <span className="text-primary mt-1.5 text-[8px]">●</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line.trim())) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i]?.trim() ?? "")) {
        listItems.push(lines[i].trim().replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="space-y-1.5 my-3 ml-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-on-surface leading-relaxed">
              <span className="text-primary font-medium text-xs mt-0.5 min-w-[1.2rem]">{idx + 1}.</span>
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Blockquote
    if (line.trim().startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i]?.trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().replace(/^> /, ""));
        i++;
      }
      elements.push(
        <blockquote key={key++} className="border-l border-primary/30 pl-4 my-4 text-on-surface-variant italic font-display text-sm">
          {quoteLines.map((ql, idx) => (
            <p key={idx}>{renderInline(ql)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Code block
    if (line.trim().startsWith("```")) {
      const codeLines: string[] = [];
      i++; // skip opening ```
      while (i < lines.length && !lines[i]?.trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre key={key++} className="bg-surface-lowest rounded-sm p-4 my-4 overflow-x-auto border border-hairline">
          <code className="text-xs text-on-surface-variant font-mono">{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Italic line (like subtitles)
    if (line.trim().startsWith("*") && line.trim().endsWith("*") && !line.trim().startsWith("**")) {
      elements.push(
        <p key={key++} className="text-sm text-on-surface-variant italic font-display my-2">
          {line.trim().slice(1, -1)}
        </p>
      );
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="text-sm text-on-surface leading-relaxed my-2">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="space-y-0">{elements}</div>;
}

function renderInline(text: string): (string | React.JSX.Element)[] {
  const parts: (string | React.JSX.Element)[] = [];
  let remaining = text;
  let partKey = 0;

  while (remaining.length > 0) {
    const boldItalicMatch = remaining.match(/\*\*\*(.+?)\*\*\*/);
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    const italicMatch = remaining.match(/(?<!\*)\*([^*]+?)\*(?!\*)/);
    const codeMatch = remaining.match(/`([^`]+)`/);

    const matches = [
      boldItalicMatch && { type: "boldItalic", match: boldItalicMatch },
      boldMatch && { type: "bold", match: boldMatch },
      italicMatch && { type: "italic", match: italicMatch },
      codeMatch && { type: "code", match: codeMatch },
    ]
      .filter(Boolean)
      .sort((a, b) => (a!.match.index ?? 0) - (b!.match.index ?? 0));

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0]!;
    const idx = first.match.index ?? 0;

    if (idx > 0) {
      parts.push(remaining.slice(0, idx));
    }

    switch (first.type) {
      case "boldItalic":
        parts.push(
          <strong key={partKey++}><em>{first.match[1]}</em></strong>
        );
        remaining = remaining.slice(idx + first.match[0].length);
        break;
      case "bold":
        parts.push(
          <strong key={partKey++} className="text-on-surface font-semibold">{first.match[1]}</strong>
        );
        remaining = remaining.slice(idx + first.match[0].length);
        break;
      case "italic":
        parts.push(
          <em key={partKey++} className="text-on-surface-variant font-display">{first.match[1]}</em>
        );
        remaining = remaining.slice(idx + first.match[0].length);
        break;
      case "code":
        parts.push(
          <code key={partKey++} className="bg-surface-bright px-1.5 py-0.5 rounded-sm text-xs font-mono text-primary-light">{first.match[1]}</code>
        );
        remaining = remaining.slice(idx + first.match[0].length);
        break;
    }
  }

  return parts;
}

function renderTable(tableLines: string[], key: number): React.JSX.Element {
  if (tableLines.length < 2) return <div key={key} />;

  const headerCells = tableLines[0]
    .split("|")
    .map((c) => c.trim())
    .filter(Boolean);

  // Skip separator line (index 1)
  const bodyRows = tableLines.slice(2).map((row) =>
    row
      .split("|")
      .map((c) => c.trim())
      .filter(Boolean)
  );

  return (
    <div key={key} className="overflow-x-auto my-4 rounded-sm border border-hairline">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-bright">
            {headerCells.map((cell, idx) => (
              <th
                key={idx}
                className="px-3 py-2 text-left font-medium text-on-surface-variant text-xs border-b border-hairline"
              >
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((row, rowIdx) => (
            <tr key={rowIdx} className="border-b border-hairline last:border-0 hover:bg-surface-bright/50 transition-colors">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-3 py-2 text-on-surface text-xs">
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DocumentViewer({
  documents,
  isGenerating,
  generationProgress,
  isPaid = false,
  onUpgradeClick,
}: DocumentViewerProps) {
  const [activeDoc, setActiveDoc] = useState<string | null>(null);

  const sortedDocs = DOC_TYPE_ORDER
    .map((type) => documents.find((d) => d.type === type))
    .filter(Boolean) as Doc<"documents">[];

  const selectedDoc = sortedDocs.find((d) => d.type === activeDoc) ?? sortedDocs[0] ?? null;

  if (isGenerating && documents.length === 0) {
    return <GeneratingState progress={generationProgress} />;
  }

  if (sortedDocs.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar - document tabs */}
      <div className="md:w-64 border-b md:border-b-0 md:border-r border-hairline bg-surface-container-low shrink-0">
        <div className="p-3">
          <h3 className="tag-intelligence text-on-surface-variant mb-3">
            Your Documents
          </h3>
          <div className="flex md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
            {DOC_TYPE_ORDER.map((type) => {
              const doc = sortedDocs.find((d) => d.type === type);
              const isActive = selectedDoc?.type === type;
              const icon = DOCUMENT_ICONS[type] ?? "📄";
              const title = DOCUMENT_TITLES[type] ?? type;

              if (!doc && !isGenerating) return null;

              return (
                <button
                  key={type}
                  onClick={() => doc && setActiveDoc(type)}
                  disabled={!doc}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-left transition-all whitespace-nowrap md:whitespace-normal min-w-fit ${
                    isActive
                      ? "bg-primary/10 border border-hairline text-on-surface"
                      : doc
                        ? "hover:bg-surface-bright text-on-surface-variant hover:text-on-surface border border-transparent"
                        : "text-on-surface-variant border border-transparent opacity-50"
                  }`}
                >
                  <span className="text-base">{icon}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium">{title}</span>
                    {!doc && isGenerating && (
                      <span className="text-[10px] text-on-surface-variant">Generating...</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generation progress (if still generating some docs) */}
        {isGenerating && documents.length > 0 && (
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/5 border border-hairline">
              <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin shrink-0" />
              <span className="text-[10px] text-on-surface-variant">
                Generating {documents.length}/6...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-y-auto">
        {selectedDoc ? (
          <div className="max-w-3xl mx-auto px-6 py-6">
            {/* Document header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{DOCUMENT_ICONS[selectedDoc.type]}</span>
                <div>
                  <h2 className="font-display font-normal text-lg text-on-surface">
                    {selectedDoc.title}
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    {DOCUMENT_DESCRIPTIONS[selectedDoc.type]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CopyButton content={selectedDoc.content} />
                {isPaid ? (
                  <button
                    onClick={() => {
                      const blob = new Blob([selectedDoc.content], { type: "text/markdown" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${selectedDoc.title.replace(/\s+/g, "_")}.md`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-hairline text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors"
                  >
                    Download
                  </button>
                ) : (
                  <button
                    onClick={onUpgradeClick}
                    className="px-3 py-1.5 text-xs font-medium rounded-md border border-hairline text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1.5"
                    title="Upgrade to Pro to export as PDF"
                  >
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Export PDF
                  </button>
                )}
              </div>
            </div>

            {/* Document content */}
            <div className="bg-surface-container-low rounded-md border border-hairline p-6 md:p-8">
              <MarkdownRenderer content={selectedDoc.content} />
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="text-xs text-on-surface-variant">
                Generated {new Date(selectedDoc.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })} by IdeaForge
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-on-surface-variant text-sm">
            Select a document to view
          </div>
        )}
      </div>
    </div>
  );
}

function GeneratingState({ progress }: { progress: number }) {
  const stages = [
    { label: "One-Pager", icon: "📄", threshold: 0 },
    { label: "Product Roadmap", icon: "🗺️", threshold: 16 },
    { label: "GTM Strategy", icon: "🚀", threshold: 32 },
    { label: "Market Analysis", icon: "📊", threshold: 48 },
    { label: "Competitive Landscape", icon: "⚔️", threshold: 64 },
    { label: "Elevator Pitch", icon: "🎤", threshold: 80 },
  ];

  return (
    <div className="flex items-center justify-center h-full px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-4xl animate-pulse">✨</div>
        <div>
          <h3 className="font-display font-normal text-lg mb-1">
            Crafting Your Documents
          </h3>
          <p className="text-sm text-on-surface-variant">
            Our AI is generating 6 personalized business documents based on your conversation. This takes 2-3 minutes.
          </p>
        </div>

        {/* Progress bar — 2px hairline */}
        <div className="space-y-2">
          <div className="h-0.5 bg-surface-bright overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${Math.round(progress)}%` }}
            />
          </div>
          <p className="tag-intelligence text-on-surface-variant">{Math.round(progress)}% complete</p>
        </div>

        {/* Document stages */}
        <div className="grid grid-cols-2 gap-2">
          {stages.map((stage) => {
            const isActive = progress >= stage.threshold && progress < stage.threshold + 16;
            const isDone = progress > stage.threshold + 16;
            return (
              <div
                key={stage.label}
                className={`flex items-center gap-2 px-3 py-2 rounded-sm text-xs transition-all ${
                  isDone
                    ? "bg-success/5 border border-success/20 text-success"
                    : isActive
                      ? "bg-primary/5 border border-hairline text-primary"
                      : "bg-surface-container-low border border-hairline text-on-surface-variant"
                }`}
              >
                <span>{stage.icon}</span>
                <span>{stage.label}</span>
                {isDone && <span className="ml-auto">✓</span>}
                {isActive && (
                  <div className="ml-auto w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
