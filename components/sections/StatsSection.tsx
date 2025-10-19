interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="bg-gradient-to-br from-[var(--accent-bg)] to-[var(--nav-bg)] rounded-2xl p-8 md:p-12 shadow-lg border border-[var(--border)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="text-5xl md:text-6xl font-bold text-[var(--accent)] mb-2">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-sm md:text-base text-[var(--muted)] font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}