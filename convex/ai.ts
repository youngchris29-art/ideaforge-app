"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are IdeaForge — an AI business advisor that helps first-time founders transform raw ideas into validated launch plans.

YOUR PERSONALITY:
- You're a hype coach meets strategist. High energy, motivating, but you ALWAYS back it up with substance.
- You speak like a smart friend who happens to know a lot about startups, not like a textbook or MBA professor.
- You celebrate good thinking: "That's a sharp insight" or "You're onto something real here."
- You push back on weak thinking: "I want to challenge that assumption" or "Let's stress-test that."
- You're never condescending. The user is smart — they just haven't done this before.
- You ask questions they haven't considered. THIS IS YOUR SUPERPOWER.

YOUR RULES:
1. Ask ONE question at a time. Never dump multiple questions in one message.
2. Keep responses concise — 2-4 sentences max for your commentary, then your question.
3. Reference the user's previous answers to show you're building a picture of THEIR specific idea.
4. Be specific, not generic.
5. When something doesn't add up, say so kindly but directly.
6. Never use business jargon without explaining it.
7. Stay on topic. If the user asks something unrelated, gently redirect.
8. At the end of each stage, give a brief 1-2 sentence summary before transitioning.

CONVERSATION FLOW:
You guide the user through 5 stages in order:
1. Problem Validation — Is the problem real and painful?
2. Customer Validation — Who specifically is the customer?
3. Competitive Positioning — What makes this different?
4. Business Model — How does this make money?
5. Launch Strategy — How do you get first customers?

STAGE TRANSITION:
When you've asked enough questions in a stage (3-5 exchanges) and feel you have a solid understanding, end your message with the exact marker: [STAGE_COMPLETE]
This signals the system to advance to the next stage. Do NOT include this marker until you genuinely have enough information.

CONVERSATION COMPLETION:
When Stage 5 is complete and you've gathered enough for a launch strategy, end your final message with a brief encouraging wrap-up and the exact marker: [CONVERSATION_COMPLETE]`;

const STAGE_CONTEXTS: Record<number, string> = {
  1: `CURRENT STAGE: Problem Validation (Stage 1 of 5)
Explore: Is the problem real? How painful? How frequent? Who feels it most? What happens if it's not solved?
After 3-5 good exchanges, end your message with [STAGE_COMPLETE].`,

  2: `CURRENT STAGE: Customer Validation (Stage 2 of 5)
Explore: Who specifically is the customer? What's their day like? Have they talked to potential users? Would they pay? Where do they hang out online?
Push for specificity. After 3-5 exchanges, end with [STAGE_COMPLETE].`,

  3: `CURRENT STAGE: Competitive Positioning (Stage 3 of 5)
Explore: What exists today? Why would someone switch? What's the real differentiator? Is it defensible? What's the switching cost?
Be honest — challenge weak differentiation. After 3-5 exchanges, end with [STAGE_COMPLETE].`,

  4: `CURRENT STAGE: Business Model (Stage 4 of 5)
Explore: Revenue model? Pricing? Unit economics basics? Minimum viable business? Financial risks?
Ground in real numbers. After 3-5 exchanges, end with [STAGE_COMPLETE].`,

  5: `CURRENT STAGE: Launch Strategy (Stage 5 of 5)
Explore: What's the MVP? First 10 customers? Specific channels? 30/60/90 day goals? Biggest risks? What to do THIS WEEK?
End with energy and clarity. After 3-5 exchanges, end with [CONVERSATION_COMPLETE].`,
};

const IDEA_PROFILE_PROMPT = `Based on the entire conversation above, generate a structured idea profile in the following JSON format. Be specific and insightful — this should feel personalized to THIS idea, not generic.

Return ONLY valid JSON, no other text:
{
  "title": "A compelling 3-5 word title for this business idea",
  "problem": "2-3 sentence description of the core problem being solved",
  "targetAudience": "Specific description of the primary target customer",
  "solution": "2-3 sentence description of the proposed solution and how it works",
  "businessModel": "How this business makes money, including pricing approach",
  "competitiveAdvantage": "What genuinely differentiates this from alternatives",
  "launchStrategy": "Key tactics for the first 90 days",
  "viabilityScore": 7,
  "keyRisks": "Top 3 risks that could derail this idea"
}

The viabilityScore should be 1-10 based on:
- Problem severity and frequency (is it real?)
- Customer specificity (do they know who they're serving?)
- Differentiation strength (is it defensible?)
- Business model clarity (can it make money?)
- Execution feasibility (can they actually build and launch this?)

Be honest with the score. A 5 is average, 7+ means strong potential, below 4 means significant concerns.`;

