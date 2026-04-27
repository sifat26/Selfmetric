
const CATEGORY_LABELS: Record<string, string> = {
  behavior: 'Behavior',
  emotions: 'Emotions',
  social_style: 'Social Style',
  lifestyle: 'Lifestyle',
};

interface ProgressHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  category: string;
  subCategory?: string;
  phase?: string;
}

export function ProgressHeader({ currentIndex, totalQuestions, category, subCategory, phase }: ProgressHeaderProps) {
  const progress = ((currentIndex) / totalQuestions) * 100;
  const label = CATEGORY_LABELS[category] ?? category;

  return (
    <div className="w-full mb-6">
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide uppercase">
            {label}
          </span>
          {subCategory && (
            <span className="text-xs text-slate-500 font-medium capitalize">
              {subCategory}
            </span>
          )}
          {phase === 'adaptive' && (
            <span className="ml-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-700">
              ⚡ Deep Dive
            </span>
          )}
        </div>
        <span className="text-sm font-medium text-slate-500">
          <span className="text-slate-800 font-bold">{currentIndex + 1}</span>
          <span className="mx-1">/</span>
          {totalQuestions}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          }}
        />
      </div>

      <p className="text-xs text-slate-400 mt-1.5 text-right">
        {Math.round(progress)}% complete
      </p>
    </div>
  );
}
