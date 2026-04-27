const TYPES = [
  { emoji: '🔴', label: 'Driver', desc: 'Direct, decisive, goal-focused', color: '#EF4444', bg: '#FEF2F2' },
  { emoji: '🟡', label: 'Influencer', desc: 'Social, expressive, energetic', color: '#F59E0B', bg: '#FFFBEB' },
  { emoji: '🟢', label: 'Supporter', desc: 'Calm, patient, harmony-focused', color: '#10B981', bg: '#F0FDF4' },
  { emoji: '🔵', label: 'Analyst', desc: 'Logical, careful, detail-focused', color: '#3B82F6', bg: '#EFF6FF' },
];

export function TypeGrid() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-20">
      <p className="text-center text-slate-400 text-sm font-medium uppercase tracking-widest mb-8">
        Four Communication Styles
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {TYPES.map((t) => (
          <div
            key={t.label}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 hover:bg-white/10 transition-all duration-200 hover:-translate-y-1"
          >
            <div className="text-3xl mb-3">{t.emoji}</div>
            <div className="font-bold text-white text-sm mb-1">{t.label}</div>
            <div className="text-xs text-slate-400 leading-relaxed">{t.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