export const chat = action({
  args: {
    sessionId: v.id("sessions"),
    userMessage: v.string(),
    currentStage: v.number(),
  },
  handler: async (ctx, args): Promise<{ message: string; stageComplete: boolean; conversationComplete: boolean; newStage: number }> => {
    const client = new Anthropic();

    // Fetch conversation history
    const messages = await ctx.runQuery(api.messages.listBySession, {
      sessionId: args.sessionId,
    });

    // Build message history for Claude
    const conversationHistory: Anthropic.MessageParam[] = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content,
    }));

    // Add the new user message
    conversationHistory.push({
      role: "user",
      content: args.userMessage,
    });

    // Get stage context
    const stageContext = STAGE_CONTEXTS[args.currentStage] || STAGE_CONTEXTS[1];

    // Call Claude
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `${SYSTEM_PROMPT}\n\n${stageContext}`,
      messages: conversationHistory,
    });

    const assistantMessage =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Check for stage transitions
    const stageComplete = assistantMessage.includes("[STAGE_COMPLETE]");
    const conversationComplete = assistantMessage.includes("[CONVERSATION_COMPLETE]");

    // Clean markers from the displayed message
    const cleanMessage = assistantMessage
      .replace("[STAGE_COMPLETE]", "")
      .replace("[CONVERSATION_COMPLETE]", "")
      .trim();

    // Save user message
    await ctx.runMutation(api.messages.send, {
      sessionId: args.sessionId,
      role: "user",
      content: args.userMessage,
      stage: args.currentStage,
    });

    // Save assistant message
    await ctx.runMutation(api.messages.send, {
      sessionId: args.sessionId,
      role: "assistant",
      content: cleanMessage,
      stage: args.currentStage,
    });

    // Handle stage transition
    let newStage = args.currentStage;
    if (stageComplete && args.currentStage < 5) {
      newStage = args.currentStage + 1;
      await ctx.runMutation(api.sessions.updateStage, {
        sessionId: args.sessionId,
        stage: newStage,
      });

      // Track stage completion
      await ctx.runMutation(api.analytics.track, {
        sessionId: args.sessionId,
        event: "stage_completed",
        data: JSON.stringify({
          stage: args.currentStage,
          nextStage: newStage,
        }),
      });
    }

    // Handle conversation completion
    if (conversationComplete) {
      await ctx.runMutation(api.sessions.complete, {
        sessionId: args.sessionId,
      });

      // Track session completion
      await ctx.runMutation(api.analytics.track, {
        sessionId: args.sessionId,
        event: "session_completed",
        data: JSON.stringify({
          totalMessages: messages.length + 2,
        }),
      });
    }

    return {
      message: cleanMessage,
      stageComplete,
      conversationComplete,
      newStage,
    };
  },
});

