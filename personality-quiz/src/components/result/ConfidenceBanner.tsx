import type { QuizResult } from '../../lib/quizScoring';

const CONFIDENCE_LABELS: Record<string, { label: string; desc: string; color: string }> = {
  high: { label: 'High Confidence', desc: 'Your style shows a strong, clear preference.', color: '#10B981' },
  medium: { label: 'Medium Confidence', desc: 'You have a dominant style with meaningful secondary traits.', color: '#F59E0B' },
  balanced: { label: 'Balanced Profile', desc: 'You draw from multiple styles almost equally — you\'re highly adaptable.', color: '#6366f1' },
};

export function ConfidenceBanner({ result }: { result: QuizResult }) {
  const confidence = CONFIDENCE_LABELS[result.confidenceLevel];

  return (
    <>
      <div
        className="rounded-2xl border px-5 py-4 mb-6 flex items-start gap-3"
        style={{ borderColor: `${confidence.color}40`, backgroundColor: `${confidence.color}10` }}
      >
        <span className="text-xl mt-0.5">
          {result.confidenceLevel === 'high' ? '💪' : result.confidenceLevel === 'medium' ? '🎯' : '⚖️'}
        </span>
        <div>
          <p className="font-semibold text-slate-800 text-sm">{confidence.label}</p>
          <p className="text-sm text-slate-600 mt-0.5">{confidence.desc}</p>
        </div>
      </div>

      {result.isAdaptive && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 mb-6 flex items-start gap-3">
          <span className="text-xl">🌀</span>
          <p className="text-sm text-amber-800">{result.adaptiveNote}</p>
        </div>
      )}
    </>
  );
}
