import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TYPE_COLORS: Record<string, string> = {
  red: "bg-red-500",
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  yellow: "bg-amber-400",
};

const TYPE_TEXT_COLORS: Record<string, string> = {
  red: "text-red-400",
  blue: "text-blue-400",
  green: "text-emerald-400",
  yellow: "text-amber-400",
};

const CONFIDENCE_COLORS: Record<string, string> = {
  high: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  medium: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  balanced: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
};

interface Stats {
  totalResults: number;
  todayCount: number;
  typeDistribution: Record<string, number>;
  confidenceBreakdown: Record<string, number>;
  goalBreakdown: Record<string, number>;
  dailyTrend: { date: string; count: number }[];
  averagePercentages: Record<string, number>;
  recentResults: {
    id: string;
    primary_type: string;
    secondary_type: string;
    confidence_level: string;
    blend_label: string;
    is_blend: boolean;
    goal: string | null;
    created_at: string;
  }[];
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch("/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (res.status === 401) {
          sessionStorage.removeItem("admin_token");
          navigate("/admin/login");
          return;
        }
        if (!res.ok) throw new Error("Failed to load stats");
        const data = await res.json();
        setStats(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const handleExport = () => {
    const token = sessionStorage.getItem("admin_token");
    if (!token) return;
    window.open(`/api/admin/export?token=${encodeURIComponent(token)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-indigo-300 text-lg animate-pulse">
          Loading dashboard…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  if (!stats) return null;

  const mostCommonType =
    Object.entries(stats.typeDistribution).sort(
      (a, b) => b[1] - a[1],
    )[0]?.[0] || "—";

  const maxDaily = Math.max(...stats.dailyTrend.map((d) => d.count), 1);
  const maxType = Math.max(...Object.values(stats.typeDistribution), 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
      {/* Header */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="font-display font-bold text-lg tracking-tight text-white hover:text-indigo-300 transition-colors"
          >
            Selfmetric
          </a>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 text-sm">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 text-sm hover:bg-slate-800 transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pb-16 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Results"
            value={stats.totalResults.toString()}
          />
          <StatCard
            label="Most Common Type"
            value={mostCommonType.toUpperCase()}
            valueClass={TYPE_TEXT_COLORS[mostCommonType]}
          />
          <StatCard
            label="Today's Results"
            value={stats.todayCount.toString()}
          />
          <StatCard
            label="Avg Confidence"
            value={
              Object.entries(stats.confidenceBreakdown)
                .sort((a, b) => b[1] - a[1])[0]?.[0]
                ?.toUpperCase() || "—"
            }
          />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Type Distribution */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Type Distribution</h2>
            <div className="space-y-3">
              {(["red", "blue", "green", "yellow"] as const).map((type) => {
                const count = stats.typeDistribution[type] || 0;
                const pct = maxType > 0 ? (count / maxType) * 100 : 0;
                return (
                  <div key={type} className="flex items-center gap-3">
                    <span
                      className={`text-sm font-medium w-16 uppercase ${TYPE_TEXT_COLORS[type]}`}
                    >
                      {type}
                    </span>
                    <div className="flex-1 h-6 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${TYPE_COLORS[type]} transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-400 w-10 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Confidence Breakdown */}
          <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Confidence Breakdown</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {(["high", "medium", "balanced"] as const).map((level) => (
                <span
                  key={level}
                  className={`px-4 py-2 rounded-full border text-sm font-medium ${CONFIDENCE_COLORS[level]}`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}:{" "}
                  {stats.confidenceBreakdown[level] || 0}
                </span>
              ))}
            </div>

            <h2 className="text-lg font-semibold mb-4">Goal Breakdown</h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(stats.goalBreakdown).map(([goal, count]) => (
                <span
                  key={goal}
                  className="px-4 py-2 rounded-full border border-slate-600/50 bg-slate-800/50 text-slate-300 text-sm font-medium"
                >
                  {goal === "none" ? "No goal" : goal.replace("_", " ")}:{" "}
                  {count}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Trend */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Last 30 Days</h2>
          <div className="flex items-end gap-1 h-32">
            {stats.dailyTrend.map((day) => {
              const pct = maxDaily > 0 ? (day.count / maxDaily) * 100 : 0;
              return (
                <div
                  key={day.date}
                  className="flex-1 group relative"
                  title={`${day.date}: ${day.count}`}
                >
                  <div
                    className="w-full bg-indigo-500/80 rounded-t hover:bg-indigo-400 transition-colors"
                    style={{ height: `${Math.max(pct, 2)}%` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>{stats.dailyTrend[0]?.date.slice(5)}</span>
            <span>
              {stats.dailyTrend[stats.dailyTrend.length - 1]?.date.slice(5)}
            </span>
          </div>
        </div>

        {/* Average Percentages */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Average Score Percentages
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(["red", "blue", "green", "yellow"] as const).map((type) => (
              <div key={type} className="text-center">
                <div className={`text-3xl font-bold ${TYPE_TEXT_COLORS[type]}`}>
                  {stats.averagePercentages[type]}%
                </div>
                <div className="text-sm text-slate-400 mt-1 uppercase">
                  {type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Results Table */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-6 overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">Recent Results</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 border-b border-slate-700/50">
                <th className="text-left py-3 px-2 font-medium">Date</th>
                <th className="text-left py-3 px-2 font-medium">Primary</th>
                <th className="text-left py-3 px-2 font-medium">Secondary</th>
                <th className="text-left py-3 px-2 font-medium">Confidence</th>
                <th className="text-left py-3 px-2 font-medium">Blend</th>
                <th className="text-left py-3 px-2 font-medium">Goal</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentResults.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-3 px-2 text-slate-300">
                    {new Date(row.created_at).toLocaleDateString()}
                  </td>
                  <td
                    className={`py-3 px-2 font-medium uppercase ${TYPE_TEXT_COLORS[row.primary_type] || ""}`}
                  >
                    {row.primary_type}
                  </td>
                  <td
                    className={`py-3 px-2 uppercase ${TYPE_TEXT_COLORS[row.secondary_type] || ""}`}
                  >
                    {row.secondary_type}
                  </td>
                  <td className="py-3 px-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs border ${CONFIDENCE_COLORS[row.confidence_level] || ""}`}
                    >
                      {row.confidence_level}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-slate-400">
                    {row.is_blend ? row.blend_label : "—"}
                  </td>
                  <td className="py-3 px-2 text-slate-400">
                    {row.goal ? row.goal.replace("_", " ") : "—"}
                  </td>
                </tr>
              ))}
              {stats.recentResults.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No results yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  valueClass = "text-white",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm p-5">
      <div className="text-sm text-slate-400 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${valueClass}`}>{value}</div>
    </div>
  );
}
