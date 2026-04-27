export type UserGoal = "career" | "relationship" | "teamwork" | "self_growth";

export interface AISuggestions {
  personalizedSummary: string;
  communicationAdvice: string[];
  careerSuggestions: string[];
  relationshipAdvice: string[];
  stressManagementTips: string[];
  growthPlan: string[];
  threeActionsThisWeek: string[];
}

export const USER_GOAL_OPTIONS: Array<{ value: UserGoal; label: string }> = [
  { value: "career", label: "Career growth" },
  { value: "relationship", label: "Relationships" },
  { value: "teamwork", label: "Teamwork" },
  { value: "self_growth", label: "Self growth" },
];

export const EMPTY_AI_SUGGESTIONS: AISuggestions = {
  personalizedSummary: "",
  communicationAdvice: [],
  careerSuggestions: [],
  relationshipAdvice: [],
  stressManagementTips: [],
  growthPlan: [],
  threeActionsThisWeek: [],
};
