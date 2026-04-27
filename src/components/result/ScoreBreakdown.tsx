import type { Percentages } from '../../lib/quizScoring';
import type { PersonalityColor } from '../../types/quiz';
import { personalityTypes } from '../../data/personalityTypes';

interface ScoreBreakdownProps {
  percentages: Percentages;
  primaryType: PersonalityColor;
}

const TYPE_ORDER: PersonalityColor[] = ['red', 'blue', 'green', 'yellow'];

export function ScoreBreakdown({ percentages, primaryType }: ScoreBreakdownProps) {
  return (
    <div className="space-y-4">
      {TYPE_ORDER.map((type) => {
        const pt = personalityTypes[type];
        const pct = percentages[type];
        const isPrimary = type === primaryType;

        return (
          <div key={type} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-lg">{pt.emoji}</span>
                <span className={`text-sm font-semibold ${isPrimary ? 'text-slate-800' : 'text-slate-600'}`}>
                  {pt.color} / {pt.name}
                </span>
                {isPrimary && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                    Primary
                  </span>
                )}
              </div>
              <span className={`text-sm font-bold ${isPrimary ? 'text-slate-800' : 'text-slate-500'}`}>
                {pct}%
              </span>
            </div>

            {/* Bar track */}
            <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${pct}%`,
                  backgroundColor: pt.hexColor,
                  opacity: isPrimary ? 1 : 0.65,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
