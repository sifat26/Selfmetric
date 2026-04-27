import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { QuestionCard } from '../components/quiz/QuestionCard';
import { ProgressHeader } from '../components/quiz/ProgressHeader';

export default function Quiz() {
  const navigate = useNavigate();
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedOptionIndex,
    answers,
    selectOption,
    goToNext,
    goToPrev,
    finishQuiz,
  } = useQuiz();

  // If quiz hasn't started (no questions loaded), redirect home
  useEffect(() => {
    if (!currentQuestion) navigate('/', { replace: true });
  }, [currentQuestion, navigate]);

  if (!currentQuestion) return null;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;
  const hasAnswer = selectedOptionIndex !== null;
  const answeredCount = answers.length;

  const handleNext = () => {
    if (!hasAnswer) return;
    if (isLast) {
      finishQuiz();
      navigate('/result');
    } else {
      goToNext();
    }
  };

  // Also allow finishing on Enter key
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && hasAnswer) handleNext();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex flex-col">
      {/* Top nav strip */}
      <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <a href="/" className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition-colors">
          <span className="text-xl">🧠</span>
          <span className="font-display font-bold text-base">Selfmetric</span>
        </a>
        <span className="text-xs text-slate-500">
          {answeredCount} of {totalQuestions} answered
        </span>
      </nav>

      {/* Main quiz area */}
      <main
        className="flex-1 flex flex-col items-center justify-center px-4 py-10"
        onKeyUp={handleKeyUp}
      >
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <ProgressHeader
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            category={currentQuestion.category}
          />

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 p-6 sm:p-8 mb-6">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              selectedIndex={selectedOptionIndex}
              onSelect={selectOption}
            />
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            <button
              id="prev-btn"
              onClick={goToPrev}
              disabled={isFirst}
              aria-label="Previous question"
              className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>

            <button
              id="next-btn"
              onClick={handleNext}
              disabled={!hasAnswer}
              aria-label={isLast ? 'Finish quiz' : 'Next question'}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white
                transition-all duration-200 active:scale-95
                ${hasAnswer
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:scale-105'
                  : 'bg-slate-300 cursor-not-allowed'
                }
              `}
            >
              {isLast ? 'See My Results' : 'Next'}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Hint */}
          {!hasAnswer && (
            <p className="text-center text-xs text-slate-400 mt-4 animate-fade-in">
              Select an option to continue
            </p>
          )}
        </div>
      </main>

      {/* Disclaimer footer */}
      <footer className="text-center text-xs text-slate-400 py-4 px-4">
        For self-reflection only · Not a clinical or psychological diagnosis
      </footer>
    </div>
  );
}
