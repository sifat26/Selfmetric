import type { QuizResult } from '../../lib/quizScoring';
import { personalityTypes } from '../../data/personalityTypes';

const CONFIDENCE_LABELS: Record<string, { label: string; desc: string; color: string }> = {
  high: { label: 'High Confidence', desc: 'Your style shows a strong, clear preference.', color: '#10B981' },
  medium: { label: 'Medium Confidence', desc: 'You have a dominant style with meaningful secondary traits.', color: '#F59E0B' },
  balanced: { label: 'Balanced Profile', desc: 'You draw from multiple styles almost equally — you\'re highly adaptable.', color: '#6366f1' },
};

export function ResultHero({ result }: { result: QuizResult }) {
  const pt = personalityTypes[result.primaryType];
  const st = personalityTypes[result.secondaryType];
  const confidence = CONFIDENCE_LABELS[result.confidenceLevel];

  return (
    <div
      className="rounded-3xl p-8 mb-8 text-white shadow-2xl relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${pt.hexColor}, ${pt.darkColor})` }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 bg-white -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-10 bg-white translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-1">
              Your Communication Style
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-extrabold leading-tight">
              {result.blendLabel}
            </h1>
            <p className="text-white/90 text-lg mt-2 font-medium">{pt.tagline}</p>
          </div>
          <div className="text-6xl animate-bounce-gentle">{pt.emoji}</div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold">
            Primary: {pt.color} / {pt.name} — {result.percentages[result.primaryType]}%
          </div>
          <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold">
            Secondary: {st.color} / {st.name} — {result.percentages[result.secondaryType]}%
          </div>
          <div
            className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-semibold"
            style={{ borderLeft: `3px solid ${confidence.color}` }}
          >
            {confidence.label}
          </div>
        </div>
      </div>
    </div>
  );
}
