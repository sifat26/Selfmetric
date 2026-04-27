import { useEffect, useCallback } from 'react';
import type { QuizQuestion } from '../../types/quiz';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

interface QuestionCardProps {
  question: QuizQuestion;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export function QuestionCard({ question, selectedIndex, onSelect }: QuestionCardProps) {
  // Keyboard support: 1–4 keys select options
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;
      if (['1', '2', '3', '4'].includes(key)) {
        const idx = parseInt(key, 10) - 1;
        if (idx < question.options.length) onSelect(idx);
      }
    },
    [question.options.length, onSelect]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="animate-slide-up w-full">
      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
          {question.question}
        </h2>
        <p className="mt-2 text-xs text-slate-400">Press 1–4 or click an option</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={idx}
              id={`option-${question.id}-${idx}`}
              aria-label={`Option ${OPTION_LETTERS[idx]}: ${option.text}`}
              aria-pressed={isSelected}
              onClick={() => onSelect(idx)}
              className={`
                w-full text-left flex items-start gap-4 px-5 py-4 rounded-2xl border-2 
                transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                ${isSelected
                  ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100'
                  : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 hover:shadow-sm'
                }
              `}
            >
              {/* Letter badge */}
              <span
                className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
                  text-sm font-bold transition-colors duration-200
                  ${isSelected
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-100 text-slate-500'
                  }
                `}
              >
                {OPTION_LETTERS[idx]}
              </span>

              {/* Text */}
              <span
                className={`text-sm sm:text-base leading-relaxed transition-colors duration-200 ${
                  isSelected ? 'text-indigo-900 font-medium' : 'text-slate-700'
                }`}
              >
                {option.text}
              </span>

              {/* Checkmark */}
              {isSelected && (
                <span className="ml-auto flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center animate-scale-in">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