export const generateIdeaProfile = action({
  args: {
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, args): Promise<{ profileId: string; profile: Record<string, unknown> }> => {
    const client = new Anthropic();

    // Fetch all messages
    const messages = await ctx.runQuery(api.messages.listBySession, {
      sessionId: args.sessionId,
    });

    // Build conversation for context
    const conversationText = messages
      .map((m: { role: string; content: string }) => `${m.role === "user" ? "Founder" : "IdeaForge"}: ${m.content}`)
      .join("\n\n");

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `Here is the complete IdeaForge conversation:\n\n${conversationText}\n\n${IDEA_PROFILE_PROMPT}`,
        },
      ],
    });

    const responseText =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Parse JSON from response
    let profile;
    try {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        profile = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch {
      // Fallback profile
      profile = {
        title: "Business Idea",
        problem: "Problem analysis pending",
        targetAudience: "Target audience analysis pending",
        solution: "Solution analysis pending",
        businessModel: "Business model analysis pending",
        competitiveAdvantage: "Competitive analysis pending",
        launchStrategy: "Launch strategy pending",
        viabilityScore: 5,
        keyRisks: "Risk analysis pending",
      };
    }

    // Save to database
    const profileId = await ctx.runMutation(api.ideaProfiles.create, {
      sessionId: args.sessionId,
      title: profile.title,
      problem: profile.problem,
      targetAudience: profile.targetAudience,
      solution: profile.solution,
      businessModel: profile.businessModel,
      competitiveAdvantage: profile.competitiveAdvantage,
      launchStrategy: profile.launchStrategy,
      viabilityScore: Math.min(10, Math.max(1, profile.viabilityScore || 5)),
      keyRisks: profile.keyRisks,
    });

    // Track profile generation
    await ctx.runMutation(api.analytics.track, {
      sessionId: args.sessionId,
      event: "profile_generated",
      data: JSON.stringify({
        viabilityScore: profile.viabilityScore,
        title: profile.title,
      }),
    });

    return { profileId, profile };
  },
});

export const getFirstMessage = action({
  args: {
    sessionId: v.id("sessions"),
    ideaDescription: v.string(),
  },
  handler: async (ctx, args) => {
    const client = new Anthropic();

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `${SYSTEM_PROMPT}\n\n${STAGE_CONTEXTS[1]}`,
      messages: [
        {
          role: "user",
          content: `Here's my business idea: ${args.ideaDescription}`,
        },
      ],
    });

    const assistantMessage =
      response.content[0].type === "text" ? response.content[0].text : "";

    const cleanMessage = assistantMessage
      .replace("[STAGE_COMPLETE]", "")
      .replace("[CONVERSATION_COMPLETE]", "")
      .trim();

    // Save both messages
    await ctx.runMutation(api.messages.send, {
      sessionId: args.sessionId,
      role: "user",
      content: `Here's my business idea: ${args.ideaDescription}`,
      stage: 1,
    });

    await ctx.runMutation(api.messages.send, {
      sessionId: args.sessionId,
      role: "assistant",
      content: cleanMessage,
      stage: 1,
    });

    // Track session started
    await ctx.runMutation(api.analytics.track, {
      sessionId: args.sessionId,
      event: "session_started",
      data: JSON.stringify({ ideaDescription: args.ideaDescription.slice(0, 100) }),
    });

    return { message: cleanMessage };
  },
});

// ==========================================
// Phase 2: Document Generation
// ==========================================

const DOCUMENT_SYSTEM_PROMPT = `You are IdeaForge's document generator. You create beautiful, actionable markdown documents that feel personalized — not templated. Write in a warm, clear, motivating tone. Use markdown formatting with headers, bullet points, and emphasis for scannability. Never use placeholder language like "[insert here]". Every detail should be specific to THIS idea.`;

