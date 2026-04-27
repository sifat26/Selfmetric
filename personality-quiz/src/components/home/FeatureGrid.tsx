const FEATURES = [
  { icon: '🎯', title: '32 Original Questions', desc: 'Scenario-based questions across 8 real-life domains' },
  { icon: '📊', title: 'Detailed Score Report', desc: 'Percentage breakdown across all four dimensions' },
  { icon: '🔍', title: 'Blend Detection', desc: 'Discover if you\'re a primary or blend type' },
  { icon: '🔗', title: 'Shareable Results', desc: 'Copy a link to share your full report instantly' },
];

export function FeatureGrid() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5"
          >
            <div className="text-2xl mb-3">{f.icon}</div>
            <div className="font-semibold text-white text-sm mb-1.5">{f.title}</div>
            <div className="text-xs text-slate-400 leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
