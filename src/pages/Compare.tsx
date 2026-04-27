import { Link } from 'react-router-dom';
import { personalityTypes } from '../data/personalityTypes';

export default function Compare() {
  const types = Object.values(personalityTypes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Nav */}
      <nav className="sticky top-0 z-10 w-full px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-slate-200 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-slate-700 hover:text-indigo-600 transition-colors">
          <span className="text-xl">🧠</span>
          <span className="font-display font-bold text-base">Selfmetric</span>
        </Link>
        <Link to="/quiz" className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
          Take the Quiz →
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-800 mb-3">
            Compare Communication Styles
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto text-sm">
            Explore how each personality type approaches communication, conflict, leadership, and teamwork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {types.map((pt) => (
            <div
              key={pt.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Header */}
              <div
                className="px-5 py-6 text-white"
                style={{ background: `linear-gradient(135deg, ${pt.hexColor}, ${pt.darkColor})` }}
              >
                <div className="text-4xl mb-3">{pt.emoji}</div>
                <h2 className="text-xl font-bold">{pt.color} / {pt.name}</h2>
                <p className="text-white/80 text-xs mt-1 leading-relaxed">{pt.tagline}</p>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Core motivation */}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Core Drive</p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{pt.coreMotivation}</p>
                </div>

                {/* Top 3 strengths */}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Strengths</p>
                  <ul className="space-y-1">
                    {pt.strengths.slice(0, 3).map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: pt.hexColor }} />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Communication style */}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Communication</p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{pt.communicationStyle}</p>
                </div>

                {/* Career tags */}
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Career Fit</p>
                  <div className="flex flex-wrap gap-1.5">
                    {pt.careerFit.slice(0, 3).map((c, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${pt.hexColor}18`, color: pt.hexColor }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold text-base shadow-xl shadow-indigo-200 hover:shadow-indigo-300 hover:scale-105 transition-all duration-200"
          >
            Discover Your Style →
          </Link>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-400 py-6">
        © {new Date().getFullYear()} Selfmetric · Not a clinical diagnosis
      </footer>
    </div>
  );
}
