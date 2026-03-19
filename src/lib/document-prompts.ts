// IdeaForge Document Generation Prompts
// Each prompt takes the idea profile context and generates a specific document type

export interface IdeaProfileContext {
  title: string;
  problem: string;
  targetAudience: string;
  solution: string;
  businessModel: string;
  competitiveAdvantage: string;
  launchStrategy: string;
  viabilityScore: number;
  keyRisks?: string;
}

function buildContext(profile: IdeaProfileContext): string {
  return `BUSINESS IDEA PROFILE:
Title: ${profile.title}
Problem: ${profile.problem}
Target Audience: ${profile.targetAudience}
Solution: ${profile.solution}
Business Model: ${profile.businessModel}
Competitive Advantage: ${profile.competitiveAdvantage}
Launch Strategy: ${profile.launchStrategy}
Viability Score: ${profile.viabilityScore}/10
${profile.keyRisks ? `Key Risks: ${profile.keyRisks}` : ""}`;
}

export const DOCUMENT_PROMPTS = {
  roadmap: (profile: IdeaProfileContext) => ({
    system: `You are IdeaForge's document generator. You create beautiful, actionable markdown documents that feel personalized — not templated. Write in a warm, clear, motivating tone. Use markdown formatting with headers, bullet points, and emphasis for scannability. Never use placeholder language like "[insert here]". Every detail should be specific to THIS idea.`,
    user: `${buildContext(profile)}

Generate a 6-MONTH PRODUCT ROADMAP for this business idea. Structure it as:

# Product Roadmap: [Idea Title]

## Vision Statement
A 1-2 sentence north star for what this product becomes.

## Phase 1: MVP (Weeks 1-4)
**Goal:** [What the MVP proves]
- Key features to build (3-5 specific features)
- Success metrics (measurable, specific)
- Key milestone

## Phase 2: Early Traction (Weeks 5-10)
**Goal:** [What this phase validates]
- Features to add based on user feedback patterns
- Growth tactics to implement
- Success metrics

## Phase 3: Growth (Weeks 11-18)
**Goal:** [Scaling what works]
- Scale features
- Optimization priorities
- Revenue targets

## Phase 4: Scale (Weeks 19-26)
**Goal:** [Market expansion]
- Expansion features
- Partnership opportunities
- Long-term metrics

## Key Dependencies & Risks
What could block each phase and mitigation strategies.

## Weekly Rhythm
Suggested weekly cadence for building and shipping.

Make every feature and metric SPECIFIC to this idea. No generic startup advice.`,
  }),

  gtm: (profile: IdeaProfileContext) => ({
    system: `You are IdeaForge's document generator. You create beautiful, actionable markdown documents that feel personalized — not templated. Write in a warm, clear, motivating tone. Use markdown formatting with headers, bullet points, and emphasis for scannability. Be specific and tactical — not theoretical.`,
    user: `${buildContext(profile)}

Generate a GO-TO-MARKET STRATEGY for this business idea. Structure it as:

# Go-to-Market Strategy: [Idea Title]

## Positioning Statement
One powerful sentence: For [audience] who [problem], [product] is a [category] that [key benefit]. Unlike [alternatives], we [differentiator].

## Target Segments (Priority Order)
### Segment 1: [Name] (Primary)
- Who they are, where they hang out, what they care about
- Why they'll adopt first
- How to reach them

### Segment 2: [Name] (Secondary)
- Same structure

## Launch Channels (Ranked by Impact)
For each channel:
- **Why this channel:** connection to audience
- **Specific tactics:** exactly what to post/do
- **Timeline:** when to start
- **Cost:** free or paid, estimated budget
- **Expected result:** realistic outcome

## Pre-Launch Playbook (2 weeks before)
Specific day-by-day actions to build anticipation.

## Launch Week Plan
Day-by-day breakdown of launch activities.

## First 30 Days: Getting to 100 Users
Specific, tactical steps — not theory.

## Messaging Framework
- **Headline:** The hook
- **Subheadline:** The clarity
- **3 Key Benefits:** What users get
- **Social proof angle:** How to build credibility from day 1

## Success Metrics
What to measure in the first 30, 60, 90 days.

Make this feel like a battle plan, not a textbook chapter.`,
  }),

  market_analysis: (profile: IdeaProfileContext) => ({
    system: `You are IdeaForge's document generator. You create insightful, well-researched markdown documents. Ground analysis in realistic estimates and industry patterns. Be honest about uncertainties. Use markdown formatting for clarity.`,
    user: `${buildContext(profile)}

Generate a MARKET ANALYSIS for this business idea. Structure it as:

# Market Analysis: [Idea Title]

## Market Overview
Brief description of the market landscape and why now is the right time.

## Market Sizing
### TAM (Total Addressable Market)
- Definition, estimated size, methodology
### SAM (Serviceable Addressable Market)
- The slice you can realistically target
### SOM (Serviceable Obtainable Market)
- What you can capture in Year 1 with realistic assumptions

*Note: Be honest about estimation uncertainty. Use bottom-up calculations where possible.*

## Target Customer Segments
For each segment:
- Demographics and psychographics
- Pain point intensity (1-10)
- Willingness to pay
- How to find them
- Segment size estimate

## Market Trends & Tailwinds
3-5 trends that support this idea's timing. Be specific about WHY each trend matters.

## Market Headwinds & Challenges
Honest assessment of what's working against you.

## Customer Pain Points (Ranked)
1. Primary pain (most acute)
2. Secondary pains
3. Latent pains they don't know they have

## Buying Behavior
How does the target customer currently solve this problem? What triggers them to seek a new solution? What's their decision-making process?

## Market Entry Strategy
Given this analysis, what's the smartest way to enter this market?

Ground everything in realistic estimates. Flag where you're uncertain.`,
  }),

  competitive_landscape: (profile: IdeaProfileContext) => ({
    system: `You are IdeaForge's document generator. You create thorough, honest competitive analyses. Don't sugarcoat — be direct about where competitors are strong AND where they fall short. Use markdown formatting for clarity.`,
    user: `${buildContext(profile)}

Generate a COMPETITIVE LANDSCAPE analysis for this business idea. Structure it as:

# Competitive Landscape: [Idea Title]

## Competitive Overview
Brief summary of the competitive environment — is it crowded, emerging, or blue ocean?

## Direct Competitors
For each competitor (identify 3-5):
### [Competitor Name]
- **What they do:** Brief description
- **Strengths:** What they do well (be honest)
- **Weaknesses:** Where they fall short
- **Pricing:** Their model and price points
- **Target audience:** Who they serve
- **Market position:** Leader, challenger, niche?

## Indirect Competitors & Alternatives
Things people use TODAY to solve this problem (even if not a direct competitor):
- Alternative 1 and why people use it
- Alternative 2 and why people use it
- "Do nothing" — why some people don't solve this at all

## Competitive Matrix

| Feature | Your Idea | Competitor 1 | Competitor 2 | Competitor 3 |
|---------|-----------|-------------|-------------|-------------|
| [Key dimension 1] | ... | ... | ... | ... |
| [Key dimension 2] | ... | ... | ... | ... |
| [Key dimension 3] | ... | ... | ... | ... |
| [Key dimension 4] | ... | ... | ... | ... |
| Pricing | ... | ... | ... | ... |

## Your Differentiation
What GENUINELY makes this different? Be specific — "better UX" isn't enough. What specifically is better and why?

## Competitive Moat
What makes this defensible over time? Be honest — if there's no moat yet, say so and suggest how to build one.

## Competitive Risks
- What happens if a big player enters this space?
- What if a competitor copies your best feature?
- How do you stay ahead?

## Strategic Positioning
Given this landscape, what's the smartest positioning for this idea?

Be brutally honest. A founder needs to know the real competitive picture, not a flattering one.`,
  }),

  elevator_pitch: (profile: IdeaProfileContext) => ({
    system: `You are IdeaForge's document generator. You craft compelling, memorable pitches that make people lean in. Write in a punchy, energetic style. Every word should earn its place.`,
    user: `${buildContext(profile)}

Generate an ELEVATOR PITCH document for this business idea. Structure it as:

# Elevator Pitch: [Idea Title]

## The 30-Second Pitch
Write a compelling 30-second pitch (roughly 75 words). It should:
- Open with a hook that creates recognition ("You know how...")
- State the problem clearly
- Present the solution simply
- End with what makes it special

## The 2-Minute Pitch
Expand the 30-second version into a 2-minute pitch that adds:
- Market opportunity (why this is big)
- How it works (simple explanation)
- Business model (how it makes money)
- Traction or validation (what you've done so far)
- The ask (what you need — investment, users, partners)

## Key Talking Points
5 bullet points a founder should memorize for any conversation about this idea.

## Common Questions & Killer Answers
Anticipate the top 5 questions someone will ask after hearing the pitch, and provide strong, concise answers.

## The One-Liner
A single sentence that captures the entire idea. Something you'd put in a Twitter bio or email signature.

## Pitch Tips for This Specific Idea
3 specific tips for delivering this pitch effectively, based on the idea's unique characteristics.

Make it punchy. Make it memorable. Make someone want to hear more.`,
  }),

  one_pager: (profile: IdeaProfileContext) => ({
    system: `You are IdeaForge's document generator. You create concise, scannable one-page summaries that an investor or advisor could read in 2 minutes and understand the entire opportunity. Use markdown formatting for visual hierarchy. Every section should be tight — no filler.`,
    user: `${buildContext(profile)}

Generate a ONE-PAGER for this business idea. This should be concise enough to fit on a single page when printed. Structure it as:

# [Idea Title]
*[One-line tagline that captures the essence]*

---

## The Problem
2-3 sentences. What's broken and who feels the pain?

## The Solution
2-3 sentences. What does this product do and how does it work?

## Key Features
- **[Feature 1]:** One-line description
- **[Feature 2]:** One-line description
- **[Feature 3]:** One-line description
- **[Feature 4]:** One-line description (optional)

## Target Market
Who is the primary customer? How big is the opportunity?

## Business Model
How does this make money? What's the pricing?

## Competitive Edge
What makes this different from existing solutions? (2-3 sentences max)

## Traction & Milestones
What's been done so far? What are the next key milestones?

## The Ask
What does this business need to get to the next level?

---
*Generated by IdeaForge — From idea to launch plan in one conversation*

Keep it TIGHT. An investor should be able to scan this in 2 minutes. No section should be longer than 3 sentences.`,
  }),
} as const;

export const DOCUMENT_TITLES: Record<string, string> = {
  roadmap: "Product Roadmap",
  gtm: "Go-to-Market Strategy",
  market_analysis: "Market Analysis",
  competitive_landscape: "Competitive Landscape",
  elevator_pitch: "Elevator Pitch",
  one_pager: "One-Pager",
};

export const DOCUMENT_ICONS: Record<string, string> = {
  roadmap: "🗺️",
  gtm: "🚀",
  market_analysis: "📊",
  competitive_landscape: "⚔️",
  elevator_pitch: "🎤",
  one_pager: "📄",
};

export const DOCUMENT_DESCRIPTIONS: Record<string, string> = {
  roadmap: "A phased 6-month plan for building and launching your product",
  gtm: "Tactical playbook for getting your first users and growing",
  market_analysis: "Market sizing, segments, trends, and customer insights",
  competitive_landscape: "Direct and indirect competitors, positioning, and moat analysis",
  elevator_pitch: "30-second and 2-minute pitches plus key talking points",
  one_pager: "Investor-ready summary of your entire business idea",
};
