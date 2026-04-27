import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

import { FeatureGrid } from "../components/home/FeatureGrid";
import { TypeGrid } from "../components/home/TypeGrid";

export default function Home() {
  const navigate = useNavigate();
  const { resetQuiz } = useQuiz();

  const handleStart = () => {
    resetQuiz();
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl">
            <img
              src="/Selfmetric.svg"
              alt="Selfmetric Logo"
              width={40}
              height={40}
            />
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            Selfmetric
          </span>
        </div>
        <a
          href="/about"
          className="text-sm text-slate-400 hover:text-white transition-colors"
        >
          About
        </a>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse-gentle" />
          Free · Takes about 8 minutes
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-tight mb-6 animate-slide-up">
          Discover Your{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
            Communication
          </span>{" "}
          Personality
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10 animate-slide-up">
          32 scenario-based questions. A detailed personal profile. Understand
          how you communicate, make decisions, handle conflict, and lead — and
          how others can work best with you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
          <button
            id="start-quiz-btn"
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-200 active:scale-95"
          >
            Start the Quiz →
          </button>
          <span className="text-slate-500 text-sm">No sign-up required</span>
        </div>
      </section>

      <TypeGrid />
      <FeatureGrid />

      {/* CTA */}
      <section className="max-w-2xl mx-auto px-6 pb-28 text-center">
        <div className="rounded-3xl border border-indigo-500/20 bg-indigo-500/10 backdrop-blur-sm px-8 py-10">
          <h2 className="text-2xl font-display font-bold mb-3">
            Ready to understand yourself better?
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            This quiz is designed for self-reflection and communication
            awareness. It is not a clinical, medical, or psychological
            diagnosis.
          </p>
          <button
            onClick={handleStart}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold text-base hover:scale-105 transition-transform duration-200 active:scale-95"
          >
            Begin Your Assessment
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-slate-600 text-xs pb-8 px-4">
        © {new Date().getFullYear()} Selfmetric · For self-reflection purposes
        only · Not a clinical diagnosis
      </footer>
    </div>
  );
}
