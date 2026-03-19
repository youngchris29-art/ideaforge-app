// Document template utilities for rendering markdown to styled HTML

/**
 * Simple markdown to HTML converter
 * Handles: headers, bold, italic, lists, tables, horizontal rules, links, code blocks
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Escape HTML entities first (except in code blocks)
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Code blocks (```...```)
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    '<pre class="doc-code-block"><code>$2</code></pre>'
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="doc-inline-code">$1</code>');

  // Tables
  html = html.replace(
    /(?:^|\n)(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)*)/g,
    (_match, header: string, _separator: string, body: string) => {
      const headerCells = header
        .split("|")
        .filter((c: string) => c.trim())
        .map((c: string) => `<th class="doc-th">${c.trim()}</th>`)
        .join("");

      const rows = body
        .trim()
        .split("\n")
        .map((row: string) => {
          const cells = row
            .split("|")
            .filter((c: string) => c.trim())
            .map((c: string) => `<td class="doc-td">${c.trim()}</td>`)
            .join("");
          return `<tr>${cells}</tr>`;
        })
        .join("");

      return `<div class="doc-table-wrapper"><table class="doc-table"><thead><tr>${headerCells}</tr></thead><tbody>${rows}</tbody></table></div>`;
    }
  );

  // Headers
  html = html.replace(/^######\s+(.+)$/gm, '<h6 class="doc-h6">$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="doc-h5">$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="doc-h4">$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="doc-h3">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="doc-h2">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="doc-h1">$1</h1>');

  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr class="doc-hr" />');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Unordered lists
  html = html.replace(
    /(?:^|\n)((?:- .+\n?)+)/g,
    (_match, list: string) => {
      const items = list
        .trim()
        .split("\n")
        .map((item: string) => `<li class="doc-li">${item.replace(/^- /, "")}</li>`)
        .join("");
      return `<ul class="doc-ul">${items}</ul>`;
    }
  );

  // Ordered lists
  html = html.replace(
    /(?:^|\n)((?:\d+\. .+\n?)+)/g,
    (_match, list: string) => {
      const items = list
        .trim()
        .split("\n")
        .map((item: string) => `<li class="doc-li">${item.replace(/^\d+\. /, "")}</li>`)
        .join("");
      return `<ol class="doc-ol">${items}</ol>`;
    }
  );

  // Blockquotes
  html = html.replace(
    /(?:^|\n)(&gt; .+(?:\n&gt; .+)*)/g,
    (_match, quote: string) => {
      const content = quote.replace(/^&gt; /gm, "");
      return `<blockquote class="doc-blockquote">${content}</blockquote>`;
    }
  );

  // Paragraphs (wrap remaining text)
  html = html.replace(/(?:^|\n\n)([^<\n][^\n]+)(?:\n|$)/g, '<p class="doc-p">$1</p>');

  return html;
}
