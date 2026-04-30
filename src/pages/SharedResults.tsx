import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const TYPE_COLORS: Record<string, string> = {
  red: "text-red-400",
  blue: "text-blue-400",
  green: "text-emerald-400",
  yellow: "text-amber-400",
};

const TYPE_BG: Record<string, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  yellow: "bg-amber-400",
};

const CONFIDENCE_COLORS: Record<string, string> = {
  high: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  balanced: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
};

interface SharedLink {
  id: string;
  code: string;
  label: string;
  created_at: string;
}

interface SharedResult {
  id: string;
  primary_type: string;
  secondary_type: string;
  confidence_level: string;
  blend_label: string;
  is_blend: boolean;
  percentages: { red: number; blue: number; green: number; yellow: number };
  respondent_name: string | null;
  created_at: string;
}

export default function SharedResults() {
  const { code } = useParams<{ code: string }>();
  const [link, setLink] = useState<SharedLink | null>(null);
  const [results, setResults] = useState<SharedResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!code) return;
    fetch(`/api/shared-links/${encodeURIComponent(code)}/results`)
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || "Link not found");
        }
        return res.json();
      })
      .then((data) => {
        setLink(data.link);
        setResults(data.results);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [code]);

  const quizLink = `${window.location.origin}/quiz?ref=${code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(quizLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-indigo-300 text-lg animate-pulse">Loading…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">{error}</div>
          <Link
            to="/"
            className="text-indigo-400 hover:text-indigo-300 text-sm"
          >
            ← Back to Selfmetric
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-5xl mx-auto">
        <Link
          to="/"
          className="font-display font-bold text-lg tracking-tight text-white hover:text-indigo-300 transition-colors"
        >
          Selfmetric
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pb-16 space-y-8">
        {/* Link info */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6">
          <h1 className="text-2xl font-display font-bold mb-2">
            Shared Quiz Results
            {link?.label && (
              <span className="text-slate-400 font-normal text-lg ml-2">
                — {link.label}
              </span>
            )}
          </h1>
          <p className="text-slate-400 text-sm mb-4">
            {results.length} {results.length === 1 ? "response" : "responses"}{" "}
            collected
          </p>

          {/* Shareable link */}
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-slate-300 truncate">
              {quizLink}
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium transition-colors shrink-0"
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        {/* Summary stats */}
        {results.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(["red", "blue", "green", "yellow"] as const).map((type) => {
              const count = results.filter(
                (r) => r.primary_type === type,
              ).length;
              return (
                <div
                  key={type}
                  className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-5 text-center"
                >
                  <div className={`text-2xl font-bold ${TYPE_COLORS[type]}`}>
                    {count}
                  </div>
                  <div className="text-sm text-slate-400 mt-1 uppercase">
                    {type}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Results list */}
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((r, i) => (
              <div
                key={r.id}
                className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 text-sm font-mono">
                      #{results.length - i}
                    </span>
                    {r.respondent_name && (
                      <span className="text-white font-medium text-sm">
                        {r.respondent_name}
                      </span>
                    )}
                    <span className="text-slate-600">·</span>
                    <span
                      className={`text-lg font-bold uppercase ${TYPE_COLORS[r.primary_type]}`}
                    >
                      {r.primary_type}
                    </span>
                    {r.is_blend && (
                      <span className="text-slate-400 text-sm">
                        / {r.secondary_type} — {r.blend_label}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs border ${CONFIDENCE_COLORS[r.confidence_level] || ""}`}
                    >
                      {r.confidence_level}
                    </span>
                    <span className="text-slate-500 text-xs">
                      {new Date(r.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Score bars */}
                <div className="grid grid-cols-4 gap-2">
                  {(["red", "blue", "green", "yellow"] as const).map((type) => (
                    <div key={type}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={TYPE_COLORS[type]}>{type}</span>
                        <span className="text-slate-500">
                          {r.percentages?.[type] ?? 0}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${TYPE_BG[type]}`}
                          style={{
                            width: `${r.percentages?.[type] ?? 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-12 text-center">
            <p className="text-slate-400 mb-2">No responses yet</p>
            <p className="text-slate-500 text-sm">
              Share the link above and responses will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
