interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-12">
      <h2>{title}</h2>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}