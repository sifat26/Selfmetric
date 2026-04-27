import { useState } from 'react';
import type { QuizResult } from '../../lib/quizScoring';
import { personalityTypes } from '../../data/personalityTypes';
import { buildShareUrl, buildShareText, copyToClipboard } from '../../lib/shareResult';

interface ShareResultProps {
  result: QuizResult;
  onRetake: () => void;
}

export function ShareResult({ result, onRetake }: ShareResultProps) {
  const [copied, setCopied] = useState(false);
  const pt = personalityTypes[result.primaryType];

  const shareUrl = buildShareUrl(result);
  const shareText = buildShareText(
    result.blendLabel,
    pt.color,
    pt.name,
    result.percentages[result.primaryType]
  );

  const handleCopy = async () => {
    const ok = await copyToClipboard(shareUrl);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Communication Personality',
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user dismissed
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      {/* Share button */}
      <button
        id="share-result-btn"
        onClick={handleNativeShare}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
        style={{ background: `linear-gradient(135deg, ${pt.hexColor}, ${pt.darkColor})` }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share My Result
      </button>

      {/* Copy link button */}
      <button
        id="copy-link-btn"
        onClick={handleCopy}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-200 hover:bg-slate-50 active:scale-95"
        style={{
          borderColor: copied ? '#10B981' : '#e2e8f0',
          color: copied ? '#059669' : '#475569',
        }}
      >
        {copied ? (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Copy Result Link
          </>
        )}
      </button>

      {/* Retake button */}
      <button
        id="retake-quiz-btn"
        onClick={onRetake}
        className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 active:scale-95"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Retake Quiz
      </button>
    </div>
  );
}
