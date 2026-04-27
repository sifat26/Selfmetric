export type PersonalityColor = "red" | "blue" | "green" | "yellow";

export type QuestionCategory =
  | "behavior"
  | "emotions"
  | "social_style"
  | "lifestyle";

export interface QuizOption {
  id: "A" | "B" | "C" | "D";
  text: string;
  scores: Partial<Record<PersonalityColor, number>>;
}

export interface QuizQuestion {
  id: string;
  phase: "core" | "adaptive";
  path?: PersonalityColor;
  category: QuestionCategory;
  subCategory: string;
  question: string;
  options: QuizOption[];
}
