import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { adaptiveQuestions } from "../data/adaptiveQuestions";
import { coreQuestions } from "../data/coreQuestions";
import {
  calculateCoreScores,
  calculateFinalScores,
  getAdaptivePath,
  getResultSummary,
  type QuizAnswer,
  type QuizResult,
} from "../lib/quizScoring";
import { saveResultToStorage } from "../lib/shareResult";
import type { PersonalityColor, QuizQuestion } from "../types/quiz";

interface QuizContextValue {
  questions: QuizQuestion[];
  currentIndex: number;
  answers: QuizAnswer[];
  result: QuizResult | null;
  isComplete: boolean;
  totalQuestions: number;
  progress: number;
  currentQuestion: QuizQuestion | null;
  selectedOptionIndex: number | null;
  phase: "core" | "adaptive";
  goToNext: () => void;
  goToPrev: () => void;
  selectOption: (optionIndex: number) => void;
  finishQuiz: () => QuizResult;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [adaptivePath, setAdaptivePath] = useState<PersonalityColor | null>(
    null,
  );

  const questions = useMemo(() => {
    if (adaptivePath) {
      return [...coreQuestions, ...adaptiveQuestions[adaptivePath]];
    }
    return coreQuestions;
  }, [adaptivePath]);

  const totalQuestions = 26; // 20 core + 6 adaptive
  const progress = Math.round((currentIndex / totalQuestions) * 100);
  const currentQuestion = questions[currentIndex] ?? null;

  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion?.id,
  );
  const selectedOptionIndex = currentAnswer?.optionIndex ?? null;
  const phase = currentIndex < 20 ? "core" : "adaptive";

  const selectOption = useCallback(
    (optionIndex: number) => {
      if (!currentQuestion) return;
      const option = currentQuestion.options[optionIndex];
      setAnswers((prev) => {
        const filtered = prev.filter(
          (a) => a.questionId !== currentQuestion.id,
        );
        return [
          ...filtered,
          {
            questionId: currentQuestion.id,
            phase: currentQuestion.phase,
            optionIndex,
            scores: option.scores,
          },
        ];
      });
    },
    [currentQuestion],
  );

  const goToNext = useCallback(() => {
    if (currentIndex === 19 && !adaptivePath) {
      // Finished core questions, calculate adaptive path
      const coreScores = calculateCoreScores(
        answers.filter((a) => a.phase === "core"),
      );
      const path = getAdaptivePath(coreScores);
      setAdaptivePath(path);
      setCurrentIndex((i) => i + 1);
    } else if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, answers, adaptivePath, totalQuestions]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const finishQuiz = useCallback((): QuizResult => {
    const coreAnswers = answers.filter((a) => a.phase === "core");
    const adaptAnswers = answers.filter((a) => a.phase === "adaptive");
    const finalScores = calculateFinalScores(coreAnswers, adaptAnswers);

    const r = getResultSummary(finalScores, answers.length);
    setResult(r);
    setIsComplete(true);
    saveResultToStorage(r);

    // Non-blocking save to database
    try {
      let sessionId = sessionStorage.getItem("quiz_session_id");
      if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem("quiz_session_id", sessionId);
      }
      const refCode = sessionStorage.getItem("quiz_ref_code") || undefined;
      const respondentName =
        sessionStorage.getItem("quiz_respondent_name") || undefined;
      fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, result: r, refCode, respondentName }),
      }).catch(() => {});
    } catch {
      // silently ignore — quiz must work without database
    }

    return r;
  }, [answers]);

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    setIsComplete(false);
    setAdaptivePath(null);
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentIndex,
        answers,
        result,
        isComplete,
        totalQuestions,
        progress,
        currentQuestion,
        selectedOptionIndex,
        phase,
        goToNext,
        goToPrev,
        selectOption,
        finishQuiz,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz(): QuizContextValue {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used inside <QuizProvider>");
  return ctx;
}
