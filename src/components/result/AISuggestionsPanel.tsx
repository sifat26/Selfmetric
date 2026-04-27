import { useState } from "react";
import type { AISuggestions, UserGoal } from "../../lib/aiSuggestions";
import { USER_GOAL_OPTIONS } from "../../lib/aiSuggestions";
import type { QuizResult } from "../../lib/quizScoring";
import {
  loadAISuggestionsFromStorage,
  saveAISuggestionsToStorage,
} from "../../lib/shareResult";

interface Props {
  result: QuizResult;
}

function AdviceCard({
  title,
  items,
  accent,
}: {
  title: string;
  items: string[];
  accent: string;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div
        className="px-4 py-3 border-b border-slate-100"
        style={{ backgroundColor: accent }}
      >
        <h3 className="font-semibold text-sm text-slate-800">{title}</h3>
      </div>
      <ul className="p-4 space-y-2">
        {items.map((item, idx) => (
          <li
            key={`${title}-${idx}`}
            className="text-sm text-slate-700 leading-relaxed flex items-start gap-2"
          >
            <span className="text-indigo-500 mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function AISuggestionsPanel({ result }: Props) {
  const apiBaseUrl =
    import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
  const cached = loadAISuggestionsFromStorage(result);
  const [userGoal, setUserGoal] = useState<UserGoal>(
    cached?.userGoal ?? "self_growth",
  );
  const [suggestions, setSuggestions] = useState<AISuggestions | null>(
    cached?.data ?? null,
  );
  const [generatedAt, setGeneratedAt] = useState<string | null>(
    cached?.generatedAt ?? null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSuggestions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiBaseUrl}/api/ai-suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          primaryType: result.primaryType,
          secondaryType: result.secondaryType,
          confidenceLevel: result.confidenceLevel,
          percentages: result.percentages,
          userGoal,
        }),
      });

      const payload = (await response.json()) as {
        error?: string;
        suggestions?: AISuggestions;
      };

      if (!response.ok || !payload.suggestions) {
        throw new Error(
          payload.error ?? "Could not generate AI suggestions right now.",
        );
      }

      setSuggestions(payload.suggestions);
      const now = new Date().toISOString();
      setGeneratedAt(now);
      saveAISuggestionsToStorage(result, payload.suggestions, userGoal);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unexpected error occurred.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const hasSuggestions = Boolean(suggestions);

  return (
    <section className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-white via-indigo-50/40 to-cyan-50/40 shadow-sm p-6 mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
          <h2 className="font-bold text-slate-900 text-lg">
            AI Personalized Suggestions
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Based on your calculated quiz result. For self-reflection only, not
            a clinical diagnosis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="ai-goal"
            className="text-xs font-semibold uppercase tracking-wider text-slate-500"
          >
            Goal
          </label>
          <select
            id="ai-goal"
            value={userGoal}
            onChange={(e) => setUserGoal(e.target.value as UserGoal)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={isLoading}
          >
            {USER_GOAL_OPTIONS.map((goal) => (
              <option key={goal.value} value={goal.value}>
                {goal.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center mb-5">
        <button
          onClick={generateSuggestions}
          disabled={isLoading}
          className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition"
        >
          {isLoading
            ? "Generating..."
            : hasSuggestions
              ? "Regenerate Suggestions"
              : "Generate AI Suggestions"}
        </button>

        {generatedAt && (
          <p className="text-xs text-slate-500">
            Last generated: {new Date(generatedAt).toLocaleString()}
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 mb-4">
          <p className="text-sm text-rose-700">{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 animate-pulse">
          <div className="h-4 w-40 bg-slate-200 rounded mb-3" />
          <div className="h-3 w-full bg-slate-100 rounded mb-2" />
          <div className="h-3 w-4/5 bg-slate-100 rounded mb-2" />
          <div className="h-3 w-3/4 bg-slate-100 rounded" />
        </div>
      )}

      {suggestions && !isLoading && (
        <div className="space-y-4">
          <article className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-2">
              Personalized Summary
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {suggestions.personalizedSummary}
            </p>
          </article>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdviceCard
              title="Communication Advice"
              items={suggestions.communicationAdvice}
              accent="#EEF2FF"
            />
            <AdviceCard
              title="Career & Teamwork"
              items={suggestions.careerSuggestions}
              accent="#ECFEFF"
            />
            <AdviceCard
              title="Relationship Advice"
              items={suggestions.relationshipAdvice}
              accent="#FFF7ED"
            />
            <AdviceCard
              title="Stress Management"
              items={suggestions.stressManagementTips}
              accent="#F0FDF4"
            />
            <AdviceCard
              title="Growth Plan"
              items={suggestions.growthPlan}
              accent="#F5F3FF"
            />
            <AdviceCard
              title="3 Actions This Week"
              items={suggestions.threeActionsThisWeek}
              accent="#EFF6FF"
            />
          </div>
        </div>
      )}
    </section>
  );
}