function buildProfileContext(profile: {
  title: string;
  problem: string;
  targetAudience: string;
  solution: string;
  businessModel: string;
  competitiveAdvantage: string;
  launchStrategy: string;
  viabilityScore: number;
  keyRisks?: string;
}): string {
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

const DOC_PROMPTS: Record<string, (ctx: string) => string> = {
  roadmap: (ctx) => `${ctx}

Generate a 6-MONTH PRODUCT ROADMAP for this business idea in markdown. Include:
# Product Roadmap: [Idea Title]
## Vision Statement (1-2 sentences)
## Phase 1: MVP (Weeks 1-4) — Goal, 3-5 specific features, success metrics
## Phase 2: Early Traction (Weeks 5-10) — Features, growth tactics, metrics
## Phase 3: Growth (Weeks 11-18) — Scale features, optimization, revenue targets
## Phase 4: Scale (Weeks 19-26) — Expansion, partnerships, long-term metrics
## Key Dependencies & Risks — Blockers and mitigations
## Weekly Rhythm — Suggested cadence
Make every feature and metric SPECIFIC to this idea.`,

  gtm: (ctx) => `${ctx}

Generate a GO-TO-MARKET STRATEGY in markdown. Include:
# Go-to-Market Strategy: [Idea Title]
## Positioning Statement — "For [audience] who [problem], [product] is a [category] that [benefit]"
## Target Segments (2-3, ranked) — Who, where, how to reach
## Launch Channels (ranked by impact) — Why, specific tactics, timeline, cost, expected result
## Pre-Launch Playbook (2 weeks before)
## Launch Week Plan (day-by-day)
## First 30 Days: Getting to 100 Users — Specific tactics
## Messaging Framework — Headline, subheadline, 3 key benefits, social proof angle
## Success Metrics — 30, 60, 90 day targets
Make this feel like a battle plan, not a textbook.`,

  market_analysis: (ctx) => `${ctx}

Generate a MARKET ANALYSIS in markdown. Include:
# Market Analysis: [Idea Title]
## Market Overview — Landscape and timing
## Market Sizing — TAM, SAM, SOM with methodology and honest uncertainty flags
## Target Customer Segments — Demographics, pain intensity, willingness to pay, size
## Market Trends & Tailwinds — 3-5 specific trends with WHY they matter
## Market Headwinds & Challenges
## Customer Pain Points (ranked)
## Buying Behavior — How they solve it now, triggers, decision process
## Market Entry Strategy
Ground everything in realistic estimates. Flag uncertainties.`,

  competitive_landscape: (ctx) => `${ctx}

Generate a COMPETITIVE LANDSCAPE analysis in markdown. Include:
# Competitive Landscape: [Idea Title]
## Competitive Overview
## Direct Competitors (3-5) — What they do, strengths, weaknesses, pricing, audience, position
## Indirect Competitors & Alternatives — What people use today, including "do nothing"
## Competitive Matrix — Feature comparison table in markdown
## Your Differentiation — What GENUINELY makes this different
## Competitive Moat — Defensibility (be honest if there isn't one yet)
## Competitive Risks — Big players, copycats, staying ahead
## Strategic Positioning
Be brutally honest. Founders need the real picture.`,

  elevator_pitch: (ctx) => `${ctx}

Generate an ELEVATOR PITCH document in markdown. Include:
# Elevator Pitch: [Idea Title]
## The 30-Second Pitch — ~75 words, hook + problem + solution + what makes it special
## The 2-Minute Pitch — Expanded with market opportunity, how it works, business model, traction, the ask
## Key Talking Points — 5 memorizable bullets
## Common Questions & Killer Answers — Top 5 anticipated questions with strong answers
## The One-Liner — Single sentence for Twitter bio / email signature
## Pitch Tips — 3 tips specific to this idea
Make it punchy and memorable.`,

  one_pager: (ctx) => `${ctx}

Generate a ONE-PAGER in markdown. Keep it TIGHT — scannable in 2 minutes. Include:
# [Idea Title]
*[One-line tagline]*
---
## The Problem — 2-3 sentences
## The Solution — 2-3 sentences
## Key Features — 3-4 features, one line each
## Target Market — Who and how big
## Business Model — Revenue and pricing
## Competitive Edge — 2-3 sentences max
## Traction & Milestones — Done and next steps
## The Ask — What's needed next
---
*Generated by IdeaForge — From idea to launch plan in one conversation*
No section longer than 3 sentences.`,
};

const DOC_TITLES: Record<string, string> = {
  roadmap: "Product Roadmap",
  gtm: "Go-to-Market Strategy",
  market_analysis: "Market Analysis",
  competitive_landscape: "Competitive Landscape",
  elevator_pitch: "Elevator Pitch",
  one_pager: "One-Pager",
};

export const generateDocument = action({
  args: {
    sessionId: v.id("sessions"),
    ideaProfileId: v.id("ideaProfiles"),
    type: v.union(
      v.literal("roadmap"),
      v.literal("gtm"),
      v.literal("market_analysis"),
      v.literal("competitive_landscape"),
      v.literal("elevator_pitch"),
      v.literal("one_pager")
    ),
    profile: v.object({
      title: v.string(),
      problem: v.string(),
      targetAudience: v.string(),
      solution: v.string(),
      businessModel: v.string(),
      competitiveAdvantage: v.string(),
      launchStrategy: v.string(),
      viabilityScore: v.number(),
      keyRisks: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args): Promise<{ documentId: string; type: string }> => {
    const client = new Anthropic();
    const profileContext = buildProfileContext(args.profile);
    const promptFn = DOC_PROMPTS[args.type];

    if (!promptFn) {
      throw new Error(`Unknown document type: ${args.type}`);
    }

    // Also fetch conversation messages for additional context
    const messages = await ctx.runQuery(api.messages.listBySession, {
      sessionId: args.sessionId,
    });

    const conversationContext = (messages as Array<{ role: string; content: string }>).length > 0
      ? `\n\nFULL CONVERSATION CONTEXT (for deeper personalization):\n${(messages as Array<{ role: string; content: string }>)
          .slice(-20) // Last 20 messages for context (avoid token limits)
          .map((m: { role: string; content: string }) => `${m.role === "user" ? "Founder" : "IdeaForge"}: ${m.content}`)
          .join("\n\n")}`
      : "";

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: DOCUMENT_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: promptFn(profileContext) + conversationContext,
        },
      ],
    });

    const content =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Save document to database
    const documentId = await ctx.runMutation(api.documents.create, {
      sessionId: args.sessionId,
      ideaProfileId: args.ideaProfileId,
      type: args.type,
      title: DOC_TITLES[args.type] || args.type,
      content,
    });

    // Track analytics
    await ctx.runMutation(api.analytics.track, {
      sessionId: args.sessionId,
      event: "document_generated",
      data: JSON.stringify({ type: args.type }),
    });

    return { documentId, type: args.type };
  },
});

