import type { PersonalityColor, QuizQuestion } from '../types/quiz';

export type Scores = Record<PersonalityColor, number>;

export interface QuizAnswer {
  questionId: string;
  phase: "core" | "adaptive";
  optionIndex: number;
  scores: Partial<Record<PersonalityColor, number>>;
}

export interface Percentages {
  red: number;
  yellow: number;
  green: number;
  blue: number;
}

export type ConfidenceLevel = 'high' | 'medium' | 'balanced';

export interface QuizResult {
  scores: Scores;
  percentages: Percentages;
  primaryType: PersonalityColor;
  secondaryType: PersonalityColor;
  confidenceLevel: ConfidenceLevel;
  blendLabel: string;
  isBlend: boolean;
  totalAnswered: number;
}

const TYPE_ORDER: PersonalityColor[] = ['red', 'blue', 'green', 'yellow'];

export function calculateScores(answers: QuizAnswer[]): Scores {
  const scores: Scores = { red: 0, blue: 0, green: 0, yellow: 0 };
  for (const answer of answers) {
    if (answer.scores.red) scores.red += answer.scores.red;
    if (answer.scores.blue) scores.blue += answer.scores.blue;
    if (answer.scores.green) scores.green += answer.scores.green;
    if (answer.scores.yellow) scores.yellow += answer.scores.yellow;
  }
  return scores;
}

export function calculateCoreScores(coreAnswers: QuizAnswer[]): Scores {
  return calculateScores(coreAnswers);
}

export function getHighestColor(scores: Scores): PersonalityColor {
  return TYPE_ORDER.reduce((best, type) =>
    scores[type] > scores[best] ? type : best
  );
}

export function getAdaptivePath(coreScores: Scores): PersonalityColor {
  return getHighestColor(coreScores);
}

export function calculateFinalScores(coreAnswers: QuizAnswer[], adaptiveAnswers: QuizAnswer[]): Scores {
  const allAnswers = [...coreAnswers, ...adaptiveAnswers];
  return calculateScores(allAnswers);
}

export function calculatePercentages(scores: Scores): Percentages {
  const total = scores.red + scores.yellow + scores.green + scores.blue;
  if (total === 0) return { red: 25, yellow: 25, green: 25, blue: 25 };
  return {
    red: Math.round((scores.red / total) * 100),
    yellow: Math.round((scores.yellow / total) * 100),
    green: Math.round((scores.green / total) * 100),
    blue: Math.round((scores.blue / total) * 100),
  };
}

export function getPrimaryColor(scores: Scores): PersonalityColor {
  return getHighestColor(scores);
}

export function getSecondaryColor(scores: Scores): PersonalityColor {
  const primary = getPrimaryColor(scores);
  return TYPE_ORDER.filter((t) => t !== primary).reduce((best, type) =>
    scores[type] > scores[best] ? type : best
  );
}

export function getConfidenceLevel(
  percentages: Percentages,
  primary: PersonalityColor,
  secondary: PersonalityColor
): ConfidenceLevel {
  const diff = percentages[primary] - percentages[secondary];
  if (diff >= 15) return 'high';
  if (diff >= 8) return 'medium';
  return 'balanced';
}

const TYPE_LABELS: Record<PersonalityColor, string> = {
  red: 'Red',
  blue: 'Blue',
  green: 'Green',
  yellow: 'Yellow',
};

export function getBlendType(
  percentages: Percentages,
  primary: PersonalityColor,
  secondary: PersonalityColor
): { label: string; isBlend: boolean } {
  const diff = percentages[primary] - percentages[secondary];
  if (diff <= 8) {
    return {
      label: `${TYPE_LABELS[primary]}-${TYPE_LABELS[secondary]} Blend`,
      isBlend: true,
    };
  }
  return { label: TYPE_LABELS[primary], isBlend: false };
}

export function getResultSummary(
  scores: Scores,
  totalAnswered: number
): QuizResult {
  const percentages = calculatePercentages(scores);
  const primaryType = getPrimaryColor(scores);
  const secondaryType = getSecondaryColor(scores);
  const confidenceLevel = getConfidenceLevel(percentages, primaryType, secondaryType);
  const { label: blendLabel, isBlend } = getBlendType(percentages, primaryType, secondaryType);

  return {
    scores,
    percentages,
    primaryType,
    secondaryType,
    confidenceLevel,
    blendLabel,
    isBlend,
    totalAnswered,
  };
}
