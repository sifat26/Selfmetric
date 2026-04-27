import type { QuizResult } from '../../lib/quizScoring';
import { personalityTypes } from '../../data/personalityTypes';
import { ResultSection, BulletList, Prose } from './ResultSection';

export function ResultDetails({ result }: { result: QuizResult }) {
  const pt = personalityTypes[result.primaryType];
  const st = personalityTypes[result.secondaryType];

  return (
    <div className="space-y-3 mb-6">
      <ResultSection title="Strengths" icon="✅" defaultOpen={true} accentColor={pt.hexColor}>
        <BulletList items={pt.strengths} color={pt.hexColor} />
      </ResultSection>

      <ResultSection title="Weaknesses" icon="⚠️" accentColor="#F59E0B">
        <BulletList items={pt.weaknesses} color="#F59E0B" />
      </ResultSection>
      
      <ResultSection title="What Makes You Happy" icon="✨" accentColor="#10B981">
        <BulletList items={pt.happyTriggers} color="#10B981" />
      </ResultSection>

      <ResultSection title="Triggers (What Annoys You)" icon="🧨" accentColor="#EF4444">
        <BulletList items={pt.triggers} color="#EF4444" />
      </ResultSection>

      <ResultSection title="Communication Guide" icon="💬" accentColor={pt.hexColor}>
        <Prose text={pt.communicationGuide} />
      </ResultSection>

      <ResultSection title="Improvement Plan" icon="🌱" accentColor={pt.hexColor}>
        <BulletList items={pt.improvementPlan} color={pt.hexColor} />
      </ResultSection>

      <ResultSection title={`Your Secondary Style: ${st.color} / ${st.name} (${result.percentages[result.secondaryType]}%)`} icon={st.emoji} accentColor={st.hexColor}>
        <p className="text-sm text-slate-700 leading-relaxed mt-3">{st.tagline}</p>
        <p className="text-sm text-slate-600 leading-relaxed mt-2">{st.simpleExplanation}</p>
        <div className="mt-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Secondary Strengths</p>
          <BulletList items={st.strengths.slice(0, 3)} color={st.hexColor} />
        </div>
      </ResultSection>
    </div>
  );
}
