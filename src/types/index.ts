// IdeaForge Type Definitions

export type SubscriptionStatus = "free" | "paid";

export type SessionStatus = "active" | "completed" | "archived";

export type MessageRole = "user" | "assistant" | "system";

export type DocumentType =
  | "roadmap"
  | "gtm"
  | "market_analysis"
  | "competitive_landscape"
  | "elevator_pitch"
  | "one_pager";

export interface ConversationStage {
  id: number;
  name: string;
  description: string;
  questionsRange: [number, number]; // min and max questions for this stage
}

export const CONVERSATION_STAGES: ConversationStage[] = [
  {
    id: 1,
    name: "Problem Validation",
    description: "Understanding the problem your idea solves and who feels the pain",
    questionsRange: [3, 5],
  },
  {
    id: 2,
    name: "Customer Validation",
    description: "Defining who your ideal customer is and how to reach them",
    questionsRange: [3, 5],
  },
  {
    id: 3,
    name: "Competitive Positioning",
    description: "Analyzing what makes your idea different from existing solutions",
    questionsRange: [3, 5],
  },
  {
    id: 4,
    name: "Business Model",
    description: "Figuring out how you'll make money and sustain the business",
    questionsRange: [3, 5],
  },
  {
    id: 5,
    name: "Launch Strategy",
    description: "Building your plan to get your first customers and grow",
    questionsRange: [3, 5],
  },
];

export const STAGE_COUNT = CONVERSATION_STAGES.length;

export const FREE_SESSION_LIMIT = 2;
export const PAID_PRICE_MONTHLY = 15;
