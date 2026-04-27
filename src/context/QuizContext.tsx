import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { questions, type QuizQuestion } from '../data/questions';
import { generateResultSummary, type QuizAnswer, type QuizResult } from '../lib/quizScoring';
import { saveResultToStorage } from '../lib/shareResult';

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

  const totalQuestions = questions.length;
  const progress = Math.round((currentIndex / totalQuestions) * 100);
  const currentQuestion = questions[currentIndex] ?? null;

  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id);
  const selectedOptionIndex = currentAnswer?.optionIndex ?? null;

  const selectOption = useCallback(
    (optionIndex: number) => {
      if (!currentQuestion) return;
      const option = currentQuestion.options[optionIndex];
      setAnswers((prev) => {
        const filtered = prev.filter((a) => a.questionId !== currentQuestion.id);
        return [
          ...filtered,
          {
            questionId: currentQuestion.id,
            optionIndex,
            scores: option.scores,
            isReverse: currentQuestion.isReverse,
          },
        ];
      });
    },
    [currentQuestion]
  );

  const goToNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, totalQuestions]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const finishQuiz = useCallback((): QuizResult => {
    const r = generateResultSummary(answers, questions);
    setResult(r);
    setIsComplete(true);
    saveResultToStorage(r);
    return r;
  }, [answers]);

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    setIsComplete(false);
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
  if (!ctx) throw new Error('useQuiz must be used inside <QuizProvider>');
  return ctx;
}
