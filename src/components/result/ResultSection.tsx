import { useState, type ReactNode } from 'react';

interface ResultSectionProps {
  title: string;
  icon: string;
  children: ReactNode;
  defaultOpen?: boolean;
  accentColor?: string;
}

export function ResultSection({
  title,
  icon,
  children,
  defaultOpen = false,
  accentColor = '#6366f1',
}: ResultSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div 
      className="rounded-2xl border bg-white overflow-hidden shadow-sm transition-colors duration-300"
      style={{ borderColor: open ? accentColor : '#e2e8f0' }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <span className="font-semibold text-slate-800 text-base">{title}</span>
        </div>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-5 pt-1 border-t border-slate-100">{children}</div>
      </div>
    </div>
  );
}

// Helper sub-components used inside sections
export function BulletList({ items, color = '#6366f1' }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-2 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
          <span
            className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Prose({ text }: { text: string }) {
  return <p className="text-sm text-slate-700 leading-relaxed mt-3">{text}</p>;
}

export function TagList({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {items.map((item, i) => (
        <span
          key={i}
          className="px-3 py-1.5 rounded-full text-xs font-medium"
          style={{ backgroundColor: `${color}18`, color: color }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
