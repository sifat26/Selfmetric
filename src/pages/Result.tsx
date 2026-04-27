import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AISuggestionsPanel } from "../components/result/AISuggestionsPanel";
import { ConfidenceBanner } from "../components/result/ConfidenceBanner";
import { ResultDetails } from "../components/result/ResultDetails";
import { ResultHero } from "../components/result/ResultHero";
import { ScoreBreakdown } from "../components/result/ScoreBreakdown";
import { ShareResult } from "../components/result/ShareResult";
import { useQuiz } from "../context/QuizContext";
import { personalityTypes } from "../data/personalityTypes";
import type { QuizResult } from "../lib/quizScoring";
import { decodeResult, loadResultFromStorage } from "../lib/shareResult";

export default function Result() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { result: contextResult, resetQuiz } = useQuiz();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // 1. Try URL param
    const dataParam = searchParams.get("data");
    if (dataParam) {
      const decoded = decodeResult(dataParam);
      if (decoded) {
        setResult(decoded);
        setLoaded(true);
        return;
      }
    }
    // 2. Try context result
    if (contextResult) {
      setResult(contextResult);
      setLoaded(true);
      return;
    }
    // 3. Try localStorage
    const stored = loadResultFromStorage();
    if (stored) {
      setResult(stored);
      setLoaded(true);
      return;
    }
    // 4. Redirect home
    navigate("/", { replace: true });
  }, [searchParams, contextResult, navigate]);

  const handleRetake = () => {
    resetQuiz();
    navigate("/");
  };

  if (!loaded || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading your results…</p>
        </div>
      </div>
    );
  }

  const pt = personalityTypes[result.primaryType];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Nav */}
      <nav className="sticky top-0 z-10 w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition-colors"
        >
          <span className="text-xl">🧠</span>
          <span className="font-display font-bold text-base">Selfmetric</span>
        </a>
        <button
          onClick={handleRetake}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          ↺ Retake
        </button>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-10 animate-fade-in">
        {/* ── Hero Card ── */}
        <ResultHero result={result} />

        {/* ── Confidence banner ── */}
        <ConfidenceBanner result={result} />

        {/* ── Score Breakdown ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-slate-800 text-base mb-4">
            Score Breakdown
          </h2>
          <ScoreBreakdown
            percentages={result.percentages}
            primaryType={result.primaryType}
          />
        </div>

        {/* ── Overview ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-4">
          <h2 className="font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
            <span>📋</span> Overview
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {pt.overview}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
              Core Motivation
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {pt.coreMotivation}
            </p>
          </div>
        </div>

        {/* ── Collapsible sections ── */}
        <ResultDetails result={result} />

        {/* ── AI Suggestions ── */}
        <AISuggestionsPanel
          key={`${result.primaryType}-${result.secondaryType}-${result.percentages.red}-${result.percentages.yellow}-${result.percentages.green}-${result.percentages.blue}`}
          result={result}
        />

        {/* ── Share actions ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <h2 className="font-bold text-slate-800 text-base mb-4">
            Share Your Results
          </h2>
          <ShareResult result={result} onRetake={handleRetake} />
        </div>

        {/* ── Disclaimer ── */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-center">
          <p className="text-xs text-slate-500 leading-relaxed">
            ⚠️ {pt.warning}
          </p>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-400 py-6">
        © {new Date().getFullYear()} Selfmetric · Self-reflection tool · Not a
        clinical diagnosis
      </footer>
    </div>
  );
}
