# IdeaForge Stitch Redesign Plan

## Summary
Align the live Next.js app with the Stitch reference designs across 7 files.
The Stitch designs are the source of truth for typography, color tokens, layout, and component patterns.

---

## 1. `src/app/globals.css` — Design Tokens + Body Font

**Changes:**
- Change `--font-body` from `"Plus Jakarta Sans"` → `"Instrument Sans"`
- Expand color palette to match full Stitch token set (Material Design 3):
  - Add `surface-container` (#201f1f), `surface-container-high` (#2a2a2a), `surface-container-highest` (#353534)
  - Add `on-primary` (#412d00), `primary-container` (#d4ad65)
  - Add `outline` (#99907c), `outline-variant` (#4d4635)
  - Fix `on-surface-variant` from `#9e9b99` → `#d0c5af` (warmer, per Stitch)
  - Add `surface-dim` (#131313), `surface-tint` (#e9c176)
  - Add `primary-fixed-dim` (#e9c176)
- Update `.btn-primary` color to `#412d00` (on-primary) from `#131313`
- Add `.hide-scrollbar` utility class (for chat canvas)
- Add `.serif-display` shorthand class

---

## 2. `src/app/layout.tsx` — Font Import

**Changes:**
- Replace `Plus+Jakarta+Sans` Google Font URL with `Instrument+Sans:wght@400;500;600;700`
- Add `Material+Symbols+Outlined` icon font (used heavily in Stitch)
- Keep `Newsreader` (same params, no change needed)
- Add `class="dark"` to `<html>` tag

---

## 3. `src/components/Header.tsx` — Nav Redesign

**Changes:**
- Logo: add `italic` class (Stitch shows italic Newsreader wordmark)
- Nav container: remove `border-b border-hairline`, add `shadow-[0px_12px_32px_rgba(0,0,0,0.4)]`
- Active link: add `font-bold border-b-2 border-primary pb-1` on the current route link (use `usePathname`)
- Inactive links: `text-sm tracking-wide text-on-surface/60 hover:text-on-surface`
- Padding: `px-8 py-4` (from `px-6 py-3`)

---

## 4. `src/app/page.tsx` — Landing Page Redesign

**Changes (major layout overhaul):**

**Hero:**
- Hero tag: `rounded-full bg-surface-container-high border border-outline-variant/20` (not primary/10)
- Heading: `text-6xl md:text-8xl font-light leading-[1.1]` — much larger
- Subheading: `text-xl text-on-surface-variant font-light max-w-2xl`
- Add two ambient blur orbs: `absolute bg-primary/10 blur-[120px] rounded-full`
- CTA button: `editorial-gradient rounded-md text-lg px-10 py-4`
- Secondary button: `bg-surface-container-highest/50 border border-outline-variant/30 rounded-md`

**Social Proof strip** (new section):
- `bg-surface-container-lowest py-16`
- `text-[10px] tracking-[0.3em] uppercase text-outline` label
- Placeholder company names in faded serif

**How It Works ("The Curation Process"):**
- 3-column grid with Material Symbol icons (replace emoji)
- Step labels: `text-2xl font-headline` — `01. Intake`, `02. Synthesis`, `03. Artifacts`
- `py-32` spacing

**Features Bento Grid** (replaces current 3-column grid):
- 12-column CSS grid with large/small tiles
- Feature 1 (col-span-8): large tile with title + description
- Feature 2 (col-span-4): quote callout tile
- Feature 3 (col-span-4): security tile
- Feature 4 (col-span-8): wider tile with progress-bar visual

**Testimonial** (new section):
- Centered blockquote in `text-3xl md:text-4xl font-light font-headline`
- Material Symbol `format_quote` icon
- Avatar + name/title attribution

**CTA Section:**
- Full-width with `radial-gradient` background + backdrop blur panel
- Heading: `text-5xl md:text-6xl font-light`
- "Limited sessions available this month." microcopy

**Footer:**
- `bg-[#0e0e0e] border-t border-[#4d4635]/20 py-12 px-8`
- Links: `text-xs tracking-widest uppercase text-on-surface/40 hover:text-primary`

---

## 5. `src/app/dashboard/page.tsx` — Bento Dashboard

**Changes:**

**Welcome Header:**
- `text-6xl md:text-7xl font-display font-light italic` (much larger)
- Eyebrow: `text-sm tracking-widest uppercase text-on-surface/40 mt-4`

**Layout:** Switch from vertical stack to `grid grid-cols-12 gap-8`

**Left column (col-span-4):**
- New Session card: tall card `min-h-[320px]` with `add_circle` Material Symbol, CTA at bottom with arrow
- "Curator's Tip" quote card below it

**Right column (col-span-8):**
- "Active Sessions" header with "View All Archive" link
- Session rows: `bg-surface-container-low rounded-lg p-6 border border-transparent hover:border-outline-variant/30`
- Session icon: `w-12 h-12 bg-surface-container-high rounded`
- Status badge: `bg-primary/10 text-primary rounded-full` with pulsing dot

**Curated Insights section** (below bento grid):
- 3-column image card grid with overlay text
- Category label + title per card

---

## 6. `src/components/ConversationThread.tsx` — Chat UI Redesign

**Changes:**

**AI Message bubbles:**
- Add avatar: `w-6 h-6 rounded-full bg-primary/10 border border-primary/20` with `auto_awesome` icon
- "IdeaForge" label: `text-[10px] uppercase tracking-widest text-primary font-bold` above bubble
- Bubble: `bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 text-sm md:text-base`

**User Message bubbles:**
- Right-aligned with "You" label
- Bubble: `bg-surface-container-highest rounded-xl p-5`

**Input area:**
- Sticky bottom with `bg-gradient-to-t from-background via-background/95 to-transparent pt-12 pb-8`
- Input container: glow wrapper `absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary-container/20 rounded-xl blur opacity-25 group-focus-within:opacity-50`
- Input inner: `bg-surface-container-low border border-outline-variant/20 rounded-xl focus-within:border-primary/50`
- Send button: `bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-lg` with `north_east` icon
- Footer microcopy: `text-[9px] uppercase tracking-[0.3em] text-on-surface/20`

---

## 7. `src/app/dashboard/session/[id]/page.tsx` — Session Page Layout

**Changes:**

**Session goal/progress header** (sticky sub-header below main nav):
- `bg-surface-container-low px-8 pt-10 pb-6 border-b border-outline-variant/10`
- Eyebrow: `text-xs uppercase tracking-[0.2em] text-primary/60`
- Goal text: `text-3xl md:text-4xl serif-display italic leading-snug`
- Progress bar: `h-[2px] bg-surface-container-highest rounded-full`
- Phase label: `text-[10px] uppercase tracking-widest text-on-background/40 font-bold`

**Main canvas:**
- `max-w-4xl mx-auto px-6 py-12 gap-10`
- `hide-scrollbar` on scroll container

---

## File Order / Implementation Sequence

1. `globals.css` (tokens — everything depends on this)
2. `layout.tsx` (fonts — needed before components render correctly)
3. `Header.tsx` (shared nav)
4. `page.tsx` (landing)
5. `dashboard/page.tsx` (dashboard)
6. `ConversationThread.tsx` (core chat UI)
7. `dashboard/session/[id]/page.tsx` (session layout)
