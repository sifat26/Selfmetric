import type { QuizQuestion, PersonalityTypeId, OptionScores } from '../data/questions';

export interface Scores extends OptionScores {}

export interface QuizAnswer {
  questionId: number;
  optionIndex: number;
  scores: OptionScores;
  isReverse?: boolean;
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
  primaryType: PersonalityTypeId;
  secondaryType: PersonalityTypeId;
  confidenceLevel: ConfidenceLevel;
  blendLabel: string;
  isBlend: boolean;
  isAdaptive: boolean;
  adaptiveNote: string;
  totalAnswered: number;
}

const TYPE_ORDER: PersonalityTypeId[] = ['red', 'yellow', 'green', 'blue'];

export function calculateScores(answers: QuizAnswer[]): Scores {
  const scores: Scores = { red: 0, yellow: 0, green: 0, blue: 0 };
  for (const answer of answers) {
    scores.red += answer.scores.red;
    scores.yellow += answer.scores.yellow;
    scores.green += answer.scores.green;
    scores.blue += answer.scores.blue;
  }
  return scores;
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

export function getPrimaryType(scores: Scores): PersonalityTypeId {
  return TYPE_ORDER.reduce((best, type) =>
    scores[type] > scores[best] ? type : best
  );
}

export function getSecondaryType(scores: Scores, primary: PersonalityTypeId): PersonalityTypeId {
  return TYPE_ORDER.filter((t) => t !== primary).reduce((best, type) =>
    scores[type] > scores[best] ? type : best
  );
}

export function getConfidenceLevel(
  percentages: Percentages,
  primary: PersonalityTypeId,
  secondary: PersonalityTypeId
): ConfidenceLevel {
  const diff = percentages[primary] - percentages[secondary];
  if (diff >= 15) return 'high';
  if (diff >= 8) return 'medium';
  return 'balanced';
}

const TYPE_LABELS: Record<PersonalityTypeId, string> = {
  red: 'Red',
  yellow: 'Yellow',
  green: 'Green',
  blue: 'Blue',
};

export function getBlendType(
  percentages: Percentages,
  primary: PersonalityTypeId,
  secondary: PersonalityTypeId
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

/**
 * Consistency check: look at reverse questions and see if the user's reverse
 * answers are highly contradictory to their dominant pattern.
 */
export function checkConsistency(
  answers: QuizAnswer[],
  questions: QuizQuestion[]
): boolean {
  const reverseAnswers = answers.filter((a) => {
    const q = questions.find((q) => q.id === a.questionId);
    return q?.isReverse;
  });

  if (reverseAnswers.length < 2) return false;

  // Build non-reverse dominant pattern
  const normalAnswers = answers.filter((a) => {
    const q = questions.find((q) => q.id === a.questionId);
    return !q?.isReverse;
  });

  const normalScores = calculateScores(normalAnswers);
  const normalPrimary = getPrimaryType(normalScores);

  // In reverse answers, check if the opposite type dominates
  const reverseScores = calculateScores(reverseAnswers);
  const reversePrimary = getPrimaryType(reverseScores);

  // High contradiction: if normal primary != reverse primary AND
  // the reverse primary strongly dominates (> 40% of reverse total)
  if (normalPrimary !== reversePrimary) {
    const reverseTotal =
      reverseScores.red + reverseScores.yellow + reverseScores.green + reverseScores.blue;
    const reversePct = reverseTotal > 0 ? (reverseScores[reversePrimary] / reverseTotal) * 100 : 0;
    if (reversePct >= 50) return true;
  }

  return false;
}

export function generateResultSummary(
  answers: QuizAnswer[],
  questions: QuizQuestion[]
): QuizResult {
  const scores = calculateScores(answers);
  const percentages = calculatePercentages(scores);
  const primaryType = getPrimaryType(scores);
  const secondaryType = getSecondaryType(scores, primaryType);
  const confidenceLevel = getConfidenceLevel(percentages, primaryType, secondaryType);
  const { label: blendLabel, isBlend } = getBlendType(percentages, primaryType, secondaryType);
  const isAdaptive = checkConsistency(answers, questions);

  return {
    scores,
    percentages,
    primaryType,
    secondaryType,
    confidenceLevel,
    blendLabel,
    isBlend,
    isAdaptive,
    adaptiveNote: isAdaptive
      ? 'Your result shows a mixed pattern. You may adapt your communication style depending on context — a sign of situational awareness and flexibility.'
      : '',
    totalAnswered: answers.length,
  };
}