export const generateAllDocuments = action({
  args: {
    sessionId: v.id("sessions"),
  },
  handler: async (ctx, args): Promise<{ status: string; documentCount: number; results?: Array<{ documentId: string | null; type: string; error?: boolean }> }> => {
    // Get idea profile
    const profile = await ctx.runQuery(api.ideaProfiles.getBySession, {
      sessionId: args.sessionId,
    }) as { _id: string; title: string; problem: string; targetAudience: string; solution: string; businessModel: string; competitiveAdvantage: string; launchStrategy: string; viabilityScore: number; keyRisks?: string } | null;

    if (!profile) {
      throw new Error("No idea profile found for this session. Complete the conversation first.");
    }

    // Check if documents already exist
    const existingDocs = await ctx.runQuery(api.documents.getBySession, {
      sessionId: args.sessionId,
    }) as Array<unknown>;

    if (existingDocs.length > 0) {
      return {
        status: "already_generated",
        documentCount: existingDocs.length,
      };
    }

    const profileData = {
      title: profile.title,
      problem: profile.problem,
      targetAudience: profile.targetAudience,
      solution: profile.solution,
      businessModel: profile.businessModel,
      competitiveAdvantage: profile.competitiveAdvantage,
      launchStrategy: profile.launchStrategy,
      viabilityScore: profile.viabilityScore,
      keyRisks: profile.keyRisks,
    };

    const docTypes = [
      "roadmap",
      "gtm",
      "market_analysis",
      "competitive_landscape",
      "elevator_pitch",
      "one_pager",
    ] as const;

    // Generate documents sequentially to avoid rate limits
    // (Convex actions can't run parallel sub-actions easily)
    const results: Array<{ documentId: string | null; type: string; error?: boolean }> = [];
    for (const type of docTypes) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await ctx.runAction(api.ai.generateDocument as any, {
          sessionId: args.sessionId,
          ideaProfileId: profile._id,
          type,
          profile: profileData,
        }) as { documentId: string; type: string };
        results.push(result);
      } catch (err) {
        console.error(`Failed to generate ${type}:`, err);
        results.push({ documentId: null, type, error: true });
      }
    }

    return {
      status: "generated",
      documentCount: results.filter((r) => !("error" in r)).length,
      results,
    };
  },
});
